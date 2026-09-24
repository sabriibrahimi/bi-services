# Placeholders — what the client still has to supply

Everything that is still a placeholder on the site, and the exact file where it
is replaced. Nothing is invented: where a fact is missing, the site says so
visibly instead of filling the gap.

## 1. Still missing — `src/config/site.js`

| Placeholder | Field | Why it matters |
| --- | --- | --- |
| DOMAIN TO BE PROVIDED | `domain` | Canonical URLs, hreflang, Open Graph tags, `sitemap.xml` and `robots.txt` all derive from it. The build prints a warning while it is still the placeholder. |
| FORM SERVICE TO BE PROVIDED | `form.provider` + `form.formspreeEndpoint` (or `'netlify'`) | Until one is set, the contact form validates and then asks the visitor to call or write — it never pretends a message was sent. |

## 2. Projects — `src/data/projects.js`

Only parquet jobs are projects. Each one shows its number ("Projet 1" …
"Projet 5" / "Project 1" … "Project 5") and its photographs — nothing else. No
location, year, surface or description appears anywhere on the site, so there
is no placeholder text to see; when the client supplies real details, they can
be added to the project and shown on its card and page.

- **Before / after** — `beforeImage` and `afterImage` are null, so no comparison
  slider is shown. It appears only when both photographs exist.

PVC / Lino, Moquette and Vinyle are shown as plain photo galleries under their
filters on the projects page (from `photos-source/PVC-Lino`, `Moquette`,
`Vinyle`) and are never grouped into projects.

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
| Cleaner **vinyl** photographs | All five were taken mid fit-out: cables on the walls and conduits in the floor. The best crops are used, but a finished, furnished shop would show the material far better. | `photos-source/Vinyle/` |
| More photographs of **projects 2 and 3** | Both have only two: a cover and one gallery image. | The matching group in `scripts/image-sources.mjs` |
| **Before** photographs | The before/after slider is built and waiting; it needs a pair from the same job. | `beforeImage` / `afterImage` in `src/data/projects.js` |

## 5. Supplied — for reference

| Item | Where it now lives |
| --- | --- |
| Logo | `src/components/PlaneMark.jsx` (inline, inherits the text colour) and `public/logo-mark.svg`. Redrawn as clean vectors from the business card. |
| Slogan | `site.slogan` — "Travaux en bois, l'art de la vie" |
| Business descriptor | `content.brand.descriptor` and the footer tagline |
| Address | `site.address` — Chemin François-Chavaz 24, 1213 Onex. Footer, contact page and LocalBusiness structured data. |
| Map | `site.map` — Google Maps, loaded only after the visitor clicks. |
| Parquet project photographs | `photos-source/` → `public/images/projects/` via `npm run images`; grouping in `scripts/image-sources.mjs`, alt text in `src/data/projects.js`. |
| PVC / Lino, Moquette, Vinyle photographs | `photos-source/<folder>/` → `public/images/materials/`; list in `MATERIAL_PHOTOS`, alt text in `content.materialAlt`. |
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
