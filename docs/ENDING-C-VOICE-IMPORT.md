# GAME-SP4.1H-C — Ending C spa: 39 ElevenLabs voice recordings

**Status:** draft development branch `agent/game-sp41h-ending-c-voices`, **not merged**. These are the existing approved lines from `src/rescue-framework.js` and `src/reassemble-data.js` with exact stable MP3 IDs and optional acting notes. Record one separate MP3 per cue, copying the complete direction and spoken sentence into ElevenLabs. The bracketed acting direction is a cue, not dialogue.

**Upload folder:** [public/assets/audio/dialogue on Ending C branch](https://github.com/tametheboardgame/stephen-martin-project/tree/agent/game-sp41h-ending-c-voices/public/assets/audio/dialogue). Keep original filenames; do not overwrite other clips or upload directly to `main`.

**New recordings (39):** David 10, Paul 22, Stephen 6, Cardboard Stephen 1. The already-installed narrator stinger `reassemble.ending.015.mp3` does **not** need recording.

## David — 10 MP3s

### `reassemble.intro.001.mp3`

[quietly horrified, convinced the situation is disastrous] It's worse than I feared.

### `reassemble.intro.003.mp3`

[alarmed, reading a supposedly sinister catalogue] Look at the catalogue. 'Stephen Martin: replacement parts available'.

### `reassemble.intro.005.mp3`

[conspiratorial certainty, authoritative] Obviously an international operation.

### `reassemble.intro.007.mp3`

[dismissive, convinced this is bigger than a name badge] Paul, we're beyond that.

### `reassemble.reaction.spleen.001.mp3`

[seriously diagnosing imaginary electronics] Unknown peripheral detected.

### `reassemble.reaction.wifi-heart.001.mp3`

[delighted, seeing an absurd technical upgrade] Upgradeable. Excellent.

### `reassemble.ending.002.mp3`

[sudden delight, heroic relief] Stephen! You're alive!

### `reassemble.ending.006.mp3`

[earnest, heroically self-important] We reconstructed you. We weren't going to abandon you.

### `reassemble.ending.009.mp3`

[defensive, trying to save face] The translation was ambiguous.

### `reassemble.ending.014.mp3`

[pompous satisfaction, confidently declaring victory] Technical triumph. I knew the framework would work.

## Paul — 22 MP3s

### `reassemble.intro.002.mp3`

[flat, dry, completely unimpressed] It's a spa.

### `reassemble.intro.004.mp3`

[genuinely curious, matter-of-fact] How do they know his name?

### `reassemble.intro.006.mp3`

[dry, suggesting the obvious explanation] Or they made a name badge.

### `reassemble.reaction.banana.001.mp3`

[exasperated, stating the obvious] That's a plastic banana, mate.

### `reassemble.reaction.default.001.mp3`

[patient, practical advice] That doesn't fit there. The cardboard shape labels might help.

### `reassemble.reaction.fit.001.mp3`

[mildly surprised, reluctant approval] That actually fits.

### `reassemble.reaction.head-arm.001.mp3`

[dry, imagining the ridiculous result] He'd have a very strange handshake.

### `reassemble.reaction.kidney.001.mp3`

[bemused, casual and slightly concerned] That's a spare, isn't it? They've given us three.

### `reassemble.reaction.no-selection.001.mp3`

[patient, practical instruction] Select a cardboard piece from the tray first.

### `reassemble.reaction.spleen.002.mp3`

[flatly, correcting David] It's a foam spleen.

### `reassemble.reaction.toaster.001.mp3`

[dryly amused, then incredulous] He's always liked breakfast. But that's a toaster.

### `reassemble.reaction.wifi-heart.002.mp3`

[deadpan, gently correcting David] Not a real organ, though.

### `reassemble.hint.general.001.mp3`

[helpful, dry, explaining the obvious] Try the six normal cardboard bits. Spare kidneys, Wi-Fi hearts and toasters are extras.

### `reassemble.hint.head.001.mp3`

[patiently instructive, emphasise Head] Match the Head shape to the standee. He faces us, so his left is on your right.

### `reassemble.hint.left-arm.001.mp3`

[patiently instructive, emphasise Left arm] Match the Left arm shape to the standee. He faces us, so his left is on your right.

### `reassemble.hint.left-leg.001.mp3`

[patiently instructive, emphasise Left leg] Match the Left leg shape to the standee. He faces us, so his left is on your right.

### `reassemble.hint.right-arm.001.mp3`

[patiently instructive, emphasise Right arm] Match the Right arm shape to the standee. He faces us, so his left is on your right.

### `reassemble.hint.right-leg.001.mp3`

[patiently instructive, emphasise Right leg] Match the Right leg shape to the standee. He faces us, so his left is on your right.

### `reassemble.hint.torso.001.mp3`

[patiently instructive, emphasise Torso] Match the Torso shape to the standee. He faces us, so his left is on your right.

### `reassemble.ending.004.mp3`

[matter-of-fact, cheerfully certain] We bought your replacement organs.

### `reassemble.ending.008.mp3`

[sheepish, small embarrassed realisation] Oh.

### `reassemble.ending.011.mp3`

[quietly helpful, oblivious to the absurdity] It came with an extra kidney.

## Stephen — 6 MP3s

### `reassemble.ending.001.mp3`

[astonished, baffled by his own cardboard double] Why is there a cardboard version of me?

### `reassemble.ending.003.mp3`

[patiently clarifying, slightly irritated] I was having a massage.

### `reassemble.ending.005.mp3`

[shocked disbelief, sharp] You what?

### `reassemble.ending.007.mp3`

[pointedly reading what is printed on the box] That says 'custom souvenir cut-out'.

### `reassemble.ending.010.mp3`

[incredulous, frustration steadily rising] You built a cardboard man to rescue me from a massage?

### `reassemble.ending.012.mp3`

[sudden outraged emphasis, explosive] WHY?

## Cardboard Stephen — 1 MP3s

### `reassemble.ending.013.mp3`

[flat electronic synthetic voice, slightly glitchy, an absurd cardboard replica of Stephen] Have you tried turning me off and on again?

## What remains text-only

- All six draggable cardboard-piece names and labels, static instructional captions, and the "Head selected" / "snapped into the foam display" dynamically assembled UI text. Spoken clips are the character's own words only, e.g. **Paul: That actually fits.**
- The power-on descriptive text, the ending title and the general stage progress indicators remain captions/visuals. No extra narrator scripts are required.
- The default mismatch reaction can occur for several wrong combinations and reuses the single `reassemble.reaction.default.001.mp3`. Spare kidney 1–3 all share `reassemble.reaction.kidney.001.mp3`.
- Seven hint clips mean Paul refers to the correct selected piece (or offers his general hint for decoys). Hints only become available after the existing puzzle's error threshold and must not play repeatedly for the same hint within a run.
- The cardboard Stephen voice can reuse Stephen's approved synthetic voice with **an electronic, slightly glitchy character delivery**; the original text is unchanged.

## Verification after upload

Expect **254/254** approved dialogue/narrator MP3s and both opening songs. Test seven approach lines, all seven mismatch reaction categories (nine actor clips), one correct-fit reaction (reused), empty-hand instruction, all seven contextual hints, six manual part placements, POWER ON STEPHEN, all fifteen ending lines, mute/paused/Next, save/resume, and missing-MP3 fallback. The pre-existing owner-approved visual layers and body geometry are not modified by this work package.

## Copy all filenames by voice

### David

```text
reassemble.intro.001.mp3
reassemble.intro.003.mp3
reassemble.intro.005.mp3
reassemble.intro.007.mp3
reassemble.reaction.spleen.001.mp3
reassemble.reaction.wifi-heart.001.mp3
reassemble.ending.002.mp3
reassemble.ending.006.mp3
reassemble.ending.009.mp3
reassemble.ending.014.mp3
```

### Paul

```text
reassemble.intro.002.mp3
reassemble.intro.004.mp3
reassemble.intro.006.mp3
reassemble.reaction.banana.001.mp3
reassemble.reaction.default.001.mp3
reassemble.reaction.fit.001.mp3
reassemble.reaction.head-arm.001.mp3
reassemble.reaction.kidney.001.mp3
reassemble.reaction.no-selection.001.mp3
reassemble.reaction.spleen.002.mp3
reassemble.reaction.toaster.001.mp3
reassemble.reaction.wifi-heart.002.mp3
reassemble.hint.general.001.mp3
reassemble.hint.head.001.mp3
reassemble.hint.left-arm.001.mp3
reassemble.hint.left-leg.001.mp3
reassemble.hint.right-arm.001.mp3
reassemble.hint.right-leg.001.mp3
reassemble.hint.torso.001.mp3
reassemble.ending.004.mp3
reassemble.ending.008.mp3
reassemble.ending.011.mp3
```

### Stephen

```text
reassemble.ending.001.mp3
reassemble.ending.003.mp3
reassemble.ending.005.mp3
reassemble.ending.007.mp3
reassemble.ending.010.mp3
reassemble.ending.012.mp3
```

### Cardboard Stephen

```text
reassemble.ending.013.mp3
```
