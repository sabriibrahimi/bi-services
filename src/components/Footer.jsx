import { Link } from 'react-router-dom'
import { legalKeys, navKeys, path } from '../config/routes.js'
import { formatAddress, hasAddress, site } from '../config/site.js'
import { content } from '../data/content.js'
import { t, useLanguage } from '../utils/i18n.js'
import Wordmark from './Wordmark.jsx'
import './Footer.css'

export default function Footer() {
  const lang = useLanguage()
  const address = formatAddress()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer is-dark">
      <div className="shell">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Wordmark as="link" size="lg" />
            <p className="site-footer__tagline">{t(content.footer.tagline, lang)}</p>
            {site.logo ? null : (
              <p className="site-footer__placeholder">{t(content.brand.logoPlaceholder, lang)}</p>
            )}
          </div>

          <nav className="site-footer__nav" aria-label={t(content.a11y.footerNav, lang)}>
            <h2 className="site-footer__title">{t(content.footer.navTitle, lang)}</h2>
            <ul className="site-footer__list">
              {navKeys.map((key) => (
                <li key={key}>
                  <Link className="site-footer__link" to={path(key, lang)}>
                    {t(content.nav[key], lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__block">
            <h2 className="site-footer__title">{t(content.footer.contactTitle, lang)}</h2>
            <ul className="site-footer__list">
              <li>
                <a className="site-footer__link" href={site.phone.href}>
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a className="site-footer__link" href={site.email.href}>
                  {site.email.display}
                </a>
              </li>
            </ul>
            <h2 className="site-footer__title site-footer__title--spaced">
              {t(content.common.addressLabel, lang)}
            </h2>
            {hasAddress ? (
              <address className="site-footer__address">
                {address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            ) : (
              <p className="site-footer__placeholder">{t(content.brand.addressPlaceholder, lang)}</p>
            )}
          </div>

          <div className="site-footer__block">
            <h2 className="site-footer__title">{t(content.footer.hoursTitle, lang)}</h2>
            <ul className="site-footer__list site-footer__list--plain">
              <li>{t(content.common.hoursWeek, lang)}</li>
              <li className="muted">{t(content.common.hoursWeekend, lang)}</li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copy">
            © {year} {site.companyName}. {t(content.footer.copyright, lang)}
          </p>
          <nav className="site-footer__legal" aria-label={t(content.a11y.legalNav, lang)}>
            <ul className="site-footer__list site-footer__list--inline">
              {legalKeys.map((key) => (
                <li key={key}>
                  <Link className="site-footer__link" to={path(key, lang)}>
                    {t(content.nav[key], lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
