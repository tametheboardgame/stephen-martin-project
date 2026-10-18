# The Stephen Martin Project: Master Roadmap

**Version:** 1.0 (approved 12 October 2026)  
**Status:** Three-ending first-version baseline merged 18 October 2026; GAME-SP4.1 refinement planning in progress  
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

## GAME-SP3.3 — Reassemble Stephen Martin (started 15 October 2026)

Third and final route-specific functional puzzle, stacked on SP3.2. Assemble a clearly fictional foam/cardboard display using six labelled slots, touch/keyboard select-and-place and optional drag-and-drop, plus harmless comic extras, no-fail hints, checkpoints and POWER ON action. Completing it unlocks the complete approved spa Ending C and shared replay. Artwork remains deferred to the dedicated phase following SP3.4 full-game integration. Work package: `docs/story/GAME-SP3.3-REASSEMBLE.md`. Retain draft PR and owner review before any production merge.


## GAME-SP3.4 — Combined gameplay baseline and visual inventory (begins after 15 October 2026 merge)

All three functional rescue branches are integrated into `main` at `aa1ea5a2ed8df7b1db4bfb89028d9ac81f6b5605`. GitHub branch smoke qualified with 71/71 checks and Cloudflare deployed the resulting `main` build. Before the art push, do a **lightweight** whole-game browser run across Summit, fictional paperwork and spa: inspect saved/resumed scenes, replay and input modes, note pacing and identify any interface layers that would obstruct art. Catalogue bugs without broadening gameplay. This is a qualification/visual inventory, **not** a new mechanics stream.

## GAME-SP4.0 — Unified artwork and presentation (next)

Owner approved the sequence **all mechanics → merge → art → polish**. Build the missing environments, character poses, discrete puzzle props and final ending tableaux as a consistent comic game, using the approved Stephen/David/Paul likenesses and existing Drive → reviewed manifests → WebP pipeline. Reuse approved hotel/background sprites. No new art is implicitly approved by this plan; review each generated asset before integration. Keep foreground props separate from buttons and speech/UI overlays. Use `docs/story/GAME-SP4.0-ARTWORK-PRESENTATION-PLAN.md` as the bounded inventory and production-order specification. Small preview PRs with responsive screenshots, never ungated main merges.

## GAME-SP4C — Ending C visual production (started 18 October 2026)

Following owner acceptance and merge of Ending B PR #44, continue SP4.0 with the third route: the fictional Total Renewal Spa and **Reassemble Stephen Martin**. The existing 13 selectable pieces, six matching slots, two-error hint, saved cardboard build and POWER ON/end dialogue are already playable and must not be reimplemented. Plan the visual work as **SP4C.1** empty spa lounge and display workshop backgrounds, **SP4C.2** coherent cardboard Stephen mounting board and six transparent compatible pieces, **SP4C.3** seven harmless decoy props plus laptop-safe tray/board controls, **SP4C.4** actual Stephen-in-robe reveal, David/Paul and cardboard counterpart sprites with short LED flourish, and **SP4C.5** QA, Cloudflare preview and explicit owner merge gate. Full asset inventory and art-specific acceptance rules: `docs/story/GAME-SP4C-ENDING-C-ART-PRODUCTION.md`. Begin with one empty spa lounge image proposal and obtain visual approval before source materialisation. This work starts on short-lived draft branch `agent/game-sp4c-ending-c-art-foundation` from merged main commit `584b4c7`. Maintain the 15–25-minute, three-outcome story guardrail.

## GAME-SP4.1 — First-version consistency and finishing programme

**Programme status:** Delivery order agreed 18 October 2026; **no polishing work packages implemented yet**.  
**Starting baseline:** Three-ended story and all gameplay/art from Ending B PR #44 and Ending C PR #46 merged into main; Ending C merge `d3d7534415c75d029072a31ede9fdde7de5130b4`. Last Ending C qualification was 132/132 smoke checks and 20/20 approved Ending C images packaged.  
**Supporting investigation:** [GAME-SP4.1 first-version source audit](docs/story/GAME-SP4.1-FIRST-VERSION-REFINEMENT-AUDIT.md). This roadmap is the executable work-package plan; the audit holds detailed observations and source-level evidence.  
**Target:** An illustrated, reliable, funny and coherent **15–25 minute** browser-playable V1 (first run including one of three endings). Three endings remain, no new story arc or mandatory mini-game.

### Delivery rules, review cadence and cross-cutting constraints

- Complete bounded `GAME-SP4.1A–J` packages rather than one sweeping rebuild. Open a **new short-lived `agent/*` branch and PR** for each independent implementation packet; begin from the latest approved `main`. Never merge unfinished unrelated polish or long-lived parallel changes to shared CSS/scene data.
- **At the start of each package**, record exact existing behaviour and scene(s), relevant source files, screenshots or video where practical, intended change, exclusions, and any art/audio dependencies. At the end, update `STATUS.md`, package progress and material decisions, including test result, preview URL, owner feedback and merge SHA.
- Preserve exact scene/script IDs, three routes, dialogue jokes, voice-ID mapping, six cardboard slot IDs, thirteen approved puzzle choices, existing save/resume compatibility, touch/keyboard equivalents, playback controls, privacy/fictionalisation rules and original approved character likenesses.
- Prefer common small helpers/CSS design tokens **only where repeated behaviour warrants them**. No new web framework, animation engine, account system, significant runtime expansion, or replacement of the existing HTML/CSS/JS architecture.
- New or revised artwork **requires its own human visual approval** and must use project Google Drive source → versioned manifest → validated WebP on a PR branch. Do not silently change approved drawings, bake text or choices into a background, or add original PNGs to Git.
- Each implemented packet requires appropriate targeted unit/contract tests, successful `npm run verify` / production-build asset validation, a deployed Cloudflare **branch** preview, plus specific human desktop/tablet visual confirmation before merge. A passing Node test is not itself visual approval. No user-facing release implied by PR merging.
- **Core visual checkpoints:** laptop at **1366×768** and **1440×900**, tablet approximately **800×1280** and phone approximately **390×844**. Test narrow/short screens deliberately; where mobile scrolling is necessary, it must be intentional rather than nested laptop overflow. Preserve keyboard focus, readable captions, suitable touch sizes and reduced-motion behaviour.
- Audio production continues independently with owner-supplied ElevenLabs recordings. Missing unapproved audio or optional illustration must not hold up critical usability fixes. Do not assume the existence of a recorded clip implies all lines in a scene are voiced.
- At any disagreement between this sequence and later explicit owner feedback, reconcile this roadmap and `STATUS.md` before shifting priorities.

### Milestone 1: Correctness and perceived loading speed (P0)

#### GAME-SP4.1A — Initial loading experience and scene-aware asset scheduling

**Priority:** P0; **status:** Merged to `main` via PR #49 at `57407e9`, after 138/138 smoke tests and owner confirming markedly improved loading; **dependencies:** completed. Supporting guide: `docs/story/GAME-SP4.1A-LOADING-IMPLEMENTATION.md`. Actual network-timing comparison and saved-phase cold-cache coverage are retained as later final QA checks.  
**Owner observation:** Artwork is visibly painted as it downloads, like an old dial-up image.  
**Source evidence:** `index.html` has 23 explicit image preloads, 41 eager-loaded scene image tags, and no dedicated current-scene loading/ready overlay. Image and audio readiness currently follow different models; loading could compete with later off-screen scenes.

**Implementation tasks**
1. Measure a real cold-cache, warm-cache and throttled-network start on a branch (load waterfall, first complete visible stage and time until controls usable), distinguishing browser cache effects from actual requests. Check direct Resume into a saved non-opening scene.
2. Add an accessible, appropriately styled loading overlay or scene curtain with a clear message, for the initial stage and subsequent large stage changes when necessary. Display only when required visible artwork is loading; do not cover or disable a settled scene unnecessarily.
3. Decode/load the **current scene’s** background, relevant cast and foreground layers before revealing them together. Reuse already-cached images; prioritise the correct intro/menu scene; trim speculative preloads and eager hidden-scene loading. Optionally warm the **next likely** scene after the current scene is interactive.
4. Handle individual image/network failure, decode error and a bounded timeout: do not leave users trapped indefinitely. Show safe fallback/Continue while preserving accessible speech, controls and story state. Clean up load state on restart, skip, route change and saved-game Resume.
5. Keep the overlay light and static by default; do not create artificial percentage progress or introduce a heavy animation/player library.

**Acceptance and proof**
- Opening and resumed scenes appear as a complete composition, not progressive stripes/partial character cut-outs. Compare slow-network recorded captures before and after.
- No permanent loader after a failed image; no blocked sound/keyboard controls; title/menu and Resume behave as before. Confirm no avoidable fetch burst for all three endings.
- Supply network/first-use timings, test for failure recovery, and desktop/tablet screenshot evidence. User approves preview before merge.
**Non-goals:** Re-encode every asset, replace image pipeline or preload the entire game before opening.

#### GAME-SP4.1B — David expression registration in Back in England

**Priority:** P0; **status:** Implementation on `agent/game-sp41b-london-david-registration`, visual review pending; **dependencies:** A merged into main. Owner-approved opening pose calibration is reused in the London alarm. Detailed evidence/review: `docs/story/GAME-SP4.1B-LONDON-DAVID-REGISTRATION.md`.  
**Owner observation:** David grows/shrinks between expressions in Chapter Three’s office rescue alarm despite the opening having already been aligned.

**Implementation tasks**
1. Identify every `rescue.alarm.001–010` David expression and actual WebP used by `rescuePortraits` / `#rescueAlarmDavid`, and compare the authorised seated source art to opening-scene registration.
2. Inspect intrinsic canvas and alpha-visible bounds, heads/eyelines, shoulders and desk baseline. Establish a **stable actor-space anchor** and per-expression calibration; if artwork needs new aligned WebP canvases, retain canonical faces and seek approval for revised derived assets/manifests.
3. Change pose selection/calibration only for the Chapter Three rescue alarm. Keep Dave on the approved perspective plane, Paul unchanged, foreground desk correctly in front, and avoid double-silhouette crossfades.
4. Retain all ten voice lines, dialogue timing, phone reveal and pause/resume behaviour.

**Acceptance and proof:** Every one of the ten alarm beats uses the same perceived head/body size and anchored eyes/shoulders at laptop and mobile sizes. Provide a ten-frame comparison sheet or replay clip. No change to other office scenes or Paul; existing saved checkpoint resumes correctly.
**Non-goals:** Redesign David’s face or add new expressions in this fix.

#### GAME-SP4.1C — Summit entrance daylight and legibility

**Priority:** P0; **status:** Owner visually approved and merged via PR #52 at `7f6415b`, 141/141 tests passed; **dependencies:** SP4.1A/B previously merged. Summit exterior now uses its approved daylight art without whole-stage navy overlay. Review guide: `docs/story/GAME-SP4.1C-SUMMIT-DAYLIGHT.md`.  
**Owner observation:** Exterior of the Summit looks covered by a shadow.

**Implementation tasks**
1. Compare approved `summit-entrance-v01.webp` with the rendered Summit briefing and admissions scene; confirm source colours versus CSS composite.
2. Scope down/remove the existing dark gradient over the entire entrance background. Use a localised scrim **behind speech/title/cards**, rather than dimming landscape and actors.
3. Check entrance actors, gatekeeper, atmosphere, legible interactive copy and the admissions puzzle at desktop/tablet/mobile. Do not alter the separately approved interior throne room.

**Acceptance and proof:** Before/after at the same scene beat demonstrates brighter illustrated environment with adequately contrasting title, subtitles and choices; no effects on Ending B/C or throne room.
**Non-goals:** Regenerate the approved landscape or change comic dialogue.

#### GAME-SP4.1C2 — Ending B background daylight and legibility (deferred)

**Priority:** P2 visual follow-up; **status:** Started 18 October 2026 after approved SP4.1E merge (PR #57), on `agent/game-sp41c2-ending-b-daylight`, pending actual preview and owner visual approval. Tracked by [GitHub issue #56](https://github.com/tametheboardgame/stephen-martin-project/issues/56). See `docs/story/GAME-SP4.1C2-ENDING-B-DAYLIGHT.md`. **Owner observation:** Ending B has the same excessively dark whole-scene treatment previously corrected for the Summit entrance in GAME-SP4.1C. This is a separate issue and must **not block GAME-SP4.1D2** or be changed in its skip-navigation PR.

**Future investigation and acceptance:** Compare the original approved Ending B bureaucratic office artwork against rendered intro, permit/stamp game and ending scene. Check for CSS full-stage dark gradients/overlays and remove only unnecessary global shading, while retaining local contrast behind headings, white dialogue, paperwork and prompts. Check desktop/tablet/mobile and confirm image, actor positions, scripts, puzzle interaction and layout are unchanged. Prepare a separate bounded branch/PR, screenshot comparison and owner visual approval; do not regenerate approved art.

### Milestone 2: Consistent speaking and character focus

#### GAME-SP4.1D — Consistent dialogue, removal of proof controls and contextual story skips

**Priority:** P0 for speech-card coherence, P1 for first-version navigation cleanup; **status:** D0 and D1 approved/merged (D1 PR #54 at `2e8347b`); D2 started on its own branch 18 October 2026. **Dependencies:** A/B/C/D0/D1 merged. **Delivery:** three small, independently approved implementation PRs **D0 → D1 → D2**, followed by E. The new owner requests of 18 October 2026 are explicitly included below. Do not combine the three into one high-risk UI/state rewrite.

**Owner observations:** Spoken responses become blue footer text after choices; the opening still shows developer-facing “Stephen: Auto”, “David: Auto”, “Paul: Auto” toggles despite the expressions now being automatically scripted; players should be able to skip long *already scripted* passages to the next meaningful choice, playable puzzle or scene ending from the playback bar.

##### GAME-SP4.1D0 — Remove the three opening expression-proof switches (small cleanup)

**Implementation status (18 October 2026):** Complete on draft PR #53, pending CI of final head and owner desktop/mobile preview. Stephen/David/Paul proof UI and overrides removed; scripted automatic acting is protected by regression tests. Detailed review: `docs/story/GAME-SP4.1D0-INTRO-EXPRESSION-CONTROLS.md`.


1. Remove the visible `.expression-proof-controls` group and its Stephen/David/Paul Auto-cycle buttons in the opening playback controls. They were created to compare approved poses during development, **not** to be part of the finished game. Reclaim space for normal playback/skip controls at laptop/tablet widths.
2. Remove associated proof-mode state/cycle handlers and dead CSS, but **retain all approved expression source mappings, automatic per-line acting cues** (`beat.reactions` → `applySeatedExpression`), registration scales, speaking/listening effects and the existing sound, pause, Next, Back and progress controls.
3. Update the old proof-toggle regression tests to verify that expressive changes still happen automatically when each character speaks/reacts, including restored sessions; never replace moving characters with static neutral art merely to delete the buttons.

**D0 acceptance:** No Stephen/David/Paul Auto buttons appear or accept input anywhere in the opening; all three still switch through their scripted expressions as the story progresses. No broken element lookups/event listeners, no change to David’s just-approved registration, no lost audio or saved-game compatibility. Verify desktop and phone toolbar spacing.

##### GAME-SP4.1D1 — One coherent named dialogue bubble before and after choices

**Owner extension (18 October 2026):** also standardise the menu/transport at the **top** of the office and all later scenes, using consistent buttons, Sound availability, responsive spacing and a compact chapter label. This belongs in D1, not a new unplanned package. First branch `agent/game-sp41d1-dialogue-topbar` implements the dialogue/toolbar pass; verify preview and acceptance checklist in `docs/story/GAME-SP4.1D1-NAMED-DIALOGUE-TOP-MENU.md` before merge.


1. Inventory actual spoken-line UI in the opening, Great Wall pre-/post-choice, Forbidden City post-decision, Night Market confirmation, Back in England alarm, visitor-information/hotel evidence/feedback, three route intros, interactive response lines and each ending.
2. Use a compact shared **named white/paper speech-card** visual contract: consistent speaker label, typography, safe position/z-order, accessible text announcement and mobile placement. Reuse or modestly consolidate scene-specific HTML/CSS/render helpers while keeping stable IDs and the existing game architecture.
3. Route **spoken choice-result reactions** back through the named dialogue treatment instead of the dark blue action footer. Choices, narration, clue inspection, puzzle hints, game status and navigation **are not spoken character dialogue** and keep deliberately separate semantics.
4. Preserve line text/IDs, correct speaker attribution, branch state, choice waits, save/resume, real recorded audio and missing-MP3 timing. Fix accidental overlap with actor faces, title bars, toolbar, phones and stamp/cardboard puzzle controls.

**D1 acceptance:** Visual matrix covers every relevant scene at 1366×768, tablet and mobile. Named white bubbles persist through spoken choice responses, no two conflicting speech panels, no hidden/off-screen speaker name, no truncated text and no buttons disguised as dialogue. Every manual choice and puzzle remains manual. Owner signs off a true playable branch preview.

##### GAME-SP4.1D2 — Context-sensitive Skip to Choice / Game / End navigation

**Intent:** One optional, clearly labelled **contextual skip** in the established playback/transport area for all applicable scenes; **do not** present an inert universal button or add a second competing toolbar. Use the existing `Skip intro` action where it already works, harmonising it with the other transport actions.

1. Build a small explicit **checkpoint map** keyed to real current game phases, backed by the same existing render/save states and script IDs. The control label and destination depend on what is next, not a fixed “Skip everything” action. Example labels:
   - Opening scripted office → **Skip intro** (to the existing Stephen holiday transition; do not skip ahead into any incident).
   - Great Wall / Forbidden City → **Skip to choice** (last scripted line played/completed, choice not selected).
   - Night Market → **Skip to decision** or **Skip to invitation**, as appropriate to its existing fixed-route semantics (no invented choice).
   - Stephen’s phone / Back in England alarm / rescue travel → **Skip to rescue** or **Skip to investigation** at the next genuine state boundary.
   - Hotel opening dialogue → **Skip to investigation** (enable clue hotspots, not a deduction result); hotel feedback → only a safe existing unresolved deduction boundary.
   - Each rescue-route introduction → **Skip to game** (begin Summit questions, permit/stamp, or cardboard assembly at its normal unsolved initial state).
   - A **completed** mini-game’s or finale’s *remaining scripted* closing dialogue → **Skip to end** (reach its own ending summary). **Never** offer this as a shortcut around an unsolved mini-game or to fabricate its completion flags.
2. Put the button in the same top/transport bar as Play/Pause/Next where practical (office has a separate top scene toolbar and dialogue transport; holiday scenes use the shared `.china-footer`). Use consistent placement and modest responsive sizing; on short screens do not obscure dialogue or make an extra laptop scrollbar. If there is no safe forward checkpoint (already at an unresolved choice, clue, game or final summary), **hide/disable** the contextual skip.
3. A skip is an **atomic** state transition, not a rapid stream of synthetic Next clicks. Stop any active voice and text timers, avoid delayed onended callbacks firing on the new scene, update current phase/line checkpoint, persist, render the target, respect scene-aware image decoding and focus the newly revealed choice or game region. Do not automatically answer a choice, deduce a route, select/drag a piece, stamp a document, pass a Summit round, change route or consume a save inadvertently.
4. Preserve all three ending paths, including sound-off/missing-file behaviour, Play/Pause, Back/Next, restart, Resume, Change route, tab-hide handling and keyboard/touch alternatives. Skip labels must describe precisely where they go; do not promise “Skip to end” until that route’s puzzle has actually been completed.
5. Cover all meaningful source phases in a **navigation matrix** before coding, then add focused transition-state/voice-cancellation/save tests across each ending. Test skipping during a playing MP3, paused line, loading curtain and restored checkpoint; verify the landing state on laptop, tablet and phone.

**D2 acceptance:** Every purely scripted stretch of the game has a contextually correct skip-to-next-interaction/end where safe; buttons are obvious but unobtrusive alongside the existing transport. Users can jump directly to **choices**, **unsolved games** or **the ending summary after completing a game**, with all route logic, voice cancellation and V3 saves correct. At an unresolved interaction the skip cannot bypass it. Full three-path checkpoint table, automated tests and owner preview approval before merge.

**D-wide constraints:** No change to canonical dialogue, actor images, approved expressions, three routes, save schema or puzzle correctness. Do not make skip controls mandatory, introduce a fourth story path or automatically solve the existing puzzles. Defer additional acting animations to SP4.1G, but **retain** automatic reactions when removing expression proof controls.

#### GAME-SP4.1E — Speaking-character glow/backlight throughout the story

**Priority:** P1; **status:** Implementation started 18 October 2026 on `agent/game-sp41e-speaking-character-highlight`, pending CI and owner visual approval. D2 approved/merged via PR #55 at `3c7bb32`. See `docs/story/GAME-SP4.1E-SPEAKER-FOCUS.md`. **Dependencies:** D speaker presentation semantics and stable B calibration.  
**Owner observation:** Only ending sequences and selected route entrances emphasise the current speaker.

**Implementation tasks**
1. Build one restrained reusable active-speaker/backlight style with common intensity, and small `setActiveSpeaker(scene, speaker)` or equivalent mapping for existing actor DOM nodes.
2. Extend to office, Great Wall, Forbidden City, Night Market, Back in England, hotel, route intros and all three finales, **only where speaker has a visible actor**.
3. Clear state for silence/narrator/title/choice/puzzle/hidden speaker; prevent stale highlights on replay, hide/transition, Back/Next and route changes.
4. Keep real Stephen and the badly taped cardboard Stephen **independently highlightable**. Prefer static visual intensity over flashing or motion and respect reduced-motion.

**Acceptance and proof:** Step through representative dialogue from each scene with a speaker checklist. Correct visible person glows without moving or resizing; no glow left behind during pauses, choices or narration. All endings and mobile layering remain readable.
**Non-goals:** New choreography or expression illustrations.

### Milestone 3: Illustration and selective performance (P1/P2)

#### GAME-SP4.1F — Dedicated illustrated transitions

**Priority:** P1; **status:** Four approved assets **installed in the game** on `agent/game-sp41f0-transition-storyboard-narration` (draft PR #59) with 12 optional narrator cues and live subtitles. Verified **168/168 tests, four images included, 112 existing voices packed**, Cloudflare preview successful (18 October 2026). The owner's existing narrator voice will be used; **12 narrator MP3 recordings remain for later upload and the script copy is editable until recorded**. Review the actual branch preview before merge; **dependencies:** D layout and asset readiness conventions from A.  
**Owner observation:** Several scene changes feel like plain text cards rather than part of the illustrated adventure. Owner additionally requests **spoken narrator passages** paired with the new illustrated transitions, using one consistent off-screen voice.

**F0 approval and implemented delivery:** `docs/story/GAME-SP4.1F0-TRANSITION-ART-NARRATION.md` covers the storyboard, **four owner-approved illustrations now in their intended scenes**, and **12 cue IDs already wired into the existing player with human-readable narrator subtitles**. The MP3s are optional until the owner records them; missing/disabled audio uses timed text. No new character voices, route decisions or gameplay steps have been introduced. Original WebPs and approved PNG provenance are recorded in `docs/story/GAME-SP4.1F-APPROVED-ASSETS.md`; Google asset automation remains tracked separately as issue #60.

**Proposed bounded artwork packets, each individually approved**
1. **F1, passage of time:** One reusable illustrated frame for time passing during Stephen’s China sightseeing, retaining editable place/time titles.
2. **F2, Operation: Probably Fine travel:** One or at most two compact illustrated cards for David and Paul’s absurd England-to-China journey. Preserve no-fuss automatic timing.
3. **F3, route handoff:** A single consistent illustrated composition with route-specific live labels for Summit, Cultural Honours Banquet or Total Renewal Spa, not three new bespoke narrative scenes.
4. **F4, optional finishing pass:** Chapter/intermission/end cards only if playtest identifies an obvious visual gap after F1–F3.

**Implementation tasks:** Create concept using established approved visual bible and canonical actor references, obtain owner approval before upload, stage original PNG in Drive, manifest/convert/version WebP, combine with accessible live headings and small one-off dissolve if suitable. Do not change choices or outcome routing.

**Execution stages — F1, F2A/F2B, F3 and narrator mechanics implemented; actual MP3s pending:**
- **F1 — Time-passing postcard (one asset, two uses):** Stephen sightseeing between Wall → Forbidden City and Forbidden City → Night Market; retain live daypart and location titles.
- **F2A/F2B — Rescue travel (two assets, four uses):** David/Paul airport and baggage mishaps, followed by upside-down map and absurd expenses; reuse artwork across consecutive montage beats, no added game steps.
- **F3 — Shared route handoff (one asset, three uses):** one route-neutral approved illustration with live Summit / banquet / spa labels, not three independent artwork bills.
- **F-NARR — Spoken off-screen narrator (12 reserved cues):** chapter transition, both sightseeing jumps, three possible route handoffs, England return, four travel beats and hotel arrival. **Mechanics are live:** existing MP3-ID playback, speaker-independent subtitles, mute/pause/Next/Skip and missing-audio fallback. The owner will record the existing narrator voice later. Review/edit the draft cue wording before recording; no artificial placeholder recordings have been installed.
- **F4 — Optional gap-check only:** consider an extra Back in England connector or hotel arrival picture if the four approved assets still leave obvious visual holes; separate approval before generation.

**Acceptance and proof:** Major previously bare transitions now share coherent art direction and a consistent optional narrator, remain legible and responsive, respect mute/play/pause/skip and do not materially increase total runtime. Every image has an approved origin and real branch build preview. Missing narration MP3 must never stall progress; current game saves and all route checkpoints remain intact.
**Non-goals:** New cutscenes, travel levels, extended cinematics, embedded artwork text, an additional speaking character sprite, or edits to approved dialogue.

#### GAME-SP4.1G — Limited extra expressions, reactions and movement

**Priority:** P2; **status:** Deferred until B and E are stable; **dependencies:** approved expression registration and speaker focus.  
**Owner idea:** Add some personality through extra reactions and motion without bloating the project.

**Implementation tasks**
1. Catalogue where the **existing approved** expression assets already deliver a genuine reaction, and identify up to a few high-value missed jokes (hotel deduction, Summit disbelief, cardboard Stephen’s first line, etc.).
2. Add listener reactions or a small selection of alternate approved scene-specific poses, one coherent batch at a time. Register intrinsic canvas, alpha bounds, eyeline and ground position to avoid scale jumps.
3. Where helpful, add restrained occasional arrival/pose/lighting transitions, not constant bobbing or decorative animation; keep muted/reduced-motion fallback.
4. Apply the owner’s likeness/visual approval and Drive → manifest → WebP gate to any new art. No automatic large new expression library.

**Acceptance and proof:** More expressive punchlines without actor height shift, face drift, layering errors or pacing changes. Visual sign-off on each approved pack at desktop/tablet; no unwanted animation for reduced-motion users.
**Non-goals:** A full skeleton animation system, lip-sync, motion capture or large character redraw.

### Milestone 4: Parallel audio completion and final acceptance

#### GAME-SP4.1H — Finish voice coverage and sound consistency

**Priority:** P1; **status:** Independent recording track, open throughout milestones A–G; **dependency:** user-supplied/approved ElevenLabs recordings.  
**Verified baseline:** 112 permitted dialogue MP3s presently exist (55 opening office, 25 holiday, 10 rescue alarm, 22 hotel); **this does not mean the endings are voiced**. The voice player currently covers those script families, but route introductions, route puzzles and endings need a further explicit inventory. Two approved song MP3s are separate.

**Implementation tasks**
1. Inventory **every still-unvoiced scripted line** with stable scene/line ID, speaker, exact approved text, estimated clip duration/acting direction and filename. Mark lines as `recording needed`, `silent by design` or `available`. Reconcile the old voice-upload guides against the true merged whitelist.
2. Prepare upload locations and incrementally extend the **explicit** allowed filenames and audio-to-line mapping only after a batch of clips has been supplied/approved. Continue the existing ID-addressed MP3 system; do not introduce online runtime TTS.
3. Assess consistent relative loudness, abrupt start/end, silences, dialogue/subtitle match, pause/Next, changing tabs, audio on/off, resume/replay and no-audio fallback. Test each new group in its own preview.
4. Distinguish narrator and comic-character lines, preserve exact script and fictional identity rules. Any new voiced line or script alteration needs separate owner permission.

**Acceptance and proof:** Recording manifest per route and scene showing missing versus approved clips; no missing file blocks/auto-skips text; all three endings complete with sound disabled and with any approved recordings enabled; no double-play on replay/back. **Audio remains parallel** and does not delay agreed critical visual packages.
**Non-goals:** Generate artificial replacement audio without approval or force owner to finish every line before code/visual fixes.

#### GAME-SP4.1I — Whole-game V1 test, timing and release candidate

**Priority:** P0 final; **status:** Not started; **dependencies:** A–E complete and reviewed, F/G/H either approved/merged or explicitly recorded as deferred; run targeted regressions after every individual merge.  

**Implementation tasks**
1. Run and record **three complete human playthroughs**, one per ending, from fresh start. Measure total play time, text/audio pacing, joke beats and three route differences; assess against the **15–25 minute per first playthrough** target.
2. Test sound on/off and missing clips, pause/Next/Back, manual choice waits, skipped intro, hidden browser tab, restart, Save/Resume at representative checkpoints, return/change-route, and ending summary.
3. Run desktop 1366×768/1440×900, tablet 800×1280 and phone 390×844 checks of image layers, z-index, controls, dialogue cards, clipping, contrast, tappable/keyboard-selectable interactions and unintended nested scrollbars.
4. Inspect all route puzzles (Summit answers, paperwork/stamp and 13-piece/6-slot cardboard model) for correct/bad answer handling, hints, impossible auto-completion and accessibility equivalents.
5. Review original asset provenance and public repository privacy. Audit spoken/caption text for fictionalisation and third-party identifying details, metadata and deployment risks. Public release remains a **separate explicit approval**.
6. Remove only **proven** obsolete labels/placeholder metadata or CSS after regression, reconcile `README.md`, current voice guides, `STATUS.md`, `ROADMAP.md` and `DECISIONS.md`. Freeze an unambiguous release-candidate commit SHA and any known deferrals.

**Acceptance and proof:** Three route test records and timing observations, green `npm run verify`, responsive/keyboard/touch checks, no severe navigation defect, a complete missing-voices/known-issues list and owner-approved V1 release-candidate visual review. If play time misses target, propose **bounded edits for approval** rather than silently cutting canonical jokes. Production marketing/public release is **not** authorised merely by reaching this milestone.
**Non-goals:** Huge test harness, changing game framework, fourth ending or broad narrative rewrite.

#### GAME-SP4.1J — Deferred Ending C cardboard mounting-slot registration

**Priority:** P2 explicitly deferred; **status:** Awaiting owner reprioritisation; **dependencies:** the rest of initial visual consistency pass, unless this becomes a practical blocker.  
**Owner decision:** The assembly model's arm and leg *piece selection* now works correctly, but the empty physical slot shapes do not perfectly follow the pieces. This is not a reason to rebuild Ending C now.

**Implementation tasks:** On a separate, small branch, overlay registration guides on the **already-approved** board and all six body-part art pieces. Correct empty slot shape/hit area, seam/alignment and per-part pose boundaries while keeping the anatomically corrected visual orientation, touch/keyboard targets, IDs, hint system and correct/decoy mapping. No changes to final real/cardboard Stephen reveal.

**Acceptance and proof:** Screenshot before/after showing intuitive empty slots and tightly joined fitted head, torso, arms and legs; no limb reversal, overlap or save regression. Owner explicitly authorises this optional finishing packet before it starts.

### Package sequencing, hand-offs and definition of ready

| Order | Package | Depends on | Owner gate and merge criterion |
| --- | --- | --- | --- |
| 1 | SP4.1A | Three-ending main baseline | Cold-cache loader and failure fallback shown in working preview |
| 2 | SP4.1B | A preferred, existing approved David assets | Ten-line pose comparison, no height changes |
| 3 | SP4.1C | Independent (can be alongside B) | Brighter Summit entrance accepted on laptop/tablet |
| 4a | SP4.1D0 | B merged, independent of C | Remove three expression-proof toggles while automatic acting remains intact |
| 4b | SP4.1D1 | D0 and current scene presentation | Named white speech bubbles before and after choices |
| 4c | SP4.1D2 | D1's unified transport/speaker presentation | Contextual skip only to safe choice/game/end checkpoints, never through puzzles |
| 5 | SP4.1E | D, stable actor scale | Correct speaker glow in every applicable scene |
| 6 | SP4.1F | A/D presentation patterns; artwork approval | Each transition illustration packet previewed and signed off |
| 7 | SP4.1G | B and E; new art sign-off where used | Poses never shift framing; restrained motion |
| Parallel | SP4.1H | Approved user-supplied clips | Each voice batch individually listened to and previewed |
| Final | SP4.1I | Approved A–E and explicit F/G/H deferrals if needed | Timed full-game acceptance, release candidate ready for owner |
| Deferred | SP4.1J | Owner reschedules | Precision board geometry, no puzzle regression |

**Current implementation next (18 October 2026):** SP4.1A and SP4.1B are merged and user-approved. Start **GAME-SP4.1C (Summit entrance brightness)** from the latest `main`. Then deliver SP4.1D0 (remove Auto proof controls), D1 (consistent named speech bubbles) and D2 (contextual skip checkpoints) as separately reviewed PRs before SP4.1E speaker glow. Continue voices independently. No extra gameplay or new art is authorised by this planning update.

**Historical note:** SP4.0 and SP4C entries above describe past development stages and may mention draft branches from their original dates. For current work, this SP4.1 plan and top of `STATUS.md` take precedence. No package being listed here means its artwork, code or audio is already produced.

