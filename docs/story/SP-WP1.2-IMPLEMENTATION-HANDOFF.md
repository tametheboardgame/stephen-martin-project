# SP-WP1.2: Fast-build game hand-off (draft)

**Status:** **Approved for phased implementation 12 October 2026.** Begin with bounded GAME-SP1 office scene before building the other routes.

## 1. MVP player flow

Use these **eight** scene/state identifiers as the initial canonical graph:

1. \`OFFICE-INTRO\` → complete/skipped → \`STEVE-HOLIDAY-01\`.
2. \`STEVE-HOLIDAY-01\` → player chooses route and story checkpoint → \`OFFICE-ALARM\`.
3. \`OFFICE-ALARM\` → \`RESCUE-HUB-01\` (includes montage, can share same cutscene view).
4. \`RESCUE-HUB-01\` → selects the *correct route destination* based on evidence → \`ROUTE-INTRO\`.
5. \`ROUTE-INTRO\` → switches on \`route\` to A/B/C scripted 30–45s vignette → \`ROUTE-MINIGAME\`.
6. \`ROUTE-MINIGAME\` → passes the selected one of three puzzles → \`ROUTE-ENDING\`.
7. \`ROUTE-ENDING\` → shows matching end cutscene → \`ENDING-SUMMARY\`.
8. \`ENDING-SUMMARY\` → reload saved \`STEVE-HOLIDAY-01\` route-choice checkpoint, reset to \`OFFICE-INTRO\`, or main menu.

**No additional interactive city map or open-world movement is necessary.**

## 2. State model, minimum

Use a compact persistable story state, with only these required keys:

\`\`\`typescript
type Route = "cult" | "detention" | "reassemble";
type ChatBehaviour = "replied" | "muted";
type SceneId =
  | "OFFICE-INTRO" | "STEVE-HOLIDAY-01" | "OFFICE-ALARM"
  | "RESCUE-HUB-01" | "ROUTE-INTRO" | "ROUTE-MINIGAME"
  | "ROUTE-ENDING" | "ENDING-SUMMARY";

type StorySave = {
  version: 1;
  scene: SceneId;
  openingSeen: boolean;
  chatBehaviour?: ChatBehaviour;
  route?: Route; // locked after Stephen's activity kiosk choice
  hubMatched?: boolean;
  minigameProgress?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  clearedEndings: Route[];
};
\`\`\`

- Only \`route\` determines which ending and mini-game the player sees; no hidden moral score or random selection.
- \`chatBehaviour\` changes a few lines but never the route.
- \`hubMatched\` means correct destination chosen; wrong guesses do not rewrite route.
- \`minigameProgress\` resumes a quiz/stamp sequence or body assembly (the latter may also require a small array of placed piece IDs).
- \`clearedEndings\` supports simple ending replay, no complex achievements.
- Save at scene transitions, meaningful choice, and after each round/piece. Version and validate loaded saves; gracefully reset invalid or old saves.

**Required save checkpoints:** Stephen's activity kiosk before selection (for ending replay), immediately after selection (for resume), at hub entrance, before each route mini-game, and at ending summary.

## 3. Dialogue and cutscene data

Store dialogue/cutscene content as simple editable TypeScript/JSON records, not hard-coded DOM or generated image text.

Example shape:

\`\`\`typescript
type DialogueBeat = {
  id: string;
  speaker?: "Stephen" | "David" | "Paul" | "Official" | "Gatekeeper" | "System";
  text?: string;
  pose?: "neutral" | "smile" | "concerned" | "frustrated" | "confident";
  background?: string;
  sound?: string;
  overlay?: "chat" | "brochure" | "bear" | "song" | "none";
  durationHintMs?: number;
};
\`\`\`

Populate the dialogue from:
- \`SP-WP1.2-OFFICE-OPENING.md\` (shots O01–O07).
- \`SP-WP1.2-GAME-TREATMENT.md\` (S01–S04, R01–R02, A/B/C intro, puzzle and ending text).

Early prototype may use one character sprite with dialogue box and minimal expression swapping; expressive still poses can be cropped/created after proof of flow. Character mouths do **not** require lip-sync. Captions always carry dialogue.

## 4. Scene layout and interaction

**Visual preference:** 16:9 landscape comic/game surface, with accessible scaling for desktop and tablet. Phones may use reflow/letterbox but touch hotspots must remain usable.

**Cutscene UI**
- Large background image.
- Up to three approved character portrait cut-outs at one time.
- Readable speech box anchored to bottom with speaker name.
- Tap, click or Space to advance.
- Skip / pause / subtitle controls.
- Limited faux-camera zoom, slide or panel swipe between beats; no expensive character rigs.

**Stephen scene**
- Single hotel/street background, with three optional examination hotspots and one very visible activity kiosk.
- Phone overlay allows one non-consequential choice, then kiosk contains the only decisive choice.
- Route warning is comic not moralising; destination descriptions are interesting and distinct.

**David and Paul scene**
- Single hotel lobby/information hub. The player clicks David's hotspots; Paul supplies automatically voiced (subtitle) observations.
- Three evidence hotspots and a three-way location match selector.
- Wrong options supply dialogue, not punishment; assistance after two wrong guesses.

**Mini-games**
- One small overlay canvas/view per route.
- Use the same generic button, dialogue, progress and replay framework.
- Fully operable with mouse and touch; no required dragging without an accessible click-to-select alternative.

## 5. Asset production budget

### Already approved, reuse directly

- \`public/assets/generated/characters/stephen-martin-baseline.webp\`
- \`public/assets/generated/characters/david-baseline.webp\`
- \`public/assets/generated/characters/paul-baseline.webp\`

These are character **reference sheets**. Initial vertical slice may crop portraits as placeholders, but in-game sprites should use consistent separate crops/background separation when approved. Never display an unrelated stock thumbnail as the canonical characters.

### Initial art request, smallest useful batch

**For opening vertical slice:**
1. \`office-wide.webp\`: invented office with printer, three desks, door and a suitcase. No real branding.
2. \`office-props.webp\` or native UI icons: cartoon bear printout, stupid threat assessment, group chat and suitcase; prefer vector/UI-rendered props over art generation for text.
3. \`comic-title-card.webp\`: may be implemented in CSS with one reusable comic texture instead of new artwork.

**For playable Stephen phase:**
4. \`city-hotel-wide.webp\`: fictional neon hotel/street collage with activity kiosk and food stall. Use the same background throughout.

**For common rescue:**
5. \`visitor-hub-wide.webp\`: fictional hotel lobby and information kiosk.

**For endings:**
6. \`mountain-club-wide.webp\`: imaginary mountain retreat.
7. \`bureaucracy-wide.webp\`: wholly imaginary stamped-paper office.
8. \`spa-workshop-wide.webp\`: cartoon spa and souvenir assembly room.

**Mini-game elements, mostly native UI:**
- Cult: 3 simple cards/offerings, sign and gatekeeper icon.
- Detention: paper forms, 3 colourful stamps, drink coaster.
- Reassembly: six flat cartoon/foam body-part pieces, one silhouette board and a few clearly non-gory gag components.
- 3 ending-card labels can be typeset natively; optional illustrated stills after playtesting.

**Do not make a unique painted background per dialogue line.** Stage 1 can work on office background plus three approved character references and text alone.

### Audio

- Optional short click, ping, printer whirr, paper flutter, stamp, "power on" and story sting.
- One 2-line temporary original joke song in office scene; later replace or reuse based on music-workstream output.
- Full voice acting, synchronised lip movement and complex score are explicitly out of scope for initial build.

## 6. Mini-game mechanics in data terms

### Cult: dialogue-card selection
Three rounds, one correct option in each, wrong answers produce short hint/reaction and retry. Upon three successes, \`minigameProgress = 3\`. Round data should be stored in a list: question, three responses, accepted response ID, wrong response text, Paul hint.

### Detention: fictional paperwork
Three sequential tasks with clear clue text, label and stamp selection. No typing or knowledge of real Chinese government or language. Final task uses click on Paul's takeaway cup to locate the missing "Approved" stamp.

### Reassembly: cartoon silhouette matching
Six slots, six matching pieces and optional gag rejects. Drag/drop OR select piece + select slot. Track accepted \`placedPieceIds\` and enforce idempotence. Correct part snaps, wrong part returns to tray. Require six correct to enable power button. No human anatomy accuracy, no gore.

Each mini-game must be fully completable in **3–6 minutes**, require no outside knowledge and offer Paul hint support after errors.

## 7. Work breakdown for extremely fast prototype

**Implementation packet GAME-SP1: Opening only**
- App boots to title/Start.
- Opening office still/portrait staging with complete scripted dialogue and advance/skip.
- End of O07 leads to a simple interactive Stephen screen placeholder.
- Verify ~3-minute scene pacing, text legibility and original character assets in a human review.
- No branching/minigame logic yet.

**GAME-SP2: Stephen choice + shared switch**
- Add one city scene with optional hotspots, phone choice, three-option kiosk and save.
- Add OFFICE-ALARM travel montage and common hotel hub.
- Add route clue matching (temporary simple UI), verify chosen route persists.

**GAME-SP3: Three route cutscenes + mini-games**
- Implement one branch at a time behind same story-state interface.
- Start with simplest (cult card quiz or detention stamps); then reassembly.
- Reuse end screen and replay logic.

**GAME-SP4: Polish and short human playtest**
- Replace only the placeholder visuals that genuinely need polish.
- Validate route A/B/C end-to-end, skip/save/resume, and touch.
- Time first playthrough and edit down to 15–25 minutes. Correct misunderstandings before feature expansion.

This sequencing proves gameplay and tone quickly and avoids the large-project trap.

## 8. Tests and hard acceptance criteria

**Story invariants**
- Correct route follows Stephen's kiosk selection, and cannot change at the rescue hub.
- Phone choice changes only one or two later dialogue beats.
- Any route can be completed without guessing hidden flags or using a walkthrough.
- All three endings play to completion with no missing asset or invalid state.
- Replay-choice loads at the kiosk, not the intro; "restart" starts from office.
- Skip opening and skip branch cutscenes do not leave state in an impossible configuration.
- Reload after every scene and each mini-game round/piece doesn't corrupt progression.
- No private relationship/family/employer/third-party identity appears in art, text, alt text or asset metadata.

**Visual and interaction**
- Use actual approved Stephen/David/Paul references or genuine derived assets.
- Dialogue readable on normal desktop and tablet screens, pointer and touch inputs.
- No mandatory fast reactions, timed failure or inaccessible precision drag action.
- The whole experience contains no long empty traversals.

**Project-size guard**
- No extra location, new puzzle engine, online service, multiplayer or runtime >25 minutes without explicit approval.
- Humour and player comprehension are the principal quality targets.

## 9. Immediate build hand-off after script approval

1. Lock / revise the first-pass dialogue and three end payoffs with owner.
2. Mark these story docs as approved, link from \`docs/CREATIVE-BIBLE.md\`, update \`STATUS.md\` and merge the story-script PR.
3. Open a separate small development PR for **GAME-SP1**, with a very early preview of OFFICE-INTRO.
4. Do not block GAME-SP1 on girlfriend/boyfriend character art, new songs, full backgrounds or the optional comic.
