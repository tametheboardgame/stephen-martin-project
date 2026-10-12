# GAME-SP1.1: Cinematic opening production hand-off

**Status:** Approved design direction; actual live component implementation in PR #8, awaiting owner visual review.

## The reference versus the game

The owner-approved composite infographic is the **composition and aesthetic reference**, NOT a background screenshot or an asset to crop wholesale into the game. It includes rasterised mock dialogue and controls that must never replace real interactive UI.

The production opening has these **independent layers**:

1. **Stage environment:** A fictional, non-identifying office background (currently CSS scenery; a future clean painted background can replace it without changing gameplay).
2. **Stephen / David / Paul:** Individual approved `.webp` expression portraits. The renderer changes the **speaker and listeners'** facial imagery on each beat, using `src/reactions.js`; no baked three-person illustration is acceptable while dynamic expressions are required.
3. **Dialogue:** A real HTML dialogue panel anchored over the scene, with editable text and accessible live captions.
4. **Transport:** An actual progress meter plus manual Back, Next, Pause/Play, Restart and Skip controls, with autoplay as default.
5. **Cutaways:** Reusable scene inserts for the laptop risk assessment, printer printing bear pages and group-chat creation. The first version uses lightweight DOM/CSS, which may be replaced with *separate approved, text-free visual illustrations* for each cutaway. Dialogue remains in the same live component.
6. **Title and chapter framing:** Typeset in HTML/CSS, not painted into any environmental illustration.

## Layout reference at wide desktop/tablet

- Compact upper header with bold game title / chapter / scene label.
- One dominant landscape stage (current target approximately 1380 px container wide, stage up to 560 px tall). Characters are staged across the fictional office and change expressions during dialogue.
- Readable speech box overlaid in the **lower-left** of the stage, with speaker tag attached and background contrast.
- Slim progress rail and controls in a **separate strip below** the stage, as in the reference.
- When a cutaway occurs, replace the stage illustration, **not the functional speech panel or playback controls**.
- On narrower screens, preserve large readable dialogue and generous interactive targets, allowing the cast to compress rather than letting speech overlap faces.
- Current portrait pieces are head-and-shoulders cards, *not* full-body cut-outs; this is an honest interim composition, not a claim of full fidelity to the concept.

## Production artwork still required to achieve the entire reference

**A. OFFICE-CLEAN-01:** A single landscape comic office environment with desk depth, windows, printer, props and invented details but **no people, visible text, dialogue, buttons, logos, real office identifiers or title**. Use at least 16:9 original artwork suitable for cover-cropping. Review before replacing the CSS office.

**B. CHARACTER-STAGING:** The 18 approved head-and-shoulders portraits are now wired. To match the concept's seated full figures, create separate **transparent character bust/body illustrations** for Stephen, David and Paul with identical pose/crop registration per expression, or a stable reusable body layer topped with an interchangeable expression head. Avoid individually regenerating six unaligned full-scene backgrounds per character.

**C. CUTAWAY-LAPTOP-01:** Isolated laptop/device close-up illustration only, with screen content rendered as live HTML for exact spelling.

**D. CUTAWAY-PRINTER-01:** Isolated printer and loose original cartoon bear pages, with printable pages separated enough to allow CSS animation; don't bake dialogue or real official/political faces into the image.

**E. CUTAWAY-CHAT-01:** Isolated phone and hands if needed, with entirely fictional chat UI implemented as HTML so text and icons remain editable.

**Human approval gate:** Each visual must use approved character designs, respect SP-D009 privacy, and be individually reviewed before import through Google Drive manifests. Do not use the reference infographic as a flattened production image.

## Implemented now on PR #8

- Autoplay, Pause/Play, Back and Next plus timing and hidden-tab safety.
- All 18 cropped WebP expressions, plus correct source mapping for reactions and a baseline-fallback if assets cannot load.
- Rebuilt component hierarchy with a dominant live stage, overlaid speech box, progress strip and controls below the artwork.
- Three separate full-stage CSS cutaways and associated scene cues.
- Focused tests for the cast asset mapping, live speech, and playback/cutaway interaction.

## Still to verify

- Actual Cloudflare preview on wide desktop, small desktop and mobile or tablet.
- Character framing: no unintended crop of glasses, chins, hair, shoulders or raised hands.
- Full environment art and seated-body presentation if the initial production component layout remains too obviously 'portrait cards'.
- Cutaway legibility under autoplay at real reading speed.
- Owner visual sign-off before PR merge into `main`.

The desired outcome is a **playable 3-minute cutscene**, not a static poster pretending to be one.
