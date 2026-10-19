# GAME-SP4.1G1C — Chapter 2 handoff quality assurance

**Status:** active three-route regression and owner visual acceptance; no new artwork or script changes planned.
**Baseline:** `main` merge `8641923c93c1867db0608f4bf9ed869891677fe2` (G1B approved, optimised London postcard scene).

## Scope and expected result

For each genuine storyline path, verify the same Chapter 2 handoff:

| Path | Chosen experience | Phone's delivered incomplete message |
| --- | --- | --- |
| `cult` | The Summit after Great Wall | “This place is unreal. They've asked me to be their...” |
| `detention` | Forbidden City banquet after Great Wall decline | “I've just been introduced as the official...” |
| `reassemble` | Spa after both invitations declined | “This spa is incredible. They're taking my entire...” |

Every fragment must **already be delivered** to David and Paul. There must be no `not sent` or `not delivered` indication.

## Automated QA (added on G1C branch)

1. Follow all three **real decision chains**, not constructed save objects, from the holiday story to the route handoff. Ensure chosen route and fragment agree.
2. **Step 0:** received fragment, red 1%, full central phone; save to menu and resume at step 0. **Step 1:** phone black, external 0% notice, Stephen's unchanged reaction; save/resume still dead. **Step 2:** illustrated London collage, live `BACK IN ENGLAND…` heading, `transition.england.back.001` subtitle and voice; save/resume retains it.
3. Continue to Chapter 3 David/Paul alarm. The England narrator must disappear; the first line must be David's. At the sixth spoken beat, their phone visibly displays the **same original delivered fragment**; Paul's battery remark stays unchanged.
4. While Stephen's step-1 MP3 plays, **Pause**, then manual **Next**. His old `onended` callback must be disabled, and a late completion must not skip the England slide. After resuming playback, England's recorded narrator must end or stop cleanly on the next scene.
5. Simulate missing `transition.england.back.001.mp3`: retain live narrator subtitle, mark fallback, wait original card duration and then progress to the correct Chapter 3 alarm.
6. Disable Sound: visible narration and delivered phone fragment persist. Contextual `Skip to investigation` must preserve route and never manufacture a solved hotel puzzle.
7. Enforce HTML/CSS contracts for a single separate live title, visible phone/blackout caption, mobile title rules, bottom controls/subtitle layers and reduced-motion phone state.

## Visual acceptance (owner, browser preview)

At **1366×768** desktop and one smaller laptop width, and at roughly **800 px tablet** and **390 px phone portrait**, inspect all three routes. Check that:

- The full live partial message is legible inside the centred handset, the red battery flag is visible and the lower controls do not cover it.
- After it powers off, the phone moves left on wide screens or up on narrow screens; the external notice and Stephen's reaction do not cover each other, the phone or action strip.
- On Step 2 the owner-approved *visibly spliced* London postcards render immediately following the Chapter 2 prewarm. The **BACK IN ENGLAND…** heading is legible but not a large blanket over the image, and the narrator subtitle sits **separately**, clear of buttons.
- Every transition can be paused, progressed manually, resumed from menu, or skipped by the intentional contextual shortcut; no late voice overhang or unexpected auto-skip.
- In the alarm, David and Paul appear with **one desk** and correct expression/speaker highlighting; their phone shows Stephen's real fragment. The subsequent travel remains reachable.

## Non-goals and release gate

No additional or amended voice clips, different text, routes, generated artwork, game-length changes or third-party libraries. The existing G1A/G1B and G2A visuals remain approved and unchanged unless a **specific QA failure** requires a narrowly scoped correction. Do not merge until the full PR regression has passed and the owner confirms the visual/interaction checks.

If all checks pass without a runtime change, merge a documented QA-only PR; do not manufacture a cosmetic change.
