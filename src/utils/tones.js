/**
 * Placeholder blocks cycle through the palette so an image-led page still reads
 * as designed while the photographs are missing. Deterministic, so a project
 * keeps the same tone between renders and between languages.
 */
const TONES = ['linen', 'oak', 'stone', 'charcoal', 'walnut', 'bone']

export function toneForIndex(index = 0) {
  return TONES[((index % TONES.length) + TONES.length) % TONES.length]
}

export default toneForIndex
