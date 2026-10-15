# GAME-SP4.0C — Approved Summit throne-room background and sprite candidates

**Date:** 15 October 2026
**Base:** `agent/game-sp40a-summit-visual-proof` / draft PR #33.
**Branch:** `agent/game-sp40c-summit-throne-art`
**Status:** Throne-room background and corrected Stephen v02 approved; Stephen-only scene integrated for in-engine visual review. David and Paul remain unapproved for throne-room use.

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
