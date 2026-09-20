/**
 * What the image pipeline works from. Edit this file, then run `npm run images`.
 *
 * Two completely separate sets, and they must not be mixed:
 *
 *  PROJECT_PHOTOS — the client's own photographs of real job sites. They are
 *  used only on the projects pages and on the featured-project cards. Each entry
 *  names a file in photos-source/, the project it belongs to, and any cleanup it
 *  needs. Photographs from different job sites must never share a project.
 *
 *  SITE_IMAGES — licensed photographs used for the page furniture (hero,
 *  introduction, services, contact, 404). They are never presented as the
 *  company's work: no project captions, no locations. Each entry records its
 *  source and photographer, which CREDITS.md is generated from.
 */

/** Files in photos-source/, grouped by job site. One group = one project. */
export const PROJECT_PHOTOS = [
  {
    project: 1,
    category: 'parquet',
    photos: [
      {
        name: 'projet-1-couverture',
        file: 'WhatsApp Image 2026-09-19 at 19.15.31 (5).jpeg',
        cover: true,
        // Removes the phone's "Galaxy S24" watermark burned into the corner.
        crop: { bottom: 0.08 },
      },
      {
        name: 'projet-1-pose',
        file: 'WhatsApp Image 2026-09-19 at 19.15.31 (1).jpeg',
        crop: { bottom: 0.08 },
      },
      {
        name: 'projet-1-couloir',
        file: 'WhatsApp Image 2026-09-19 at 19.15.31 (3).jpeg',
        crop: { bottom: 0.08 },
      },
    ],
  },
  {
    project: 2,
    category: 'parquet',
    photos: [
      {
        name: 'projet-2-couverture',
        file: 'WhatsApp Image 2026-09-19 at 19.15.31 (2).jpeg',
        cover: true,
        // Shot in late, very orange light: the grading pulls it back to neutral.
        warmth: -0.35,
      },
      {
        name: 'projet-2-lumiere',
        file: 'WhatsApp Image 2026-09-19 at 19.15.31 (4).jpeg',
        // Crops the person standing at the right edge out of the frame.
        crop: { right: 0.16 },
        warmth: -0.2,
      },
    ],
  },
  {
    project: 3,
    category: 'parquet',
    photos: [
      {
        name: 'projet-3-couverture',
        file: 'WhatsApp Image 2026-09-19 at 19.15.30.jpeg',
        cover: true,
        crop: { bottom: 0.1 },
      },
      {
        name: 'projet-3-pose',
        file: 'WhatsApp Image 2026-09-19 at 19.15.30 (3).jpeg',
        // Crops out the thumb over the corner of the lens.
        crop: { bottom: 0.16 },
      },
    ],
  },
  {
    project: 4,
    category: 'other',
    // The other staircase on file (the one with white risers) is only 954 px
    // wide — fine for a thumbnail, not for a cover — so this job site is used
    // instead. See the note at the end of PLACEHOLDERS.md.
    photos: [
      { name: 'projet-4-couverture', file: 'WhatsApp Image 2026-09-19 at 19.15.35 (6).jpeg', cover: true },
      { name: 'projet-4-palier', file: 'WhatsApp Image 2026-09-19 at 19.15.35 (7).jpeg' },
      { name: 'projet-4-detail', file: 'WhatsApp Image 2026-09-19 at 19.15.35 (8).jpeg' },
    ],
  },
  {
    project: 5,
    category: 'other',
    photos: [
      { name: 'projet-5-couverture', file: 'WhatsApp Image 2026-09-19 at 19.15.35 (10).jpeg', cover: true },
      { name: 'projet-5-parasol', file: 'WhatsApp Image 2026-09-19 at 19.15.35 (11).jpeg' },
      // Gravel and joists: a very busy frame that needs a firmer hand on the
      // encoder, or the file ends up heavier than the hero.
      { name: 'projet-5-structure', file: 'WhatsApp Image 2026-09-19 at 19.15.35 (1).jpeg', quality: 55 },
      { name: 'projet-5-chantier', file: 'WhatsApp Image 2026-09-19 at 19.15.35 (9).jpeg' },
    ],
  },
]

/**
 * Licensed photographs for the page furniture. `id` is the Unsplash photo id;
 * the pipeline downloads it once into site-source/ and keeps it there.
 */
export const SITE_IMAGES = [
  {
    name: 'hero',
    id: 'Q9ttGXgFYFk',
    photographer: 'Franco Debartolo',
    page: 'https://unsplash.com/photos/sunlight-on-wooden-floorboards-Q9ttGXgFYFk',
    description: 'Sunlight across light wooden floorboards',
  },
  {
    name: 'intro-principale',
    id: 'YyROGiu9LuE',
    photographer: 'Kristaps Solims',
    page: 'https://unsplash.com/photos/YyROGiu9LuE',
    description: 'Sunlight drawing diamonds across a wooden floor',
  },
  {
    name: 'intro-detail',
    id: 'AE84zZ5C1Ws',
    photographer: 'Maria Kovalets',
    page: 'https://unsplash.com/photos/AE84zZ5C1Ws',
    description: 'Close view of an oak surface',
  },
  {
    name: 'parquet-principale',
    id: '_e2Jw79ssKo',
    photographer: 'Madalozzo',
    page: 'https://unsplash.com/photos/_e2Jw79ssKo',
    description: 'Herringbone parquet with a satin finish',
  },
  {
    name: 'parquet-detail',
    id: 'K6vkTjYciX8',
    photographer: 'Alex Cooper',
    page: 'https://unsplash.com/photos/close-up-of-a-wooden-parquet-floor-pattern-K6vkTjYciX8',
    description: 'Close-up of a parquet pattern',
  },
  {
    name: 'souples-principale',
    id: 'kdnfVGGPh_U',
    photographer: 'B vB',
    page: 'https://unsplash.com/photos/close-up-of-woven-rug-kdnfVGGPh_U',
    description: 'Close view of a woven floor covering',
  },
  {
    name: 'souples-detail',
    id: 'UZZcLyvqXJs',
    photographer: 'Lynda Sanchez',
    page: 'https://unsplash.com/photos/brown-area-rug-UZZcLyvqXJs',
    description: 'Textile floor covering in a warm tone',
  },
  {
    name: 'contact',
    id: '8o6Z2j1XX6U',
    photographer: 'Kai Damm-Jonas',
    page: 'https://unsplash.com/photos/8o6Z2j1XX6U',
    description: 'Interior with brick wall and wooden floor',
  },
  {
    name: 'introuvable',
    id: 'l3qaat24Cv4',
    photographer: 'Maria Kovalets',
    page: 'https://unsplash.com/photos/l3qaat24Cv4',
    description: 'Wooden floorboards seen from above',
  },
]

/** The site image used for link previews (Open Graph). */
export const OG_IMAGE = 'hero'
