/**
 * Single source of truth for every client detail.
 * Replace the values marked "TO BE PROVIDED" once the client supplies them —
 * nothing else in the codebase needs to change.
 */

import { origin } from './deployment.js'

export const site = {
  // --- Identity -------------------------------------------------------------
  companyName: 'BI SERVICES sàrl',
  founder: 'Blerim Ibrahimi',

  /**
   * The hand-plane mark, traced from the logo the client supplied, as a
   * standalone file (used for structured data and link previews). The same
   * drawing is inlined in src/components/PlaneMark.jsx so it can inherit the
   * text colour on screen.
   */
  logo: '/logo-mark.svg',

  /** Brand line from the business card, shown under the company name. */
  slogan: {
    fr: 'Un sol en harmonie avec l’art de la vie',
    en: 'A floor in harmony with the art of living',
  },

  // --- Contact --------------------------------------------------------------
  phone: {
    display: '+41 79 947 39 43',
    href: 'tel:+41799473943',
  },
  email: {
    display: 'info@bi-services.ch',
    href: 'mailto:info@bi-services.ch',
  },

  /**
   * Postal address. Set every field once supplied; `street` being null keeps the
   * site in placeholder mode (also for the map and the LocalBusiness JSON-LD).
   */
  address: {
    street: 'Chemin François-Chavaz 24',
    postalCode: '1213',
    city: 'Onex',
    region: 'Genève',
    country: 'CH',
  },

  /** Opening hours, used for display and for structured data. */
  openingHours: [
    { days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], opens: '07:30', closes: '17:00' },
  ],

  // --- Web ------------------------------------------------------------------
  /**
   * Canonical origin, no trailing slash. Used for canonicals, OG tags, sitemap.
   * Set through VITE_SITE_ORIGIN at build time (the deploy workflow fills it in
   * from the GitHub Pages URL); falls back to the placeholder locally.
   * See src/config/deployment.js.
   */
  domain: origin,

  /**
   * Open Graph image (1200x630 JPEG), generated from photos-source/ by
   * `npm run images`. Change OG_PHOTO in scripts/optimise-images.mjs to use a
   * different photograph.
   */
  ogImage: '/og-image.jpg',

  // --- Map ------------------------------------------------------------------
  map: {
    /**
     * Embed URL (Google Maps / OpenStreetMap). Loaded only after the visitor
     * clicks "load the map", because the provider sets third-party cookies.
     */
    embedUrl:
      'https://www.google.com/maps?q=Chemin%20Fran%C3%A7ois-Chavaz%2024%2C%201213%20Onex&output=embed',
    /** Link opened in a new tab for directions. */
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Chemin%20Fran%C3%A7ois-Chavaz%2024%2C%201213%20Onex',
    provider: 'Google Maps',
  },

  // --- Contact form ---------------------------------------------------------
  form: {
    /**
     * 'server' | 'formspree' | 'netlify' | null
     * 'server' posts to the site's own handler (server/contact-api), which
     * emails each request to info@bi-services.ch through Infomaniak.
     * While null, the form stays visible but explains that the online form is
     * not active yet and invites the visitor to call or write. It never pretends
     * a message was sent.
     */
    provider: 'server',
    /** Path of the site's own handler, on the same domain as the site. */
    endpoint: '/api/contact',
    /** Formspree endpoint, e.g. 'https://formspree.io/f/xxxxxxx'. */
    formspreeEndpoint: null,
    /** Netlify form name as declared in the static form. */
    netlifyFormName: 'contact',
    maxFiles: 5,
    maxFileSizeMb: 10,
    /** All photographs together: keeps the email under mail-server limits. */
    maxTotalMb: 20,
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],
  },

  // --- Legal ----------------------------------------------------------------
  languages: ['fr', 'en'],
  defaultLanguage: 'fr',
}

/** True once a usable postal address has been supplied. */
export const hasAddress = Boolean(site.address.street && site.address.city)

/** True once a map embed has been configured. */
export const hasMap = Boolean(site.map.embedUrl)

/** True once a form back-end has been configured. */
export const hasFormService = Boolean(
  (site.form.provider === 'server' && site.form.endpoint) ||
    (site.form.provider === 'formspree' && site.form.formspreeEndpoint) ||
    site.form.provider === 'netlify'
)

/** Address formatted on one or several lines, or null while unavailable. */
export function formatAddress() {
  if (!hasAddress) return null
  const { street, postalCode, city } = site.address
  return [street, [postalCode, city].filter(Boolean).join(' ')].filter(Boolean)
}

export default site
