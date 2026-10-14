# Office dialogue recordings (GAME-SP1.1-D7)

**Upload on the development branch:** `agent/game-sp11d7-dialogue-voice`. **Do not upload to `main`.**

This folder is the direct GitHub drop-off location for the 55 pre-recorded ElevenLabs **MP3** clips. The web player selects a clip automatically using the approved screenplay beat ID. No code changes, audio manifest edits or extra conversion pipeline are needed when new files arrive.

## Filenames

- Narrator (1): `intro.exterior.mp3`
- Stephen (16), David (18), Paul (20): `office.001.mp3` through `office.054.mp3` (all 54 numbers appear exactly once).
- Names **must** have the three-digit beat number and lower-case `.mp3`. No extra character prefixes, spaces, versions, suffixes, ZIP folders, or `.wav` files.
- Silent reaction/insert beats such as `office.v01` do not have dialogue recordings.

These assets correspond to the exact lines in `src/office-data.js`; the repository build validates their filenames against the screenplay and includes every valid MP3 automatically.

## Upload through GitHub

1. Open this folder on branch `agent/game-sp11d7-dialogue-voice` on github.com. Check the branch selector **before** uploading.
2. Click **Add file → Upload files**, drag all 55 MP3s into the upload area and commit **directly to this development branch**, not to `main`.
3. Watch the existing draft voice PR's checks and Cloudflare Pages branch preview. All clips may be uploaded together or in several batches; lines that have not been uploaded continue to play using the old text-based timing.
4. In the preview, turn **Sound: On**, press **Start**, and listen through. Autoplay advances after each file **finishes**, not after the old short text timer. Pause/Next/Back/Skip, Sound Off and switching tabs work as expected.

## Restrictions

- **Public repository:** both the recordings and their dialogue will be publicly retrievable when pushed. Upload only finished, authorised synthetic clips. Do not upload a real person's recordings, private conversations, audio-generation API keys or unrelated source material.
- GitHub's web uploader limits individual files to **25 MiB**; this project's build enforces the same maximum and rejects empty files and unsupported filenames.
- MP3 only. If ElevenLabs exports WAV or another format, export or convert to MP3 first; renaming a WAV extension will not convert its encoding.
- The original synthetic UI chimes and the visible song lyrics are separate; the 55 files contain only the listed spoken dialogue. Use future separate approval for a full recorded goodbye song.
- The opening's script IDs and spoken text are canon. Do not rename, renumber or revise screenplay beats to make a filename fit.

Expected result when complete: 55/55 MP3s in this folder; no extra files other than this README.
