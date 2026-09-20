import { hasAddress, site } from '../config/site.js'
import { path } from '../config/routes.js'
import { absoluteUrl } from './links.js'

/**
 * schema.org LocalBusiness built only from information the client has supplied.
 * Optional blocks (postal address, logo, image) switch themselves on as soon as
 * the matching value appears in src/config/site.js. Nothing is invented: no
 * geo coordinates, no ratings, no price range, no founding date.
 */
export function localBusinessJsonLd(lang) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.companyName,
    url: absoluteUrl(path('home', lang)),
    telephone: site.phone.display,
    email: site.email.display,
    openingHoursSpecification: site.openingHours.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.days.map((day) => DAY_NAMES[day]).filter(Boolean),
      opens: slot.opens,
      closes: slot.closes,
    })),
  }

  if (hasAddress) {
    data.address = {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode ?? undefined,
      addressLocality: site.address.city ?? undefined,
      addressRegion: site.address.region ?? undefined,
      addressCountry: site.address.country,
    }
  }

  if (site.logo) {
    data.logo = absoluteUrl(site.logo)
  }

  return data
}

const DAY_NAMES = {
  Mo: 'Monday',
  Tu: 'Tuesday',
  We: 'Wednesday',
  Th: 'Thursday',
  Fr: 'Friday',
  Sa: 'Saturday',
  Su: 'Sunday',
}
