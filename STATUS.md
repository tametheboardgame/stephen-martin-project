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

## Next work package: SP-WP1.2

Define the succinct story/comedy bible, individual speaking voices and the shared mystery with three compact endings. Keep the 15–25 minute game-length target and avoid premature game-engine or comic scope expansion.

## Operating notes

- Keep changes small and reviewable in short-lived feature branches.
- Do not turn this into another large/complex game; target 15–25 minutes with no unapproved scope creep.
- Song may run in parallel; comic pilot is optional.
- Production/public publishing requires separate owner permission.
