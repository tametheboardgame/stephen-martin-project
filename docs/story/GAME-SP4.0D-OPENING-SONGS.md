## Opening pacing and portrait-scale refinement (16 October 2026)

The owner identified a long silent hold between Paul's "It was making a noise" and the animated office printer, together with several other leftover non-spoken cutaway pauses. Reaction beats v01/v03/v06/v10 now last only 400–450 ms; other stationary cutaways and Stephen's departure have shorter timings, while the printer gets 2.4 seconds to finish its paper animation. Speech-to-speech is 260 ms, speech-to-silent-visual 100 ms, but the deliberately timed 400 ms post-mortem cue and seven-second song-choice window remain.

The pessimistic full-song lyric panel is now gently front-loaded (`playbackProgress ** 0.78`), so words scroll sooner during the dense opening verses and still reach the bottom at track end. Optimistic scrolling remains linear.

Direct inspection of the six canonical David WebP cutouts found mismatched head top margins. Without regenerating assets, the five non-neutral poses are bottom-anchored and scaled relative to neutral (confident .93, serious .96, frustrated .92, shocked .94, systems expert .94). This is an optical correction, still requiring an in-game visual check.

## In-scene pop-ups and lyric panel revision (16 October 2026)

- Song prompts are now prominent and interactive *within the office stage*, not in the footer. Optimistic cutaway v07 shows a comic panel with full scrollable lyric text and the "Listen to the whole song" button while its first 20 seconds play automatically.
- No pessimistic song prompt appears during office.039 or office.040. After David's **office.041, "And a post-mortem."**, the dialogue ends naturally, followed by a seven-second decision window. The player can start the pessimistic full recording or decline; if neither is pressed and autoplay is running, the dialogue continues to office.042.
- Both complete lyric texts are embedded as user-supplied words, grouped by verse/chorus/cues. The lyric panel follows the MP3's current playback position/duration using proportional scrolling, with user scrolling also available; line-level karaoke timing is not claimed.
- Music remains interruptible with Pause/Play, Next/Back and an in-scene Stop button. Visual sign-off is still pending. Keep PR #35 draft and unmerged.

# GAME-SP4.0D — Opening songs hand-off

Two complete, already-produced MP3s are to be uploaded by the owner, not generated in the game pipeline.

## Upload exactly these files

- `public/assets/audio/songs/optimistic.mp3`
- `public/assets/audio/songs/pessimistic.mp3`

Upload using GitHub **Add file → Upload files** inside `public/assets/audio/songs/` **on branch** `agent/game-sp40d-opening-songs`. Keep the exact lowercase spelling. The public build whitelists only these two MP3s, size >128 bytes and ≤25 MiB each. Upload no lyrics, artwork, original masters, notes, private metadata or other files.

## Behaviour

- At existing `office.v07` cheerful-song cutaway, with sound on and autoplay active, play the opening **20 seconds** of optimistic.mp3, then continue the office story. Button **Listen to the full optimistic song** converts an in-progress preview to full-length without resetting its position.
- At `office.039` ("There is another version?") offer **Hear the pessimistic version**, not autoplay. The song occupies the same office timeline while playing; after its actual end, or if **Stop song and continue** is chosen, advance to the next screenplay beat in autoplay mode. In manual mode, stay on the current beat.
- The existing global Pause/Play controls music, Sound Off silences it, navigation and scene changes stop it, and backgrounding pauses it without skipping. File-not-found, autoplay restriction and other playback errors fall back to the previous story timing. No change to the 55 voiced dialogue clips, approved screenplay, save format, or any artwork.

## Qualification gate

Before the uploads, test and build pass but songs cannot be heard. After both MP3 files are on this branch, await the new Cloudflare branch preview, review two songs in-game, check audio levels, 20-second entry and transition, full-length finish/stop, pause/resume, sound toggle and mobile layout. Stacked draft; no merge without owner approval.
