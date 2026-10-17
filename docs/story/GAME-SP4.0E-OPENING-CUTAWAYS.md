# GAME-SP4.0E — Approved opening laptop cutaway

## Authorised scope (17 October 2026)

The owner approved a bespoke **David's risk assessment** still for the opening. This belongs to screenplay beat `office.v02`, when David turns his laptop towards Stephen and Paul *before Stephen leaves for China*. It replaces only the previous CSS-drawn mock laptop. Following owner review, the same `office.v02` cutaway now plays **immediately after `office.005`** (David: “I've conducted a preliminary risk assessment.”), then Stephen responds with `office.006` (“You've done what?”). Previously the laptop appeared after Paul's `office.011` meal-deal exchange. The pre-holiday context, 2.6-second silent cutaway, dialogue, stable beat IDs, historical save mapping and cast remain unchanged.

The art is 1672 × 941 pixels and depicts a large, readable laptop with David's exaggerated pre-trip risk model (97% likely to be fine), surrounded by ordinary office jokes. The background is consistent with the approved modern, sunlit open-plan office; there is no later-trip, kidnapping or rescue event in the surrounding environment.

## Source and provenance

- Original approved PNG: `office-david-risk-cutaway-v01.png`, stored only in the dedicated project Google Drive staging folder.
- Drive file ID: `1FdH4l5-svusCl87yLllWD1recInxkLwf`.
- Materialisation manifest: `generated-assets/manifests/game-sp40e-office-david-risk-v01.json`.
- Optimised production asset: `public/assets/generated/game/office-david-risk-cutaway-v01.webp` (1672 × 941; materialised by the existing GitHub OIDC/Drive workflow).
- Runtime rendering: full-stage image scoped to `data-cutaway="risk"` and packaged by `scripts/build.mjs`, preserving the original desktop/mobile aspect ratio.

## Gates and non-goals

This task deliberately does **not** replace the printer/printed bear or group-chat phone inserts, alter their timing, change any dialogue/recordings or touch the holiday chapters. Automated checks should validate the manifest, WebP, packaging, runtime wiring, scene order and all existing routes. Owner should review the exact preview visually before authorising a merge. Keep the PR draft; do not merge into `main` without explicit approval.
