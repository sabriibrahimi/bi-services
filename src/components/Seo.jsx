import { Head } from 'vite-react-ssg'
import { useLocation } from 'react-router-dom'
import { site } from '../config/site.js'
import { content } from '../data/content.js'
import { t, useLanguage, localeTag } from '../utils/i18n.js'
import { absoluteUrl, getAlternatePath, normalisePath } from '../utils/links.js'

/**
 * Per-page metadata, written into the prerendered HTML: title, description,
 * canonical, hreflang pair (plus x-default → French), Open Graph and Twitter
 * tags. Pages pass either a `pageKey` from content.meta or explicit strings.
 */
export default function Seo({
  pageKey,
  title,
  description,
  image,
  type = 'website',
  noindex = false,
  jsonLd,
}) {
  const lang = useLanguage()
  const { pathname } = useLocation()

  const metaEntry = pageKey ? content.meta[pageKey] : null
  const resolvedTitle = title ?? t(metaEntry?.title, lang)
  const resolvedDescription = description ?? t(metaEntry?.description, lang)

  const canonical = absoluteUrl(pathname)
  const frUrl = absoluteUrl(lang === 'fr' ? normalisePath(pathname) : getAlternatePath(pathname, 'fr'))
  const enUrl = absoluteUrl(lang === 'en' ? normalisePath(pathname) : getAlternatePath(pathname, 'en'))
  const ogImage = image ?? site.ogImage
  const ogImageUrl = ogImage ? absoluteUrl(ogImage) : null

  return (
    <Head>
      <html lang={lang} />
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      {noindex ? <meta name="robots" content="noindex, follow" /> : null}

      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="fr" href={frUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={frUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.companyName} />
      <meta property="og:locale" content={localeTag(lang).replace('-', '_')} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={canonical} />
      {ogImageUrl ? <meta property="og:image" content={ogImageUrl} /> : null}
      {ogImageUrl ? <meta property="og:image:width" content="1200" /> : null}
      {ogImageUrl ? <meta property="og:image:height" content="630" /> : null}

      <meta name="twitter:card" content={ogImageUrl ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      {ogImageUrl ? <meta name="twitter:image" content={ogImageUrl} /> : null}

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Head>
  )
}
