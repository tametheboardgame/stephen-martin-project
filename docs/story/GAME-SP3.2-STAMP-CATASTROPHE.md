# GAME-SP3.2 — The Great Stamp Catastrophe and Ending B

**Started:** 15 October 2026
**Branch:** `agent/game-sp32-stamp-catastrophe`
**Base:** SP3.1 draft branch `agent/game-sp31-summit-admissions` (stacked on unmerged SP3.0). Do not merge to production outside the approved sequence.
**Status:** Functional preview and test qualification. All artwork remains deliberately provisional.

## Bounded scope

Second playable route only: the fictional `detention` incident at the **Office of Ceremonial Misunderstandings**. Preserve the 15–25-minute full-run goal, no real-world government procedures, no timers, no actual legal knowledge and no fail state. This game must not affect Summit or the still-unbuilt Total Renewal Spa.

## Implemented mechanics

1. **Reason for Visit:** three selectable cards. Correct: `To retrieve a person we accidentally classified as missing`; wrong choices give a joke and retry.
2. **Bear picture classification:** choose `Unsolicited comedy stationery`; wrong answers remain harmless.
3. **Find the APPROVED stamp:** inspect three locations. Only **Paul's takeaway drink** reveals the stamp he was using as a coaster. Once found, select the stamp then tap the release permit; alternatively drag the stamp onto the permit with a mouse. The click/select flow is the touch and keyboard-accessible equivalent.

The shared SP3.0 `rescueProgress` is retained for checkpoint and hint-after-two logic. `detentionResponse`, `detentionStampFound` and `detentionStampSelected` in the existing V3 save key remember exactly which step and interaction to resume. Wrong choices and repeated attempts cannot skip stages; correct answers require acknowledgement. Stage three issues `APPROVED: ALL OF YOU PLEASE LEAVE`, then plays the complete accepted Ending B dialogue, end card and David's framed certificate stinger.

The existing Summit remains playable with Ending A. The spa route remains a clearly labelled future puzzle. No additional art, generated voices, third-party APIs or infrastructure were added.

## Artwork handoff to the later visual phase

- Fictional office counter/backdrop and paper mountain, counter printer and large, visibly fictional forms.
- A cartoon bear document, a separate takeaway cup hiding a distinct APPROVED stamp, and a release permit drop area.
- Stephen sitting unharmed in a waiting room; matching David and Paul poses as required by the ending.
- Comedic printer confetti, final `PLEASE LEAVE` certificate and a framed certificate stinger.

Only text and CSS provisional presentation is in the functional build. The owner explicitly requested completing all three functional routes before separately approving artwork. Do **not** generate or commit art during SP3.2.

## Acceptance

- Route B can be reached through the approved office → holiday → alarm → hotel deduction and route briefing.
- Three no-fail stages and unique wrong feedback; after two wrong choices Paul offers a meaningful hint.
- Last stage cannot finish by clicking the permit before finding/selecting the stamp. Tap/select and mouse drag paths both work. No required drag gesture, hidden hotspots or timed input.
- Save/Continue preserves form stage, mistakes, discovery, stamp selection, correct response awaiting acknowledgement, ending dialogue position and final summary; wrong route saves cannot unlock this ending.
- No changes to previous Summit ending, spa handoff, existing recordings, or Stephen's immutable route commitment.
- Verify GitHub smoke, all 55 original MP3s, branch Cloudflare preview, actual desktop/touch behaviour and owner functional sign-off. Keep this PR stacked and draft until explicitly approved.
