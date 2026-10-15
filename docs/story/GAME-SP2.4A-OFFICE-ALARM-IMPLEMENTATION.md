# GAME-SP2.4A — Office Alarm and Travel Montage: implementation notes

**Status:** draft implementation, owner review required. Based on approved original OFFICE-ALARM script in \`docs/story/SP-WP1.2-GAME-TREATMENT.md\` and forward plan in \`docs/story/GAME-SP2.4-SP3-RESCUE-IMPLEMENTATION-PLAN-V1.md\`.

## In-scope, implemented
- Existing Chapter Two route-specific last text and 1% → 0% battery remain. BACK IN ENGLAND card now continues to actual OFFICE-ALARM, not directly to an ending.
- Ten **exact canon OFFICE-ALARM lines** are playable (David and Paul), using existing approved office background, foreground desk, David Serious/Confident/Frustrated/Systems Expert seated sprites and Paul Neutral/Confused/Pleased seated sprites. These lines have readable subtitles, manual Next and a route-specific last-transmission phone overlay.
- Existing office opening's 55 prerecorded MP3s and 67 beats remain unchanged; new alarm lines are deliberately **unvoiced pending future owner-approved recordings**, and do not borrow incorrect MP3s.
- On completing the dialogue, a four-card compact deliberately unnecessary travel montage plays, using native HTML/CSS and a **previously approved** generated location image as atmosphere; there are no new playable airports or navigation systems.
- The montage finishes at a labelled **Visitor Information** arrival handoff. The playable hotel hub, evidence puzzle and its source art are a **different bounded package GAME-SP2.4B**, still awaiting the art gate.
- Local save persists \`holidayPhase = rescue-alarm | rescue-travel | rescue-hub-arrival\`, \`rescueAlarmStep\`, \`rescueTravelStep\` and the immutable \`route\`. Continue resumes without replaying earlier scenes. Replay Another Ending resets to the Great Wall decision checkpoint and clears rescue progress.
- Targeted smoke tests for all three routes, message visual, character cues, absence of premature travel, saved mid-alarm/travel checkpoints and hub handoff. Desktop 16:9 with touch-friendly layouts. No new asset in public dist.

## New concept artwork, explicitly NOT locked or imported
- Two first-pass concept renders were generated during the planning/testing conversation. The first contained characters and was **rejected as a standalone environment**.
- The second is an **unoccupied illustrated visitor-information lobby concept**. It has not received owner acceptance and has **not** been uploaded to Drive, transformed, committed, used in the playable background or treated as canon. Its identity and exact output stay in the originating conversation for visual review.
- Do not add any \`hotel-visitor-information-background-v01.webp\` asset or start real GAME-SP2.4B visuals before the explicit owner gate.

## Boundaries and next step
- No rescue evidence puzzle, route mini-game, route ending, extra voices or unapproved art is claimed to exist.
- Obtain owner laptop/touch review for alarm staging, pacing, phone text and four-card travel montage. Confirm or iterate on the unoccupied hotel background **before** registering it via Google Drive manifest.
- Once this draft qualifies, implement GAME-SP2.4B three-hotspot evidence puzzle, then SP3.0/3.1/3.2/3.3/3.4 in the approved order.
