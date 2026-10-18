# Approved synthetic spoken dialogue

This folder is the exact upload destination for the project's ElevenLabs MP3
voice clips. The static build automatically packages files whose names match
the canonical dialogue script IDs.

## Supported recordings — 112 existing, 12 optional new narrator clips

- Original office: `intro.exterior.mp3`, `office.001.mp3` to `office.054.mp3` (55).
- Stephen's Great Wall, Forbidden City, Night Market and final phone line:
  25 `china.*.mp3` files. See [Chapter Two line guide](../../../../docs/CHINA-VOICE-IMPORT.md).
- David and Paul's **Back in England** rescue alarm:
  `rescue.alarm.001.mp3` to `rescue.alarm.010.mp3` (10).
  See [Back in England recording guide](../../../../docs/RESCUE-ALARM-VOICE-IMPORT.md).
- Visitor Information: 22 spoken lines across the opening, incorrect
  destinations, Paul's three possible hints and the correct deduction.
  See [Visitor Information voice guide](../../../../docs/VISITOR-INFORMATION-VOICE-IMPORT.md).
- **GAME-SP4.1F illustrated transitions — up to 12 optional narrator recordings**:
  `transition.*.mp3`, exact names below. The game already displays each
  line as a subtitle. Without files it plays on normal text timing.

  | Cue | Upload filename |
  |---|---|
  | Chapter Two title | `transition.china.chapter-two.001.mp3` |
  | To Forbidden City | `transition.china.to-palace.001.mp3` |
  | To Night Market | `transition.china.to-market.001.mp3` |
  | Summit handoff | `transition.route.summit.001.mp3` |
  | Banquet handoff | `transition.route.banquet.001.mp3` |
  | Spa handoff | `transition.route.spa.001.mp3` |
  | Back in England | `transition.england.back.001.mp3` |
  | Travel montage 1–4 | `transition.travel.001.mp3` through `transition.travel.004.mp3` |
  | Hotel arrival | `transition.hotel.arrival.001.mp3` |

  All 12 draft narrator texts and their scene mapping are in
  [GAME-SP4.1F0 narrator script](../../../../docs/story/GAME-SP4.1F0-TRANSITION-ART-NARRATION.md).
  Use the **existing approved narrator voice**. Recording/upload is deferred
  by the owner; do not add placeholder, empty or synthesised silence files.

## Upload

For the new narrator clips, upload to the current F review branch:
`agent/game-sp41f0-transition-storyboard-narration` (or its active
successor). Earlier recordings remain unchanged.

1. Select the branch in GitHub; open `public/assets/audio/dialogue/`.
2. Click **Add file → Upload files** and commit the exact MP3 filenames.
3. The branch's Cloudflare preview picks up the recordings automatically
   without an audio manifest or application-code change.
4. Listen to all dialogue, check pause/resume and line transitions, and
   approve the draft pull request before merging to `main`.

Files must be genuine MP3s, between 128 bytes and 25 MiB. The builder
rejects unrelated files, unsupported suffixes, WAV/ZIP files, or unknown
IDs. The 12 specified transition cards, including Chapter Two title and four
travel beats, now **do** support off-screen narrator speech. Individual hotel
evidence hotspots, unanswered choices, puzzles and the first two phone-message
states remain silent and must not acquire invented audio.

Voices control advance timing until each clip ends. Missing, invalid or
blocked playback falls back to the original timed text. Navigation and
muting must stop the preceding clip.

**This repository is public.** Upload only authorised synthetic audio,
not real people's recordings, private conversations, credentials or
identifying material.
