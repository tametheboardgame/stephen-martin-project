# GAME-SP4.1G0A — Paul pleased arm clip correction

**Baseline:** PR #61 merge `394aeb79c07ec4b051ea515dd5c1299a39832a21`. Active draft PR #62 on `agent/game-sp41g0a-paul-pleased-registration`.

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

## Visual and functional gate

- First compare Paul's pleased expression to neutral/confused, with particular attention to the **left outer upper-arm contour** and the right arm, not just the general sprite size. Confirm the newly illustrated outline actually reads cleanly against the office background.
- Confirm seated desk/forearm alignment, Stephen and David stability, speaking highlight and scene dialogue controls. Check desktop and mobile crops.
- Exact-head tests and Cloudflare preview required. **Keep PR #62 draft/unmerged until owner approves this specific replacement.** If the contour is still visually cut within the new artwork, further outpainting of that one sprite would be required; do not attempt another blind CSS zoom.
- Once accepted, merge PR #62 and proceed to G0B song-panel fixes.
