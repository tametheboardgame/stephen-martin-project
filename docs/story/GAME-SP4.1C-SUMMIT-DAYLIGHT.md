# GAME-SP4.1C — Summit Entrance Daylight Correction

**Date:** 18 October 2026  
**Development branch:** `agent/game-sp41c-summit-daylight`  
**PR:** [#52](https://github.com/tametheboardgame/stephen-martin-project/pull/52), draft pending owner visual approval  
**Start baseline:** merged `main` `3702ea83c5b14aaac394e40f97963ab919606eff` (SP4.1A/B merged and navigation refinements committed to the roadmap).

## Reported defect

At the Summit entrance, the original approved environment appears unexpectedly dark, as though an extra shadow layer covers the entire landscape. The source audit identified the responsible CSS in `src/styles.css`: one `background` rule applies an opaque navy-gradient overlay to **both** the Summit route introduction and the visible Summit Admissions outdoor stage, between the background art and the reader.

### Original visual composition

- Summit exterior: approved `public/assets/generated/locations/summit-entrance-v01.webp`, processed from the approved Google Drive original via the existing `game-sp40a-summit-entrance-v01.json` manifest. Do not change the source or re-render it.
- Overlay: `linear-gradient(to top, rgba(5,22,41,.52), rgba(4,20,37,.24) 64%, rgba(4,20,37,.32))` applies whole-scene darkening. This is redundant because local UI surfaces already have their own opaque backdrops.
- Readability layers: `.summit-entrance-label` has its own background, `.rescue-intro-dialogue` is dark-backed and separately bordered, the `#routeIntroStatus` panel has its own background, and `.summit-admissions` uses a separately dark-backed card for questions and accessible answer buttons.

## Scoped implementation

1. Replace the outdoor full-stage gradient with **the exact approved WebP only** (`center/cover no-repeat`) in the shared Summit route-intro and admissions selector.
2. Keep all existing local high-contrast surfaces and caption alignment; do not add a new overlay, tint, CSS brightness filter or different art source.
3. No change to approved cut-out sprites, character scale, stage position, speaking glow, dialogues, voices, input, game decisions, save-state keys or transitions.
4. Do not touch the `summit-throne-room-v01.webp` indoor ending or either of the other two ending routes.
5. The focused regression checks the approved exterior background is not wrapped in any `linear-gradient`, that the scene uses the original image, the readable title/dialogue/admissions surfaces remain present and the separately approved throne art remains packaged.

## Human preview checklist

- Compare the first Summit entrance dialogue against the previous `main` build at **1366×768** / **1440×900**. Verify the surrounding landscape and gates look distinctly brighter, with the sky and environmental colours legible.
- Step through David, Paul and gatekeeper dialogue; title, names and text should retain sufficient contrast against their **local** backgrounds, with no obstruction of any character.
- Enter the **Summit Admissions Test**. Check question text, three choices, wrong/right feedback and keyboard/touch focus remain legible and usable against the brighter background.
- Repeat on tablet about **800×1280** and mobile about **390×844**. Ensure the title and dialogue bubble don't overlap the transport bar or one another.
- Confirm detention/spa route intros and the separate Summit throne room still have their original colour/lighting. Test sound off/on, resume into route intro and admission rounds if accessible.
- Record final visual approval and actual CI/build/preview commit SHA before merge. A green Node test alone is **not** a completed visual review.

## Deferred scope

The shared named dialogue bubble polish (SP4.1D1), removal of intro Auto proof switches (SP4.1D0), contextual skip-to-choice/game/end control (SP4.1D2) and game-wide active speaker backlighting (SP4.1E) all remain separate work packages. Voice recordings continue independently as SP4.1H.
