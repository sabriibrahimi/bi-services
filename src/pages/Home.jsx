import { Link } from 'react-router-dom'
import { path } from '../config/routes.js'
import { site } from '../config/site.js'
import { content } from '../data/content.js'
import { featuredProjects } from '../data/projects.js'
import { t, useLanguage } from '../utils/i18n.js'
import { siteImage } from '../utils/siteImage.js'
import Action from '../components/Action.jsx'
import ContactStrip from '../components/ContactStrip.jsx'
import Media from '../components/Media.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHead from '../components/SectionHead.jsx'
import Seo from '../components/Seo.jsx'
import './Home.css'

export default function Home() {
  const lang = useLanguage()
  const slogan = site.slogan[lang]
  const services = content.serviceList
  const projects = featuredProjects.slice(0, 4)

  return (
    <>
      <Seo pageKey="home" />

      {/* ---------------------------------------------------------- Hero -- */}
      <section className="hero">
        <div className="shell hero__head">
          <p className="eyebrow">{t(content.home.heroEyebrow, lang)}</p>
          <h1 className="hero__title">
            <span className="hero__title-main">BI SERVICES</span>
            <span className="hero__title-legal">Sàrl</span>
          </h1>
          {slogan ? (
            <p className="hero__slogan">{slogan}</p>
          ) : (
            <p className="hero__slogan hero__slogan--placeholder">
              {t(content.brand.sloganPlaceholder, lang)}
            </p>
          )}
        </div>

        <div className="hero__stage">
          <Media
            className="hero__media"
            {...siteImage('hero', content.home.heroPlaceholder)}
            tone="charcoal"
            ratio="4 / 3"
            sizes="100vw"
            priority
          />

          <div className="hero__panel">
            <p className="hero__statement">{t(content.home.heroStatement, lang)}</p>
            <div className="hero__actions">
              <Action to={path('contact', lang)} variant="solid" size="lg">
                {t(content.common.quoteCta, lang)}
              </Action>
              <a className="hero__phone" href={site.phone.href}>
                <span className="hero__phone-label">{t(content.common.callCta, lang)}</span>
                <span className="hero__phone-number">{site.phone.display}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Introduction -- */}
      <section className="section intro">
        <div className="shell intro__grid">
          <Reveal className="intro__text">
            <p className="eyebrow">{t(content.home.introEyebrow, lang)}</p>
            <h2 className="intro__title">{t(content.home.introTitle, lang)}</h2>
            <div className="prose intro__body">
              <p>{t(content.home.introBody1, lang)}</p>
              <p>{t(content.home.introBody2, lang)}</p>
            </div>
            <Action to={path('services', lang)} variant="text">
              {t(content.common.seeServices, lang)}
            </Action>
          </Reveal>

          <Reveal className="intro__media" delay={120}>
            <Media
              {...siteImage('intro-principale', content.home.introPlaceholder)}
              tone="oak"
              ratio="3 / 4"
              ratioSm="4 / 3"
              sizes="(min-width: 62rem) 38vw, 100vw"
            />
            <figure className="intro__detail">
              <Media
                {...siteImage('intro-detail', content.home.introDetailPlaceholder)}
                tone="linen"
                ratio="1 / 1"
                sizes="(min-width: 62rem) 18vw, 45vw"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- Services -- */}
      <section className="section services-preview">
        <div className="shell">
          <SectionHead
            eyebrow={t(content.home.servicesEyebrow, lang)}
            title={t(content.home.servicesTitle, lang)}
            action={
              <Action to={path('services', lang)} variant="text">
                {t(content.home.servicesLink, lang)}
              </Action>
            }
          />

          <div className="services-preview__list">
            {services.map((service, index) => (
              <Reveal
                key={service.id}
                className={`service-teaser service-teaser--${index % 2 === 0 ? 'a' : 'b'}`}
              >
                <Link className="service-teaser__link" to={path('services', lang)}>
                  <Media
                    className="service-teaser__media"
                    {...siteImage(service.photo, service.imagePlaceholder)}
                    tone={index % 2 === 0 ? 'walnut' : 'stone'}
                    ratio={index % 2 === 0 ? '4 / 5' : '5 / 4'}
                    ratioSm={index % 2 === 0 ? '4 / 3' : '3 / 2'}
                    sizes="(min-width: 62rem) 50vw, 100vw"
                  />
                  <div className="service-teaser__body">
                    <span className="service-teaser__number" aria-hidden="true">
                      {service.number}
                    </span>
                    <h3 className="service-teaser__title">{t(service.title, lang)}</h3>
                    <p className="service-teaser__text">{t(service.short, lang)}</p>
                    <span className="service-teaser__cta">{t(content.common.discover, lang)}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------- Featured projects -- */}
      <section className="section featured">
        <div className="shell">
          <SectionHead
            eyebrow={t(content.home.projectsEyebrow, lang)}
            title={t(content.home.projectsTitle, lang)}
            lead={t(content.home.projectsIntro, lang)}
            action={
              <Action to={path('projects', lang)} variant="text">
                {t(content.common.allProjects, lang)}
              </Action>
            }
          />

          <div className="featured__grid">
            {projects.map((project, index) => (
              <Reveal
                key={project.slug[lang]}
                className={`featured__item featured__item--${index + 1}`}
                delay={(index % 3) * 60}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  size={index === 0 ? 'lg' : index === 2 ? 'sm' : 'md'}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Why -- */}
      <section className="section section--tall why is-dark">
        <div className="shell">
          <SectionHead
            eyebrow={t(content.home.whyEyebrow, lang)}
            title={t(content.home.whyTitle, lang)}
            align="wide"
          />

          <ol className="why__list">
            {content.home.why.map((item, index) => (
              <Reveal as="li" key={item.title.fr} className="why__item" delay={index * 70}>
                <span className="why__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="why__title">{t(item.title, lang)}</h3>
                <p className="why__body">{t(item.body, lang)}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* -------------------------------------------------------- Contact -- */}
      <section className="section contact-preview">
        <div className="shell">
          <div className="contact-preview__head">
            <Reveal>
              <p className="eyebrow">{t(content.home.contactEyebrow, lang)}</p>
              <h2 className="contact-preview__title">{t(content.home.contactTitle, lang)}</h2>
            </Reveal>
            <Reveal className="contact-preview__aside" delay={80}>
              <p className="lead">{t(content.home.contactBody, lang)}</p>
              <Action to={path('contact', lang)} variant="outline">
                {t(content.common.quoteCta, lang)}
              </Action>
            </Reveal>
          </div>

          <ContactStrip />
        </div>
      </section>
    </>
  )
}
