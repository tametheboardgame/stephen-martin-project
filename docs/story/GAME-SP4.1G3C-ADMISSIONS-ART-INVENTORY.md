# GAME-SP4.1G3C: The Summit illustrated answer tiles

**Status:** Phase 1 implementation on draft PR; art concept inventory for owner approval. **Baseline:** `main` merge `b8501c09bfee03705d1a912fef71dbb1cf2750f7` (G3A/G3B approved). No newly generated illustration is approved or materialised by this document.

## Canonical puzzle inventory and proposed art

The existing three rounds, nine labels, option IDs, correct choices, wrong-answer jokes, speaker recordings and hints **must not change**. A consistent **3 × 3 icon atlas** is proposed. Each square contains one illustrated object, without words, characters, UI, hints or success colouring; place equal-weight artwork inside equal-size neutral frames. Icons are not answers in their own right: the full original label remains visible as live button text.

| Atlas cell | ID (round/option) | Existing label | Proposed illustration |
| --- | --- | --- | --- |
| A1 | `vase` (1/1) | Golden ceremonial vase | Ornate golden two-handled ceremonial urn |
| A2 | `ticket` (1/2) | Airline ticket | Airline boarding pass with small plane pictogram |
| A3 | `charger` (1/3) | Phone charger | Recognisable USB plug, cable loop and charger block |
| B1 | `spreadsheet` (2/1) | Your spreadsheet is compliant | Spreadsheet grid on clipped paperwork, small check mark |
| B2 | `legs` (2/2) | Great legs, your magnificence | Two proud trousered legs and smart shoes in comic pose |
| B3 | `ticket` (2/3) | I'm here to raise a ticket | IT support ticket slip with numbered queue/stamp, **not** a plane ticket |
| C1 | `rescue` (3/1) | I am here to rescue Stephen | Rescue rope and life ring, no actual Stephen depiction |
| C2 | `join` (3/2) | I wish to join the club | Gold-crested fictional membership card |
| C3 | `flight` (3/3) | I bring news of the return flight | Departures/return flight notice with tiny aeroplane and clock, **not** the A2 boarding pass |

### Image proposal and provenance gate

- Proposed single source: `summit-admissions-icons-atlas-v01.png`, 960 × 960 or 1200 × 1200, nine equally sized square cells in row-major order A1→C3. No printed words, UI labels, arrows, highlighting, border numbers, names, or faces painted into artwork.
- Graphic-novel / comic-game style from `docs/ART-DIRECTION.md`: warm gold/navy contours, clean outlines, restrained halftone, consistent size and contrast. Backgrounds neutral and consistent so the correct answer is **not** visually telegraphed.
- **Await owner sign-off of inventory and art direction before generating or staging the source.** When approved, place original in the dedicated Stephen Martin Drive staging folder; add one versioned provenance manifest and materialise optimised WebP through the existing GitHub Actions OIDC pipeline, on this branch only.
- Do not introduce new images into Git as stand-ins. The first working preview uses clearly labelled neutral placeholder wells so button layout can be assessed before the art is commissioned.

## UI, state and behaviour contract

- Each answer remains the original `summitChoice0/1/2` button, with its stable index/listener, focusability, tap region, screen-reader text and canonical full label.
- Add an `aria-hidden` illustration well and a separate live label in the button. Update icon slot ID and label together on render and on Save/Resume. Same option ordering and IDs for all rounds. No coloured hints, correct markings or answer leaks.
- Desktop/laptop: three consistent tiles with the pictogram above the label. Tablets/phones: three stacked horizontal tiles with icon left and label right, avoiding tall cards and nested scrolling.
- Keep existing dialogue, recorded voice, wrong answer/hint system, puzzle save key, navigation and transitions untouched. Maintain mouse, keyboard, touch and Sound Off modes.
- Test all three rounds, repeated wrong choices, saved resumes, correct acknowledgement, small-screen layout and audio cancellation. Owner acceptance of actual artwork and working preview required before merge.

**Non-goals:** redrawn Summit scene, new mini-game, speech changes, extra clues, animations, nine independent original assets, or an unapproved font/icon/CDN dependency.
