# Summit route — complete 44-clip ElevenLabs recording guide

**Status:** voice-ready development branch `agent/game-sp4-summit-voice`; 44 optional MP3s awaiting upload and owner listening gate. All words below come from the canonical source scripts, without rewriting the approved joke dialogue.

**Exact upload folder:** [open the Summit development branch audio folder](https://github.com/tametheboardgame/stephen-martin-project/tree/agent/game-sp4-summit-voice/public/assets/audio/dialogue). Use **Add file → Upload files**, select this branch, and upload the precise lowercase filenames. All files must be actual MP3 encoded audio (128 bytes–25 MiB). Do not upload to `main` before review.

## Recording script

Each clip contains only the words in **Spoken line**; the speaker labels and game-choice labels are **not** voiced. The puzzle's "GATEKEEPER:" and "Paul:" prefixes are printed labels, not spoken words.

| Stage | MP3 filename | Voice | Spoken line |
|---|---|---|---|
| Gate arrival | `summit.intro.001.mp3` | Gatekeeper | Welcome to The Summit. Have you come to honour our radiant new chairman? |
| Gate arrival | `summit.intro.002.mp3` | David | We've come for Stephen Martin. |
| Gate arrival | `summit.intro.003.mp3` | Gatekeeper | Then yes. |
| Gate arrival | `summit.intro.004.mp3` | Paul | Does he know he's a chairman? |
| Gate arrival | `summit.intro.005.mp3` | Gatekeeper | He didn't yesterday. |
| Gate arrival | `summit.intro.006.mp3` | David | We've infiltrated the inner circle. |
| Gate arrival | `summit.intro.007.mp3` | Paul | We're standing outside the gate. |
| Check 1: prompt | `summit.check.001.prompt.mp3` | Gatekeeper | Every device must stay charged. What sacred object do you offer? |
| Check 1: vase | `summit.check.001.vase.001.mp3` | Gatekeeper | Very shiny. Can it charge an iPhone? |
| Check 1: vase | `summit.check.001.vase.002.mp3` | David | A ceremonial power source. No? Fine. |
| Check 1: ticket | `summit.check.001.ticket.001.mp3` | Paul | That's a flight ticket. Not a charger. |
| Check 1: ticket | `summit.check.001.ticket.002.mp3` | David | We're testing border protocols. |
| Check 1: charger | `summit.check.001.charger.001.mp3` | Gatekeeper | The sacred cable! You may proceed. |
| Check 1: charger | `summit.check.001.charger.002.mp3` | Paul | Told you it was about his phone. |
| Check 1: hint | `summit.check.001.hint.mp3` | Paul | His phone ran out of battery. Maybe give them the thing that charges phones? |
| Check 2: prompt | `summit.check.002.prompt.mp3` | Gatekeeper | Speak the phrase our radiant chairman most wishes to hear. |
| Check 2: spreadsheet | `summit.check.002.spreadsheet.001.mp3` | Gatekeeper | That sounds deeply unromantic. |
| Check 2: spreadsheet | `summit.check.002.spreadsheet.002.mp3` | David | It's the highest praise in my organisation. |
| Check 2: legs | `summit.check.002.legs.001.mp3` | Gatekeeper | Extraordinary reverence. |
| Check 2: legs | `summit.check.002.legs.002.mp3` | Paul | Well, he's not wrong. |
| Check 2: ticket | `summit.check.002.ticket.001.mp3` | Gatekeeper | We don't do tickets. |
| Check 2: ticket | `summit.check.002.ticket.002.mp3` | David | You'll wish you did when this escalates. |
| Check 2: hint | `summit.check.002.hint.mp3` | Paul | Maybe compliment the bloke, rather than his paperwork. |
| Check 3: prompt | `summit.check.003.prompt.mp3` | Gatekeeper | One final question. Why have you come to see our chairman? |
| Check 3: rescue | `summit.check.003.rescue.001.mp3` | Gatekeeper | Rescue him from having a lovely time? What a peculiar request. |
| Check 3: join | `summit.check.003.join.001.mp3` | Gatekeeper | Membership forms are in the lobby. |
| Check 3: join | `summit.check.003.join.002.mp3` | David | I am not filling another form in. |
| Check 3: flight | `summit.check.003.flight.001.mp3` | Gatekeeper | His flight? Already? Quickly, someone fetch the chairman! |
| Check 3: flight | `summit.check.003.flight.002.mp3` | Paul | That worked suspiciously well. |
| Check 3: hint | `summit.check.003.hint.mp3` | Paul | They really don't want him leaving, do they? Mention the return flight. |
| Throne-room ending | `summit.ending.001.mp3` | Stephen | David? Paul? What the hell are you doing here? |
| Throne-room ending | `summit.ending.002.mp3` | David | We're here to rescue you. |
| Throne-room ending | `summit.ending.003.mp3` | Stephen | From what? |
| Throne-room ending | `summit.ending.004.mp3` | Paul | The cult. |
| Throne-room ending | `summit.ending.005.mp3` | Stephen | It's a social club. |
| Throne-room ending | `summit.ending.006.mp3` | David | They've made you their leader. |
| Throne-room ending | `summit.ending.007.mp3` | Stephen | Yes. It's been a very successful afternoon. |
| Throne-room ending | `summit.ending.008.mp3` | David | Come home. This has gone too far. |
| Throne-room ending | `summit.ending.009.mp3` | Stephen | I have a mountain view, excellent company, and nobody has asked me to join a meeting. Why would I? |
| Throne-room ending | `summit.ending.010.mp3` | Paul | Fair. |
| Throne-room ending | `summit.ending.011.mp3` | David | Paul, stop agreeing with the hostage. |
| Throne-room ending | `summit.ending.012.mp3` | Stephen | Also, I've cancelled my return flight. |
| Throne-room ending | `summit.ending.013.mp3` | Paul | Do you get a refund on those? |
| Throne-room ending | `summit.ending.014.mp3` | Narrator | David applies for a senior position in the club. The form asks for 'humility'. He fails instantly. |

## Performance

- **Gatekeeper:** ceremonious, unreasonably sincere and intensely reverent about his newly appointed chairman. Eight gatekeeper opportunities including prompts and choice replies.
- **David:** confident, procedural, increasingly alarmed by the perfectly happy chairman. Deadpan self-importance works better than shouting.
- **Paul:** dry, practical and repeatedly correct; genuinely interested in whether this is worth the trouble.
- **Stephen:** genuinely delighted with the mountain social club. Irritated to find David and Paul have arrived.
- **Narrator:** deliberately understated closing sting, the last line of the throne-room dialogue (one MP3).

## Branch-dependent playback rules

1. Seven gate-arrival clips autoplay, then the first admissions prompt is spoken without selecting an answer.
2. Each of the three admissions rounds has one spoken Gatekeeper question. Each answer option has **one or two separate character files**, played consecutively. Unchosen answers are not heard.
3. Paul's round-specific hint is spoken only once per round, after the second wrong answer. The player remains free to retry; no incorrect answer changes Stephen's route.
4. Correct-answer responses finish before autoplay advances to the next prompt (or the throne room); manual Next and the original confirmation buttons still work.
5. All 14 approved throne-room lines, including the narrator's last punchline, play in sequence. The final `HEAVEN WAS A PLACE ON EARTH` end card is silent.
6. Sound Off and missing MP3s preserve the original timed text/interactive choice flow. Pause/Play and Next use the established shared dialogue player.

**Do not record** menu text, puzzle option labels, clue text, the end card, or scenic notices. They are static UI.

## Listening acceptance

Before merge, verify the arrival, each round prompt, one wrong and one correct response per round, each hint, the entire 14-line ending, stopping a clip when another answer is chosen, Sound Off, Next, and save/resume. The build will import uploaded files automatically without any manifest edit.

The repository is public; only upload approved synthetic recordings, not private or unauthorised recordings.
