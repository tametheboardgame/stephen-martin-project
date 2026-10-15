# The Stephen Martin Project: Master Roadmap

**Version:** 1.0 (approved 12 October 2026)  
**Status:** Approved for development  
**Primary deliverable:** Rescue Stephen Martin from China, a **15–25 minute comedy adventure**  
**Companion deliverables:** One comedy song; optional illustrated comic pilot  
**Audience:** Adults  
**Language:** British English

## Privacy and fictionalisation rule (approved 12 October 2026)

- **Stephen Martin is the sole real-world full name permitted.** David and Paul may be used as fictional first-name character labels, not as real-world identifying profiles.
- No additional real names, employers/office identity, precise travel information, personal messages, identifiable backgrounds, social accounts, or private third-party relationship and family facts may enter the project.
- Real-life anecdotes are **inspiration only**. New-partner, secret-family, international-incident, detainment and other plot situations must be fictional inventions presented as satire, not claims about real people.
- Do not attempt to identify the fictional boyfriend's real-world counterpart or include real relatives. A shared office may exist in-story, but it must be an unnamed fictional workplace.
- Apply this rule to scripts, songs, comics, promotional copy, asset filenames and metadata. Perform a privacy review before any public-facing release.
- Because the title contains a real full name and comic character portraits may resemble their inspirations, **these measures minimise identification rather than guaranteeing anonymity**.

## GAME-SP2.1 — Stephen's holiday three-scene Story V1 (owner-approved 14 October 2026)

**Canonical new story file:** `docs/story/GAME-SP2.1-STEVE-HOLIDAY-STORY-V1.md`.

The previously approved single-city-kiosk `STEVE-HOLIDAY-01` treatment is **superseded for Stephen's playable chapter only** by three short sequential choices at the Great Wall, Forbidden City and fictional Beijing night market. Each offers an evening activity; accepting a later invitation replaces any earlier booking, declining preserves the current plan, and all-declined requires an explicit final selection. The final plan determines the existing cult/detention/reassembly route and the truncated last message.

No new full campaigns, mandatory movement, lengthy dialogue, additional endings or unrelated mini-games are authorised. The existing OFFICE-ALARM, David/Paul rescue hub, three established puzzles and endings remain in force, as do the 15–25-minute full-playthrough guardrail and human artwork approval gates. Next implementation packet: **GAME-SP2.2**, Great Wall transition and first meaningful choice, after current draft audio PR state is respected.

---

## 1. Vision and scope

Create a compact, deliberately ridiculous fictional comedy universe inspired by Stephen Martin's trip to China. David and Paul attempt an international rescue despite possessing almost none of the skills necessary to succeed.

Three linked forms of entertainment:

1. **Game:** A short, complete, browser-playable comedy adventure with memorable dialogue, absurd puzzles, a small number of mini-games and three distinct endings.
2. **Song:** A catchy, inappropriate-in-spirit musical retelling of the holiday, disappearance and terrible rescue mission, consistent with the existing Berserk Llama Syndrome material.
3. **Comic:** An illustrated extension or retelling, beginning with a small pilot only if capacity and interest justify it.

All three share an approved character canon, recurring jokes, storyline, visual identity and artwork pipeline. The game is the priority, the song can run in parallel, and the comic remains optional.

### Firm scope limit: this is a short joke game

- **Target first-play runtime is 15–25 minutes**, not hours. Validate this with human playtests, including dialogue and endings.
- Prioritise punchlines, readable environments and forward momentum over exploration, collectible systems or elaborate mechanics.
- Four short narrative sections are enough; reuse locations and systems when sensible.
- Three **distinct ending payoffs**, not three separately built feature-length games. Use a shared investigation and compact finale variations.
- Aim for **2–3 substantial mini-games or puzzle set-pieces** in the initial release. Remaining concepts are a backlog, not a mandate.
- Avoid accounts, online multiplayer, complex databases, large open worlds, elaborate combat, live services, long cinematic sequences and unnecessary orchestration.
- Extend scope only by explicit owner approval, supported by a clear improvement to humour or playability.
- A complete funny 18-minute game is a success. A technically elaborate but unfinished game is not.

### Creative principles

- Adult British humour; intentionally absurd, irreverent and frequently dark.
- Comic target: Stephen's behaviour, David and Paul's incompetence, escalating misinterpretations, spy-fiction tropes and cartoonish bureaucracy.
- Stephen's enthusiasm for attractive **adult** Asian men, his suspiciously mysterious boyfriend, and the protagonists' utter lack of special skills are recurring comedy engines.
- The boyfriend is written as **fictionally ambiguous**: possible villain, innocent partner, or someone baffled by three idiots. Do not assert real-world wrongdoing.
- Fictional detention, fictional organ-market plots and a mountain cult may feature as satirical story routes; never present fictional allegations about identifiable real people as fact.
- All romantic or sexually suggestive characters are adults. Use innuendo and implication rather than explicit depictions of identifiable people.
- Avoid demeaning ethnic or sexual-orientation groups. Make the joke about characters' choices, not inherent traits.
- Preserve the existing Berserk Llama Syndrome comic-poster visual identity where appropriate; make game art practical and legible.
- Character visual design and approved story canon are shared across media.

### Success criteria

**Minimum viable release:** complete 15–25 minute playable game, approved Stephen/David/Paul designs, three distinct endings, 2–3 good puzzles/mini-games, desktop and touch support, reliable local resume, and one completed song. The comic is **not** a release dependency.

**Extended, optional success:** extra ending variations, soundtrack integration, secret discoveries and an approved short comic or longer comic production.

---

## 2. Delivery organisation and priorities

### Streams

- **Canon and shared assets:** visual bible, character sheets, recurring jokes, common story canon, asset provenance. Owner of character references and shared metadata.
- **Game:** implementation, gameplay flow, scenes, dialogue wiring, inventory, mini-games, testing and preview.
- **Music:** lyrics, song structure, production prompts, final audio (when supplied/produced) and artwork.
- **Comic:** scripts, page composition, illustration and lettering, conditional on pilot approval.

Use short-lived `agent/*` work-package branches with PRs into `main`. Streams may run concurrently when files and dependencies are independent. Avoid permanently diverging stream branches, parallel edits to shared canon or duplicate game implementations.

### Priority order

1. Finish and merge foundation (Phase 0).
2. Establish the three protagonists visually and their comic personalities (Phase 1).
3. Lock the concise story, tone and endings (Phase 1).
4. Prove a small playable game slice (Phase 2).
5. Build the remainder of the short game through bounded acts and mini-games (Phases 3–4).
6. Complete the song in parallel after core story decisions (Phase 5).
7. Consider a comic pilot when stable character and story material exists (Phase 6).
8. Test, polish and optionally release (Phase 7).

### Gates and autonomy

- **Human approval:** character likeness and expression sheet; core story/tone; playable vertical slice; mini-game humour; finished song; comic pilot; final release.
- **Technical qualification:** build, targeted tests, save/restore and playthrough coverage, responsive checks, approved asset pipeline.
- **Release gate:** any public game, song or comic release/deployment requires explicit permission. Merging code and artwork is not release authorisation.
- Record durable decisions and update `STATUS.md` when work packages meaningfully change state.

---

## 3. Phase 0: Foundation

### SP-WP0.1: GitHub and generated-image asset infrastructure

**Status:** Implemented, transferred successfully, awaiting final foundation PR review/merge at roadmap approval.

Deliverables:
- Repository with working `main` and PR workflow.
- Dedicated Google Drive staging folder and service account.
- GitHub OIDC / Google Cloud Workload Identity Federation.
- Validated source import, WebP conversion and branch-local GitHub commit workflow.
- Verified, approved Stephen character illustration and source provenance.
- Basic development documentation.

**Acceptance:** Successful real Drive-to-GitHub transfer; correct generated Stephen image is inspected; foundation PR merged. Do not mistake unrelated illustrative thumbnails for source assets.

### SP-WP0.2: Project governance and canonical documentation

Deliver:
- `PROJECT.md`: project identity, goals and limits.
- `ROADMAP.md`: this plan, including explicit 15–25 minute scope.
- `STATUS.md`: live state, active package, blockers and next action.
- `AGENTS.md`: lightweight operating rules and workstreams.
- `DECISIONS.md`: accepted meaningful decisions, no trivia.
- `docs/CREATIVE-BIBLE.md`: shared canon as Phase 1 defines it.
- `docs/ART-DIRECTION.md`: approved visual and character constraints as Phase 1 defines them.

**Acceptance:** A fresh agent can understand the project, next action, scope and authoritative artwork from the repo without prior chat.

---

## 4. Phase 1: Characters and creative universe

### SP-WP1.1: Establish main characters

**Start once foundation and roadmap are on `main`.**

**Stephen Martin**
- Existing approved comic character sheet is the baseline, already stored in Drive and generated WebP.
- Lock identifiable illustration attributes: hair, face, stubble, clothing, silhouette and baseline expressions.
- Create reusable front/three-quarter and expression references only if the approved reference needs additional coverage.

**David**
- Obtain source references, establish likeness and simple expression/pose sheet.
- Character: the overly confident IT specialist who mistakes excellent technical skills for an entire set of international rescue skills.
- Define distinctive visual behaviours and jokes.

**Paul**
- Obtain source references, establish likeness and simple expression/pose sheet.
- Give him an individual comic personality, flaws, reactions and practical role, rather than merely duplicating David's incompetence.

**The boyfriend**
- Design a clearly fictionalised counterpart and define his calm, inscrutable and potentially entirely innocent presence.
- Keep his motivations ambiguous and avoid describing real-life crimes as established fact.

Supporting characters are introduced only when needed, and should reuse costumes/animation systems where practical.

**Acceptance:** Human-approved character sheets; canonical reference files and concise character notes registered in the repo; consistent appearance across later assets. Stephen is first, then David and Paul, with the boyfriend when story work requires him.

### SP-WP1.2: Comedy and narrative bible

Document:
- Relationships, motivations, distinct speaking voices and signature reactions.
- David/Paul teamwork dynamic and their lack of a particular set of skills.
- Stephen's increasingly questionable priorities.
- Running jokes, escalating misunderstandings and consistent fictional rules.
- Tone, boundaries and continuity for song/game/comic.
- The setup, mystery, reveal and shared narrative beats.

**Candidate endings (approved directions, details to refine):**
- **Cult of Stephen:** an isolated mountain commune of handsome adult admirers; Stephen refuses rescue.
- **People's Republic of Stephen:** escalating comic bureaucracy and fictional detention.
- **Reassemble Stephen:** apparent black-market body-part plot resolved through a ludicrous cartoon reconstruction.
- **Optional secret payoff:** Stephen engineered the situation to avoid returning home.

**Acceptance:** Tight story outline with shared setup and three brief payoffs, suitable for a 15–25 minute game; no unfinished sprawling lore.

---

## 5. Phase 2: Game specification and first playable

### SP-WP2.1: Define the game

**Working title:** Rescue Stephen Martin from China.

**Preferred design:** 2D browser point-and-click/touch comedy adventure, inspired by classic graphic adventures but with minimal navigation friction.

Target: desktop browser, mobile browser and Android tablet.

**Only the core systems needed:**
- Click/tap movement and clear interactable hotspots.
- Conversations with limited meaningful or funny choices.
- Simple inventory, examine, use/combine interactions.
- Quest/story progress, contextual clues and comic fail feedback.
- Branching finale selection, three ending sequences.
- Local save/resume; straightforward restart.
- Music/SFX controls.

Keep a small number of scenes and inventory items. Favour witty responses over difficulty or trial-and-error padding.

**Acceptance:** Short spec, scene list, interaction list, approximate per-act runtime and a locked MVP/non-goals list.

### SP-WP2.2: Technical architecture

Evaluate a lightweight TypeScript/Vite browser stack, with **Phaser** as a candidate rather than an unreviewed requirement.

Build only:
- Scenes/state flow; dialogue presentation and data; hotspot/input model.
- Inventory/puzzle state; mini-game interface; persistent local saves.
- Asset loading from approved generated WebPs; responsive canvas and touch support.
- Preview deployment and a small meaningful test suite.

Avoid new frameworks, state stores or custom infrastructure without demonstrated need.

**Acceptance:** Minimal reproducible running build and clear explanation of architecture, asset paths and developer instructions.

### SP-WP2.3: Playable vertical slice

**Proposed slice:** David and Paul see Stephen's suspicious communications, inspect the evidence, attempt an idiotic plan and decide to travel to China.

Contains at least one environment, two characters, a dialogue exchange, an inventory or hotspot puzzle, a comic payoff and a save/resume demonstration.

**Target vertical-slice runtime:** about 3–5 minutes; part of, not additional to, the 15–25 minute final target.

**Acceptance:** Owner-approved playable slice on desktop and touch. Prove comedic pacing and usable controls before expanding the scene count.

---

### GAME-SP1.1 — Opening polish pass (approved 12 October 2026)

**Purpose:** Make the owner-approved GAME-SP1 office intro watchable hands-free and visually dynamic without adding any new plot or gameplay. This is the **next delivery package before GAME-SP2**.

**GAME-SP1.1-A: Playback**
- Autoplay dialogue **on by default**, with line duration based on text length (about 2.2–5.8 seconds, with deliberate longer pauses for key jokes/song).
- Persistent, visible **Auto / Pause / Play** control plus existing Next, Back, Restart and Skip intro. Next advances immediately and reschedules the timer; Back goes back and **pauses** playback to allow rereading.
- Correct timer cleanup during pause, scene changes, browser tab hidden, skip and restart. Show clear playback state and optional subtle line progress. Do not risk navigating past a line while the page is hidden.
- Manual mode lets the player advance one line at a time indefinitely; existing save/resume behaviour stays compatible.

**GAME-SP1.1-B: Character reaction art**
- Generate **small consistent expression packs** for Stephen (amused, neutral, laughing, confused, annoyed, exasperated), David (neutral, smug, briefing, frustrated, shocked, intense), and Paul (blank, confused, worried, especially blank, pleased, misunderstanding).
- Match their approved likeness, outfits and proportions. Each newly generated sheet remains a **human visual approval gate**; stage originals in Google Drive and import approved WebP into the existing asset pipeline. No unrelated stock art, no silently approved AI images.
- Use data-driven expression and **listener reaction** mapping so characters can visibly respond to other people's dialogue, not only when speaking. Fall back to existing approved reference art where an expression asset is unavailable.

**GAME-SP1.1-C: Comic cutaways**
- Use the approved office scene, but insert **three deliberate close-up cutaways**: David's OPERATION: PROBABLY FINE risk assessment, the printer actually printing fictional bear pages, and the fictional "STEPHEN RESCUE GROUP (PRE-EMPTIVE)" chat creation.
- A goodbye-song player cutaway is optional if it improves timing.
- Keep cutaway visuals lightweight, legible and consistent with the fictional office. Animated printer paper can be DOM/CSS; any generated art requires approval before becoming canon.
- Return naturally to the speaking characters. Each cutaway must be accessible (text remains in normal dialogue box) and obey pause / reduced-motion preferences.

**Non-goals:** New story scenes, Stephen's holiday gameplay, mini-games, new engine/framework, full rigged animation, voice acting, real employer information, real images of political figures.

**Acceptance:** Hands-free opening with tested manual controls; visibly changing character reactions where approved assets are available; at least three integrated visual cutaways; responsive desktop/touch rendering; focused autoplay/skip/back/visibility tests; Cloudflare preview works. Keep changes in a short-lived PR until owner accepts the visual presentation.

#### GAME-SP1.1-D — Rebuild the office scene with layered artwork (next, owner-approved 12 October 2026)

**Why:** The owner inspected the live GAME-SP1.1 expression-swapping playtest and rejected its portrait-card *presentation*, not the script or the 18 approved expression assets. Faces sit too low, overlap one another and are cropped awkwardly; the cutscene transitions and dialogue timing feel slow. **Do not spend a separate pass nudging the portrait-card CSS into place. Replace that layout with the in-office composition from the approved concept.** The concept infographic is a visual reference, **not** a flattened game screen to publish.

**Execution sequence, in deliberately small slices:**

1. **OFFICE-CLEAN-01: environment artwork.** Create one clean, high-quality, widescreen (at least 16:9) illustrated **fictional** office with desks, window depth, laptops, printer and foreground work surface. No people, dialogue, labels, controls, company branding or identifiable real office details baked into the image. Present the genuine environment artwork for human visual approval, then import the approved original through the existing Drive-to-WebP manifest pipeline.
2. **CHARACTER-STAGING: three independent actor layers.** Create Stephen, David and Paul as properly placed *seated or waist-up* sprites around the desks, not framed portrait cards. Match all three approved character likenesses, clothing and relative scale. Use transparent character bodies/busts with aligned registration points and interchangeable **expression heads or matching expression sprites**; choose one reusable approach that makes the existing 18 approved expressions genuinely visible without face seams, different crops or unaligned mouths. Keep the approved portraits as references/runtime materials; do not discard them or paint static characters into the office background. Human approval for new character staging art is required.
3. **CUTSCENE COMPOSITION: live layered UI.** Replace the three bordered portrait cards with the environment + independent actors + live props. Place an accessible, editable HTML dialogue panel over the lower desk portion without obscuring faces; keep the progress rail and functional Pause/Play, Back, Next, Restart and Skip controls below the stage. Preserve the existing scene/dialogue/state code, save/resume and desktop/touch input. Support mobile/tablet safe areas and test actual framing, not just a screenshot.
4. **PACE AND TRANSITIONS: tighten the jokes.** Shorten automatic line dwell times and eliminate slow/needless scene changes, keeping deliberate comic beats where useful. Add a small **1× / 1.25× / 1.5×** playback-speed control, with manual pause/rewind intact. Transitions should be near-instant unless a deliberate visual gag needs more time. Confirm the opening remains roughly three minutes at default speed and is comfortable to read.
5. **THREE CLEAN CUTAWAYS:** Replace the office visual (while keeping functional captions/transport in place) with isolated risk-assessment laptop, bear-printing printer and rescue-group phone compositions. Use separate approved artwork/DOM layers with editable screen/chat text and lightweight optional motion; return immediately to the normal office staging after each gag. Do not bake UI, real politicians or private details into the art.
6. **PLAYTEST/QUALIFY:** Run small targeted UI/state/asset checks, build a Cloudflare branch preview and have the owner review at wide desktop and touch/tablet widths. Check expression changes, faces and raised hands staying inside frame, foreground/face layering, speech contrast, cutaway timing, speed control and existing skip/save behaviour before merging the *next* implementation PR.

#### GAME-SP1.1-D1 — Office scene assembly preview (immediate next checkpoint, approved 12 October 2026)

**Intent:** Let the owner watch the **complete existing seven-shot, 64-beat office intro** with the new illustrated office and three seated characters **in place of the oversized portrait-card faces**, before investing in additional expressions, animation or presentation polish.

**Approved asset dependency:** [PR #10](https://github.com/tametheboardgame/stephen-martin-project/pull/10) (draft, asset-only at planning time) holds the owner-approved `OFFICE-CLEAN-01` widescreen background and the **independent transparent neutral seated sprites** for Stephen, David and Paul. GitHub WebP materialisation has been verified. Do not assume they are already on `main`; either bring PR #10 through its normal approval/merge gate first or develop D1 from the asset branch and submit a reviewable PR. Never copy from a flattened mock-up.

**Build this checkpoint:**
1. Replace only the current **stage presentation** with `OFFICE-CLEAN-01` as the background. Remove the three large framed portrait cards from the intro view.
2. Use three **separate, transparent, owner-approved seated sprite layers**: David **left**, Stephen **centre**, Paul **right**, at consistent scale. Position hands/forearms naturally behind the foreground desk; avoid oversized heads, overlap, cut-off glasses or covering faces with dialogue. Keep image placement configurable in CSS/scene data.
3. Keep the existing approved full office script, cutaway moments, autoplay, Pause/Play, Back, Next, Restart, Skip, local resume, sound toggle and live editable dialogue. Put real dialogue over the **lower desk area** and transport underneath the stage. The office view returns after each existing cutaway.
4. **Neutral sprites only for D1.** Do not pretend that the 18 earlier *head-and-shoulders expression crops* can be swapped straight onto these differently framed seated bodies. Preserve those 18 approved assets and reaction metadata for the **later aligned-expression/head-swap pass** after the owner accepts the new composition. No new sprite generation is required for this visual-check build.
5. Keep this a **development-branch visual preview**, testable through a Cloudflare Pages branch deployment or a downloaded offline preview. Do not silently replace the `main` production appearance. Commit the playable preview and request owner feedback before merging its code.

**D1 acceptance:** The entire opening can be played hands-free or manually, with three seated actors correctly placed behind the desk, readable captions, intact cutaways, no portrait-card faces and no unexpected clipping at desktop/tablet widths. Submit a genuine playable preview for the owner's visual review. D1 is **composition validation**, not final GAME-SP1.1-D completion.

#### GAME-SP1.1-D1A — Dedicated foreground desk overlay (next visual correction, approved 12 October 2026)

**Trigger:** The owner inspected the real deployed D1 office assembly ([draft PR #12](https://github.com/tametheboardgame/stephen-martin-project/pull/12)) and approved the overall composition, but noticed a conspicuous horizontal gap/seam where the seated characters meet the foreground desk. D1 currently reuses a **clipped portion of the background illustration** as a fake foreground. Do not patch this with character scaling or arbitrary CSS nudges.

**Asset: OFFICE-FOREGROUND-01.** Produce an **independent transparent original** containing only the foreground tabletop, front/near desk edge, and foreground objects (mugs, paper stacks/folders and optional edge foliage). It must visually match the owner-approved OFFICE-CLEAN-01 perspective, lighting, colours and desk position. Keep a full-size **transparent canvas registered to the exact background bounds**, so compositing needs no guessed horizontal/vertical offsets. Export an optimised alpha WebP via the established approved Google Drive → manifest → GitHub pipeline. The PNG source stays in Drive.

**Do not bake in** any of the three characters, office background/windows, dialogue, controls, company identifiers, or a whole flattened scene. Preserve existing fiction/privacy rules and obtain owner visual approval of the **actual isolated overlay** before publishing it as canon.

**Implementation:**
1. Prepare the overlay against OFFICE-CLEAN-01 and present it **alone on transparency plus a composite alignment proof** (without changing the approved background or sprites).
2. Stage and materialise the approved asset on the existing D1 development stream (or a small dependent art PR); preserve provenance.
3. Layer exactly: **clean office background → three independent seated sprites → new foreground transparent desk → existing cutaway layer → live editable dialogue and functional transport**. Replace/remove the CSS `clip-path` background-duplication foreground, so there is no repeated desk image, horizontal crop edge or gap.
4. Keep David left, Stephen centre and Paul right, the complete 64-beat intro, autoplay, pause/back/next/skip/restart/resume and the existing three cutaways. No new portraits, expression system, speed UI or gameplay in D1A.
5. Rebuild and deploy an **isolated Cloudflare branch preview**, run focused asset/build checks, then visually inspect desktop/tablet for a continuous tabletop-to-sprite join, correct hand/torso occlusion, stable perspective and readable dialogue.

**Acceptance:** The three seated actors look grounded directly behind the same desk, with natural foreground overlap and **no visible horizontal cut, floating gap, doubled props or face/hand obstruction** at both desktop and tablet sizes. The owner explicitly approves the real preview before merging the composition into `main`.

#### GAME-SP1.1-D1E — Cinematic main-menu hero (approved by owner 12 October 2026 (PR #12))

**Owner direction:** The full cinematic office cutscene is preferable to its former portrait-card layout, but the initial menu still looked like a narrow stack of website sections. Rebuild the opening menu using the **same approved background, independently layered seated trio and foreground desk** as the in-game office, with real interactive HTML floating panels.

**Deliverable:** One complete aspect-locked office hero filling the available laptop viewport. Position a bold, compact title above faces; put the Start/Continue controls and a subtitle on the desk; retain Sound on/off in a minimal top-right overlay. Maintain accessibility, focus states, correct save/resume, and a mobile layout that puts the controls outside the smaller illustration. Preserve the complete office scene, original story, cutaways, asset approvals and game-length constraints.

**Acceptance:** No character faces hidden by UI, no former stacked menu header/footer, working Start/Continue/sound, no scrolling at typical 1366×768 and 1856×825 desktop windows, and readable/mobile touch controls. Targeted smoke and a real Chromium visual check before owner reviews the Cloudflare **branch** preview. Owner accepted the final cinematic office and full-hero menu on 12 October 2026; see PR #12.

#### GAME-SP1.1-D2 — Seated expression variants and reaction swapping (next after D1 approval)

**Goal:** Give each of Stephen, David and Paul convincing expressions throughout the existing office dialogue **without disturbing the approved seated body, head registration, clothing, lighting, or desk composition**.

**Implementation checkpoints:**
1. **Expression registration proof:** Choose one safe, repeatable technique (aligned replacement full seated sprite, or separately masked modular head where natural). Use the approved neutral seated trio and 18 prior close-up expression references, but **never paste the old unmatched portraits directly onto the bodies**.
2. **Stephen first:** Produce seated variants for Neutral, Amused, Laughing, Confused, Annoyed, Exasperated. Human-check each against his approved seated baseline and a real composite in the office before registering.
3. **David:** Neutral, Confident, Serious, Frustrated, Shocked, Systems Expert; preserve the approved bald head, short ginger beard, navy hoodie and framing.
4. **Paul:** Neutral, Confused, Concerned, Blank, Pleased, Missing the Point; preserve clean-shaven face, glasses, white polo and matching framing.
5. **Integrate metadata:** Map existing speaker/listener reaction cues to the approved seat-aligned WebPs, use gentle swaps/crossfades only, keep cutaways and independent actors. Prefer sensible reaction pacing over elaborate animation.
6. **Review:** Test all 64 beats at desktop/tablet widths and check no jumping, face seams, cropping, mismatched desk intersections, or removed dialogue/transport; provide a Cloudflare branch preview for approval before merging.

**Scope:** Art, expression registration and controlled display only. Faster dialogue, 1× / 1.25× / 1.5× playback and cutaway polish remain later GAME-SP1.1-D slices. Do not begin GAME-SP2.

**Explicitly deferred to D2/D3:** Aligned expressive seated variants or modular heads; faster timing and the 1×/1.25×/1.5× control; fully illustrated refined cutaways; final visual approval. These remain approved within GAME-SP1.1-D, but must **not block the basic D1 scene preview**.

**Constraints:** All work stays within GAME-SP1.1. Do not begin GAME-SP2 holiday gameplay or mini-games. No additional framework, 3D scene, full animation rig or six different flattened background paintings. Reuse approved character canon and SP-D009 privacy rules. Split implementation into reviewable feature slices; new artwork remains subject to individual visual approval and the established asset pipeline.

**Completion gate:** A playable 3-minute office opening visually resembles the approved **in-office** composition, with independently changing aligned character expressions, three clean cutaways, functioning overlaid dialogue and transport, adjustable pacing and no overlapping/cropped faces at desktop and tablet sizes. The owner must approve the real Cloudflare preview. The merged PR #8 was an **intermediate playtest**, not approval of its portrait-card layout.


---

## 6. Phase 3: Full game narrative (single compact adventure)

**Total first-run target: 15–25 minutes**, including conversations, puzzles and one ending. Act allocations are planning guidelines, not mandated filler.

### SP-WP3.1: Act One, The Disappearance (roughly 3–4 minutes)

Setting: Britain.

- Establish Stephen's holiday, mysterious boyfriend and worrying last messages.
- Introduce David and Paul and their useless rescue credentials.
- Inspect a clue, complete a simple opening puzzle and decide to travel.

**Acceptance:** A funny, efficient opening that teaches the controls and reaches the next scene without padding.

### SP-WP3.2: Act Two, Two Idiots in China (roughly 4–6 minutes)

Setting: Airport, hotel or one small shared city hub, not a city-scale map.

- Language and translation failures.
- Travel planning mistakes and unhelpful witnesses.
- David's out-of-place IT confidence; Paul's escalating trouble.
- Discover evidence that points to several absurd possible fates.

**Acceptance:** One coherent area with distinctive jokes, clear goals and minimal backtracking.

### SP-WP3.3: Act Three, The Investigation (roughly 4–7 minutes)

Use a small shared investigation section to gather clues and choose an approach, rather than build three entirely separate campaigns.

- Clues towards mountain devotees, a fictional detention site and a suspicious market.
- Reuse hotspots/dialogue mechanics and existing characters.
- Make routes clear enough that the player can progress without a walkthrough.

**Acceptance:** Branch eligibility and narrative logic are testable; story remains inside total runtime.

### SP-WP3.4: Act Four, The Rescue (roughly 4–8 minutes, varies by ending)

Three compact, distinctive end sequences:

**A. The Cult of Stephen:** locate the commune, discover Stephen's delighted new life and attempt to convince him to leave.

**B. The People's Republic of Stephen:** comic interrogation and absurd bureaucracy culminating in a ludicrous escape/resolution.

**C. Reassemble Stephen:** buy/identify obviously questionable fictional replacements and solve a silly reconstruction puzzle with a punchline.

**Acceptance:** All three branches are completable, visibly different and funny; use common systems and avoid three complete sets of mechanics.

### SP-WP3.5: Secret payoff and replayability (optional)

- A secret truth about the disappearance, alternative lines, a small number of optional observations or achievements.
- Do not delay the MVP for extra endings, collectibles or elaborate branches.

**Acceptance if included:** Additional content is brief, discoverable and does not bloat the first playthrough.

---

## 7. Phase 4: Mini-games and comic puzzles

**Scope policy:** The list below is a candidate catalogue, not a requirement to build every entry. Pick 2–3 strong moments for the 15–25 minute release; the reconstruction mini-game is a leading candidate because it differentiates one ending.

### SP-WP4.1: Translation Catastrophe

A simple, funny fake translation challenge; wrong meanings produce escalating dialogue consequences. Keep short and forgiving.

### SP-WP4.2: David's Particular Set of Skills

A fictional terminal/computer puzzle satirising David's misplaced certainty that IT expertise equals espionage. No realistic harmful intrusion content required.

### SP-WP4.3: The Black Market

A spoof online shop with dodgy sellers, questionable fictional components, comical descriptions and absurd purchasing logic.

### SP-WP4.4: Reassemble Stephen Martin

A cartoon drag-and-place reconstruction puzzle with mismatched organs, extra parts and ridiculous test results. Exaggerated and non-graphic.

### SP-WP4.5: Optional extras

Consider interrogation, airport paperwork, cult recruitment and evidence reconstruction only if playtesting demonstrates a specific need.

**Acceptance for any selected mini-game:** Short, legible, mouse/touch usable, recoverable from failure, integrated into the single game state, independently testable and funnier than an ordinary click-through scene.

---

## 8. Phase 5: Comedy song (parallel workstream)

### SP-MUSIC-WP1: Stephen Martin Goes to China

Write a compact and catchy comedy song, initially favouring upbeat theatrical style with increasingly alarming lyrical content.

Story beats: Stephen's excitement, dubious holiday expectations, mysterious boyfriend, disappearance, David and Paul's nonexistent rescue skills, multiple possible fates.

Deliver:
- Draft lyrics and strong chorus.
- Humour/rhythm edit, shorter performance-ready revision.
- Suno-ready stylistic prompt and any required spoken interjections.

**Acceptance:** Owner-approved lyric and musical concept.

### SP-MUSIC-WP2: Production and artwork

- Produce/review musical candidates.
- Select a final track.
- Create artwork consistent with **Berserk Llama Syndrome** and approved character canon.
- Store prompts, lyric versions, provenance, metadata and final supplied audio as appropriate.
- Confirm usage/distribution rights for production services.

**Acceptance:** Approved song and cover asset, ready for private sharing or authorised release.

### SP-MUSIC-WP3: Optional game integration

Consider main menu, intro, credits or instrumental motif only if licensing, size and pacing permit. This is not required to complete the playable core.

---

## 9. Phase 6: Comic (optional, after core canon is stable)

### SP-COMIC-WP1: Short comic pilot

- Agree visual style, balloons, text handling and page dimensions.
- Script a **6–8 page** pilot covering holiday setup, disappearance and the first rescue decisions.
- Create consistent panels and readable lettering.

**Acceptance:** An approved, legible digital pilot with consistent characters and a clear comedic payoff.

### SP-COMIC-WP2: Pilot evaluation

Review character consistency, readability, comedic effect and illustration workload. Explicitly decide whether the comic should be a one-off, several short strips or an extended issue.

### SP-COMIC-WP3: Further production (conditional)

Produce the selected comic format only after an affirmative decision; share canon/art but permit medium-specific pacing and jokes. The comic is not required for the game/song MVP.

---

## 10. Phase 7: Completion, testing and release

### SP-WP7.1: Polish

- Finalise dialogue timing and proofreading.
- Resolve visual consistency and asset performance.
- Small, effective sound design and optional musical integration.
- Accessible interaction feedback, navigation and sound controls.
- Fast transitions, helpful hints, no tedious repetition.
- Verify mobile browser/tablet ergonomics and save compatibility.

### SP-WP7.2: Test the right things

Use the smallest test suite that gives confidence, without importing Unicorn Valley's large test/CI footprint.

Automate focused checks for:
- Build/type checks, game boot and scene progression.
- Inventory/puzzle state and completion of each ending.
- Local save/resume and restart.
- Primary desktop and touch interaction.
- Asset paths and delivery of a playable preview.

Human-test humour, ambiguity and **15–25 minute** completion time; trim unfunny content before adding features. Avoid repeated full browser matrices for trivial changes.

**Acceptance:** All three endings completed in tests and at least one representative 15–25 minute human playthrough; no blocking defects.

### SP-WP7.3: Release gate

Prepare a static, browser-playable release including:
- Clear title/credits and fictional satire framing.
- Final dialogue/art/audio assets.
- Three approved endings and selected mini-games.
- Save/resume and tested browser/touch experience.

**Explicit owner approval is required for production/public deployment.** A successful PR is not an instruction to deploy publicly.

---

## 11. Lightweight work-package process

1. Pick a small named package with goal, non-goals, acceptance and any human gates.
2. Open a short-lived feature branch and draft PR.
3. Build the smallest playable/viewable increment and run focused checks.
4. Present an interactive preview or genuine artwork for owner review.
5. Iterate until approved; do not mistake an unrelated placeholder/thumbnail for approved art.
6. Finalise, review relevant tests, update status/decisions and qualify the final branch state.
7. Merge to `main` after applicable approvals and checks.

Keep `STATUS.md` resumable, `DECISIONS.md` concise and `ROADMAP.md` authoritative. Avoid turning each joke or visual tweak into a large engineering project.

## 12. Immediate next actions

1. Close out foundation PR #1 and merge the approved roadmap/governance changes.
2. **SP-WP1.1:** character baseline: confirm Stephen; create/approve David; create/approve Paul; define fictional boyfriend later in package if needed.
3. **SP-WP1.2:** lock comedic story beats and compact endings.
4. **SP-WP2.1–2.3:** spec the 15–25 minute experience, choose minimal tech, build 3–5 minute vertical slice.
5. Continue bounded game development, with song drafting in parallel. Decide on comic only after pilot scoping.

**Primary rule:** A complete, funny little game comes first. Do not build a grand project around what is supposed to be a joke.


## GAME-SP2.3A (14 October 2026)
The owner approved the Forbidden City asset trio. Its banquet choice overrides/preserves the provisional Great Wall booking; route remains unlocked until Night Market. Draft preview/playtest required before merge.


## GAME-SP2.3B — Night Market, route lock and final message (14 October 2026)

Owner-approved Night Market scene art, Spa representative and skewer Stephen. Implement the final short invitation choice (accept spa replaces earlier plans, decline preserves). Three-declined fallback offers only previously seen options; finalise one route at departure, then show a route-specific unfinished message, dead battery, Stephen's reaction and Back in England. Preserve the fixed laptop layout and the original office clips. This does **not** implement the David/Paul rescue chapter: proceed to GAME-SP2.4 after owner visual approval of the stacked draft branch.


## GAME-SP2.3C — Branching, timeline intermissions and incident handoffs (14 October 2026)

Owner-approved revision: The Summit accept bypasses Forbidden City and Night Market; declining it leads to A Few Days Later / Forbidden City. Banquet acceptance bypasses Night Market; decline leads to The Next Evening / Night Market. Spa is then unavoidable, with no third offer buttons or all-declined fallback. Each selection moves to its honest, not-yet-playable incident handoff and route-specific interrupted phone message. Choose Another Ending restarts the Great Wall decision. Preserve the approved 16:9 art and standalone characters; V3 legacy saves are migrated. Implement mini-games/rescue only after this bounded owner-approved preview. Story contract: `docs/story/GAME-SP2.3C-BRANCHING-STORY-V2.md`.


## GAME-SP2.4–SP3.4 — Shared rescue, three mini-games and endings (approved 14 October 2026)

**Owner-approved implementation order:** **SP2.4A/B** Office Alarm, comic travel montage and shared hotel/visitor-information evidence puzzle → **SP3.0** minimal reusable route mini-game, hints, save/replay and end-card framework → **SP3.1** Summit Admissions Test + *Heaven Was a Place on Earth* → **SP3.2** Great Stamp Catastrophe + *Detained by Administration* → **SP3.3** six-piece cardboard *Reassemble Stephen Martin* + *Some Assembly Required* → **SP3.4** integration, accessibility, timings and 3/3 endings playtest.

Detailed approved spec: [`docs/story/GAME-SP2.4-SP3-RESCUE-IMPLEMENTATION-PLAN-V1.md`](docs/story/GAME-SP2.4-SP3-RESCUE-IMPLEMENTATION-PLAN-V1.md). Preserve the newer exclusive invitation routing in `GAME-SP2.3C-BRANCHING-STORY-V2.md`: the player experiences **one** matching route mini-game after the shared David/Paul investigation. One selected `route` is never silently changed by hub guesses or puzzle errors. Hint/no-fail rules, mouse/touch accessibility, mid-puzzle save/resume, existing 15–25-minute target and approved finale jokes are mandatory. New visual assets require separate owner approval and the established Drive/manifest pipeline; incident and rescue gameplay is **not yet implemented**. Do not merge to `main` or publish a release merely because this plan is approved.


## GAME-SP2.4A — Office Alarm and travel montage vertical slice (14 October 2026)

The original approved ten-line David/Paul OFFICE-ALARM now follows the Back in England cutaway. It reuses approved office actors/background and a route-specific phone prop; a short CSS/HTML travel montage finishes at Visitor Information. **The real hotel hub and evidence puzzle are SP2.4B**, not part of this code slice. Owner must review the draft game flow and separately accept an unoccupied fictional hotel concept before any new art is imported. Details: `docs/story/GAME-SP2.4A-OFFICE-ALARM-IMPLEMENTATION.md`. Retain stacked draft branches and explicit merge permission.


## GAME-SP2.4B — Shared hotel clue investigation (14 October 2026)

Implement the approved lobby as the sole shared investigation location, with eight canon arrival lines, three freely examined clues, a destination deduction that cannot alter the selected ending, Paul hints after mistakes and the five-line correct-guess payoff. The mini-games start in SP3.0 and are **not** built by SP2.4B. Save/resume each clue and deduction stage. Final staging requires independent owner approval of separate full-body standing David and Paul sprites; no scene composites or cutout of invented characters may be committed as substitutes. Refer to `docs/story/GAME-SP2.4B-HOTEL-INVESTIGATION.md` and existing approved treatment.


## GAME-SP2.4B — Approved standing hotel cast integration (15 October 2026)

Owner approved separate transparent full-body David/Paul PNG sprites. Materialise each via Google Drive manifests and place on independent layers above the approved lobby but under clue hit targets and subtitle UI. David taller, Paul visibly shorter across responsive breakpoints. Keep existing eight arrival beats, phone/brochures/desk interactions, hint and immutable route unchanged. Require a live human combined-scene composition review before merging any stacked PR; no release permission implied by art approval.

## GAME-SP3.0 — Small reusable route framework (started 15 October 2026)

Implement a narrow `rescueProgress` structure on the existing local V3 save, shared step/hint/assembly-slot helpers, approved spoken route introductions after the hotel deduction, restart/replay controls and a guarded ending-summary shell. The three actual interactive mini-games and completed end cutscenes belong only to SP3.1–SP3.3. Save/resume must preserve both the committed route and the exact briefing line; no dead ends, fake playable puzzles or extra media. Human inspect the draft Cloudflare preview, including laptop and touch layouts, before production merge. Work package: `docs/story/GAME-SP3.0-MINIGAME-FRAMEWORK.md`.


## GAME-SP3.1 — The Summit Admissions Test (started 15 October 2026)

Implement the approved three-round no-fail Summit dialogue/card puzzle, its complete original Ending A and shared replay path as a stacked draft after GAME-SP3.0. Retain saves, route isolation, hint-after-two, text and touch-accessible choice cards. The current proof uses intentionally provisional CSS/text staging only; separately approve new Summit and ending illustrations before final sign-off. `docs/story/GAME-SP3.1-SUMMIT-ADMISSIONS.md` records acceptance. SP3.2 (paperwork) and SP3.3 (cardboard assembly) are unchanged future work. No final game merge without owner approval.

## GAME-SP3.2 — The Great Stamp Catastrophe (started 15 October 2026)

Second gameplay-only route, stacked on GAME-SP3.1. The fictional Office of Ceremonial Misunderstandings requires Reason for Visit, classify-a-bear-document and find/apply an APPROVED stamp beneath Paul's takeaway drink. Accessible select-and-tap is required alongside optional mouse drag. Wrong choices are funny, never fatal, and trigger a Paul hint after two failures. A complete scripted Ending B and shared replay finish the route. New illustration/animation work is postponed until all three routes are functional, as agreed. See `docs/story/GAME-SP3.2-STAMP-CATASTROPHE.md`. SP3.3 remains next; no merge until owner review.
