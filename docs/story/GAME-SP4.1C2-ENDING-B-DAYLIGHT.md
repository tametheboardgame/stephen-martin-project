# GAME-SP4.1C2 — Ending B daylight and legibility

**Started:** 18 October 2026 · Branch `agent/game-sp41c2-ending-b-daylight` from the approved SP4.1E merge `827610da9edb69a00ba970e3e60e6bb30c41e151`.
**Tracked issue:** [#56](https://github.com/tametheboardgame/stephen-martin-project/issues/56).

## Problem / root cause

Owner observed Ending B's bureaucratic-office setting was substantially darker than the approved original. This is the same class of visual regression as the formerly over-dark Summit entrance, corrected in GAME-SP4.1C.

The shared background rule near the original GAME-SP4B implementation combined the approved `ending-b-bureau-office-v01.webp` with an extra full-frame navy gradient. The gradient was applied to **all three** Ending B visual stages:

1. Route introduction / briefing, controlled by `#rescueRouteIntro[data-ending-b="true"]`.
2. Permit/stamp mini-game, controlled by `#rescueMiniGameScene[data-route="detention"]`.
3. Ending B final dialogue, controlled by `#detentionEndingScene`.

Even though the stage art was approved in its original colours, the overlay darkened the entire hall.

## Bounded correction

Remove **only** the full-frame gradient from that shared Ending B rule. Show the existing approved room background at `center/cover no-repeat`. Keep all existing title-block backplates, white paper dialogue cards with external blue name tabs, form background, progress strip and staged foreground actors.

The previously approved Summit daylight correction in GAME-SP4.1C is the reference design pattern, not a target of this change.

**Not in scope:** character art/positions, permit art, puzzle interaction or responses, sound/voices, save state, other routes, new transition illustrations, or new shade overlays. No generated assets are needed.

## Verification and owner gate

- Run the complete existing `npm run verify` suite and a regression test that confirms all three stage selectors use the original background without an added dark gradient.
- Check **briefing, form 1/2/3 plus stamp, and Ending B finale** in the genuine Cloudflare branch build. Inspect at desktop (1366×768), tablet (800×1280) and mobile (390×844).
- Confirm the room looks lighter while the high-contrast separate title/dialogue/form surfaces remain readable; confirm no actors/controls are masked, shifted or resized.
- Confirm Ending A remains bright, Ending C remains unchanged and the three routes still work.
- Keep PR draft until explicit owner visual sign-off; only then merge into `main`.

## Roadmap continuation

After this short lighting correction, return to **GAME-SP4.1F** dedicated illustrated transitions, which require new concept/asset approval.
