# The Stephen Martin Project

An intentionally small adult comedy project, not a sprawling adventure: **Rescue Stephen Martin from China** is planned as a **15–25 minute playable browser game**, with three compact endings, a few absurd puzzles and 2–3 substantial mini-games.

Companion work: one comedy song in the Berserk Llama Syndrome tradition; an optional short digital comic pilot.

## Start here

- [ROADMAP.md](ROADMAP.md): **approved master plan**, work packages, priorities and hard 15–25 minute limit.
- [STATUS.md](STATUS.md): current state and next action.
- [PROJECT.md](PROJECT.md): premise and scope.
- [AGENTS.md](AGENTS.md): AI-assisted delivery and branch rules.
- [DECISIONS.md](DECISIONS.md): durable decisions.
- [Creative bible](docs/CREATIVE-BIBLE.md) and [art direction](docs/ART-DIRECTION.md): character and visual canon.
- [Generated asset pipeline](docs/GENERATED-ASSET-PIPELINE.md): Drive staging to version-controlled WebP.

## Shared workstreams

- **Canon and assets:** Stephen, David, Paul and other characters, consistent references and jokes.
- **Game:** browser-playable comedy adventure.
- **Music:** lyrics, Suno prompts, production and cover.
- **Comic:** optional illustrated pilot and possible follow-up.

Approved Stephen, David and Paul artwork lives under `public/assets/generated/characters/`. New character artwork is reviewed and materialised via Google Drive and a feature branch.

## GAME-SP1: Playable office opening preview

The approved full office dialogue and short intro are implemented as a **small static browser page**. This is only the opening scene, not the complete game. It uses the three approved character art references and an original CSS-drawn fictional office.

**Local preview:** Download the repository ZIP, unzip it, and open `index.html` in a browser. No npm install, build step, online service, authentication or deployment is required.

Alternatively, with Node.js installed, run `npm start` in the repository folder and open `http://localhost:8080/`. This serves only from `127.0.0.1` on your machine and does not publish the preview. Use `npm run verify` for the small syntax and story-flow tests.

### Cloudflare Pages deployment settings

The static game is intentionally built without a third-party framework. **Use GitHub-integrated Cloudflare Pages, not Workers:**

- Project name: `stephen-martin-project`
- Production branch: `main`, now containing GAME-SP1 and its static build script. Subsequent preview branches should have independent Cloudflare preview deployments.
- Framework preset: **None**
- Build command: `npm run build`
- Build output directory: `dist` (no leading slash)
- Root directory: leave blank (repository root)
- No environment variables, secrets or install/build preset are required.

The build copies only `index.html`, game scripts/CSS and the three approved character WebP files to `dist/`. Do not set output to the repository root, which would also serve project planning documents and other development artefacts. Previews from PR branches are for review. Do not publish unreleased private details in project copy, metadata or screenshots; Cloudflare preview URLs may be publicly accessible unless access protection is configured.

**Publishing:** The Cloudflare Pages connection builds `main` using `npm run build` and serves only the `dist/` output. Public accessibility is the default unless additional protection is set; verify the build in the Cloudflare dashboard.

**Controls:** Next/Back, click the dialogue box to advance, Space/Enter/right arrow advance when a button is not focused, left arrow goes back. Restart, Skip intro, Sound on/off and Resume are available. Skipping or completing the intro takes you to a clearly marked **Stephen holiday placeholder**. The actual holiday choice, rescue investigation and three mini-games are reserved for the next approved build packets.

**Story scripts and build handoff:** `docs/story/SP-WP1.2-OFFICE-OPENING.md`, `docs/story/SP-WP1.2-GAME-TREATMENT.md`, `docs/story/SP-WP1.2-IMPLEMENTATION-HANDOFF.md`.

## Next approved work package: GAME-SP1.1 — Opening polish pass

The hosted office preview is approved as a baseline. The next bounded feature PR adds hands-free auto-advance with a Play/Pause toggle, line timing, character-expression variants and three key comic cutaways (the risk assessment, printing bear pages, and rescue group chat). No new game scenes or mini-games are part of this pass. Fresh character expression artwork must be visually approved before becoming canon; Cloudflare production remains on `main` until the owner approves the polish PR.

## Immediate next work package

GAME-SP1 office preview was approved for merge. Collect the owner's smaller opening feedback in a follow-up PR, then implement **GAME-SP2: Stephen holiday choice and shared rescue hub**. Refer to [STATUS.md](STATUS.md) for current merge/review state.
