# GAME-SP3.4 — Whole-game click audit and playback control integration

**Started:** 15 October 2026
**Branch:** `agent/game-sp34-autoplay-unified-controls` based on merged three-route `main`
**Status:** Functional navigation pass in draft; real-browser visual and pacing review required.

## Owner feedback and implementation choice

Owner liked all three playable rescue routes but observed that almost every scene required repeated **Next line** clicks, and that replay/change-choice buttons occupied many inconsistent places. The small integration response is to unify the story transport, **not** to replace the mechanics or expand scope. The office already has recorded-voice autoplay and its own transport; preserve it.

For Chapters 2–4:

- Default to text-paced automatic advancement in *scripted* passages: Great Wall/Palace/Night Market conversations, accepted invitation replies, intermission and route cards, Stephen's phone, office rescue alarm, travel montage, lobby introductions, hotel deduction success dialogue, route introductions and all three ending cutscenes.
- Autoplay is **always suspended at unanswered choices, clue inspection, wrong-guess retries, stamp search/placement, six-piece cardboard assembly and the earned final ending summary**. Correct mini-game answers can present their jokes for the full reading interval before entering the next step; the user can also skip.
- A persistent compact toolbar in the **same top-right position** provides `Ⅱ Pause`/`▶ Play`, `Next line →` when a timed action is available, **one** `Change route ↺` control once a choice is committed (labelled `Play another ending ↺` on the outcome screen), and `Menu`.
- `Change route` goes to the Great Wall checkpoint, retaining the opening story while explicitly clearing subsequent decisions, save-state progress and ending gates. Do **not** provide conflicting duplicate replay buttons in individual scenes. Keep historical IDs/events for existing saved-game/contract compatibility but hide these redundant buttons visually.
- Timed progression is disabled when the tab is hidden; returning never jumps forward without explicit Play/Next. Timers are invalidated whenever the scene is rendered, paused, navigated or restarted. The existing `V3` saved game and voice settings are unchanged.
- The default reading interval is text-length-based, bounded at roughly 2.6–8.5 seconds; title/montage/transition cards display for ~3.6 seconds. These are **initial** values to evaluate with human playtests rather than final approved pacing.

## Click audit

| Scene family | Previously | New behaviour |
|---|---|---|
| Office recorded dialogue | Voiced autoplay | Unchanged; still respects audio clip end |
| Stephen's holiday conversations | Next for every line | Auto until invitation choice; choice manual |
| Short story and travel cards | Continue on every card | Auto; Pause/Next available |
| Rescue alarm, hotel arrival | Next for every line | Auto; evidence hotspots manual |
| Hotel correct deduction | Next for every joke | Auto resolution; route remains immutable |
| Route introduction | Next for every line | Auto into mini-game |
| Summit admission/fictional paperwork | Three selectable answers | Manual answer, automatic success acknowledgement; wrong answers retry |
| Stamp and cardboard workshop | Select/tap or optional mouse drag | Unchanged, cannot auto-place or auto-power |
| Three endings | Next for each dialogue line | Auto until end-card/summary; manual replay |
| Replay in various chapters | Many inconsistent buttons | One persistent Change route / Play another ending |

## Qualification

- Verify Great Wall choice and Palace choice never become selected by autoplay.
- Inspect all three puzzles: no wrong response can advance; no stamp can be applied or cardboard model powered automatically.
- Verify all three full ending scripts can finish autonomously after earning the ending.
- Verify same-position controls and no overlap with the Great Wall phone, location badges, hotel clues, dialogue, or small tablet viewports; this is a **required browser visual review**.
- Test browser tab hiding, pause, Next, manual change-route action and Continue after a save.
- Do one timed full playthrough per branch against the **15–25-minute** target, considering read speed, voiced office duration and puzzle difficulty. The automated suite does not substitute for that human assessment.
- Catalogue visual/asset needs for SP4.0; do **not** generate images, adjust approved character likenesses or merge this branch without owner approval.

**Next after owner review:** merge qualified SP3.4; begin the dedicated SP4.0 art pass recorded in `docs/story/GAME-SP4.0-ARTWORK-PRESENTATION-PLAN.md`. Then perform the limited final polish pass SP4.1.
