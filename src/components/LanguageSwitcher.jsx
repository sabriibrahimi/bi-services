import { Link, useLocation } from 'react-router-dom'
import { LANGUAGES } from '../config/routes.js'
import { content } from '../data/content.js'
import { t, useLanguage } from '../utils/i18n.js'
import { getAlternatePath } from '../utils/links.js'
import './LanguageSwitcher.css'

/**
 * FR / EN switch. Each entry points at the equivalent page in the other
 * language — a project page switches to the same project.
 */
export default function LanguageSwitcher({ className = '', onNavigate }) {
  const lang = useLanguage()
  const { pathname } = useLocation()

  return (
    <nav className={`lang ${className}`.trim()} aria-label={t(content.a11y.languageSwitcher, lang)}>
      <ul className="lang__list">
        {LANGUAGES.map((code) => {
          const isCurrent = code === lang
          return (
            <li key={code} className="lang__item">
              {isCurrent ? (
                <span className="lang__link is-current" aria-current="true">
                  {code.toUpperCase()}
                </span>
              ) : (
                <Link
                  to={getAlternatePath(pathname, code)}
                  className="lang__link"
                  hrefLang={code}
                  lang={code}
                  onClick={onNavigate}
                  aria-label={t(
                    code === 'fr' ? content.a11y.switchToFrench : content.a11y.switchToEnglish,
                    lang
                  )}
                >
                  {code.toUpperCase()}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
