# GAME-SP4.1D2 — Contextual safe story skips

**Started:** 18 October 2026 · `agent/game-sp41d2-contextual-skip` from D1 merge `2e8347b`
**Visual issue recorded separately:** Ending B's over-darkened background is now deferred as `GAME-SP4.1C2` in the roadmap. No lightening CSS or artwork belongs in D2.

## Before/after scope

Before: The office has a working top `Skip intro` button; later scenes have Pause/Next and Change route but no option to skip scripted stretches. The shared top controls, external speaker tabs, three routes, V3 saves and voiced timing are already approved. D2 adds exactly one top `holidaySkipButton` beside Next, with a label and atomic destination chosen from existing state.

## Navigation/checkpoint matrix

| Current scene state | Label | Landing state | Required manual gate |
|---|---|---|---|
| Office introduction | Skip intro (existing) | Chapter Two transition | Stephen's route choice still unanswered |
| China transition; Great Wall before choice | Skip to choice | Great Wall, all five scripted lines complete | Accept or decline Summit invitation |
| Great Wall after decline; transition to Palace | Skip to choice | Forbidden City after four scripted lines | Accept or decline banquet invitation |
| Great Wall after acceptance | Skip to investigation | Hotel after scripted journey and arrival | Inspect clues and deduce Summit |
| Palace before choice | Skip to choice | Palace decision awaiting input | Accept or decline banquet |
| Palace after acceptance | Skip to investigation | Hotel, route set to detention | Inspect clues and deduce banquet |
| Palace after decline; Market intermission | Skip to invitation | Night Market final mandatory acceptance | Head to pre-established spa route |
| Market before fixed acceptance | Skip to invitation | Final accepted offer (no invented branch) | Head to the spa route |
| Market after acceptance | Skip to investigation | Hotel, route set to spa | Inspect clues and deduce spa |
| Accepted route handoff; phone / message; Back in England; travel; arrival | Skip to investigation | Hotel after scripted opening | All clues and matching deduction remain |
| Hotel scripted opening | Skip to investigation | Three clue hotspots and destination options | No clue, guess or match is fabricated |
| Hotel incorrect voiced response/hint | Skip to investigation | Same unresolved deduction | Wrong-count retained, pending response cleared |
| Hotel correct deduction and spoken resolution | Skip to game | First unsolved puzzle in matching route | Three Summit checks, three forms/stamp or six cardboard slots |
| Each route's scripted briefing | Skip to game | Existing game progress (fresh on first arrival) | Every unanswered puzzle interaction |
| Any unsolved puzzle, unpowered cardboard kit, open clue, unmatched deduction or final summary | **Hidden** | No skip | Interaction cannot be bypassed |
| After full earned puzzle completion or in unlocked scripted ending | Skip to end | Matching summary with its ending step at canonical finish | Puzzle success already recorded, spa POWER ON required |

## Implementation details and safeguards

- A phase-specific `holidaySkipCheckpoint()` describes each allowable checkpoint; no bulk clicking Next and no automatic answer/stamp/cardboard manipulation.
- Clicking checks the checkpoint again against *current* state, cancels holiday timer and any playing/queued recorded MP3, atomically updates relevant phase/step, then persists/renders using the existing asset loader. The late-voice completion token is invalidated.
- The intended destination button receives focus when ready, including a deferred attempt after scene image readiness; invisible buttons are not focused.
- Keeps explicit Pause/Play, Next/Back, Sound On/Off, browser visibility and route replay semantics. No V3 schema change and no new asset, line or speech ID.
- Dialogue is optional to skip. The puzzle is never skipped; the ending summary is available only after successful completion in the existing state.

## Acceptance

- CI runs `npm run verify`, including each route's pre-/post-decision checkpoint, clue and game gating, pause, save/Resume, voice cancellation and late callback, three earned end summaries.
- Cloudflare branch preview is essential; owner visually reviews placement on laptop (1366×768), tablet and mobile.
- Verify menu wrap does not hide the name tabs, faces or puzzle options. Verify no control at unresolved choice, clue, game or final summary.
- Draft/unmerged until owner acceptance. Ending B dark-overlay follow-up remains deferred.
