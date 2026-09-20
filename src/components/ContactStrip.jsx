import { formatAddress, hasAddress, site } from '../config/site.js'
import { content } from '../data/content.js'
import { t, useLanguage } from '../utils/i18n.js'
import Reveal from './Reveal.jsx'
import './ContactStrip.css'

/** Phone, email, opening hours and address in one quiet horizontal band. */
export default function ContactStrip({ withAddress = true }) {
  const lang = useLanguage()
  const address = formatAddress()

  return (
    <Reveal as="dl" className="contact-strip">
      <div className="contact-strip__item">
        <dt className="contact-strip__label">{t(content.common.phoneLabel, lang)}</dt>
        <dd className="contact-strip__value">
          <a href={site.phone.href}>{site.phone.display}</a>
        </dd>
      </div>

      <div className="contact-strip__item">
        <dt className="contact-strip__label">{t(content.common.emailLabel, lang)}</dt>
        <dd className="contact-strip__value">
          <a href={site.email.href}>{site.email.display}</a>
        </dd>
      </div>

      <div className="contact-strip__item">
        <dt className="contact-strip__label">{t(content.common.hoursLabel, lang)}</dt>
        <dd className="contact-strip__value contact-strip__value--plain">
          {t(content.common.hoursWeek, lang)}
          <span className="muted">{t(content.common.hoursWeekend, lang)}</span>
        </dd>
      </div>

      {withAddress ? (
        <div className="contact-strip__item">
          <dt className="contact-strip__label">{t(content.common.addressLabel, lang)}</dt>
          <dd className="contact-strip__value contact-strip__value--plain">
            {hasAddress ? (
              address.map((line) => <span key={line}>{line}</span>)
            ) : (
              <span className="contact-strip__placeholder">
                {t(content.brand.addressPlaceholder, lang)}
              </span>
            )}
          </dd>
        </div>
      ) : null}
    </Reveal>
  )
}
