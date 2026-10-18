# GAME-SP4.1D0 — Retire introductory expression proof controls

**Date:** 18 October 2026  
**Branch:** `agent/game-sp41d0-remove-expression-proof`  
**Draft PR:** [#53](https://github.com/tametheboardgame/stephen-martin-project/pull/53)  
**Baseline:** GAME-SP4.1C merged into `main` at `7f6415bd3d4f98dcfb1b2e919879f9872f080349`, following owner approval of Summit daylight and 141/141 CI smoke tests.  
**Scope:** remove developer-only manual character expression preview buttons on the opening screen. Automatic approved dialogue acting remains unchanged.

## What was removed

- Single HTML `.expression-proof-controls` group containing `stephenProofButton`, `davidProofButton` and `paulProofButton` (the “Stephen: Auto”, “David: Auto”, “Paul: Auto” switches).
- Three proof-mode override state variables and their proof-cycle button handlers in `src/game.js`.
- The manual portrait-selecting branch of `applySeatedExpression`. **The approved `beat.reactions` cues alone select portraits now.**
- CSS for `.d2-proof-button` and `.expression-proof-controls`, while keeping ordinary responsive dialogue transport wrapping.
- The UI's proof-only `data-staging` label renamed to a normal seated-expression label, with no change to body geometry, images or save data.

## Intentionally preserved

- All Stephen, David and Paul approved seated source WebPs, including David's optical registration scale values and Paul's blank/neutral fallback.
- `applySeatedExpression` invoked on each opening `renderOffice()` beat; Stephen, David and Paul visibly react automatically at scripted lines. The original pause, back, next, skip intro, sound and progress controls remain.
- Save V3, legacy checkpoint upgrades, song options, recorded voices, audio timing and scene-aware loading from SP4.1A.
- Chapter Three Back in England sprite scaling from SP4.1B, newly bright Summit from SP4.1C and all three ending branches.

## Regression and acceptance

- Replace the old button-cycle tests with automated expressions after Next/Back, David's script-selected expression progression, Paul's Confused→Blank→Pleased fallback, and absence of all three proof control IDs and event handlers.
- Check save → return to menu → Resume on an opening office beat reproduces the scripted portraits and continues automatic acting with Next.
- Run syntax/Node/game-build CI and inspect the Cloudflare branch preview; especially at desktop 1366×768 and tablet/phone widths. Buttons must be gone and their vacated space must not leave a gap or squeeze playback controls. Character expressions should continue changing as dialogue advances.
- Keep this PR **draft and unmerged** until owner visually confirms the opening. Next distinct package: GAME-SP4.1D1, unifying named speech bubbles including after choices; skip-to-choice/game/end controls remain later GAME-SP4.1D2.

## Current qualification

Initial implementation `aa4f1fd` exposed an invalid expectation in one new test that Stephen would hold the same portrait while moving to the next beat. The test was corrected to require his actual scripted reaction. At `93e2f58`, **142/142 automated checks** passed, 20/20 Ending C images packaged and Cloudflare Pages deployed. A new Resume regression was subsequently added, so the last CI/deployment results must be checked against the final head rather than inferred from prior commits.

**No new illustrations, dialogue, audio, route logic or interaction mechanics** are part of SP4.1D0.
