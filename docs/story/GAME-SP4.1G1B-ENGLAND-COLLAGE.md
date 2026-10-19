# GAME-SP4.1G1B — Approved England postcard collage

**Source:** Owner-approved original from 19 October 2026, where torn postcard edges visually separate geographically distant London locations. No characters appear in the art.

- **Approved original:** [Google Drive staging PNG](https://drive.google.com/file/d/1dhu_9fDVe9K_7XqMDzN2m95Oq7qp9euU/view), `transition-back-in-england-postcard-collage-v01.png`, 1672×941 RGB, SHA-256 `42474faf39c8dc6f545ef1de9a0b422a628dd7dd75ac53435ee1be652df6934f`.
- **Source-provenance manifest:** `generated-assets/manifests/game-sp41g1b-england-postcard-collage-v01.json`. The pre-existing OIDC GitHub Actions materialiser downloaded the exact PNG from the dedicated Drive folder and committed the optimised `public/assets/generated/locations/transition-back-in-england-postcard-collage-v01.webp`.
- **Implementation:** Replace only the blank `#chinaFinalEngland` background with the approved collage, without any full-stage dark wash. Existing **BACK IN ENGLAND…** heading remains live and selectable; styles position a compact heading at upper left, away from the top-right controls. Mobile breakpoints adapt image cropping and heading size.
- **Narrator:** `transition.england.back.001` and `#transitionNarration` retain the existing separate audio/subtitles and fallback, with no duplicated body copy inside the England image.
- **Unchanged:** G1A powered-off phone, partial-message delivery, route-specific scripts, David/Paul rescue alarm, and all three saved finalStep state transitions.
- **Build & tests:** Include the new fifth approved transition art file; verify source manifest, WebP package, heading and existing narration on all three routes, including resumed England checkpoints.
- **Review gate:** Draft PR. Validate widescreen and narrow portrait image crop, title vs topbar and narrator vs bottom strip, all three route handoffs. Do **not** merge until owner approves visual preview. G1C full Chapter 2 handoff QA follows.

No other art is being regenerated for G1B.
