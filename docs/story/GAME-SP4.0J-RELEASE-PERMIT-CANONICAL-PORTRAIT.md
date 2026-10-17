# GAME-SP4.0J — Canonical Stephen release-permit portrait proof

**Status:** Candidate for owner visual review. **Not approved, not integrated into gameplay.**

Repeated generated permit drafts invented a new face despite descriptive references. This proof uses deterministic **pixel compositing of the existing approved office Stephen sprite**, `public/assets/generated/characters/stephen-office-seated-neutral-v01.webp`, as a portrait crop rather than asking an image generator to reproduce his identity. No part of the canonical sprite is altered in the repository.

- Unapproved page layout PNG in private project Drive: `ending-b-release-permit-layout-proof-source-v01.png` (ID `1nf7n8k42pKMiyg7QFF8DyiKKaEFx6qVO`).
- Materialised source WebP: `public/assets/generated/game/ending-b-permit-layout-proof-source-v01.webp`.
- Deterministically composited **review candidate**: `public/assets/generated/game/ending-b-release-permit-canonical-portrait-proof-v01.webp`.
- Script: `scripts/ending-b/compose_permit_portrait.py`. The workflow runs it only when exact dedicated manifest `game-sp40j-release-permit-layout-proof-v01.json` is selected, never on other artwork manifests.
- The blank stamp area remains separate for the Ending B stamp puzzle. No gameplay/scene wiring changed, and no new character artwork has been approved.
- This is a **draft stacked on GAME-SP4.0 Ending B art-foundation PR #41**, awaiting user visual approval; do not merge to `main` automatically. A future final static permit should be approved and the one-off pipeline proof step removed or replaced by a production-safe operation before merge.
