# GAME-SP4.1G0A — Paul pleased arm clip correction

**Baseline:** PR #61 merge `394aeb79c07ec4b051ea515dd5c1299a39832a21`. Active draft PR #62 on `agent/game-sp41g0a-paul-pleased-registration`.

## GAME-SP4.1G0A confused portrait replacement: 19 October 2026

The owner demonstrated that the **confused** portrait in `office.002` was cropped at its left outline, despite the earlier pleased sprite replacement. A new, correctly framed Paul confused illustration was created and independently checked, rather than stretching, shrinking or overlapping actors.

- **New Drive source PNG:** [paul-office-seated-confused-replacement-v02.png](https://drive.google.com/file/d/1z8x-Cn24crE0hHbPwgneb2HGLyuWuhIN/view). Source SHA-256: `d5e674364e659c8c4ea700153f24e80db1241a5a8f64ef3bf44e9499e72449ec`.
- **Production WebP:** `public/assets/generated/characters/paul-office-seated-confused-v01.webp` replaced in GitHub with the verified 1130×1448, 169,190-byte WebP. SHA-256: `3f7133bf3037a97fc7a315d4a2841d730561bc56bf8ba15290145db2e168adfd`.
- **Drive WebP backup:** [paul-office-seated-confused-v02.webp](https://drive.google.com/file/d/1wRBgGQtYCVSFlfu53onTvQeU942Y7hWl/view).
- Source PNG and production WebP alpha bounds are **(41, 110) to (1095, 1375)** within 1130×1448. All four outer edges have zero opacity; no illustrated outline touches the canvas boundary. This was measured on both the source PNG and the exact committed WebP.
- Manifest updated to Google Drive source revision 2; runtime cue cache-busted to `?v=2`; packaging and SHA checks included in tests.
- Office actor staging remains the originally approved **Paul right 3.5%, Stephen left 35% / width 30%**, with no CSS overlap tricks.
- **Human gate still open:** inspect Paul's new confused pose for likeness, transparent outline, table perspective and the separated actors at `office.002` on the deployed game, plus neutral and pleased. **Do not merge until approved.**

The older notes below document superseded failed experiments; this replacement is the current implementation.

## Diagnosis and actual replacement

Owner's first preview proved that the 3.5% CSS optical inset **did not restore the missing black outline on the left of Paul's arm**. This is an issue within the tightly cropped source image, not general desk geometry. That scale-only workaround has been **removed**.

Owner supplied and explicitly requested trial integration of the new, corrected **Paul pleased / satisfied** image `paul_s_pleased_portrait_sticker.png`. This is the only reworked expression. For safe transparent margin without altering the supplied illustrated pixels, the full RGBA picture was placed on a slightly wider transparent canvas: original **1086×1448**, revised **1130×1448**, with **22 transparent pixels** added on each horizontal side. The bottom remains anchored as before. This conservatively preserves approximately the same on-stage apparent figure size as the previous 0.965 test while eliminating the CSS per-expression transform.

- **Approved-for-trial source staged to Drive:** [`paul-office-seated-pleased-recanvas-v02.png`](https://drive.google.com/file/d/15eJA-wLRl_lsWvCnYh1kgAYV894S_C7B/view)
- **Source SHA-256:** `0b5694a880f0ad5f1bb216b8ab3389beae7e7b584fd069838fd9816c851eb03d`
- **Optimised production WebP:** `public/assets/generated/characters/paul-office-seated-pleased-v01.webp`, quality 90, **1130×1448**, 176,114 bytes, SHA-256 `d534edb74731d855354b60399b1b0a99c8fdd750775b553004899e038d7cb143`.
- **Drive WebP backup:** [`paul-office-seated-pleased-recanvas-v02.webp`](https://drive.google.com/file/d/1gjyWIFzsPKL5yX_02Rtf_6abjNXu-oNZ/view).
- **Versioned manifest:** `generated-assets/manifests/paul-office-seated-pleased-v01.json` revision 2, pointing to the new original.
- **Cache bust:** `seatedExpressionSources.Paul.pleased` now requests `?v=2`, keeping other office sprites untouched.

Asset materialisation's existing Google OIDC length issue #60 remains an unrelated pipeline defect; the verified production WebP is committed as a Git binary blob through the same proven source-backed path used by SP4.1F.

## Second owner screenshot — real cause of the still-visible vertical seam

The owner supplied a fresh screenshot at **“Is China far?”**, not the expected pleased checkpoint. This is **`office.002`**, a **Paul confused** cue (`paul-office-seated-confused-v01.webp`). Hence altering the pleased source could not affect this screenshot.

Inspection of the exact approved confused source PNG (`1086×1448`) shows that its alpha touches the **left image boundary** over the sleeve and lower arm: the edge is genuinely straight/opaque, not hidden by a CSS `overflow:hidden` parent. Current scene CSS explicitly sets `.actor-portrait { overflow: visible }`, but Paul's actor was positioned too far to the right, exposing a vertical gap between this source edge and Stephen's sleeve.

**Owner rejected overlap workaround (19 October 2026):** the latest screenshot showed that moving Paul to `right:7.25%` and lowering his stacking order made Paul's torso/sleeve visibly overlap Stephen. This is **not acceptable** and has been removed. All three expressions are again anchored at the original `right:3.5%` alongside Stephen at `left:35%; width:30%`, restoring their original 1.5% stage-width actor-box gap with no per-actor z-index manipulation. The source-edge defect on Paul **confused** remains an explicit outstanding image task. The original PNG is cropped flush to the left over the sleeve: the proper corrective action is a dedicated approved confused-sprite outpaint with real illustrated continuation of the missing outline, not a CSS overlap, arbitrary shrinking or blank transparent padding. The pleased v2 replacement remains intact. Do not merge PR #62 until the confused art and three expressions are visually approved.

Regression now explicitly checks `office.002` confused and `office.004` pleased, the restored separated registration and old CSS inset removal. Human acceptance required for Paul/Stephen separation, sleeve layering, neutral pose, speaker glow, white dialogue, desk seam and small-screen crops. Do not merge before visual sign-off.

## 19 October 2026 owner screenshot: Paul/Stephen overlapping

- The owner's 1515px-wide Chapter 1 screenshot exposed Paul and Stephen's shirts overlapping in the neutral opening pose after the 7.25% Paul inset.
- The staging workaround has been reverted to the approved 3.5% Paul right margin, 35% Stephen left margin/30% width, with no forced z-order. This restores actor separation for the entire seated expression set.
- The dedicated v2 pleased WebP remains installed; the *confused* source remains cropped and needs approved artwork repair rather than another positioning trick.
- Run CI and preview all three expressions. **PR #62 stays draft/unmerged.**

## Visual and functional gate

- First compare Paul's pleased expression to neutral/confused, with particular attention to the **left outer upper-arm contour** and the right arm, not just the general sprite size. Confirm the newly illustrated outline actually reads cleanly against the office background.
- Confirm seated desk/forearm alignment, Stephen and David stability, speaking highlight and scene dialogue controls. Check desktop and mobile crops.
- Exact-head tests and Cloudflare preview required. **Keep PR #62 draft/unmerged until owner approves this specific replacement.** If the contour is still visually cut within the new artwork, further outpainting of that one sprite would be required; do not attempt another blind CSS zoom.
- Once accepted, merge PR #62 and proceed to G0B song-panel fixes.
