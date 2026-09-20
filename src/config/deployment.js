/**
 * Where the built site will live.
 *
 * Both values come from the environment at build time, so the same source
 * deploys to a sub-path (a GitHub Pages project site, served at
 * /<repo>/) or to the root of a domain without editing anything here:
 *
 *   VITE_BASE         '/bi-services/'            path prefix, slash-wrapped
 *   VITE_SITE_ORIGIN  'https://you.github.io'    scheme + host, no trailing slash
 *
 * Neither is set during `npm run dev`, so local development stays at '/' with
 * the placeholder domain.
 *
 * This module is read both by the app (where Vite provides import.meta.env)
 * and by scripts/generate-seo-files.mjs (plain Node, where process.env is the
 * only source), hence the two guarded lookups.
 */

const viteEnv = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {}
const nodeEnv = typeof process !== 'undefined' && process.env ? process.env : {}

/** Normalise to a single leading and trailing slash: '/repo/' or '/'. */
function normaliseBase(value) {
  if (!value || value === '/') return '/'
  return `/${String(value).replace(/^\/+|\/+$/g, '')}/`
}

/**
 * The path prefix the site is served under.
 * Vite exposes its own `base` as import.meta.env.BASE_URL, which is the
 * authority inside the app; Node scripts read the same value from VITE_BASE.
 */
export const basePath = normaliseBase(viteEnv.BASE_URL || nodeEnv.VITE_BASE || '/')

/** True while no real origin has been configured. */
export const originIsPlaceholder = !(viteEnv.VITE_SITE_ORIGIN || nodeEnv.VITE_SITE_ORIGIN)

/** Scheme and host the site is served from, without a trailing slash. */
export const origin = (
  viteEnv.VITE_SITE_ORIGIN ||
  nodeEnv.VITE_SITE_ORIGIN ||
  'https://example-domain-to-be-provided.ch'
).replace(/\/$/, '')

/**
 * A file in public/ addressed from the served root.
 * asset('/images/x.webp') -> '/bi-services/images/x.webp'
 */
export function asset(pathname) {
  if (!pathname) return pathname
  if (/^[a-z]+:|^\/\//i.test(pathname)) return pathname // already absolute
  return `${basePath}${String(pathname).replace(/^\//, '')}`
}

/**
 * An in-site route, prefixed with the base.
 * React Router's own basename already does this for <Link>; use this for
 * canonical URLs, sitemap entries and anything written as a raw href.
 */
export const withBase = asset

/** Fully-qualified URL for a route path. */
export function absolute(pathname) {
  return `${origin}${withBase(pathname)}`
}
