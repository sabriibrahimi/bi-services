import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import Footer from '../components/Footer.jsx'
import Header from '../components/Header.jsx'
import { content } from '../data/content.js'
import { LanguageProvider, t } from '../utils/i18n.js'
import { localBusinessJsonLd } from '../utils/structuredData.js'
import './SiteLayout.css'

/**
 * Shared chrome for one language. Mounted once per language prefix, so `lang`
 * is fixed for everything it renders.
 */
export default function SiteLayout({ lang }) {
  const { pathname, hash } = useLocation()
  const firstRender = useRef(true)

  // Move to the top of the new page on navigation — or to the #section a link
  // points at — but never on first paint (which would fight the browser
  // restoring a scroll position).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) {
      const offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) * 16 || 0
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset - 24, behavior: 'auto' })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [pathname, hash])

  return (
    <LanguageProvider value={lang}>
      <Head>
        <html lang={lang} />
        <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd(lang))}</script>
      </Head>

      <a className="skip-link" href="#main">
        {t(content.a11y.skipToContent, lang)}
      </a>

      <Header />

      <main id="main" className="site-main" key={pathname} tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />
    </LanguageProvider>
  )
}
