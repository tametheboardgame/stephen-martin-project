# GAME-SP4.1H-B — Ending B official rescue: 45-clip ElevenLabs voice guide

**Status:** development branch `agent/game-sp41h-ending-b-voices`. The canonical B introduction, 3 forms, nine possible answers, Paul hints, stamp discovery/selection, and final dialogue are wired to 45 unique MP3 IDs; **the previously recorded narrator finale is excluded**.

**Upload folder:** [`public/assets/audio/dialogue/` on the Ending B development branch](https://github.com/tametheboardgame/stephen-martin-project/tree/agent/game-sp41h-ending-b-voices/public/assets/audio/dialogue). Use **Add file → Upload files** and commit to this branch, not `main`.

These are the exact approved spoken words from the current game source with short ElevenLabs emotional directions in square brackets. Directions and filename are **not spoken**. Grouped by voice for efficient recording: **Official, David, Paul, Stephen**. The Official is a distinct ceremonial-bureaucracy character, not the Summit Gatekeeper. Keep Paul's established East London delivery. Reuse the established Stephen and David voices.

**45 new MP3s:** Official 18 + David 9 + Paul 14 + Stephen 4. **Do not re-record:** `detention.ending.014.mp3` (already installed Narrator).

## Official — 18 recordings

### `detention.intro.001.mp3`

`[formal, politely inquisitive] You are here for the International Specialist?`

### `detention.intro.003.mp3`

`[flatly, insisting on procedure] Form?`

### `detention.intro.005.mp3`

`[firmer, perfectly deadpan] Form.`

### `detention.form.001.meal.001.mp3`

`[disapproving, clipped] This is not a sandwich office.`

### `detention.form.001.operation.001.mp3`

`[patiently correcting a troublesome visitor] That is Form 99Z. We only have Form 001.`

### `detention.form.001.prompt.mp3`

`[authoritative, reading from an official form] State the reason for your visit on Visitor Release Authorisation 001.`

### `detention.form.001.retrieve.001.mp3`

`[delighted by exemplary paperwork] Plain, accurate and administratively beautiful. Reason accepted.`

### `detention.form.002.animal.002.mp3`

`[restrained exasperation] Please stop identifying zoological threats.`

### `detention.form.002.prompt.mp3`

`[grave, bureaucratic seriousness] The image of a cartoon bear has compromised the presentation. Enter its classification.`

### `detention.form.002.secret.001.mp3`

`[matter-of-fact, wholly serious] The bear has no security clearance.`

### `detention.form.002.stationery.001.mp3`

`[satisfied, officially concluding the matter] Correct. The bear has been filed.`

### `detention.form.003.briefcase.002.mp3`

`[dryly horrified] That counts as a separate incident.`

### `detention.form.003.printer.001.mp3`

`[stern, inflexible] The printer is not a storage facility.`

### `detention.form.003.prompt.mp3`

`[formally troubled, barely containing concern] Your application is complete. Unfortunately the APPROVED stamp has gone missing.`

### `detention.stamp.approved.001.mp3`

`[loudly, triumphant but thoroughly fed up] APPROVED: ALL OF YOU PLEASE LEAVE.`

### `detention.ending.008.mp3`

`[calm, official announcement] We have approved your departure.`

### `detention.ending.010.mp3`

`[ominously formal, deliberate pause] On one condition.`

### `detention.ending.012.mp3`

`[firmly, final and non-negotiable] None of you may bring the printer.`

## David — 9 recordings

### `detention.intro.002.mp3`

`[decisive, in command of a rescue mission] We're here to extract Stephen Martin.`

### `detention.intro.004.mp3`

`[correcting the official, mildly impatient] No, rescue.`

### `detention.form.001.operation.002.mp3`

`[indignant, self-important] This is a diplomatic incident.`

### `detention.form.002.secret.002.mp3`

`[convinced, conspiratorial] Exactly why it's so dangerous.`

### `detention.form.003.briefcase.001.mp3`

`[proud of the paperwork, slightly defensive] Only my risk register. Seventy-eight pages.`

### `detention.stamp.selected.002.mp3`

`[quickly, claiming credit] I was about to suggest the same.`

### `detention.ending.002.mp3`

`[heroic, utterly serious] We're extracting you from government custody.`

### `detention.ending.006.mp3`

`[smug, congratulating himself] A clear signal that the operation worked.`

### `detention.ending.009.mp3`

`[triumphant, pompously satisfied] Excellent. Our diplomatic intervention has succeeded.`

## Paul — 14 recordings

### `detention.intro.006.mp3`

`[dry, resigned, East London delivery] I knew we should've brought a printer.`

### `detention.form.001.hint.mp3`

`[helpful, patiently stating the obvious] Just say we came to collect the bloke they listed as missing. That is what we're doing.`

### `detention.form.001.meal.002.mp3`

`[genuinely curious, slightly distracted] Do they know somewhere that does a meal deal?`

### `detention.form.001.retrieve.002.mp3`

`[satisfied, matter-of-fact] Easy when you tell them the truth.`

### `detention.form.002.animal.001.mp3`

`[exasperated, practical] It's a drawing. Not an actual bear.`

### `detention.form.002.hint.mp3`

`[patiently, dryly reassuring] It's just silly stationery, David. The bear isn't working for anyone.`

### `detention.form.002.stationery.002.mp3`

`[wearily, just wanting to go home] Can we stop printing it now?`

### `detention.form.003.drink.001.mp3`

`[surprised, then sheepishly apologetic] Oh. The APPROVED stamp's been keeping my drink off the counter. Sorry.`

### `detention.form.003.hint.mp3`

`[suddenly realising, conversational] Is that the stamp under my takeaway cup? I've been using it as a coaster.`

### `detention.form.003.printer.002.mp3`

`[quietly sceptical, deadpan] I wouldn't be so sure.`

### `detention.stamp.selected.001.mp3`

`[encouraging, casual and practical] That's it. Put it on the permit.`

### `detention.ending.004.mp3`

`[innocently curious] Did they like the bear?`

### `detention.ending.011.mp3`

`[genuinely curious, offhand] What's that?`

### `detention.ending.013.mp3`

`[casually, admitting something embarrassing] It's still in my suitcase.`

## Stephen — 4 recordings

### `detention.ending.001.mp3`

`[surprised, increasingly irritated] Why are you both in this building?`

### `detention.ending.003.mp3`

`[exasperated, explaining the obvious] I got stuck in a queue because someone put a bear meme in my presentation.`

### `detention.ending.005.mp3`

`[frustrated, disappointed about the joke] They didn't understand the bear.`

### `detention.ending.007.mp3`

`[outraged, emphatic] You started the operation!`

## Special handling

- **Form prompts / hints:** the printed `OFFICIAL:` and `Paul:` prefixes are speaker labels, not words to speak.
- **Split character answers:** responses that visually share a text panel must be exported as one MP3 **per character**, following the IDs above. The code sequences both voices and preserves the original combined on-screen text.
- **Third form stamp:** the 'Inspect Paul's takeaway drink' answer is one Paul clip. Selecting the stamp triggers Paul's and David's two separate lines. Applying it plays the Official's 'APPROVED...' line. The printer's celebratory paper shower remains a **silent visual/text cue**.
- **Puzzle interface:** static choice labels, decorative clue captions, the stamp dragging/tapping instructions and form headings are **not separate recordings**.
- **Timing and interaction:** as in Summit, sound off or an absent MP3 uses text-timed fallback; selecting another answer stops the previous recording; hints are spoken once per form after two wrong answers; correct reply audio plays before advancing to the next form. Final 13 character voices lead into the previously voiced Narrator stinger, then the silent Ending B card.
- **Verification after upload:** expect `215/215` approved dialogue MP3s and both song tracks in the preview. Test all nine answers, hint replay suppression, paper stamp selection/application, all 14 ending beats, manual Next, Sound Off, saving/resuming, and Skip.

## Copy-all filenames by voice

**Official**

```text
detention.intro.001.mp3
detention.intro.003.mp3
detention.intro.005.mp3
detention.form.001.meal.001.mp3
detention.form.001.operation.001.mp3
detention.form.001.prompt.mp3
detention.form.001.retrieve.001.mp3
detention.form.002.animal.002.mp3
detention.form.002.prompt.mp3
detention.form.002.secret.001.mp3
detention.form.002.stationery.001.mp3
detention.form.003.briefcase.002.mp3
detention.form.003.printer.001.mp3
detention.form.003.prompt.mp3
detention.stamp.approved.001.mp3
detention.ending.008.mp3
detention.ending.010.mp3
detention.ending.012.mp3
```

**David**

```text
detention.intro.002.mp3
detention.intro.004.mp3
detention.form.001.operation.002.mp3
detention.form.002.secret.002.mp3
detention.form.003.briefcase.001.mp3
detention.stamp.selected.002.mp3
detention.ending.002.mp3
detention.ending.006.mp3
detention.ending.009.mp3
```

**Paul**

```text
detention.intro.006.mp3
detention.form.001.hint.mp3
detention.form.001.meal.002.mp3
detention.form.001.retrieve.002.mp3
detention.form.002.animal.001.mp3
detention.form.002.hint.mp3
detention.form.002.stationery.002.mp3
detention.form.003.drink.001.mp3
detention.form.003.hint.mp3
detention.form.003.printer.002.mp3
detention.stamp.selected.001.mp3
detention.ending.004.mp3
detention.ending.011.mp3
detention.ending.013.mp3
```

**Stephen**

```text
detention.ending.001.mp3
detention.ending.003.mp3
detention.ending.005.mp3
detention.ending.007.mp3
```
