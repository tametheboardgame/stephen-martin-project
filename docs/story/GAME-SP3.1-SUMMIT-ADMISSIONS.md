# GAME-SP3.1 — The Summit Admissions Test and Ending A

**Started:** 15 October 2026
**Branch:** `agent/game-sp31-summit-admissions` (stacked on the unmerged GAME-SP3.0 PR #27)
**Status:** Playable code and dialogue complete, pending CI, visual review and new artwork approval.

## Scope

This is the first route-specific playable vertical slice. Only the committed `cult` route reaches the Summit puzzle and Ending A. The Office of Ceremonial Misunderstandings and Total Renewal Spa stay at their SP3.0 clearly marked handoff gates until SP3.2 and SP3.3.

## Implementation

- Added `src/summit-data.js` containing three approved, untimed, three-card admissions rounds. Each wrong option has a short joke and retry, with Paul offering the correct reasoning after two mistakes. Mistake counters cap at four and reset each round.
- Round 1: present a phone charger, not a vase or airline ticket. Round 2: compliment the chairman's legs, not a spreadsheet or service ticket. Round 3: announce Stephen's return flight, not a rescue or new membership.
- Correct choices complete exactly one shared progress step and require the player to confirm the comic response before the next round. Saved `summitResponse` holds only the current round/choice ID for repeat-safe feedback; existing `rescueProgress` checkpoints and V3 local save key remain intact.
- All three correct steps unlock the original approved Ending A dialogue, followed by the 'HEAVEN WAS A PLACE ON EARTH' end card, David's failed humility application stinger and the shared replay/restart/menu summary.
- New CSS-only provisional Summit setting and text sash provide functional desktop/tablet/touch layout without inventing a production scene illustration. No new generated or externally sourced character artwork, voices, network calls or tracking.
- Existing hotel deduction, irreversible route choice during an individual playthrough, previous voice audio and the other two future mini-games remain unchanged.

## Owner visual-art gate

This preview deliberately **does not claim finished scene art**. Before GAME-SP3.1 is considered visually complete, approve separate environment illustrations (Summit gate, chairman throne ending) and any new poses needed for Stephen, David, Paul and the gatekeeper. Keep the established art provenance workflow and review art individually. Do not invent, flatten or commit unapproved image composites. A purely typographic functional preview is available for logic/pacing review first.

## Acceptance

- All 3 routes still reach their own correct briefing; only Summit has live admissions choices and an ending.
- All 9 choices offer valid responses. After 2 wrong answers Paul gives a hint. No wrong answer creates a fail state, reroutes the story or skips a round.
- 3 correct answers with explicit acknowledgment lead to each approved Ending A line, end card, and shared summary.
- Back to briefing, menu/Continue in the middle of a round or dialogue, double-click guards, replay Great Wall checkpoint and fresh Start operate correctly. Other 2 routes remain non-playable.
- Verify laptop and touchscreen sizing and human joke pacing, plus GitHub CI. Merge only after owner approval and upstream GAME-SP3.0 qualification.

**Out of scope:** SP3.2 stamp puzzle and Ending B; SP3.3 display assembly and Ending C; new image/voice generation; real physical or violent content; production publish without gate.
