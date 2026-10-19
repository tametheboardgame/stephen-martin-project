# GAME-SP4.1G0A — Paul pleased arm clip correction

**Baseline:** merged roadmap PR #61, `394aeb79c07ec4b051ea515dd5c1299a39832a21`. **Scope:** Chapter 1 Paul *pleased/satisfied* seated pose only.

## Cause and bounded first pass

The owner noticed a small flat/clipped edge on one side of Paul's arm when his happy/satisfied expression displays. The project's locked original `paul-office-seated-pleased-locked-v01(1).png` was inspected: **1086×1448 transparent pixels; nonzero alpha touches both lateral edges and the bottom**. That shows that the art itself is tightly cropped, not merely a clipped CSS stage. A CSS-only change cannot reconstruct any lost source pixels.

The current stage already has `overflow:visible` on the portrait wrapper and Paul is individually registered at `right:3.5%` as an actor with `width:30%`. The first-pass conservative correction is a **0.965 optical scale, origin centre-bottom**, only when `#castPaul[data-seated-sprite="pleased"]`. That gives the tightly bounded pose a little extra stage margin without shifting his feet or moving/altering the neutral and confused poses. The approved WebP and story expressions remain byte-for-byte unchanged.

**Owner visual gate:** compare happy Paul with neutral/confused at the same dialogue checkpoint; check his side arm against the office foreground desk and the stage edge. If the **hard crop inside the source** is still visible despite the inset, an owner-approved re-canvas of *only this one expression* is required (regenerate the missing fabric/arm edge while retaining face, polo, glasses and canonical proportions). Do not simply scale the entire cast or create a different-looking Paul.

## Verification

- Exact-head `npm run verify` and Cloudflare preview must succeed.
- Test switching neutral → pleased → neutral without expression ID/voice changes.
- Inspect at desktop 1440×900, 1366×768, tablet and mobile; the existing top toolbar, white dialogue box, desk mask and speaker glow must be unaffected.
- Keep draft PR until screenshot acceptance. Only then merge, and proceed to G0B song interludes.
