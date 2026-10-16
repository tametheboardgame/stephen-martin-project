## Foreground depth revision — kneeling rear, standing forward (16 October 2026)

Owner reviewed the symmetric four-attendant scene and requested a depth swap without changing sprites: move the kneeling **ewer and towel** back into the previous standing positions **at their existing small size**, and bring the standing **fan and tray** outward, closer to the audience and proportionally larger.

Current desktop target: kneeling ewer left 23%, towel right 23%, both bottom 42%, height 17%; standing fan left 9%, tray right 9%, both bottom 24%, height 23%. Tablet/mobile positions are independently scaled. Per-sprite flips on right-side tray and towel remain intact, so all four face inward. Stephen and the two protagonists, dialogue, UI and scene backdrop are unchanged.

Stage CI and image packaging can validate the CSS positions and perspective inequalities, but owner in-engine visual review is still required for actual foot-to-floor alignment and optical scale. No PR merges are authorised.

## Left/right standing and kneeling balance (16 October 2026)

The owner's next screenshot showed both standing attendants on the left and both kneeling attendants on the right, despite corrected grounding. The approved independent PNGs/WebPs are unchanged. CSS places **fan standing + ewer kneeling** on the left, and **tray standing + towel kneeling** on the right. The right-hand tray and towel are horizontally mirrored as individual sprites to face Stephen; the background, UI, main cast and left-hand sprites are not flipped.

The upper standing attendants are anchored at the stair-flanking columns, with kneeling attendants farther out in the side aisles. Desktop/tablet/mobile sizing and foot anchors are covered by responsive regressions. The mirrored variant is a presentation transform, not a new generated file. Owner visual approval and an explicit merge instruction are still required.

## Attendant perspective correction after first live screenshot (15 October 2026)

The owner reviewed the first live composition and rejected all four attendant positions as physically implausible, particularly the **floating fan/ewer near the back columns** and the detached tray/towel at the side edges. The source PNGs and alpha WebPs remain approved; the failure is **CSS perspective/foot grounding only**.

A new staging-only CSS pass lowers the fan and ewer bearers to the architecture at the sides of the stairs (desktop left/right 23%, bottom 42%, height 17%), and reduces/lowers the tray and towel bearers into the side aisles (left 6%, bottom 20%, height 24%; right 5%, bottom 18%, height 24%). Tablet and phone cases are scaled and anchored independently. Stephen, David and Paul keep their owner-approved locations and all spoken dialogue/UI remain unchanged.

The automated position regression ensures no accidental reversion, but **physical contact with the floor and lack of overlap require visual inspection of the revised Cloudflare build** before this art pass can be locked. No merge of this draft or its parent without the owner's explicit command.

## Four approved attendants integrated as independent stage layers (15 October 2026)

The owner approved **four individual, transparent full-body ceremonial attendant sprites**. All four original PNGs are stored in the project's dedicated Drive staging folder and have been materialised via the existing OIDC pipeline into four independent transparent WebPs. No flattened illustration, background replacement or baked UI is used.

| Attendant | Drive file ID | Versioned manifest / generated WebP |
|---|---|---|
| Left fan bearer | `1O9kfCOVn0OYDdbfEPS42ba4L4cpF0vpe` | `game-sp40c-attendant-fan-v01.json` / `summit-throne-attendant-fan-v01.webp` |
| Left serving-tray bearer | `1iA2GXZFCCjsuHf0uRdA2fLbveZenAT54` | `game-sp40c-attendant-tray-v01.json` / `summit-throne-attendant-tray-v01.webp` |
| Right ceremonial-ewer bearer | `1wlAEh0S1V8gMoVYsoZId5edAPn_ZVLM9` | `game-sp40c-attendant-ewer-v01.json` / `summit-throne-attendant-ewer-v01.webp` |
| Right towel bearer | `1IEruLeKIv-1HjO4eWUvADI4CzjM1fLw3` | `game-sp40c-attendant-towel-v01.json` / `summit-throne-attendant-towel-v01.webp` |

All manifests are in `generated-assets/manifests/`; all generated files are in `public/assets/generated/characters/`. The two upper attendants flank the raised dais, while the tray and towel attendants frame the lower side areas. Existing David and Paul remain at the foot of the stairs; Stephen's approved placement stays unchanged. All attendants are silent and decorative (`aria-hidden`, `alt=""`, no pointer input), behind the principal actors and subtitle box.

Responsive CSS individually positions all four attendants at desktop, tablet and narrow widths. The build rejects a WebP lacking alpha; regression tests guard each manifest, image path, layer count and breakpoint placement. These tests **do not confirm artistic placement or lack of visual overlap**, which remains an owner browser-review gate.

Draft PR #34 remains stacked on draft PR #33, with **no merges authorised**. Subsequent visual feedback should be handled with CSS positioning changes rather than composite or image regeneration unless the owner requests otherwise.

# GAME-SP4.0C — Approved Summit throne-room background and sprite candidates

**Date:** 15 October 2026
**Base:** `agent/game-sp40a-summit-visual-proof` / draft PR #33.
**Branch:** `agent/game-sp40c-summit-throne-art`
**Status:** Corrected Stephen v02 approved and fitted; new David-left and Paul-right sprites integrated on the development branch for owner in-engine visual review.

## Background approval and provenance

The owner approved the stand-alone richly detailed Summit throne-room illustration: gold and dark-blue mountain-club interior, timber rafters, chandeliers, alpine panorama through the right-side windows, symmetrical raised blue-and-gold empty throne, and open foreground space for scene characters. The backdrop is the canonical environment asset for Ending A, **not** a replacement for the separately approved Summit exterior.

- Original file: `summit-throne-room-background-v01.png`.
- Google Drive source ID: `1vlDRjDcHEux93sxTwG0EJa9s5cqez8LB`, in the project staging folder.
- Versioned provenance: `generated-assets/manifests/game-sp40c-summit-throne-room-v01.json`.
- Derived WebP: `public/assets/generated/locations/summit-throne-room-v01.webp`, 431,662 bytes, materialised by the established Google Drive/OIDC pipeline.
- No dialogue, user interface, character image or painted caption is embedded in the approved room background. It is not yet applied to the Ending A scene until the foreground cast has been reviewed.

## Character cutouts — first candidate set (not locked)

Generated as a joint original character-art pass and extracted as **three independent transparent PNG cutouts** for owner review:

1. **Stephen — pleased sovereign:** Seated comfortably on a florid throne, grinning behind dark glasses, blue/gold chairman-themed regalia and crown, holding a celebratory glass. Check original Stephen likeness, oversized authority gag and whether the included chair should be eliminated to avoid duplicating the *empty throne already painted into the approved background*. The sash text should remain separate editable UI, or be corrected if a dedicated sash asset is later required.
2. **David — exasperated:** Bald with ginger beard, green top under dark hoodie, gesturing in disbelief. Stands independently and should be positioned below/right of the throne and away from the centre dialogue area.
3. **Paul — bewildered:** Bald, glasses, white polo, cautious half-raised hands. Stands independently with a different position/scale from David.

All three are in the project's existing comic-poster style, generated without any new dialogue, sound or gameplay modifications. The image-generation pass produced a sprite sheet; the three above have been cropped to individual transparent PNGs. These remain **candidate assets in review**, not committed as approved materialised game assets and not yet staged for browser use.

## Next gate

- Review each cutout for canonical likeness and expressive pose. Pay particular attention to Stephen: the candidate includes his own chair and that may not align with the approved empty throne; prefer a transparent **Stephen-only seated sprite** if scene composition demands precise chair alignment.
- Once approved, place each candidate source separately in the project Drive staging folder and create individual `generated-assets/manifests/` entries.
- Integrate the original approved throne-room background plus individually approved foreground sprites into `#summitEndingScene`; move Ending A's spoken lines into a bottom dialogue box and apply current-speaker glow, preserving automatic playback and manual choices.
- Make no changes to the already-approved Summit entrance, other two routes, or save-state contracts. Do not merge the stack into `main` without explicit owner approval.


## Stephen-only in-engine layout proof (15 October 2026)

**Owner approved the corrected Stephen likeness** using the original blond, side-parted Steve reference from the project and explicitly requested a real playable throne-room scene with **Stephen alone** before any David/Paul sprite integrations.

- Approved source: `summit-throne-stephen-seated-chairman-v02.png`, Google Drive `11yVSHsny_Ff4I7KCSA9GCmf0o2gS6FNV`; he wears a blue top, cross-body SUPREME CHAIRMAN sash, fur-trimmed ceremonial cape, dark glasses and holds a gold goblet, **with no chair**.
- Approved background: `summit-throne-room-background-v01.png` from Drive `1vlDRjDcHEux93sxTwG0EJa9s5cqez8LB`.
- The already-validated OIDC asset pipeline materialised these to `public/assets/generated/characters/summit-stephen-seated-chairman-v02.webp` (alpha-preserving) and `public/assets/generated/locations/summit-throne-room-v01.webp`. The two files remain separate layers.
- The Ending A `#summitEndingScene` now shows the room and one seated Stephen centred over the background's existing throne. The 14 approved ending dialogue beats and end card use a readable **bottom strip**; autoplay/Next, save/resume, replay and menu are unchanged. Current-speaker glow is enabled only on Stephen's lines; David, Paul and Narrator lines still play as editable dialogue **without** their unapproved foreground sprites.
- The title badge is in the top-left, away from the existing top-right playback bar. CSS provides distinct desktop/tablet/mobile placement. No redundant floating sash or "placeholder art" copy remains on top of the scene.
- Import/build scripts package the background and one alpha-verified transparent Stephen cutout; regression tests guard provenance, route isolation, subtitle pacing and Ending A completion.

### Owner visual checkpoint

Inspect the **actual playable browser preview**: does Stephen's size, centre position and seated posture align with the painted throne and steps? Check at desktop and tablet widths, subtitle contrast and whether all ending lines progress naturally. Treat this as a **placement proof**, not final sign-off for throne-room character proportions. Adjust CSS first if he is too large or too far forward. Do not generate/add David or Paul until this composition is approved.

**No merge** of draft PR #34 or stacked PR #33 without the user's separate explicit approval.


## David and Paul added for three-character staging (15 October 2026)

Following the user's explicit approval of the regenerated throne-room David and Paul cutouts, both have been added **as separate transparent foreground WebPs**, without flattening the room artwork.

- **David left:** `summit-throne-david-confrontational-v01.png` from the project Drive staging folder (ID `1rvVoWU8cXy0Ytc1-40d-KklDBlg8Snhs`); manifest `generated-assets/manifests/game-sp40c-throne-david-v01.json`; derived `public/assets/generated/characters/summit-throne-david-confrontational-v01.webp`.
- **Paul right:** `summit-throne-paul-astonished-v01.png` (Drive ID `1r04ZU2PdwvGCRuQFaTF-WbsWRH3aTUw8`); manifest `generated-assets/manifests/game-sp40c-throne-paul-v01.json`; derived `public/assets/generated/characters/summit-throne-paul-astonished-v01.webp`.
- Existing Stephen v02 remains **17% stage height on desktop**, 16% tablet and 14% mobile, centred on the painted throne exactly as the owner approved.
- Desktop staging: David left at 11%, 43% stage height; Paul right at 11%, 40% height; both bottom 19%, partially behind the readable dialogue strip. Tablet/mobile positions scale inward appropriately.
- The existing `data-speaker` field highlights Stephen, David or Paul on their own dialogue lines. The ending, autoplay and other routes are unchanged.
- The player must inspect the **actual in-engine result** for scale, foot grounding, composition and captions. Automated checks verify source provenance, alpha, packaging, routing and speaker cues; they cannot replace visual approval.

This supersedes the earlier *Stephen-only* staging gate while preserving its historical approval record. PR #34 remains draft, stacked on draft PR #33. **No merge without explicit authorisation.**


## Planned attendants and staging correction (15 October 2026)

Owner requested a visually lavish entourage of **adult East Asian ceremonial attendants**, styled as muscular shirtless adult men, and asked to bring David/Paul inward towards the **foot of the steps** at a plausible smaller scale. This is art direction for a fictional social club, not a real-world ethnic/cultural depiction.

- The **in-engine David/Paul staging change is committed** in `src/styles.css` and protected by a regression: desktop David left 30% / height 28%, Paul right 29% / height 27%, both bottom 33%; corresponding tablet and mobile adjustments. Stephen's approved 17%/16%/14% dimensions and his original anchor are untouched.
- A **concept composition** was generated with multiple service attendants, but it is a **flattened illustrated scene with background, David, Paul, Stephen and UI already baked in**, not separable transparent sprite art. **Do not upload or use it to replace** the approved throne room or duplicate the characters/UI.
- **Attendant asset requirement pending:** Generate **four independent full-body transparent PNGs**, all adult East Asian men with athletic muscular physiques, respectful theatrical staff poses, varied blue-and-gold trousers/sashes and one of (feather fan, gold serving tray, ceremonial jug, folded white towel). No UI, throne, backdrop, dialogue, text or real-world insignia. Stage each separately through Google Drive and a versioned asset manifest; add two at each side of the room. Optionally reuse 1–2 at smaller scale nearer the dais, only after seeing the first four in-game.
- Keep their speech silent and sprites background-only. Avoid turning the room into a crowded opaque composite: dialogue and stairs must remain legible. New attendant artwork should receive **owner image approval** before being integrated.
- This branch remains an **unmerged draft**; no previous dialogue, audio or navigation change is intended.

