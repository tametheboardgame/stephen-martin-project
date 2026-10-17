# GAME-SP4.0 — Ending B visual asset production register

**Scope:** The Great Stamp Catastrophe / *Detained by Administration*; the fictional Office of Ceremonial Misunderstandings. **Updated:** 17 October 2026.

This document records the owner's visual approvals and source provenance, and the order for preparing separate game assets. An **approved concept** is not automatically an integrated, interactive game component or a licence to merge. All original generated PNGs stay in the dedicated Stephen Martin project Google Drive staging folder; future implementation uses a manifest, validated WebP and a reviewed development PR. Preserve the 15–25-minute game budget, existing Ending B logic, scene text and navigation.

## Locked owner-approved illustrated sources

| Asset ID | Source PNG in project Drive | Drive file ID | Dimensions | Approval |
|---|---|---|---|---|
| `BKG_EndingB_BureauOffice_v01` | `ending-b-bureau-office-background-v01.png` | `142qxOZXD2rKCcxGJ3dn-EA7977AKEubP` | 1672 × 941 | **Locked visual source** — empty grand hall, navy/gold, ironic signage, clean playable foreground; no exposed stamp |
| `CUT_EndingB_PuzzleDesk_v01` | `ending-b-puzzle-desk-cutaway-v01.png` | `1cd8j6Un_Ggq6M3oI9_TamNm6wIUrgTyA` | 1536 × 1024 | **Locked visual reference** — bear dossier and a release permit for Stephen, cup and clutter, without revealing the stamp |
| `PROP_EndingB_BearClassification_v01` | `ending-b-bear-classification-v01.png` | `1nDEyJfQ4L_Ldfy7DwalmqayDJ8TVlxa3` | 1122 × 1402 | **Locked owner-accepted source** — portrait, handwritten absurdity, prominent CONFUSING result |

**Editorial QA note for the bear document:** Owner approved the currently rendered visual after a review suggesting correction of the duplicated “Ceremonial” text in the crest header, omission of the assessor signature and specific date, and clear separation of the document's comic “CONFUSING” classification from the game's correct *“Unsolicited comedy stationery”* response. Keep the original approved v01 **unchanged** in Drive; if these text refinements are subsequently requested, generate a **new revision for review**, never silently replace the locked source. The already-implemented puzzle's correct answer remains unchanged.

## Separate production assets — one owner review at a time

| Order | Asset ID | Role | State |
|---|---|---|---|
| 1 | `BKG_EndingB_BureauOffice_v01` | Empty main bureaucracy background, no characters or usable stamp | Locked source |
| 2 | `CUT_EndingB_PuzzleDesk_v01` | Establishes prop appearance, desk composition and lighting; not itself an interactive puzzle | Locked reference |
| 3 | `PROP_EndingB_BearClassification_v01` | Standalone bear assessment sheet | Locked source |
| **4** | **`PROP_EndingB_StephenReleasePermit_v01`** | **Next:** standalone legible authorisation for Stephen's release; not the bear's release | **Awaiting generation/review** |
| 5 | `PROP_EndingB_PaulsTakeawayCup_v01` | Independently layerable cup masking the actual stamp until the discovery step | Awaiting generation/review |
| 6 | `PROP_EndingB_ApprovedStamp_v01` | Standalone hidden rubber stamp, later revealed beneath the cup | Awaiting generation/review |
| 7 | `PROP_EndingB_ReleasePermitApproved_v01` | Distinct large readable stamped outcome, “APPROVED: ALL OF YOU PLEASE LEAVE” | Awaiting generation/review |
| 8 | `SPR_EndingB_OfficialNeutral_v01` | Independent fictional official sprite; later approval/presentation variant as necessary | Awaiting generation/review |
| 9 | `SPR_EndingB_StephenSeated_v01` | Stephen sitting unharmed, matching his approved reference | Awaiting generation/review |
| 10 | `SPR_EndingB_David_v01` / `SPR_EndingB_Paul_v01` | Separately generated sprites matching canonical cast, positioned according to scene perspective | Awaiting generation/review |
| 11 | `ART_EndingB_FinalTableau_v01` / `CARD_EndingB_v01` | Optional assembled payoff and ending card after the interactive scene works using independent layers | Awaiting review of need |

**Implementation boundaries:** Do not bake the hidden stamp into the office background or puzzle-desk illustration. Keep release documents as readable independent props and preserve the already-playable three-stage no-fail stamp game, its save/resume, mouse/touch/keyboard and final scene. Reuse the background for resolution if perspective permits. No new character or background is approved by the appearance of this production list.

**GitHub status:** Source registration only on a draft art-foundation branch. No production manifests, new game references or code changes are created by this lock; materialisation, actual scene composition, preview and merge are separate gated steps.
