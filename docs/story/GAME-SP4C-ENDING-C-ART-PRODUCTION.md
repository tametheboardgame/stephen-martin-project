# GAME-SP4C — Ending C illustrated spa, cardboard assembly and reveal

**Started:** 18 October 2026
**Branch:** `agent/game-sp4c-ending-c-art-foundation`
**Base:** merged Ending B production main at `584b4c7055777cd54331909d2b6a50a75a25c7ef`
**Status:** Owner-locked spa environments and three actors are integrated. The owner has now approved six Stephen cardboard parts, seven decoys and the silhouette board for the interactive Ending C puzzle. All are being staged and integrated in draft PR #46; in-engine visual playtest and merge sign-off remain outstanding.
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

## GAME-SP4C.1A — Owner-approved spa lounge scene integrated (18 October 2026)

Four **separate approved** pieces now have original PNGs stored in the dedicated project Drive staging folder and materialised WebPs in `agent/game-sp4c-ending-c-art-foundation`:

| Locked source | Google Drive file ID | Runtime image |
| --- | --- | --- |
| Empty teal-and-gold spa background | `1oo9mAJGyRXSS4XZ3c_MrrP7iKE5i94TC` | `public/assets/generated/locations/ending-c-spa-lounge-background-v01.webp` |
| Stephen unharmed with cucumber slices, white spa robe and sandals | `14hdqdGcxqVhMdqONnq72IWtCE58tGTJD` | `public/assets/generated/characters/ending-c-stephen-spa-robe-v01.webp` |
| David in his navy hoodie, green T-shirt and jeans, clutching phone/towel | `1dbI7uny9GIxT5KlVPi5HuWpMyhpdq4n9` | `public/assets/generated/characters/ending-c-david-spa-visitor-v01.webp` |
| Paul in white polo/jeans with a towel, bottle and spa brochure | `1GLSrSNyUhQ3Z4f7Nr3xtJAcelAdU2mFs` | `public/assets/generated/characters/ending-c-paul-spa-visitor-v01.webp` |

The owner's approved standalone character sprites, **not** the flattened three-character concept, are deployed through versioned manifests. Route intro shows David left and Paul right in the empty lounge; Stephen is withheld until the ending reveal. The finale composes David left, Stephen centred in his robe and Paul right with a bottom dialogue box and speaker-specific glow. Original dialogue, saves, route isolation and cardboard puzzle are untouched. Compact positioning includes desktop/tablet/mobile CSS and alpha validation. The assembly workshop intentionally retains its current provisional layout until its own art set is approved.

Materialisation and automated CI passed. The first real in-browser visual sign-off is still pending; don't merge PR #46 until the owner sees the live composition.

## GAME-SP4C.1B — Approved workshop and WP2 six-part artwork (18 October 2026)

- **Locked by owner:** empty fictional Total Renewal Spa display workshop, with jade-and-gold cabinetry, promotional merchandise and an unobstructed central assembly area. Canonical PNG: `ending-c-spa-assembly-workshop-background-v01.png`, Google Drive file ID `1yxbNU-0UHkH8PjFhJx26j6G3v0Zdh7ju`. Runtime WebP: `public/assets/generated/locations/ending-c-spa-assembly-workshop-background-v01.webp`, materialised on draft PR #46 from `generated-assets/manifests/game-sp4c-ending-c-spa-assembly-workshop-background-v01.json`.
- Integrated as the backing image of the existing independent cardboard mini-game. Kept all 13 puzzle buttons, six slots and accessible interactions as HTML above a legible paper-coloured panel. No scene painting into a puzzle background, no route/script changes.
- **SP4C.2 draft for human review:** six transparent cardboard die-cut artwork assets `head`, `torso`, `left-arm`, `right-arm`, `left-leg`, `right-leg` were derived from the *approved* holiday standing Stephen source, maintaining the exact canonical facial pixels and costume. Registration metadata and a mounting-board silhouette accompany the six source prototypes. The two inaccurate generated sticker sheets were rejected and must not be used. These six prototypes are **not locked, staged to Drive, materialised or integrated**, pending owner's visual acceptance. The seven decoys remain SP4C.3.
- Next: owner reviews each six-piece preview and confirms whether the individual thin arm/leg fragments are suitable, or requests re-illustrated standee parts before any production commit.

## GAME-SP4C.2–3 — Six approved Stephen pieces, seven approved decoys and standee board (18 October 2026)

The owner has **explicitly approved** the complete improved cut-out set: blond-haired Stephen's six cardboard body parts in his white spa robe, the separate backing silhouette and seven absurd decoys. These new individual generated originals replace **all previously rejected Paul-likeness, rough segmentation and prototype cut-outs**. Do not restore any older `v02` preview parts. Sources are staged in the project's Google Drive folder and committed via individual JSON manifests in a single source-of-truth batch, optimised to independent WebPs.

| Piece ID (puzzle data preserved) | Locked source Drive file ID | Runtime image |
| --- | --- | --- |
| `head` | `1tQQCjF5noWSCS7FF_Zx-tgOzlzzAsi82` | `public/assets/generated/game/ending-c-cardboard-head-v01.webp` |
| `torso` | `11LOBpLo5RVjd2yo_TT48xJKrFEWS6Mvq` | `public/assets/generated/game/ending-c-cardboard-torso-v01.webp` |
| `left-arm` | `139IhwbbtIqmlCtef65bKHcl3x2aAU3vc` | `public/assets/generated/game/ending-c-cardboard-left-arm-v01.webp` |
| `right-arm` | `1cBtwQow_YyGBkZPzu8uB9ZOmyEv-znCQ` | `public/assets/generated/game/ending-c-cardboard-right-arm-v01.webp` |
| `left-leg` | `1j1ryh_jb5qElpwpzhZpuci1iRdqluR92` | `public/assets/generated/game/ending-c-cardboard-left-leg-v01.webp` |
| `right-leg` | `1fgxIWAZbY39KZPyyR_ASbe3eujFZ-GG5` | `public/assets/generated/game/ending-c-cardboard-right-leg-v01.webp` |
| `board` | `13tFdtrEek607Y13nJMIm1zPF8w1dwt2c` | `public/assets/generated/game/ending-c-cardboard-board-v01.webp` |
| `kidney-1` | `1Bjge8soXYG2o-4tJxjYr1yn6-oVMBBhs` | `public/assets/generated/game/ending-c-cardboard-kidney-1-v01.webp` |
| `kidney-2` | `14wPFrchNiEH7OatqCKXEBBGo7Dacx3jQ` | `public/assets/generated/game/ending-c-cardboard-kidney-2-v01.webp` |
| `kidney-3` | `1lzjJtlyhjn3iJUn7QM6or6PGbW05e1YY` | `public/assets/generated/game/ending-c-cardboard-kidney-3-v01.webp` |
| `wifi-heart` | `1vVeAqAnkNOMJHIwwa8_R-Fe5YrdkpvON` | `public/assets/generated/game/ending-c-cardboard-wifi-heart-v01.webp` |
| `toaster` | `1S-sxEnyZNY8s4hXwG1kKUAtX99qnJXC_` | `public/assets/generated/game/ending-c-cardboard-toaster-v01.webp` |
| `banana` | `1_S_YYSl05PABzEKDHdwv-9dBkMzq8EiD` | `public/assets/generated/game/ending-c-cardboard-banana-v01.webp` |
| `spleen` | `1Wvg9u3atOYjJgOWiPBnVntxq6_gfcvDb` | `public/assets/generated/game/ending-c-cardboard-spleen-v01.webp` |

Integration uses all thirteen existing `assemblyPiece0..12` buttons as keyboard-, touch- and mouse-accessible choice targets with real artwork inside. The six original `assemblySlot0..5` buttons are independently positioned over the empty silhouette, and each reveals its matching source WebP only when fitted. Labels, accessible names, selected/fitted/hint styling, saved parts, wrong-piece dialogue, drag-and-drop and POWER ON remain unchanged. The 5-column laptop tray is intended to show all choices without repeated scrolling; tablet/mobile use a stacked, scrollable layout rather than microscopic targets. `scripts/build.mjs` validates 19 approved Ending C scene/puzzle images including alpha. Automated checks and Cloudflare visual preview remain mandatory before final merge.

## Immediate next action

Verify the fresh Cloudflare Ending C build and visually inspect all thirteen actual image tiles, the six fitted overlays on the empty board, wrong-answer hints, laptop no-scroll layout, touch/keyboard drag fallback, POWER ON and final scene. Keep PR #46 draft and unmerged until explicitly approved.
