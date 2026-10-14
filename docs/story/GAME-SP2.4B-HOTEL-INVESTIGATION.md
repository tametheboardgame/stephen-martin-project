# GAME-SP2.4B — Shared Visitor Information Investigation: playable slice

**Date:** 14 October 2026  
**Status:** Draft playable investigation, on stacked PR, awaiting owner in-game layout review and approved standalone full-body standing sprites for David and Paul.

## Accepted art

- Use only the **second, owner-approved** empty hotel lobby background, already staged through Google Drive and optimised at `public/assets/generated/locations/china-visitor-information-lobby-background-v01.webp`.
- Independently layered HTML buttons and dialogue provide all interactivity. Do **not** use any proposed composites with David/Paul, baked UI, speech balloons or tourist hotspot labels as art.
- Repo currently contains approved character **baselines and seated office variants only** for David and Paul; **no approved full-body standing hotel cutouts**. This increment avoids staging unapproved substitutes. Owner visual review of the complete scene awaits separate transparent full-body David and Paul approval, with the existing Drive/manifest pipeline and consistent Stephen China actor scale.

## Canon, interaction and implementation

After the SP2.4A four-card travel montage, the Visitor Information arrival card offers **Enter visitor information**. The following scene has eight approved arrival lines from `SP-WP1.2-GAME-TREATMENT.md`, with subtitle/click Next and an accessible UI. After the lines, evidence hotspots become available, without an arbitrary mandatory order:

1. **Stephen's phone** — his route-specific unfinished final text.
2. **Activity brochures** — three fictional destination names and symbols.
3. **Visitor information desk** — an invented circled receipt icon matching the committed route.

At any time after dialogue, a player may guess the destination. It is a **deduction**, not a new route decision: the earlier committed `route` is never changed by guesses.

- Wrong guesses produce the correct original jokes for whichever wrong option was selected.
- Paul gives a clear route-specific hint after **two** wrong guesses.
- After **four**, the correct answer is visibly highlighted. Mistake counter caps at four; no lives, game over or dead ends.
- The correct answer reveals the original five-line David/Paul discovery exchange, then a route-specific intro/handoff.
- Full cult, detention and reassembly mini-games are still **SP3.0–3.3** and must not be presented as playable.

## Save and test contract

Existing V3 local-save key is unchanged. Fields `hubIntroStep`, `hubActiveClue`, `hubViewed`, `hubWrongGuesses`, `hubLastWrongRoute`, `hubMatched`, `hubCorrectStep` persist automatically. Replay Another Ending rewinds to Great Wall and clears these fields. Continue restores mid-opening, clue panel, wrong-guess hint, correct-step dialogue and route-intro exactly. All three route-specific cases are covered by targeted Node smoke tests; build includes only the approved WebP.

## Human gate and next action

Owner to check laptop 16:9 composition and mobile/tablet clue buttons and deduce panel, timing and copy, then separately approve transparent David/Paul standing sprites before any actor art integration. **Do not merge the stacked draft** without explicit qualification and owner permission. Next framework package `GAME-SP3.0` only after hotel loop works and artwork gate is addressed.
