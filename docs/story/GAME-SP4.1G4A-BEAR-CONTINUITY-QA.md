# GAME-SP4.1G4A — Canonical bear photograph continuity

## Canonical image

The existing owner-approved `public/assets/generated/game/office-printer-bear-cutaway-v01.webp` is the single source for the 1672×941 Chapter 1 printer still and Chapter 2 banquet upload. Its printed paper shows a smiling official with Paul's honey-loving cartoon bear. The source PNG and asset provenance remain in `generated-assets/manifests/game-sp40f-office-printer-bear-v01.json`.

The banquet once showed an unrelated 🐻 emoji. G4A replaces it with an overflow-hidden image viewport cropping the central printed paper **from the very same WebP file**, not a new or AI-redrawn image.

## Manual review

1. In Chapter 1, verify the existing office printer cutaway and the official/bear pairing are unchanged.
2. In Chapter 2, decline the Great Wall invitation, accept the Forbidden City banquet, then play all five accepted replies. Confirm the same official/bear image appears inside the `FIRST PHOTO: UPLOADED` panel.
3. Compare the picture against Chapter 1 and check legibility, aspect ratio, framing and no cut-off faces at 1366×768 laptop, desktop 1440×900, tablet 768×1024 and phone 390×844.
4. Leave to Menu and Resume: the photo is still shown on the accepted route. Replay or decline: no accepted photo displayed.
5. Continue into Ending B. Verify that the existing permit/bear-classification puzzle artwork, dialogue and voice playback remain unchanged.

## Merge gate

Keep the PR draft until all automated tests pass, Cloudflare preview deploys and the owner approves the actual in-game photo crop. G4B covers the separate dying-phone and England transition; do not expand G4A scope.
