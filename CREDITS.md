# Image credits

BI SERVICES Sàrl's own photographs, taken on its job sites:

- the parquet projects (`photos-source/`), on the projects pages;
- the PVC / lino, carpet and vinyl photographs (`photos-source/PVC-Lino`,
  `Moquette`, `Vinyle`), on the services page and in the galleries of the
  projects page.

The photographs used for the hero, the introduction, the parquet service and
the 404 page are licensed stock images. They illustrate the text and are never
presented as the company's work.

All of them come from [Unsplash](https://unsplash.com/license), whose licence
allows free commercial use without permission. The files are downloaded into the
repository (nothing is hotlinked) and re-encoded by `npm run images`.

| File | What it shows | Photographer | Source | Page |
| --- | --- | --- | --- | --- |
| `public/images/site/hero-*` | Sunlight across light wooden floorboards | Franco Debartolo | Unsplash | https://unsplash.com/photos/sunlight-on-wooden-floorboards-Q9ttGXgFYFk |
| `public/images/site/intro-principale-*` | Bright empty room with light oak flooring and tall windows | Lisa Anna | Unsplash | https://unsplash.com/photos/an-empty-room-with-hard-wood-floors-and-white-walls-ITA4ysSN8xA |
| `public/images/site/intro-detail-*` | Close view of an oak surface | Maria Kovalets | Unsplash | https://unsplash.com/photos/AE84zZ5C1Ws |
| `public/images/site/parquet-principale-*` | Bright contemporary room with light oak flooring | Salvo Media LLC | Unsplash | https://unsplash.com/photos/bright-empty-room-with-hardwood-floors-and-large-windows-P10Yd3OMijE |
| `public/images/site/parquet-detail-*` | Pale herringbone parquet with a single chair | Alina Bondar | Unsplash | https://unsplash.com/photos/wicker-chair-with-metal-legs-on-a-wooden-floor-DJ3dx5MoUIw |
| `public/images/site/introuvable-*` | Wooden floorboards seen from above | Maria Kovalets | Unsplash | https://unsplash.com/photos/l3qaat24Cv4 |

To replace one, edit `SITE_IMAGES` in `scripts/image-sources.mjs`, delete the
matching file in `site-source/`, and run `npm run images` again.
