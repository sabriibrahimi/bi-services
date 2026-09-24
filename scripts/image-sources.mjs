/**
 * What the image pipeline works from. Edit this file, then run `npm run images`.
 *
 * Three separate sets, and they must not be mixed:
 *
 *  PROJECT_PHOTOS — the client's own photographs of real job sites, at the top
 *  level of photos-source/. Used only on the projects pages and the featured
 *  project cards. Photographs from different job sites never share a project.
 *
 *  MATERIAL_PHOTOS — the client's own photographs, sorted by covering in
 *  photos-source/PVC-Lino, Moquette and Vinyle. Shown as plain photographs:
 *  a few on the services page, all of them under their filter on the projects
 *  page. Never grouped into projects, and never given titles, places or
 *  descriptions — only parquet jobs are presented as projects.
 *
 *  SITE_IMAGES — licensed photographs (hero, introduction, parquet service,
 *  404). Never presented as the company's work. Each entry records its source
 *  and photographer, which CREDITS.md is generated from.
 */

/** Files in photos-source/, grouped by job site. One group = one project. */
export const PROJECT_PHOTOS = [
  {
    project: 1,
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
 * Files in photos-source/<folder>/, grouped by covering. Each photograph is a
 * picture of the material, not of a named job. `crop` values are fractions of
 * the frame; most remove the phone's "Galaxy S24" watermark at the bottom-left
 * and the clutter of a live site (cables on walls, tool cases, markers).
 */
export const MATERIAL_PHOTOS = [
  {
    material: 'pvc-lino',
    folder: 'PVC-Lino',
    photos: [
      // One office: the same two arched windows in every frame.
      { name: 'lino-salle', file: 'WhatsApp Image 2026-09-23 at 20.32.50 (1).jpeg', crop: { bottom: 0.1, left: 0.17, right: 0.05 } },
      { name: 'lino-fenetres', file: 'WhatsApp Image 2026-09-23 at 20.32.50 (3).jpeg', crop: { bottom: 0.1, left: 0.14 } },
      { name: 'lino-vue', file: 'WhatsApp Image 2026-09-23 at 20.32.50.jpeg', crop: { bottom: 0.1 } },
      // The roll being laid over the levelled subfloor.
      { name: 'lino-pose', file: 'WhatsApp Image 2026-09-23 at 20.32.50 (4).jpeg', crop: { bottom: 0.1 } },
      // Self-levelling compound poured before the covering goes down.
      { name: 'lino-ragreage', file: 'WhatsApp Image 2026-09-23 at 20.32.50 (2).jpeg', crop: { bottom: 0.14, top: 0.1, right: 0.14 } },
    ],
  },
  {
    material: 'moquette',
    folder: 'Moquette',
    photos: [
      { name: 'moquette-damier', file: '6.jpeg', crop: { bottom: 0.1 } },
      { name: 'moquette-couloir', file: 'WhatsApp Image 2026-09-23 at 20.59.03.jpeg', crop: { bottom: 0.18 } },
      { name: 'moquette-bureau', file: '2.jpeg', crop: { top: 0.06, bottom: 0.1 } },
      { name: 'moquette-bureau-porte', file: '3.jpeg', crop: { bottom: 0.1 } },
      { name: 'moquette-tapis', file: '5.jpeg' },
      { name: 'moquette-estrade', file: '4.jpeg', crop: { right: 0.2, bottom: 0.06 } },
      { name: 'moquette-cloisons', file: '8.jpeg', crop: { bottom: 0.1, left: 0.16 } },
      { name: 'moquette-marche', file: '9.jpeg', crop: { bottom: 0.1 } },
      { name: 'moquette-plateau', file: '7.jpeg' },
      { name: 'moquette-escalier', file: '10.jpeg', crop: { bottom: 0.08 } },
      { name: 'moquette-bureau-meuble', file: '1.jpeg', crop: { bottom: 0.1 } },
    ],
  },
  {
    material: 'vinyle',
    folder: 'Vinyle',
    photos: [
      // Stone-look vinyl tiles across a shop floor, seen down its length. The
      // ceiling and walls of the live fit-out (cables, paperwork) are cropped
      // away; the floor conduits for the shop fittings stay small and distant.
      { name: 'vinyle-surface', file: '5.jpeg', crop: { top: 0.36, bottom: 0.1 } },
      // The clean lower band of another view: the tiles close up.
      { name: 'vinyle-dalles', file: '4.jpeg', crop: { top: 0.58, bottom: 0.1 } },
      { name: 'vinyle-local', file: '3.jpeg', crop: { top: 0.3, bottom: 0.14 } },
      // Crops the person standing at the left edge out of the frame.
      { name: 'vinyle-vitrine', file: '2.jpeg', crop: { left: 0.2, bottom: 0.14 } },
      { name: 'vinyle-pose', file: '1.jpeg', crop: { bottom: 0.14 } },
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
    id: 'ITA4ysSN8xA',
    photographer: 'Lisa Anna',
    page: 'https://unsplash.com/photos/an-empty-room-with-hard-wood-floors-and-white-walls-ITA4ysSN8xA',
    description: 'Bright empty room with light oak flooring and tall windows',
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
    id: 'P10Yd3OMijE',
    photographer: 'Salvo Media LLC',
    page: 'https://unsplash.com/photos/bright-empty-room-with-hardwood-floors-and-large-windows-P10Yd3OMijE',
    description: 'Bright contemporary room with light oak flooring',
  },
  {
    name: 'parquet-detail',
    id: 'DJ3dx5MoUIw',
    photographer: 'Alina Bondar',
    page: 'https://unsplash.com/photos/wicker-chair-with-metal-legs-on-a-wooden-floor-DJ3dx5MoUIw',
    description: 'Pale herringbone parquet with a single chair',
    // The original is mostly bare wall: keep the chair and the floor.
    crop: { top: 0.44 },
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
