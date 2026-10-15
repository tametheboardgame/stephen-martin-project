# GAME-SP2.4–SP3.4 — Shared Rescue, Three Mini-Games and Endings (Approved Plan V1)

**Decision date:** 14 October 2026
**Status:** **Owner-approved implementation plan; implementation NOT started.**
**Planning authority:** current mutually exclusive Chapter Two branching in `docs/story/GAME-SP2.3C-BRANCHING-STORY-V2.md` + previously approved plot, puzzle rules and ending scripts in `docs/story/SP-WP1.2-GAME-TREATMENT.md`. This plan sequences that canon and does not replace the approved dialogue with new unreviewed writing.
**First-play budget:** 15–25 minutes including one route; ideal ~19–21 minutes. Do not expand into three full campaigns.

## 1. Definitive end-to-end flow

```text
OFFICE-INTRO (the existing 67-beat, 55-MP3 opening)
  -> STEPHEN HOLIDAY (approved Chapter Two, SP2.3C)
       | accept Great Wall's Summit -> route = cult
       | otherwise decline Great Wall -> A Few Days Later -> Forbidden City
           | accept banquet -> route = detention
           | otherwise decline -> The Next Evening -> Night Market
               | Stephen automatically takes 90%-off spa -> route = reassemble
  -> ROUTE-SPECIFIC INCIDENT HANDOFF
  -> ROUTE-SPECIFIC 1%-BATTERY MESSAGE, DEAD BATTERY, STEPHEN REACTION
  -> BACK IN ENGLAND / OFFICE-ALARM (shared)
  -> BRIEF UNNECESSARY TRAVEL MONTAGE (shared)
  -> RESCUE-HUB-01 / HOTEL-VISITOR INFORMATION (shared evidence puzzle)
  -> matching BRANCH-INTRO (route-specific, short)
  -> matching ROUTE-MINIGAME (one only per playthrough)
  -> matching ENDING-CUTSCENE / END CARD
  -> shared ENDING-SUMMARY / PLAY ANOTHER ENDING / RESTART / MENU
```

The incident handoffs at the end of SP2.3C are **temporary staging points**, not playable rescue scenes. Connect them to the existing final message and then the shared David/Paul rescue when implementing SP2.4. Stephen makes the route choice; the investigation may discover his destination but **must never change the locked route**.

## 2. Shared chapters before any mini-game

### GAME-SP2.4A — Office Alarm and unnecessary travel

**Goal:** Replace the present "rescue chapter coming next" end-card placeholder with an actual scripted OFFICE-ALARM scene after Back in England.

- Reuse the **approved generic office location** and appropriate, already-approved David and Paul actors, keeping the office's existing voiced opening unchanged.
- Show David interpreting Stephen's truncated route-specific message as a final transmission. Paul suggests the obvious explanation: Stephen's battery died. David insists there has been an international incident.
- Preserve the original approved OFFICE-ALARM dialogue and the running bear / printer joke from `SP-WP1.2-GAME-TREATMENT.md`.
- Short montage: wildly unnecessary tickets, luggage, upside-down map and Paul's suitcase of printer paper, then a fictional overseas hotel/visitor-information hub.
- **No extra navigable airport, city map, travel booking or real government procedure.** Reuse native overlays where possible.
- **Gate:** Owner approves the playable alarm, timing, David/Paul staging and handoff into the hotel hub before expanding assets.

### GAME-SP2.4B — Shared visitor-information rescue hub

**Goal:** One short evidence puzzle (about 2–4 minutes) played **as David**, with Paul alongside, before the chosen route mini-game.

- One fictional hotel lobby / visitor-information background: counter, noticeboard, brochure/kiosk, luggage, phone. Require owner approval of any **new source art**, staged through the established Google Drive → versioned manifest → WebP action, never direct source-PNG commits.
- Approved arrival dialogue: David talks of intelligence gathering; Paul notices the tiny hotel shampoos and conditioner.
- Three hotspots, available in any order: **phone message**, **fictional activities brochure**, and **visitor desk / notice or receipt**.
- Player identifies the destination matching the precommitted `route`: mountain/Summit, ceremonial badge/banquet, or cog/spa. This is **not a second story choice**. Correct guess works without checking arbitrary prerequisite hotspots.
- Wrong match = a short joke and retry, never a soft-lock or different route. After **two** incorrect attempts Paul offers a hint; after **four** the correct symbol is visibly highlighted.
- Correct selection leads to shared "We have our location" / "The brochure has a map" joke and a fast matching route-intro transition.
- **Gate:** all three clues readable, all three route matches resolve correctly, save/resume and mouse/touch work, no scrolling or overlapping panels on normal laptop size.

## 3. Route mini-games and matching scripted endings

Each route uses a **single short scene**, one interactive set-piece, the original approved ending lines and a shared ending-summary component.

### GAME-SP3.1 — Route A: The Summit Admissions Test (build FIRST)

**Route:** `cult` · **Target:** 4–5 minutes. **Location:** fictional adult mountain social club. **Route intro:** welcoming gatekeeper calls Stephen the radiant new chairman; David believes he is infiltrating a cult, while Paul points out they are standing outside.

Three no-timer, no-fail dialogue/object rounds. For each, present three readable cards, one answer and funny wrong-answer feedback. Paul gives clear reasoning after two wrong answers in a round:

1. **Offer a sacred object:** Golden vase / airline ticket / **phone charger**. Clue: all devices must stay charged; Stephen's phone died.
2. **Highest compliment:** "Your spreadsheet is compliant" / **"Great legs, your magnificence"** / "I'm here to raise a ticket".
3. **Declare your intention:** "Rescue Stephen" / "Join the club" / **"I bring news of the return flight"**. The club panics that Stephen might leave, opens the gate.

**Approved Ending A: HEAVEN WAS A PLACE ON EARTH.** Stephen sits perfectly content on a ludicrous throne in normal holiday clothes plus **TEMPORARY SUPREME CHAIRMAN** sash. He is not a hostage, has excellent company and has cancelled his flight. David wants to rescue him; Paul finds Stephen's reasons understandable. **Stinger:** David tries for a senior role and fails the humility question on the form.

**Implementation/acceptance:** full path OFFICE → cult → shared alarm/hub → all three admissions rounds → correct ending → replay. Proves engine and pacing before heavier UI.

### GAME-SP3.2 — Route B: The Great Stamp Catastrophe (build SECOND)

**Route:** `detention` · **Target:** 4–5 minutes. **Location:** entirely imaginary **Office of Ceremonial Misunderstandings**, not a real agency. **Route intro:** an official insists David needs a form; Stephen is unharmed in the adjacent waiting room, unsure if he is a guest or awaiting a speech.

Three successive fictional paperwork steps, with no timers or real knowledge prerequisites:

1. **Reason for Visit:** choose **"To retrieve a person we accidentally classified as missing"** over "International rescue operation" / "Meal deal inspection".
2. **Classify bear picture:** **"Unsolicited comedy stationery"** instead of "Top secret propaganda" / "Large yellow animal".
3. **Final APPROVED stamp:** inspect/tap **Paul's takeaway drink**; the stamp has been used as a coaster. Tap/select or drag the stamp onto the permit, including an accessible no-drag alternative.

Rejected choices bounce back with short dialogue. After two mistakes Paul provides an obvious clue. Completing the permit produces **APPROVED: ALL OF YOU PLEASE LEAVE** and a comedy printer flourish.

**Approved Ending B: DETAINED BY ADMINISTRATION.** Stephen was trapped in a bureaucratic queue after a cartoon bear meme entered his presentation, not kidnapped. David calls the successful paperwork a diplomatic extraction. The fictional official demands that nobody bring the printer; Paul admits it's still in his suitcase. **Stinger:** David proudly frames the PLEASE LEAVE certificate.

**Implementation/acceptance:** same route API and save-state patterns as Summit; correct stamp interactions work on mouse and touch with clear focus and generous hit targets.

### GAME-SP3.3 — Route C: Reassemble Stephen Martin (build THIRD)

**Route:** `reassemble` · **Target:** 5–6 minutes. **Location:** deliberately cartoonish fictional **Total Renewal Spa** and next-door promotional display workshop. **Route intro:** David panics over a catalogue of "Stephen Martin replacement parts"; Paul correctly suspects it might only be a named promotional cardboard display.

The set-piece is **not surgery or real bodily harm**. Assemble a **foam/cardboard Stephen-shaped model** with six clearly labelled silhouette slots: head, torso, two arms, two legs.

- Tray holds the six matching illustrated flat parts plus comic rejects: extra kidney(s), Wi-Fi heart, toaster, banana and an unidentified silly component.
- Correct placement snaps into the matching slot and plays a playful sound. Wrong placement returns the item with a short contextual joke and **never consumes it**.
- Every piece supports **drag-and-drop OR select piece → select slot** with keyboard/touch accessibility. Large targets; clear focus indicators. Highlight a slot after repeated errors.
- Save the six placed-part IDs and make placement idempotent across Continue/resume. Only six correct pieces unlock **POWER ON STEPHEN**.
- Finish with mannequin lights / deliberately over-the-top non-gory animation.

**Approved Ending C: SOME ASSEMBLY REQUIRED.** The real Stephen emerges completely unharmed in a spa robe after a treatment. David and Paul reveal that they've bought replacement organs and assembled a cardboard replica. Stephen is appalled that they came to "rescue" him from a massage. **Stinger:** cardboard Stephen says "Have you tried turning me off and on again?" and David treats it as a technical triumph.

**Implementation/acceptance:** complete controls on desktop/tablet and an alternative to precision dragging; all six positions persist; no gore, disturbing anatomy or counterfeit claims about any actual spa.

## 4. Reusable engine, state and ending summary — GAME-SP3.0

Build this **after SP2.4 and before the first route mini-game**. It is deliberately a *small component layer*, not a new game engine.

- Common route handoff, route-intro dialogue playback, `miniGameStage` progression, choice responses, two-wrong-answer Paul hint, completion and end-card/replay controls.
- `route` remains the one locked value from Chapter Two. Hub guesses and puzzle errors never mutate it.
- Keep the existing V3 local-save key; extend holiday/rescue save data with a narrow new progress version and scene enum, `hubMatched`, puzzle step/round, placed-piece IDs (where applicable) and cleared-ending IDs if useful. Migrate old saves, validate state and avoid resuming at a branch-specific scene with no route.
- Checkpoint at every major scene transition, every completed quiz/stamp step, every placed part and ending summary.
- **Play another ending** explicitly returns to the **Great Wall choice checkpoint** established in SP2.3C and clears only downstream branch state. **Play from start** restarts the office; **Main menu** retains valid Continue.
- Ending summary: three possible approved ending names, single active outcome, three buttons. An optional "1 of 3 unnecessary rescues discovered" counter is low priority; do not grow achievement systems.
- No accounts, server backend, external gameplay services, multiplayer or complex editor.

## 5. Order, dependencies and definition of done

| Sequence | Work package | Scope | Qualification gate |
|---|---|---|---|
| 1 | **GAME-SP2.4A/B** | Script and build OFFICE-ALARM / travel montage; approve fictional hotel lobby art; playable shared three-hotspot evidence puzzle | Correct destination without changing `route`; owner-approved staging and playable branch handoff |
| 2 | **GAME-SP3.0** | Minimal reusable step/hint/save/route intro and ending-summary shell | Resume and route invariants; no premature full-feature engine |
| 3 | **GAME-SP3.1** | Summit 3-card Admissions Test + Ending A | **First complete OFFICE → ENDING route**, playable and owner-reviewed |
| 4 | **GAME-SP3.2** | 3-stage fictional Stamp Catastrophe + Ending B | Second complete route; accessible stamp controls |
| 5 | **GAME-SP3.3** | Six-piece cardboard assembly + Ending C | Third complete route; keyboard/touch placement and persistence |
| 6 | **GAME-SP3.4** | Integration, missing-art/audio polish, cross-route regression, pacing and human playtests | 3/3 endings, no dead ends, 15–25 min first run, owner acceptance |

**Implementation sequence rationale:** Build the shared rescue once, then the simplest card-choice branch first to demonstrate a full game. Add paperwork interaction using those patterns second. Build the art- and pointer-intensive assembly puzzle last.

**Strict dependency:** Do not start implementing SP2.4 on top of an unreviewed or unstable branch without confirming GitHub and owner acceptance of the current SP2.3C visual flow. Keep subsequent work packages bounded, on short-lived draft PRs, with targeted CI and real preview links confirmed for the exact deployed commit. Do not merge to main without explicit approval.

## 6. Runtime and presentation budget

Target the previously approved treatment's pacing, adjusting after actual listening/playtesting:

| Segment | Guideline |
|---|---|
| Existing voiced office | ~3 minutes in treatment; measure actual 55 voice MP3s and player advance time |
| Stephen holiday / intermissions / phone | ~3–5 minutes on the experienced branch, may be longer after two declines; measure |
| Office alarm + travel | ~1 minute |
| Shared evidence hub | ~3–5 minutes including puzzle |
| Matching route-intro | ~30–45 seconds |
| One mini-game | ~4–6 minutes |
| Matching ending | ~1–2 minutes |

No player should have to play the three mini-games sequentially. If timings overrun, **trim pauses, repeated explanations and redundant clicks**, not the established punchlines. Dialogue and optional SFX may expand only with separate review, not by silently increasing runtime.

## 7. Visual production and UX gates

- Reuse the approved standalone character art for Stephen, David and Paul where it works; **new** facial/body variants require owner approval.
- Needed new location art, requested one background at a time: **fictional hotel/visitor-information hub** first; then **fictional Summit social-club gate/interior**; then **fictional ceremonial bureaucracy counter**; then **cartoon spa workshop**. Prioritise simple reusable backgrounds and HTML/CSS for forms, signs, cards and stamps. No unique generated image per spoken line.
- Reuse the existing 16:9 desktop frame and accessible narrow-screen reflow. Never bake dialogue/choice UI into painted backgrounds. Ensure all prop art is fictional with no private identifiers.
- Small visual proof/owner approval before art goes into the game; stage approved originals to dedicated Google Drive and materialise through versioned manifests.
- No mandatory dragging, exact timed movements, hidden hotspot guesses or unavoidable scrollbars on typical laptops.

## 8. Required verification and release conditions

- Route acceptance produces only the corresponding mini-game and ending; neither wrong hub guesses nor scene replay reroutes it silently.
- One accepted Summit invitation bypasses Palace/Market; declined Summit then accepted banquet bypasses Market; two declines lead to the unavoidable spa branch.
- From either a fresh game or Continue, all three routes reach their own correct summary card without a missing asset, dead-end or unhandled save.
- Save/resume during each hub interaction, each puzzle step, all six assembly placements, branch intro and ending summary. Legacy V3 preview saves remain valid where possible.
- Mouse, touchscreen and keyboard alternative for assembly/stamps; readable dialogue, subtitles and controls in laptop and tablet proportions.
- Check privacy, fictional framing and copyright-safe original artwork before release.
- Targeted tests for new logic; run broader build/smoke after integration; record real first-play timings and conduct owner human playthroughs for all routes.
- **No public/production deployment or main merge without explicit owner authorisation.**

## 9. Next action (planning only)

Begin **GAME-SP2.4A** with a bounded draft: lock the existing approved OFFICE-ALARM lines against the current real cutaway, plan the brief unnecessary-travel montage, prepare an owner-reviewable concept for the **fictional hotel/visitor-information background**, and avoid building the three mini-games until the shared rescue path is stable.

This document records an approved plan **only**; it does not claim that any of the rescue chapter, puzzle UI, mini-games or three ending cutscenes have already been implemented.
