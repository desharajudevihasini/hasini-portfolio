# Hasini — Curiosity in Motion

A dark, cinematic portfolio showcasing **12 projects**, including completed prototypes, interactive work, and projects still in development. Each project has a standalone detail page, and the main site also includes an introduction, campus achievements, skills, interests, and a small music shelf.

## Run locally

1. Extract this ZIP.
2. Open the `Hasini-Portfolio` directory in a terminal or VS Code.
3. Run `npm run dev` (or `node serve.mjs`).
4. Open **http://localhost:3000**.

Node.js is required. The prebuilt site is in `dist`, so there is **no dependency installation or separate build step**. When deploying to a static host, upload the *contents* of `dist` to the domain root; root-relative asset URLs need adjustment if the site is hosted in a subdirectory.

## Project order and cinematic intro

The **same five strongest/most distinctive projects** lead both the cinematic animation and the complete project listing:

1. **TĀRA** — live interactive exploration of Carnatic music and sound
2. **TIKI** — ESP32-S3 smart-glasses working hardware MVP
3. **TREE** — live home-retrofit experience, MegathonX Round 2
4. **RaceOS** — working F1 pit-stop strategy prototype
5. **HeritageLens** — distinctive photo-based family-mansion reconstruction (in progress)

The five 3D worlds remain in their original technical sequence so the established camera choreography continues to work, but their narrative chapters, images and clickable project links now feature these five projects in that order. The **Selected Projects** gallery uses the same first-five ordering.

**More from my workbench:** Trekker, AERONAUT, Nerf Controller, Underwater Acoustics and ASTRA.

**Currently building:** MILO and Roadster, presented at the end with clear in-development language, rather than being misrepresented as finished work. There are **12 projects total**.

The previous *Portfolio Experiments* entry was removed.

## Image and media updates

Real photographs and reference images received November 2, 2026 are incorporated in both the corresponding project pages and homepage cards:

- Hasini portrait: `dist/media/profile-photo.jpg` (real portrait)
- TĀRA: `dist/media/tara-dashboard.jpg` (real website screenshot)
- TREE: `dist/media/tree-dashboard.jpg` (real website screenshot)
- HeritageLens: `dist/media/heritagelens-house-1.jpg`, `heritagelens-house-2.jpg` (real house-site photographs)
- Roadster: `dist/media/roadster-photo-card.jpg` (automotive **inspiration** image, not completed build)
- RaceOS: `dist/media/raceos-photo-card.jpg` (F1 **reference** photograph, not the actual app interface)
- Nerf Controller: `dist/media/nerf-photo-card.jpg` (real hardware / components)
- Underwater Acoustics: `dist/media/underwater-photo-card.jpg` (Advanced Academic Center logo)
- ASTRA: `dist/media/astra-photo-card.jpg` (real experiment, cropped to remove phone UI)
- MILO: `dist/media/milo-in-development.svg` (typographic placeholder, not a built robot)

Trekker still uses a placeholder illustration until a project photo is supplied. See `dist/media/IMAGE-SLOTS.md` for detailed media provenance and file paths. Some real prototype links (TIKI, AERONAUT) depend on internet access.

## Music

The **MUSIC** button opens three bundled original instrumental tracks: Blue Hour, Copper Current, and Afterglow. Playback starts only when the visitor presses Play. The original 3D scene sound control remains available; the player and scene sound do not compete. To change the music, update the files in `dist/music/` and the track list in `dist/music/player.js`; use only tracks you have rights to include.

## Beyond the Projects

The page includes Advanced Academic Centre membership, Google Developers Group on Campus, MegathonX Round 2 participation, Deccan CTF, and Hack’O’Ber second place with the Trekker two-person team, plus technical skills and basketball, football and baking interests.

## Source notes and testing

- `dist/assets/index-B6Wh02kD.js`: adapted prebuilt interactive app and portfolio gallery
- `dist/projects/data.json`: editable project descriptions
- `dist/projects/<project>/index.html`: individual detail pages
- `dist/portfolio.css` / `dist/projects/detail.css`: styling
- `dist/music/`: audio player and MP3s
- `SOURCE-NOTES.md`: background and reference attribution

The 3D world and motion foundation originates from the ATMOS/BITS Pilani Hyderabad reference, as documented in `SOURCE-NOTES.md`; the site is an adaptation, not an original reimplementation of that animation system. Project image source labels distinguish actual photographs from visual inspiration.

All 12 pages and local image references have been checked and the JavaScript syntax passed. Automated Chromium visual testing was blocked by administrator network restrictions, so **preview the site locally before publishing**.
