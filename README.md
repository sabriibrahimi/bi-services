# BI SERVICES Sàrl — website

Bilingual (French / English) marketing site for BI SERVICES Sàrl, a Swiss flooring
company. React + Vite + React Router, with every route prerendered to static HTML
at build time so search engines and link previews see real content.

## Commands

```bash
npm install
npm run dev      # development server on http://localhost:5173
npm run images   # photos-source/ -> public/photos/ + src/data/photos.js
npm run build    # prerenders every route into dist/, then writes robots.txt + sitemap.xml
npm run preview  # serves the built site
```

The build output in `dist/` is plain static files: it runs on Netlify, Vercel,
Cloudflare Pages, or any static host.

## How it is put together

```
src/
  config/
    site.js        every client detail: phone, email, address, domain, form, map
    routes.js      the URL of each page in each language
  data/
    content.js     every user-facing string, in French and English
    projects.js    the projects: adding one here adds its pages everywhere
  components/      reusable pieces, each with its own .css file
  layouts/
    SiteLayout.jsx header + footer + language context for one language
  pages/           one file per page
  services/
    contactForm.js the only place that talks to the form back-end
  styles/
    tokens.css     colours, type scale, spacing, motion
    base.css       reset, element defaults, layout primitives
  utils/           i18n helpers, link helpers, focus trap, structured data
scripts/
  image-sources.mjs        which photographs are used, grouped by job site
  prepare-images.mjs       builds every image the site serves
  generate-seo-files.mjs   robots.txt, sitemap.xml and 404.html after each build
photos-source/             the client's untouched originals
site-source/               the licensed images, downloaded once
```

### Pages

The home page carries the hero, the introduction, the two services, the featured
projects, how the company works, and the contact details. The project pages are
generated from `src/data/projects.js`; a project page shows its cover, its
gallery, an optional before/after slider and the neighbouring projects.

### Languages and URLs

French is primary, English secondary. Every page exists under a language prefix:

| Page          | French                       | English                   |
| ------------- | ---------------------------- | ------------------------- |
| Home          | `/fr/`                       | `/en/`                    |
| Services      | `/fr/services`               | `/en/services`            |
| Projects      | `/fr/realisations`           | `/en/projects`            |
| Project       | `/fr/realisations/:slug`     | `/en/projects/:slug`      |
| Contact       | `/fr/contact`                | `/en/contact`             |
| Legal notice  | `/fr/mentions-legales`       | `/en/legal-notice`        |
| Privacy       | `/fr/confidentialite`        | `/en/privacy-policy`      |

`/` redirects to `/fr/`. The FR / EN switch always points at the same page in the
other language — including the same project on a project page.

All interface text lives in `src/data/content.js` as `{ fr: '…', en: '…' }` and is
resolved with `t(entry, lang)`. Nothing user-facing should be written directly in
a component.

### Adding a project

Add one object to the array in `src/data/projects.js`. The grid, the filters, the
detail page, both language routes and the sitemap follow automatically — no other
file needs to change.

Projects are numbered ("Projet 3" / "Project 3") until the client supplies real
titles, and **each project holds photographs from a single job site**. Location,
year, surface and materials stay placeholders: they cannot be read off a
photograph.

### Photographs

Two sets, kept strictly apart.

**The client's own photographs** live in `photos-source/` and are used *only* by
the projects: the projects page, the project pages, and the featured cards on
the home page, which show each project's own cover. Never on the hero, the
services or anywhere else.

**Licensed images** illustrate the rest of the pages. They are downloaded once
into `site-source/`, and `CREDITS.md` lists every one with its photographer and
source. They are never captioned or presented as the company's work.

Both go through one command:

```bash
npm run images
```

It reads `scripts/image-sources.mjs` — which photographs are used, which job
site each belongs to, and any cleanup they need — then writes
`public/images/projects/` and `public/images/site/` as WebP at 800 / 1400 /
2000 px plus a JPEG fallback, and regenerates `src/data/projectPhotos.js`,
`src/data/siteImages.js`, `CREDITS.md`, the link-preview image and the PNG
icons.

Every photograph gets the same gentle cleanup before resizing: white balance
pulled towards neutral, exposure nudged towards a mid tone, a light unsharp
mask, plus any `crop`, `rotate`, `warmth`, `exposure` or `quality` named in
`image-sources.mjs` (used, for instance, to trim the camera watermark some
phones burn into a corner). Originals are never touched, and **nothing is ever
enlarged**: a photograph is only written at widths it can actually fill, and one
that cannot fill 1000 px is reported as fit for small slots only.

To add a project photograph: drop the file into `photos-source/`, add an entry
to the right job site in `PROJECT_PHOTOS`, run `npm run images`, then reference
it in `src/data/projects.js` through `image('name', { fr, en })` — the second
argument is the alt text, required in both languages.

To add a page image: add an entry to `SITE_IMAGES` with its photographer and
source page, run `npm run images`, add the alt text to `content.siteImageAlt`,
and use it with:

```jsx
import { siteImage } from '../utils/siteImage.js'

<Media {...siteImage('hero')} ratio="16 / 9" sizes="100vw" />
```

### Image crops and small screens

`ratio` is the crop the composed layout uses. Below 62rem every image is full
width, so a portrait crop there becomes a slab taller than the screen: give
those images a `ratioSm` as well and the phone and small-tablet layout uses it
instead.

```jsx
<Media {...siteImage('intro-principale')} ratio="3 / 4" ratioSm="4 / 3" />
```

Images left without a `ratioSm` simply keep their crop at every width, which is
right whenever the crop already reads as landscape. The three grids that go
multi-column earlier — the featured projects, the projects grid and a project's
gallery — take their `ratio` back at 52rem, where their columns start.

Note that `ratio` is applied as an inline custom property, so a stylesheet rule
that re-declares `--media-ratio` at a breakpoint will not win. Override the
`aspect-ratio` property instead, the way `Media.css` does.

### Contact form

`src/services/contactForm.js` is the only place that submits the form. Choose a
back-end in `src/config/site.js`:

```js
form: {
  provider: 'formspree',
  formspreeEndpoint: 'https://formspree.io/f/xxxxxxx',
}
// or
form: { provider: 'netlify', netlifyFormName: 'contact' }
```

While `provider` is `null` the form still validates and still explains itself,
but it never claims a message was sent: it asks the visitor to call or write
instead.

### Map

The map on the contact page is loaded only after the visitor clicks, because the
provider sets third-party cookies. It is configured in `site.map` for the Onex
address; clearing `embedUrl` turns the block back into a marked placeholder.

### SEO

`src/components/Seo.jsx` writes the title, description, canonical URL, the
FR/EN `hreflang` pair plus `x-default`, and the Open Graph and Twitter tags into
the prerendered HTML of each page. `src/utils/structuredData.js` adds
schema.org `LocalBusiness` data built only from information the client has
actually supplied — the postal address appears in it automatically once it is
added to `src/config/site.js`.

`scripts/generate-seo-files.mjs` writes `robots.txt` and `sitemap.xml` (both
languages, all project pages) and copies the prerendered 404 page to
`dist/404.html`. It warns if the domain is still the placeholder.

### Logo

The hand-plane mark from the business card, redrawn as clean vectors, lives in
`src/components/PlaneMark.jsx` — inline, so it inherits the surrounding text
colour on both the light header and the dark footer. `public/logo-mark.svg` is
the identical drawing as a standalone file, used for structured data and for
anyone who needs the logo on its own. The favicon and the PNG icons are built
from the same paths.

### Fonts

Self-hosted through `@fontsource` (Instrument Serif for display, Archivo for
text), imported in `src/main.jsx`. Nothing is loaded from Google's servers.

## Deployment

The site is a folder of static files. `/` is a prerendered page carrying a meta
refresh to `/fr/`, and `404.html` sits at the root, so it works on any static
host without redirect rules. Two host-specific files add proper redirects where
they are supported:

- `public/_redirects` — Netlify and Cloudflare Pages: `/` → `/fr/`, unknown URLs
  → the 404 page.
- `vercel.json` — the same redirect for Vercel.

### Where the site lives

Two build-time variables decide the URLs, and nothing else in the source needs
editing to move the site:

| Variable | Example | Effect |
| --- | --- | --- |
| `VITE_BASE` | `bi-services` | Serves the site under `/bi-services/`. Omit for a domain root. Accepted with or without slashes. |
| `VITE_SITE_ORIGIN` | `https://you.github.io` | Scheme and host for canonical URLs, `hreflang`, Open Graph tags and the sitemap. |

`src/config/deployment.js` reads them — from `import.meta.env` in the app, from
`process.env` in the Node scripts — and exposes `basePath`, `origin`,
`asset()` and `absolute()`. React Router gets the same value as its `basename`,
so every `<Link>` is prefixed automatically; raw hrefs and public-folder paths
go through `asset()`.

Neither variable is set by `npm run dev`, so local development stays at `/`
with the placeholder domain, and the build warns while the origin is unset.

### GitHub Pages

`.github/workflows/deploy.yml` builds and publishes on every push to `main`. It
derives both variables from the repository itself, so renaming or transferring
the repository needs no edit:

```yaml
VITE_BASE: ${{ github.event.repository.name }}
VITE_SITE_ORIGIN: https://<owner lowercased>.github.io
```

One manual step is needed once, in the repository: **Settings → Pages →
Build and deployment → Source: GitHub Actions**. The site then appears at
`https://<owner>.github.io/<repo>/`.

## A note on versions

`react-router-dom` is pinned to `6.30.6`. The prerenderer (`vite-react-ssg`)
imports `react-router-dom/server.js`, which exists only in the v6 line; React
Router 7 moved it and the build fails. Upgrade both together, not separately.

## What still needs the client

See `PLACEHOLDERS.md` for every placeholder in the site and the exact file where
each one is replaced.
