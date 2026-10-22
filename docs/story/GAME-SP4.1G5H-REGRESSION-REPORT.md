# GAME-SP4.1G5H — three-route full regression report

**Date:** 22 October 2026  
**Target:** merged `main` after owner-approved G5F/G5G PR #89, merge `0f16c47285395040d5a31e6c373765c63a69d348`.  
**State:** Automated QA in progress on draft review branch. Human audio/performance and real-device review remain release gates.

## Coverage and evidence

- **Baseline Node smoke:** `npm run verify`, including script syntax, 271 existing test cases (corrected G5B MP3 hash/ID, puzzle/three route completions, save/load, sound/mute/pause/skip, fallback, UI CSS bounds), build asset and privacy allowlist.
- **Real Chromium regression:** `.github/workflows/game-sp41g5h-browser.yml` running `scripts/g5h-browser-regression.mjs`, with actual DOM interaction and screenshots downloaded as the `game-sp41g5h-browser-evidence` workflow artifact.
  - Ending C 1366×768: untouched 0/6, wrong decoy + incorrect slot, correct tap and keyboard activation, 3/6, Home/Continue save/resume, 6/6, POWER ON, 15-line ending, completed G5F/G5G shared hub.
  - Screenshots at 1366×768, 1440×900, 1600×900, 768×1024 and 390×844. Check desktop tray/workshop internal scrollboxes, horizontal overflow, caption and albums separation, all six links and 272px G5G.1 toolbar.
  - Route C checkpoint reset verifies no fabricated previously completed assembly.
  - A Summit admissions → fourteen-line ending → hub and B permit/stamp → ending → hub, ensuring C artwork is isolated.
- **What automation cannot establish:** MP3 expressive correctness by ear, actual human-readability/pacing and 15–25-minute completion time, physical touch-device behaviour, screenshot subjective composition beyond measured bounds, real-world accessibility audit. These must remain explicit human acceptance checks and are not declared passed from mock/browser execution.

## Ten issue trace (G5A–G5G)

| Owner concern | Covered in | Final regression gate |
|---|---|---|
| Spa briefing wording and menu checkpoint | G5A | Correct chapter/intro copy and safe route re-entry |
| Duplicate/repeated Paul and Stephen audio | G5B | Exact four approved clips + manual listening for no duplicate playback |
| Laptop reassembly internal scrollbar | G5C | Real browser bounded scroll test at 1366×768 |
| POWER ON STEPHEN vertical position | G5D | CSS/tap gating at 0,3,6 parts, real screenshot |
| Carved cut-outs don't match approved arms | G5E | No carved image, six dashed zones, expanded backing and human screenshot |
| Ending C final artwork | G5F | Exact owner-approved SHA-256 + 1672×941 dimensions |
| Shared final hub overlays and links | G5G, G5G.1 | Image/caption/album/menu layout at five sizes, six link targets |
| Missing/incorrect voiced end-beats | G5B/G5G | Automated ID/duration/source and manual speech spot-check |
| Power/replay/resume after puzzle | G5C–G5G | Browser route C full puzzle, restart and checkpoint |
| A/B regression including revised B finale | G4G/G5H | Automated three-route isolation and representative full route check; human B playthrough still required |

## Deferred, not regressions

- G4C illustrated handoff transitions are optional, not approved for creation.
- G4H (B human playthrough / timing / audio) remains relevant even if A/B browser automation passes.
- G4.1J exact silhouette shape registration remains deferred by owner; the dashed board is the approved solution.

## Sign-off

**Do not mark complete or merge G5H test work until** exact-head smoke, browser CI, deployment and owner review of evidence/remaining manual gates are recorded. A green CI run is not a substitute for manual listening and pacing verification.
