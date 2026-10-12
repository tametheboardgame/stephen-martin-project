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

**Easiest way to try it:** Download the development branch archive, unzip it, and open `index.html` in a browser. No npm install, build step, online service, authentication or deployment is required.

Alternatively, with Node.js installed, run `npm start` in the repository folder and open `http://localhost:8080/`. This serves only from `127.0.0.1` on your machine and does not publish the preview. Use `npm run verify` for the small syntax and story-flow tests.

### Cloudflare Pages deployment settings

The static game is intentionally built without a third-party framework. **Use GitHub-integrated Cloudflare Pages, not Workers:**

- Project name: `stephen-martin-project`
- Production branch: `main` **after the approved game preview PR has merged**. Until then, the current game files and `npm run build` command exist **only** on the `agent/game-sp1-office-vertical-slice` branch; a first production deployment of `main` cannot build the game.
- Framework preset: **None**
- Build command: `npm run build`
- Build output directory: `dist` (no leading slash)
- Root directory: leave blank (repository root)
- No environment variables, secrets or install/build preset are required.

The build copies only `index.html`, game scripts/CSS and the three approved character WebP files to `dist/`. Do not set output to the repository root, which would also serve project planning documents and other development artefacts. Previews from PR branches are for review. Do not publish unreleased private details in project copy, metadata or screenshots; Cloudflare preview URLs may be publicly accessible unless access protection is configured.

**If you need a working Cloudflare site before merging:** temporarily set the production branch to `agent/game-sp1-office-vertical-slice` (this is a public web deployment), or wait for review and the merge to `main`. Change the production branch back to `main` when ready for normal release management.

**Controls:** Next/Back, click the dialogue box to advance, Space/Enter/right arrow advance when a button is not focused, left arrow goes back. Restart, Skip intro, Sound on/off and Resume are available. Skipping or completing the intro takes you to a clearly marked **Stephen holiday placeholder**. The actual holiday choice, rescue investigation and three mini-games are reserved for the next approved build packets.

**Story scripts and build handoff:** `docs/story/SP-WP1.2-OFFICE-OPENING.md`, `docs/story/SP-WP1.2-GAME-TREATMENT.md`, `docs/story/SP-WP1.2-IMPLEMENTATION-HANDOFF.md`.

## Immediate next work package

Human-review the GAME-SP1 office scene for dialogue rhythm, character presentation and legibility, then implement **GAME-SP2: Stephen holiday choice and shared rescue hub**. Refer to [STATUS.md](STATUS.md) for current merge/review state.
