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

## SP-D007, 12 October 2026: David's visual baseline approved

David's first comic character sheet was expressly approved by the project owner under SP-WP1.1. Appearance: 6 ft 2 in, bald, blue eyes, short dark ginger/auburn beard, wearing a charcoal hoodie over an olive T-shirt, jeans and trainers in the approved sheet. This design, including its range of comic reactions, becomes the character reference in `public/assets/generated/characters/david-baseline.webp`. Original PNG is staged in Google Drive as `david-character-baseline-v01.png` (file ID `1DJLH4ni0z81_SMrslKx99z_U2agTm8vS`). SP-WP1.1 remains open for Paul and any deferred supporting character work.

## SP-D008, 12 October 2026: Paul's revised visual baseline approved

The **revised** Paul sheet, not the rejected earlier version with beard/stubble on his face and smug expressions, is approved by the project owner. Paul is in his 40s, about 5 ft 10 in and stocky/heavier-set, bald with short side/back hair stubble, wears glasses, and is **entirely clean-shaven on his face**. His signature clothing is a white polo shirt, jeans and trainers. His principal comic expression is blank/deadpan, sometimes mildly bewildered; more dramatic reactions are occasional. Approved canonical asset: `public/assets/generated/characters/paul-baseline.webp`. Original: `paul-character-baseline-v01.png` in the Stephen Martin Drive staging folder (Drive file `1J-_Zxy7U7VGAnUS9S3L7CAAR54KNaSYk`). Stephen, David and Paul all now have approved reference sheets; the fictional boyfriend's visual design remains deferred pending story requirements.

## SP-D009, 12 October 2026: Privacy and non-identifying fictionalisation

The project owner approved a clear identity boundary: **Stephen Martin is the only real-world full name**. Use fictional first-name labels for David and Paul, and invented or unnamed counterparts for everyone else. Do not include other real surnames, employer/office identifiers, precise travel information, private third-party relationship or family details, personal communications, social profiles or other identifying information in the public repository, games, songs or comics. Adapt inspiration into **unmistakable fiction**, including all romantic, family, detention, cult and trafficking premises. Do not present those as facts about any real person. Since the repo is public and visual character designs may resemble real people, this is a minimisation rule, **not a guarantee of anonymity**; explicitly review privacy before public release.
