import { useMemo, useState } from 'react'
import { content } from '../data/content.js'
import { categories, projects } from '../data/projects.js'
import { t, tf, useLanguage } from '../utils/i18n.js'
import { materialGallery } from '../utils/pageImage.js'
import CtaBand from '../components/CtaBand.jsx'
import Lightbox from '../components/Lightbox.jsx'
import PageHeader from '../components/PageHeader.jsx'
import PhotoGallery from '../components/PhotoGallery.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Seo from '../components/Seo.jsx'
import './Projects.css'

/**
 * Parquet jobs are presented as projects, each with its own page. PVC / Lino,
 * carpet and vinyl are shown as plain photographs — one gallery per covering,
 * from photos-source/<folder>/ — and are never grouped into projects.
 *
 *   Tous      the parquet projects, then the three galleries
 *   Parquet   the parquet projects
 *   others    that covering's gallery
 */
const MATERIALS = categories.filter((key) => key !== 'parquet')

const galleries = Object.fromEntries(MATERIALS.map((key) => [key, materialGallery(key)]))

export default function Projects() {
  const lang = useLanguage()
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null) // { photos, index }

  const filters = ['all', ...categories]

  const showProjects = filter === 'all' || filter === 'parquet'
  const shownMaterials = filter === 'all' ? MATERIALS : MATERIALS.filter((key) => key === filter)

  const count = useMemo(() => {
    const parts = []
    if (showProjects) {
      parts.push(
        projects.length === 1
          ? t(content.projects.countOne, lang)
          : tf(content.projects.countMany, lang, { count: projects.length })
      )
    }
    const photoTotal = shownMaterials.reduce((sum, key) => sum + galleries[key].length, 0)
    if (photoTotal > 0) {
      parts.push(
        photoTotal === 1
          ? t(content.projects.photoCountOne, lang)
          : tf(content.projects.photoCountMany, lang, { count: photoTotal })
      )
    }
    return parts.join(' · ')
  }, [showProjects, shownMaterials, lang])

  return (
    <>
      <Seo pageKey="projects" />

      <PageHeader
        eyebrow={t(content.projects.eyebrow, lang)}
        title={t(content.projects.title, lang)}
        lead={t(content.projects.intro, lang)}
      />

      <section className="section section--flush-top projects">
        <div className="shell">
          <div className="filters">
            <h2 className="filters__label" id="filters-label">
              {t(content.projects.filterLabel, lang)}
            </h2>
            <div className="filters__list" role="group" aria-labelledby="filters-label">
              {filters.map((key) => {
                const isActive = key === filter
                return (
                  <button
                    key={key}
                    type="button"
                    className={`filters__item${isActive ? ' is-active' : ''}`}
                    aria-pressed={isActive}
                    onClick={() => setFilter(key)}
                  >
                    {t(content.projects.filters[key], lang)}
                  </button>
                )
              })}
            </div>
            <p className="filters__count" aria-live="polite">
              {count}
            </p>
          </div>

          {/* Keyed on the filter so each change replays the entrance. */}
          <div className="projects__results" key={filter}>
            {showProjects ? (
              <div className="projects__group">
                {filter === 'all' ? (
                  <h3 className="projects__heading">{t(content.projects.filters.parquet, lang)}</h3>
                ) : null}
                <div className="project-grid">
                  {projects.map((project, index) => (
                    <Reveal key={project.slug[lang]} className="project-grid__item" delay={(index % 2) * 90}>
                      <ProjectCard project={project} index={index} />
                    </Reveal>
                  ))}
                </div>
              </div>
            ) : null}

            {shownMaterials.map((key) => (
              <Reveal className="projects__group" key={key}>
                {filter === 'all' ? (
                  <h3 className="projects__heading" id={`gallery-${key}`}>
                    {t(content.projects.filters[key], lang)}
                  </h3>
                ) : null}
                <PhotoGallery
                  photos={galleries[key]}
                  labelledBy={filter === 'all' ? `gallery-${key}` : 'filters-label'}
                  onOpen={(index) => setLightbox({ photos: galleries[key], index })}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow={t(content.common.quoteCta, lang)}
        title={t(content.projectDetail.ctaTitle, lang)}
        body={t(content.projectDetail.ctaBody, lang)}
      />

      {lightbox ? (
        <Lightbox
          images={lightbox.photos}
          index={lightbox.index}
          onChange={(index) => setLightbox((current) => ({ ...current, index }))}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </>
  )
}
