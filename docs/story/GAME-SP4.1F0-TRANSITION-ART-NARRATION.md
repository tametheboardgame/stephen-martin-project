# GAME-SP4.1F0 — Illustrated transition art & spoken narrator plan

**Started:** 18 October 2026. **Baseline:** merged SP4.1C2 Ending B daylight, commit `61b94d9ed2d93b78a21c9df03d07c195f3d813f0`.
**Status:** Proposed artwork and narrator copy for owner review, **NOT YET AUTHORISED FOR GENERATION OR AUDIO INTEGRATION**.

## Decision requested

Build a modest group of reusable static *illustrated scene backgrounds* paired with a separately recorded **narrator voice**. The narrator is an off-screen storytelling role, not Stephen, David or Paul; this proposed treatment does **not** force any particular voice provider. Every recorded narration gets its own ID and MP3 filename. Visual captions remain live/editable HTML and the narration is optional (no MP3 falls back to text timing).

**Critical scope controls:** no additional playable locations, branching outcomes, existing dialogue edits, character motion, new physics/engine, or gratuitous title screens. Complete game target remains 15–25 minutes for one ending. Approved Chapter Two illustration and existing full scenes must be reused, not regenerated.

## F0 artwork inventory — four core images to generate

| Packet | Priority and asset | Used in existing code | Illustration brief | Safe space / exclusions |
|---|---|---|---|---|
| **F1** | P1 · `transition-china-passing-time-v01.webp` | `chinaIntermission` for **both** Forbidden City and Night Market (2 uses of one illustration) | Painterly comic travel-postcard montage: recurring approved Stephen enjoying food/sights while exaggerated clocks, postcards or calendar pages imply time passing. Neutral enough for afternoon and evening. | Centre/left quiet area for *live* “A few days later / The next evening” and named next destination; no embedded dates, lettering, detailed venue signage or misleading extra people. |
| **F2A** | P1 · `transition-operation-flight-luggage-v01.webp` | `rescueTravelScene`, montage steps **001–002** | Absurd British-espionage holiday-rescue trip: the approved David acting intensely tactical at departures, Paul weighed down by baggage and ridiculous bear-printout paperwork. Can be the same scene for flight/airport and luggage carousel beats. | Reserve clear space for live title, narrator caption and simple progress; no real airports, airlines, boarding details or actual geographical identifiers. |
| **F2B** | P1 · `transition-operation-map-expenses-v01.webp` | `rescueTravelScene`, montage steps **003–004** | Second linked comic travel illustration: David confidently examining an upside-down map, Paul quietly noticing the problem; an exaggerated pile of receipts hints at entirely unnecessary expense. | Static single composition, no baked dialogue, prices, addresses or real company branding. Match F2A palette and lens. |
| **F3** | P1 · `transition-stephen-route-handoff-v01.webp` | `chinaRouteHandoff`, reused for **cult/detention/reassemble** (3 routes, **one** background) | Comic “wrong turning” travel-poster composition: approved Stephen happily strolling forward, framed by vague contrasting holiday promises, with the next location *unspecified*. His route-specific destination and warning appear via live titles only. | Avoid drawing a recognisable mountain hall, official office or spa as the only endpoint. Do **not** create three separate branch images unless owner later requests. Leave centre/right readable for route-specific headings. |

All artwork uses the project's established illustrated/graphic-novel style, approved actor references, staging via Drive, manifest to optimised WebP, and a **1672×941** reference canvas, with mobile 3:4 cropping checked. Keep compositions legible if the dynamic captions are repositioned at narrow widths. Generated artwork has no game text burned into pixels. Output image filenames above are **proposed destination basenames**; do not invent Drive file IDs or asset-manifest records before originals exist and are approved.

### Existing art to reuse (no new generation yet)

- **Chapter Two opening, “TWO DAYS LATER… IN CHINA”**: existing approved `chapter-two-days-later-title-v01.webp` in `chinaTransition`. Add narrator voice optionally; **no art replacement**.
- **Back in England after dead phone battery**: current `chinaFinalScene` has the existing phone/muted night-market treatment and “BACK IN ENGLAND…” live card. Proposed narration, without new art unless tested and owner asks for one.
- **Arrival / visitor information**: approved `china-visitor-information-lobby-background-v01.webp` in `rescueHubArrival` and hotel. Narrated arrival, reuse its illustration.
- **Ending summaries**: full Ending A/B/C finales now exist. **No extra ending pictures** in this packet.

**F4 conditional only**: If the owner sees a genuine visual gap after reviewing the four core images in-game, consider **up to two** separately scoped additions: one illustrated Back-in-England connector and one arrivals card. Do not silently include these in the initial generation batch.

## Off-screen narrator — draft ElevenLabs/recording script

The following **12 candidate lines** are new proposed narration, **not** amendments to the approved character dialogue. All lines must be reviewed/approved before voice files are uploaded or referenced. Spoken lines should sound like a lightly dry, British mock-documentary narrator: calm, matter-of-fact, increasingly unimpressed by the two would-be rescuers. The existing scene title remains live HTML and need not be read again verbatim.

| # | Scene/condition (exact existing phase) | Audio ID = filename without extension | Proposed spoken line |
|---|---|---|---|
| 01 | Chapter Two illustrated title, `transition` | `transition.china.chapter-two.001` | “Two days later, in China. Stephen was having a marvellous time. David’s risk assessment had not made the journey.” |
| 02 | `intermission` to `palace` | `transition.china.to-palace.001` | “A few days later, Stephen continued sightseeing, blissfully unaware that the group chat was still in a state of emergency.” |
| 03 | `intermission` to `market` | `transition.china.to-market.001` | “The next evening, Stephen headed into the night market. Surely nothing completely unnecessary would happen there.” |
| 04 | `route-handoff`, `cult` | `transition.route.summit.001` | “Stephen was off to the Summit. Spectacular scenery, extremely friendly company, and absolutely no cause for concern.” |
| 05 | `route-handoff`, `detention` | `transition.route.banquet.001` | “Stephen had accepted an honorary banquet invitation. It was about to become a great deal more official than anyone intended.” |
| 06 | `route-handoff`, `reassemble` | `transition.route.spa.001` | “Stephen had chosen the spa. David and Paul, unfortunately, were not going to enjoy the relaxing part.” |
| 07 | `final-message` step 2 / Back in England | `transition.england.back.001` | “Meanwhile, back in England, two men were about to mistake a flat phone battery for an international incident.” |
| 08 | `rescue-travel` montage 001 | `transition.travel.001` | “Two tickets were booked. Neither was refundable. Neither had been properly thought through.” |
| 09 | `rescue-travel` montage 002 | `transition.travel.002` | “Paul had brought all the printer’s bear pictures. The luggage allowance had not been consulted.” |
| 10 | `rescue-travel` montage 003 | `transition.travel.003` | “David consulted his map. Paul suggested turning it the right way up.” |
| 11 | `rescue-travel` montage 004 | `transition.travel.004` | “Several hours and a spectacular expense claim later, neither had tried phoning Stephen’s hotel.” |
| 12 | `rescue-hub-arrival` | `transition.hotel.arrival.001` | “At last, visitor information. The investigation could begin, despite there being absolutely nothing to investigate.” |

**File location for all twelve (after approval and recording):**
`public/assets/audio/dialogue/<audio-id>.mp3`. For example,
`public/assets/audio/dialogue/transition.travel.001.mp3`.

This follows the game's existing recorded-dialogue convention: the dynamic MP3 path is built from `VOICE_PATH + id + ".mp3"`; missing audio retains text-timed playback instead of blocking story progression. Use one voice consistently for the narrator (new voice or a separately approved existing one). The user will generate and upload the files through the established audio workflow, and each file must be audibly checked before integration.

## Narrative continuity / exact code checkpoints

The established phase flow is:
`transition` → Wall choice → optional `intermission` to Palace → optional `intermission` to Market → route-specific `route-handoff` → `final-message` step 0/1/2 → `rescue-alarm` → `rescue-travel` four steps → `rescue-hub-arrival` → hotel clue investigation → chosen ending.

**Do not narrate a route which the player did not choose.** The matching route ID and intermission target are already in the existing V3 save. Do not change that schema.

## Proposed staged implementation after F0 approval

1. **F1**: Generate/approve the one time-passing illustration, stage its original on Drive, import WebP through a manifest and wire the two existing `chinaIntermission` destination states to the shared backdrop with live headings.
2. **F2A/F2B**: Generate/approve both David/Paul travel stills, materialise both once, and use montage step 1–2 / step 3–4 without creating new scene states.
3. **F3**: Generate/approve one universal route handoff still, apply to the existing three `routeHandoffArt` route labels; keep the destination-specific live text.
4. **Narration integration**: *After script is approved*, add a small immutable scene+step-to-voice table and show a concise editable narration subtitle on applicable transition cards (not character speech bubbles and not a glowing visible actor). Integrate with the **existing** `holidayVoiceBeat()` ID playback; MP3 duration owns hold timing only when valid; silent/missing MP3 falls back to current timeline.
5. Cover Sound On/Off, Pause/Play, Skip to choice/investigation, Next, saves/Resume, late onended cancellation, hidden tab, missing MP3, loading curtain and mobile cropped artwork. The existing skip must never bypass an unresolved decision. Keep existing approved text and speech.
6. Obtain actual Cloudflare scene review with each approved image and voice track. Commit in bounded incremental draft PRs, not one art-heavy megapatch. Finish asset-proof documents and merge only after owner approval.

**Audio timing caution:** Twelve clips played only along a single path yield approximately **7–9** narrations on a playthrough (initial title, zero–two time jumps, one route card, England, four travel, arrival). Target roughly 3–6 seconds per clip, avoid duplicate long caption holds and keep the overall 15–25-minute game limit. Record final speech lengths after files exist; never assume a precise duration.

## Approval checklist for F0

- [ ] The **four core illustrations** and which scenes reuse each are correct.
- [ ] The **12 draft narrator lines** are acceptable, or edited and explicitly approved.
- [ ] Choose which single narrator voice/accent or new voice will perform all lines.
- [ ] Confirm approved order for first image generation: F1 → F2A → F2B → F3.
- [ ] Optionally later discuss two extra F4 assets only if playtesting demonstrates a gap.

No image or MP3 has been generated or uploaded as part of this planning PR.
