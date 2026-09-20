import { path } from '../config/routes.js'
import { content } from '../data/content.js'
import { t, useLanguage } from '../utils/i18n.js'
import { siteImage } from '../utils/siteImage.js'
import Action from '../components/Action.jsx'
import CtaBand from '../components/CtaBand.jsx'
import Media from '../components/Media.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Seo from '../components/Seo.jsx'
import './Services.css'

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

      {content.serviceList.map((service, index) => {
        const variant = index % 2 === 0 ? 'a' : 'b'
        return (
          <section
            key={service.id}
            className={`service service--${variant}`}
            aria-labelledby={`service-${service.id}`}
          >
            <div className="shell service__grid">
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

              <Reveal className="service__media" delay={80}>
                <Media
                  {...siteImage(service.photoSecondary, service.imagePlaceholder)}
                  tone={variant === 'a' ? 'walnut' : 'oak'}
                  ratio={variant === 'a' ? '4 / 5' : '3 / 4'}
                  ratioSm={variant === 'a' ? '4 / 3' : '3 / 2'}
                  sizes="(min-width: 62rem) 42vw, 100vw"
                />
              </Reveal>

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

              <Reveal className="service__materials" delay={60}>
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

              <Reveal className="service__detail" delay={120}>
                <Media
                  {...siteImage(service.photoDetail, service.detailPlaceholder)}
                  tone={variant === 'a' ? 'linen' : 'stone'}
                  ratio="16 / 10"
                  sizes="(min-width: 62rem) 30vw, 100vw"
                />
              </Reveal>
            </div>
          </section>
        )
      })}

      <CtaBand
        eyebrow={t(content.common.quoteCta, lang)}
        title={t(content.services.ctaTitle, lang)}
        body={t(content.services.ctaBody, lang)}
      />
    </>
  )
}
