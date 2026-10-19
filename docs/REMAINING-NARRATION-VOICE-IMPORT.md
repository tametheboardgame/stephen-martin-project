# All remaining narrator recordings — 14-clip ElevenLabs production sheet

**Status:** prepared for recording on branch `agent/game-sp4-remaining-narration`. This page is the authoritative upload checklist for the existing story's as-yet-unrecorded **narrator**, not a request for additional character dialogue.

All fourteen clips use the **existing ElevenLabs Narrator voice** (the same voice used for the opening and recorded Summit stinger). Create one standalone MP3 per row. Square-bracket emotional directions are for ElevenLabs and must not be spoken; filenames likewise must not be spoken. **Spoken words have not been changed** from the current scene text.

Upload **all 14** to [`public/assets/audio/dialogue/` on this branch](https://github.com/tametheboardgame/stephen-martin-project/tree/agent/game-sp4-remaining-narration/public/assets/audio/dialogue), *not* directly to `main`.

## Ready-to-paste prompts, in story order

| Scene | Exact MP3 filename | ElevenLabs prompt (copy the complete cell) |
|---|---|---|
| Chapter Two — China title | `transition.china.chapter-two.001.mp3` | [warmly, dry documentary narration] Two days later, in China. Stephen was having a marvellous time. David’s risk assessment had not made the journey. |
| China — Forbidden City time jump | `transition.china.to-palace.001.mp3` | [lightly amused, unhurried] A few days later, Stephen continued sightseeing, blissfully unaware that the group chat was still in a state of emergency. |
| China — Night Market time jump | `transition.china.to-market.001.mp3` | [wryly, with subtle foreboding] The next evening, Stephen headed into the night market. Surely nothing completely unnecessary would happen there. |
| Route handoff — Summit | `transition.route.summit.001.mp3` | [pleasantly, with gentle irony] Stephen was off to the Summit. Spectacular scenery, extremely friendly company, and absolutely no cause for concern. |
| Route handoff — Banquet | `transition.route.banquet.001.mp3` | [formal, with rising bureaucratic dread] Stephen had accepted an honorary banquet invitation. It was about to become a great deal more official than anyone intended. |
| Route handoff — Spa | `transition.route.spa.001.mp3` | [calmly, dryly ominous] Stephen had chosen the spa. David and Paul, unfortunately, were not going to enjoy the relaxing part. |
| Back in England transition | `transition.england.back.001.mp3` | [deadpan, with mock gravity] Meanwhile, back in England, two men were about to mistake a flat phone battery for an international incident. |
| Rescue travel — tickets | `transition.travel.001.mp3` | [matter-of-fact, mildly incredulous] Two tickets were booked. Neither was refundable. Neither had been properly thought through. |
| Rescue travel — luggage | `transition.travel.002.mp3` | [dryly, gently exasperated] Paul had brought all the printer’s bear pictures. The luggage allowance had not been consulted. |
| Rescue travel — map | `transition.travel.003.mp3` | [understated, amused] David consulted his map. Paul suggested turning it the right way up. |
| Rescue travel — expenses | `transition.travel.004.mp3` | [resigned, deadpan] Several hours and a spectacular expense claim later, neither had tried phoning Stephen’s hotel. |
| Visitor Information arrival | `transition.hotel.arrival.001.mp3` | [optimistically formal, then dryly] At last, visitor information. The investigation could begin, despite there being absolutely nothing to investigate. |
| Ending B — final sting | `detention.ending.014.mp3` | [deadpan, with understated mock pride] David proudly frames his government-issued PLEASE LEAVE certificate. |
| Ending C — final sting | `reassemble.ending.015.mp3` | [dryly, with a pause before the punchline] Stephen walks away. David congratulates the cardboard display. |

## What is included

- 12 existing illustrated-transition subtitle cues are already routed through `transitionNarrationBeat()`, `holidayVoiceBeat()`, the MP3 whitelist and the common duration-based audio player; no changes to their wording, IDs or sequencing.
- 2 existing narrator lines conclude Ending B (detention) and Ending C (spa). These now have stable MP3 IDs and use the same player **only when their narrator line is reached**. The other lines in these two endings remain unrecorded, text-timed character dialogue until a separate voice packet is approved.
- Existing narrator recordings `intro.exterior.mp3` (office opening) and `summit.ending.014.mp3` (Ending A) are **already present** and must not be overwritten or recorded again.
- The game keeps its separate narrator subtitle panel on transitions, correct chosen route and montage step selection, Pause/Play, Next, Sound Off, missing-MP3 fallback and existing ending cards and choices.
- There are **no additional unused or unrecorded Narrator-speaker lines** in the currently committed game script beyond these fourteen.

## Acceptance after upload

1. The branch build must package **170/170 dialogue and narrator MP3s**, plus the existing two opening songs. Previous 156 MP3s must be unchanged.
2. Listen to each time jump, all three possible route handoffs, Back in England, travel cards 1–4, visitor information arrival, Ending B stinger and Ending C stinger. Only the chosen route's transition plays in a given game.
3. Confirm narrated clip duration controls progression; missing files fall back to the original written subtitle/timer; Next/Skip/muting does not leave audio playing from another stage. End-card headings themselves remain silent.
4. Explicit owner acceptance and successful CI/Cloudflare checks are required before merging.

**Audio constraint:** genuine MP3s only, named exactly as above, 128 bytes–25 MiB, no placeholder silence. This public project must use only approved synthetic voice recordings.
