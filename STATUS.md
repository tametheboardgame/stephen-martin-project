# Project status

**Updated:** 12 October 2026  
**Master roadmap:** Approved version 1.0, `ROADMAP.md`  
**Primary scope:** Complete **15–25 minute** point-and-click/touch comedy game; three concise endings; approximately 2–3 substantial mini-games. Song alongside; comic optional.

## Foundation

- Repo: `tametheboardgame/stephen-martin-project`, currently **public**.
- Foundation delivery: [PR #1](https://github.com/tametheboardgame/stephen-martin-project/pull/1), merged into `main`.
- Image pipeline: tested successfully end to end in GitHub Actions run `38221823786` on 12 October 2026.
- Staging folder: `1C6kezJBL_sexyHmxeLnFnzpj-Zbn9iC6`.
- WIF provider: `projects/878071288497/locations/global/workloadIdentityPools/github/providers/stephen-martin-github`.
- Service account: `stephen-martin-assets@unicorn-valley-510010.iam.gserviceaccount.com`.
- Stephen original: Drive file `1TkKP-qc-pM4kVrWlwzay0sFHTLG9Ao8z` (`stephen-martin-character-baseline-v01.png`).
- Approved Stephen derivative: `public/assets/generated/characters/stephen-martin-baseline.webp` (GitHub blob `73ce1539332fad89c456eeec348471ef91bd75f4`).
- One unrelated generic image thumbnail was mistakenly displayed in chat; **that thumbnail is not canon**. Use the actual committed Stephen sheet.
- Approved project constraints and workstream rules are recorded in `ROADMAP.md`, `PROJECT.md`, `DECISIONS.md` and `AGENTS.md`.

## SP-WP1.1: Main-character baseline complete

**Human gate required for each new likeness.**

1. Confirm Stephen's approved character sheet remains the anchor.
2. **David design approved:** 6 ft 2 in, bald, blue eyes, short dark ginger/auburn beard. Original `david-character-baseline-v01.png` in Drive (`1DJLH4ni0z81_SMrslKx99z_U2agTm8vS`); manifest at `generated-assets/manifests/character-david-baseline.json`; target `public/assets/generated/characters/david-baseline.webp`. The asset was materialised successfully by GitHub Actions run `38225490240`. Output `public/assets/generated/characters/david-baseline.webp` has blob SHA `0324afa1d3dee0a070701a31bc210c529c6061a4`, matching an independent WebP conversion from the approved PNG. David's approved art and canon were merged in [PR #2](https://github.com/tametheboardgame/stephen-martin-project/pull/2).
3. **Paul approved:** Revised character sheet with clean-shaven face and characteristic blank expression. Original `paul-character-baseline-v01.png` in Drive (`1J-_Zxy7U7VGAnUS9S3L7CAAR54KNaSYk`), manifest `generated-assets/manifests/character-paul-baseline.json`, destination `public/assets/generated/characters/paul-baseline.webp`. GitHub Actions image materialisation **succeeded** in run `38228062469`. The committed WebP has Git blob SHA `2ec53c41eac4d4e9da9b81fdfaf059796a4dcc53`, independently reproduced from the exact human-approved source PNG. The character reference was merged in [PR #3](https://github.com/tametheboardgame/stephen-martin-project/pull/3), squash commit `770f3b5e`.
4. Main-character appearance references are recorded in `docs/CREATIVE-BIBLE.md` and `docs/ART-DIRECTION.md`; approved art is registered in the manifests.
5. Define/design a fictionalised boyfriend when story requirements justify it, keeping the mystery ambiguous.

**Status:** All three principal character baselines (Stephen, David and Paul) are approved and committed to `main`. SP-WP1.1 main-character visual baseline complete. The boyfriend's fictional appearance remains deliberately deferred until needed by the story.

## Completed work package: SP-WP1.2

**Story/script approved by owner 12 October 2026:** `docs/story/SP-WP1.2-OFFICE-OPENING.md`, `docs/story/SP-WP1.2-GAME-TREATMENT.md`, and `docs/story/SP-WP1.2-IMPLEMENTATION-HANDOFF.md`. These detail a 3-minute scripted office opening, playable Stephen activity selection, a brief David-and-Paul rescue investigation, three small mini-games and respective cutscenes, all targeting 15–25 minutes. **All three stories, mini-games and the comic false-alarm reconstruction ending are approved for development.** SP-WP1.2 is complete. **Next: GAME-SP1**, a standalone playable three-minute office opening using existing approved character assets, advancing to a basic Stephen holiday placeholder. Preserve the 15–25 minute total target, the privacy boundary, and keep new artwork and engine complexity minimal.

## SP-WP1.2: Privacy and comedy bible (approved)

- Owner-approved privacy rule recorded in `DECISIONS.md` (SP-D009), `AGENTS.md`, `PROJECT.md`, `ROADMAP.md` and `docs/CREATIVE-BIBLE.md`.
- **Stephen Martin** is the only real-world full name allowed in public project content. Other protagonist names are first-name fictional labels; don't publish actual employer/office, partner/relative identities, real contact information, private relationship/family details or precise real-world itinerary.
- All conspiracies, holiday misunderstandings, relationship/family complications, detention scenarios and body-parts plots are **comedic inventions**, never assertions about the people who inspired them.
- A real named protagonist and stylised likeness may still be recognisable. Keep publication behind the existing explicit owner approval and privacy review gate.
- The narrative beats and office script were approved and merged in PR #6; the next phase implements that approved material.

## GAME-SP1: Office opening preview (owner-approved for main)

- Owner approved the SP-WP1.2 story package, merged in [PR #6](https://github.com/tametheboardgame/stephen-martin-project/pull/6) at `22d7806b5c36dacc0cea4a8c0f9bedc8ab204e4f`.
- The owner played the GAME-SP1 office preview and expressly approved it for merging into `main` on 12 October 2026. Small opening-scene feedback is still expected; handle that in a subsequent bounded PR.
- Seven approved scene shots and 64 dialogue beats are recorded in `src/office-data.js`. `index.html`, `src/game.js` and `src/styles.css` provide responsive comic staging, the three approved character sheet assets, back/next/skip/replay controls, optional local sound cues, simple resume, and a clearly labelled Stephen holiday placeholder.
- No boyfriend drawing, game engine or third-party service is required. Static Cloudflare Pages deployment can occur automatically when this merges to `main` if the owner has connected the service; the public website remains a preview, not the completed game. Full Stephen's playable route and rescue mini-games remain GAME-SP2/3.
- Cheap local `npm run verify` syntax and behaviour tests run in a dedicated GitHub Actions workflow. It packages a self-contained office-preview archive after a successful smoke run.
- **Gate cleared:** owner approved the office preview and explicitly requested merge to `main`. Check public Cloudflare build and owner feedback after merging. Do not silently start all three game routes.

## Immediate correction: GAME-SP1.1-D1A — Foreground desk overlay (owner-approved)

- **Owner playtest (12 October 2026):** The D1 office composition with seated David/Stephen/Paul looks good, but there is an obvious seam/gap where the sprites meet the table. The current D1 CSS foreground is a clipped duplicate of the background and does not provide correct foreground depth.
- **Approved next task:** Create `OFFICE-FOREGROUND-01` as a **separate transparent desk/props overlay**, perfectly registered to the existing approved `OFFICE-CLEAN-01` background. It must show the desk front, tabletop edge, mugs/paper stacks/foreground plants only, no people or baked UI. Human-review isolated artwork **and** composite proof before asset import.
- **Implementation stream:** [Draft D1 PR #12](https://github.com/tametheboardgame/stephen-martin-project/pull/12) already contains the full playable scene. Replace its clipped fake foreground with the approved alpha WebP; keep the three transparent actors, full seven-shot/64-line dialogue, cutaways and playback functionality unchanged. Do not patch with CSS-only actor resizing.
- **Validation:** Cloudflare branch preview, desktop/tablet layering review, no horizontal seams/double foreground objects, no floating torsos and no occluded faces or illegible captions. Owner sign-off required before merging game presentation to `main`.
- **Deferred:** Aligned seated expressions, faster timing and 1×/1.25×/1.5× speed UI, and refined cutaways remain later GAME-SP1.1-D slices. Production still uses the earlier playtest until the revised office scene is approved.

## Immediate next: GAME-SP1.1-D1 — Office scene assembly preview

- **Owner approval 12 October 2026:** Assemble a playtest of the **full existing office intro** using the approved `OFFICE-CLEAN-01` background and three independently layered **neutral seated sprites**, replacing the oversized portrait cards. Stage **David left / Stephen centre / Paul right** behind the foreground desk; retain functioning dialogue and controls.
- **Verified asset dependency:** [PR #10](https://github.com/tametheboardgame/stephen-martin-project/pull/10) is **open/draft and not merged to `main`** at the time of this plan. Its owner-approved four WebP assets have materialised successfully from Google Drive. Resolve the asset PR before/in the D1 implementation PR without overwriting production prematurely.
- **D1 only:** Build the layered office, use static seated neutral actors, preserve all 64 existing dialogue beats, scene flow, cutaways, autoplay/Back/Next/Pause/Skip/Restart and save/resume. Produce a real Cloudflare branch or downloadable browser preview and check desktop/tablet framing. No new art required.
- **Later:** After D1 layout feedback, solve correctly aligned seated expression swapping, improve default comedy pacing/1×–1.5× speed control and refine the cutaways. Preserve the 18 approved expression assets; do not splice their mismatched portrait crops directly over seated sprite heads.
- **Merge gate:** Do not change live `main` game presentation until the owner has visually approved the D1 playable preview. Do not begin GAME-SP2 or grow the overall 15–25-minute scope.

## GAME-SP1.1: Opening polish pass — office-scene rebuild is next

- **Production checkpoint:** The autoplay/expression/cutaway implementation was merged via [PR #8](https://github.com/tametheboardgame/stephen-martin-project/pull/8), squash commit `a7890b1b22bd75776480a67c80d9a25902ebadb7`, expressly to allow owner testing on Cloudflare Pages. It is a **playtest build, not visually accepted**.
- **Owner feedback 12 October 2026:** Current portrait-card staging is a mess: oversized faces are too low, partially overlapping and inconsistently cropped; dialogue/scene transitions feel too slow. The owner approved **replacing** the entire card-based composition with the proper illustrated in-office scene rather than patching individual CSS positions.
- **Next implementation:** **GAME-SP1.1-D — layered office scene**, now explicitly specified in `ROADMAP.md` and `docs/story/GAME-SP1.1-VISUAL-PRODUCTION.md`. Start with **OFFICE-CLEAN-01**, a no-people, no-text fictional office environment for individual visual approval. Then build separate aligned Stephen/David/Paul body and expression layers, reposition editable dialogue and transport, shorten pacing with 1×/1.25×/1.5× options, and refine three independent cutaways.
- **Assets to reuse:** All 18 approved Stephen, David and Paul expression WebPs already exist under `public/assets/generated/characters/expressions/`; preserve source provenance and do not discard those assets. New character/office art must be human-approved and imported by Google Drive manifests.
- **Architecture:** Keep environment, actors, live dialogue, interactive controls and props as separate layers. The approved infographic is a **visual guide**, not a game background or a replacement for interactive UI.
- **Constraints and review:** Do not start GAME-SP2, expand the game engine or touch the three ending routes during this package. Build in short-lived `agent/*` PRs and verify real desktop/tablet playback. Owner signs off the actual preview before merging the office rebuild. `main` continues to host the existing version in the meantime.

## Operating notes

- Keep changes small and reviewable in short-lived feature branches.
- Do not turn this into another large/complex game; target 15–25 minutes with no unapproved scope creep.
- Song may run in parallel; comic pilot is optional.
- Production/public publishing requires separate owner permission.
