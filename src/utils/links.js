import { DEFAULT_LANGUAGE, LANGUAGES, path, routeSegments } from '../config/routes.js'
import { projects } from '../data/projects.js'
import { absolute } from '../config/deployment.js'

/** Split a pathname into ['fr', 'realisations', 'slug']. */
function segments(pathname) {
  return pathname.split('/').filter(Boolean)
}

/** Language of a pathname, falling back to French. */
export function languageFromPath(pathname) {
  const [first] = segments(pathname)
  return LANGUAGES.includes(first) ? first : DEFAULT_LANGUAGE
}

/**
 * The equivalent URL of `pathname` in `targetLang`.
 * A project page maps to the same project; an unknown page falls back to the
 * home page of the target language.
 */
export function getAlternatePath(pathname, targetLang) {
  const [lang, first, second] = segments(pathname)
  const currentLang = LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE

  if (!first) return path('home', targetLang)

  // Project detail: /<lang>/realisations/<slug>
  if (first === routeSegments.projects[currentLang] && second) {
    const project = projects.find((item) => item.slug[currentLang] === decodeURIComponent(second))
    return project
      ? path('project', targetLang, project.slug[targetLang])
      : path('projects', targetLang)
  }

  const key = Object.keys(routeSegments).find(
    (candidate) => candidate !== 'project' && routeSegments[candidate][currentLang] === first
  )

  return key ? path(key, targetLang) : path('home', targetLang)
}

/** Both language versions of a pathname, for hreflang tags. */
export function getAlternates(pathname) {
  const lang = languageFromPath(pathname)
  return {
    [lang]: normalisePath(pathname),
    [lang === 'fr' ? 'en' : 'fr']: getAlternatePath(pathname, lang === 'fr' ? 'en' : 'fr'),
  }
}

/** Collapse a pathname to the canonical form used across the site. */
export function normalisePath(pathname) {
  if (!pathname) return '/'
  const parts = segments(pathname)
  if (parts.length === 1 && LANGUAGES.includes(parts[0])) return `/${parts[0]}/`
  return `/${parts.join('/')}`
}

/** Absolute URL built from the configured origin, including any base path. */
export function absoluteUrl(pathname) {
  return absolute(normalisePath(pathname))
}
