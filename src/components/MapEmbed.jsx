import { useState } from 'react'
import { hasMap, site } from '../config/site.js'
import { content } from '../data/content.js'
import { t, tf, useLanguage } from '../utils/i18n.js'
import Media from './Media.jsx'
import './MapEmbed.css'

/**
 * The map is a third-party frame that sets its own cookies, so it is never
 * loaded until the visitor asks for it. Until an embed URL is configured in
 * src/config/site.js the block stays a clearly marked placeholder.
 */
export default function MapEmbed() {
  const lang = useLanguage()
  const [loaded, setLoaded] = useState(false)

  if (!hasMap) {
    return (
      <div className="map">
        <Media
          src={null}
          label={content.contact.mapPlaceholder}
          tone="stone"
          ratio="16 / 10"
        />
      </div>
    )
  }

  if (!loaded) {
    return (
      <div className="map map--consent">
        <div className="map__consent">
          <h3 className="map__consent-title">{t(content.contact.mapConsentTitle, lang)}</h3>
          <p className="map__consent-body">
            {tf(content.contact.mapConsentBody, lang, { provider: site.map.provider })}
          </p>
          <button type="button" className="action action--outline" onClick={() => setLoaded(true)}>
            <span className="action__label">{t(content.contact.mapConsentButton, lang)}</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="map">
      <iframe
        className="map__frame"
        src={site.map.embedUrl}
        title={t(content.contact.mapFrameTitle, lang)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      {site.map.directionsUrl ? (
        <a
          className="map__directions"
          href={site.map.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t(content.contact.mapDirections, lang)}
        </a>
      ) : null}
    </div>
  )
}
