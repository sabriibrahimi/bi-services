import { useId, useState } from 'react'
import { content } from '../data/content.js'
import { t, useLanguage } from '../utils/i18n.js'
import './BeforeAfter.css'

/**
 * Before / after comparison. Rendered only when a project actually has both
 * photographs — never faked with a single image.
 *
 * The handle is a native range input, so it works with the mouse, with touch
 * and with the arrow keys, and screen readers announce it as a slider.
 */
export default function BeforeAfter({ before, after, beforeAlt, afterAlt }) {
  const lang = useLanguage()
  const [position, setPosition] = useState(50)
  const inputId = useId()

  return (
    <div className="ba">
      <div className="ba__stage" style={{ '--ba-position': `${position}%` }}>
        <img className="ba__image ba__image--after" src={after} alt={t(afterAlt, lang)} />
        <div className="ba__clip">
          <img className="ba__image ba__image--before" src={before} alt={t(beforeAlt, lang)} />
        </div>

        <div className="ba__handle" aria-hidden="true">
          <span className="ba__line" />
          <span className="ba__grip">
            <svg viewBox="0 0 24 12" focusable="false">
              <path d="M9 1L4 6l5 5M15 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </span>
        </div>

        <span className="ba__tag ba__tag--before" aria-hidden="true">
          {t(content.projectDetail.beforeLabel, lang)}
        </span>
        <span className="ba__tag ba__tag--after" aria-hidden="true">
          {t(content.projectDetail.afterLabel, lang)}
        </span>
      </div>

      <label className="visually-hidden" htmlFor={inputId}>
        {t(content.projectDetail.sliderLabel, lang)}
      </label>
      <input
        id={inputId}
        className="ba__range"
        type="range"
        min="0"
        max="100"
        step="1"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-valuetext={`${position}%`}
      />
    </div>
  )
}
