import { siteImages } from '../data/siteImages.js'
import { materialPhotos } from '../data/materialPhotos.js'
import { content } from '../data/content.js'
import { asset } from '../config/deployment.js'

/**
 * Everything <Media> needs for an illustrative image on the home and services
 * pages, looked up by name in either of the two sets that may appear there:
 *
 *  - siteImages     licensed photographs (see CREDITS.md)
 *  - materialPhotos the client's own photographs of each covering
 *
 * The names never overlap. Project photographs are deliberately not reachable
 * from here: they belong to the projects pages only.
 *
 * A missing name falls back to the labelled placeholder block rather than a
 * broken image.
 */
export function pageImage(name, label) {
  const entry = siteImages[name] ?? materialPhotos[name]
  const alt = content.siteImageAlt[name] ?? content.materialAlt[name]
  if (!entry) {
    return { src: null, label: label ?? { fr: 'PHOTO À FOURNIR', en: 'PHOTO TO BE PROVIDED' } }
  }
  return {
    src: asset(entry.src),
    sources: entry.sources?.map((source) => ({ ...source, src: asset(source.src) })),
    width: entry.width,
    height: entry.height,
    alt,
    label: alt,
  }
}

/**
 * Every photograph of one covering ('pvc-lino', 'moquette' or 'vinyle'), in
 * the order set in scripts/image-sources.mjs, ready for <Media> and the
 * lightbox. Plain photographs: no project, place or date attached.
 */
export function materialGallery(material) {
  return Object.entries(materialPhotos)
    .filter(([, entry]) => entry.material === material)
    .map(([name]) => ({ name, ...pageImage(name) }))
}

export default pageImage
