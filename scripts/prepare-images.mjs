/**
 * Builds every image the site serves.
 *
 *   npm run images
 *
 * Project photographs:  photos-source/          -> public/images/projects/
 * Material photographs: photos-source/<folder>/ -> public/images/materials/
 * Site photographs:     downloaded once into site-source/ -> public/images/site/
 *
 * All are cleaned up the same way before resizing — a gentle, natural pass:
 * white balance towards neutral, exposure nudged towards a mid tone, a light
 * unsharp mask, plus any crop or rotation named in scripts/image-sources.mjs.
 * Originals are never modified, and nothing is ever enlarged beyond its own
 * resolution: a photograph only gets the widths it can actually fill.
 *
 * Outputs WebP at 800 / 1400 / 2000 px plus one JPEG fallback, then writes
 * src/data/projectPhotos.js, src/data/materialPhotos.js, src/data/siteImages.js
 * and CREDITS.md.
 */
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

import { MATERIAL_PHOTOS, PROJECT_PHOTOS, SITE_IMAGES, OG_IMAGE } from './image-sources.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const projectSource = join(root, 'photos-source')
const siteSource = join(root, 'site-source')
const projectOut = join(root, 'public', 'images', 'projects')
const materialOut = join(root, 'public', 'images', 'materials')
const siteOut = join(root, 'public', 'images', 'site')

/** Public URL folder for each output directory. */
const urlBase = new Map([
  [projectOut, '/images/projects'],
  [materialOut, '/images/materials'],
  [siteOut, '/images/site'],
])

/** Full-bleed slots (hero, project covers) can use the largest width. */
const WIDTHS_LARGE = [800, 1400, 2000]
/** The hero alone may span a very wide screen at high density. */
const WIDTHS_HERO = [800, 1400, 2000, 2400]
/** Everything else is never rendered wider than about half the viewport. */
const WIDTHS = [800, 1400]
const FALLBACK_WIDTH = 1400
/** Below this width a photograph is only fit for small, secondary slots. */
const SMALL_ONLY_BELOW = 1000

// ---------------------------------------------------------------- pipeline --

/**
 * One cleaned-up sharp pipeline for a source file. Returns a factory, because a
 * sharp instance cannot be reused once it has produced an output.
 */
async function cleaned(input, options = {}) {
  const meta = await sharp(input).metadata()
  const { crop = {}, rotate = 0, exposure = 1, warmth = 0, denoise = false } = options

  const left = Math.round(meta.width * (crop.left ?? 0))
  const top = Math.round(meta.height * (crop.top ?? 0))
  const width = Math.round(meta.width * (1 - (crop.left ?? 0) - (crop.right ?? 0)))
  const height = Math.round(meta.height * (1 - (crop.top ?? 0) - (crop.bottom ?? 0)))

  // Grey-world white balance, clamped so a warm room stays a warm room.
  const stats = await sharp(input).stats()
  const [r, g, b] = stats.channels.slice(0, 3).map((channel) => channel.mean)
  const grey = (r + g + b) / 3
  const clamp = (value) => Math.min(1.1, Math.max(0.9, value))
  const wb = [clamp(grey / r), clamp(grey / g), clamp(grey / b)]

  // A deliberate extra push towards (warmth < 0) or away from (warmth > 0) neutral.
  if (warmth) {
    wb[0] *= 1 + warmth * 0.1
    wb[2] *= 1 - warmth * 0.1
  }

  // Exposure: aim for a mid tone of about 132, and never move it far.
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
  const auto = Math.min(1.18, Math.max(0.88, 132 / luma))
  const gain = auto * exposure

  const dimensions = { width, height }

  const make = () => {
    let pipeline = sharp(input)
    if (rotate) pipeline = pipeline.rotate(rotate, { background: '#1b1917' })
    pipeline = pipeline.extract({ left, top, width, height })
    pipeline = pipeline.linear(
      [wb[0] * gain, wb[1] * gain, wb[2] * gain],
      [0, 0, 0]
    )
    if (denoise) pipeline = pipeline.median(3)
    return pipeline
  }

  return { make, dimensions, meta }
}

/** Write one photograph at every width it can honestly fill. */
async function emit({ input, name, outDir, options = {}, sizes = WIDTHS }) {
  const { make, dimensions } = await cleaned(input, options)
  const widths = sizes.filter((width) => width <= dimensions.width)
  if (widths.length === 0) widths.push(dimensions.width)

  for (const width of widths) {
    const target = join(outDir, `${name}-${width}.webp`)
    if (await isFresh(target, input)) continue
    await make()
      .resize({ width })
      // A light unsharp mask, applied after the downscale where it belongs.
      // m2 stays low: heavy sharpening on a busy texture inflates the file.
      .sharpen({ sigma: 0.7, m1: 0.5, m2: 0.9 })
      .webp({
        quality: options.quality ?? (width >= 1400 ? 72 : 78),
        effort: 5,
        smartSubsample: true,
      })
      .toFile(target)
  }

  const fallbackWidth = Math.min(FALLBACK_WIDTH, dimensions.width)
  const fallback = join(outDir, `${name}-${fallbackWidth}.jpg`)
  if (!(await isFresh(fallback, input))) {
    await make()
      .resize({ width: fallbackWidth })
      .sharpen({ sigma: 0.7, m1: 0.5, m2: 0.9 })
      .jpeg({ quality: options.quality ?? 74, mozjpeg: true })
      .toFile(fallback)
  }

  const height = Math.round((dimensions.height / dimensions.width) * fallbackWidth)
  const base = urlBase.get(outDir)
  return {
    src: `${base}/${name}-${fallbackWidth}.jpg`,
    sources: widths.map((width) => ({
      src: `${base}/${name}-${width}.webp`,
      width,
    })),
    width: fallbackWidth,
    height,
    ratio: `${dimensions.width} / ${dimensions.height}`,
    maxWidth: dimensions.width,
    smallOnly: dimensions.width < SMALL_ONLY_BELOW,
  }
}

// ------------------------------------------------------------------ inputs --

async function buildProjectPhotos() {
  await mkdir(projectOut, { recursive: true })
  const manifest = {}
  const missing = []

  for (const group of PROJECT_PHOTOS) {
    for (const photo of group.photos) {
      // Parquet jobs sit at the top of photos-source/; soft-floor jobs in the
      // folder of their covering.
      const input = join(projectSource, group.folder ?? '', photo.file)
      if (!existsSync(input)) {
        missing.push(`${photo.name} -> ${group.folder ? group.folder + '/' : ''}${photo.file}`)
        continue
      }
      const entry = await emit({
        input,
        name: photo.name,
        outDir: projectOut,
        options: photo,
        // Only covers are ever shown full width.
        sizes: photo.cover ? WIDTHS_LARGE : WIDTHS,
      })
      manifest[photo.name] = { ...entry, project: group.project, cover: Boolean(photo.cover) }
      console.log(
        `[projects] ${photo.name}: ${entry.sources.map((s) => s.width).join(', ')}${
          entry.smallOnly ? '  (small slots only)' : ''
        }`
      )
    }
  }

  if (missing.length > 0) {
    console.warn('\n[projects] MISSING SOURCE FILES — these entries were skipped:')
    missing.forEach((line) => console.warn('  ' + line))
  }

  await writeFile(
    join(root, 'src', 'data', 'projectPhotos.js'),
    `/**
 * GENERATED by \`npm run images\` from photos-source/ — do not edit by hand.
 * The client's own photographs of real job sites. Used only by the projects.
 */
export const projectPhotos = ${JSON.stringify(manifest, null, 2)}

export default projectPhotos
`,
    'utf8'
  )
  return manifest
}

async function buildMaterialPhotos() {
  await mkdir(materialOut, { recursive: true })
  const manifest = {}
  const missing = []

  for (const group of MATERIAL_PHOTOS) {
    for (const photo of group.photos) {
      const input = join(projectSource, group.folder, photo.file)
      if (!existsSync(input)) {
        missing.push(`${photo.name} -> ${group.folder}/${photo.file}`)
        continue
      }
      const entry = await emit({ input, name: photo.name, outDir: materialOut, options: photo })
      manifest[photo.name] = { ...entry, material: group.material }
      console.log(
        `[materials] ${photo.name}: ${entry.sources.map((s) => s.width).join(', ')}${
          entry.smallOnly ? '  (small slots only)' : ''
        }`
      )
    }
  }

  if (missing.length > 0) {
    console.warn('\n[materials] MISSING SOURCE FILES — these entries were skipped:')
    missing.forEach((line) => console.warn('  ' + line))
  }

  await writeFile(
    join(root, 'src', 'data', 'materialPhotos.js'),
    `/**
 * GENERATED by \`npm run images\` from photos-source/<folder>/ — do not edit by hand.
 * The client's own photographs of each covering. They illustrate the materials
 * on the services pages and are never presented as projects.
 */
export const materialPhotos = ${JSON.stringify(manifest, null, 2)}

export default materialPhotos
`,
    'utf8'
  )
  return manifest
}

async function buildSiteImages() {
  await mkdir(siteSource, { recursive: true })
  await mkdir(siteOut, { recursive: true })
  const manifest = {}

  for (const image of SITE_IMAGES) {
    const input = join(siteSource, `${image.name}.jpg`)
    if (!existsSync(input)) {
      const url = `https://images.unsplash.com/photo-placeholder`
      const download = image.downloadUrl ?? (await unsplashUrl(image.id))
      console.log(`[site] downloading ${image.name} (${image.id})`)
      const response = await fetch(download ?? url)
      if (!response.ok) throw new Error(`Download failed for ${image.id}: ${response.status}`)
      await writeFile(input, Buffer.from(await response.arrayBuffer()))
    }
    const entry = await emit({
      input,
      name: image.name,
      outDir: siteOut,
      options: image,
      // The hero is the only site image that spans the whole viewport.
      sizes: image.name === 'hero' ? WIDTHS_HERO : WIDTHS,
    })
    manifest[image.name] = entry
    console.log(`[site] ${image.name}: ${entry.sources.map((s) => s.width).join(', ')}`)
  }

  await writeFile(
    join(root, 'src', 'data', 'siteImages.js'),
    `/**
 * GENERATED by \`npm run images\` — do not edit by hand.
 * Licensed photographs used for the page furniture. They are never presented as
 * the company's own work; see CREDITS.md for the source of each one.
 */
export const siteImages = ${JSON.stringify(manifest, null, 2)}

export default siteImages
`,
    'utf8'
  )

  await writeCredits()
  return manifest
}

/** Resolve the full-size download URL for an Unsplash photo id. */
async function unsplashUrl(id) {
  let response
  // The public endpoint rate-limits bursts: back off and retry a few times.
  for (let attempt = 0; attempt < 6; attempt++) {
    response = await fetch(`https://unsplash.com/napi/photos/${id}`, {
      headers: { Accept: 'application/json' },
    })
    if (response.status !== 429) break
    await new Promise((resolve) => setTimeout(resolve, 15000))
  }
  if (!response.ok) throw new Error(`Unsplash lookup failed for ${id}: ${response.status}`)
  const data = await response.json()
  return `${data.urls.raw}&w=2400&q=85&fm=jpg`
}

async function writeCredits() {
  const rows = SITE_IMAGES.map(
    (image) =>
      `| \`public/images/site/${image.name}-*\` | ${image.description} | ${image.photographer} | Unsplash | ${image.page} |`
  ).join('\n')

  const body = `# Image credits

BI SERVICES Sàrl's own photographs, taken on its job sites:

- the parquet projects (\`photos-source/\`), on the projects pages;
- the PVC / lino, carpet and vinyl photographs (\`photos-source/PVC-Lino\`,
  \`Moquette\`, \`Vinyle\`), on the services page and in the galleries of the
  projects page.

The photographs used for the hero, the introduction, the parquet service and
the 404 page are licensed stock images. They illustrate the text and are never
presented as the company's work.

All of them come from [Unsplash](https://unsplash.com/license), whose licence
allows free commercial use without permission. The files are downloaded into the
repository (nothing is hotlinked) and re-encoded by \`npm run images\`.

| File | What it shows | Photographer | Source | Page |
| --- | --- | --- | --- | --- |
${rows}

To replace one, edit \`SITE_IMAGES\` in \`scripts/image-sources.mjs\`, delete the
matching file in \`site-source/\`, and run \`npm run images\` again.
`
  await writeFile(join(root, 'CREDITS.md'), body, 'utf8')
}

// --------------------------------------------------------------- og + icons --

async function writeSocialImage(siteManifest) {
  const source = join(siteSource, `${OG_IMAGE}.jpg`)
  if (!existsSync(source) || !siteManifest[OG_IMAGE]) return
  const target = join(root, 'public', 'og-image.jpg')
  if (await isFresh(target, source)) return
  const { make } = await cleaned(source, SITE_IMAGES.find((i) => i.name === OG_IMAGE) ?? {})
  await make()
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(target)
  console.log('[site] og-image.jpg (1200x630)')
}

async function writeIcons() {
  const source = join(root, 'public', 'favicon.svg')
  if (!existsSync(source)) return
  for (const [file, size] of [
    ['apple-touch-icon.png', 180],
    ['favicon-96.png', 96],
  ]) {
    const target = join(root, 'public', file)
    if (await isFresh(target, source)) continue
    await sharp(source, { density: 384 }).resize(size, size).png().toFile(target)
    console.log(`[site] ${file} (${size}x${size})`)
  }
}

async function isFresh(target, source) {
  if (!existsSync(target)) return false
  const [targetStat, sourceStat] = await Promise.all([stat(target), stat(source)])
  return targetStat.mtimeMs >= sourceStat.mtimeMs
}

/** Photographs sitting in photos-source/ that no project uses. */
async function reportUnused() {
  if (!existsSync(projectSource)) return
  const used = new Set(PROJECT_PHOTOS.flatMap((g) => g.photos.map((p) => p.file)))
  const all = (await readdir(projectSource)).filter((f) =>
    ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase())
  )
  const unused = all.filter((f) => !used.has(f))
  console.log(
    `\n[projects] ${used.size} photographs in use, ${unused.length} left in photos-source/ and not used.`
  )
}

async function main() {
  const projects = await buildProjectPhotos()
  const materials = await buildMaterialPhotos()
  const site = await buildSiteImages()
  await writeSocialImage(site)
  await writeIcons()
  await reportUnused()
  console.log(
    `\n[images] ${Object.keys(projects).length} project photographs · ${
      Object.keys(materials).length
    } material photographs · ${Object.keys(site).length} site images · CREDITS.md written`
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
