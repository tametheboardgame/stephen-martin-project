# GAME-SP4.0 — Ending B visual asset production register

**Scope:** The Great Stamp Catastrophe / *Detained by Administration*; the fictional Office of Ceremonial Misunderstandings. **Updated:** 17 October 2026.

This document records the owner's visual approvals and source provenance, and the order for preparing separate game assets. An **approved concept** is not automatically an integrated, interactive game component or a licence to merge. All original generated PNGs stay in the dedicated Stephen Martin project Google Drive staging folder; future implementation uses a manifest, validated WebP and a reviewed development PR. Preserve the 15–25-minute game budget, existing Ending B logic, scene text and navigation.

## Locked owner-approved illustrated sources

| Asset ID | Source PNG in project Drive | Drive file ID | Dimensions | Approval |
|---|---|---|---|---|
| `BKG_EndingB_BureauOffice_v01` | `ending-b-bureau-office-background-v01.png` | `142qxOZXD2rKCcxGJ3dn-EA7977AKEubP` | 1672 × 941 | **Locked visual source** — empty grand hall, navy/gold, ironic signage, clean playable foreground; no exposed stamp |
| `CUT_EndingB_PuzzleDesk_v01` | `ending-b-puzzle-desk-cutaway-v01.png` | `1cd8j6Un_Ggq6M3oI9_TamNm6wIUrgTyA` | 1536 × 1024 | **Locked visual reference** — bear dossier and a release permit for Stephen, cup and clutter, without revealing the stamp |
| `PROP_EndingB_BearClassification_v01` | `ending-b-bear-classification-v01.png` | `1nDEyJfQ4L_Ldfy7DwalmqayDJ8TVlxa3` | 1122 × 1402 | **Locked owner-accepted source** — portrait, handwritten absurdity, prominent CONFUSING result |
| `PROP_EndingB_PaulsTakeawayCup_v01` | `ending-b-pauls-takeaway-cup-v01.png` | `16DgdTHrmMXErCr9-JGzYHpe_pmHo7IsG` | Portrait | **Locked approved source** — white takeaway cup, cardboard sleeve, navy-and-gold office bear crest; no stamp visible |
| `PROP_EndingB_PaulsTakeawayCupAlpha_v01` | `ending-b-pauls-takeaway-cup-alpha-v01.png` | `1la7j8yK_XxGD5kvidMk62LcvpI_s2lka` | 1122 × 1402 | Derived transparent silhouette of the approved cup; original source preserved |
| `PROP_EndingB_ApprovedStamp_v01` | `ending-b-approved-stamp-v01.png` | `1_RMP3382atWoPxz4L-seESM4rF7yeM3Z` | 1536 × 1024 | **Locked approved source** — one red-and-brass stamp, transparent alpha |
| `FX_EndingB_ApprovedInkImpression_v01` | `ending-b-approved-ink-impression-v01.png` | `14G9hrZYsdw0tOpvXRZX0IaxQPIDSKlvt` | 1448 × 1086 | **Locked approved source** — independent distressed red ink, transparent alpha |
| `PROP_EndingB_StephenReleasePermit_v01` | `ending-b-release-permit-layout-proof-source-v01.png` | `1nf7n8k42pKMiyg7QFF8DyiKKaEFx6qVO` | 1024 × 1536 | **Owner-approved composited portrait proof:** actual approved Stephen image is used pixel-for-pixel, not an invented portrait; final WebP in game |

**Editorial QA note for the bear document:** Owner approved the currently rendered visual after a review suggesting correction of the duplicated “Ceremonial” text in the crest header, omission of the assessor signature and specific date, and clear separation of the document's comic “CONFUSING” classification from the game's correct *“Unsolicited comedy stationery”* response. Keep the original approved v01 **unchanged** in Drive; if these text refinements are subsequently requested, generate a **new revision for review**, never silently replace the locked source. The already-implemented puzzle's correct answer remains unchanged.

## Separate production assets — one owner review at a time

| Order | Asset ID | Role | State |
|---|---|---|---|
| 1 | `BKG_EndingB_BureauOffice_v01` | Empty main bureaucracy background, no characters or usable stamp | Locked source |
| 2 | `CUT_EndingB_PuzzleDesk_v01` | Establishes prop appearance, desk composition and lighting; not itself an interactive puzzle | Locked reference |
| 3 | `PROP_EndingB_BearClassification_v01` | Standalone bear assessment sheet | Locked source |
| 4 | `PROP_EndingB_StephenReleasePermit_v01` | Legible release permit with exact canonical office Stephen portrait and blank approval box | **Approved; in draft game preview** |
| 5 | `PROP_EndingB_PaulsTakeawayCup_v01` | Approved branded cup; derived transparent alpha silhouette used for separately positioned prop | **Locked; in draft game preview** |
| 6 | `PROP_EndingB_ApprovedStamp_v01` | Transparent, separate red-and-gold stamp hidden under Paul's takeaway cup until discovery | **Locked; in draft game preview** |
| 7 | `FX_EndingB_ApprovedInkImpression_v01` | Approved independent transparent red impression dynamically layered over Stephen's release permit after correct stamp | **Locked; in draft game preview** |
| 8 | `SPR_EndingB_OfficialNeutral_v01` | Independent fictional official sprite; later approval/presentation variant as necessary | Awaiting generation/review |
| 9 | `SPR_EndingB_StephenSeated_v01` | Stephen sitting unharmed, matching his approved reference | Awaiting generation/review |
| 10 | `SPR_EndingB_David_v01` / `SPR_EndingB_Paul_v01` | Separately generated sprites matching canonical cast, positioned according to scene perspective | Awaiting generation/review |
| 11 | `ART_EndingB_FinalTableau_v01` / `CARD_EndingB_v01` | Optional assembled payoff and ending card after the interactive scene works using independent layers | Awaiting review of need |

**Cup implementation caveat:** The locked owner-approved source is a portrait illustration with an opaque warm background, **not** a ready-made transparent puzzle sprite. Do not pretend that transparent edges or moving layers already exist; isolate the cup and its soft shadow in a separately reviewed alpha variant before gameplay integration.

**Implementation boundaries:** Do not bake the hidden stamp into the office background or puzzle-desk illustration. Keep release documents as readable independent props and preserve the already-playable three-stage no-fail stamp game, its save/resume, mouse/touch/keyboard and final scene. Reuse the background for resolution if perspective permits. No new character or background is approved by the appearance of this production list.

**Integration, 17 October 2026:** Eight approved/derived WebPs are registered in `generated-assets/manifests/game-sp4b-*.json` (seven direct Drive materialisations plus the owner-approved, exact-sprite Stephen permit composite). The game preview uses the office as the Ending B route/puzzle/ending backdrop, desk close-up as the prop strip, bear form at stage two, cup pre- and post-discovery, separately selectable/draggable transparent stamp, and the red impression over the permit on success. This uses existing no-fail logic, save/resume, inputs and ending dialogue. Existing David, Paul and Stephen sprites are reused as *temporary* ending actors; the individual Ending B official sprite remains awaiting visual production. Game artwork integration is on a **separate draft PR**, not yet merged.
