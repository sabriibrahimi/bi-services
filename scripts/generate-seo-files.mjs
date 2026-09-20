/**
 * Post-build step: writes dist/robots.txt and dist/sitemap.xml from the same
 * data the site itself uses, and copies the prerendered 404 page to
 * dist/404.html so static hosts can serve it for unknown URLs.
 *
 * Run automatically by `npm run build`.
 */
import { copyFile, mkdir, readdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { LANGUAGES, path as routePath, staticPageKeys } from '../src/config/routes.js'
import { projects } from '../src/data/projects.js'
import { origin, originIsPlaceholder, withBase } from '../src/config/deployment.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

/** Fully-qualified URL for an in-site path, base path included. */
const url = (pathname) => `${origin}${withBase(pathname)}`

/** Every public URL, with its counterpart in the other language. */
function collectPages() {
  const pages = []

  for (const key of staticPageKeys) {
    pages.push({
      paths: Object.fromEntries(LANGUAGES.map((lang) => [lang, routePath(key, lang)])),
      priority: key === 'home' ? '1.0' : key === 'legal' || key === 'privacy' ? '0.2' : '0.7',
    })
  }

  for (const project of projects) {
    pages.push({
      paths: Object.fromEntries(
        LANGUAGES.map((lang) => [lang, routePath('project', lang, project.slug[lang])])
      ),
      priority: '0.6',
    })
  }

  return pages
}

function urlEntry(pathname, alternates, priority) {
  const links = LANGUAGES.map(
    (lang) =>
      `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url(alternates[lang])}" />`
  ).join('\n')

  return [
    '  <url>',
    `    <loc>${url(pathname)}</loc>`,
    links,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(alternates.fr)}" />`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n')
}

async function writeSitemap() {
  const entries = collectPages().flatMap((page) =>
    LANGUAGES.map((lang) => urlEntry(page.paths[lang], page.paths, page.priority))
  )

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n')

  await writeFile(join(dist, 'sitemap.xml'), xml, 'utf8')
  return entries.length
}

async function writeRobots() {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${url('/sitemap.xml')}`,
    '',
  ].join('\n')

  await writeFile(join(dist, 'robots.txt'), body, 'utf8')
}

/** Hosts look for /404.html; the prerendered French 404 page fills that role. */
async function writeNotFoundPage() {
  const source = join(dist, '404', 'index.html')
  if (!existsSync(source)) return false
  await copyFile(source, join(dist, '404.html'))
  return true
}

async function main() {
  if (!existsSync(dist)) {
    throw new Error('dist/ not found — run the site build before this script.')
  }
  await mkdir(dist, { recursive: true })

  const count = await writeSitemap()
  await writeRobots()
  const notFound = await writeNotFoundPage()

  const pages = (await readdir(dist, { withFileTypes: true })).filter((entry) =>
    entry.isDirectory()
  ).length

  console.log(
    `\n[seo] sitemap.xml: ${count} URLs · robots.txt written · 404.html ${
      notFound ? 'written' : 'skipped (no prerendered 404 route)'
    } · ${pages} top-level directories in dist/`
  )

  if (originIsPlaceholder) {
    console.warn(
      '[seo] WARNING: the site origin is still the placeholder. Set VITE_SITE_ORIGIN at build time (the deploy workflow does) before going live.'
    )
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
