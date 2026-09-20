import { useEffect, useId, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navKeys, path } from '../config/routes.js'
import { site } from '../config/site.js'
import { content } from '../data/content.js'
import { t, useLanguage } from '../utils/i18n.js'
import useFocusTrap from '../utils/useFocusTrap.js'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import Wordmark from './Wordmark.jsx'
import './Header.css'

export default function Header() {
  const lang = useLanguage()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const drawerRef = useRef(null)
  const drawerId = useId()

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The drawer belongs to small screens only: close it if the viewport grows
  // past the breakpoint while it is open, so focus is never trapped in a panel
  // the layout has hidden.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 62rem)')
    const onChange = (event) => {
      if (event.matches) setOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useFocusTrap({ active: open, containerRef: drawerRef, onClose: () => setOpen(false) })

  const links = navKeys.map((key) => ({
    key,
    to: path(key, lang),
    label: t(content.nav[key], lang),
    end: key === 'home',
  }))

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-header__inner shell">
        <Wordmark />

        <nav className="site-header__nav" aria-label={t(content.a11y.mainNav, lang)}>
          <ul className="site-header__list">
            {links.map((link) => (
              <li key={link.key}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `site-header__link${isActive ? ' is-active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__aside">
          <LanguageSwitcher className="site-header__lang" />
          <a className="site-header__phone" href={site.phone.href}>
            {site.phone.display}
          </a>
          <button
            type="button"
            className="site-header__toggle"
            aria-expanded={open}
            aria-controls={drawerId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="visually-hidden">
              {t(open ? content.a11y.closeMenu : content.a11y.openMenu, lang)}
            </span>
            <span className={`burger${open ? ' is-open' : ''}`} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`drawer${open ? ' is-open' : ''}`}
        hidden={!open}
        id={drawerId}
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={t(content.a11y.menuLabel, lang)}
      >
        <div className="drawer__panel">
          <button type="button" className="drawer__close" onClick={() => setOpen(false)}>
            <span className="visually-hidden">{t(content.a11y.closeMenu, lang)}</span>
            <span className="burger is-open" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>

          <nav className="drawer__nav" aria-label={t(content.a11y.mainNav, lang)}>
            <ul className="drawer__list">
              {links.map((link, index) => (
                <li key={link.key}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) => `drawer__link${isActive ? ' is-active' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="drawer__index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="drawer__foot">
            <LanguageSwitcher className="lang--drawer" onNavigate={() => setOpen(false)} />
            <div className="drawer__contact">
              <a href={site.phone.href}>{site.phone.display}</a>
              <a href={site.email.href}>{site.email.display}</a>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="drawer__scrim"
          onClick={() => setOpen(false)}
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    </header>
  )
}
