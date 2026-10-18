# GAME-SP4.1B — Back in England David expression registration

**Started:** 18 October 2026
**Baseline:** `main` with SP4.1A (PR #49) merged at `57407e94f0ea64ec0a276514963b629a383ead6d`.
**Status:** Code and regression checks prepared on a separate branch; final Cloudflare visual acceptance remains outstanding.
**Scope:** The ten `rescue.alarm.001`–`rescue.alarm.010` dialogue beats in Chapter Three ("Back in England"). No approved faces/artwork have been replaced.

## Root cause and correction

- `#rescueAlarmDavid` previously used an automatically sized image (`width:auto;height:79%;max-width:42%`) and swapped the approved seated David WebP on each beat. These different transparent sources have varying optical extents, leading to visible scale changes.
- The opening already applies approved per-expression optical registration for the **same** seated images. London had **no corresponding registration**.
- Use a consistent scene-space actor frame (`width:32%;height:79%` at desktop, `42% / 67%` on tablet and `55% / 57%` on narrow mobile) with fixed bottom/centre alignment and `object-fit:contain`. Apply exactly the established opening optical scales by `#rescueAlarmDavid[data-sprite]`:

| Approved source pose | Beat IDs | Existing opening optical scale | London scale |
| --- | --- | --- | --- |
| Serious | 001, 002, 005, 007, 009 | 0.96 | 0.96 |
| Confident | 003, 010 | 0.93 | 0.93 |
| Frustrated | 004, 008 | 0.92 | 0.92 |
| Systems Expert | 006 | 0.94 | 0.94 |

- Preserve David’s existing left placement, desk overlay and stage height, Paul’s independent character image, voice timing, unmodified scripts, scene saves and all other routes.
- No new PNG/WebP was produced or approved. This is a **scoped CSS calibration** reusing the owner-approved source images. The image originals were not programmatically decoded for fresh pixel/alpha-landmark measurement in this environment, so manual in-engine checks are essential.

## Acceptance checkpoint (owner)

1. Open the exact Cloudflare PR preview and reach the Chapter Three rescue alarm on a route of choice, at **1366×768** and **1440×900** on a laptop, plus a narrow view if possible.
2. Run all ten alarm lines, especially consecutive 002 → 003 (Serious → Confident), 003 → 004 (Confident → Frustrated) and 005 → 006 (Serious → Systems Expert). David should keep a stable head size, eyeline, shoulder height and desk baseline with no obvious growing or shrinking.
3. Check lines 006–007 with phone prop visible, line 010 ending and the outgoing travel transition. Ensure David neither covers dialogue/phone nor moves behind the desk incorrectly.
4. Compare Paul's size before/after (unchanged). Sound on/off, Next and direct Resume from this scene must behave as before.
5. If physical visual alignment remains off, use the owner screenshots to refine only the pose-specific offsets on this branch and retest. Do not merge before visual approval.

## Regression and release criteria

- Existing ten-line script IDs and source WebPs must remain exactly unchanged.
- Dedicated test verifies all four CSS ratios against canonical opening CSS, actor-frame breakpoints, original image URLs and 10-line progression/save checkpoint.
- Run `npm run verify`, check Green Cloudflare Pages preview, update `STATUS.md` with final SHA and owner sign-off, then merge this bounded PR when approved.
- Next independent package: **GAME-SP4.1C**, lighten Summit entrance’s scene-wide shadow. Do not combine it into the London portrait PR.
