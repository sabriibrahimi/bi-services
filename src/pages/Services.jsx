import { path } from '../config/routes.js'
import { content } from '../data/content.js'
import { t, useLanguage } from '../utils/i18n.js'
import { pageImage } from '../utils/pageImage.js'
import Action from '../components/Action.jsx'
import CtaBand from '../components/CtaBand.jsx'
import Media from '../components/Media.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Seo from '../components/Seo.jsx'
import './Services.css'

/**
 * Every service is set out the same way, so the page reads as one system:
 *
 *   1. intro    — the service in words, beside the photograph that opens it
 *   2. what     — the materials (parquet) or the range of coverings, each
 *                 covering beside its own photographs (soft floors)
 *   3. process  — the steps, in two columns
 *
 * Two image shapes only: the lead photograph and the covering pairs. Each
 * photograph sits next to the words it illustrates.
 */
export default function Services() {
  const lang = useLanguage()

  return (
    <>
      <Seo pageKey="services" />

      <PageHeader
        eyebrow={t(content.services.eyebrow, lang)}
        title={t(content.services.title, lang)}
        lead={t(content.services.intro, lang)}
      />

      {content.serviceList.map((service, index) => (
        <section
          key={service.id}
          className={`service service--${index % 2 === 0 ? 'a' : 'b'}`}
          aria-labelledby={`service-${service.id}`}
        >
          <div className="shell">
            {/* ------------------------------------------------- Intro -- */}
            <div className="service__intro">
              <Reveal className="service__head">
                <p className="service__number" aria-hidden="true">
                  {service.number}
                </p>
                <h2 className="service__title" id={`service-${service.id}`}>
                  {t(service.title, lang)}
                </h2>
                <p className="prose service__body">{t(service.body, lang)}</p>
                <Action to={path('contact', lang)} variant="text" className="service__cta">
                  {t(service.cta, lang)}
                </Action>
              </Reveal>

              <Reveal className="service__lead" delay={100}>
                <Media
                  {...pageImage(service.lead, service.imagePlaceholder)}
                  tone="linen"
                  ratio="4 / 3"
                  ratioSm="3 / 2"
                  sizes="(min-width: 62rem) 50vw, 100vw"
                />
              </Reveal>
            </div>

            {/* -------------------------------------------------- What -- */}
            {service.range ? (
              <div className="range" id="revetements">
                <h3 className="service__subtitle">{t(content.services.rangeLabel, lang)}</h3>
                {service.range.map((material) => (
                  <Reveal className="range__row" key={material.id}>
                    <div className="range__text">
                      <h4 className="range__name">{t(material.name, lang)}</h4>
                      <p className="range__body">{t(material.body, lang)}</p>
                    </div>
                    <div className="range__pair">
                      {material.images.map((name) => (
                        <Media
                          key={name}
                          className="range__image"
                          {...pageImage(name)}
                          tone="stone"
                          sizes="(min-width: 62rem) 30vw, 60vw"
                        />
                      ))}
                    </div>
                  </Reveal>
                ))}
                <p className="materials__note range__note">{t(content.services.materialsNote, lang)}</p>
              </div>
            ) : (
              <div className="service__what">
                <Reveal className="service__detail">
                  <Media
                    {...pageImage(service.detail, service.detailPlaceholder)}
                    tone="linen"
                    ratio="5 / 4"
                    ratioSm="3 / 2"
                    sizes="(min-width: 62rem) 45vw, 100vw"
                  />
                </Reveal>

                <Reveal className="service__materials" delay={100}>
                  <h3 className="service__subtitle">{t(content.services.materialsLabel, lang)}</h3>
                  <ul className="materials">
                    {service.materials[lang].map((material) => (
                      <li className="materials__item" key={material}>
                        {material}
                      </li>
                    ))}
                  </ul>
                  <p className="materials__note">{t(content.services.materialsNote, lang)}</p>
                </Reveal>
              </div>
            )}

            {/* ----------------------------------------------- Process -- */}
            <Reveal className="service__process">
              <h3 className="service__subtitle">{t(content.services.processLabel, lang)}</h3>
              <ol className="steps">
                {service.process.map((step, stepIndex) => (
                  <li className="steps__item" key={step.title.fr}>
                    <span className="steps__index" aria-hidden="true">
                      {String(stepIndex + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="steps__title">{t(step.title, lang)}</h4>
                      <p className="steps__body">{t(step.body, lang)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>
      ))}

      <CtaBand
        eyebrow={t(content.common.quoteCta, lang)}
        title={t(content.services.ctaTitle, lang)}
        body={t(content.services.ctaBody, lang)}
      />
    </>
  )
}
