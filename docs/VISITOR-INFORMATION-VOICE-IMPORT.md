# GAME-SP4: Visitor Information recorded dialogue (22 clips)

This guide reflects the **canonical game source** on 17 October 2026, in
`src/china-data.js`. The game keeps the existing Visitor Information hotel
background, David and Paul sprites, clues, guessing rules and three routes.

**Upload destination:** [Voice folder on the audio development branch](https://github.com/tametheboardgame/stephen-martin-project/tree/agent/game-sp4-visitor-information-voice/public/assets/audio/dialogue).

The established synthetic David and Paul ElevenLabs voices must be used.
Export genuine MP3s named **exactly** as below, in lowercase.

| Filename | Speaker | Exact spoken dialogue | Appears |
| --- | --- | --- | --- |
| `rescue.hub.001.mp3` | David | We begin with intelligence gathering. Observe, analyse, act. | Opening |
| `rescue.hub.002.mp3` | Paul | The hotel has little shampoos. | Opening |
| `rescue.hub.003.mp3` | David | Paul, focus. | Opening |
| `rescue.hub.004.mp3` | Paul | I am. They do conditioner too. | Opening |
| `rescue.hub.005.mp3` | David | I don't know why I brought you. | Opening |
| `rescue.hub.006.mp3` | Paul | You said you needed muscle. | Opening |
| `rescue.hub.007.mp3` | David | I said I needed backup. | Opening |
| `rescue.hub.008.mp3` | Paul | Same thing, isn't it? | Opening |
| `rescue.hub.wrong.cult.001.mp3` | Paul | That's a hill, David. | Wrong: The Summit |
| `rescue.hub.wrong.cult.002.mp3` | David | Topographic deception. | Wrong: The Summit |
| `rescue.hub.wrong.detention.001.mp3` | Paul | Do we have to dress up? | Wrong: Banquet |
| `rescue.hub.wrong.detention.002.mp3` | David | This is covert. | Wrong: Banquet |
| `rescue.hub.wrong.reassemble.001.mp3` | Paul | I wouldn't mind a massage. | Wrong: Spa |
| `rescue.hub.wrong.reassemble.002.mp3` | David | Then you are an operational liability. | Wrong: Spa |
| `rescue.hub.hint.cult.mp3` | Paul | He mentions being 'their' something. Could it be that mountain club? | Hint: actual Summit route |
| `rescue.hub.hint.detention.mp3` | Paul | 'Official' sounds like the banquet people with the special badges. | Hint: actual banquet route |
| `rescue.hub.hint.reassemble.mp3` | Paul | He said 'spa'. It probably means the spa, David. | Hint: actual spa route |
| `rescue.hub.correct.001.mp3` | David | We have our location. | Correct answer |
| `rescue.hub.correct.002.mp3` | Paul | The brochure has a map. | Correct answer |
| `rescue.hub.correct.003.mp3` | David | Exactly. My deduction has been confirmed. | Correct answer |
| `rescue.hub.correct.004.mp3` | Paul | By the brochure? | Correct answer |
| `rescue.hub.correct.005.mp3` | David | Don't undermine the operation. | Correct answer |

## Scene and sequencing

- Eight arrival lines autoplay, one voice clip at a time, in the hotel lobby.
- The three evidence hotspots are **silent visual props**, not voiced. Their
  dynamically selected text is not the `hotspots.*.text` material in the
  data file. Do not record those unused descriptions.
- An incorrect destination triggers its **two** spoken replies. A subsequent
  wrong guess can cancel this exchange and start the newly selected route's
  replies. Correct destination guesses cancel all wrong dialogue.
- Paul's hint is heard **once per investigation**, on the second wrong guess,
  and depends on the actual saved route. The displayed `Paul:` speaker
  prefix is not part of the recording.
- The five correct deduction lines play in sequence; the route-intro stage
  that follows is **outside this voice work package**.
- Voice clips control line timing. Pause/Play resumes the same recording,
  Next skips it, Sound Off uses text timing, and unavailable MP3s fall back
  gracefully. The user can still interact with clues and guesses.

Do not upload directly to `main` until the new draft PR passes listening
review. The files will be automatically packaged into the Cloudflare preview
when uploaded on this branch: no extra source-code change is needed.
The repository is public; use only approved synthetic dialogue.
