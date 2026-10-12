# Agent operating contract

This repository is the authoritative source for **The Stephen Martin Project**. It is a **small adult comedy project**, not an open-ended game-development programme.

## Read first
1. `ROADMAP.md` for agreed delivery scope and work packages.
2. `STATUS.md` for current progress, active branch, blockers and next action.
3. `PROJECT.md` and `DECISIONS.md` for agreed goals and durable choices.
4. `docs/CREATIVE-BIBLE.md` and `docs/ART-DIRECTION.md` for character/story and imagery.
5. `docs/GENERATED-ASSET-PIPELINE.md` for original and optimised asset movement.

Precedence: explicit current user instruction > accepted implementation/approved artwork > `STATUS.md` and accepted decisions > `ROADMAP.md` > older conversations.

## Non-negotiable project scope
- **15–25 minutes** for the first playthrough of the complete game, inclusive of one ending.
- A **complete, funny and modest game** comes first. Do not expand into a large game engine, world, extensive lore, huge mini-game catalogue or a multi-hour adventure.
- Deliver **three compact ending payoffs** through a shared main story, not three separate campaigns.
- Plan for **2–3 substantial puzzles or mini-games**; any additional idea is optional unless individually approved.
- The comedy song may be developed in parallel. The illustrated comic is optional and begins with a small pilot only.
- Prioritise fast feedback, clear gameplay and punchlines over technical architecture for its own sake.
- Any material increase in runtime, world scope, mechanics or technology requires owner approval and an updated roadmap decision.

## Creative canon and artwork
- Stephen's approved reference is `public/assets/generated/characters/stephen-martin-baseline.webp`, provenance in `generated-assets/manifests/character-stephen-martin-baseline.json`. Keep facial traits and core silhouette consistent.
- David's approved reference is `public/assets/generated/characters/david-baseline.webp`, provenance in `generated-assets/manifests/character-david-baseline.json`. David is tall (6 ft 2 in), bald, blue-eyed, with short dark ginger facial hair; preserve his characteristic looks and approved comic expressions. Paul still requires separately approved artwork under SP-WP1.1.
- Share art style and recurring jokes between game, music and comic, while allowing different pacing between media.
- The narrative is openly fictional adult satire, including the ambiguous fictional boyfriend, exaggerated detention, mountain devotees and silly body-reconstruction jokes. Never portray real-world allegations as established fact.
- All suggestive characters are adults; favour caricature and punchlines over group-targeted abuse.
- **Never present a stock or unrelated generated thumbnail as if it were canonical artwork.** Verify the actual image from source or checked output.

## Development streams
- Shared canon/assets, game, music and comic can develop independently using short-lived `agent/*` branches and PRs into `main`.
- No permanent integration stream branches. Name work packages in commits and PRs where helpful.
- Shared character canon, asset registries, and common rules are integration touchpoints. Assign one owner or sequence edits to avoid conflicting branches.
- Use British English in documentation and user-facing prose.

## Delivery and human gates
1. Define a bounded package, explicit non-goals, and relevant human approval points.
2. Implement the smallest useful increment on a draft PR.
3. Run cheap targeted checks and present a genuine preview or character image quickly.
4. Apply human feedback before full polish.
5. Finalise implementation/documentation and appropriate tests, verify the current branch head, then merge after approval.
6. Update `STATUS.md` and `DECISIONS.md` for meaningful state changes, not every minor iteration.

Character likeness, visual language, story direction, finished song, comic pilot and public release are human gates. Production/public publication always needs explicit authorisation. Main should remain stable.

## Google Drive and generated images
- Original generated art goes to the **dedicated Stephen Martin Google Drive staging folder**. Never push original source-image files directly into Git as a workaround.
- Use `generated-assets/manifests/*.json` to materialise approved WebP into `public/assets/generated/` on an existing development branch.
- Use the established GitHub Actions OIDC/Google Workload Identity Federation implementation; never commit keys or long-lived secrets.
- Revisions should replace the staged file in place and increment the manifest revision. Retain provenance.
- Don't materialise directly to `main`; don't publish unapproved assets.

## Tests, continuity and interruptions
- Keep build/tests proportionate to a 15–25 minute joke game; no large borrowed browser matrix without a specific need.
- Validate scene flow, the three endings, basic save/resume and mouse/touch, with human playtesting for pacing and jokes.
- Read current GitHub branch/PR/CI state rather than assuming old chat state is current.
- If interrupted, leave `STATUS.md` accurate about complete/incomplete work, blockers, approvals and immediate next step.
