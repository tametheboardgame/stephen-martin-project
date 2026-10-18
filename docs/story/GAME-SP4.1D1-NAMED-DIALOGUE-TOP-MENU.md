# GAME-SP4.1D1 — Named paper dialogue and consistent upper controls

**18 October 2026** · Branch `agent/game-sp41d1-dialogue-topbar` · based on approved D0 merge `27f61b3`.

## Owner-approved extension to D1

Standardise the **top menu** along with existing D1 named-dialogue work. Do not defer it to the contextual-skip D2 package.

## Owner feedback: compact external name tabs (18 October 2026)

The user approved the first D1 preview but asked for all character speech to follow the **opening scene** rather than having the character name inside the white box. The external upper-left blue name tab is now canonical for all spoken dialogue, including post-choice/mini-game responses. The label overlaps the paper box's top edge, preserving room for artwork and reducing internal whitespace. Keep information, hints, progress, menu controls and other non-spoken panels visually separate.

Implementation uses the existing `.story-speech` hooks and a local absolute name tab; original office `.speaker` styling stays untouched. Route intros, all three endings and puzzle reply cards explicitly allow label overflow. Tablet/mobile name typography and padding are reduced without changing scene layout or the voice/saving engine. Review the actual new branch preview before accepting.

## First implementation

- Place Pause, Back, Next, Sound, Restart and Skip Intro together in the office's existing top toolbar. Keep existing event IDs and keyboard behaviour; reduce the lower dialogue transport to a small status line.
- Make the later-scene `china-footer` use the same compact dark top-control style, with a persistent chapter label, Pause, Next (only at safe steps), route/replay (where applicable), Sound and Menu. Keep its existing state-machine guards; no new skip navigation yet.
- Apply a reusable white/paper named character speech treatment to the office, Great Wall, Forbidden City, Night Market, Back in England, Visitor Information, route introductions and three finales. Reuse approved scene-local placement so speech does not sit over new artwork.
- After the Great Wall/Forbidden City/Night Market decision, keep Stephen's original reaction and voice ID, but show its words in the same in-scene named speech card rather than the unlabelled footer. Palace's five accepted follow-up lines already use this path and remain intact.
- The hotel's individual wrong-guess, hint and correct deduction lines display the active speaker and text in its existing stage dialogue card. Their underlying numbered audio, choice blocking and save state remain unchanged.
- Summit and bureaucratic paperwork answer reactions appear in labelled paper response cards, with the first speaker prefix promoted to the name badge. **Additional speaker names remain inline** until any separately approved per-speaker beat/audio restructuring. Clues, puzzle instructions and non-spoken status text retain separate styling.
- Preserve original scripted dialogue, branch selection, no-fail hints, save V3 and recordings. No additional scene, art, puzzle completion or universal skip feature.

## Verification gates

1. Run `npm run verify` against the exact final branch commit; inspect title and dialogue card display at desktop 1366×768, tablet 800×1280 and mobile 390×844.
2. Manually view Great Wall accept/decline, Palace accept/decline, Night Market completion, wrong and correct hotel deductions, Summit accepted/wrong answers, paperwork reply and all three ending captions.
3. Confirm controls do not cover chapter headings, character faces, response text or puzzle buttons. In particular test mobile header wrapping and shorter laptop heights. No final visual approval can be inferred from automated tests.
4. Play with Sound On/Off and Resume in the three paths; wait through voiced replies and check timers never advance unresolved puzzle choices.
5. Keep PR draft until owner reviews real Cloudflare preview. D2's safe contextual skip controls are a later package.

## Current state

First pass committed, awaiting exact-head CI/preview and human layout review. Do not merge automatically.
