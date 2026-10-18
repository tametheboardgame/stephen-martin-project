# GAME-SP4.1 — First-version game-wide refinement audit and delivery plan

**Audit date:** 18 October 2026
**Code baseline:** `main` merge commit `d3d7534415c75d029072a31ede9fdde7de5130b4`, PR #46 merged (Ending C), after earlier Ending B PR #44
**Workstream branch:** `agent/game-sp41-v1-polish-audit`
**Assessment type:** source, generated-asset inventory, CI and prior owner playtest/screenshot review. **Not** a new interactive full-playthrough or browser screenshot audit.
**Status:** first-pass inventory and prioritised implementation plan, for owner approval before code/asset production
**Goal:** finish a compact, polished **15–25 minute** three-ending comic adventure without adding locations, branches or complexity.

## 1. Baseline qualification and important caveats

- PR #46 merged into `main` at `d3d7534` following owner acceptance of the four-actor Ending C finale. The final branch CI passed **132/132** automated tests and packed **20/20 Ending C assets**. Ending B's approved paperwork and standing official were already merged via PR #44.
- Repository currently holds **100 WebP assets (~19.1 MB of source files)** and **112 dialogue MP3s** currently permitted and present (55 office including exterior intro, 25 Stephen holiday, 10 rescue alarm and 22 visitor-information clips); two separately permitted song MP3s are also present. These are repository counts, **not measured page-transfer or startup metrics**.
- Static page `index.html` declares **23 image preloads**, **41 eagerly loaded image elements**, no lazy-loaded images, and no dedicated loading/progress overlay. Some images may be browser cached; it would be incorrect to claim that all 19.1 MB downloads on every load without network traces.
- App is static HTML/CSS/JavaScript with one main renderer in `src/game.js` (about 2,381 lines), `src/styles.css` (about 4,035 lines and 72 media-query blocks) and a single large Node test file. Keep this stack. Avoid a framework migration, new state manager, wholesale CSS rewrite or invented animation subsystem.
- Approved art must stay **independent** from HTML speech/choices/controls; original PNGs remain in the established Drive staging folder with approved manifest conversions to WebP.
- Current user feedback: opening images paint progressively; David changes apparent size in **Chapter Three, Back in England**; Summit entrance too dark; dialogue cards move to the blue footer after a choice; active speaker glow missing from most scenes; transitions are visually plain; more expressions/movement desirable. Ending C's residual blank mounting-slot shapes are an **explicitly deferred** visual-polish item, not a reason to reopen completed art.
- Review of each scene at actual viewport size, on a laptop/tablet/phone and with voice on/off, is still needed. **Source evidence is not a substitute for observing load, brightness or character position.** Record before/after screenshots and timings in each implementation PR.

## 2. Evidence-backed issue inventory

### V1-01, P0, loading presentation and image scheduling (owner item 1)

**Evidence:** `index.html` has 23 image preloads (including later Chapter Two locations and alternate expressions), 41 `loading="eager"` images across mostly hidden scenes, and no initial loading layer. `src/game.js` handles audio load/fallback but has no comparable scene-aware `Image.decode()` or visual gate. The owner reports visible line-by-line painting at startup.

**Likely contributors, to verify:** over-eager network prioritisation, hidden scene images competing with opening art, transparent assets composited before all required image decodes, changing `src` to an alternate expression not yet available.

**Fix direction:** a modest, accessible **opening loading overlay** covering the stage until *the current* opening location, its actor sprites and the desk foreground are decoded or have timed out. Use a progress/status message, avoid fake percentage promises, retain keyboard accessibility, offer fallback/continue on individual load failures. Keep immediate opening images high-priority; remove speculative preloads of remote future locations; preload/decode the **next** scene and voice clip after the current scene is stable. Do not block the opening waiting on all endings. Prioritise measured results over an elaborate progress animation.

**Acceptance:** cold-cache laptop and throttled-network recording shows no half-painted opening, no permanent black/loading screen on a missing file; resume loads only its required scene; no new hidden-scene fetch burst; screen reader hears status; overlay clears correctly on restart/resume/switch route. Track first usable frame and bytes before/after.

### V1-02, P0, David changes apparent size in Back in England (owner item 2)

**Evidence:** `src/game.js` `renderHoliday()` rescue-alarm branch swaps `#rescueAlarmDavid.src` on each beat from `rescuePortraits.David` (neutral/serious/confident/frustrated/systems-expert, etc.). CSS `.rescue-alarm-actor` uses `height:79%;width:auto;max-width:42%;object-fit:contain` with mobile variants; the opening has a separate established seated-expression calibration. Different approved WebP content bounds/transparent margins can produce an apparent changing head/torso scale even with unchanged CSS height. User has visually confirmed the jump.

**Fix direction:** examine each existing approved source's intrinsic canvas and **visible alpha bounding box**, define a stable scene-space visual anchor and per-expression crop/registration (or prepare visually identical canvas WebPs via approved manifest revision), and swap `src` inside a consistent actor slot. Preserve facial identity, expression intent, desk layering, foreground overlap and voice timing. No blanket scaling by file dimensions; prevent crossfade silhouettes.

**Acceptance:** record a reference still for all ten `rescue.alarm.001–010` beats, compare David's head size, eyeline, shoulder position and baseline with opening neutral. Beat-to-beat active pose must not visibly grow, shrink or jump at laptop 1366×768 and small viewport. No change to Paul.

### V1-03, P0/P1, Summit entrance contrast (owner item 3)

**Evidence:** `src/styles.css` `#rescueRouteIntro[data-route="cult"] .rescue-route-intro-stage` combines the approved `summit-entrance-v01.webp` with an explicit dark `linear-gradient(...rgba(5,22,41,.52)...rgba(4,20,37,.32))` over the **entire** illustration. Owner reports dim artwork.

**Fix direction:** remove or substantially lighten *scene-wide* darkening. Maintain contrast using a compact localized scrim **behind text only**, leave the entry scene/actors bright, and check the admissions UI separately. Do not regenerate the owner-approved entrance or change sprites just to fix overlay styling.

**Acceptance:** side-by-side before/after same line at laptop/tablet, approved scene colours visible, title and dialogue readable, actors distinct from background. Brightness change scoped to Summit, not throne room/other routes.

### V1-04, P0, dialogue/choice response presentation consistency (owner item 4)

**Evidence:** `index.html` has separate dialogue containers `#dialogueBox`, `.wall-dialogue` in holiday/alarm/hotel, `#routeIntroDialogue`, and `.summit-ending-content`, `.detention-ending-content`, `.assembly-ending-content`; but `#wallResult`, `#palaceResult`, `#marketResult`, hotel resolution/feedback and other post-choice outcomes live in `.wall-action-strip`/result panels. `renderHoliday()` hides the named dialogue at the decision and displays a distinct result container. This matches the owner-observed switch to the blue bar.

**Fix direction:** one **shared speech-card visual contract** across scenes: clear speaker name, consistent white/paper bubble on an accessible scrim, typography, responsive area and fixed depth over actors. Keep decisions/options and navigation in the toolbar or their own controls, **never use the action footer as a substitute for spoken dialogue**. Map successful/declined reactions and wrong-guess lines back to a named speaker bubble when they are actual dialogue; distinguish narration/status/hints from a person's speech. Use small template/render helpers while preserving existing IDs and gameplay logic. Avoid a wholesale DOM replacement that breaks saves/tests.

**Acceptance:** visual matrix for opening, Great Wall pre-/post-choice, Palace pre-/post-choice, Market, Back in England, hotel/clue/feedback, three route briefings and three endings. Consistent speaker attribution/colour/placement, no clipping or competing footer text at 1366×768 and tablet; choices still wait for input; narration has its own labelled treatment.

### V1-05, P1, speaker focus across *all* scenes (owner item 5)

**Evidence:** `renderOffice()` toggles `.is-speaking` and `.is-listening`, and CSS `data-speaker` glows are defined in Summit entrance and some ending tableaux. `renderHoliday()` sets `data-speaker` only for route intro and the three ending scenes. No equivalent consistent active-speaker highlight for Wall, Forbidden City, Night Market, rescue alarm, hotel or non-ending scenes.

**Fix direction:** a single small `setActiveSpeaker(scene, speaker)` adapter or per-scene data mapping, sharing the **same restrained glow** (drop-shadow/backlight or equivalent), optionally dimming listeners *slightly* without obscuring faces. Map characters by existing speaker IDs, respect narration/choices/no active speaker, and handle hidden/entering people without sudden motion. Support the separate taped cardboard Stephen. Do not add movement to this package.

**Acceptance:** every dialogue turn lights the actual speaking actor when one is visible, and never flashes the wrong actor; active glow clears for narration, puzzles, paused/hidden characters, and on route changes; reduced-motion users retain a non-animated state. A single named style token prevents scene divergence.

### V1-06, P1, transitions lack dedicated illustration (owner item 6)

**Evidence:** `#chinaIntermission`, `#chinaRouteHandoff`, `#rescueTravelScene`, `#rescueHubArrival`, `#chinaFinalEngland`, some paper-permit/ending cards are currently largely HTML/CSS title cards or symbols. Chapter Two has one approved image transition; other comparable beats do not. Owner wants proper transition visuals.

**Fix direction:** use 3–4 **bounded** illustrated cards, each a still background with live/accessible heading and optional modest crossfade: (a) time passing/Stephen holiday montage, (b) England-to-China rescue flight/utter lack of planning, (c) destination handoff (reusable frame/route accent for three outcomes), (d) chapter/end title card polish if genuinely needed. Prefer shared assets/layout where possible. Use the approved illustration style, no baked dialogue, owner visual approval and standard Drive manifests. Keep each hold brief; do not extend total runtime.

**Acceptance:** no bare CSS-only montage in primary story transitions; phone dead-battery/Back in England beat remains coherent; branch destination labels match route, all three endings unaffected, timing fits the 15–25 minute target. Intro fallback until next card art decoded.

### V1-07, P2, expressions and restrained movement (owner additional idea)

**Evidence:** the opening already has six David and six Stephen seated acting options plus three Paul options, with approved WebPs; later scenes often use one standing pose per person and speaking highlights only. Movement/transition CSS exists but is inconsistent.

**Fix direction:** start with **reaction cue coverage** using existing approved expressions and simple pose-specific nudges where supported. Then create a **small, owner-approved** set of scene-specific alternate poses for a few high-value jokes (e.g. hotel deduction, surprise at the Summit, cardboard standee's first powered beat), not complete animation libraries. Keep replacement image canvas/eyeline/body heights registered. Use sparing 150–250 ms CSS expression crossfades or two-frame holds **only where tested for ghosting**; avoid dancing actors and perpetual animations. Preserve `prefers-reduced-motion` behaviour.

**Acceptance:** reactions improve punchlines and never change a character's perceived stature. No expression swaps in the rescue alarm until V1-02 calibrated; approved source and provenance for every new image.

### V1-08, P1/P2, audio completeness and narrative timing

**Evidence:** build whitelist and repo contain **112/112 currently accepted dialogue MP3s** (55 office, 25 holiday, 10 rescue alarm, 22 hotel); the voice selector in `holidayVoiceBeat()` covers Wall/Palace/Market/final-message/alarm and hotel, but **not** route introductions, admission/paperwork/assembly responses or the three full  ending dialogues. Most ending dialogue presently uses text-timed autoplay. Two approved song files also exist. Existing upload guides mention old draft branches/old whitelist sizes and should not be treated as current operational truth.

**Fix direction:** a separate, nonblocking **voice continuation track**: first freeze the line-ID inventory and speaker, script and acting notes for all currently unvoiced scripted lines in three route intros, minigame feedback and three ending cutscenes. Owner records/uploads audio as available; extend the *explicit* whitelist and `holidayVoiceBeat()` only for approved stable IDs and files. Check pronunciation, filenames, missing-file fallback, volume consistency, clipping/gaps, subtitle exactness, autoplay pause/Next, and voice-off timing. Reconcile/retire obsolete upload instructions only after new canonical docs exist.

**Acceptance:** per-scene audio matrix states `voiced / text-only by design / recording pending`; no new mandatory recording blocks visual fixes; a missing MP3 does not stall/autoskip text; three paths finish even with all sound off. Do not generate voice audio or alter canonical text without owner approval.

### V1-09, P1, story navigation, accessibility and runtime

**Evidence:** `src/game.js` contains separate office/holiday pacing systems, many legacy scene-specific Next/Back controls, and a later common top-right holiday transport. `src/styles.css` contains roughly 4,035 lines with repeated overrides and 72 media queries. Previous Ending B/C owner screenshots caught tray scroll and overlapping modal layers despite green Node smoke. End-to-end timed human tests remain explicitly outstanding in previous documentation.

**Fix direction:** after visual work, a bounded visual and functional regression matrix, not a new UI framework. Check toolbar collisions with titles, hotspot focus/touch target size, overflow, dialogue legibility, keyboard/screen-reader speaker announcements, subtitles, stale `loading="eager"`, save/resume at every phase, tab-hide/autoplay, and the complete branching outcomes. Remove **proven unused** rules/obsolete buttons only after mapping their IDs in tests. Update HTML page title and `README.md` from stale `GAME-SP1 Office Preview` claims to actual first-version status as a low-risk documentation/metadata task.

**Acceptance:** no unreachable passage or dead-end; all three routes successfully reach their correct final scene and replay, keyboard/touch alternative works for all 13 assembly parts and stamp, mobile fallback can scroll intentionally without nested laptop scrollbars, accessibility is retained. Time three full playthroughs and confirm first route selected falls in 15–25 minutes **or** record a precise authorised pacing adjustment.

### V1-10, P2/deferred, approved Ending C geometry

The owner explicitly accepted the functional Ending C assembly and elected to return to its remaining mounting-slot alignment later. Keep it in the polish backlog; do not destabilise its six slot IDs or reverse the now-correct anatomical mapping. Revisit only with before/after registration guides for the cardboard source art and placement hit areas. Keep an explicitly bounded CSS/art alignment patch; no second complete puzzle rebuild.

## 3. Proposed ordered work packages

| Package | Priority | Scope and dependency | Release/check gate |
| --- | --- | --- | --- |
| **GAME-SP4.1A: Loading and asset priority** | P0 | V1-01, remove wasteful preloads, decode current scene, load status overlay and fallback, next-scene warm-up only | Cold-cache/slow connection; resume; failure recovery; no image painting |
| **GAME-SP4.1B: Back-in-England David calibration** | P0 | V1-02, compare exact authorised expression sources; register pose canvases and CSS anchor; no changed faces | 10 alarm frames match height, eyes, desk baseline at laptop/mobile |
| **GAME-SP4.1C: Summit lighting correction** | P0 | V1-03, scope global gradient to text scrims | Approved entrance art bright/legible, other endings unchanged |
| **GAME-SP4.1D: Shared speech bubbles and post-choice responses** | P0 | V1-04, canonical character speech card and narration/choices separation; foundation for E | Named bubble before/after every choice across Chapters 1–4 |
| **GAME-SP4.1E: Speaker backlight** | P1 | V1-05, depends on D's speaker mapping/scene contract; no movement | Accurate glow across all scenes and three endings |
| **GAME-SP4.1F: Transition illustration** | P1 | V1-06, artwork human gate; implement in small independently reviewed batches | Approved assets, live captions, no excess time added |
| **GAME-SP4.1G: Selective reactions and expressions** | P2 | V1-07, depends on B (pose stability) and E (speaker focus) | Owner-approved expression variants, no resize/jitter, reduced-motion |
| **GAME-SP4.1H: Voicing and sound pass** | P1 parallel | V1-08, user-provided ElevenLabs clips; nonblocking to A–G | Sound matrix and controlled uploads; text fallback for gaps |
| **GAME-SP4.1I: Final compatibility, timing and release candidate** | P0 final | V1-09, after A–H approved or explicitly deferred | 3 fully timed human routes, viewport/accessibility/playback QA, provenance/privacy review |
| **GAME-SP4.1J: Deferred assembly-slot geometry** | P2 deferred | V1-10; schedule only after owner acceptance of polish work | Correct mapping retained, shape alignment approved, no puzzle regressions |

**Suggested first development stream:** A, then B and C as independently mergeable corrections, then D/E as a linked dialogue-design pass. F and H may proceed alongside code work **only** if their assets/audio are supplied/approved. G should follow an approved stable actor framework. Run I against merged `main`, not a stack of unreviewed feature branches. J is deliberately last.

## 4. Shared conventions to avoid another round of inconsistent fixes

1. **Stage geometry:** location art, independent actors, foreground props, actual speech card, interaction controls and transport are conceptually separate layers. Declare a consistent z-order, fitting rules, safe zones and desktop/mobile breakpoints, rather than repeated unrelated patches.
2. **Speaker semantics:** only actual spoken dialogue gets the named bubble and corresponding visible-actor focus. A narrative card, evidence panel, choice list, puzzle hint and gameplay status each keep a deliberately different treatment; do not change semantics only to make colours match.
3. **Asset readiness:** present only fully decoded current-scene artwork; a small load failure must not deadlock the story. No unnecessary eager-loading of all future branches.
4. **Expression registration:** keep all approved source faces; compare alpha bounds/pupil and shoulder landmarks and document stable transforms for each actor. No accidental height drift on an expression change.
5. **Animation discipline:** once-per-line subtle focus and intentionally brief entrance/reaction transitions; no constant movement or heavy animation loop; respect reduced-motion.
6. **Testing and approval:** each bounded change requires a branch preview from its exact SHA, focused Node regressions and human laptop/tablet appearance approval. Keep `main` stable; no public marketing/release without separate owner approval. Avoid arbitrary test count growth where one clear contract test suffices.

## 5. First-version release acceptance checklist (final packet I)

- [ ] Cold, normal and cached starts: deliberate splash/load state, no partial scene and no permanent wait, save/resume as expected.
- [ ] Each approved character looks consistent throughout all tested expression swaps; no David size change in Back in England.
- [ ] The Summit exterior uses the intended daylight colours, with readable live UI.
- [ ] All spoken lines, including choices' immediate responses, have a coherent named bubble, not ordinary text stranded in the dark transport bar.
- [ ] Active speaker highlighting works in all scenes, including real Stephen versus taped cardboard Stephen, without moving/scaling actors.
- [ ] At least the agreed main transitions have approved art, legible titles and brief suitable timing; no route divergence mistakes.
- [ ] Every approved recorded line, sound control and text-only fallback is tested; unresolved voice recordings visibly listed and consciously deferred.
- [ ] Story autoplay never auto-selects, auto-stamps or assembles a puzzle; Pause, Next, save/resume, replay and tab hide behave properly.
- [ ] Desktop 1366×768 / 1440×900, tablet ~800×1280 and mobile ~390×844 visually checked, with no cut-off actors or unintended nested laptop scrollbars.
- [ ] Three full timed routes each meet 15–25-minute target or receive a bounded, approved adjustment.
- [ ] Accessibility: named dialogue and focus, 44px touch targets where applicable, contrast, reduced-motion, keyboard/select-tap equivalence.
- [ ] All reused/new art has an approved source/manifest; privacy/fictionalisation review and public-release gate honoured.
- [ ] `README.md`, browser title, `STATUS.md`, `DECISIONS.md`, `ROADMAP.md` and active audio guide match what actually shipped.

## 6. Next action

Get owner's agreement to the package order, then start **GAME-SP4.1A** in a fresh short-lived implementation branch from the approved `main` merge `d3d7534`. No game code or artwork changes are authorised by this documentation-only audit PR. Update this plan with observed screenshots/network timing and state which problems are fixed versus still awaiting visual approval. Keep legacy planning records as historical rather than rewriting them as current truth.
