import { formatAddress, hasAddress, site } from '../config/site.js'
import { content } from '../data/content.js'
import { t, useLanguage } from '../utils/i18n.js'
import ContactForm from '../components/ContactForm.jsx'
import MapEmbed from '../components/MapEmbed.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Seo from '../components/Seo.jsx'
import './Contact.css'

export default function Contact() {
  const lang = useLanguage()
  const address = formatAddress()

  return (
    <>
      <Seo pageKey="contact" />

      <PageHeader
        eyebrow={t(content.contact.eyebrow, lang)}
        title={t(content.contact.title, lang)}
        lead={t(content.contact.intro, lang)}
      />

      <section className="section section--flush-top contact">
        <div className="shell contact__grid">
          {/* ------------------------------------------------- Coordinates -- */}
          <Reveal className="contact__details">
            <dl className="contact__list">
              <div className="contact__row">
                <dt>{t(content.common.phoneLabel, lang)}</dt>
                <dd>
                  <a className="contact__major" href={site.phone.href}>
                    {site.phone.display}
                  </a>
                </dd>
              </div>

              <div className="contact__row">
                <dt>{t(content.common.emailLabel, lang)}</dt>
                <dd>
                  <a className="contact__major" href={site.email.href}>
                    {site.email.display}
                  </a>
                </dd>
              </div>

              <div className="contact__row">
                <dt>{t(content.common.hoursLabel, lang)}</dt>
                <dd>
                  <span>{t(content.common.hoursWeek, lang)}</span>
                  <span className="muted">{t(content.common.hoursWeekend, lang)}</span>
                  <span className="contact__note">{t(content.contact.hoursNote, lang)}</span>
                </dd>
              </div>

              <div className="contact__row">
                <dt>{t(content.common.addressLabel, lang)}</dt>
                <dd>
                  {hasAddress ? (
                    <address className="contact__address">
                      {address.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </address>
                  ) : (
                    <span className="contact__placeholder">
                      {t(content.brand.addressPlaceholder, lang)}
                    </span>
                  )}
                </dd>
              </div>
            </dl>

          </Reveal>

          {/* -------------------------------------------------------- Form -- */}
          <Reveal className="contact__form" delay={80}>
            <h2 className="contact__subtitle">{t(content.contact.formTitle, lang)}</h2>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- Map -- */}
      <section className="section contact__map-section">
        <div className="shell">
          <h2 className="contact__subtitle">{t(content.contact.mapTitle, lang)}</h2>
          <MapEmbed />
        </div>
      </section>
    </>
  )
}
