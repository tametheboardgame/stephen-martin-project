# GAME-SP4.1G2A — Chapter 3 alarm office desk registration

**Base:** G0B merge `31eb2d2c23e44b8aca3d06815f1a8a56e21c9c8d`. Branch `agent/game-sp41g2a-alarm-office-desk`.

## Diagnosis

The approved `office-clean-01-v01.webp` (1672×941) already includes the large wooden foreground tabletop, books, plants and mugs. A separate transparent `office-foreground-01-v01.webp` illustrates a similar, slightly offset tabletop. In Chapter 3, `#rescueAlarmScene` composited both images, creating a doubled desk edge. The existing actor sprites were also anchored to stage bottom (0%) and concealed below the second tabletop, so they were not convincingly seated.

## Small, scene-specific implementation

1. Remove only the `rescue-alarm-foreground` image from Chapter 3. The Chapter 1 office foreground and menu layered foreground remain unchanged.
2. Keep the approved office background and all original David and Paul seated cutout WebPs. Anchor both to the single built-in desk, 24% above stage bottom with a 64%-height frame. At 1672×941 the baked-in desk edge is around 73% of the image height, so hands land just onto the desk rather than hanging at stage bottom.
3. David stays 16% from left and Paul 16% from right in equal 32%-wide frames. At tablet widths, frames become 42% wide with 7% side margins; narrow phones use 43% widths and 4% margins. The phone cue moves upwards on those narrow screens so it does not obscure the characters' faces.
4. Preserve David's preapproved expression-specific optical ratios `.96`, `.93`, `.92`, `.94`, all ten dialogue lines, the original Paul poses, speaker glow, phone, pause/autoplay, save/resume, skip and travel controls.
5. No regenerated art, no script changes, and no new desk mask.

## Human acceptance gate

Inspect the first and final Chapter 3 lines and the phone cue at 1366×768, 1440×900, tablet and narrow mobile. Approve only if the room now shows a *single* coherent desk, both sets of hands touch the tabletop naturally, faces do not overlap, speech tabs are readable, and the phone message is visible without obscuring Paul. Check automatic expression changes and the travel transition.

Leave the PR in draft until approval. If actor geometry still needs tuning, change only the alarm-specific positioning, not Chapter 1.
