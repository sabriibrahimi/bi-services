import { path } from '../config/routes.js'
import { site } from '../config/site.js'
import { content } from '../data/content.js'
import { t, useLanguage } from '../utils/i18n.js'
import Action from './Action.jsx'
import Reveal from './Reveal.jsx'
import './CtaBand.css'

/** Closing band: one sentence, the quote button, and the phone number. */
export default function CtaBand({ eyebrow, title, body, tone = 'dark' }) {
  const lang = useLanguage()

  return (
    <section className={`cta-band${tone === 'dark' ? ' is-dark' : ''}`}>
      <div className="shell cta-band__inner">
        <Reveal className="cta-band__text">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className="cta-band__title">{title}</h2>
          {body ? <p className="lead cta-band__body">{body}</p> : null}
        </Reveal>
        <Reveal className="cta-band__actions" delay={80}>
          <Action to={path('contact', lang)} variant="solid" size="lg">
            {t(content.common.quoteCta, lang)}
          </Action>
          <a className="cta-band__phone" href={site.phone.href}>
            {site.phone.display}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
