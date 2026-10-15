# GAME-SP4.0A — Summit location artwork: first visual proof

**Prepared:** 15 October 2026
**Base:** SP3.4 merged main `8a6ed2555e27eca078ecb17e47209cdb4882ca15`
**Branch:** `agent/game-sp40a-summit-visual-proof`
**State:** PROPOSED, for owner composition approval. **No image is yet generated, approved, uploaded or committed.**

## Why this is the first art package

The game's approved visual language already exists in `docs/ART-DIRECTION.md`, and Stephen, David, Paul, office and hotel assets have established baselines. Avoid reopening the whole style. Start with **one empty environment proof** for the Summit, then approve a reusable composition/lighting/scale before generating characters, props or other route scenes.

The Summit currently uses a CSS gradient behind the `#summitAdmissions` controls and `#summitEndingScene`; the existing central interactive panels and the global top-right playback toolbar must remain legible. Do not paint any gameplay labels into environment art.

## Asset 1: THE SUMMIT — exterior entrance background (proposed)

- **Purpose:** Establishing setting for the route-A briefing and admissions-test approach, fictional extravagant adult mountain social club rather than an actual religious institution.
- **Format:** Landscape **16:9 source** suitable for the existing stage's approximately `1672:941` framing; create at high enough resolution for responsive optimisation and a later WebP under `public/assets/generated/locations/`. Design to crop safely to 4:3 and narrow/mobile.
- **Art style:** Original project's bold worn comic-poster / graphic-novel language: illustrated thick outlines, lightly weathered print texture, controlled halftone shadows, saturated warm highlights and amusing architectural exaggeration. Preserve compatibility with approved reference backgrounds; do not replace their style with photorealism, anime or an unrelated 3-D look.
- **Composition:** Eye-height view along a stone path to the fictional club's hilariously grand gated mountain lodge. Clear ground plane across lower foreground to allow separately staged David and Paul silhouettes; plausible smaller guard position on the right; enough quiet middle region under the real, centred admissions cards. Keep visual anchors away from the permanent top-right playback toolbar.
- **Lighting and palette:** Late-afternoon golden light on warm stone and timber, cooler blue/teal mountain ridges behind. Playful gold accents imply misplaced grandeur, but avoid visual clutter.
- **Humour:** The club is absurdly over-serious about mundane amenities (a grandiose gate, extravagant flags/ceremonial decoration), but keep all jokes in editable in-game UI and optional separately approved props. The art should work without baked text.
- **Exclude from this specific background:** Stephen, David, Paul, gatekeeper, silhouettes of identifiable people, logos, national insignia, photographic scenery, readable signs, speech/dialogue, captions, UI, buttons, puzzle choice icons or badges. These are separate layers/assets requiring approval.
- **Asset separability:** This scene is **background-only**, never a composite with characters and UI. Future character sprites and entrance props can occupy CSS-defined depth layers.

## First acceptance gate

Owner reviews the *single proposed entrance background* for:
1. Stylistic match to existing approved game art;
2. Perspective and grounding of future David/Paul/gatekeeper sprites;
3. Legibility of the central game panel and top-right unified toolbar at desktop and tablet sizes;
4. Safe cropping in landscape and narrow views;
5. Whether the setting looks funny, fictional and suitably grand.

Only after approval: stage the approved original under the dedicated Stephen Martin Google Drive folder; add one versioned provenance manifest in `generated-assets/manifests/`; let the established GitHub OIDC pipeline materialise the optimised WebP **on this branch**, then preview the actual game scene. No direct source PNG commits and no `main` merge without explicit authorisation.

## The next assets, deliberately not part of the first approval

- Summit **throne room** backdrop with coherent perspective and lighting.
- Gatekeeper standalone transparent character, then suitable David/Paul poses.
- Stephen happily enthroned in normal holiday clothes with a separate sash treatment, then the humility stinger.
- Simple distinct object illustrations for the charger, compliment and return-flight answer cards.
- The bureaucracy and spa route assets follow only after the first visual direction is approved.

## Technical and privacy invariants

Keep the 15–25-minute first-play target, existing three-route gameplay, V3 save semantics, 55 approved office MP3s, CSS positioning and interactive text/hit targets intact. No real employer/work identifiers, third-party identities or real governmental flags. See `docs/CREATIVE-BIBLE.md`, `docs/ART-DIRECTION.md`, `docs/GENERATED-ASSET-PIPELINE.md` and `docs/story/GAME-SP4.0-ARTWORK-PRESENTATION-PLAN.md`.

**Next decision:** Owner approves or adjusts the entrance composition. Then produce precisely one visual candidate and iterate it before any throne-room/character set.
