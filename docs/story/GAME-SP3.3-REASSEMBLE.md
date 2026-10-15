# GAME-SP3.3 — Reassemble Stephen Martin and Ending C

**Started:** 15 October 2026
**Branch:** `agent/game-sp33-reassemble-stephen` (stacked on draft GAME-SP3.2 PR #29)
**Status:** Gameplay implementation in draft; browser/pacing review and the later artwork phase are separate approval gates.

## Scope and canon

The last of three short, playable rescue routes. The **Total Renewal Spa** is fictional and the puzzle is a deliberately silly souvenir made from **cardboard and foam**, not human surgery, body horror or real medical procedures. Keep the project's 15–25-minute first-play budget, no timers, no fail state, and no extra world-building.

## Delivered implementation

- Six labelled foam cut-out pieces: head, torso, left arm, right arm, left leg and right leg.
- Seven amusing reject pieces in the tray: three spare kidneys, a Wi-Fi heart, toaster, plastic banana and mystery foam spleen.
- Every part is selectable with click, touch or keyboard, then placed by choosing the matching labelled target. Optional mouse drag-and-drop reaches the same validation; keyboard and touch players never need a drag gesture.
- One placement per named slot. Wrong targets or decoys return a tailored joke without consuming the selected piece. Shared mistake count provides Paul guidance and a highlighted correct target after two wrong attempts. Correct placements persist individually through `rescueProgress.placedParts` and cannot be duplicated.
- `POWER ON STEPHEN` is visible only when all six slots are complete. The explicit power action sets `assemblyPowered` and starts Ending C; completing six slots alone cannot automatically skip to the ending.
- All approved spa ending dialogue, extra-kidney exchange, cardboard Stephen's IT catchphrase, David's technical-triumph stinger, Ending C card and shared summary/replay/start/menu.
- Legacy save key V3 unchanged. `assemblySelectedPart`, `assemblyFeedback` and `assemblyPowered` store interaction checkpoints; a mismatched or unfinished save cannot begin an ending.

## Visual production handoff (later dedicated art phase)

- Workshop/spa exterior/background, wooden/cardboard building station and Stephen foam cut-out silhouette.
- Six stylised model pieces, three silly kidneys, Wi-Fi heart, toaster, banana and mystery spleen.
- Scene transitions: model LED flash / goofy success chime, spa curtain opens, unharmed Stephen emerging in a robe with cucumber slices, David's triumph pose, cardboard Stephen speaking.
- End-card/summary illustrations for all three routes should use one cohesive treatment.

These are requirements only, **not newly approved or generated assets**. The owner chose to complete all three functional routes before any new artwork. Current functional preview uses intentionally simple text, CSS and emoji markers; no real anatomy, new faces or external resources.

## Review and acceptance

Run smoke CI (including all existing Summit and detention tests), verify approved audio remains packaged, and confirm successful Cloudflare Pages preview at the exact branch SHA. Test 13 selectable pieces, six labelled slots, wrong reactions, two-error hints, highlight, touch select-and-place, optional mouse drag, keyboard focus, one-by-one save/Continue, explicit POWER ON gate, every Ending C line and summary. Retest replay and route isolation. Human review of laptop and touch layouts plus full-game integration SP3.4 remain gates. Do not merge the stacked PRs into production without explicit owner approval.
