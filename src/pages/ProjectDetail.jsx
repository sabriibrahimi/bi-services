import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { path } from '../config/routes.js'
import { content } from '../data/content.js'
import { findProjectBySlug, getProjectNeighbours } from '../data/projects.js'
import { t, useLanguage } from '../utils/i18n.js'
import { toneForIndex } from '../utils/tones.js'
import Action from '../components/Action.jsx'
import BeforeAfter from '../components/BeforeAfter.jsx'
import CtaBand from '../components/CtaBand.jsx'
import Lightbox from '../components/Lightbox.jsx'
import Media from '../components/Media.jsx'
import Reveal from '../components/Reveal.jsx'
import Seo from '../components/Seo.jsx'
import NotFound from './NotFound.jsx'
import './ProjectDetail.css'

export default function ProjectDetail() {
  const lang = useLanguage()
  const { slug } = useParams()
  const project = findProjectBySlug(slug, lang)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  // An unknown slug is a 404, in the language of the URL.
  if (!project) return <NotFound />

  const { previous, next } = getProjectNeighbours(project)
  const gallery = project.gallery ?? []
  const hasBeforeAfter = Boolean(project.beforeImage && project.afterImage)

  const title = t(project.title, lang)
  const metaPrefix = t(content.meta.projectPrefix, lang)

  // Location and service keep every project's description distinct, even while
  // the project texts themselves are placeholders.
  const metaDescription = `${title}, ${t(project.location, lang)}. ${
    project.services[lang]?.join(', ') ?? ''
  }. ${t(project.description, lang)}`.slice(0, 300)

  return (
    <>
      <Seo
        title={`${title} — ${metaPrefix} | BI SERVICES Sàrl`}
        description={metaDescription}
        type="article"
      />

      <article className="project">
        {/* ------------------------------------------------------- Header -- */}
        <header className="project__header">
          <div className="shell project__intro">
            <Link className="project__back" to={path('projects', lang)}>
              <svg viewBox="0 0 24 12" aria-hidden="true" focusable="false">
                <path d="M24 6H2M7 1L2 6l5 5" fill="none" stroke="currentColor" strokeWidth="1.25" />
              </svg>
              {t(content.projectDetail.backToProjects, lang)}
            </Link>

            <h1 className="project__title">{title}</h1>

            <p className="project__meta">
              <span>{t(project.location, lang)}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
            </p>
          </div>

          <Media
            className="project__cover"
            {...(project.cover ?? {})}
            label={project.coverPlaceholder ?? content.projectDetail.coverPlaceholderFallback}
            tone="charcoal"
            ratio="16 / 9"
            priority
            sizes="100vw"
          />
        </header>

        {/* ------------------------------------------------------ Gallery -- */}
        <section className="section project__gallery-section">
          <div className="shell">
            <h2 className="project__subtitle">{t(content.projectDetail.galleryTitle, lang)}</h2>

            {gallery.length > 0 ? (
              <ul className="project__gallery">
                {gallery.map((image, index) => (
                  <li className="project__gallery-item" key={image.src}>
                    <button
                      type="button"
                      className="project__gallery-button"
                      onClick={() => setLightboxIndex(index)}
                    >
                      <span className="visually-hidden">
                        {t(content.lightbox.openImage, lang)} — {t(image.alt, lang)}
                      </span>
                      <Media
                        {...image}
                        label={image.alt}
                        ratio={index % 3 === 0 ? '4 / 3' : '3 / 4'}
                        ratioSm={index % 3 === 0 ? '3 / 2' : '4 / 3'}
                        tone={toneForIndex(index)}
                        sizes="(min-width: 62rem) 45vw, 100vw"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="project__gallery">
                {[0, 1].map((index) => (
                  <li className="project__gallery-item" key={index}>
                    <Media
                      src={null}
                      label={content.projectDetail.galleryEmpty}
                      tone={toneForIndex(index + 1)}
                      ratio={index === 0 ? '4 / 3' : '3 / 4'}
                      ratioSm={index === 0 ? '3 / 2' : '4 / 3'}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* ------------------------------------------------- Before/after -- */}
        {hasBeforeAfter ? (
          <section className="section section--flush-top">
            <div className="shell">
              <h2 className="project__subtitle">{t(content.projectDetail.beforeAfterTitle, lang)}</h2>
              <BeforeAfter
                before={project.beforeImage}
                after={project.afterImage}
                beforeAlt={project.beforeAlt ?? content.projectDetail.beforeLabel}
                afterAlt={project.afterAlt ?? content.projectDetail.afterLabel}
              />
            </div>
          </section>
        ) : null}

        {/* --------------------------------------------------- Navigation -- */}
        <nav className="project__nav" aria-label={t(content.projects.eyebrow, lang)}>
          <div className="shell project__nav-inner">
            {previous ? (
              <Link className="project__nav-link" to={path('project', lang, previous.slug[lang])}>
                <span className="project__nav-label">
                  {t(content.projectDetail.previousProject, lang)}
                </span>
                <span className="project__nav-title">{t(previous.title, lang)}</span>
              </Link>
            ) : (
              <span />
            )}

            <Action to={path('projects', lang)} variant="text" className="project__nav-all">
              {t(content.projectDetail.backToProjects, lang)}
            </Action>

            {next ? (
              <Link
                className="project__nav-link project__nav-link--next"
                to={path('project', lang, next.slug[lang])}
              >
                <span className="project__nav-label">
                  {t(content.projectDetail.nextProject, lang)}
                </span>
                <span className="project__nav-title">{t(next.title, lang)}</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </nav>
      </article>

      <CtaBand
        eyebrow={t(content.common.quoteCta, lang)}
        title={t(content.projectDetail.ctaTitle, lang)}
        body={t(content.projectDetail.ctaBody, lang)}
      />

      {lightboxIndex !== null ? (
        <Lightbox
          images={gallery}
          index={lightboxIndex}
          onChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </>
  )
}
