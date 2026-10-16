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
