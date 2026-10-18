# GAME-SP4.1A — Loading curtain, image decode and fetch scheduling

**Started:** 18 October 2026
**Implementation:** [draft PR #49](https://github.com/tametheboardgame/stephen-martin-project/pull/49), branch `agent/game-sp41a-scene-loading`, based on detailed roadmap merge `ca7cca7`.
**Status:** Functional code and focused tests committed; automated tests and Cloudflare branch build qualified on first implementation. Owner browser visual and cold-cache network inspection pending. Not merged.

## Problem and baseline evidence

User reports an obviously progressive, dial-up-like drawing of layered artwork on first load. Source audit found:
- `index.html`: **23 image preload links**, some targeted at future chapters and alternate expressions.
- **41 eager image elements**, including image tags inside hidden later-route scenes; no lazily marked scene imagery.
- **No dedicated image-ready curtain** or image-decode gate in `src/game.js`; audio has its own loading states.
- Generated WebP repository contains 100 files totalling about 19.1 MB; **this is not the actual downloaded payload for an individual play session**. HTTP request/TTFB/decoded-frame timings still need DevTools observations.

## Bounded implementation

1. Add dependency-free `src/asset-loader.js`, included in whitelisted static build before `src/game.js`. It selects active DOM scene images and CSS background images (including pseudo-element backdrops), resolves their absolute URLs, and asynchronously loads/decodes only those sources. A scene key prevents repeating the loading curtain for every spoken line.
2. Insert an accessible visual curtain with honest status wording, **no artificial progress percentage**, `aria-live` and a large Continue button offered after **2.2 seconds**. Loading always ends on completion/failure or after **7 seconds**; manual Continue is available in between. On absent JavaScript, the overlay is removed via `noscript` styling. Missing individual image files do not deadlock the game.
3. Cover menu, opening exterior/interior and office cutaways, plus active holiday scene phases: Great Wall, Forbidden City, market, transitions, alarm, hotel, route intros, puzzles and endings. Timed dialogue is held while artwork is still being prepared, including initial voiced office audio. Previous scene holiday voice stops when changing under the curtain. Save V3 and story IDs are unchanged.
4. Replace preloads for far-future China and expression variants with just **five initial menu assets** (the office background and foreground; David, Stephen and Paul neutral seated). Mark 35 later scene image elements `loading="lazy"`, leaving six immediate menu/office actor image elements eager.
5. Warm only the immediate next office exterior image after the menu is ready. Do not preload every branch or sound file. No new image generated, resized or replaced.
6. `package.json` checks the new script, `scripts/build.mjs` copies it into `dist` and dedicated `tests/asset-loader.test.cjs` tests scene readiness, background discovery, failed decode, manual continuation, bounded timeout, no repeat load for same phase and stale navigation cancellation.

## Human verification still required

Use [SP4.1A branch preview](https://agent-game-sp41a-scene-loadi.stephen-martin-project.pages.dev) and an uncached Chrome/Edge session:

1. DevTools → Network → Disable cache. Capture a fresh 1366×768 menu load with screenshots/timeline and request waterfall. Compare with the current `main` production baseline: time to **complete first illustrated frame**, time to first usable Start/Resume control and number/bytes of image requests before ready.
2. Switch to throttled Fast 3G or a similarly limited network and hard-refresh. Verify the curtain remains until menu art is decoded, avoids line-by-line painting, and Continue appears after a visibly slow request. Confirm no more than seven seconds of forced waiting.
3. Start the office, observe exterior→interior and seated sprite/cutaway changes, and test with recorded voices on and off. Ensure the narration does not advance while the new stage loads; current dialogue and controls remain usable when it settles.
4. Save/Resume into the Forbidden City, alarm, hotel and each of three endings; only the visible scene should gate. Check rapid route change, menu/restart and tab hide while a stage is loading, with no stale curtain, missed first line or overlapping voice.
5. Use DevTools request blocking to deny one character or scene-background WebP. The fallback/Continue must work, visible scene text must remain usable, and later unrelated images must still load.
6. Check laptop **1366×768 / 1440×900**, tablet **800×1280** and phone **390×844**. Confirm overlay never blocks focus forever, keyboard and touch targets work, reduced motion is respected and no unexpected nested scrollbar appears.
7. Record observations and any measured timing/waterfall results in this file and `STATUS.md`; make any corrections on PR #49. Require explicit owner visual approval before merging.

## Current qualification

- First implementation build: `425ee12`, **137/137 automated Node tests passed**, all **20/20 Ending C artwork files** bundled, Cloudflare Pages check **success**.
- Final branch head may move for review/documentation corrections. Always re-check exact final head's CI and Cloudflare result before approval.
- The initial reduction from 23 to 5 preload hints is **18 fewer declared high-priority image preloads**, not a measured network speed-up. The shift from 41 eager image tags to 6 eager and 35 lazy is a source-level count, not proof of reduced transmitted bytes.
- **No actual cold-cache, throttled-network, full-browser visual, or empirical image-byte measurement has yet been performed in this session.** Do not declare the issue solved until the preview passes these checks.

## Exclusions

No character calibration (SP4.1B), lighting (C), dialogues (D), speaker glow (E), new scenes/art (F/G), recording creation (H), final release review (I) or cardboard silhouette geometry (J). This PR makes no public-release claim.
