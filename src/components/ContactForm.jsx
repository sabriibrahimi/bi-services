import { useEffect, useId, useRef, useState } from 'react'
import { hasFormService, site } from '../config/site.js'
import { content } from '../data/content.js'
import { t, tf, useLanguage } from '../utils/i18n.js'
import { submitContactForm } from '../services/contactForm.js'
import './ContactForm.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
/** Swiss and international numbers: digits, spaces, dots, dashes, slashes, (). */
const PHONE_RE = /^(\+|00)?[0-9 ().\-/]{7,24}$/

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  workType: '',
  surface: '',
  message: '',
}

export default function ContactForm() {
  const lang = useLanguage()
  const fieldId = useId()
  const summaryRef = useRef(null)

  const [values, setValues] = useState(EMPTY)
  const [files, setFiles] = useState([])
  const [fileErrors, setFileErrors] = useState([])
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error | not-configured
  // Incremented on every failed submit: shows the error summary and moves focus
  // to it, including when the same errors come back a second time.
  const [errorSignal, setErrorSignal] = useState(0)

  // Object URLs must be released, but only when the form itself goes away —
  // revoking on every change would blank the previews that are still listed.
  const filesRef = useRef(files)
  filesRef.current = files
  useEffect(() => () => filesRef.current.forEach((item) => URL.revokeObjectURL(item.url)), [])

  useEffect(() => {
    if (errorSignal > 0) summaryRef.current?.focus()
  }, [errorSignal])

  const id = (name) => `${fieldId}-${name}`
  const errorId = (name) => `${fieldId}-${name}-error`
  const hintId = (name) => `${fieldId}-${name}-hint`

  function setField(name, value) {
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[name]
        return next
      })
    }
  }

  function validate() {
    const next = {}
    const name = values.name.trim()
    const email = values.email.trim()
    const phone = values.phone.trim()
    const surface = values.surface.trim()
    const message = values.message.trim()

    if (!name) next.name = content.form.errors.nameRequired
    else if (name.length > 100) next.name = content.form.errors.nameTooLong

    if (!email) next.email = content.form.errors.emailRequired
    else if (!EMAIL_RE.test(email)) next.email = content.form.errors.emailInvalid

    if (phone) {
      const digits = phone.replace(/\D/g, '')
      if (!PHONE_RE.test(phone) || digits.length < 9 || digits.length > 15) {
        next.phone = content.form.errors.phoneInvalid
      }
    }

    if (surface) {
      const numeric = Number(surface.replace(',', '.'))
      if (!Number.isFinite(numeric) || numeric <= 0) {
        next.surface = content.form.errors.surfaceInvalid
      }
    }

    if (!message) next.message = content.form.errors.messageRequired
    else if (message.length < 10) next.message = content.form.errors.messageTooShort
    else if (message.length > 2000) next.message = content.form.errors.messageTooLong

    return next
  }

  function onFilesPicked(event) {
    const picked = Array.from(event.target.files ?? [])
    const problems = []
    const accepted = []

    picked.forEach((file) => {
      const typeOk =
        site.form.acceptedFileTypes.includes(file.type) || /\.(heic|heif)$/i.test(file.name)
      if (!typeOk) {
        problems.push(tf(content.form.errors.fileType, lang, { name: file.name }))
        return
      }
      if (file.size > site.form.maxFileSizeMb * 1024 * 1024) {
        problems.push(tf(content.form.errors.fileSize, lang, { name: file.name }))
        return
      }
      accepted.push(file)
    })

    setFiles((current) => {
      const room = site.form.maxFiles - current.length
      if (accepted.length > room) {
        problems.push(t(content.form.errors.fileCount, lang))
      }
      const added = accepted.slice(0, Math.max(room, 0)).map((file) => ({
        file,
        url: URL.createObjectURL(file),
        key: `${file.name}-${file.size}-${file.lastModified}`,
      }))
      return [...current, ...added]
    })

    setFileErrors(problems)
    event.target.value = ''
  }

  function removeFile(key) {
    setFiles((current) => {
      const target = current.find((item) => item.key === key)
      if (target) URL.revokeObjectURL(target.url)
      return current.filter((item) => item.key !== key)
    })
  }

  async function onSubmit(event) {
    event.preventDefault()

    const found = validate()
    setErrors(found)

    if (Object.keys(found).length > 0) {
      setStatus('idle')
      setErrorSignal((value) => value + 1)
      return
    }

    setErrorSignal(0)

    if (!hasFormService) {
      // No back-end configured: never claim the message was sent.
      setStatus('not-configured')
      return
    }

    setStatus('submitting')
    const result = await submitContactForm({
      ...values,
      files: files.map((item) => item.file),
    })

    if (result.status === 'success') {
      setValues(EMPTY)
      files.forEach((item) => URL.revokeObjectURL(item.url))
      setFiles([])
      setFileErrors([])
      setStatus('success')
    } else if (result.status === 'not-configured') {
      setStatus('not-configured')
    } else {
      setStatus('error')
    }
  }

  const workTypes = [
    ...content.serviceList.map((service) => t(service.title, lang)),
    t(content.form.workTypeOther, lang),
  ]

  const errorEntries = Object.entries(errors)
  const submitting = status === 'submitting'

  if (status === 'success') {
    return (
      <div className="form-note form-note--success" role="status">
        <h3 className="form-note__title">{t(content.form.successTitle, lang)}</h3>
        <p className="form-note__body">{t(content.form.successBody, lang)}</p>
        <button type="button" className="form-note__action" onClick={() => setStatus('idle')}>
          {t(content.form.successAgain, lang)}
        </button>
      </div>
    )
  }

  return (
    <form
      className="form"
      onSubmit={onSubmit}
      noValidate
      name={site.form.provider === 'netlify' ? site.form.netlifyFormName : undefined}
      data-netlify={site.form.provider === 'netlify' ? 'true' : undefined}
      encType="multipart/form-data"
    >
      {site.form.provider === 'netlify' ? (
        <input type="hidden" name="form-name" value={site.form.netlifyFormName} />
      ) : null}

      <p className="form__intro">{t(content.contact.formIntro, lang)}</p>

      {errorSignal > 0 && errorEntries.length > 0 ? (
        <div className="form-note form-note--error" role="alert" tabIndex={-1} ref={summaryRef}>
          <h3 className="form-note__title">{t(content.form.errorSummaryTitle, lang)}</h3>
          <ul className="form-note__list">
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a href={`#${id(field)}`}>{t(message, lang)}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="form__grid">
        <Field
          id={id('name')}
          name="name"
          label={t(content.form.name, lang)}
          required
          requiredLabel={t(content.form.required, lang)}
          value={values.name}
          error={errors.name ? t(errors.name, lang) : null}
          errorId={errorId('name')}
          autoComplete="name"
          onChange={(value) => setField('name', value)}
        />

        <Field
          id={id('email')}
          name="email"
          type="email"
          label={t(content.form.email, lang)}
          required
          requiredLabel={t(content.form.required, lang)}
          value={values.email}
          error={errors.email ? t(errors.email, lang) : null}
          errorId={errorId('email')}
          autoComplete="email"
          onChange={(value) => setField('email', value)}
        />

        <Field
          id={id('phone')}
          name="phone"
          type="tel"
          label={t(content.form.phone, lang)}
          optionalLabel={t(content.form.phoneOptional, lang)}
          value={values.phone}
          error={errors.phone ? t(errors.phone, lang) : null}
          errorId={errorId('phone')}
          autoComplete="tel"
          inputMode="tel"
          onChange={(value) => setField('phone', value)}
        />

        <div className="form__field">
          <label className="form__label" htmlFor={id('workType')}>
            {t(content.form.workType, lang)}
          </label>
          <select
            id={id('workType')}
            name="workType"
            className="form__control"
            value={values.workType}
            onChange={(event) => setField('workType', event.target.value)}
          >
            <option value="">{t(content.form.workTypePlaceholder, lang)}</option>
            {workTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <Field
          id={id('surface')}
          name="surface"
          type="text"
          inputMode="decimal"
          label={t(content.form.surface, lang)}
          optionalLabel={t(content.form.optional, lang)}
          value={values.surface}
          error={errors.surface ? t(errors.surface, lang) : null}
          errorId={errorId('surface')}
          onChange={(value) => setField('surface', value)}
        />

        <div className="form__field form__field--full">
          <label className="form__label" htmlFor={id('message')}>
            {t(content.form.message, lang)}
            <span className="form__flag">{t(content.form.required, lang)}</span>
          </label>
          <p className="form__hint" id={hintId('message')}>
            {t(content.form.messageHint, lang)}
          </p>
          <textarea
            id={id('message')}
            name="message"
            className="form__control form__control--area"
            rows="6"
            required
            maxLength={2000}
            value={values.message}
            aria-invalid={errors.message ? 'true' : undefined}
            aria-describedby={
              [hintId('message'), errors.message ? errorId('message') : null]
                .filter(Boolean)
                .join(' ') || undefined
            }
            onChange={(event) => setField('message', event.target.value)}
          />
          {errors.message ? (
            <p className="form__error" id={errorId('message')}>
              {t(errors.message, lang)}
            </p>
          ) : null}
        </div>

        {/* ------------------------------------------------------- Photos -- */}
        <div className="form__field form__field--full">
          <span className="form__label" id={id('photos-label')}>
            {t(content.form.photos, lang)}
            <span className="form__flag form__flag--quiet">
              {t(content.form.photosOptional, lang)}
            </span>
          </span>
          <p className="form__hint" id={hintId('photos')}>
            {t(content.form.photosHint, lang)}
          </p>

          <label className="form__file" htmlFor={id('photos')}>
            <span className="form__file-button">{t(content.form.photosButton, lang)}</span>
            <span className="form__file-count">
              {tf(content.form.photosSelected, lang, { count: files.length })}
            </span>
          </label>
          <input
            id={id('photos')}
            name="photos"
            className="visually-hidden"
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
            aria-describedby={hintId('photos')}
            onChange={onFilesPicked}
          />

          {fileErrors.length > 0 ? (
            <ul className="form__error form__error--list" role="alert">
              {fileErrors.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          ) : null}

          {files.length > 0 ? (
            <ul className="form__previews">
              {files.map((item) => (
                <li className="form__preview" key={item.key}>
                  <img src={item.url} alt="" />
                  <span className="form__preview-name">{item.file.name}</span>
                  <button
                    type="button"
                    className="form__preview-remove"
                    onClick={() => removeFile(item.key)}
                  >
                    <span className="visually-hidden">
                      {tf(content.form.photosRemove, lang, { name: item.file.name })}
                    </span>
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path
                        d="M5 5l14 14M19 5L5 19"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="form__foot">
        <button type="submit" className="action action--solid action--lg" disabled={submitting}>
          <span className="action__label">
            {t(submitting ? content.form.submitting : content.form.submit, lang)}
          </span>
        </button>
      </div>

      <div aria-live="polite">
        {status === 'not-configured' ? (
          <div className="form-note form-note--info">
            <h3 className="form-note__title">{t(content.form.notConfiguredTitle, lang)}</h3>
            <p className="form-note__body">
              {tf(content.form.notConfiguredBody, lang, {
                phone: site.phone.display,
                email: site.email.display,
              })}
            </p>
            <p className="form-note__actions">
              <a href={site.phone.href}>{site.phone.display}</a>
              <a href={site.email.href}>{site.email.display}</a>
            </p>
          </div>
        ) : null}

        {status === 'error' ? (
          <div className="form-note form-note--error">
            <h3 className="form-note__title">{t(content.form.errorTitle, lang)}</h3>
            <p className="form-note__body">
              {tf(content.form.errorBody, lang, {
                phone: site.phone.display,
                email: site.email.display,
              })}
            </p>
          </div>
        ) : null}
      </div>
    </form>
  )
}

/** One labelled text input with its error message wired for screen readers. */
function Field({
  id,
  name,
  label,
  type = 'text',
  value,
  error,
  errorId,
  required = false,
  requiredLabel,
  optionalLabel,
  onChange,
  ...rest
}) {
  return (
    <div className="form__field">
      <label className="form__label" htmlFor={id}>
        {label}
        {required ? <span className="form__flag">{requiredLabel}</span> : null}
        {!required && optionalLabel ? (
          <span className="form__flag form__flag--quiet">{optionalLabel}</span>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className="form__control"
        value={value}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        {...rest}
      />
      {error ? (
        <p className="form__error" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  )
}
