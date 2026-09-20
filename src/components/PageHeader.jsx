import './PageHeader.css'

/** Opening block of an inner page: eyebrow, H1 and an optional lead paragraph. */
export default function PageHeader({ eyebrow, title, lead, aside, className = '' }) {
  return (
    <header className={`page-header ${className}`.trim()}>
      <div className="shell page-header__inner">
        <div className="page-header__main">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="page-header__title">{title}</h1>
        </div>
        {lead || aside ? (
          <div className="page-header__aside">
            {lead ? <p className="lead">{lead}</p> : null}
            {aside}
          </div>
        ) : null}
      </div>
    </header>
  )
}
