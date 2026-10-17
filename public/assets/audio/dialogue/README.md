# Recorded dialogue: office and Chapter Two

This folder is the exact GitHub upload destination for optional, owner-approved
ElevenLabs MP3 voice clips. Upload through GitHub's **Upload files** interface
on the currently reviewed development branch, never directly to `main`.

## Supported audio (80 possible clips)

- Opening office: `intro.exterior.mp3` and `office.001.mp3` through `office.054.mp3`.
- Great Wall: `china.wall.001.mp3` to `china.wall.005.mp3`, plus
  `china.wall.accept-reaction.mp3` and `china.wall.decline-reaction.mp3`.
- Forbidden City: `china.palace.001.mp3` to `china.palace.004.mp3`,
  `china.palace.accept.001.mp3` to `china.palace.accept.005.mp3`,
  and `china.palace.decline-reaction.mp3`.
- Night Market: `china.market.001.mp3` to `china.market.006.mp3`
  plus `china.market.accept-reaction.mp3`.
- Holiday's last spoken reaction: `china.final.001.mp3`.

There are 55 original office IDs and 25 Chapter Two IDs. All 25 new filenames
and their exact dialogue are indexed at [Chapter Two recording guide](../../../docs/CHINA-VOICE-IMPORT.md).

The Cloudflare build discovers valid files automatically. Uploading an accepted
clip requires **no manifest or additional code change** on this branch. The
player uses each script ID to select its MP3. Missing recordings fall back to
the existing text duration without stopping the scene.

## How to upload

1. Switch to `agent/game-sp4-stephen-holiday-voice` while it is under review.
2. Open `public/assets/audio/dialogue/`, click **Add file → Upload files**.
3. Upload the MP3s with *exactly* the names above, commit to this branch.
4. Wait for the branch Cloudflare preview; listen to the Great Wall and both
   later route decisions, Pause/Play and Sound Off, before requesting merge.

Use lower-case `.mp3`, matching punctuation and three-digit IDs. Do not
upload `.wav`, additional suffixes, ZIP folders, or other file formats.
Files must be between 128 bytes and 25 MiB; the build rejects unexpected
filenames or invalid sizes. The MP3 must actually be MP3-encoded.

All source recordings are **publicly accessible once committed** to this
public repository. Never upload recordings of real people without permission,
private conversations, passwords, API tokens, or unapproved recordings.

## What the player does

The office and Stephen's holiday scenes now have independent playback state.
With sound enabled, the current line's recording controls automatic advance,
and the next line follows after a short gap. Pause holds its position, Play
resumes, Next skips the current recording, and a 404 or playback failure
falls back to the timed subtitle. Silent titles, phone messages and choices
are not narrated. Branch-specific recordings play only on their chosen route.
