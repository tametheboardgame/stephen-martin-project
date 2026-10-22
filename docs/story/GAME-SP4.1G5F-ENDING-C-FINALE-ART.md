# GAME-SP4.1G5F — Ending C bespoke finale illustration

**State (22 October 2026):** **Owner-approved final composition locked, committed and staged.** Initial failed concepts were discarded; the user's final approved four-character image was committed *exactly* at 1672×941. This branch also prepares G5G shared ending-summary integration and compact route-specific overlays; visual QA/merge remains gated.

**Approved original:** `public/assets/generated/locations/ending-c-finale-standee-celebration-v01.png`
**Drive staging:** `GAME-SP4.1G5F-ending-c-finale-approved-v01.png`, ID `1K15wi3ZY6qISmj0xJQ4Qx5LwrOrbzILW`.
**SHA-256:** `6c8bf0a4bd46d43c8997fa5ea1a2fe5c2edc453e7c099199b3946f42bcb00f18`.
**Manifest:** `generated-assets/manifests/game-sp41g5f-ending-c-finale-standee-celebration-v01.json`.
**Baseline:** G5E merge `0f526a81513c5ea7687773904a3c20af5954c5e7`.

## Single-scene payoff

In the fictional Total Renewal Spa lounge / exit, **David and Paul are delightedly, uncomfortably affectionate with the life-size cardboard Stephen**, hugging and presenting it as their great rescue triumph. **Real, fully intact Stephen stands behind them**, crossing his arms with a clearly irritated look. The viewer instantly understands the pair have been celebrating a fake Stephen while ignoring the real man.

- One cinematic cohesive **1672 × 941 (16:9)** frame, lightly textured graphic-novel/comic-poster style with coherent perspective and lighting.
- Reuse the setting language of `public/assets/generated/locations/ending-c-spa-lounge-background-v01.webp`: jade/teal woodwork, gold details, warm spa lighting, hanging lanterns, plants and water feature.
- **Never** introduce another spa named "Summit Spa" or invented readable signage; use no embedded title, dialogue, logos, panel borders, album artwork or interface text.
- If a new angle is needed, retain the *same fictional spa*, not a generic luxury hotel. No identifiable real-world location.
- Leave useful low-contrast regions near **bottom left** for editable caption/summary and **bottom right** for music album links. Keep faces and the cardboard standee's comedic detail outside those overlay zones, particularly at laptop crop.
- Exactly **four identities** in the scene: David, Paul, real Stephen and one cardboard Stephen. No duplicate people. Characters' faces must each be recognisable from canon and not interchangeable.

## Non-negotiable identity / costumes

| Identity | Approved reference | Exact constraints |
| --- | --- | --- |
| **David (real)** | `public/assets/generated/characters/ending-c-david-spa-visitor-v01.webp`; `public/assets/generated/characters/david-baseline.webp` | **Bald**, strong build/tall, **short ginger beard**, blue eyes; navy/charcoal hoodie over olive green T-shirt, blue jeans, trainers. **Never a white spa robe**, never thick dark hair. Confident/overjoyed while hugging standee. |
| **Paul (real)** | `public/assets/generated/characters/ending-c-paul-spa-visitor-v01.webp`; `public/assets/generated/characters/paul-baseline.webp` | Shorter/heavier, **bald crown** with side stubble, dark rectangular **glasses**, **clean-shaven**, white **polo shirt with dark piping** (not robe), jeans/trainers. Out-of-character enthusiastic cuddle; no full head of styled dark hair, no beard. |
| **Stephen (real)** | `public/assets/generated/characters/ending-c-stephen-spa-robe-v01.webp`; `public/assets/generated/characters/stephen-martin-baseline.webp` | Light-brown/blond side-parted hair, short stubble, recognisable expressive brows; **white spa robe with teal trim**, sandals, optional sunglasses at crown. Behind trio, annoyed, arms folded. **Alive and unharmed**. |
| **Cardboard Stephen** | `public/assets/generated/characters/ending-c-stephen-cardboard-rebuilt-v01.webp` | A clearly **flat die-cut taped cardboard cut-out**, visibly **brown cardboard edges, tape at joints**, same recognisable smug Stephen face, white spa robe, sandals and cucumber slice/bowl. This—not real Stephen—is hugged, posed rigidly, not mistaken for an extra real person. |

Aim for David to viewer-left of standee, Paul to viewer-right of standee, real Stephen at rear-right. All visible on one perspective plane, with readable faces/arms in upper two thirds. David and Paul should physically hug **the cardboard's sides** rather than hug one another.

## Rejection criteria and initial review

Three initial concept attempts established the gag but **failed canonical casting**: both David and Paul were shown wearing spa robes, David was incorrectly depicted with dark hair/no correct bald ginger-beard design, Paul had dark hair and/or facial hair, and one concept invented a "Summit Spa" sign. These are **not locked, not in GitHub and not approved**. Do not use them as art references for final likeness.

**Approval sequence:** generate faithful candidate using the listed visual reference assets; inspect all four characters and clothing against real source pixels; obtain owner visual approval; stage PNG original in Stephen Martin Drive asset folder; add provenance manifest, materialise optimised WebP on this branch; defer embedding in ending hub until G5G. Never merge this preparation branch on the assumption the image is approved.

## G5G integration handoff

Target common `#rescueEndingSummary[data-route="reassemble"]` background, not a separate ending screen. Preserve G3F music links / chapter jumping, A/B routes, spoken script. Make caption/music cards compact and preserve facial visibility in 1366 × 768 browser check.

## G5F/G5G implementation update — 22 October 2026

- Exact approved 1672×941 PNG committed and validated by hash and IHDR dimensions in `scripts/build.mjs`; no unapproved recrop, distortion or scene regeneration.
- `#rescueEndingSummary[data-route="reassemble"]` now uses the approved artwork. Lower-left compact narrative card and lower-right compact Berserk Llama Syndrome album-links card preserve character faces and avoid internal scrollbars at laptop sizes. Short-height and tablet breakpoints included.
- At phone widths (600px and below), the **entire** 16:9 artwork appears before the two cards in natural flow to avoid cropping David or real Stephen; controls remain after cards. This deliberately allows normal **page** scrolling rather than nested panel scrolling.
- Remove obsolete G5C placeholder about images being deferred. Preserve original Ending A/B layouts, route completion gates, all dialogue recordings, replay/chapter jump buttons and original music links.
- Exact-head GitHub smoke/build and Cloudflare branch-preview acceptance required before owner visual signoff and eventual merge. Verify 1366×768, short laptop, tablet, and phone; ensure all faces visible and panel buttons usable.
