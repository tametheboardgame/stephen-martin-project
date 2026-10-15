# Project status

**Updated:** 15 October 2026

## GAME-SP4.0C — David and Paul integrated into the throne-room cast (15 October 2026)

- Owner approved the separately regenerated David and Paul throne-room sprites and directed David **to the left of the throne** and Paul **to the right**, while retaining the approved smaller Stephen on the throne. Uploaded both original transparent PNGs to the dedicated project Drive folder; the standard materialisation workflow created their individual WebP assets from versioned `game-sp40c-throne-david-v01.json` and `game-sp40c-throne-paul-v01.json` manifests.
- Ending A now has three independent actors, positioned in foreground/midground depth, and the established `data-speaker` cue highlights whichever of Stephen/David/Paul is speaking. Text/autoplay, responsive bottom captions, choices, Stephen scaling, existing throne background and all other routes remain unchanged.
- PR #34 remains draft and stacked on PR #33. Automated test and deployed branch preview must be verified; **human sprite sizing/placement sign-off** required before any merge. See `docs/story/GAME-SP4.0C-SUMMIT-THRONE-ART.md`.

## GAME-SP4.0C — Stephen-only throne-room integration preview (15 October 2026)

- User approved the corrected original Steve likeness (blond side-parted hair, blue zip-neck top) and directed an in-engine Ending A check **with Stephen only**. The previously approved throne-room background is reused unchanged. His transparent seated sprite (ceremonial cape, gold goblet and SUPREME CHAIRMAN sash, with **no baked chair**) was uploaded to the project's Drive staging folder and materialised through its OIDC workflow.
- The new Ending A stage layers **one** Stephen over the existing throne, changes the oversized centre placeholder into a bottom dialogue strip, and highlights Stephen on his spoken lines. Original 14 ending beats, autoplay, cards, saves and the other two routes are unchanged. No new David/Paul throne-room sprites were added.
- Source and review plan: `docs/story/GAME-SP4.0C-SUMMIT-THRONE-ART.md`. Desktop/tablet alignment, CSS crop and end-card pacing still require owner visual review. PR #34 remains draft and stacked on entrance PR #33; no main merge authorised.

## GAME-SP4.0C — Summit throne-room environment locked; sprite review next (15 October 2026)

- Owner approved the original Summit throne-room background and requested Stephen, David and Paul in distinct new poses. The room is locked as `summit-throne-room-background-v01.png` in the dedicated Google Drive staging folder, derived via `generated-assets/manifests/game-sp40c-summit-throne-room-v01.json` into `public/assets/generated/locations/summit-throne-room-v01.webp` on stacked art branch `agent/game-sp40c-summit-throne-art`.
- First Stephen/David/Paul transparent cutouts are produced as independent **candidates for owner review**, not approved or added to the game yet. Stephen's generated chair needs special consideration against the approved empty room throne. No gameplay or Ending A composition has been changed. See `docs/story/GAME-SP4.0C-SUMMIT-THRONE-ART.md`.

## GAME-SP4.0B — Summit perspective revision ready for review (15 October 2026)

- Owner approved a revised Summit scene *composition*: gatekeeper on the left, Paul centre-right and David far right, all smaller and visually grounded farther back along the cobbled entrance path. Do not regenerate the approved transparent sprite artwork; independently mirror the three characters in CSS so they face one another. Preserve the approved exterior, bottom speech bar, current-speaker glow, persistent story controls and central Admissions Test panel.
- The scene was restaged at desktop/tablet/mobile breakpoints on draft PR #33. Targeted regression now guards mirrored orientation, positions, smaller scale and preserved speaker glow. The owner still needs to inspect the new **actual in-engine** layout before merging; no changes to the throne-room ending, other routes, saved game or art pipeline.

## GAME-SP4.0B — Approved Summit entrance cast and bottom dialogue (15 October 2026)

- Owner approved the revised transparent **David (gesturing with phone)**, **Paul (wary, raised hand)** and **Asian Summit gatekeeper (ceremonial uniform)** cutouts and asked that the Summit approach use the same *character scene plus bottom dialogue* treatment as the hotel. Approved PNG originals are staged individually in Google Drive; three manifests materialised alpha-preserving WebPs into `public/assets/generated/characters/` without committing PNG sources.
- `#rescueRouteIntro[data-route="cult"]` now layers all three sprites over the previously approved Summit exterior and moves the editable seven-line narrative caption to the bottom. The global SP3.4 autoplay/Next/Pause toolbar remains unchanged, and correct-speaker highlighting is visual only. The central blue panel is reserved for the **Admissions Test**; throne-room ending and non-Summit routes are unchanged.
- Added build WebP-alpha checks and route/dialogue regression tests. The approved scene is playable on the SP4.0 development branch, pending final human desktop/tablet visual sign-off. Work package: `docs/story/GAME-SP4.0B-SUMMIT-ENTRANCE-CAST.md`. PR #33 remains draft; do not merge without owner approval.

## GAME-SP4.0A — Summit exterior first visual proof brief (15 October 2026)

- Owner asked to begin dedicated illustration production **one asset at a time**. Confirmed existing approved comic-poster visual direction, canonical Stephen/David/Paul references, and established Drive → manifest → optimised WebP pipeline.
- Created branch `agent/game-sp40a-summit-visual-proof` and a proposed background-only Summit entrance composition in `docs/story/GAME-SP4.0A-SUMMIT-ENTRANCE-ART-BRIEF.md`.
- Owner approved the first Summit entrance image and explicitly requested it be integrated into every applicable exterior scene. Original `summit-entrance-background-v01.png` is staged in the dedicated Drive folder (ID `1xg4uRcBbX9-R9Zodh4pn5G94aI71B8z2`); manifest `generated-assets/manifests/game-sp40a-summit-entrance-v01.json` materialised a 485,550-byte WebP through the existing OIDC workflow.
- The Summit-specific route briefing and Admissions Test now use `summit-entrance-v01.webp` with readable HTML overlays. The throne-room ending and detention/spa routes are deliberately unchanged. Build packaging and tests were updated; draft Cloudflare preview and owner in-engine layout review remain required.
- SP3.4 was approved, merged to `main` in `8a6ed2555e27eca078ecb17e47209cdb4882ca15`, and successfully deployed. The historical entry below predates the merge.

## GAME-SP3.4 — Story playback and unified navigation draft (15 October 2026)

- Owner identified repeated per-line clicks throughout the finished three-route game and requested **automatic scene progression** and **one consistent replay/change-choice location**. Draft branch `agent/game-sp34-autoplay-unified-controls` preserves voiced office autoplay but introduces time-based holiday/rescue/ending autoplay with global Pause/Next and one Change route/Play another ending control in the same top-right toolbar.
- Every uncommitted invitation, hotel clue/deduction, quiz choice, stamp action and cardboard placement still waits for explicit user input. Scripted cards and dialogue advance hands-free, with timers cleared on pause, hidden tab, menu and scene changes. No art, dialogues, voice files, new game mechanics or V3 save format change.
- Manual laptop/tablet toolbar-overlap review, realistic 15–25-minute timing, CI and owner approval remain outstanding. See `docs/story/GAME-SP3.4-PLAYBACK-CONTROLS-REVIEW.md`. Artwork phase SP4.0 remains next **after** this narrow SP3.4 gate.

## GAME-SP3.0–SP3.3 — All three rescue routes merged; artwork next (15 October 2026)

- Owner authorised integrating the completed functional routes. Dependency PRs #30 → #29 → #28 → #27 were merged in that order, with successful combined smoke checks at each cumulative head. The final `main` integration commit is `aa1ea5a2ed8df7b1db4bfb89028d9ac81f6b5605`; Cloudflare Pages confirmed successful deployment at that exact commit.
- All three rescue mini-games and ending sequences are now implemented, with the existing 55 approved office recordings retained. The final staged suite passed 71/71 tests. This is a **mechanical baseline**, not final visual or public-release sign-off; full manual timing, device interaction and artwork review are still required.
- New owner-approved order: lightweight whole-game qualification / visual inventory (SP3.4), **dedicated three-route artwork and presentation (GAME-SP4.0)**, then **small, bounded improvements/polish and final QA (GAME-SP4.1)**. Do not pre-emptively expand the 15–25-minute game or add routes. Refer to `docs/story/GAME-SP4.0-ARTWORK-PRESENTATION-PLAN.md`.
- Historical entries below retain their original in-progress state for traceability; they are superseded by this merged status.

## GAME-SP3.3 — Reassemble Stephen Martin and Ending C draft (15 October 2026)

- Stacked branch `agent/game-sp33-reassemble-stephen` adds the third functional route: six labelled foam/cardboard pieces, seven comic extras, accessible select-piece/place-slot and optional mouse drag, a two-error Paul hint with matching-slot highlight, no consumed pieces or dead ends, saved progress and an explicit POWER ON STEPHEN gate.
- Full approved spa misunderstanding dialogue and stinger unlock the Ending C card, shared replay and restart summary. The Summit and fictional paperwork branches remain playable and isolated. New art and polish are deliberately deferred as requested by the owner.
- `docs/story/GAME-SP3.3-REASSEMBLE.md` lists all later-art requirements. CI, Cloudflare laptop/touch preview and functional approval remain pending; follow with GAME-SP3.4 full-game integration rather than producing unapproved artwork.

## GAME-SP3.2 — Great Stamp Catastrophe and Ending B draft (15 October 2026)

- Stacked branch `agent/game-sp32-stamp-catastrophe` develops the second complete route: fictional Reason for Visit form, bear-image classification, Paul's takeaway cup revealing the APPROVED stamp and an accessible select-stamp/tap-permit option alongside mouse drag/drop.
- Individual wrong answer jokes, hints after two attempts, stage acknowledgements, immutable `detention` route and V3 save/resume are implemented. The original Ending B dialogue, PLEASE LEAVE authorisation and David's framed-certificate stinger lead to the shared summary/replay. Summit stays playable; SPA remains a labelled unfinished gate.
- No image assets or voices were added: owner asked to defer the dedicated art phase until all routes function. `docs/story/GAME-SP3.2-STAMP-CATASTROPHE.md` captures the subsequent art handoff.
- Draft PR, latest automated CI, browser/touch preview and owner gameplay approval remain release gates. No merge to `main` without explicit authorisation.

## GAME-SP3.1 — Summit Admissions Test and Ending A draft (15 October 2026)

- Built on the still-draft SP3.0 branch via `agent/game-sp31-summit-admissions`. The Summit now has three interactive no-fail admission rounds with three answer cards each, individual joke responses, a two-mistake Paul hint, explicit acknowledgement, and saved progress. Wrong guesses never alter Stephen's committed route.
- Correct charger, compliment and return-flight selections lead into all fourteen approved Ending A beats, including the failed humility application stinger, then the shared end-card/replay/start/menu summary. All progress, feedback and finishing dialogue can be resumed within the existing V3 save system. Other two routes remain honestly unplayable pending SP3.2–SP3.3.
- A CSS-only provisional stage and sash are for functional preview, **not an approved final illustration**. Separate human sign-off is required for Summit entrance, throne scene and any new character/gatekeeper poses. No unapproved art or audio was added.
- New route tests, live Cloudflare preview, human pacing, accessibility, responsive layout and final merge qualification pending. Work package: `docs/story/GAME-SP3.1-SUMMIT-ADMISSIONS.md`.

## GAME-SP3.0 — Shared route framework draft (15 October 2026)

- Draft branch `agent/game-sp30-minigame-framework`: implemented the approved route introductions for Summit, fictional ceremonial bureaucracy and spa using existing screenplay dialogue. After a correct hotel deduction, the user plays each briefing line then reaches an honestly labelled mini-game gate; no unavailable mini-game or ending is shown as playable.
- Added `src/rescue-framework.js` with per-route fixed destinations, small normalised `rescueProgress` V1 inside the existing V3 save, hint-after-two wrong answers, step/checkpoint helpers, and six idempotent cardboard piece matches. Restart and Choose Another Ending clear downstream state; existing voice clips, hotel logic and Stephen branching remain unchanged.
- Shared inaccessible-until-completion ending summary shell prepared with three approved titles and restart/replay/menu. SP3.1–SP3.3 will supply actual choices and cutscenes.
- Tests and real Cloudflare laptop/tablet review required before owner acceptance. `docs/story/GAME-SP3.0-MINIGAME-FRAMEWORK.md` describes this bounded increment; do not merge to main without approval.

## GAME-SP2.4B — Hotel scene accepted and stacked gameplay merged (15 October 2026)

- Owner visually approved the hotel cast's final perspective: Paul remains at the accepted reception-floor position and David stands slightly farther back/smaller. The two independently materialised transparent figures remain over the approved empty visitor-information background, with clickable clues and subtitles layered above.
- Completed merge of voice PR #16 and stacked gameplay PRs #18–#25. Latest gameplay integration into `main`: `dffc02d854f5784dd2a9faf7c9540259e0a14f7b`. Retained 55 approved office audio clips, exclusive Chapter Two route commitments, shared Office Alarm/travel sequence and route-immutable three-clue hotel investigation with hints and save/resume. Recorded final integration smoke success (GitHub run #38718798951).
- **Next:** GAME-SP3.0, the minimal common route mini-game/save/hint/ending framework, then Summit, paperwork and cardboard-assembly routes one at a time. No SP3 mini-game or ending is currently playable. Production Cloudflare/owner playthrough should be verified separately from successful GitHub CI. Maintain 15–25-minute first-play budget and the project's privacy/release gates.

## GAME-SP2.4B — David-only hotel perspective correction v3 (15 October 2026)

- Owner review approved Paul's placement, but requested that David appear farther back in the hotel scene. David alone moves higher and becomes slightly smaller: desktop height 56%, left 22%, bottom 28%; tablet height 50%, left 16%, bottom 28%; phone height 42%, left 10%, bottom 30%.
- Paul's existing geometry at all three breakpoints is unchanged. No revised character artwork, dialogue or puzzle behaviour. The targeted CSS regression expectations are updated.
- Await refreshed Cloudflare preview and owner sign-off for the combined layout. PR #25 stays draft and nothing is merged into main.

## GAME-SP2.4B — Hotel standing cast depth/layout revision v2 (15 October 2026)

- Owner review of the previous hotel preview found David's foot still visually crossing the foreground coffee table. Reposition the two approved, independently layered actors further back, slightly larger and towards the reception desk: desktop shared floor at 24% from the base, David 60% height / left 23%, Paul 50% / left 42%; tablet shared floor 24%, heights 54%/45%; phone shared floor 26%, heights 46%/38%.
- CSS-only staging revision with updated responsive regression assertions. No new artwork, scene composites, dialogue, save state or route logic. GitHub smoke and current Cloudflare preview should be checked before owner visual approval; PR #25 remains draft and unmerged.

## GAME-SP2.4B — David and Paul hotel standing cast approved (15 October 2026)

- **Owner-approved independent art:** David — bald, ginger beard, dark hoodie over green T-shirt, holding a phone; Paul — bald with glasses, white polo, both hands in pockets. Both 1024×1536 RGBA with transparent backgrounds, no combined scene/dialogue; original PNGs uploaded to the existing Google Drive staging folder (David file ID `1iiDtXpVcWE2mvFIhuC2MXejYWc0KEAU1`, Paul file ID `1RRMN0_nXsaHFlEkaqr4DVNabR2ceP59Z`).
- Materialised via versioned `generated-assets/manifests/game-sp24b-{david,paul}-hotel-standing-v01.json` to independent WebP cutouts in `public/assets/generated/characters/`. Source PNGs remain on Drive, not Git.
- Hotel integration: both rendered above the previously approved empty background and **below clickable clues/dialogue UI**. Paul is deliberately **shorter**: desktop height 58% versus David 69%, with independent responsive tablet/mobile staging. Build whitelist and WebP alpha validation updated. Existing route logic, clues, dialogue, 55 original office voices and non-gory fictional game contract unchanged.
- Draft stacked atop PR #24; owner still needs to review the **combined** composition in the actual browser before merging. Do not treat approval of sprite source images as approval of every layout, and do not merge any stacked PR without explicit authorisation.

## GAME-SP2.4B — Playable visitor-information deduction puzzle (14 October 2026)

- Approved empty hotel background now integrated independently into a new stacked draft investigation branch. The prior, owner-approved SP2.4A alarm/travel gameplay remains intact.
- Eight original hotel arrival lines, three clickable hotspots (route-specific phone, three-option brochures, circled desk receipt), destination deduction without rerouting, wrong-guess jokes, Paul hint after two failures and highlighted correct choice after four. Five canonical discovery lines lead to a route-specific **mini-game handoff**; mini-games remain future SP3 packages.
- Continue saves clue inspection, wrong attempts, hint state, completed route deduction and dialogue cursor. Targeted cross-route tests added. Approved original PNG not committed; only Drive-materialised WebP used.
- **Unresolved art gate:** repository has seated/baseline David and Paul but no approved independently cut-out **full-body standing hotel sprites**. Attempts to generate sprites resulted in unapproved whole-scene composites, which have been excluded from game and repo. Need separate full-body alpha cutouts, approved one at a time, before final combined scene visual sign-off.
- Scope and human checks: `docs/story/GAME-SP2.4B-HOTEL-INVESTIGATION.md`. Production main unchanged and no merge authorised.

## GAME-SP2.4B — Hotel lobby background approved and staged (14 October 2026)

- The owner explicitly approved the **second, unoccupied** hotel lobby / visitor-information illustration (1672 × 941), rejecting the earlier character-containing composite as a background. Its original PNG is in the project's Google Drive staging folder with ID `1H29kITgnVArnOO427KSNbuF9Kqj-dhpd`.
- Versioned manifest `generated-assets/manifests/game-sp24b-hotel-lobby-background-v01.json` will materialise `public/assets/generated/locations/china-visitor-information-lobby-background-v01.webp` on the dedicated stacked SP2.4B artwork branch. The owner has not yet approved any combined scene layout for this location.
- **GAME-SP2.4B interactive evidence-puzzle implementation remains NOT started.** Approved source alone does not make the hotel hub playable; do not change the SP2.4A code or claim the interactive scene is complete. Next: three hotspots and David/Paul stage layout after verifying the materialised asset. See `docs/story/GAME-SP2.4B-HOTEL-ART-LOCK.md`.

## GAME-SP2.4A — Office Alarm and travel montage draft (14 October 2026)

- Created a separate stacked draft from approved-structure Chapter Two: the route-specific final phone and Back in England card continue into the **10 original OFFICE-ALARM lines**, played with approved David/Paul seated actors and reused office background. A four-card native-UI ridiculous travel montage follows, ending at a deliberately **non-playable Visitor Information handoff** for forthcoming SP2.4B.
- Route and both progression cursors persist; Continue and Choose Another Ending work without destroying route-specific state or replaying the entire office. Previous 55 recorded opening lines remain unchanged and no new voice recordings are claimed.
- Two hotel-lobby concepts generated for owner review: initial composite with characters **rejected**, second environment-only render **pending owner approval**. **Neither imported or committed as a game asset.** New art enters only through the Drive manifest pipeline after approval.
- Scope, exclusion and review gate documented in `docs/story/GAME-SP2.4A-OFFICE-ALARM-IMPLEMENTATION.md`. Draft PR is dependent on PR #21 and production main remains untouched. Next approved work package is **SP2.4B, the shared hotel evidence puzzle**, after concept approval.

## GAME-SP2.4–SP3.4 — Rescue and ending implementation plan approved (14 October 2026)

- **Planning decision only; no new rescue gameplay or artwork has been made.** Detailed authoritative roadmap at `docs/story/GAME-SP2.4-SP3-RESCUE-IMPLEMENTATION-PLAN-V1.md`, using the existing approved `SP-WP1.2-GAME-TREATMENT.md` mini-games/endings and the newer `GAME-SP2.3C-BRANCHING-STORY-V2.md` invitation structure.
- **Implementation order:** SP2.4A/B shared Back in England alarm, unnecessary-travel montage, and clickable fictional hotel/visitor-information evidence puzzle; SP3.0 small reusable mini-game and ending framework; SP3.1 Summit Admissions Test + Ending A (first full end-to-end route); SP3.2 Stamp Catastrophe + Ending B; SP3.3 six-piece cardboard Reassemble Stephen + Ending C; SP3.4 integration, touch/keyboard access, pacing and human tests.
- **Immediate next delivery gate:** approve fictional hotel-lobby background and Office Alarm/shared hub scripting in a **new bounded draft work package**, after confirming the SP2.3C branch is ready. Existing stacked draft PR #21 remains unchanged in gameplay and still needs normal integration/owner approval before merge.
- **Core invariants:** 15–25 minute first playthrough of one selected route, three distinct endings, original approved punchlines, no fail state, mid-puzzle Continue, three correct route handoffs, no rerouting in the evidence puzzle, and explicit owner permission before a production merge.

## GAME-SP2.3C — Branching invitations and time intermissions (14 October 2026)

- **Owner-approved structural change** replaces the prior three-consecutive-invitations design. Stephen now takes exactly **one** mutually exclusive route: accept The Summit at Great Wall → `cult` handoff; otherwise intermission **A few days later… Forbidden City** → accept the fictional banquet → `detention` handoff; otherwise intermission **The next evening… Night Market** → **mandatory** Total Renewal Spa → `reassemble` handoff. Both later sightseeing locations are skipped if an earlier invitation is accepted.
- All approved location backgrounds, four distinct holiday actors and exact individual dialogue beats remain intact. Existing laptop-friendly 16:9 scene fit and two-column Great Wall/Palace decisions retained; the Night Market has **no choice buttons, no all-declined fallback and no replacement of a previously accepted booking**.
- The route-specific incident handoff is an honest preview of future cult/detention/reassembly mini-games; no unavailable mini-game is falsely launched. Existing route-specific 1%-to-0% interrupted phone message and **Back in England** are retained. **Choose another ending** returns to the Great Wall decision checkpoint.
- Both intermission screens reuse already approved backgrounds via CSS rather than inventing new artwork. Local V3 saves get `holidayFlowVersion=2` and legacy same-day multi-accept states are reconciled to the first accepted route.
- Canonical story revision lives at `docs/story/GAME-SP2.3C-BRANCHING-STORY-V2.md`, explicitly superseding the progression in V1 while retaining unchanged dialogue.
- Draft PR #21 is stacked on still-draft Night Market PR #20. Main and preceding PRs stay untouched; live desktop/laptop and phone/tablet owner review and test qualification required before any merge.

## GAME-SP2.3B — Approved Night Market and final Stephen phone message (14 October 2026)

- Owner-approved originals staged in project Google Drive: lantern-lit background (`1zahJ5gOvYddoZLn4A6uYQHmegsnKtqGt`), teal spa representative (`101rfrMgdkjnxvAMQN8s0AMuiUpV0zI7M`), and standing skewer-holding Stephen (`1SztUKG4dvx9uhCkuDP85jGh0Vab_SjnZ`). Three `generated-assets/manifests/game-sp23b-*.json` files materialise the independent approved WebPs; rejected whole-scene composite concept images are excluded.
- Adds Night Market as the third 16:9 scene, with the locked six short dialogue beats and a text/UI-only fictional **TOTAL RENEWAL SPA — 90% OFF** advert. New full-body cutouts preserve their transparency and appear at the established 73% laptop height.
- Spa acceptance sets provisional `pendingPlan = reassemble` over any earlier booking; declining preserves the active plan. All three declined prompts explicit choice among the three known invitations. The final route is committed **only when leaving the market**; a route-specific incomplete phone message then leads to a dead battery, Stephen's final reaction and **BACK IN ENGLAND…**. Save/Continue and an explicit **Choose another ending** checkpoint retain upstream decisions.
- The David/Paul rescue hub is **not** implemented by this increment. Chapter Two ends with a clear 'rescue chapter coming next' marker to avoid misrepresenting work as complete.
- Work remains on a new stacked draft branch `agent/game-sp23b-night-market` from PR #19; upstream PRs #16, #18 and #19 remain separate. All 55 office MP3s and the earlier chapters remain untouched. Owner in-browser visual review required before merge.

## GAME-SP2.3A-F2 — Side-by-side invitation choices on laptops (14 October 2026)

- Owner approved the smaller character composition and correct Forbidden City Stephen art, but the two invitation buttons still created an **internal scrollbar** on their laptop in both scenes.
- At laptop widths **960px and above**, Great Wall and Forbidden City choices now use an editable two-column grid, with the existing heading and short explanation spanning both columns. Compact typography/padding and hiding the duplicated choice-progress caption keep the buttons within the cinematic lower strip.
- At narrower widths, preserve stacked full-width touch choices; on unusually short screens the existing internal scroll fallback remains available rather than clipping actions. The Great Wall/Forbidden City backgrounds, independent character scale, menu placement, story text, sound and booking/save logic are unchanged.
- Draft PR #19 remains for owner laptop visual review; no production merge before approval.

## GAME-SP2.3A-F1 — laptop composition & correct Stephen pose (14 October 2026)

- Owner reviewed both locations in a laptop browser and requested smaller characters, cleaner on-screen composition and the actual **Forbidden City-specific Stephen sprite** from the start, rather than the Great Wall sprite used for the opening lines.
- The approved `stephen-holiday-forbidden-city-pleased-v01.webp` is now referenced directly in the initial scene HTML and consistently in runtime, irrespective of whether the banquet is accepted or declined. The honour-badge callout remains conditional on acceptance; all previously approved images are unchanged.
- Desktop 16:9 framing remains unchanged; both Great Wall figures are reduced to **77%** height, both Forbidden City figures to **73%**. Relocate the Replay Office/Main Menu mini-toolbar to the top-right, narrow the booking card, relocate David's phone notification below that toolbar, and lift/tighten both dialogue panels to clear the bottom action strip. The bottom choice/result strip is more compact but retains internal scrolling as required.
- All changes are responsive desktop CSS and the single Forbidden City source selection; no change to the original office, 55 MP3s, stage backgrounds, dialogue, choices, save state or final route logic. Add regression tests for the initial and declined Palace sprite and viewport layout. Await owner's updated **laptop** visual review before merging draft PR #19.

## GAME-SP2.3A — Forbidden City playable scene (14 October 2026)

- Owner explicitly approved and locked three Forbidden City assets: the clean 1672×941 historic courtyard backdrop, separately staged fictional red-jacketed banquet attendant, and Stephen's blue-quarter-zip *Guest of Honour* pose (both original sprites 1086×1448 RGBA). Source PNGs staged in dedicated Google Drive under IDs background `1_ZSzDWBOCQHTxXoIZvoUqbBeoPNL7Uzq`, attendant `1Itsnjm2blwhzhciRP94aBUIWxlL4N1Td`, Stephen variant `1FZXgrofuUNEIvD2y340KiieDXBH9AHYe`. Three versioned manifests materialise optimised WebPs on `agent/game-sp23-forbidden-city`.
- New draft scene **stacks on PR #18** (`agent/game-sp22-wall-playable`) and preserves all 55 original MP3 files. Wall decision now continues into Forbidden City. Four canon opening lines, explicit accept/decline banquet choice, five short accepted-branch reaction lines and an optional bear-photo overlay. No extra route, fictional event is identified as **outside** the landmark.
- Before acceptance, Stephen retains the original travel sprite; after acceptance he displays the approved pleased/badge variant. **Accept sets `pendingPlan=detention`**, overriding The Summit; **decline preserves `pendingPlan`**. Replay of Palace restores the Wall's booking without clearing the Wall decision. `route` remains unlocked until Night Market implementation.
- Chapter Two's viewport-fit 16:9 composition remains in place on desktop; tablet/mobile retain responsive scene controls. Targeted tests cover scene transition, choices, loading/replay, sprite alpha/build and story script. **The owner must review real in-browser arrangement before merging.** Night Market remains unimplemented in this increment.

## GAME-SP2.2-F2 — Approved Summit promoter added to Great Wall (14 October 2026)

- Owner accepted the second **Summit promoter** design: young adult East Asian man in an olive casual overshirt, event lanyard and Summit brochure, white trainers and tan trousers, replacing the rejected formal blazer design.
- Approved 1086×1448 transparent source PNG staged in project Drive as `great-wall-summit-promoter-standing-approved-v01.png`, Drive ID `1bCM8ZmigOlb3Ff_7XOYFkOfNroIGmVeJ`. Manifest `generated-assets/manifests/great-wall-summit-promoter-standing-v01.json` materialises `public/assets/generated/characters/great-wall-summit-promoter-standing-v01.webp`.
- Great Wall stages Stephen alone on his first line and the phone notification from David; the promoter enters opposite Stephen on `china.wall.002`, retaining the same 91%-height standing sprite scale, while the phone notification clears. Continues to display through the Summit decision. Mobile/tablet maintain proportional relative sizing.
- New targeted regressions verify entrance timing, phone layering, Back/Continue/Replay stability, alpha, matching source dimensions and build inclusion. **Owner in-game composition review required before merging PR #18.** No office voices, text or decision changes.

## GAME-SP2.2-F1 — Chapter Two desktop viewport correction (14 October 2026)

- Owner visually approved the Great Wall visuals and Chapter Two title card but reported a **desktop page scrollbar** and inconsistent fit compared with Chapter One. Root cause: Chapter Two's normal site header, 16:9 artwork and footer/choice strips stacked vertically outside the art.
- Scoped **desktop-only CSS fix** on PR #18 uses the same full-height cinematic shell and 1672:941 ratio as the approved office scene, hides external site header/footer and places transition buttons, chapter navigation and Great Wall dialogue/choice panels **within** the art frame. Choices can scroll internally only if the display is unusually short. Narrow/touch layouts remain naturally scrollable for access to full-sized controls.
- No artwork, dialogue, event flow, audio, saves or responsive Chapter One layout changed. Added targeted viewport CSS regression assertion to the existing smoke suite. **Owner must check the actual Cloudflare screen** on their desktop; tests do not substitute for pixel-level visual review.

## GAME-SP2.2 — Locked art + playable Great Wall preview (14 October 2026)

- Owner locked the first three China Chapter Two images after reviewing: **chapter transition card**, **illustrated Great Wall** and corrected **standing blond Stephen in a blue quarter-zip** that matches his approved office face. The originally rejected travel sprite is not included.
- Approved source PNGs staged through the dedicated Google Drive folder (source IDs: card `1oUogOuJaEAVh62MMR-TDSoOW0tj_Nkiz`, wall `1xfcvAEhntjKzYRrYez3iOztCSicllv6H`, Stephen `1AtMPoSyOD9jogk6KX1gWikgHCZH7m1a2`). Assets materialise via three `generated-assets/manifests/game-sp22-*.json` files. Preserve travel sprite alpha and avoid copying original PNGs into Git.
- Following the approved 67-beat voiced office scene, the existing holiday placeholder becomes an actual **TWO DAYS LATER… IN CHINA** transition card and first playable **Great Wall** scene. Short approved dialogue, original David notification, current evening booking, accept/decline choices, and replay controls use independently editable UI.
- Saving remains V3-compatible: `holidayPhase`, `wallStep`, `wallDecision` and provisional `pendingPlan` restore after reload/Continue. Accept books `cult` provisionally, decline leaves it unset; there is **no final `route` lock** until all three destinations are built in GAME-SP2.3.
- Branch `agent/game-sp22-wall-playable` is based on the *voiced* office PR #16 so owner can assess the full flow; make its PR target `agent/game-sp11d7-dialogue-voice` as a **stacked draft** to avoid accidentally merging incomplete Chapter Two code into main. Merge audio PR first after its own approval, then retarget/merge game work only when owner accepts the scene.
- Acceptance: owner checks in-game Stephen scale/likeness and overall composition on a verified Cloudflare preview before merging. Forbidden City, market, finished branching and new voices are **not** part of SP2.2. Story canon is locked in main as GAME-SP2.1.

## GAME-SP2.1 — Stephen's holiday story V1 LOCKED (14 October 2026)

- **Owner approved and locked the story**, not the implementation: `docs/story/GAME-SP2.1-STEVE-HOLIDAY-STORY-V1.md` is authoritative for playable Stephen's three locations and choice consequences. It supersedes the older single city/hotel kiosk scene of `SP-WP1.2-GAME-TREATMENT.md`; David/Paul's `OFFICE-ALARM`, shared rescue hub, route puzzles and three endings remain approved and unchanged.
- Transition `TWO DAYS LATER… IN CHINA` → Great Wall (The Summit invitation, `cult`) → Forbidden City (fictional honorary banquet, `detention`) → fictional Beijing night market (Total Renewal Spa, `reassemble`) → route-specific unfinished message/flat battery → `OFFICE-ALARM`.
- Each location has **one** accept/decline consequential choice, minimal comic dialogue and no second activity kiosk. Later acceptance replaces the active booking; decline preserves it. All-declined forces a clear final choice. `route` is locked only on exiting Stephen's chapter; no hidden score or alternate new endings.
- **Next:** GAME-SP2.2 build transition and Great Wall vertical slice on a new agent branch after doc/story merge, with separately approved scene art and standing Stephen; then GAME-SP2.3 remaining two sites/choice state and GAME-SP2.4 David/Paul alarm-hub integration. No GAME-SP2 code or new artwork was approved or delivered by this story lock.
- **Parallel pending work:** Game voice PR #16 remains open and draft as at story lock; the user confirmed the 55 uploaded MP3s play in its preview, but no instruction to merge the voice PR was given. Keep that separate worktree/PR's owner-gate.

## GAME-SP1.1-D7A — Recording upload verified and audible Start UX (14 October 2026)

- All **55/55 MP3** files uploaded directly to `public/assets/audio/dialogue/` on PR #16 at commit `8538eb9`; the targeted smoke build confirms `Approved dialogue MP3s packaged: 55/55` and Cloudflare Pages successfully deployed the new upload commit. Earlier deployment-specific URLs are immutable and cannot serve later uploaded files.
- Revised opening UX: **Start voiced story** explicitly enables voice in the initiating click, while preserving any manual Sound Off preference; initial menu remains muted. Continue also opts into sound unless the owner deliberately disabled it. No voice generation keys, new external services or script changes.
- Regression tests cover user-gesture activation, natural clip-end timing, manual mute persistence, navigation and fallback. Listening approval required before PR #16 merge.

## GAME-SP1.1-D7 — Pre-recorded scene voice clips (14 October 2026)

- Owner provided **55 stable recording IDs** for the approved script: Stephen 16, David 18, Paul 20, Narrator 1. Audio files will be uploaded by owner directly into `public/assets/audio/dialogue/` on `agent/game-sp11d7-dialogue-voice`, with filenames matching their exact beat IDs and `.mp3` suffix. No uploads are present at the time of initial D7 code integration.
- Audio is controlled by the existing Sound On/Off buttons, starts only after explicit user interaction, plays each dialogue recording until completion, and only then auto-advances after a short natural gap. Unrecorded and unplayable dialogue falls back to the original text timer; non-dialogue beats retain their existing timings.
- Pause/resume holds voice position; Next, Back, restart, skip, navigating home and muting stop old audio. Rapid jumps do not allow stale audio events to advance the scene. Voice filenames are whitelisted against actual dialogue IDs during production build, with no extra tracking, networking or TTS services.
- Audio clips live in the public repo/preview; only approved synthetic voices should be committed. The audio-enabled PR must remain draft for owner listening/visual review before main merge.

## GAME-SP1.1-D6B — Paul Pleased expression proof (14 October 2026)

- Owner approved Paul's Pleased artwork after Confused: subtle happy smile with head/eyes towards his right (picture left), preserving the approved bald head, glasses, white polo, skin tone and body proportions. His complete opening-scene expression set is Neutral/Blank, Confused and Pleased.
- Approved transparent PNG (1086 × 1448) staged in the dedicated project Google Drive folder as `paul-office-seated-pleased-locked-v01.png`, file ID `1rzLKSR1qyORp1JCYMGraShA5xcxV9f3L`; manifest `generated-assets/manifests/paul-office-seated-pleased-v01.json` materialises `public/assets/generated/characters/paul-office-seated-pleased-v01.webp` on draft PR #15.
- Paul's existing `pleased` acting cues now automatically load that full sprite, `confused` retains the previously approved pose, and `blank` continues to use Neutral. The independent Paul proof selector now cycles Auto → Neutral → Confused → Pleased without moving Stephen/David, changing the dialogue or altering saved progress.
- The build, smoke checks and tests now include the third Paul sprite and validate all 67 reaction beats. **Human approval of the in-game composition and timing is required before PR #15 merges.** Production `main` remains unchanged.

## GAME-SP1.1-D6 — Paul Confused in-scene proof (14 October 2026)

- Owner approved Paul Confused with his head turned to his right (picture left), towards Stephen and David, maintaining his glasses, white polo and comic character likeness.
- Full 1086 × 1448 transparent PNG staged via the dedicated Stephen Martin Project Google Drive folder (file ID `1s00fXjB-6BfZdwYJSgfKDmbFdm1xUA1I`); manifest `generated-assets/manifests/paul-office-seated-confused-v01.json` materialises `public/assets/generated/characters/paul-office-seated-confused-v01.webp` through GitHub OIDC.
- Registered Paul `confused` cue as a complete seated sprite. Blank and Pleased remain the existing Neutral artwork until Pleased is approved. No dialogue, Stephen, David or save structure changes.
- Independent Paul Auto → Neutral → Confused proof button for in-scene visual comparison. Targeted smoke and live Cloudflare branch preview required before owner signs off and before merge. Production main remains approved D5 while this preview is in draft.

## GAME-SP1.1-D5 — Full locked David seated expression set (13 October 2026)

- Owner locked **Confident, Serious, Frustrated, Shocked and Systems Expert** after individual image reviews. Existing Neutral is unchanged. All six David acting keys now select independently approved full seated transparent sprites; Paul's absent art still uses Neutral. Stephen's six existing seated expressions are unchanged.
- Five source PNGs (all **1086 × 1448, RGBA**) were uploaded to the dedicated Stephen Martin Google Drive staging folder; manifests materialised and verified their WebP output on draft PR #14 via GitHub Actions OIDC. New Confident is manifest **revision 4**; four other expressions are **revision 1**.
- The character's scripted `reactions.David` keys already cover every spoken and silent beat of the approved 67-beat intro. `src/game.js` now registers the matching five paths, and **Auto** selects them automatically at the correct beats. No scene dialogue was modified.
- David proof selector cycles Auto, Neutral, Confident, Serious, Frustrated, Shocked and Systems Expert while paused, without disturbing Stephen, Paul, scene state, or timers. WebP URLs are versioned to avoid old asset caching. The build, smoke workflow and tests verify all assets and script cue mapping.
- **Awaiting owner visual check in Cloudflare preview before merging PR #14 into production.** Some larger gesture poses naturally change their hand position but occupy the same full sprite canvas. Paul expression art is separate future work.

## GAME-SP1.1-D4.2 — David Confident v03 expression proof (13 October 2026)

- After preview comparison, the user rejected David Confident v02 and approved a revised expression image with corrected aligned eyes, warm skin tone, auburn beard, no chair and the original charcoal/olive outfit. The owner still needs to accept the actual in-game Neutral/Confident transition.
- Approved source PNG: `david-office-seated-confident-approved-v03.png` in the established Drive staging folder; Drive file ID `1ZFDErAxACdK6jao6EJ9GKVol7VkEXWsZ`. The Drive-generated manifest revision 3 replaces `public/assets/generated/characters/david-office-seated-confident-v01.webp` on the existing draft branch.
- David's Confident runtime and preload URL now use `?v=3` to invalidate the previous preview cache. Other David expressions and all Paul's use their existing Neutral fallback. All Stephen artwork remains unchanged; production main unaffected.
- Next gate: compare David Neutral and Confident in the Cloudflare preview using the existing proof selector, then lock the sprite if accepted.

## GAME-SP1.1-D4.1 — Confident v02 visual rework (13 October 2026)

- Owner's in-game side-by-side review rejected David Confident v01: compared with approved Neutral, its colour balance and apparent sprite scale were visibly wrong.
- Regenerated warmer high-contrast art to match the approved Neutral skin and beard colouring, charcoal hoodie and olive shirt, while preserving right-facing confident pose, no chair and 1086 × 1448 transparent canvas.
- Replacement source: `david-office-seated-confident-approved-v02.png` in project Drive staging (ID `1MGKa4FSs7UhSHHZQJh-YTAhY3gh96plw`). Manifest revision 2 retains the original WebP filename; in-game URL uses `?v=2` to avoid stale CDN/browser caching.
- Automated checks and owner A/B in-game confirmation required; no merge, and no remaining David/Paul sprite creation until confident alignment is verified.

## GAME-SP1.1-D4 — David Confident seated artwork (draft PR #14, 13 October 2026)

- Owner approved David Confident v01 direction: bald, auburn beard, charcoal hoodie, olive T-shirt, hands clasped, rectangular smartwatch, no chair, transparent 1086 × 1448 canvas, looking right in the picture toward the other two characters. Staged in the project Drive asset folder as `david-office-seated-confident-d2-v01.png`, Drive file ID `1loYRJjx1YDa3K_9rDhaiVchvdGmPKEg7`, then materialised through the existing manifest `generated-assets/manifests/david-office-seated-confident-v01.json` to `public/assets/generated/characters/david-office-seated-confident-v01.webp`.
- David's Confident dialogue cue now selects the approved seated WebP. All other David expressions and all Paul's cues continue to fall back to Neutral. Stephen's six expressions are unchanged.
- A temporary David Auto → Neutral → Confident proof button allows instant in-scene comparison without changing story position or playback. CI checks registration, 1086 × 1448 alpha, fallback, asset inclusion and the comparison control.
- Next owner gate: inspect the Cloudflare PR preview for body/hand alignment across David's Neutral ↔ Confident swap before generating David's remaining expressions. No production merge or public release approved.

## GAME-SP1.1-D3 — approved continuous screenplay and expression architecture (draft PR #14)

- Approved 13 October 2026: Stephen opens with his holiday announcement; one office conversation after the approved exterior. 54 spoken lines remain verbatim, plus the opening narrator and 12 silent reactions, inserts and title beats, giving 67 total beats.
- All beats have stable IDs and explicit Stephen/David/Paul emotion keys. Stephen uses all six approved seated sprites. David and Paul display their approved Neutral image until other full seated expressions are individually approved and registered.
- Internal narration and in-story system speech are replaced with stage visuals. The six prop inserts cover risk, printer, chat, song, mute notification and rescue folder, with the title card concluding the intro.
- Stephen is absent from departure onward; Back restores him before departure. Save V3 uses stable IDs, migrating V1/V2 positions explicitly.
- Targeted CI **passed** on both push (run 38374748329) and pull request (run 38374754131), including 16 automated tests and the output-artifact checks. Branch preview was not independently accessible through the available browser tool, so real visual inspection of the six Stephen expressions and silent inserts remains the final human gate before PR #14 merges. New expression artwork for David and Paul comes later. No public release authorised.
- Definitive script: docs/story/GAME-SP1.1-D3-OFFICE-SCRIPT.md.

**Updated:** 12 October 2026  
**Master roadmap:** Approved version 1.0, `ROADMAP.md`  
**Primary scope:** Complete **15–25 minute** point-and-click/touch comedy game; three concise endings; approximately 2–3 substantial mini-games. Song alongside; comic optional.

## GAME-SP1.1 — New exterior establishing shot and dialogue counter removal (preview pending)

- **Approved exterior:** `sunny_modern_office_entrance.png` at exactly 1672 × 941, staged in project Drive as `office-exterior-opening-v01.png` (ID `17cvEpaC41G5MpUg55NKWe3DYoiNVm13O`). Manifest `generated-assets/manifests/office-exterior-opening-v01.json` materialises `public/assets/generated/locations/office-exterior-opening-v01.webp`. No labels, characters or UI were burned into the image.
- **Opening:** Add a one-line narrated exterior shot `O00` before unchanged `O01`–`O07`: "In an unassuming office in the heart of somewhere, three idiots discuss one idiot's holiday plans." The full exterior overlays the existing office layers only during this shot; its 850 ms CSS opacity fade reveals the seated scene when advancing by Next/autoplay. Back restores the exterior. Respect reduced motion.
- **Dialogue UX:** Remove the **per-shot dialogue counter** beside the speaker entirely (e.g. `04 / 04`). Keep scene heading `SCENE 01 / 08`, the overall progress bar and existing interactive controls.
- **Preservation:** Opening now totals eight shots / 65 beats; the approved original seven shots and their 64 lines, expression cue keys, office lighting, three seated sprites, desk, cutaways and playback behaviour remain unchanged. Migrate old version-1 saves to version 2 by offsetting historical shot indexes +1, including finished holiday records. No script edits elsewhere yet; broader review of show-versus-tell and expression assignment is a distinct owner-led next pass.
- **QA:** Verify rendered opaque exterior WebP dimensions, narration and O00→O01→O00 navigation, Save/Resume migration, counter absence, all original 64 beats, smoke and Pages deployment. Keep draft PR #14 pending visual review.

## GAME-SP1.1-D2 — All three actors opaque; David and Paul expression-ready (owner preview)

- **Bug fix:** The office scene's shared seated `.cast-actor.is-listening` CSS previously used `opacity: .94`, letting floor/window light show through David and Paul (and formerly Stephen). It now uses **`opacity: 1` for all three actors**, whether speaking or listening. The existing `saturate(.94)` listener filter, `saturate(1.07) brightness(1.03)` speaker filter, scene backdrop, foreground desk, framing and cinematic title dissolve remain unchanged. The Stephen-only override is unnecessary and was removed.
- **Shared D2 staging architecture:** `applySeatedExpression(name)` now uses a per-character `seatedExpressionSources` map. Stephen retains all six approved seated expressions and his proof selector. David and Paul each have **only their approved Neutral** sprite registered, while their existing per-beat reaction metadata is still recorded. An unavailable expression maps safely to Neutral. All actors render one entire transparent seated image at a time: no overlapping or clipped legacy expression portraits, no new unapproved assets and no extra CSS overlays.
- **Next art workflow:** For each approved new David/Paul pose, stage a full aligned transparent **1086 × 1448** sprite through the existing Drive → manifest → WebP pipeline; register its key and exact path in `seatedExpressionSources`, add it to the static build/CI file lists and appropriate tests, then inspect the in-scene preview before approving the next pose. Existing reaction cues may require alias review during each new art pass. Do not bulk-enable old expression-sheet crops as seated assets.
- **Regression gate:** Tests cover solid opacity for all three figures, preserved listener/speaker filters and title scene, three single-image figures, unchanged Stephen controls, complete 64-beat playback and David/Paul's neutral fallback across all cue states. Keep draft PR #14 open for owner's visual approval. Production `main` remains unchanged.

## GAME-SP1.1-D2 — Stephen listening opacity regression (review preview)

- Owner compared consecutive O01 dialogue screenshots with the **same Amused sprite**: on Paul's line, office window reflections/floor light visibly bled through Stephen; on Stephen's own line, the figure was solid. The problem was **not** the asset alpha. Shared CSS `#officeScreen .cast-seated .cast-actor.is-listening { opacity: .94; }` faded the **entire actor element**; speaking used `opacity: 1`.
- **Scoped remedy:** a higher-specificity `#officeScreen .cast-seated #castStephen.is-listening { opacity: 1; }` override. Stephen now remains fully opaque whether speaking or listening; the approved transparent outside-figure silhouette remains intact. No artwork revisions and no modifications to David/Paul, general office/backdrop, desk, or shared illumination/colour filters.
- **Guardrail:** automated CSS regression checks verify Stephen's new override, unchanged David/Paul shared opacity, original speaker/listener lighting and unchanged JS dialogue-state handling. Await owner visual approval in PR #14 branch preview before merge.

## GAME-SP1.1-D2 — Stephen's six seated expressions complete (preview review)

- **Laughing asset:** Approved `cheerful_laughing_man_in_blue_pullover.png` (1086 × 1448 RGBA, transparent). Staged in project Google Drive as `stephen-office-seated-laughing-d2-v01.png` (ID `1ADZg5-Qz1N6_E2HWdttLUz8RAfCmxEtn`); manifest `generated-assets/manifests/stephen-office-seated-laughing-v01.json` produces `public/assets/generated/characters/stephen-office-seated-laughing-v01.webp` through the existing materialisation workflow.
- **Acting cues:** In O03, Stephen begins laughing on beat 9 (Paul's explanation that he turned the fridge off because it made a noise) and continues on beat 10 (narration of Stephen trying not to laugh). The original 64-beat dialogue is unchanged. In Auto, both beats now use the approved seated Laughing sprite.
- **Complete Stephen set:** Neutral, Amused, Confused, Annoyed, Exasperated (approved left-tilt v03), Laughing. All six use one image source on the approved Stephen seated canvas, never layered transparent whole-body sprites. Manual proof selector cycles Auto → Neutral → Amused → Confused → Annoyed → Exasperated → Laughing; preloads and cache-versioned paths retained.
- **QA gate:** All six WebPs checked for 1086 × 1448 and alpha, asset manifests and build inclusion; test coverage for both laughing cues, the Exasperated cues, manual overrides and complete 64-beat playback. Keep draft PR #14 unmerged until the owner reviews Laughing's hand clearance and seating in the Cloudflare preview. Production remains unchanged.

## GAME-SP1.1-D2 — Stephen Exasperated preview (visually approved)

- Approved left-tilt portrait: `exasperated_eye_rolling_anchor.png`, 1086 × 1448 RGBA; earlier Exasperated drafts were not used.
- Asset pipeline: project Drive `stephen-office-seated-exasperated-d2-v03.png`, manifest `generated-assets/manifests/stephen-office-seated-exasperated-v01.json`, converted asset `public/assets/generated/characters/stephen-office-seated-exasperated-v01.webp`.
- Reactions: Exasperated at O02:8, O04:7, O05:3, O05:8 and O06:5. The existing 64-line script is unchanged.
- Proof selector: Auto, Neutral, Amused, Confused, Annoyed, Exasperated; existing single-image swap prevents layered bodies. Tests verify asset transparency, size, cue mapping, fallback, manual control and complete playback.
- Keep PR #14 open for owner review in Cloudflare. No production merge.

## GAME-SP1.1-D2 — Stephen Annoyed seated sprite (visually approved)

- **Owner-approved artwork:** `annoyed_stephen_with_clasped_hands.png` (transparent 1086 × 1448) staged via project Drive as `stephen-office-seated-annoyed-d2-v01.png`, source Drive ID `1DVCowiLgSjl9NQ69ATxClXC8cMhFqjb1`. Provenance manifest `generated-assets/manifests/stephen-office-seated-annoyed-v01.json` materialises `public/assets/generated/characters/stephen-office-seated-annoyed-v01.webp` via the established GitHub workflow.
- **In-game mapping:** Stephen's `annoyed` reaction metadata selects the new full seated sprite automatically, alongside Neutral/Amused/Confused. The proof button cycles Auto → Neutral → Amused → Confused → Annoyed, preserving the single-image-only replacement that prevents ghosted arms or faces. New image preloaded/cache-versioned for smooth comparison.
- **QA and release gate:** Build and smoke checks confirm the new 1086 × 1448 alpha WebP, preservation of all existing lines, per-beat reaction mapping and the manual selector. The owner must visually review the real Cloudflare branch preview before merging PR #14. No production deployment and no changes to David, Paul, desk or cutaways.

## GAME-SP1.1-D2 — Stephen Confused sprite added (visually approved)

- **Reconnection and asset:** GitHub PR #14 was still open. Owner-approved `puzzled_man_with_clasped_hands.png` (transparent 1086 × 1448) staged in project Drive as `stephen-office-seated-confused-d2-v01.png` (ID `1AgdYklMgvLFkPNo153UEqfIV4KwApzqU`), manifest `generated-assets/manifests/stephen-office-seated-confused-v01.json`; the established GitHub pipeline materialised `public/assets/generated/characters/stephen-office-seated-confused-v01.webp`.
- **In-engine:** Preserve the **single-image-only** swap mechanism. Existing Stephen `confused` reaction cues now select Confused automatically; `amused` selects Amused; uncreated emotions fall back to Neutral. Temporary proof button cycles **Auto → Neutral → Amused → Confused** without stopping or resetting the script. Confused WebP is preloaded and cache-versioned.
- **Boundaries:** No changes to the approved office background, David/Paul artwork, 64 beats, pacing, desk layering or production `main`. Cloudflare branch preview and targeted 1086 × 1448 alpha/behaviour checks must pass. Owner reviewed the real Confused pose in the preview and approved its visual alignment and readability. PR #14 remains open for the rest of Stephen's D2 set.

## GAME-SP1.1-D2 proof — Stephen seated Neutral ↔ Amused (owner visual review pending)

- **Asset v03 (12 October 2026):** Owner selected the visibly leaning/upper-body amused pose to replace the first proof. Exact original `amused_leaning_comic_portrait.png` (1086 × 1448 RGBA) is staged as `stephen-office-seated-amused-d2-v03.png` in project Google Drive (ID `1gfRmnWft10XbzPvWc0dJ0tS-B2Vi8-8_`). Manifest revision 2 materialises it onto the existing `stephen-office-seated-amused-v01.webp` path, preserving the Neutral/Amused test and adding a `?v=3` asset query to avoid stale browser caches. Older test artwork stays out of the Cloudflare published dist. Provenance manifest `generated-assets/manifests/stephen-office-seated-amused-v01.json` creates `public/assets/generated/characters/stephen-office-seated-amused-v01.webp`. Both neutral and amused sprites have transparent **1086 × 1448** canvases. This preserves the original approved image; pixel-perfect shoulder/hand alignment still needs owner inspection.
- **Proof behaviour:** The D2 proof now uses a single Stephen `<img>` element, replacing its `src` when reaction metadata requests Amused (other expressions fall back to Neutral). The initial 140 ms overlap/crossfade was rejected after the owner's screenshot revealed two complete upper-body sprites appearing simultaneously through their transparent regions; no stacked body images remain. The amused v03 WebP is preloaded to minimise swap latency. A clearly marked temporary `Stephen: Auto → Neutral → Amused` button allows direct A/B switching while paused or autoplaying, without advancing/restarting dialogue. David and Paul stay on their approved seated neutral sprites.
- **Scope/QA:** No changes to the 64-beat office script, title menu, cutaways or production `main`; only the tiny expression proof on a development-branch Cloudflare preview. Smoke checks require the new WebP, alpha transparency, correct canvas and manual/automatic behaviour. Owner must judge the visible head/shoulder/hand registration before expanding to the rest of Stephen's emotions.

## Current checkpoint — GAME-SP1.1-D1 through D1E owner approved

- **12 October 2026:** Owner approved the complete three-person seated office, independent transparent desk, cinematic laptop-fit opening, dedicated risk/printer/chat cutaways and floating full-office title/start menu after testing the Cloudflare preview. **PR #12 is the implementation merge gate**; its included five layered WebP assets supersede the separate draft asset-only PR #10.
- **Next: GAME-SP1.1-D2 — seated expressions.** Stephen, David and Paul each require visibly distinct, precisely aligned expressions that preserve their approved seated bodies and foreground desk. Start with a single Stephen expression-registration/composite proof, then the approved six-expression sets per character, mapping the existing 64-beat reaction metadata. No giant face-cards or mismatched pasted heads.
- **Deferred:** Shorten dialogue pacing / add 1×, 1.25×, 1.5× speeds and polish three cutaways after the seated expression work; keep main game target 15–25 minutes and private real-world details out of the public repository.

## Foundation

- Repo: `tametheboardgame/stephen-martin-project`, currently **public**.
- Foundation delivery: [PR #1](https://github.com/tametheboardgame/stephen-martin-project/pull/1), merged into `main`.
- Image pipeline: tested successfully end to end in GitHub Actions run `38221823786` on 12 October 2026.
- Staging folder: `1C6kezJBL_sexyHmxeLnFnzpj-Zbn9iC6`.
- WIF provider: `projects/878071288497/locations/global/workloadIdentityPools/github/providers/stephen-martin-github`.
- Service account: `stephen-martin-assets@unicorn-valley-510010.iam.gserviceaccount.com`.
- Stephen original: Drive file `1TkKP-qc-pM4kVrWlwzay0sFHTLG9Ao8z` (`stephen-martin-character-baseline-v01.png`).
- Approved Stephen derivative: `public/assets/generated/characters/stephen-martin-baseline.webp` (GitHub blob `73ce1539332fad89c456eeec348471ef91bd75f4`).
- One unrelated generic image thumbnail was mistakenly displayed in chat; **that thumbnail is not canon**. Use the actual committed Stephen sheet.
- Approved project constraints and workstream rules are recorded in `ROADMAP.md`, `PROJECT.md`, `DECISIONS.md` and `AGENTS.md`.

## SP-WP1.1: Main-character baseline complete

**Human gate required for each new likeness.**

1. Confirm Stephen's approved character sheet remains the anchor.
2. **David design approved:** 6 ft 2 in, bald, blue eyes, short dark ginger/auburn beard. Original `david-character-baseline-v01.png` in Drive (`1DJLH4ni0z81_SMrslKx99z_U2agTm8vS`); manifest at `generated-assets/manifests/character-david-baseline.json`; target `public/assets/generated/characters/david-baseline.webp`. The asset was materialised successfully by GitHub Actions run `38225490240`. Output `public/assets/generated/characters/david-baseline.webp` has blob SHA `0324afa1d3dee0a070701a31bc210c529c6061a4`, matching an independent WebP conversion from the approved PNG. David's approved art and canon were merged in [PR #2](https://github.com/tametheboardgame/stephen-martin-project/pull/2).
3. **Paul approved:** Revised character sheet with clean-shaven face and characteristic blank expression. Original `paul-character-baseline-v01.png` in Drive (`1J-_Zxy7U7VGAnUS9S3L7CAAR54KNaSYk`), manifest `generated-assets/manifests/character-paul-baseline.json`, destination `public/assets/generated/characters/paul-baseline.webp`. GitHub Actions image materialisation **succeeded** in run `38228062469`. The committed WebP has Git blob SHA `2ec53c41eac4d4e9da9b81fdfaf059796a4dcc53`, independently reproduced from the exact human-approved source PNG. The character reference was merged in [PR #3](https://github.com/tametheboardgame/stephen-martin-project/pull/3), squash commit `770f3b5e`.
4. Main-character appearance references are recorded in `docs/CREATIVE-BIBLE.md` and `docs/ART-DIRECTION.md`; approved art is registered in the manifests.
5. Define/design a fictionalised boyfriend when story requirements justify it, keeping the mystery ambiguous.

**Status:** All three principal character baselines (Stephen, David and Paul) are approved and committed to `main`. SP-WP1.1 main-character visual baseline complete. The boyfriend's fictional appearance remains deliberately deferred until needed by the story.

## Completed work package: SP-WP1.2

**Story/script approved by owner 12 October 2026:** `docs/story/SP-WP1.2-OFFICE-OPENING.md`, `docs/story/SP-WP1.2-GAME-TREATMENT.md`, and `docs/story/SP-WP1.2-IMPLEMENTATION-HANDOFF.md`. These detail a 3-minute scripted office opening, playable Stephen activity selection, a brief David-and-Paul rescue investigation, three small mini-games and respective cutscenes, all targeting 15–25 minutes. **All three stories, mini-games and the comic false-alarm reconstruction ending are approved for development.** SP-WP1.2 is complete. **Next: GAME-SP1**, a standalone playable three-minute office opening using existing approved character assets, advancing to a basic Stephen holiday placeholder. Preserve the 15–25 minute total target, the privacy boundary, and keep new artwork and engine complexity minimal.

## SP-WP1.2: Privacy and comedy bible (approved)

- Owner-approved privacy rule recorded in `DECISIONS.md` (SP-D009), `AGENTS.md`, `PROJECT.md`, `ROADMAP.md` and `docs/CREATIVE-BIBLE.md`.
- **Stephen Martin** is the only real-world full name allowed in public project content. Other protagonist names are first-name fictional labels; don't publish actual employer/office, partner/relative identities, real contact information, private relationship/family details or precise real-world itinerary.
- All conspiracies, holiday misunderstandings, relationship/family complications, detention scenarios and body-parts plots are **comedic inventions**, never assertions about the people who inspired them.
- A real named protagonist and stylised likeness may still be recognisable. Keep publication behind the existing explicit owner approval and privacy review gate.
- The narrative beats and office script were approved and merged in PR #6; the next phase implements that approved material.

## GAME-SP1: Office opening preview (owner-approved for main)

- Owner approved the SP-WP1.2 story package, merged in [PR #6](https://github.com/tametheboardgame/stephen-martin-project/pull/6) at `22d7806b5c36dacc0cea4a8c0f9bedc8ab204e4f`.
- The owner played the GAME-SP1 office preview and expressly approved it for merging into `main` on 12 October 2026. Small opening-scene feedback is still expected; handle that in a subsequent bounded PR.
- Seven approved scene shots and 64 dialogue beats are recorded in `src/office-data.js`. `index.html`, `src/game.js` and `src/styles.css` provide responsive comic staging, the three approved character sheet assets, back/next/skip/replay controls, optional local sound cues, simple resume, and a clearly labelled Stephen holiday placeholder.
- No boyfriend drawing, game engine or third-party service is required. Static Cloudflare Pages deployment can occur automatically when this merges to `main` if the owner has connected the service; the public website remains a preview, not the completed game. Full Stephen's playable route and rescue mini-games remain GAME-SP2/3.
- Cheap local `npm run verify` syntax and behaviour tests run in a dedicated GitHub Actions workflow. It packages a self-contained office-preview archive after a successful smoke run.
- **Gate cleared:** owner approved the office preview and explicitly requested merge to `main`. Check public Cloudflare build and owner feedback after merging. Do not silently start all three game routes.

## GAME-SP1.1-D1E — Full-office cinematic main menu (owner approved)

- **Owner request:** Replace the narrow, stacked title screen with the same approved full office as the game, using floating title, Start/Continue and sound controls over independently layered artwork.
- **Implemented on draft PR #12:** One 1672:941 office composition: approved `OFFICE-CLEAN-01` background → separate seated David/Stephen/Paul sprites → alpha `OFFICE-FOREGROUND-01` overlay, with independent accessible HTML title, description, sound and Start/Continue controls. No new images or changes to the approved 64 dialogue beats.
- **Presentation:** Desktop uses viewport-height-aware hero sizing, upper-left compact title that does not obscure faces, top-right sound/preview controls, lower-right Start/Continue panel on the desk and lower-left tagline. Narrow touch layouts use the same office art but stack live controls outside it.
- **Verification:** Latest GitHub targeted smoke (21 tests) passed; Cloudflare branch deployment passed. Real headless Chromium render of the exact CI artefact confirmed full menu and working controls with **no document scroll at 1366×768 and 1856×825**, and a readable 390px mobile view. Save/resume and three synced sound toggles have targeted checks.
- **Gate:** Owner to visually review [branch preview](https://agent-sp11d1-preview.stephen-martin-project.pages.dev/) before PR #12 merges. Production `main` remains unchanged.

## GAME-SP1.1-D1D — Cinematic viewport layout (pending owner visual review)

- **Trigger:** Owner's real laptop screenshot showed the height-capped version still occupied a narrow column with substantial side margins; the decorative HIGH RISK document also floated directly over Paul's face during ordinary O02 dialogue.
- **Implemented:** On wide desktop/laptop screens, hide the duplicate global header *while in the office only*, place a compact scene/title/sound/restart/skip bar **over the top of the stage**, and size the entire stage from the actual viewport height with only bottom playback transport reserved. Background, approved seated sprites and transparent foreground desk retain the same 1672:941 coordinate registration. Keep dialogue over the lower desk and playback controls directly underneath.
- **Prop correction:** Remove oversized everyday floating prop overlays from the office staging; show the HIGH RISK graphic as the existing editable **David's laptop cutaway** at its two intentional scripted beats. Preserve the intentional end-title effect.
- **Responsive:** Preserve the separate narrow-screen stacked dialogue. Very shallow viewports may scroll rather than silently hide controls. The new in-stage sound button mirrors the main-menu sound setting.
- **QA:** Targeted GitHub Actions smoke checks passing, covering full script, dialogue/cutaways, prop suppression and sound control. The container browser is blocked by managed navigation policy, so the new laptop layout still requires a real Cloudflare human visual test at 1366×768 and the owner's laptop dimensions before merging draft PR #12 into `main`.

## GAME-SP1.1-D1C — Real office title screen and verified laptop fit

- **Owner feedback:** A prior height-only shrink left the cutscene too narrow with its top/title scrolled away, and the start menu still showed the old abstract yellow/red artwork.
- **Implemented on draft PR #12:** Replaced the start menu with the approved fictional office and three independent seated sprites plus the alpha desk foreground, with a readable "Rescue Stephen Martin from China" heading and Start/Continue controls. Removed the old abstract menu art. Both office and menu now use viewport-height-aware shell sizing; screen transitions restore scroll to top instead of inheriting previous scroll position.
- **Local Chromium visual check:** Used the exact, successful `game-sp11d1-seated-office-preview` GitHub Actions artifact and rendered at 1366×768 and 1856×825. On both, the menu and office scene, full title/heading, character faces, desk, dialogue and playback buttons were within the viewport with document scroll height equal to viewport height. The 1280×720 office view also fits; a narrow 600px viewport retains intentionally stacked dialogue.
- **Release:** These are **preview-only** changes. Production on `main` remains unchanged. Final human visual assessment remains required before PR #12 is eligible to merge.

## GAME-SP1.1-D1B — Height-aware laptop preview (awaiting owner review)

- **Owner feedback (12 October 2026):** The real D1A office, characters and desk look good, but on a 14-inch laptop the scene is taller than the available browser viewport, requiring scrolling to view faces and playback controls.
- **Correction:** On desktop/tablet-width browsers, use dynamic viewport height to cap the **whole stage width while retaining the original 1672:941 artwork aspect ratio**. Compact the header and controls only while the office scene is active, and hide the nonessential footer while playing. Keep a minimum readable width in very shallow viewports; do not stretch, crop or independently resize any character or desk layer.
- **Preserve:** No changes to the approved art, 64-beat script, cutaways, playback logic or mobile layout (which intentionally stacks dialogue below the scene). The update remains on draft preview PR #12 and must be visually checked on the 14-inch laptop before a merge to `main`.

## GAME-SP1.1-D1A — Isolated foreground desk candidate deployed for review

- **Source:** Generated `OFFICE-FOREGROUND-01` candidate from this conversation, `office-foreground-01-candidate-v01.png`, staged in the project Drive asset folder (Drive file `1FuWnD1-srqK1albFH4gDd2D6xvjw-Qdt`). The owner requested an **in-game trial**, not final stand-alone art approval.
- **Asset import:** `generated-assets/manifests/office-foreground-01-v01.json` materialised `public/assets/generated/locations/office-foreground-01-v01.webp` through the established GitHub workflow. Transparency preservation is checked by the focused test.
- **Actual game:** D1 draft PR #12 now draws the approved office background, separate seated David/Stephen/Paul sprites, then the new independent alpha desk overlay, with live dialogue, controls and all cutaways above it. The CSS cropped-background foreground was removed. No script, expression, or pacing changes.
- **Next owner gate:** Review the real Cloudflare branch preview at desktop/tablet widths, including the desk-to-torso seam, lighting/style match, props and speech readability. Merge the game code to `main` only after approving the composited preview; maintain the existing live production otherwise.

## GAME-SP1.1-D1 — Seated office assembly preview (feature PR, awaiting owner visual review)

- **Implemented:** A single 16:9 approved `OFFICE-CLEAN-01` office stage, David-left/Stephen-centre/Paul-right transparent neutral seated sprites, and a separate desk-foreground copy of the background to keep bodies visually behind the tabletop. All four art WebPs were reused from verified asset PR #10 with matching provenance manifests on the short-lived preview branch.
- **Script and controls:** Existing complete seven-shot / 64-line intro, autoplay, Pause/Back/Next/Restart/Skip, save/resume and three cutaways remain. Reaction metadata is retained, but D1 **intentionally uses static seated sprites** until properly registered seated expression artwork is approved.
- **Responsive intent:** Live dialogue remains over the desk on wide screens, but moves below the artwork on narrow screens to keep faces visible. No flat infographic, baked dialogue or portrait-card images.
- **Qualification:** Targeted Node smoke plus Cloudflare `dist/` build and complete downloadable preview artifact via GitHub Actions. Human must assess actual rendered desktop/tablet appearance and timing. The GitHub/Cloudflare preview should be reviewed before the implementation PR merges to production.
- **No main deployment in D1:** Production is unchanged; clean visual approval is required before replacing the live office scene.

## Immediate correction: GAME-SP1.1-D1A — Foreground desk overlay (owner-approved)

- **Owner playtest (12 October 2026):** The D1 office composition with seated David/Stephen/Paul looks good, but there is an obvious seam/gap where the sprites meet the table. The current D1 CSS foreground is a clipped duplicate of the background and does not provide correct foreground depth.
- **Approved next task:** Create `OFFICE-FOREGROUND-01` as a **separate transparent desk/props overlay**, perfectly registered to the existing approved `OFFICE-CLEAN-01` background. It must show the desk front, tabletop edge, mugs/paper stacks/foreground plants only, no people or baked UI. Human-review isolated artwork **and** composite proof before asset import.
- **Implementation stream:** [Draft D1 PR #12](https://github.com/tametheboardgame/stephen-martin-project/pull/12) already contains the full playable scene. Replace its clipped fake foreground with the approved alpha WebP; keep the three transparent actors, full seven-shot/64-line dialogue, cutaways and playback functionality unchanged. Do not patch with CSS-only actor resizing.
- **Validation:** Cloudflare branch preview, desktop/tablet layering review, no horizontal seams/double foreground objects, no floating torsos and no occluded faces or illegible captions. Owner sign-off required before merging game presentation to `main`.
- **Deferred:** Aligned seated expressions, faster timing and 1×/1.25×/1.5× speed UI, and refined cutaways remain later GAME-SP1.1-D slices. Production still uses the earlier playtest until the revised office scene is approved.

## Immediate next: GAME-SP1.1-D1 — Office scene assembly preview

- **Owner approval 12 October 2026:** Assemble a playtest of the **full existing office intro** using the approved `OFFICE-CLEAN-01` background and three independently layered **neutral seated sprites**, replacing the oversized portrait cards. Stage **David left / Stephen centre / Paul right** behind the foreground desk; retain functioning dialogue and controls.
- **Verified asset dependency:** [PR #10](https://github.com/tametheboardgame/stephen-martin-project/pull/10) is **open/draft and not merged to `main`** at the time of this plan. Its owner-approved four WebP assets have materialised successfully from Google Drive. Resolve the asset PR before/in the D1 implementation PR without overwriting production prematurely.
- **D1 only:** Build the layered office, use static seated neutral actors, preserve all 64 existing dialogue beats, scene flow, cutaways, autoplay/Back/Next/Pause/Skip/Restart and save/resume. Produce a real Cloudflare branch or downloadable browser preview and check desktop/tablet framing. No new art required.
- **Later:** After D1 layout feedback, solve correctly aligned seated expression swapping, improve default comedy pacing/1×–1.5× speed control and refine the cutaways. Preserve the 18 approved expression assets; do not splice their mismatched portrait crops directly over seated sprite heads.
- **Merge gate:** Do not change live `main` game presentation until the owner has visually approved the D1 playable preview. Do not begin GAME-SP2 or grow the overall 15–25-minute scope.

## GAME-SP1.1: Opening polish pass — office-scene rebuild is next

- **Production checkpoint:** The autoplay/expression/cutaway implementation was merged via [PR #8](https://github.com/tametheboardgame/stephen-martin-project/pull/8), squash commit `a7890b1b22bd75776480a67c80d9a25902ebadb7`, expressly to allow owner testing on Cloudflare Pages. It is a **playtest build, not visually accepted**.
- **Owner feedback 12 October 2026:** Current portrait-card staging is a mess: oversized faces are too low, partially overlapping and inconsistently cropped; dialogue/scene transitions feel too slow. The owner approved **replacing** the entire card-based composition with the proper illustrated in-office scene rather than patching individual CSS positions.
- **Next implementation:** **GAME-SP1.1-D — layered office scene**, now explicitly specified in `ROADMAP.md` and `docs/story/GAME-SP1.1-VISUAL-PRODUCTION.md`. Start with **OFFICE-CLEAN-01**, a no-people, no-text fictional office environment for individual visual approval. Then build separate aligned Stephen/David/Paul body and expression layers, reposition editable dialogue and transport, shorten pacing with 1×/1.25×/1.5× options, and refine three independent cutaways.
- **Assets to reuse:** All 18 approved Stephen, David and Paul expression WebPs already exist under `public/assets/generated/characters/expressions/`; preserve source provenance and do not discard those assets. New character/office art must be human-approved and imported by Google Drive manifests.
- **Architecture:** Keep environment, actors, live dialogue, interactive controls and props as separate layers. The approved infographic is a **visual guide**, not a game background or a replacement for interactive UI.
- **Constraints and review:** Do not start GAME-SP2, expand the game engine or touch the three ending routes during this package. Build in short-lived `agent/*` PRs and verify real desktop/tablet playback. Owner signs off the actual preview before merging the office rebuild. `main` continues to host the existing version in the meantime.

## Operating notes

- Keep changes small and reviewable in short-lived feature branches.
- Do not turn this into another large/complex game; target 15–25 minutes with no unapproved scope creep.
- Song may run in parallel; comic pilot is optional.
- Production/public publishing requires separate owner permission.
