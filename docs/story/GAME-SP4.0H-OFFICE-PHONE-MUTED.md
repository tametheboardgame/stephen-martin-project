# GAME-SP4.0H — Approved phone group-muting cutaway

## Visual approval and scope (17 October 2026)

The second approved 1672 × 940 phone illustration continues the same cartoon open-plan office composition, device, bear-with-honey avatar and messaging interface introduced by GAME-SP4.0G. The earlier blue system notice **“Paul added David and Stephen to the group”** remains, and the additional muted-bell notification reads **“Stephen Martin has muted the group”**. There are no individual chat messages.

Replace the old HTML/CSS notification at `office.v09` only, immediately after Stephen leaves the office (`office.v08`) and before David says “That's our first warning sign.” (`office.049`). Keep the existing 2000 ms cutaway duration, all spoken dialogue, story order and group-creation still at `office.v05` unchanged.

## Asset provenance and delivery

- Original PNG: `office-phone-group-muted-cutaway-v01.png` (1672 × 940), in the dedicated Google Drive staging folder.
- Drive file ID: `1k5O7pP4YqXaRiQdM_zObFu8uS0uoHPGU`.
- Materialisation manifest: `generated-assets/manifests/game-sp40h-office-phone-muted-v01.json`.
- Generated WebP: `public/assets/generated/game/office-phone-group-muted-cutaway-v01.webp`.
- Integration: `muted` key in `src/game.js`; scoped full-stage CSS in `src/styles.css`; explicit packaging in `scripts/build.mjs`; regression test for asset, narrative placement and timing.

The phone-creation cutaway and muted cutaway are grouped into **the same draft PR #38** to allow both owner-approved assets to be reviewed together without a dependent merge. No page or notification animation is implemented. Do not merge without explicit owner approval.
