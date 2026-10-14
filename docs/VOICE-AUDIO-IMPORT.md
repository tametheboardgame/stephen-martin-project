# GAME-SP1.1-D7 — Recorded character dialogue

## Approved plan

On 14 October 2026 the owner supplied recorded ElevenLabs speech for the approved one-office opening: **16 Stephen, 18 David, 20 Paul and 1 Narrator**, totalling **55 voice clips**. The files are named after the screenplay's stable beat IDs. They are not yet provided to the repository at the time of the initial voice-enablement commit.

All artwork and screenplay changes through Paul’s complete approved expression set are already on production `main` (PRs #14 and #15). Add recording support on the dedicated **draft** `agent/game-sp11d7-dialogue-voice` branch; do not merge it before the owner has played the actual uploaded MP3s.

**Audio upload folder:** `public/assets/audio/dialogue/` (its own `README.md` contains the uploader instructions). Files must be exactly `intro.exterior.mp3` and `office.001.mp3` through `office.054.mp3`. The code derives the URL using `beat.id` and never guesses character ownership or dialogue text.

## Playback contract

- Use the existing **Sound: On/Off** buttons for voice and short synthetic effects; default muted respects browser autoplay policies. Starting the story with sound enabled must occur after a user gesture.
- Audio controls the autoplay clock. On spoken dialogue, start the matching MP3 and wait for its `ended` event, then pause approximately 400ms before moving on. On script-only reaction beats, use the original explicit visual durations.
- A missing/invalid recording, unsupported browser audio API or blocked playback must fall back gracefully to the existing text-based timer. A download error on one beat must not stop the rest of the cutscene.
- **Pause** pauses the current recording; **Play** resumes its position. **Next/Back** immediately stop the old clip and select the new clip. **Skip/Restart/Return to menu/muting/tab hiding** stop or pause audio as appropriate. Stale completion events must not advance a later beat.
- Recording uploads alone should activate voices without a second code commit: the production builder discovers valid MP3 filenames at build time. Do not let unrelated audio/data files escape into `dist`.
- Auto-advance is permitted only when the page is visible, the office scene is active, and autoplay is enabled. A manual Next while paused may play that selected line but must not start automatic advancing.

## Listening / acceptance

Once the clips are committed, verify narrator opening, several short and long lines, mixed voices, pauses, Sound Off, manual forward/backward skipping, cutaways, reload/Continue, and missing-file fallback. Confirm normal-volume playback, no clipped endings, correct speaker-to-ID mapping and working animations. Do not merge until the owner explicitly approves the voiced branch preview.
