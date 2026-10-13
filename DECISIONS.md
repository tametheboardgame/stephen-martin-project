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

## SP-D010, 12 October 2026: SP-WP1.2 office opening and game story approved

The owner explicitly approved the complete compact storyline, including the shot-by-shot office opening, playable Stephen's enticing holiday excursion choice, the subsequent David/Paul rescue investigation, three short route-specific mini-games and the three corresponding ending cutscenes, as recorded in `docs/story/SP-WP1.2-OFFICE-OPENING.md`, `docs/story/SP-WP1.2-GAME-TREATMENT.md` and `docs/story/SP-WP1.2-IMPLEMENTATION-HANDOFF.md`. The light, cartoon false-alarm reconstruction is the initially approved third ending. Target remains 15–25 minutes total including one ending. Authorise phased GAME-SP1 build with the office scene first. Any new personal/relationship content remains subject to SP-D009 privacy rules, and public release requires separate explicit permission.

## SP-D011, 12 October 2026: GAME-SP1.1 opening polish approved

Following the owner's positive review of the deployed office opening, the next bounded work package is **GAME-SP1.1**: automatic dialogue playback by default with Pause/Play/Next/Back; distinct approved portrait expressions and listener reactions for Stephen, David and Paul; and close-up cutaways for David's risk assessment, Paul's printing incident and the group-chat creation. No holiday gameplay or route development belongs in this package. New expressions and generated art require individual human review before becoming approved canon. Preserve the privacy rule SP-D009, keep Cloudflare production on the currently approved `main` build, and use a development PR for polish until explicitly accepted.

## SP-D012, 12 October 2026: Replace portrait-card office preview with layered in-office scene

The owner visually tested the merged GAME-SP1.1 expression-swapping version on Cloudflare and found overlapping giant heads, awkward portrait cropping and sluggish transitions. **Do not spend time patching the portrait-card layout.** Proceed directly to the approved cinematic **in-office** composition as GAME-SP1.1-D, before starting Stephen's playable holiday.

Make a clean, anonymous illustrated office environment, three independent seated/waist-up character sprite layers with aligned expression changes, a real lower-desk dialogue overlay and separate functional playback strip, three independent prop cutaways, faster default playback plus 1× / 1.25× / 1.5× controls, and targeted responsive testing. Existing 18 approved expression portraits remain valuable inputs; the reference infographic is **concept art only**, never the static screen or a source of baked dialogue and buttons. New art requires visual approval and the established Google Drive → manifest → WebP pipeline. The existing `main` build remains a playtest checkpoint, **not final visual sign-off**. Keep the 15–25 minute complete-game scope and the SP-D009 fictionalisation/privacy rules.

## SP-D013, 12 October 2026: Assemble the whole intro using seated sprites before expression redesign

The owner approved a **GAME-SP1.1-D1 Office scene assembly preview** as the immediate next incremental checkpoint. Use the individually approved and materialised art in asset-only draft PR #10: a clean illustrated fictional office with a foreground desk and neutral transparent seated Stephen, David and Paul. Place **David left, Stephen centre, Paul right** as independent, scale-consistent actors behind the desk, removing the previous giant portrait cards. The complete existing seven-shot, 64-beat intro must still play, with live HTML dialogue, autoplay, manual controls, existing cutaways and resume.

**D1 is deliberately static-neutral staging only.** Do not stretch or graft the 18 approved close-up expression portraits into these differently framed bodies. Expression registration, speed control and polished cutaways follow in later GAME-SP1.1-D slices, after the owner visually checks the composition. Keep D1 on a reviewable development branch and provide a genuine playable preview before merging code into `main`. No new game scenes, framework or expanded game scope.

## SP-D014, 12 October 2026: Isolate the foreground desk as a transparent compositing layer

After playing the live D1 office-scene preview, the owner liked the new three-actor composition but identified a visible horizontal gap/seam between the seated characters and the desk. The current foreground is a cropped duplicate of the office background, which cannot provide clean desk-to-character overlap.

Approve **GAME-SP1.1-D1A**: generate and individually approve **OFFICE-FOREGROUND-01**, a transparent, precisely registered original containing the tabletop/front edge and foreground props (e.g. mugs, paper stacks, foliage), with **no people or baked text/UI**. Import the approved original through the existing Google Drive asset pipeline as an optimised alpha WebP. Replace the clipped background duplicate in the draft D1 implementation with **background → independently seated actors → foreground desk overlay → cutaways → live dialogue/controls**, retaining all current script and functionality.

This is an artwork/layering correction, not a mandate to revisit seated character proportions or start expression/speed/gameplay work. Owner approval of the rendered desktop/tablet Cloudflare preview is required before merging the rebuilt office presentation to `main`.

## SP-D015, 12 October 2026: Approve layered office cutscene and cinematic main menu

Owner visually approved the complete GAME-SP1.1-D1 through D1E Cloudflare preview: fictional office background, separately seated David/Stephen/Paul, registered transparent desk/props overlay, fully playable 64-beat intro, coherent cutaways without floating props obstructing faces, 14-inch laptop-focused cinematic layout, and a full-art title menu with floating title, sound and Start/Continue panels. Integrate these as production via PR #12 after checks; the overlapping draft asset-only PR #10 may be closed as superseded.

The **next small milestone is GAME-SP1.1-D2, aligned seated expression swapping**. Old close-up expression sheets can inform art direction and mapping but must not be grafted onto the seated bodies in mismatched poses. Start with a registered Stephen proof, secure owner visual approval, then create matching seated expression variants for all three. Dialogue speed adjustments and cutaway refinements follow later. Do not expand GAME-SP2.

## SP-D016, 13 October 2026: Approved single-office screenplay and expression metadata

The owner approved the full revised 54-spoken-line office conversation and three-character emotional cues as recorded in docs/story/GAME-SP1.1-D3-OFFICE-SCRIPT.md. Stephen's announcement starts the dialogue. The office is one continuous setting with silent, deliberate visual inserts, not seven independently announced scenes. Stable per-beat IDs and three-character acting states are canonical. Stephen uses his six approved full seated sprites and becomes absent when leaving. David and Paul render Neutral until independently approved new seated variants can be registered by key. Preserve legacy save migration and draft PR visual review before merge.

## SP-D017, 13 October 2026: Lock David's complete seated expression family

Owner individually accepted David's final seated Confident (head turned to his left), Serious (more front-facing), Frustrated (brow and jaw tension), Shocked (hands raised in alarm), and Systems Expert (raised explanatory finger) poses. Retain the approved Neutral asset. All six sprites must be 1086 × 1448 transparent images registered to the approved office beat reaction names; use full sprite swapping, not composite facial sheets. Character posture and hands are permitted to change within the frame for expressive poses, especially Shocked and Systems Expert. Import originals through dedicated Google Drive staging and the manifest WebP pipeline on the existing draft PR. Preserve Stephen, Paul and the script, and require an in-game preview comparison before a production merge.
