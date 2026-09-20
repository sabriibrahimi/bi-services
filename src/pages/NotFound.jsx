import { path } from '../config/routes.js'
import { content } from '../data/content.js'
import { t, useLanguage } from '../utils/i18n.js'
import { siteImage } from '../utils/siteImage.js'
import Action from '../components/Action.jsx'
import Media from '../components/Media.jsx'
import Seo from '../components/Seo.jsx'
import './NotFound.css'

export default function NotFound() {
  const lang = useLanguage()

  return (
    <>
      <Seo pageKey="notFound" noindex />

      <section className="section not-found">
        <div className="shell not-found__grid">
          <div className="not-found__text">
            <p className="not-found__code" aria-hidden="true">
              {t(content.notFound.code, lang)}
            </p>
            <h1 className="not-found__title">{t(content.notFound.title, lang)}</h1>
            <p className="lead not-found__body">{t(content.notFound.body, lang)}</p>
            <div className="not-found__actions">
              <Action to={path('home', lang)} variant="solid">
                {t(content.notFound.homeCta, lang)}
              </Action>
              <Action to={path('projects', lang)} variant="text">
                {t(content.notFound.projectsCta, lang)}
              </Action>
            </div>
          </div>

          <div className="not-found__media">
            <Media
              {...siteImage('introuvable', content.notFound.mediaPlaceholder)}
              tone="linen"
              ratio="3 / 4"
              ratioSm="16 / 10"
              sizes="(min-width: 62rem) 33vw, 100vw"
            />
          </div>
        </div>
      </section>
    </>
  )
}
