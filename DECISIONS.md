## SP-D047, 18 October 2026: Merge all three endings and finish a small V1 through measured polish

Owner approved the current three-ending game and instructed merging completed Ending C into `main` **before** starting an overall refinement review. PR #46 merged successfully at `d3d7534415c75d029072a31ede9fdde7de5130b4`, with 132/132 branch smoke tests, 20/20 Ending C WebPs, and separate real and taped-cardboard Stephen assets. Minor cardboard mounting-slot geometry is explicitly deferred, not a merge blocker. Preserve all three routes, canonical story, approved visual likenesses, local save, the small plain-browser architecture and the 15–25-minute first playthrough limit.

Prioritise the six owner-identified consistency issues (progressive opening-image painting; David shrinking/growing in Back in England; over-dark Summit entrance; named speech bubbles reverting to footer text after decisions; missing all-scene speaker focus; plain transitional cards), then selective animation/expression improvements and a separately continuing owner-supplied voice recording track. Work in small, independently previewable SP4.1A–J packages and undertake a full timed visual/functional/voice/accessibility playtest before any release. Documentation-only source audit: `docs/story/GAME-SP4.1-FIRST-VERSION-REFINEMENT-AUDIT.md`. The audit does not itself approve any additional art, new dialogue, code changes or public marketing.


## SP-D046, 18 October 2026: Finish Ending B and commence staged Ending C artwork

Owner approved the current Ending B experience despite possible future polish and explicitly requested merging PR #44 before starting to improve Ending C. PR #44 was merged into `main` at `584b4c7055777cd54331909d2b6a50a75a25c7ef`. The existing third-route gameplay and dialogue remain canonical. Develop missing Total Renewal Spa and cartoon cardboard assembly illustrations on a new short-lived branch with independent assets, consistent scene perspective, usable laptop-sized controls and explicit approval of each finished visual. Do not flatten interactive puzzle elements into backgrounds, alter six-slot/13-item mechanics, introduce anatomy/gore or merge unrevised art without owner sign-off. See `docs/story/GAME-SP4C-ENDING-C-ART-PRODUCTION.md`.

# Accepted project decisions

Entries are concise, durable design decisions. Additional decisions are added only where they materially affect scope, design, delivery or implementation.

## SP-D046, 16 October 2026: Standers forward and larger, kneelers back and smaller

Owner retained the balanced one-standing/one-kneeling-per-side arrangement but requested a correction to scene depth. Place the kneeling ewer/towel at the previous rear standing locations **without increasing their size**, and reposition the standing fan/tray outward towards the viewer with proportionally larger sprites. Preserve right-side inward-facing horizontal mirrors, all approved assets, principal-character positioning, dialogue and behaviour. Verify staging at desktop/tablet/mobile and require an owner visual gate before merging the stacked draft PRs.

## SP-D045, 16 October 2026: Balance Summit attendants symmetrically and face the throne

Owner specified precisely one standing and one kneeling approved attendant **on each side**, all facing inward towards Stephen. Retain left fan standing and left ewer kneeling (unflipped); move standing tray to the right and mirror it, with right kneeling towel also mirrored. Keep the four independent transparent assets and original throne-room background, Stephen/David/Paul placements, UI, audio and saves unchanged. Use responsive CSS only; gate merge on owner in-engine layout approval.

## SP-D044, 15 October 2026: Layer four silent ceremonial attendants around the Summit throne

Owner approved four individually generated, transparent adult ceremonial attendants (fan, tray, ewer, towel) and directed their addition to Ending A. Preserve the original approved throne-room background, Stephen's owner-approved size on the existing chair, and David/Paul near the base of the stairs. Keep four attendants as separate Drive-provenanced alpha WebPs, positioned in left/right pairs, behind principals and dialogue, without new dialogue or gameplay mechanics. Allow responsive repositioning and require owner in-engine visual approval prior to merging the two stacked draft artwork PRs.

## SP-D043, 15 October 2026: Lock the approved Summit throne-room background

Owner approved the detailed alpine social-club throne room for Ending A and requested three different foreground character sprites: Stephen seated joyfully with chairman regalia, David confronting him and Paul looking impressed/confused. Lock the approved **empty** background as a separately materialised asset, then review independent transparent sprite candidates before integrating them; preserve the existing Summit entrance, bottom-dialogue presentation, speaker glow and route state. In particular, do not commit a composite image with a second room or double throne as finished game art. The sprite candidates are not yet owner-approved. Maintain the stacked draft-PR and manual-merge gates.

## SP-D042, 15 October 2026: Mirror and scale approved Summit characters rather than regenerate

Owner endorsed the concept with **gatekeeper on the left facing inward, Paul centre-right and David far right**, but at a noticeably smaller perspective-correct scale than the first assembled scene. Implement only CSS `scaleX(-1)` transforms and responsive repositioning of the three approved transparent sprites, not a flattened concept image, new sprites or a horizontally flipped background/UI. Keep all existing seven-line bottom dialogue, speaker-specific glow, Summit Admissions Test and route isolation. Owner in-engine visual approval remains required before merging draft PR #33.

## SP-D041, 15 October 2026: Use character-scene dialogue at the Summit entrance

Owner approved revised and distinct David, Paul and Asian Summit gatekeeper standing sprites, then directed integration into the Summit approach as a **proper in-scene conversation** rather than the large centred route-intro panel. Retain the approved exterior as an independent background, put the seven existing dialogue lines in the same bottom caption style as other story scenes, and keep SP3.4 autoplay and top-right transport. Show the blue central panel **only** for the Admissions Test. Render three separate transparent sprites on the Summit intro, not on the throne-room ending or other destinations. Assets go through the Drive → manifests → WebP pipeline. Require human in-engine scale/crop review and explicit owner merge authorisation.

## SP-D040, 15 October 2026: Approve Summit entrance environment for exterior scenes

Owner approved the first GAME-SP4.0A illustrated Summit gate/lodge environment and directed that it replace provisional styling in every applicable **Summit exterior**: the cult branch briefing and three-round Admissions Test. The separate Summit throne-room ending requires a distinct indoor illustration and remains unchanged. The source PNG is staged privately in the dedicated Stephen Martin Drive folder under `summit-entrance-background-v01.png`, manifest `generated-assets/manifests/game-sp40a-summit-entrance-v01.json`, and materialised to `public/assets/generated/locations/summit-entrance-v01.webp`. Keep the approved original art separate from character sprites, gameplay objects and editable UI. Final in-engine visual approval is still required before merging SP4.0A to main.

## SP-D039, 15 October 2026: Autoplay cinematic scenes, keep one consistent route control

Owner requested that most scenes play and advance without constant clicking and that replay/alternate-choice controls be consolidated into one reliable location. For SP3.4, preserve automatic recorded office voices and add **text-paced autoplay only for subsequent scripted scenes**, never automatic choices or puzzle inputs. Offer one persistent top-right Pause/Next/Change route toolbar, with the route-reset action returning to the Great Wall checkpoint; stop timers on hidden tab and allow manual continuation. Keep this navigation pass scoped and separate from the individually approved SP4.0 artwork phase. Final dialogue pacing and UI layout remain a human browser-review gate.

## SP-D038, 15 October 2026: Merge complete mechanics, make the art pass first, polish last

Owner approved merging all four functional rescue packages, and requested a dedicated visual/artwork phase **before** final tidying, minor expansion and game-wide polish. PRs #27–#30 were merged to `main` at `aa1ea5a2ed8df7b1db4bfb89028d9ac81f6b5605`, preserving the three distinct route endings. Keep the 15–25-minute narrative and privacy safeguards; visual output needs individual asset approval through the existing manifest/Drive pipeline. Record a short SP3.4 integration/visual inventory, deliver art as SP4.0, then assess small improvements, pacing and final QA as SP4.1. No fourth route, long campaign or ungated release.

## SP-D037, 15 October 2026: Build the third route as harmless labelled cardboard assembly

GAME-SP3.3 completes the mechanical third ending with six idempotently placed foam/cardboard pieces, funny reject items and a separate explicit POWER ON interaction. Accept mouse drag but require equally capable select-piece and labelled-slot controls on keyboard and touch. Save progress in the existing route-locked V3 key; wrong pieces never disappear or soft-lock the scene. Deliver the complete approved spa dialogue and Ending C; keep all new illustration work queued until after all three functional routes and integration tests are accepted.

## SP-D036, 15 October 2026: Finish all three playable routes before visual polish

The project owner instructed the team to complete all three route mechanics first, then run a dedicated art pass. Deliver SP3.2 with fictional CSS/text form controls and an accessible tap or drag stamp. Prepare an art inventory without producing new images now. Keep human preview approval and stacked PR safety gates.

## SP-D035, 15 October 2026: Start the Summit route as the first complete playable ending

After owner review of the SP3.0 preview, build GAME-SP3.1 on a separate branch stacked on SP3.0. Use the approved three-card admissions puzzle with three no-fail rounds, individual wrong responses, Paul's hint after two errors and checkpointed progress. Reproduce all approved Ending A dialogue, stinger and replay flow without unlocking the remaining two endings. Any new illustrated location, characters or poses remain subject to individual owner approval, so use a plainly provisional CSS/text stage for logic testing. No merge or production-release authorisation is inferred from the instruction to start development.

## SP-D034, 15 October 2026: Start a minimal shared mini-game framework

Following owner instruction to start GAME-SP3.0, implement the small reusable route introduction / quiz and assembly progress contract on a separate draft development branch. Retain the existing V3 save key and immutable committed route; add only a narrow versioned rescue progress object, no-fail two-error hints and idempotent step completion. Play approved route-intro dialogue and show an explicit unfinished mini-game gate until SP3.1–SP3.3 supply actual routes. Prepare an ending-summary shell but do not expose unearned endings or invent art/voice recordings. Keep all production merges gated by owner preview approval.

## SP-D033, 15 October 2026: Approve final hotel composition and integrate stacked game work

Owner accepted the final GAME-SP2.4B in-browser hotel composition after David was moved slightly farther into the room than Paul; Paul's position remains unchanged. The owner explicitly authorised merging the connected approved development, including voiced office playback, Stephen's mutually exclusive holiday visits, the office alarm, travel montage, hotel evidence puzzle and standalone standing character assets. PRs #16 and #18–#25 were merged in dependency order into `main`, culminating in integration commit `dffc02d854f5784dd2a9faf7c9540259e0a14f7b`. This is **not** approval of unreleased mini-games or three finished endings. The next package is GAME-SP3.0, the small route-specific puzzle/ending framework; retain the 15–25-minute target and separate new-art/release gates.

## SP-D032, 15 October 2026: Approve isolated standing David and shorter Paul for hotel

Owner approved both independently generated full-body transparent game character PNGs: David, taller, bald with a short ginger beard in a dark hoodie and green T-shirt, holding a phone; Paul, shorter and heavier, bald/glasses in a white polo and jeans. Stage originals only in the established Google Drive project folder and materialise to separate, versioned transparent WebPs via their manifests. Integrate in the **approved empty hotel backdrop** without painting speech or UI into the art. Keep Paul observably shorter than David (desktop 58% vs 69% stage height), preserve smaller-screen alternatives and ensure clue hotspots remain usable above both actors. Exact combined scene requires owner visual approval; only source sprites have been approved so far. Draft branch stacked on SP2.4B, no main merge.

## SP-D031, 14 October 2026: Hotel deduction puzzle and character sprite gate

Owner authorised continuing SP2.4B using the approved empty hotel background. Build an accessible, click/touch shared investigation: eight existing arrival lines, three optional clues, matching the **immutable preselected `route`**, short wrong-guess jokes, Paul hint after two mistakes, correct highlighted after four, and five-line approved deduction wrap-up. Save exact progress and lead to a route-intro placeholder only; actual SP3 mini-games are not in scope. No further big scene composite images are accepted for David/Paul: both require their own owner-approved **transparent full-body standing sprites** consistent with the existing baseline. Existing seated character artwork is not suitable for a standing hotel encounter. Preserve source Drive provenance and visual gate. Draft PR and no main merge until explicitly approved. Implementation notes at `docs/story/GAME-SP2.4B-HOTEL-INVESTIGATION.md`.

## SP-D030, 14 October 2026: Lock the unoccupied fictional hotel lobby as SP2.4B background

The owner approved the **second** warm, illustrated visitor-information lobby environment concept (1672 × 941, empty of people), replacing the first rejected concept containing embedded characters. Lock its source `china-visitor-information-lobby-background-locked-v01.png` in the existing private project Google Drive staging folder, and transform through `generated-assets/manifests/game-sp24b-hotel-lobby-background-v01.json` to `public/assets/generated/locations/china-visitor-information-lobby-background-v01.webp`. The hotel scene must retain independent David/Paul sprites, readable text and three separate interactive evidence clues. This approval is **art-only**; the actual SP2.4B evidence puzzle and in-game staging are future tasks requiring verification and visual review. Branch stays draft, no main merge authorised.

## SP-D029, 14 October 2026: Start shared rescue with reusable approved art and a separate hotel asset gate

Owner authorised beginning GAME-SP2.4A as planned. Implement the original ten-line OFFICE-ALARM and comic travel cutaways with existing approved office location and seated David/Paul actors, preserving all 55 office recordings. Add only narrow save/phase extensions and a visibly honest SP2.4B Visitor Information handoff, **not** an invented complete hotel puzzle or mini-game. New hotel-lobby imagery is generated for independent approval: reject a composite with people as game environment, and do not commit/import a background concept or generated source until explicitly accepted by the owner. Keep proof on a stacked draft PR based on SP2.3C, normal human and build gates, no merge to main yet. Source implementation note: `docs/story/GAME-SP2.4A-OFFICE-ALARM-IMPLEMENTATION.md`.

## SP-D028, 14 October 2026: Approved rescue, three mini-games and ending delivery order

The owner accepted the **GAME-SP2.4–SP3.4** plan as the next project work after Chapter Two branching. Authoritative details: `docs/story/GAME-SP2.4-SP3-RESCUE-IMPLEMENTATION-PLAN-V1.md`; preserve the approved scripts/puzzle jokes from `docs/story/SP-WP1.2-GAME-TREATMENT.md` and Chapter Two's **single mutually exclusive route** from `docs/story/GAME-SP2.3C-BRANCHING-STORY-V2.md`. **Build order:** (1) shared OFFICE-ALARM, travel montage and David/Paul hotel evidence puzzle SP2.4A/B; (2) minimal shared mini-game/save/ending framework SP3.0; (3) Cult/Summit 3-round admissions test and Ending A SP3.1 as the **first complete route**; (4) Detention 3-stage fictional stamps and Ending B SP3.2; (5) six-piece non-gory cardboard Stephen assembly and Ending C SP3.3; (6) integrated three-route playtesting, accessibility and runtime validation SP3.4. No timers/fail state; no actual custody/organ harm; only one route mini-game per playthrough; original 15–25-minute target. New artwork requires individual approval and established Google Drive manifests. Approval of **this plan** does not mean the rescue game has been built, excuse the live combined-scene review or authorise merging the stacked drafts to production.

## SP-D027, 14 October 2026: Invitations are exclusive, with elapsed travel days

Owner approved **GAME-SP2.3C** as the revised Chapter Two route structure. Accepting Great Wall's fictional Summit invitation ends sightseeing and sends Stephen directly to the `cult` incident handoff, skipping Forbidden City and market. Declining unlocks a **A FEW DAYS LATER… / THE FORBIDDEN CITY** card. Accepting the honorary banquet after its approved follow-up takes the `detention` handoff, skipping market; declining unlocks **THE NEXT EVENING… / THE NIGHT MARKET**. In market, Stephen **automatically** accepts Total Renewal Spa, yielding `reassemble`; remove market accept/decline and the all-declined rebooking panel. Commit the chosen route at its incident handoff and keep the original interrupted phone transition. The actual route mini-games are still future work; label them explicitly unavailable. Another Ending returns to the **Great Wall choice**. V3 old saves migrate to the first accepted path. Preserve approved art and 16:9/2-column layouts. Canonical progression supersession: `docs/story/GAME-SP2.3C-BRANCHING-STORY-V2.md`. Do not merge before in-game approval.

## SP-D026, 14 October 2026: Night Market trio and final holiday route

Owner approved the standalone fictional market background, teal spa representative and new full-standing skewer Stephen. Transfer their original PNGs only via the dedicated Google Drive → versioned manifest → WebP pipeline. Keep the established 16:9 laptop composition, side-by-side choices, and mobile/touch adaptations. Spa accept replaces the earlier plan with `reassemble`; decline retains the plan. The all-declined case must choose one of the three previously encountered bookings before departure. At that point commit `route`, show its truncated 1%-battery text, Stephen's reaction and the Back in England title. 'Choose another ending' explicitly resets the route to the Night Market checkpoint. Do not invent a completed David/Paul rescue hub; that is subsequent GAME-SP2.4. The owner's asset approval does not waive the in-game visual gate or authorise a production merge.

## SP-D025, 14 October 2026: Smaller China characters and canonical Forbidden City Stephen throughout

Owner reviewed Great Wall and Forbidden City on a laptop and approved their existing assets and underlying gameplay but requested smaller character cutouts, less UI occlusion, and consistent use of the distinct approved Forbidden City Stephen from the **first beat**. Keep Great Wall Stephen in Great Wall only and use `stephen-holiday-forbidden-city-pleased-v01.webp` throughout Forbidden City (not as an acceptance-only substitution). Acceptance still controls the fictional honorary title UI and banquet booking; declining does not switch character art. Adjust laptop composition within the already approved 16:9 cinematic shell: smaller paired actors, chapter/booking overlays away from their heads, mini-navigation top-right, full speech card above the action strip and compact but usable choices. Preserve touch-friendly scrolling and the existing story and audio. Require preview visual review before PR #19 merge.

## SP-D024, 14 October 2026: Lock Forbidden City trio and implement second provisional invitation

Owner approved the scenic Forbidden City courtyard backdrop and independently generated full-standing attendant in ceremonial red jacket, and Stephen's second standing holiday pose (blue quarter-zip, pleased, *Guest of Honour* badge). Use only these three approved source assets, transferred via the dedicated Drive → manifest → WebP pipeline; do not use earlier rejected full-scene composites, invented dialog or duplicate Summit promoter. The fictional cultural banquet is advertised at an imaginary stand **outside** the real attraction; no claims about the attraction or real authorities. Keep canonical `china.palace.001`–`china.palace.004` beats, accept/decline choices, follow-up joke and Paul's cartoon bear picture. Accepting a banquet invitation sets `pendingPlan=detention` and replaces prior `cult` booking, declining preserves the current plan, and no final `route` is set until Night Market. Replaying Forbidden City restores the provisional booking from the Great Wall. Owner approved the images and requested a game integration; visual/layout sign-off of the combined scene is a separate gate. Build on a new stacked draft PR after Great Wall #18, preserving voice PR #16.

## SP-D023, 14 October 2026: Add approved Summit promoter to Great Wall encounter

Owner approved the revised Summit event promoter sprite (olive overshirt, branded lanyard and brochure, comfortable trainers), rejecting the prior too-suave suit design. Lock and stage the approved full-body transparent source in Google Drive, materialise via a versioned asset manifest, and display opposite Stephen at **the same standing-actor scale** on the promoter's first spoken line. For composition, the earlier David phone notification closes when the promoter arrives. Preserve the locked script, provisional booking rules, responsive viewport fit and voice/audio handling. Preview artwork alignment is an owner gate on draft PR #18; do not merge without approval.

## SP-D022, 14 October 2026: Lock and integrate first three China visuals for GAME-SP2.2

Owner approved the chapter transition card, Great Wall background and revised full-standing Stephen holiday sprite matching the existing blond office design. They are immutable V1 design baselines and may only be changed after further owner feedback. Sources live in the project's Google Drive staging folder; three manifest-driven optimised WebPs on `agent/game-sp22-wall-playable` preserve provenance. The first playable Great Wall scene follows the 55-clip voiced office intro, presents approved short Chapter Two dialogue and one accept/decline Summit booking. Keep `pendingPlan` provisional; no early final route selection and no new game engine. Save/replay must work with existing V3 saves. The scene PR is stacked on the still-draft voiced-office branch (PR #16); **both** require owner preview approval before production merges. All later China scenes and more voices are deferred.

## SP-D021, 14 October 2026: Lock GAME-SP2.1 Stephen holiday Story V1

Owner approves exactly three consecutive short playable Stephen locations — Great Wall, Forbidden City, and a fictional Beijing night market — introduced by **“TWO DAYS LATER… IN CHINA”**. At each location the player chooses whether to accept one tempting fictional evening invitation: The Summit (`cult`), International Cultural Excellence Banquet (`detention`) or Total Renewal Spa (`reassemble`). Accepting a later invitation **replaces** the earlier plan, declining **preserves** it, and declining all three prompts one explicit final selection; no hidden scoring or random endings. Stephen's chosen route determines his battery-interrupted message and the existing David/Paul rescue misunderstanding. Stephen's section should have minimal dialogue and run roughly 3–5 minutes, within the full 15–25-minute target. This expressly supersedes only the old one-city-kiosk playable Stephen scene; the shared rescue hub, all three puzzle routes, and ending payoffs remain canonical. The approved authoritative script is `docs/story/GAME-SP2.1-STEVE-HOLIDAY-STORY-V1.md`. Character art, voices and public release remain separate approval gates. **SP-D020 is reserved for the concurrently open voice-playback PR #16**, which has not yet merged.

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

## SP-D018, 14 October 2026: Start Paul Confused seated expression proof

After PR #14 merged the full Stephen and David expression families, the owner approved Paul’s Confused visual variant for a separate proof. Paul is seated to Stephen’s right and therefore turns his head toward **his right (picture left)** to face the other characters. Retain his existing approved Neutral artwork; use the separate transparent 1086 × 1448 sprite for `confused` reaction cues only, with `blank` and `pleased` continuing to show Neutral. Source assets must use the approved Drive manifest pipeline. Keep this on an agent/* draft PR until owner checks colour and registration in the real layered office.

## SP-D019, 14 October 2026: Finish Paul's three-state seated expression family

Owner approved the transparent Pleased sprite after approving and testing Confused. Paul remains on the right side of the office scene, looking toward Stephen and David to **his right (picture left)**. Register Pleased as a separately approved complete seated sprite on the existing Paul proof draft PR. `blank` maps to approved Neutral; `confused` and `pleased` map to their dedicated transparent WebPs. Keep the scene script and previous actor assets unchanged. Owner in-scene review of colour, positioning and transitions remains mandatory before merging the Paul proof.

## SP-D020, 14 October 2026: Integrate 55 script-ID MP3 voice clips without a new media pipeline

Owner approved merging the completed Paul-expression PR and requested support for ElevenLabs synthetic voice recordings keyed by existing `intro.exterior` and `office.001` through `office.054` IDs. Accept `.mp3` assets in `public/assets/audio/dialogue/` on a separate `agent/*` PR branch. This folder is designed for direct GitHub upload; no Drive image pipeline or audio API keys are needed. Production builds copy only valid dialogue-file names, automatically including new recordings without source edits. Use the existing Sound control; prerecorded voices must govern per-line autoplay timing, with graceful missing-file fallback and proper pause/next/back/restart/skip/visibility cleanup. Retain the unchanged 67-beat script, actors and sound-effect placeholders, and require an owner listening check before production merging the audio package. The repo is public: audio filenames and media are public once committed.
