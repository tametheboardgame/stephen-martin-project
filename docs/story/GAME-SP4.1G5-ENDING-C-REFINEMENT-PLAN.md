# GAME-SP4.1G5 — Ending C: A Completely Unnecessary Rebuild — refinement plan

**Status:** Scope agreed, implementation not started; 22 October 2026.  
**Base:** `main` after the approved G4G Ending B finale merge `997bf191c319fe4a86a1890d780c98ef53ed3bd4`.  
**Priority:** High, next substantial story/game refinement.  
**Reference:** Owner's seven screenshots and ten issues on 22 October 2026.  
**Guardrails:** Existing six-part puzzle, spare nonsense pieces, route voice coverage, audio engine, characters, A/B endings, shared ending hub, 15–25-minute playthrough. No new G4C transitions or expanded plot.

## What is actually wrong — owner report and traceability

| Issue | Owner-observed defect | Package | Completion evidence |
| --- | --- | --- | --- |
| 1 | Spa route still says “Rescue briefing” / “Briefing complete” even when it is an approach/assembly scene | G5A | Scan rendered route intro, puzzle footer and back-button copy; no misleading briefing language |
| 2 | Paul's “It's a spa” is audibly duplicated | G5B | Verify whether defect is baked into MP3 or is double playback, correct cause and re-audition |
| 3 | Reassembly screen scrolls slightly at laptop viewport | G5C | Inventory, board, instructions and actions fit at 1366×768 without internal scroll |
| 4 | Placed pieces do not visually fit painted cardboard outlines | G5E | Clear, intentional placement affordances; verify visuals both empty and completed |
| 5 | POWER ON STEPHEN becomes visible only by scrolling after all six pieces placed | G5C | CTA immediately visible without scrolling in 6/6 state |
| 6 | Power button text is vertically too low | G5D | Text visibly centred and unclipped on laptop/mobile |
| 7 | Stephen's “That says 'custom souvenir cut-out'.” begins with a stuttered/repeated “That” | G5B | `reassemble.ending.007` repaired/replaced and listened to in game |
| 8 | Paul's “Oh.” is repeated | G5B | `reassemble.ending.008` repaired/replaced and listened to in game |
| 9 | Stephen shouts “WHY?” instead of delivering exasperated disbelief | G5B | `reassemble.ending.012` replaced with dry, incredulous/exasperated take |
| 10 | No bespoke Ending C closing illustration; end text/album layout will need composition-specific adjustment | G5F, G5G | Owner-approved wide art + readable live hub, no covered faces or scrollbars |

**Additional screenshot QA:** Chapter toolbar partly obscures reassembly screen heading, and post-puzzle speech panels can clip or consume too much stage space. Include responsive heading/speech checks under G5C/G5H, scoped to Ending C.

## Implementation sequence and work packages

### G5A — Spa-specific terminology and navigation (small standalone PR)

**Aim:** Remove incorrect “rescue briefing” vocabulary from UI, not scripted character dialogue.

- Audit `src/game.js` route intro/progress labels, `index.html` stage/footer defaults and the Back to briefing button; check route change and resume paths.
- Existing `routeIntroPhaseLabel` and `routeIntroStatus` for `reassemble` currently use `Investigation complete · Rescue briefing` and `Rescue briefing · …`. Replace with `Investigation complete · Spa arrival`, `Spa misunderstanding · …`, and `Spa approach complete · Souvenir assembly next` (final phrasing can be tuned for compact widths).
- Make Back-button wording accurately describe its destination: e.g. `Back to spa scene` when route is reassemble; retain other routes' correct labels. Avoid generic global string replacements.
- Ensure progress and skip controls continue to function; no change to speaker narration/audio mapping.

**Acceptance:** Zero misleading “briefing” in rendered Ending C copy at intro, puzzle and return; all stages show route-specific status; A/B text and save/resume unaffected.

### G5B — Audio defects and route-specific recording pack (audit first, recording gate)

**Aim:** Eliminate defects at the correct layer; do not hide double-event bugs by re-recording good assets.

- Compare audio mapping and playback triggers against script line IDs; listen to problematic source MP3s versus playback in game to classify (a) *baked repeated words*, (b) *same file fired twice*, or (c) *deliberate repeated text*.
- Paul's spoken `It's a spa` / `It's a Spa`: identify its exact intro ID/file during audit, then correct the source MP3 or duplicate-callback behaviour as appropriate.
- Replacement candidates already grounded in `src/reassemble-data.js`: `reassemble.ending.007` Stephen — `That says 'custom souvenir cut-out'.`; `reassemble.ending.008` Paul — `Oh.`; `reassemble.ending.012` Stephen — `WHY?`.
- Recording directions: `007` clear deadpan and single `That`; `008` one short, flat realisation; `012` weary, disbelieving **exasperation**, not anger or shouting. Write full ElevenLabs-ready speaker-grouped recording guide with exact filenames from real mapping *after* code audit; do not invent filenames.
- Review the rest of Ending C audio (intro/assembly hints/incorrect pieces/power-on/conclusion, narrator and Cardboard Stephen) for clipped starts, duplicated words, missing/doubled playback, loudness and wrong voice.
- Regenerate only failed sources, retain original dialogue IDs/names, inspect file counts and source manifest, test mute/pause/Next/Skip/restart for delayed callbacks and cancelled audio.

**Gate:** The owner supplies/approves regenerated ElevenLabs recordings; connector/API use only if explicitly available and authorised. **Acceptance:** identified four defects resolved, all lines play once and match speech bubbles, no regression to A/B.

### G5C — Reassemble responsive no-scroll layout (highest functional visual priority)

**Aim:** Fit all controls in the stage at standard laptop size, including the post-6/6 CTA, without shrinking touch targets excessively.

- Inspect `#rescueMiniGameScene[data-route="reassemble"]`, `.assembly-workshop`, `.assembly-layout`, inventory tile grid, standee area, `#assemblyPowerButton`, `#assemblyHint`, help/response and bottom `.wall-action-strip`.
- Replace nested 100%-height+padding/overflow-caused laptop scrolling with breakpoint-controlled board height and spacing. Smaller tile/icon typography, reduced vertical margins, sensible grid width split. Preserve keyboard focus order, drag-and-drop and tap-to-select.
- Give the Power On CTA an always-reserved or otherwise guaranteed visible area in the 6/6 state, instead of letting it appear below taller content.
- Ensure chapter header/topbar does not cover puzzle heading; fix route-specific overlay spacing rather than shifting every game scene.
- Test `1366×768` primary; `1440×900`, `1600×900`, tablet landscape/portrait and mobile. On genuine small phones allow sensible stage scrolling if needed; never hide an essential action below clipping or invisible interior scroll.
- Verify three snapshots: **0/6**, **mid-assembly**, **6/6 + Power On**. Confirm error hint state also fits.

**Acceptance:** At 1366×768 no interior puzzle scrollbar; instructions, tray, board and Power On CTA visible as appropriate; no header/control collisions or degraded piece hit targets.

### G5D — POWER ON STEPHEN button polish (small, can accompany G5C)

- Inspect actual `#assemblyPowerButton` with browser dev tools and inherited `.btn` styles; centre label vertically using flex alignment / explicit line-height and consistent padding, not arbitrary negative translate.
- Maintain keyboard focus ring and ≥44px accessible hit height; preserve disabled/hidden/state behaviour.
- **Acceptance:** button looks centred and can be activated with mouse, touch and keyboard at laptop/tablet/mobile, without layout jump when enabled.

### G5E — Cut-out slots and placed-parts presentation (decision gate, then bounded implementation)

**Decision recommendation:** Do **one short technical/visual inspection first** before replacing assets:

1. Overlay actual cardboard base, silhouette slot sprites and six part PNG/WebP layers at their runtime CSS positions; inspect source dimensions, transparency gutters, transforms, z-indices and slot selectors. Determine whether mismatch is purely CSS or irreconcilable asset shape.
2. **If a small transform/cropping fix is sufficient**, retain illustrated silhouette matching and correct positions with before/after tests. Stop if repetitive ad-hoc per-piece nudges proliferate.
3. **Otherwise implement clear intentional labelled targets** (six soft-backed slots / outlined boxes or highlights) *on top of* the approved standee, without claiming their contours match. The art is not a precision jigsaw. Keep the assembled cut-out recognisable and comedic, preserve correct/incorrect feedback and all seven decoy parts.
4. Owner approval of design direction before destructive replacement of locked original asset files; preserve originals, use an isolated Ending C branch.

**Acceptance:** Placement targets look deliberately designed; completed limbs/head/torso land predictably in the corresponding slot; pointer and keyboard selection work; incorrect pieces provide coherent feedback and do not accidentally fill a valid slot. No extra mini-game.

### G5F — Bespoke final Ending C illustration (art approval required)

**Owner concept:** David and Paul almost unnervingly affectionate towards a cardboard Stephen standee — hugging it as though their rescue were a triumph — while **the real Stephen** stands behind them, visibly irritated and unimpressed. The joke must read immediately and not suggest he is truly incapacitated.

- Wide cinematic 1672×941 image, matching approved Ending A/B illustrated graphic-novel poster style and **canonical** David, Paul, real Stephen and the spa-robe cardboard's appearance.
- Consider spa exit/reception as a visually grounded environment: opulent but recognisable Total Renewal Spa, with David/Paul fawning over the souvenir while real Stephen's annoyance is visible in clear contrast.
- Single coherent scene; no new real-world organisations/identifiable locations, no extra main characters, no text or album covers baked into the image. Distinguish actual Stephen from the cardboard double.
- Plan visual safe zones for the live lower-left caption and lower-right album links (or reverse when the art demands it). Approve face/gag placement against actual UI overlay before locking.
- Generate candidate -> owner review and corrections -> approved original into Drive staging -> provenance manifest -> WebP materialisation -> draft-game integration. Never commit an unapproved candidate as final.

**Acceptance:** Owner approves real versus cardboard identities, expressions, character reference match, comic premise and image proportions.

### G5G — Ending C final shared-menu layout

- Reuse **the same** `#rescueEndingSummary` scene and G3F music/replay/jump menu, with `data-route="reassemble"`-scoped background and layout; do not introduce a separate Ending C menu.
- Replace outdated Ending C “artwork deferred” wording with completed state.
- Apply lessons from G4G.1: scaled live heading/summary, compact linked album grid, **no nested text/album scrollbars** at 1366×768; no important faces/props obstructed. For true mobile avoid overlap and retain tappable music platform links.
- Preserve existing Ending A/B compositions, URLs and audio controls.

**Acceptance:** Ending C image, narrator payoff, title, album controls, play another ending and chapter navigation all visible and readable across supported widths.

### G5H — End-to-end regression, voice review and owner sign-off

**Route:** Investigation → spa arrival → narrated intro → parts inventory including decoys → drag and click placement (correct and incorrect) → 6/6 Power On → Cardboard Stephen gag → voiced ending (including corrected 007/008/012) → original/corrected final illustration → shared end hub.

**Test matrix:**
- Start/finish/replay, change route, save/resume and chapter checkpoints at multiple stages.
- Sound on/off, pause/Next/Skip, previously pending audio callbacks, no double speaking or missing voice.
- Inventory state and slot correctness; 0/6, 3/6, 6/6; no missing Power On CTA.
- Layout at 1366×768, 1440×900, 1600×900, tablet and phone; viewport scroll, header overlap, speech bubble height and focus/accessible controls.
- Regression A and B, overall pacing consistent with approved 15–25 minute V1.

**Exit criteria:** All ten owner issues traced and closed with screenshots/voice spot checks; tests/build Cloudflare green; no known critical issue; final PR remains draft until explicit user approval, then merge.

## Delivery and dependency gates

| Stage | Packages | Implementation / review notes |
| --- | --- | --- |
| 1 — fix basic copy | G5A | Small isolated PR; can be implemented immediately |
| 2 — audit and record voices | G5B audit then replacement | Identify causes and exact filenames; owner provides/final-approves recordings; independent of G5C |
| 3 — restore laptop fit | G5C + G5D | Pair visual fit and button alignment; test before changing puzzle assets |
| 4 — intentional slot visuals | G5E | Brief contour feasibility check then owner-approved simplification if needed |
| 5 — complete payoff | G5F | Generate and approve artwork only once puzzle/scene is stable |
| 6 — wire final hub | G5G | Depends on locked G5F art |
| 7 — final regression | G5H | All earlier packages completed |

**G4H** Ending B regression is still a separate outstanding check: schedule alongside G5H or in a short independent smoke pass; it does not hold up G5A. **G4C** extra illustrated transitions remain optional and deferred until after Ending C sign-off. Avoid splitting the whole project into an unnecessarily large engine rewrite.

## Files likely involved (verify during each package)

`src/game.js`, `src/reassemble-data.js`, `src/styles.css`, `index.html`, voice mapping/manifests and `public/assets/generated/` where owner-approved, `tests/office.test.cjs`, `scripts/build.mjs`, `ROADMAP.md` and `STATUS.md`.
