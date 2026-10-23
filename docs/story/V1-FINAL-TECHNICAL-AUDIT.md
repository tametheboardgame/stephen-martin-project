# Final V1 code, asset and delivery optimisation audit

**Date:** 23 October 2026  
**Scope:** Last technical hardening pass after owner-accepted three-ending V1 and G5H PR #90.  
**Intent:** No new levels, dialogue, gameplay, recording replacements or newly generated character art.

## Inventory and measured opportunities

Audited the recursive GitHub repository tree on the G5H baseline: **613 paths, approximately 49.0 MB** of source/repository bytes, of which **120 generated graphic files ≈25.9 MB** and **258 audio files ≈21.3 MB**. The deployed code is small by comparison (HTML ≈68 KB, styles ≈251 KB, main game JS ≈154 KB). The source repository size is not the same as browser transfer size: the game loads its approved images scene by scene and dialogue on demand.

| Finding | Original | Optimisation | Reduction in dist |
|---|---:|---|---:|
| G5F approved Ending C finale | 2,715,017 B PNG | **1,943,888 B pixel-identical lossless WebP** | **771,129 B** |
| Reference-only three baseline character portraits | 1,871,040 B | Preserve exact originals in source archive; exclude from deployed allowlist | **1,871,040 B** |
| 18 expression reference crops | 636,348 B | Keep all 18 and validate archive; exclude from deployed output because runtime uses separate approved seated sprites | **636,348 B** |
| **Total reduction in packaged output** | | | **3,278,517 B** (≈3.13 MiB) |

The new derived WebP is retained in Git along with the canonical PNG; therefore the **repository itself grows** by the derivative's 1.94 MB. The source of truth is unchanged and provenance is maintained.

**Why lossless:** Exactly preserved 1672×941 RGB pixels, verified by a Python/Pillow pixel-by-pixel comparison during a one-time GitHub Actions conversion; original source has SHA-256 `6c8bf0a4bd46d43c8997fa5ea1a2fe5c2edc453e7c099199b3946f42bcb00f18`. The temporary conversion workflow was deleted after the derivative was committed. Unlike recompressing with a quality setting, this does not subtly alter the owner-approved scene.

**What improves for players:** The first visit to Ending C's summary scene transfers about **28% fewer illustration bytes** for that backdrop. Excluding unused reference images reduces the *deployment size* but does **not** falsely claim 2.5 MB of initial network savings: those archives were already not requested by live scenes.

## Runtime code inspection

- Architecture remains plain HTML/CSS/JS, with no new dependencies or framework, scene-gated asset readiness, lazy image loading, bounded loading curtain and static Cloudflare deployment.
- `src/asset-loader.js` previously allowed simultaneous image decodes of an identical URL when a warmed asset and current scene requested it together. A small in-flight Promise map now shares that work and removes failed promises for later retry. Tests verify both behaviours.
- Existing selective five-image menu preloads, scene-level animation/audio timer controls and route-specific artwork stay intact. No blanket eager preloads, caching of all images or background audio loading was introduced.
- Core puzzles, three endings, seven Ending C decoys, six real mounting zones, save migration, sound and the shared ending hub remain unchanged.
- `scripts/build.mjs` continues to enforce exact whitelists, audio IDs and original artwork SHA. `scripts/v1-dist-audit.mjs` runs after `npm run build` in the verification suite to assert 254 dialogue MP3s, two songs, approved WebP delivery, no redundant PNG and no archived reference portraits/crops in published output.

## Redundancy decisions

No approved source master, character reference, raw MP3, provenance manifest or historical design decision was deleted. In a first-version freeze, deleting historical source files offers no runtime benefit and creates asset reproducibility risk. The redundant **deployment copies** were removed instead. The CSS contains accumulated milestone-specific overrides; broad stylesheet consolidation would risk previously approved laptop/mobile compositions for marginal transfer savings, so it was consciously *not* performed. Existing Cloudflare compression already substantially reduces textual transfer.

There are three historical open draft PRs (#41, #42, #76). Their original work has been superseded by later merged Ending B artwork, permit proof and shared ending hub; they should not be merged. If closed for housekeeping, preserve their history as superseded rather than deleting source or merging obsolete diffs.

## Release scope and acceptance

- Three endings are owner accepted. Automated G5H browser tests and `npm run verify` passed at the preceding merged baseline.
- Owner explicitly waived further timed human playthroughs and deferred cosmetic extras, rather than recording fictitious 15–25-minute timing results or physical-device touch certification.
- No critical runtime defect is currently known from the automated suites. This is not a claim that every browser/device has been manually certified.
- **Public promotion/release is a separate decision.** Source repository and preview can already be publicly viewable. Preserve Stephen-only full-name fictionalisation, script privacy rules and rights/provenance records.
- Final technical acceptance requires fresh `npm run verify` and G5H Chromium regression on the optimisation branch, including Ending C final art screenshots across desktop/tablet/mobile. Record resulting commit SHA and deployment URL in `STATUS.md`.

## Roadmap close-out recommendation

Mark G0–G5/G5H as complete; treat SP4.1H as complete for the approved shipped 254 dialogue files, not a guarantee of every imaginable optional narrator line. Mark G4H automated portion complete and owner-accepted remaining manual segment; G4C route-specific new transition art, SP4.1G optional animations, SP4.1J precision cardboard registration, secret endings and comic as **declined/deferred for V1**, not blocking tasks. Reclassify SP4.1I as **owner-accepted V1**, with final audit/optimisation merge as its final engineering checkpoint. Avoid carrying unresolved historical “next” flags into the live status header.

## Completed verification — 23 October 2026

The final optimisation was merged as **PR #91**, merge commit `3bfee97559ce3b48c423a2f59c5f2b48a0929094`. Exact change-head `66878b8c6734236e5c1b315c03f71712035dd3bd` passed:

- **273/273 tests**, including new in-flight decode and failed-image retry tests.
- **Post-build distribution audit PASS:** 363 files, **43,711,985 bytes**, 254 approved dialogue MP3s and 2 songs, exact original G5F PNG SHA, delivered lossless WebP, no unnecessary reference baseline/expression copies.
- **Chromium real-browser G5H PASS:** Summit A, detention B, spa C, with C 0/3/6 placement and final image, keyboard and save/restore. Desktop 1366×768, 1440×900, 1600×900, tablet 768×1024 and phone 390×844 screenshots, no detected horizontal overflow or caption/album overlap. The 1366×768 Ending C screenshot was reviewed after WebP replacement, with artwork and control placements intact.
- **Cloudflare deployment successful:** https://1c64cc99.stephen-martin-project.pages.dev.
- **GitHub logs/evidence:** https://github.com/tametheboardgame/stephen-martin-project/actions/runs/39949979678 (browser) and https://github.com/tametheboardgame/stephen-martin-project/actions/runs/39949979752 (smoke).
- Superseded draft PRs #41, #42 and #76 closed without merging obsolete branches. No open V1 roadmap packages remain.

**Disposition:** V1 is **DONE and owner accepted**. Do not reopen the history-only work packages. No new public promotion/release was explicitly authorised by this code merge.

