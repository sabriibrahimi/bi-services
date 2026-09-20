# Image credits

The photographs of finished work on the projects pages are BI SERVICES Sàrl's
own, taken on its job sites.

The photographs used for the page furniture — the hero, the introduction, the
service sections, the contact page and the 404 page — are licensed stock images.
They illustrate the text and are never presented as the company's projects.

All of them come from [Unsplash](https://unsplash.com/license), whose licence
allows free commercial use without permission. The files are downloaded into the
repository (nothing is hotlinked) and re-encoded by `npm run images`.

| File | What it shows | Photographer | Source | Page |
| --- | --- | --- | --- | --- |
| `public/images/site/hero-*` | Sunlight across light wooden floorboards | Franco Debartolo | Unsplash | https://unsplash.com/photos/sunlight-on-wooden-floorboards-Q9ttGXgFYFk |
| `public/images/site/intro-principale-*` | Sunlight drawing diamonds across a wooden floor | Kristaps Solims | Unsplash | https://unsplash.com/photos/YyROGiu9LuE |
| `public/images/site/intro-detail-*` | Close view of an oak surface | Maria Kovalets | Unsplash | https://unsplash.com/photos/AE84zZ5C1Ws |
| `public/images/site/parquet-principale-*` | Herringbone parquet with a satin finish | Madalozzo | Unsplash | https://unsplash.com/photos/_e2Jw79ssKo |
| `public/images/site/parquet-detail-*` | Close-up of a parquet pattern | Alex Cooper | Unsplash | https://unsplash.com/photos/close-up-of-a-wooden-parquet-floor-pattern-K6vkTjYciX8 |
| `public/images/site/souples-principale-*` | Close view of a woven floor covering | B vB | Unsplash | https://unsplash.com/photos/close-up-of-woven-rug-kdnfVGGPh_U |
| `public/images/site/souples-detail-*` | Textile floor covering in a warm tone | Lynda Sanchez | Unsplash | https://unsplash.com/photos/brown-area-rug-UZZcLyvqXJs |
| `public/images/site/contact-*` | Interior with brick wall and wooden floor | Kai Damm-Jonas | Unsplash | https://unsplash.com/photos/8o6Z2j1XX6U |
| `public/images/site/introuvable-*` | Wooden floorboards seen from above | Maria Kovalets | Unsplash | https://unsplash.com/photos/l3qaat24Cv4 |

To replace one, edit `SITE_IMAGES` in `scripts/image-sources.mjs`, delete the
matching file in `site-source/`, and run `npm run images` again.
