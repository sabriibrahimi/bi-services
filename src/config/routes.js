/**
 * Route map. Every page exists under a language prefix: /fr/... and /en/...
 * `key` is how the rest of the app refers to a page; the values are the
 * localised URL segments.
 */
export const LANGUAGES = ['fr', 'en']
export const DEFAULT_LANGUAGE = 'fr'

export const routeSegments = {
  home: { fr: '', en: '' },
  services: { fr: 'services', en: 'services' },
  projects: { fr: 'realisations', en: 'projects' },
  project: { fr: 'realisations', en: 'projects' }, // + '/:slug'
  contact: { fr: 'contact', en: 'contact' },
  legal: { fr: 'mentions-legales', en: 'legal-notice' },
  privacy: { fr: 'confidentialite', en: 'privacy-policy' },
}

/** Pages that appear in the main navigation, in order. */
export const navKeys = ['home', 'services', 'projects', 'contact']

/** Pages that appear in the footer's legal row. */
export const legalKeys = ['legal', 'privacy']

/**
 * Build an absolute in-site path for a page key.
 * path('projects', 'fr')            -> '/fr/realisations'
 * path('project', 'en', 'my-slug')  -> '/en/projects/my-slug'
 */
export function path(key, lang = DEFAULT_LANGUAGE, slug) {
  const segment = routeSegments[key]?.[lang] ?? ''
  const parts = [lang, segment, slug].filter((part) => part !== '' && part != null)
  // Always absolute: a relative link would resolve against the current URL.
  return parts.length === 1 ? `/${parts[0]}/` : `/${parts.join('/')}`
}

/** All page keys that have their own prerendered, language-prefixed URL. */
export const staticPageKeys = ['home', 'services', 'projects', 'contact', 'legal', 'privacy']
