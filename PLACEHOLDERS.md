# Placeholders — what the client still has to supply

Everything that is still a placeholder on the site, and the exact file where it
is replaced. Nothing is invented: where a fact is missing, the site says so
visibly instead of filling the gap.

## 1. Still missing — `src/config/site.js`

| Placeholder | Field | Why it matters |
| --- | --- | --- |
| DOMAIN TO BE PROVIDED | `domain` | Canonical URLs, hreflang, Open Graph tags, `sitemap.xml` and `robots.txt` all derive from it. The build prints a warning while it is still the placeholder. |
| FORM SERVICE TO BE PROVIDED | `form.provider` + `form.formspreeEndpoint` (or `'netlify'`) | Until one is set, the contact form validates and then asks the visitor to call or write — it never pretends a message was sent. |

## 2. Project details — `src/data/projects.js`

The five projects now carry real photographs, but everything that cannot be read
off a photograph is still a placeholder:

- **Titles** — "Projet 1" … "Projet 5" / "Project 1" … "Project 5", with the
  slugs `projet-1` / `project-1`. Replace both when you have real names.
- **Location, year, surface area, materials** — `À fournir` / `To be provided`,
  all coming from the shared `toBeProvided` block at the top of the file.
- **Description** — `PROJECT INFORMATION TO BE PROVIDED …`. It is used for the
  page's meta description; the project page itself prints no description block.
- **Before / after** — `beforeImage` and `afterImage` are null, so no comparison
  slider is shown. It appears only when both photographs exist, and is never
  faked.

The `services` line of each project *was* set from what the photographs plainly
show (Versailles panels, herringbone, staircase cladding, decking); correct it
if any is wrong.

## 3. Legal text — `src/data/content.js`

`legalPages.legal.sections` and `legalPages.privacy.sections` hold the structure
of the two legal pages. Every section shows **LEGAL CONTENT TO BE PROVIDED AND
REVIEWED** under a one-line description of what belongs there. The client, with
legal advice where appropriate, writes the real text; the site makes no claim
about being compliant with anything.

Still to be decided there: company registration details (IDE number, registered
address, representative), the hosting provider, retention periods, and the list
of processors (host, form service, map provider).

## 4. Photographs — what would improve the site

Nothing here is broken; these are gaps worth filling.

| Gap | Why | Where it goes |
| --- | --- | --- |
| A job with **lino, PVC, carpet or vinyl** | Not one of the 35 photographs shows a soft-flooring job, although it is half of what the company offers. The second service is illustrated with a licensed image of a woven floor covering instead. | `photos-source/` → a sixth project, or as the illustration for service 02 |
| More photographs of **projects 2 and 3** | Both have only two: a cover and one gallery image. | The matching group in `scripts/image-sources.mjs` |
| **Before** photographs | The before/after slider is built and waiting; it needs a pair from the same job. | `beforeImage` / `afterImage` in `src/data/projects.js` |
| Photographs **wider than 1000 px** of the white-riser staircase | The three photographs of that job are 954 px wide — fine as thumbnails, not enough for a cover — so a different staircase was used for project 4. | `photos-source/` |

## 5. Supplied — for reference

| Item | Where it now lives |
| --- | --- |
| Logo | `src/components/PlaneMark.jsx` (inline, inherits the text colour) and `public/logo-mark.svg`. Redrawn as clean vectors from the business card. |
| Slogan | `site.slogan` — "Travaux en bois, l'art de la vie" |
| Business descriptor | `content.brand.descriptor` and the footer tagline |
| Address | `site.address` — Chemin François-Chavaz 24, 1213 Onex. Footer, contact page and LocalBusiness structured data. |
| Map | `site.map` — Google Maps, loaded only after the visitor clicks. |
| Project photographs | `photos-source/` → `public/images/projects/` via `npm run images`; grouping in `scripts/image-sources.mjs`, alt text in `src/data/projects.js`. |
| Page images | `site-source/` → `public/images/site/`; every one credited in `CREDITS.md`, alt text in `content.siteImageAlt`. |
| Favicon and link preview | `public/favicon.svg`, `favicon-96.png`, `apple-touch-icon.png`, `og-image.jpg` — generated from the mark and the hero image. |

The French service names are the client's exact wording and must not be
rewritten:

1. Pose, ponçage et imprégnation de parquet
2. Pose de lino, PVC, moquette, vinyle, etc.

Everything else in `src/data/content.js` is written copy rather than
client-supplied fact: it describes the work and contains no figures, years in
business, certifications, awards or testimonials. It should still be read
through and approved by the client.
