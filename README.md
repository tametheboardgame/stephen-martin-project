# The Stephen Martin Project

**Rescue Stephen Martin from China** is a small, deliberately fictional adult comedy adventure for web browsers. It has a shared illustrated story and **three playable endings** with separate small puzzles:

- The Summit: a fictional mountain admissions test and throne-room ending.
- The Office of Ceremonial Misunderstandings: a bureaucracy and rubber-stamp escape.
- Total Renewal Spa: a cardboard souvenir rebuilding puzzle and the appearance of unharmed Stephen alongside a ludicrously taped-together cardboard version.

The intended first playthrough is **15–25 minutes**, including one ending. All three ending routes and their illustrated assets have been integrated into `main` by 18 October 2026 (Ending C merge `d3d7534`). **This is a first-version playtest build, not a finished or authorised public release.** The final end-to-end human timing, accessibility, voice and visual consistency checks remain open.

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

## What still needs refining

The **GAME-SP4.1** plan focuses on: an accessible current-scene loading screen and smarter image priority, fixed David expression registration in Back in England, lighter Summit entrance, consistently named speech bubbles after choices, speaker highlighting across every scene, illustrated time/travel transitions, selective small expression/movement polish, and completion of currently unvoiced route/ending dialogue as recordings become available. The remaining Ending C board cut-out shape precision is deferred at the owner's request.

There are **112 presently whitelisted dialogue MP3s** in the repo, but not every line in the three endings is yet voiced. The game plays unvoiced material by text timing with normal pause/next behaviour. Continue recording only from the **approved scripts and file-ID inventory**, without inventing extra real-person details.

## Safety, rights and release gates

The story is satire. Stephen Martin is the only permitted real-world full name in project material; David and Paul are fictional first-name character labels. Do not commit identifying employers, private messages, real-life third parties, identifiable travel/location metadata or unauthorised audio. Art/voice requires owner approval and a recorded asset provenance; no new unreviewed image should be treated as canonical.

GitHub and Cloudflare preview resources can be publicly accessible. **Merging a PR does not mean the project owner authorised public promotion or release.** Obtain separate final sign-off after three complete route playthroughs, responsive/keyboard/touch/audio tests, runtime review and the privacy check.
