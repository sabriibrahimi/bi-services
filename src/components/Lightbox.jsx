import { useCallback, useEffect, useRef } from 'react'
import { content } from '../data/content.js'
import { t, tf, useLanguage } from '../utils/i18n.js'
import useFocusTrap from '../utils/useFocusTrap.js'
import './Lightbox.css'

/**
 * Full-screen gallery viewer.
 * Keyboard: Escape closes, ← / → move between images, Tab cycles inside the
 * dialog, and focus returns to the thumbnail that opened it.
 */
export default function Lightbox({ images, index, onClose, onChange }) {
  const lang = useLanguage()
  const dialogRef = useRef(null)
  const total = images.length
  const image = images[index]

  const goTo = useCallback(
    (nextIndex) => onChange((nextIndex + total) % total),
    [onChange, total]
  )

  useFocusTrap({ active: true, containerRef: dialogRef, onClose })

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goTo(index - 1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        goTo(index + 1)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [goTo, index])

  if (!image) return null

  return (
    <div
      className="lightbox"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t(content.lightbox.label, lang)}
    >
      <div className="lightbox__bar">
        <p className="lightbox__counter" aria-live="polite">
          {tf(content.lightbox.counter, lang, { current: index + 1, total })}
        </p>
        <button type="button" className="lightbox__close" onClick={onClose} data-autofocus>
          <span className="visually-hidden">{t(content.lightbox.close, lang)}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="1.25" />
          </svg>
        </button>
      </div>

      <figure className="lightbox__figure">
        <img src={image.src} alt={t(image.alt, lang)} />
        {image.caption ? (
          <figcaption className="lightbox__caption">{t(image.caption, lang)}</figcaption>
        ) : null}
      </figure>

      {total > 1 ? (
        <div className="lightbox__nav">
          <button type="button" className="lightbox__arrow" onClick={() => goTo(index - 1)}>
            <span className="visually-hidden">{t(content.lightbox.previous, lang)}</span>
            <svg viewBox="0 0 24 12" aria-hidden="true" focusable="false">
              <path d="M24 6H2M7 1L2 6l5 5" fill="none" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </button>
          <button type="button" className="lightbox__arrow" onClick={() => goTo(index + 1)}>
            <span className="visually-hidden">{t(content.lightbox.next, lang)}</span>
            <svg viewBox="0 0 24 12" aria-hidden="true" focusable="false">
              <path d="M0 6h22M17 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </button>
        </div>
      ) : null}

      <button
        type="button"
        className="lightbox__scrim"
        onClick={onClose}
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  )
}
