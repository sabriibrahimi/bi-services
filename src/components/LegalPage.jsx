import { content } from '../data/content.js'
import { t, useLanguage } from '../utils/i18n.js'
import PageHeader from './PageHeader.jsx'
import Reveal from './Reveal.jsx'
import Seo from './Seo.jsx'
import './LegalPage.css'

/**
 * Shared shell for the legal notice and the privacy policy: real structure and
 * headings, with the body text still to be written and reviewed by the client.
 * Nothing here claims the site is compliant with anything.
 */
export default function LegalPage({ pageKey, data }) {
  const lang = useLanguage()

  return (
    <>
      <Seo pageKey={pageKey} />

      <PageHeader eyebrow={t(data.eyebrow, lang)} title={t(data.title, lang)} />

      <section className="section section--flush-top legal">
        <div className="shell legal__grid">
          <Reveal className="legal__notice">
            <p className="legal__badge">{t(content.legalPages.placeholderBadge, lang)}</p>
            <p className="legal__notice-body">{t(content.legalPages.placeholderNotice, lang)}</p>
          </Reveal>

          <div className="legal__content">
            {data.sections.map((section, index) => (
              <Reveal as="section" className="legal__section" key={section.title.fr} delay={index * 40}>
                <h2 className="legal__title">
                  <span className="legal__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {t(section.title, lang)}
                </h2>
                <p className="legal__body">{t(section.body, lang)}</p>
                <p className="legal__placeholder">{t(content.legalPages.sectionPlaceholder, lang)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
