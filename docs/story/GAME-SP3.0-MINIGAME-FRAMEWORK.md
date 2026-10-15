# GAME-SP3.0 — Shared route mini-game framework

**Started:** 15 October 2026
**Branch:** `agent/game-sp30-minigame-framework`
**Status:** Draft implementation, not approved for production.

## Scope and authority

This package follows the approved `docs/story/GAME-SP2.4-SP3-RESCUE-IMPLEMENTATION-PLAN-V1.md` and `SP-WP1.2-GAME-TREATMENT.md`. Keep the 15–25-minute total and one selected route per run. It implements shared state and route introductions, **not** any of the three route-specific mini-games or final cutscenes.

## Delivered

- `src/rescue-framework.js`: dependency-free contracts for `cult`, `detention` and `reassemble`; approved route-intro lines, eventual ending titles, and small pure progress functions.
- Normalised `rescueProgress` stored inside the existing local V3 key, with its own `version:1` and fixed `route`. Existing V3 saves remain readable; the new progress is created when missing. It cannot silently change Stephen's pre-committed choice.
- One-step-at-a-time route-intro dialogue shown after the hotel's approved deduction. The user can Continue from any line and view an honest, route-specific, explicitly unplayable mini-game gate.
- Shared wrong-attempt/hint rule after two mistakes, idempotent stage completion for the planned three-step choices, and six validated cardboard part IDs for eventual touch/keyboard assembly. These pure functions are for SP3.1–SP3.3 to call only after their UI validates answers; no gameplay is faked now.
- Ending summary view with the three accepted titles and replay/start/menu controls. Its scene can only display when validated same-route progress reports completion. Actual ending cutscenes remain scoped to SP3.1–SP3.3.
- Replay returns to the Great Wall decision checkpoint and clears all downstream branch progress; starting afresh restarts the voiced office.
- No generated art, extra voices, server services or large new game engine.

## Remaining work and human gate

SP3.1 implements actual Summit choices, Paul hints and Ending A. SP3.2 adds fiction-only stamps and Ending B. SP3.3 adds accessible labelled cardboard-piece placement and Ending C. Do not claim the game is complete based on the framework, or publish to `main` without a separate review of the route-intro preview.

Run `npm run verify`; check all three route intros, Continue after a spoken line, the unplayable handoff, replay, and responsive laptop/tablet layout in the branch Cloudflare preview. The final production merge needs explicit owner approval.
