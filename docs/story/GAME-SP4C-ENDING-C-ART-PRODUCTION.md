# GAME-SP4C — Ending C illustrated spa, cardboard assembly and reveal

**Started:** 18 October 2026
**Branch:** `agent/game-sp4c-ending-c-art-foundation`
**Base:** merged Ending B production main at `584b4c7055777cd54331909d2b6a50a75a25c7ef`
**Status:** Artwork foundation and staged production brief. No new Ending C illustrations are approved or committed yet.
**Owner direction:** Accept Ending B for now, merge it, and move on to visually improving Ending C.

## Existing playable baseline

- The third route already functions end to end: `src/reassemble-data.js`, `src/game.js`, `index.html`, and `src/styles.css`. Existing save, hints, selected piece, wrong-piece responses, mouse drag / touch / keyboard, explicit POWER ON and complete scripted ending must remain intact.
- **Six required parts:** head, torso, left-arm, right-arm, left-leg, right-leg. **Seven decoys:** kidney-1/2/3, wifi-heart, toaster, banana and spleen.
- All puzzle objects are unquestionably foam/cardboard/souvenir pieces. Never visually imply surgery or real body parts.
- Current `#reassembleWorkshop` is an oversized beige provisional form with emoji/text labels; `#reassembleEndingScene` is a beige dialogue panel and art placeholder. The route introduction also lacks a distinct approved spa setting.
- Ending B's improved laptop layout is the ergonomic bar: options and silhouette must be visible without repetitive internal scrolling on typical laptop widths. Keep small-screen fallbacks usable without reducing hit targets to tiny controls.

## Visual identity: Total Renewal Spa

A cheerful, suspiciously luxurious fictional wellness resort crossed with a baffling souvenir-promotion business. Pastel jade, warm cream, golden brass, peach, lacquered wood and soft diffuse lighting; richly painted architectural perspective and crisp comic silhouettes. The joke comes from normal spa serenity versus absurd flat-pack human-shaped marketing merchandise. Preserve the game's established stylised, lightly textured illustration aesthetic, without a stock photorealistic spa or album-cover collage. No real people, identifiable brands/agencies, graphic organs, wall dialogue or UI baked into an environment.

**Primary production rule:** backgrounds, actors, puzzle-board, pieces and effects are independently layered. User-readable labels and selectable targets remain actual HTML. Use approved Stephen, David and Paul references and existing standing sprites where suitable; any newly posed actor requires individual owner approval.

## Bounded production packages

### GAME-SP4C.1 — Illustrated environment (first owner visual gate)

- `BG_EndingC_SpaLounge_v01`: 16:9 EMPTY spa lobby/treatment lounge for the route conversation and finale, with an elegant curtain or doorway from which unharmed Stephen can emerge. No characters or floor mannequins painted into the background. Reserve central/front standing floor plane for separate sprites, upper portions for context, and bottom 25–30% for the existing cinematic dialogue.
- `BG_EndingC_DisplayWorkshop_v01`: adjacent fake promotional assembly station, shelves of clearly cardboard/foam souvenir boxes and ludicrous spa merchandising. No character or interactive object baked into the environment. The puzzle overlay must not completely obscure its art.
- Begin with the **spa lounge background** as the first generation candidate. Compare with the approved Ending A/B 16:9 scene depth and lighting. Human preview and approval *before* creating a Drive manifest or integrating an image.

### GAME-SP4C.2 — Coherent cardboard model and assembly board

- `PROP_EndingC_CardboardStephenBase_v01`: a clearly flat, obviously fictional human-shaped *cardboard standee* outline, shown front-on with six visibly labelled mounting regions. A central registration coordinate system binds its six slot elements.
- Six standalone transparent pieces, `head`, `torso`, `left-arm`, `right-arm`, `left-leg`, `right-leg`. Their shapes must match the board's slots and appear attached at the correct coordinates after successful placement. Use an approved Stephen stylisation on the cardboard face without altering his recognisable appearance. Build all pieces from a coherent art bible rather than six unrelated generated crops.
- Piece art is visual only; existing HTML buttons retain labels, focus, selection, placement, drag/drop and accessibility semantics.

### GAME-SP4C.3 — Harmless decoy props and laptop-safe puzzle stage

- Seven independently selectable cardboard/foam novelties: three identical spare-kidney joke items, a stylised Wi-Fi heart, cartoon toaster, toy banana and foam mystery spleen. Use a single cohesive illustrative style, no gore and no realistic dismemberment.
- Real puzzle stage: separate interactive tray on the left and assemble board on the right, visible selection highlights and placed piece overlay, legible feedback and POWER ON. A typical laptop should not require repeated up/down scrolling to see tray and target board. Adapt for touch/mobile with a stacked layout and accessible controls, preserving existing IDs and saved state.
- Use CSS placement, not flattened interactive screenshots.

### GAME-SP4C.4 — Spa reveal and final comic tableau

- Separate actor sprites: unharmed Stephen in a spa robe, holding cucumber slices (approved canonical face); David trying to claim the success; Paul perplexed; optional speaking cardboard Stephen with safe LED flourish.
- Scene shows fully intact Stephen emerging from an ordinary spa treatment. Model LEDs blink, cardboard Stephen says the approved IT power-cycle line, and David celebrates his entirely unnecessary 'rescue'. All dialogue remains existing live text with bottom captions and speaker focus.
- Consider gentle CSS-only LED / glow and a short chime if an approved sound source exists; do not add a new performance-heavy animation subsystem.

### GAME-SP4C.5 — Integration and qualification

- Materialise **individually approved** original PNGs from the established Google Drive staging folder through versioned JSON manifests to separate WebPs on this agent branch; never commit source masters directly.
- Add/extend lean checks for 13 item IDs, six target slots, correct and wrong reactions, two-error hints, input equivalence, save/restore, explicit POWER ON, ending dialogue, route isolation, transparent actor/piece assets and build packaging.
- Verify Cloudflare preview for laptop and tablet at the exact head SHA, gain visual approval of coherent combined art, and merge only when instructed. Record any nonblocking polishing issues for SP4.1.
- No new scenes, choices, routes, dialogue, changed game-state keys, fictional allegations, gameplay timers or broader campaign.

## Immediate next action

Request visual approval of the first **empty Total Renewal Spa lounge / finale** background candidate. Use it as the perspective/lighting master before generating the workshop and any sprites. Do not stage or commit unapproved artwork.
