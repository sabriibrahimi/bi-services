import Reveal from './Reveal.jsx'
import './SectionHead.css'

/**
 * Eyebrow + heading + optional lead, with an optional action pushed to the
 * right on wide screens. Keeps section openings consistent without forcing
 * every section into the same shape.
 */
export default function SectionHead({
  eyebrow,
  title,
  lead,
  action,
  level = 2,
  align = 'split',
  className = '',
}) {
  const Heading = `h${level}`

  return (
    <Reveal className={`section-head section-head--${align} ${className}`.trim()}>
      <div className="section-head__main">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <Heading className="section-head__title">{title}</Heading>
        {lead ? <p className="lead section-head__lead">{lead}</p> : null}
      </div>
      {action ? <div className="section-head__action">{action}</div> : null}
    </Reveal>
  )
}
