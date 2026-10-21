# GAME-SP4.1G3G — Regression sign-off

Baseline: main `4fec10b` (approved G3F). Work branch: `agent/game-sp41g3g-regression`.

Automated: complete actual puzzles and endings A/B/C; test five chapter destinations each; replay, save/resume, no pre-solved puzzle flags, six album links, responsive CSS and keyboard focus contracts.

Manual owner review on desktop (1440×900), laptop (1366×768), tablet (768×1024), mobile (390×844):

1. Play each complete route, attempt an incorrect answer then solve normally, and check character and narrator audio, Pause/Next/Sound/Skip.
2. Check position and speech overlays in throne, detention and spa scenes; confirm each ending's specific title and artwork, then the common album hub.
3. Test album covers and three listening destinations per album; keyboard focus and correct window behaviour.
4. Test all five chapter jumps, including a fresh unsolved puzzle when returning to the route briefing; resume/reload at each checkpoint.
5. Check reduced motion, small-screen scrolling and any overlap between the upper-right albums, lower-wide caption, top toolbar and bottom actions.
6. Measure a normal first playthrough against the planned 15–25-minute pacing.

Do not merge before green GitHub smoke/Cloudflare deployment and owner acceptance. Follow-on Ending B visual/art changes are G4.
