import { Link } from 'react-router-dom'
import { path } from '../config/routes.js'
import { content } from '../data/content.js'
import { t, useLanguage } from '../utils/i18n.js'
import { toneForIndex } from '../utils/tones.js'
import Media from './Media.jsx'
import './ProjectCard.css'

/**
 * One project in a grid. `size` changes the crop and the type scale so a grid
 * of projects stays editorial instead of turning into a row of identical cards.
 */
export default function ProjectCard({ project, index = 0, size = 'md', ratio, className = '' }) {
  const lang = useLanguage()
  const ratios = { lg: '16 / 10', md: '4 / 3', sm: '3 / 4', tall: '3 / 4' }
  // On a phone the cards stack full width, so the two portrait sizes would each
  // fill most of the screen. They keep their place in the rhythm with a wider
  // crop instead.
  const ratiosSm = { lg: '16 / 10', md: '4 / 3', sm: '4 / 3', tall: '3 / 2' }

  return (
    <article className={`project-card project-card--${size} ${className}`.trim()}>
      <Link className="project-card__link" to={path('project', lang, project.slug[lang])}>
        <Media
          className="project-card__media"
          {...(project.cover ?? {})}
          label={project.coverPlaceholder ?? content.projectDetail.coverPlaceholderFallback}
          tone={toneForIndex(index)}
          ratio={ratio ?? ratios[size] ?? ratios.md}
          ratioSm={ratio ?? ratiosSm[size] ?? ratiosSm.md}
          sizes="(min-width: 62rem) 45vw, 100vw"
        />

        <div className="project-card__body">
          <h3 className="project-card__title">{t(project.title, lang)}</h3>
          <p className="project-card__meta">
            <span>{t(project.location, lang)}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </p>
          <p className="project-card__service">{project.services[lang]?.[0]}</p>
        </div>
      </Link>
    </article>
  )
}
