# GAME-SP4.0F — Approved static printer and bear cutaway

## Owner approval and scope (17 October 2026)

The owner approved a 1672 × 941 illustrated office multifunction printer with freshly printed cartoon images of a fictionalised Chinese leader and a honey-loving bear. This replaces only the old HTML/CSS mock printer cutaway at screenplay beat `office.v04`. The current 2.4-second duration, existing dialogue, printer sound/flow, and all other cutaways are retained. This is a **single static still**.

**Explicitly deferred:** separating printer foreground/back layers, isolating individual paper sprites, sliding pages out of the paper slot, animation timings and any associated new tests. Future follow-up should use the approved still as the visual foundation without changing this asset or pretending it is already animated.

## Source asset and build

- Original approved 1672 × 941 PNG is in the dedicated Stephen Martin Google Drive staging folder as `office-printer-bear-cutaway-v01.png`.
- Google Drive file ID: `1admO_cJkvHgQMDbWmodSTcl-kYQXDVPS`.
- Materialisation manifest: `generated-assets/manifests/game-sp40f-office-printer-bear-v01.json`.
- Output: `public/assets/generated/game/office-printer-bear-cutaway-v01.webp`, created with GitHub's existing OIDC/Drive asset pipeline.
- Runtime: `src/game.js` cutaway key `printer`; `src/styles.css` scopes full-frame responsive treatment only to `data-cutaway="printer"`; build copies approved WebP.

## Gates

Confirm automated tests, packaging, deployment and scene-level visual presentation. Keep development PR draft and unmerged until the owner authorises merging. Do not change `main`, the approved laptop image or the unmodified phone cutaway in this change.
