import { useMemo, useState } from 'react'
import { content } from '../data/content.js'
import { categories, projects as allProjects } from '../data/projects.js'
import { t, tf, useLanguage } from '../utils/i18n.js'
import Action from '../components/Action.jsx'
import CtaBand from '../components/CtaBand.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Seo from '../components/Seo.jsx'
import './Projects.css'

/** Card sizes cycle so the grid stays editorial however many projects there are. */
const SIZE_CYCLE = ['lg', 'sm', 'md', 'md', 'lg', 'sm']

export default function Projects() {
  const lang = useLanguage()
  const [filter, setFilter] = useState('all')

  const filters = ['all', ...categories]

  const visible = useMemo(
    () => (filter === 'all' ? allProjects : allProjects.filter((p) => p.category === filter)),
    [filter]
  )

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
              {visible.length === 0
                ? t(content.projects.countZero, lang)
                : visible.length === 1
                  ? t(content.projects.countOne, lang)
                  : tf(content.projects.countMany, lang, { count: visible.length })}
            </p>
          </div>

          {visible.length > 0 ? (
            <div className="project-grid">
              {visible.map((project, index) => (
                <Reveal
                  key={project.slug[lang]}
                  className="project-grid__item"
                  delay={(index % 3) * 70}
                >
                  <ProjectCard
                    project={project}
                    index={allProjects.indexOf(project)}
                    size={SIZE_CYCLE[index % SIZE_CYCLE.length]}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="projects__empty">
              <h3 className="projects__empty-title">{t(content.projects.emptyTitle, lang)}</h3>
              <p className="projects__empty-body">{t(content.projects.emptyBody, lang)}</p>
              <Action variant="text" onClick={() => setFilter('all')}>
                {t(content.projects.emptyAction, lang)}
              </Action>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        eyebrow={t(content.common.quoteCta, lang)}
        title={t(content.projectDetail.ctaTitle, lang)}
        body={t(content.projectDetail.ctaBody, lang)}
      />
    </>
  )
}
