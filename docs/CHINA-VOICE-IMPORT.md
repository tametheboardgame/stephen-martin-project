# GAME-SP4: Stephen's holiday voice-clip upload guide

**Status:** Voice import and playback prepared on draft branch
`agent/game-sp4-stephen-holiday-voice`. Do not merge or publish until
the supplied recordings have been heard and approved in Cloudflare preview.

**Upload destination:** `public/assets/audio/dialogue/`
([open upload folder on the development branch](https://github.com/tametheboardgame/stephen-martin-project/tree/agent/game-sp4-stephen-holiday-voice/public/assets/audio/dialogue))

All filenames use the literal `china.*` IDs, lowercase `.mp3` extension and
no spaces, ElevenLabs-generated suffixes or character prefixes. One MP3 per
line. Existing `office.*` recordings stay where they are.

## Great Wall (7 clips)

| Filename | Speaker | Exact line |
| --- | --- | --- |
| `china.wall.001.mp3` | Stephen | I'm on one of the wonders of the world and he's still being a prick. |
| `china.wall.002.mp3` | Promoter | You look like someone who'd enjoy The Summit. Exclusive mountain retreat. Very friendly gentlemen. Spectacular views. |
| `china.wall.003.mp3` | Stephen | How friendly? |
| `china.wall.004.mp3` | Promoter | Extremely. |
| `china.wall.005.mp3` | Stephen | Go on. |
| `china.wall.accept-reaction.mp3` | Stephen | Right. So, is it a social club or an actual cult? Actually, don't answer that. |
| `china.wall.decline-reaction.mp3` | Stephen | I'll regret this, won't I? Usually do. |

The promoter's invitation appears only once. Accept goes directly to The Summit,
and decline continues to the Forbidden City. David's incoming phone message
is displayed text, **not** a voice line.

## Forbidden City (10 clips)

| Filename | Speaker | Exact line |
| --- | --- | --- |
| `china.palace.001.mp3` | Attendant | Excuse me, sir. Would you like to be our guest of honour at tonight's International Cultural Excellence Banquet? |
| `china.palace.002.mp3` | Stephen | Why? |
| `china.palace.003.mp3` | Attendant | You're British. And you've got a very confident face. |
| `china.palace.004.mp3` | Stephen | That's genuinely the best qualification I've ever had. |
| `china.palace.accept.001.mp3` | Stephen | Do I need to prepare a speech? |
| `china.palace.accept.002.mp3` | Attendant | No, sir. We have already prepared one in your name. |
| `china.palace.accept.003.mp3` | Stephen | Outstanding. |
| `china.palace.accept.004.mp3` | Attendant | Could we use a photo of you for the promotional slideshow? |
| `china.palace.accept.005.mp3` | Stephen | Sure, just use the first one on my phone. |
| `china.palace.decline-reaction.mp3` | Stephen | I've come thousands of miles to get away from meetings. Absolutely not. |

Accepting enters the banquet and its five follow-up lines. Declining
continues to the Night Market. The badge and bear photograph are silent props.

## Night Market (7 clips)

| Filename | Speaker | Exact line |
| --- | --- | --- |
| `china.market.001.mp3` | Stephen | Paul asked for one with Wi-Fi. How the fuck would that even work? |
| `china.market.002.mp3` | Stephen | Ninety per cent off? Fucking hell. |
| `china.market.003.mp3` | Spa representative | Sir, would you be interested in our complete body-renewal package? |
| `china.market.004.mp3` | Stephen | What does complete mean? |
| `china.market.005.mp3` | Spa representative | Everything. |
| `china.market.006.mp3` | Stephen | That sounds brilliant. |
| `china.market.accept-reaction.mp3` | Stephen | If this goes wrong, at least I've saved a fortune. |

The market is reached only if Stephen declined both previous invitations.
Its spa offer is accepted automatically; there is no alternate decline audio.

## Shared closing scene (1 clip)

| Filename | Speaker | Exact line |
| --- | --- | --- |
| `china.final.001.mp3` | Stephen | Oh, for fuck's sake. |

Stephen's unfinished text message is displayed and interrupted by the dead
phone. Its words are *not* spoken in this scene.

## Upload and acceptance

1. Select the **draft branch**, not `main`, at the folder link above.
2. Use **Add file → Upload files** to commit the exact MP3s.
3. Let GitHub Actions build a new Cloudflare branch preview; no manifest edit
   or code change is required for a valid filename.
4. Verify audio and subtitle correspondence, natural gap between lines, the
   accepted and declined branches, Pause/Play, Next, Sound Off, changing tabs,
   save/resume and missing-audio fallback. Authorise the merge only afterwards.

Build restrictions: optional MP3s are copied automatically; files must be
128 bytes to 25 MiB, genuinely MP3 encoded, and on the exact 80-file whitelist
(55 original office + 25 holiday). Unknown files make the build fail. The
repository and Cloudflare previews may be public, so perform the project privacy
and audio-rights check before uploading.
