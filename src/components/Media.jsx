import { useLanguage, t } from '../utils/i18n.js'
import './Media.css'

/**
 * The only image component of the site.
 *
 * With a `src` it renders a real <img> (responsive, with explicit dimensions so
 * nothing shifts while loading). Without one it renders a designed placeholder
 * block carrying the label of the photograph that belongs there. Swapping a
 * placeholder for a photograph therefore only ever means editing a data file.
 *
 * Props
 *  - src        image path, or null while the photograph is missing
 *  - alt        bilingual entry or string (required whenever src is set)
 *  - label      bilingual entry describing the photograph that belongs here
 *  - sources    [{ src, width }] of the same photograph at several widths;
 *               turned into a srcset so browsers download the right one
 *  - sizes      how wide the image renders, e.g. '(min-width: 62rem) 45vw, 100vw'
 *  - tone       'linen' | 'stone' | 'oak' | 'walnut' | 'charcoal' | 'bone'
 *  - ratio      CSS aspect-ratio, e.g. '4 / 5'
 *  - ratioSm    the crop to use below 52rem. A portrait frame that reads as
 *               elegant beside a column of text on a desktop becomes a
 *               full-screen slab on a phone, where every image is full width.
 *               Defaults to `ratio` when a crop works at both sizes.
 *  - priority   true for the hero image only: eager loading, high fetch priority
 */
export default function Media({
  src = null,
  alt,
  label,
  sources,
  tone = 'linen',
  ratio = '4 / 3',
  ratioSm,
  priority = false,
  className = '',
  width,
  height,
  sizes = '100vw',
  objectPosition,
  children,
}) {
  const lang = useLanguage()
  // The ratio travels as a custom property rather than as an inline
  // aspect-ratio, so a stylesheet can set the property this one reads
  // (--media-ratio-sm) per breakpoint.
  // NOTE: --media-ratio itself is set inline here, and an inline custom
  // property beats any stylesheet rule. A CSS rule that re-declares
  // --media-ratio at a breakpoint therefore has no effect (see the dead
  // overrides on .hero__media in Home.css); override the aspect-ratio
  // property instead, the way Media.css does below 62rem.
  const style = { '--media-ratio': ratio }
  if (ratioSm) style['--media-ratio-sm'] = ratioSm

  if (src) {
    const srcSet = sources?.length
      ? sources.map((source) => `${source.src} ${source.width}w`).join(', ')
      : undefined

    return (
      <div className={`media media--image ${className}`} style={style}>
        <img
          src={src}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
          alt={t(alt, lang)}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          style={objectPosition ? { objectPosition } : undefined}
        />
        {children}
      </div>
    )
  }

  return (
    <div
      className={`media media--placeholder media--${tone} ${className}`}
      style={style}
      role="img"
      aria-label={t(label, lang)}
    >
      <span className="media__frame" aria-hidden="true" />
      <span className="media__label" aria-hidden="true">
        {t(label, lang)}
      </span>
      {children}
    </div>
  )
}
