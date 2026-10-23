# The Stephen Martin Project

**Rescue Stephen Martin from China** is a small, deliberately fictional adult comedy adventure for web browsers. It has a shared illustrated story and **three playable endings** with separate small puzzles:

- The Summit: a fictional mountain admissions test and throne-room ending.
- The Office of Ceremonial Misunderstandings: a bureaucracy and rubber-stamp escape.
- Total Renewal Spa: a cardboard souvenir rebuilding puzzle and the appearance of unharmed Stephen alongside a ludicrously taped-together cardboard version.

The intended first playthrough is **15–25 minutes**, including one ending. **V1 gameplay and all three illustrated endings are owner-accepted.** G5H completed automated route A/B/C and viewport regression on 23 October 2026. The V1 final technical audit and delivery optimisation are documented separately. This is a playable V1, **not an authorisation for additional public promotion or launch**.

## Current work and documentation

- [Current status](STATUS.md): merged baseline, active branch and next action.
- [Master roadmap](ROADMAP.md): scope and ordered GAME-SP4.1A–J refinement packages.
- [First-version refinement audit](docs/story/GAME-SP4.1-FIRST-VERSION-REFINEMENT-AUDIT.md): concrete visual/audio/performance findings, priorities, acceptance tests and release gates.
- [Decisions](DECISIONS.md), [creative bible](docs/CREATIVE-BIBLE.md), [art direction](docs/ART-DIRECTION.md) and [project rules](AGENTS.md): accepted boundaries, character likenesses and operating contract.
- [Generated asset pipeline](docs/GENERATED-ASSET-PIPELINE.md): approved Drive originals → versioned manifest → optimised WebP → preview branch.
- [Dialogue audio guidance](docs/VOICE-AUDIO-IMPORT.md), [China voices](docs/CHINA-VOICE-IMPORT.md), [rescue alarm voices](docs/RESCUE-ALARM-VOICE-IMPORT.md) and [hotel voices](docs/VISITOR-INFORMATION-VOICE-IMPORT.md): historical recording scripts and import conventions. Some older guide references point at completed development branches; the current code/build whitelist is authoritative.

## Run and verify locally

Requires Node.js and npm. The application is plain HTML/CSS/JavaScript with static approved images and optional MP3s; no framework or external runtime service is required.

1. Clone the repository.
2. Run `npm start` to serve the static game on localhost.
3. Run `npm run verify` for JavaScript syntax, automated game checks and the production build.
4. Open `http://localhost:8080/` in a desktop browser, or use an approved Cloudflare Pages preview for cross-device review.

`npm run build` creates `dist/` with the whitelisted game scripts, approved artwork and permitted audio. Cloudflare Pages is configured for **no framework**, build command `npm run build` and output directory `dist`. Production tracks `main`; short-lived `agent/*` branches have independent review previews.

## V1 close-out and optimisation

**Status:** Feature-complete, all three endings accepted. The final roadmap is closed for V1; optional new route handoff art, extra acting packs, precision silhouette-registration and a comic pilot were explicitly not made V1 requirements. The historical roadmap preserves their original planning language. See the [final technical audit](docs/story/V1-FINAL-TECHNICAL-AUDIT.md) and [current status](STATUS.md) for authoritative results.

**Audio:** 254 approved dialogue MP3s and two opening song MP3s are included by the build whitelist. G5B's four corrected Ending C recordings are locked to their SHA-256 hashes. Optional future dialogue expansion is not a blocker for this V1.

**Delivery:** The exact owner-approved Ending C PNG stays archived; a pixel-identical lossless WebP is delivered instead. Legacy baseline portraits and 18 reference-only expression crops remain in source history but are excluded from the deployed bundle. Runtime artwork is scene-gated. Verification now includes a post-build output inventory check with `scripts/v1-dist-audit.mjs`.

## Safety, rights and release gates

The story is satire. Stephen Martin is the only permitted real-world full name in project material; David and Paul are fictional first-name character labels. Do not commit identifying employers, private messages, real-life third parties, identifiable travel/location metadata or unauthorised audio. Art/voice requires owner approval and a recorded asset provenance; no new unreviewed image should be treated as canonical.

GitHub and Cloudflare preview resources can be publicly accessible. The owner has accepted V1 playability and the completed automated three-ending regression suite, and has waived additional formal timed/device tests for this private first version; no unmeasured playthrough timings or physical-device certification are claimed. **Merging the final optimisation PR does not authorise new public marketing or promotion.** Check artwork/voice rights and fictionalisation before any further outward-facing release.
