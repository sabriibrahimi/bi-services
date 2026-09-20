import { Link } from 'react-router-dom'
import './Action.css'

/**
 * One call-to-action element for the whole site.
 *  - `to`   renders a router <Link> (internal navigation)
 *  - `href` renders an <a> (tel:, mailto:, external)
 *  - neither renders a <button>
 *
 * Variants: 'solid' (filled), 'outline', 'text' (underlined editorial link).
 */
export default function Action({
  to,
  href,
  variant = 'solid',
  size = 'md',
  className = '',
  children,
  withArrow = variant === 'text',
  ...rest
}) {
  const classes = `action action--${variant} action--${size} ${className}`.trim()

  const inner = (
    <>
      <span className="action__label">{children}</span>
      {withArrow ? (
        <svg className="action__arrow" viewBox="0 0 24 12" aria-hidden="true" focusable="false">
          <path d="M0 6h22M17 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      ) : null}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {inner}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {inner}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {inner}
    </button>
  )
}
