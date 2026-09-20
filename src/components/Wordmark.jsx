import { Link } from 'react-router-dom'
import { path } from '../config/routes.js'
import { content } from '../data/content.js'
import { t, useLanguage } from '../utils/i18n.js'
import PlaneMark from './PlaneMark.jsx'
import './Wordmark.css'

/**
 * The company signature: the hand-plane mark from the business card, the name,
 * and — at the larger size — the baseline that goes with the mark.
 */
export default function Wordmark({ as = 'link', size = 'md', className = '' }) {
  const lang = useLanguage()

  const inner = (
    <>
      <PlaneMark className="wordmark__mark" />
      <span className="wordmark__type">
        <span className="wordmark__name">
          <span>BI SERVICES</span>
          <span className="wordmark__legal">Sàrl</span>
        </span>
        {size === 'lg' ? (
          <span className="wordmark__baseline">{t(content.brand.baseline, lang)}</span>
        ) : null}
      </span>
    </>
  )

  const classes = `wordmark wordmark--${size} ${className}`.trim()

  if (as === 'link') {
    return (
      <Link to={path('home', lang)} className={classes} aria-label={t(content.a11y.homeLink, lang)}>
        {inner}
      </Link>
    )
  }

  return <span className={classes}>{inner}</span>
}
