# GAME-SP1.1: Cinematic opening production hand-off

**Status:** GAME-SP1.1-D owner-approved rebuild, 12 October 2026. PR #8 was merged for testing and its portrait-card presentation was rejected. The layered in-office scene is the current production goal; this document and `ROADMAP.md` hold the next approved tasks.

## Owner playtest decision — supersedes portrait-card layout

The live Cloudflare playtest revealed oversized faces positioned too low, unwanted overlapping/cropping, and overly slow transitions. The owner explicitly chose to **move directly to the in-office version**, not polish the existing portrait frames.

- Build clean `OFFICE-CLEAN-01` first, **without** characters, visible text, branding or interface. Human-approve before materialising.
- Place three independent actors **inside** that scene at consistent scale, using seated/waist-up illustrations and aligned expression swapping. The current 18 approved close-up WebPs can remain references or be used in a registered modular head/bust solution; never enlarge them as three free-standing portrait cards.
- Speech must remain editable HTML over the lower desk area **without covering faces**. Progress and transport stay separate below the stage.
- Make dialogue snappier, add **1×, 1.25× and 1.5×** speed settings, preserve Pause/Back/Next/Skip/Resume, and keep intentionally comedic pauses.
- Retain three independent cutaways for risk-assessment laptop, bear printer and fictional rescue chat. Do not paint messages or controls into a fixed illustration; all copy must remain editable.
- Verify actual desktop and tablet framing and cutaway/playback transitions on a branch preview before approval and merge. Retain a roughly three-minute opening and no GAME-SP2 gameplay in scope.

**The layered production components are the deliverable; full-scene concept images alone are not.**

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

## Implemented in the prior playtest PR #8 (merged to main)

- Autoplay, Pause/Play, Back and Next plus timing and hidden-tab safety.
- All 18 cropped WebP expressions, plus correct source mapping for reactions and a baseline-fallback if assets cannot load.
- Rebuilt component hierarchy with a dominant live stage, overlaid speech box, progress strip and controls below the artwork.
- Three separate full-stage CSS cutaways and associated scene cues.
- Focused tests for the cast asset mapping, live speech, and playback/cutaway interaction.

## Next rebuild and visual qualification

- Actual Cloudflare preview on wide desktop, small desktop and mobile or tablet.
- Character framing: no unintended crop of glasses, chins, hair, shoulders or raised hands.
- Full environment art and seated-body presentation if the initial production component layout remains too obviously 'portrait cards'.
- Cutaway legibility under autoplay at real reading speed.
- Owner visual sign-off before the **new rebuild PR** merges into `main`.

The desired outcome is a **playable 3-minute cutscene**, not a static poster pretending to be one.
