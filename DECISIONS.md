# Accepted project decisions

Entries are concise, durable design decisions. Additional decisions are added only where they materially affect scope, design, delivery or implementation.

## SP-D001, 12 October 2026: One repository and shared canon
All game, song and comic work shares `tametheboardgame/stephen-martin-project`. Shared character reference art, story canon and asset provenance are authoritative; each stream works on short-lived `agent/*` branches and PRs.

## SP-D002, 12 October 2026: Reuse the Unicorn Valley image pipeline
Use a dedicated Stephen Martin Google Drive staging folder and separate service-account/OIDC provider. Import only validated originals, convert to optimised WebP, and commit to development branches. First Stephen baseline transfer verified by GitHub Actions run `38221823786`.

## SP-D003, 12 October 2026: Character baseline approved
The multi-pose Stephen Martin comic sheet approved in chat is the visual baseline. Canonical derivative: `public/assets/generated/characters/stephen-martin-baseline.webp`. The unrelated thumbnail shown in an earlier message was a presentation error and must **not** be treated as reference.

## SP-D004, 12 October 2026: Tight runtime and deliberate small scope
The game is a **15–25 minute comedy experience**, with one shared adventure, three concise ending payoffs and roughly **2–3 substantial mini-games**. Completing a polished small joke is preferred to extensive systems, a sprawling world or a long game. Any material expansion requires owner approval.

## SP-D005, 12 October 2026: Companion media priorities
One song can progress in parallel with the game. The comic is optional and starts with a 6–8 page pilot only after stable shared character and story canon. It cannot block game completion.

## SP-D006, 12 October 2026: Roadmap approved
The full Phase 0–7 roadmap in `ROADMAP.md` is accepted for development, subject to SP-D004's hard size limit. Start SP-WP1.1 after foundation documentation is on `main`.
