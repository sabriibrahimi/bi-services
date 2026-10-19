/**
 * Contact-form handler for bi-services.ch.
 *
 * Receives the website's contact form (multipart, with up to 5 photographs)
 * and emails it to info@bi-services.ch through Infomaniak's mail server. The
 * client's address is set as Reply-To, so answering the email answers the
 * client.
 *
 *   POST /api/contact          the form
 *   GET  /api/contact/health   liveness check
 *
 * Runs behind Caddy, which forwards /api/* to 127.0.0.1:3001. It is never
 * reachable from the internet directly (see compose.yaml).
 *
 * Protections, in the order they apply:
 *   - only requests whose Origin is one of ALLOWED_ORIGINS are accepted
 *   - per-address rate limit: 5 per 10 minutes, 20 per day
 *   - hard size limits on every field and file, checked while streaming
 *   - images only (JPEG, PNG, WebP, HEIC/HEIF)
 *   - hidden "company" field: filled in by bots, so such requests are
 *     acknowledged and dropped
 *   - the same validation as the website form
 * Clients' messages are never written to the logs.
 */
import http from 'node:http'
import Busboy from 'busboy'
import nodemailer from 'nodemailer'

// ---------------------------------------------------------------- config --

const env = (name, fallback) => {
  const value = process.env[name]
  return value === undefined || value === '' ? fallback : value
}

const PORT = Number(env('PORT', 3001))
const SMTP_HOST = env('SMTP_HOST', 'mail.infomaniak.com')
const SMTP_PORT = Number(env('SMTP_PORT', 465))
const SMTP_USER = env('SMTP_USER')
const SMTP_PASS = env('SMTP_PASS')
const MAIL_FROM = env('MAIL_FROM', SMTP_USER)
const MAIL_TO = env('MAIL_TO', SMTP_USER)
const ALLOWED_ORIGINS = env('ALLOWED_ORIGINS', 'https://bi-services.ch')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
/** For testing only: build the email but do not send it. */
const DRY_RUN = env('SMTP_DRY_RUN', '') === '1'

if (!DRY_RUN && (!SMTP_USER || !SMTP_PASS)) {
  console.error('[contact] SMTP_USER and SMTP_PASS must be set (see .env.example)')
  process.exit(1)
}

const MB = 1024 * 1024
const LIMITS = {
  files: 5,
  fileSize: 10 * MB,
  totalFiles: 20 * MB,
  fields: 20,
  fieldSize: 8 * 1024,
  request: 22 * MB,
}
const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'])
const IMAGE_EXT = /\.(jpe?g|png|webp|heic|heif)$/i

// Same rules as src/components/ContactForm.jsx.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const PHONE_RE = /^(\+|00)?[0-9 ().\-/]{7,24}$/

// ------------------------------------------------------------ rate limit --

const WINDOW_SHORT = 10 * 60 * 1000
const WINDOW_DAY = 24 * 60 * 60 * 1000
const hits = new Map()

function withinRateLimit(ip) {
  const now = Date.now()
  const day = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_DAY)
  const recent = day.filter((time) => now - time < WINDOW_SHORT)
  if (recent.length >= 5 || day.length >= 20) {
    hits.set(ip, day)
    return false
  }
  day.push(now)
  hits.set(ip, day)
  return true
}

// Forget addresses with no activity in the last day.
setInterval(() => {
  const now = Date.now()
  for (const [ip, times] of hits) {
    if (times.every((time) => now - time >= WINDOW_DAY)) hits.delete(ip)
  }
}, 60 * 60 * 1000).unref()

// ----------------------------------------------------------------- utils --

class HttpError extends Error {
  constructor(status, code) {
    super(code)
    this.status = status
    this.code = code
  }
}

function reply(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  })
  res.end(JSON.stringify(body))
}

/** Caddy sets X-Forwarded-For to the real client address. */
function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.trim()) return forwarded.split(',')[0].trim()
  return req.socket.remoteAddress ?? 'unknown'
}

/** One line of plain text: no control characters, no line breaks. */
function line(value, max) {
  return String(value ?? '')
    .replace(/[\u0000-\u001f\u007f]+/g, ' ')
    .trim()
    .slice(0, max)
}

/** Multi-line text: keeps line breaks and tabs, drops other control characters. */
function block(value, max) {
  return String(value ?? '')
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000b-\u001f\u007f]+/g, '')
    .trim()
    .slice(0, max)
}

// ----------------------------------------------------------------- parse --

function parseForm(req) {
  return new Promise((resolve, reject) => {
    let busboy
    try {
      busboy = Busboy({
        headers: req.headers,
        limits: {
          files: LIMITS.files,
          fileSize: LIMITS.fileSize,
          fields: LIMITS.fields,
          fieldSize: LIMITS.fieldSize,
          parts: LIMITS.files + LIMITS.fields,
        },
      })
    } catch {
      reject(new HttpError(415, 'unsupported-content-type'))
      return
    }

    const fields = {}
    const files = []
    let total = 0
    let failed = false

    const fail = (error) => {
      if (failed) return
      failed = true
      req.unpipe(busboy)
      req.resume()
      reject(error)
    }

    busboy.on('field', (name, value, info) => {
      if (info.valueTruncated) return fail(new HttpError(413, 'field-too-long'))
      fields[name] = value
    })

    busboy.on('file', (name, stream, info) => {
      const { filename, mimeType } = info
      const isImage = IMAGE_TYPES.has(mimeType) || IMAGE_EXT.test(filename ?? '')
      if (!isImage) {
        stream.resume()
        return fail(new HttpError(415, 'file-type'))
      }
      const chunks = []
      stream.on('data', (chunk) => {
        total += chunk.length
        if (total > LIMITS.totalFiles) {
          stream.resume()
          return fail(new HttpError(413, 'files-too-large'))
        }
        chunks.push(chunk)
      })
      stream.on('limit', () => fail(new HttpError(413, 'file-too-large')))
      stream.on('end', () => {
        if (failed || stream.truncated) return
        files.push({
          filename: line(filename, 120) || 'photo',
          contentType: IMAGE_TYPES.has(mimeType) ? mimeType : 'application/octet-stream',
          content: Buffer.concat(chunks),
        })
      })
    })

    busboy.on('filesLimit', () => fail(new HttpError(413, 'too-many-files')))
    busboy.on('fieldsLimit', () => fail(new HttpError(413, 'too-many-fields')))
    busboy.on('partsLimit', () => fail(new HttpError(413, 'too-many-parts')))
    busboy.on('error', () => fail(new HttpError(400, 'malformed')))
    busboy.on('close', () => {
      if (!failed) resolve({ fields, files })
    })

    req.pipe(busboy)
  })
}

// -------------------------------------------------------------- validate --

function validate(fields) {
  const value = {
    name: line(fields.name, 120),
    email: line(fields.email, 200),
    phone: line(fields.phone, 40),
    workType: line(fields.workType, 120),
    surface: line(fields.surface, 60),
    message: block(fields.message, 2000),
    lang: fields.lang === 'en' ? 'en' : 'fr',
  }
  const errors = []
  if (value.name.length < 2) errors.push('name')
  if (!EMAIL_RE.test(value.email)) errors.push('email')
  if (value.phone && !PHONE_RE.test(value.phone)) errors.push('phone')
  if (value.message.length < 10) errors.push('message')
  return { value, errors }
}

// ------------------------------------------------------------------ mail --

const transporter = DRY_RUN
  ? nodemailer.createTransport({ jsonTransport: true })
  : nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      // Give up quickly rather than keep the visitor waiting: an unreachable
      // mail server (for example a hosting provider blocking outgoing mail
      // ports) then shows the form's "please call or write" message within
      // seconds instead of minutes.
      connectionTimeout: 15_000,
      greetingTimeout: 15_000,
      socketTimeout: 30_000,
    })

function buildMail(form, files) {
  const fr = form.lang === 'fr'
  const rows = [
    [fr ? 'Nom' : 'Name', form.name],
    ['E-mail', form.email],
    [fr ? 'Téléphone' : 'Phone', form.phone || '—'],
    [fr ? 'Type de travaux' : 'Type of work', form.workType || '—'],
    [fr ? 'Surface' : 'Surface area', form.surface || '—'],
    [fr ? 'Photos jointes' : 'Photos attached', String(files.length)],
  ]
  const text = [
    fr ? 'Nouvelle demande envoyée depuis le site bi-services.ch' : 'New enquiry from the bi-services.ch website',
    '',
    ...rows.map(([label, content]) => `${label} : ${content}`),
    '',
    fr ? 'Message :' : 'Message:',
    form.message,
    '',
    fr
      ? '— Répondez directement à cet e-mail pour écrire au client.'
      : '— Reply to this email to answer the client directly.',
  ].join('\n')

  return {
    from: { name: 'Site BI SERVICES', address: MAIL_FROM },
    to: MAIL_TO,
    replyTo: { name: form.name, address: form.email },
    subject: `${fr ? 'Demande via le site' : 'Website enquiry'} — ${form.name}`.slice(0, 160),
    text,
    attachments: files,
  }
}

// ---------------------------------------------------------------- server --

async function handleContact(req, res) {
  const origin = req.headers.origin
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) throw new HttpError(403, 'origin')

  if (!String(req.headers['content-type'] ?? '').startsWith('multipart/form-data')) {
    throw new HttpError(415, 'unsupported-content-type')
  }
  if (Number(req.headers['content-length'] ?? 0) > LIMITS.request) {
    throw new HttpError(413, 'request-too-large')
  }
  if (!withinRateLimit(clientIp(req))) throw new HttpError(429, 'rate-limited')

  const { fields, files } = await parseForm(req)

  // A filled-in trap means a bot: acknowledge it, send nothing.
  if (line(fields.company, 200)) {
    console.log('[contact] dropped: trap field filled')
    return reply(res, 200, { ok: true })
  }

  const { value, errors } = validate(fields)
  if (errors.length) return reply(res, 400, { ok: false, error: 'invalid', fields: errors })

  try {
    await transporter.sendMail(buildMail(value, files))
  } catch (error) {
    console.error('[contact] send failed:', error.code ?? error.responseCode ?? 'unknown')
    throw new HttpError(502, 'send-failed')
  }

  console.log(`[contact] sent${DRY_RUN ? ' (dry run)' : ''}: ${files.length} photo(s)`)
  return reply(res, 200, { ok: true })
}

const server = http.createServer(async (req, res) => {
  const path = (req.url ?? '').split('?')[0]
  try {
    if (path === '/api/contact/health' && req.method === 'GET') {
      return reply(res, 200, { ok: true })
    }
    if (path === '/api/contact') {
      if (req.method !== 'POST') throw new HttpError(405, 'method')
      return await handleContact(req, res)
    }
    throw new HttpError(404, 'not-found')
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500
    if (status === 500) console.error('[contact] unexpected error:', error.message)
    if (!res.headersSent) reply(res, status, { ok: false, error: error.code ?? 'server-error' })
  }
})

server.requestTimeout = 60_000
server.headersTimeout = 15_000

server.listen(PORT, () => {
  console.log(
    `[contact] listening on ${PORT}${DRY_RUN ? ' (dry run: nothing is sent)' : ''}, origins: ${ALLOWED_ORIGINS.join(', ')}`
  )
})

for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => server.close(() => process.exit(0)))
}
