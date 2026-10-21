# GAME-SP4.1G3D — Summit throne room staging and perspective QA

**Status:** Draft candidate for owner's visual approval. **Baseline:** main at `1177b6f44c6d9a7dce97f8cb0645b7aeb5b597dc`, G3C merged. **Branch:** `agent/game-sp41g3d-throne-room-perspective`.

## Audit of existing approved scene

The composite throne background is one approved WebP; seven character cut-outs remain independent layers. Stephen stays seated centrally, David stands left, Paul stands right. Four silent attendants already form one standing plus one kneeling person per side, with right-side sprites mirrored inward. The speaker glow is tied only to Stephen, David and Paul. All 14 Ending A spoken lines, subtitles, save state and Skip to End are already connected.

The **geometry issue** is that the kneeling left/right pair is far smaller than the standing pair and positioned noticeably farther up the steps. Although kneeling people should be shorter on screen, prior desktop ratio was **27% standing vs 14% kneeling** (1.93×); on tablet 25% vs 12% (2.08×) and phone 20% vs 9% (2.22×). That gives a miniature-figure effect. The rear kneeling pair also had equal z-index to the standing pair despite overlapping their depth zones.

## Stage perspective markers (percentages of the scene)

| Layer | Desktop | Tablet ≤800px | Phone ≤450px |
|---|---|---|---|
| Left standing fan | left 9%, bottom 29%, height 27% | left 7%, bottom 31%, height 25% | left -1%, bottom 33%, height 20% |
| Right standing tray | right 9%, bottom 29%, height 27% | right 7%, bottom 31%, height 25% | right -1%, bottom 33%, height 20% |
| Left kneeling ewer, **new** | left 20%, bottom 40%, height 19% | left 18%, bottom 41%, height 17% | left 10%, bottom 42%, height 14% |
| Right kneeling towel, **new** | right 20%, bottom 40%, height 19% | right 18%, bottom 41%, height 17% | right 10%, bottom 42%, height 14% |
| Stephen (unchanged) | centred, bottom 46%, height 17% | bottom 46%, height 16% | bottom 43%, height 14% |
| David (unchanged) | left 30%, bottom 33%, height 28% | left 24%, bottom 33%, height 26% | left 12%, bottom 33%, height 22% |
| Paul (unchanged) | right 29%, bottom 33%, height 27% | right 23%, bottom 33%, height 25% | right 12%, bottom 33%, height 22% |

The newly enlarged rear pair uses `z-index:1`, behind standing attendants (`z-index:2`) and David/Paul (`z-index:3`); the live dialogue (`z-index:5`) still wins. The right-hand pair retains the existing sprite-only mirroring. No heights, feet or x coordinates of previously approved Stephen/David/Paul or standing attendees have changed in this first pass.

## Visual review and acceptance

1. Inspect Ending A throne scene at 1366×768 and a wider desktop. Verify attendants are physically plausible, standing pair foreground, kneeling pair immediately behind but not miniature, and none appears floating or perched on the staircase.
2. Inspect at around 800px and 390px widths, including portrait and landscape if available. Look for feet clipping, extreme overlaps, and kneeling characters disappearing behind David/Paul or the bottom dialogue panel.
3. Verify both sides face Stephen, all four props remain individually recognisable (fan, tray, ewer, towel), centre throne is unobstructed and Stephen remains on his seat.
4. Step through all 14 Ending A lines (or Skip to End). Confirm speaker glow follows Stephen, David and Paul, and captions remain readable without covering important faces.
5. Confirm unchanged G3C illustrated admissions, Ending B and Ending C. No sprite source replacement or new art is within G3D scope.

**Gate:** Owner before/after visual acceptance, green smoke, successful Cloudflare exact-head preview, then merge. If the scene still feels wrong, use screenshots from the preview for another **CSS-only** adjustment. Do not regenerate locked assets without separate explicit approval.

**Next:** G3E, bespoke “Heaven Was a Place on Earth” ending illustration.
