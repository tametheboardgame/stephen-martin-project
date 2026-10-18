# GAME-SP4.1E — Speaking-character highlight throughout the story

**Started:** 18 October 2026. **Baseline:** D2 owner-approved merge `3c7bb32398238bd55ad98929389bf7e96c5b3175`.

## Behaviour before this work
- Opening office relies on its existing `is-speaking` presentation, with a small selected-portrait brightness change.
- Summit entrance and endings have some individual `data-speaker` CSS filters. Other sightseeing, hotel, route and rescue scenes have no unified actor indication.
- The Ending C cardboard Stephen already has a separate sprite and an individual previous highlight rule; it must **never** be confused with real Stephen.
- Speaker text uses approved named white dialogue with blue tabs, and playback/skip controls share an approved top bar.

## Implementation contract
- One shared mapping from scene and *visible* speaker name to existing actor image/figure IDs. Actor state is `data-speaking="true"` or `"false"`, assigned by `refreshSpeakerFocus` and `setActiveSpeaker`.
- Existing protagonist and character sprites remain separate. No new images, generated animation, transforms, scaling, camera movement or gameplay logic.
- On every render clear previous focus, then highlight only the visible actor actually named in the current spoken dialogue. Do not glow invisible/absent characters, silent intermissions, narrators, purely visual beats, unresolved choices, hotel evidence, unsolved games, or summary.
- Recheck and clear focus when Pause is pressed, when the page becomes hidden, on menu/replay/change route, when leaving a scene, and when image loading makes a stage temporarily unavailable. Resume or Play re-evaluates the current speaker.
- The central helper updates legacy `data-speaker` for the existing opening/ending selectors as well. This prevents a legacy character glow persisting during Pause.
- Light is a restrained warm drop shadow and slight luminance increase with no change to the approved pose/position. Respect reduced-motion settings. Do not use full-scene darkness overlays.
- Ending C speaker `Cardboard Stephen` maps exclusively to `assemblyEndingCardboardActor`, while `Stephen` maps exclusively to `assemblyEndingStephenActor`.

## Scene coverage and actors
| Scene | Available active actors |
|---|---|
| Office opening | Stephen, David, Paul |
| Great Wall | Stephen, Promoter |
| Forbidden City | Stephen, Attendant |
| Night Market | Stephen, Spa representative |
| Back in England office alarm | David, Paul |
| Visitor information hotel | David, Paul |
| Summit entrance | David, Paul, Gatekeeper |
| Ending B office entrance | David, Paul, Official |
| Spa route introduction | David, Paul |
| Ending A throne | Stephen, David, Paul |
| Ending B finale | Stephen, David, Paul, Official |
| Ending C finale | Stephen, David, Paul, Cardboard Stephen |

The phone interstitial, travel cards, silent intermissions, puzzle UI and ending summaries have no active *visible* speaker, so are intentionally not highlighted.

## Acceptance and exclusions
- Run `npm run verify` on exact PR head, and retain all existing route, save, audio and skip tests. Check at 1366×768, tablet and phone.
- Step through alternating speakers, speakerless beats, dialogue after a choice, opening/closing on each route, one pause/resume, one change route and background-tab handling.
- Verify no scaling, sprite-shift, darkening of Ending B, clipping or overlay interference, and no glow transferred from real Stephen to cardboard.
- Verify actual Cloudflare branch preview and seek explicit owner visual approval before merge.
- **Deferred:** Ending B brightness is tracked separately in [issue #56](https://github.com/tametheboardgame/stephen-martin-project/issues/56). No new transition artwork here. SP4.1F and G follow the roadmap separately.
