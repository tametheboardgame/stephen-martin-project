# Approved synthetic spoken dialogue

This folder is the exact upload destination for the project's ElevenLabs MP3
voice clips. The static build automatically packages files whose names match
the canonical dialogue script IDs.

## Supported recordings — 156 total

- Original office: `intro.exterior.mp3`, `office.001.mp3` to `office.054.mp3` (55).
- Stephen's Great Wall, Forbidden City, Night Market and final phone line:
  25 `china.*.mp3` files. See [Chapter Two line guide](../../../../docs/CHINA-VOICE-IMPORT.md).
- David and Paul's **Back in England** rescue alarm:
  `rescue.alarm.001.mp3` to `rescue.alarm.010.mp3` (10).
  See [Back in England recording guide](../../../../docs/RESCUE-ALARM-VOICE-IMPORT.md).
- Visitor Information: 22 spoken lines across the opening, incorrect
  destinations, Paul's three possible hints and the correct deduction.
  See [Visitor Information voice guide](../../../../docs/VISITOR-INFORMATION-VOICE-IMPORT.md).
- **Summit**: 44 recordings for the gate, three admissions challenges (including
  branch-specific answers and hints), and the throne-room ending.
  See [exact Summit recording script](../../../../docs/SUMMIT-VOICE-IMPORT.md).

## Upload

For new Summit recordings use the current development branch:
`agent/game-sp4-summit-voice`. Earlier recordings remain unchanged.

1. Select the branch in GitHub; open `public/assets/audio/dialogue/`.
2. Click **Add file → Upload files** and commit the exact MP3 filenames.
3. The branch's Cloudflare preview picks up the recordings automatically
   without an audio manifest or application-code change.
4. Listen to all dialogue, check pause/resume and line transitions, and
   approve the draft pull request before merging to `main`.

Files must be genuine MP3s, between 128 bytes and 25 MiB. The builder
rejects unrelated files, unsupported suffixes, WAV/ZIP files, or unknown
IDs. Silent cutaways, title cards, phone messages, the four-card travel
montage and the three hotel evidence hotspots and the Summit end-card are **not** spoken narration.

Voices control advance timing until each clip ends. Missing, invalid or
blocked playback falls back to the original timed text. Navigation and
muting must stop the preceding clip.

**This repository is public.** Upload only authorised synthetic audio,
not real people's recordings, private conversations, credentials or
identifying material.
