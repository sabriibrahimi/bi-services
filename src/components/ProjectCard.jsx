import { Link } from 'react-router-dom'
import { path } from '../config/routes.js'
import { content } from '../data/content.js'
import { t, tf, useLanguage } from '../utils/i18n.js'
import { toneForIndex } from '../utils/tones.js'
import Media from './Media.jsx'
import './ProjectCard.css'

/**
 * One project in a grid. Every card uses the same 4 / 3 crop: the covers are
 * phone photographs in every shape from portrait to panorama, and one steady
 * frame reads as a considered series where mixed crops read as random. The
 * grid itself provides the rhythm.
 *
 * The caption shows only what is known for certain: the project's number and
 * how many photographs it holds. No location, year or description is shown
 * until the client supplies real ones.
 */
export default function ProjectCard({ project, index = 0, ratio = '4 / 3', className = '' }) {
  const lang = useLanguage()
  const photoCount = (project.cover ? 1 : 0) + (project.gallery?.length ?? 0)

  return (
    <article className={`project-card ${className}`.trim()}>
      <Link className="project-card__link" to={path('project', lang, project.slug[lang])}>
        <Media
          className="project-card__media"
          {...(project.cover ?? {})}
          label={project.coverPlaceholder ?? content.projectDetail.coverPlaceholderFallback}
          tone={toneForIndex(index)}
          ratio={ratio}
          sizes="(min-width: 52rem) 46vw, 100vw"
        />

        <div className="project-card__body">
          <h3 className="project-card__title">{t(project.title, lang)}</h3>
          {photoCount > 0 ? (
            <p className="project-card__meta">
              {photoCount === 1
                ? t(content.projects.photoCountOne, lang)
                : tf(content.projects.photoCountMany, lang, { count: photoCount })}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  )
}
