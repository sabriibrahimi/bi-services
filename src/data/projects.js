import { projectPhotos } from './projectPhotos.js'
import { asset } from '../config/deployment.js'

/**
 * Every project lives here. Adding a project = adding one object to this array;
 * the grid, the filters, the detail page, the sitemap and the prerendered routes
 * all follow automatically.
 *
 * Projects are named by number only, in both languages, until the client
 * supplies real titles. Each one holds photographs from a SINGLE job site:
 * never mix two sites in one project.
 *
 * Photographs come from src/data/projectPhotos.js, which `npm run images`
 * generates from photos-source/ (see scripts/image-sources.mjs for the
 * grouping). `image()` returns everything <Media> needs, or null while a
 * photograph is missing — in which case a labelled placeholder is shown.
 *
 * A project carries its number and its photographs, nothing else: no location,
 * year, surface or description is shown until the client supplies real ones,
 * and none is invented in the meantime.
 */

/** Resolve a generated photograph plus its bilingual alternative text. */
function image(name, alt) {
  const entry = projectPhotos[name]
  if (!entry) return null
  return {
    // The generated paths are root-relative; asset() puts them under the base
    // the site is deployed to.
    src: asset(entry.src),
    sources: entry.sources?.map((source) => ({ ...source, src: asset(source.src) })),
    width: entry.width,
    height: entry.height,
    alt,
  }
}

/**
 * Filters on the projects page. Only parquet jobs are projects; the other three
 * filters show that covering's photographs as a plain gallery (see
 * src/pages/Projects.jsx). "Autre" was removed on request: the staircase and
 * decking jobs (projects 4 and 5) are wood work and sit under Parquet.
 */
export const categories = ['parquet', 'pvc-lino', 'moquette', 'vinyle']

export const projects = [
  {
    slug: { fr: 'projet-1', en: 'project-1' },
    title: { fr: 'Projet 1', en: 'Project 1' },
    cover: image('projet-1-couverture', {
      fr: 'Panneaux Versailles en chêne posés dans une pièce, avec filet de bordure foncé',
      en: 'Oak Versailles panels laid in a room, with a dark border inlay',
    }),
    coverPlaceholder: {
      fr: 'PHOTO PLACEHOLDER — PANNEAUX VERSAILLES, VUE D’ENSEMBLE',
      en: 'PHOTO PLACEHOLDER — VERSAILLES PANELS, WIDE VIEW',
    },
    gallery: [
      image('projet-1-pose', {
        fr: 'Pose des panneaux Versailles en cours, outils et scie sur le chantier',
        en: 'Versailles panels being laid, tools and saw on site',
      }),
      image('projet-1-couloir', {
        fr: 'Couloir du même appartement, panneaux Versailles et filet de bordure foncé',
        en: 'Hallway of the same flat, Versailles panels and dark border inlay',
      }),
    ].filter(Boolean),
    beforeImage: null,
    afterImage: null,
    category: 'parquet',
    featured: true,
  },
  {
    slug: { fr: 'projet-2', en: 'project-2' },
    title: { fr: 'Projet 2', en: 'Project 2' },
    cover: image('projet-2-couverture', {
      fr: 'Grand séjour avec parquet en panneaux et cheminée en marbre',
      en: 'Large living room with panel parquet and a marble fireplace',
    }),
    coverPlaceholder: {
      fr: 'PHOTO PLACEHOLDER — SÉJOUR, PARQUET EN PANNEAUX',
      en: 'PHOTO PLACEHOLDER — LIVING ROOM, PANEL PARQUET',
    },
    gallery: [
      image('projet-2-lumiere', {
        fr: 'Le même séjour en lumière rasante, le parquet terminé',
        en: 'The same living room in low light, the parquet finished',
      }),
    ].filter(Boolean),
    beforeImage: null,
    afterImage: null,
    category: 'parquet',
    featured: true,
  },
  {
    slug: { fr: 'projet-3', en: 'project-3' },
    title: { fr: 'Projet 3', en: 'Project 3' },
    cover: image('projet-3-couverture', {
      fr: 'Parquet chêne à bâtons rompus terminé dans une pièce vide',
      en: 'Finished oak herringbone parquet in an empty room',
    }),
    coverPlaceholder: {
      fr: 'PHOTO PLACEHOLDER — PARQUET À BÂTONS ROMPUS',
      en: 'PHOTO PLACEHOLDER — HERRINGBONE PARQUET',
    },
    gallery: [
      image('projet-3-pose', {
        fr: 'Pose du parquet à bâtons rompus, lames posées sur la colle peignée',
        en: 'The herringbone parquet being laid, boards set into combed adhesive',
      }),
    ].filter(Boolean),
    beforeImage: null,
    afterImage: null,
    category: 'parquet',
    featured: true,
  },
  {
    slug: { fr: 'projet-4', en: 'project-4' },
    title: { fr: 'Projet 4', en: 'Project 4' },
    cover: image('projet-4-couverture', {
      fr: 'Escalier habillé en bois teinté foncé, marches et contremarches',
      en: 'Staircase clad in dark-stained timber, treads and risers',
    }),
    coverPlaceholder: {
      fr: 'PHOTO PLACEHOLDER — ESCALIER EN BOIS, VUE D’ENSEMBLE',
      en: 'PHOTO PLACEHOLDER — TIMBER STAIRCASE, WIDE VIEW',
    },
    gallery: [
      image('projet-4-palier', {
        fr: 'Palier et départ d’escalier, même teinte foncée',
        en: 'Landing and foot of the staircase, in the same dark tone',
      }),
      image('projet-4-detail', {
        fr: 'Détail du palier en bois teinté, nez de marche arrondi',
        en: 'Detail of the stained timber landing, with a rounded stair nosing',
      }),
    ].filter(Boolean),
    beforeImage: null,
    afterImage: null,
    category: 'parquet',
    featured: true,
  },
  {
    slug: { fr: 'projet-5', en: 'project-5' },
    title: { fr: 'Projet 5', en: 'Project 5' },
    cover: image('projet-5-couverture', {
      fr: 'Terrasse en bois exotique terminée autour d’une piscine',
      en: 'Finished hardwood deck around a swimming pool',
    }),
    coverPlaceholder: {
      fr: 'PHOTO PLACEHOLDER — TERRASSE EN BOIS, VUE D’ENSEMBLE',
      en: 'PHOTO PLACEHOLDER — TIMBER DECK, WIDE VIEW',
    },
    gallery: [
      image('projet-5-parasol', {
        fr: 'La terrasse terminée le long du bassin, parasol et brasero',
        en: 'The finished deck alongside the pool, parasol and fire bowl',
      }),
      image('projet-5-chantier', {
        fr: 'Le chantier en cours, lames à couper et outils sur la terrasse',
        en: 'The job in progress, boards waiting to be cut and tools on the deck',
      }),
      image('projet-5-structure', {
        fr: 'Structure de la terrasse posée sur plots réglables',
        en: 'Deck substructure set on adjustable pedestals',
      }),
    ].filter(Boolean),
    beforeImage: null,
    afterImage: null,
    category: 'parquet',
    featured: true,
  },
]

/** Projects marked featured, in data order. */
export const featuredProjects = projects.filter((project) => project.featured)

/** Find a project from a localised slug. Returns undefined when unknown. */
export function findProjectBySlug(slug, lang) {
  return projects.find((project) => project.slug[lang] === slug)
}

/** Neighbouring projects, wrapping around the list. */
export function getProjectNeighbours(project) {
  const index = projects.indexOf(project)
  if (index === -1) return { previous: null, next: null }
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  }
}

export default projects
