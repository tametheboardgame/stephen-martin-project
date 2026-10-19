# Approved synthetic spoken dialogue

This folder is the exact upload destination for the project's ElevenLabs MP3
voice clips. The static build automatically packages files whose names match
the canonical dialogue script IDs.

## Supported recordings — 156 recorded clips, 14 remaining narrator clips

- Original office: `intro.exterior.mp3`, `office.001.mp3` to `office.054.mp3` (55).
- Stephen's Great Wall, Forbidden City, Night Market and final phone line:
  25 `china.*.mp3` files. See [Chapter Two line guide](../../../../docs/CHINA-VOICE-IMPORT.md).
- David and Paul's **Back in England** rescue alarm:
  `rescue.alarm.001.mp3` to `rescue.alarm.010.mp3` (10).
  See [Back in England recording guide](../../../../docs/RESCUE-ALARM-VOICE-IMPORT.md).
- Visitor Information: 22 spoken lines across the opening, incorrect
  destinations, Paul's three possible hints and the correct deduction.
  See [Visitor Information voice guide](../../../../docs/VISITOR-INFORMATION-VOICE-IMPORT.md).
- The Summit: **44 MP3s** for gatekeeper introductions, all admissions prompts,
  branch-specific reactions, Paul's hints, and the fourteen-line throne-room
  ending. See the [Summit ElevenLabs guide](../../../../docs/SUMMIT-VOICE-IMPORT.md).
  All 44 are uploaded and included in the approved development recordings.
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
  Use the **existing approved narrator voice**.
- **Two optional ending narrator stingers**: `detention.ending.014.mp3`
  (Ending B) and `reassemble.ending.015.mp3` (Ending C). No other B/C
  character dialogue is voiced in this recording batch.
- **Authoritative 14-file ElevenLabs checklist:**
  [Remaining narration recording guide](../../../../docs/REMAINING-NARRATION-VOICE-IMPORT.md).

## Upload

For the fourteen remaining narrator MP3s, upload to branch
`agent/game-sp4-remaining-narration` at `public/assets/audio/dialogue/`.
Do not upload these files directly to `main` before the owner listens to
and approves the Cloudflare draft build.

1. Select the branch in GitHub; open `public/assets/audio/dialogue/`.
2. Click **Add file → Upload files** and commit the exact MP3 filenames.
3. The branch's Cloudflare preview picks up the recordings automatically
   without an audio manifest or application-code change.
4. Listen to all dialogue, check pause/resume and line transitions, and
   approve the draft pull request before merging to `main`.

Files must be genuine MP3s, between 128 bytes and 25 MiB. The builder
rejects unrelated files, unsupported suffixes, WAV/ZIP files, or unknown
IDs. The 12 specified transition cards, including Chapter Two title and four
travel beats, support off-screen narrator speech. The two final Ending B/C
narrator punchlines now also support the same audio engine. Individual hotel
evidence hotspots, unanswered choices, puzzles and the first two phone-message
states remain silent and must not acquire invented audio.

Voices control advance timing until each clip ends. Missing, invalid or
blocked playback falls back to the original timed text. Navigation and
muting must stop the preceding clip.

**This repository is public.** Upload only authorised synthetic audio,
not real people's recordings, private conversations, credentials or
identifying material.
