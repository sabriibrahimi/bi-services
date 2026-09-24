import { content } from '../data/content.js'
import { t, useLanguage } from '../utils/i18n.js'
import Media from './Media.jsx'
import './PhotoGallery.css'

/**
 * A plain grid of photographs, each one opening the lightbox. Every tile has
 * the same crop — square on phones and tablets, 4 / 3 on a desktop — so a set of
 * site photographs in mixed shapes reads as one tidy series. The full frame is
 * always one tap away in the lightbox.
 */
export default function PhotoGallery({ photos, onOpen, labelledBy }) {
  const lang = useLanguage()

  return (
    <ul className="photo-gallery" aria-labelledby={labelledBy}>
      {photos.map((photo, index) => (
        <li className="photo-gallery__item" key={photo.name}>
          <button type="button" className="photo-gallery__button" onClick={() => onOpen(index)}>
            <span className="visually-hidden">
              {t(content.lightbox.openImage, lang)} — {t(photo.alt, lang)}
            </span>
            <Media
              {...photo}
              tone="stone"
              ratio="4 / 3"
              ratioSm="1 / 1"
              sizes="(min-width: 62rem) 30vw, (min-width: 40rem) 45vw, 50vw"
            />
          </button>
        </li>
      ))}
    </ul>
  )
}
