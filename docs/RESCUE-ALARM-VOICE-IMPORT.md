# GAME-SP4 — Back in England: voice recording and upload guide

The exact approved David/Paul office-alarm dialogue immediately following
Stephen's interrupted phone message. Ten MP3 recordings; no new dialogue,
scene artwork, voice identity, or narrative choices.

**Upload destination:** [audio folder on the development branch](https://github.com/tametheboardgame/stephen-martin-project/tree/agent/game-sp4-back-england-voice/public/assets/audio/dialogue).

| File | Speaker | Exact spoken dialogue | Acting direction |
|---|---|---|---|
| `rescue.alarm.001.mp3` | David | Stephen has stopped responding. | Quiet concern. Treat this as evidence of an incident. |
| `rescue.alarm.002.mp3` | Paul | He said he was muting us. | Utterly matter-of-fact. |
| `rescue.alarm.003.mp3` | David | Exactly. Pre-arranged silence. A signal. | Certain he has cracked a secret code. |
| `rescue.alarm.004.mp3` | Paul | That would be a very stupid signal. | Dry and sceptical. |
| `rescue.alarm.005.mp3` | David | We have established that he makes questionable decisions. | Official, as though presenting a risk finding. |
| `rescue.alarm.006.mp3` | David | There it is. The final transmission. | Hushed revelation, dramatic significance. |
| `rescue.alarm.007.mp3` | Paul | Could just be his battery. | Casual common sense. |
| `rescue.alarm.008.mp3` | David | Paul. Please respect the gravity of this international incident. | Exasperated, pompously solemn. |
| `rescue.alarm.009.mp3` | Paul | Right. Shall I pack the bears? | Perfectly genuine practical question. |
| `rescue.alarm.010.mp3` | David | Pack everything. | Decisive, overconfident mission commander. |

## Instructions

1. Record and export each line as a real MP3 using the existing David and Paul
   voices. Preserve the punctuation and do not shorten any dialogue.
2. Select the `agent/game-sp4-back-england-voice` branch in GitHub before
   uploading; do **not** add files directly to `main` until this PR is approved.
3. Use **Add file → Upload files** in `public/assets/audio/dialogue/`.
   Use exactly these filenames; other files are rejected by the build.
4. The existing player starts the matching clip for each `rescue.alarm.XXX`
   line, advances after natural audio completion, supports Pause/Play and Next,
   and falls back to text timing if a clip is missing or cannot play.
5. Test both speakers' voices, line 006's phone display, the transition from
   Stephen's final recorded line, save/resume, muting, and the four silent
   travel montage cards. Then approve the PR for merging.

The 10 recordings are optional until uploaded; the existing office and 25
Stephen holiday recordings remain supported. No extra narration for the
`BACK IN ENGLAND` title, the phone message, or the travel montage. The
repository is public; do not upload unauthorised real-world recordings or
private information.

**Owner gate:** no merge or public distribution until the uploaded audio
has been listened to and approved.
