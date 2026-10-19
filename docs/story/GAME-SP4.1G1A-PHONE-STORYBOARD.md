# GAME-SP4.1G1A — Stephen's dying phone: storyboard and asset audit

**Status:** storyboard proposed for owner approval; no game/UI art change authorised yet.

**Baseline:** G2A merge `d99b474a688c2116d449285f9a65c1d0654693e9`. Scope is the existing final-message scene across the three mutually exclusive Chapter 2 routes, ending immediately before G1B's separate illustrated "Back in England" work.

## Actual implementation audit

- The existing end-of-route state machine is `holidayPhase === "final-message"` with `finalStep` 0, 1 and 2. `continueRouteHandoff()` sets 0, and `advanceFinalMessage()` advances 0→1→2→rescue-alarm. The same steps are persisted/resumed in save V3. **Do not add steps or migrate saves.**
- `src/china-data.js` owns three canonical, incomplete messages:
  - `cult` (Summit): **This place is unreal. They've asked me to be their...**
  - `detention` (Forbidden City banquet): **I've just been introduced as the official...**
  - `reassemble` (Night Market spa): **This spa is incredible. They're taking my entire...**
- The shared `chinaFinalPhone` currently looks like a wide rectangular notice, not a physical phone. On finalStep 0 the small inline label says `1% battery`; on step 1 it changes to `0% · Battery depleted` but the display **remains on**, while `chinaFinalReaction` overlays it. Result: no convincing phone shutdown.
- Stephen's owner-approved dialogue **“Oh, for fuck's sake.”** is `china.final.001` at finalStep 1, with its existing optional voice and fallback. Preserve the exact text, cue ID and beat.
- The existing `chinaFinalEngland` step 2 and spoken `backEngland` transition are out of scope for this package's painting; G1B is the separate artwork work package.
- The old project CSS already includes a reusable comic-illustrated phone silhouette (`.cutaway-phone`, `.phone-notch`, `.phone-screen`) from the earlier opening proof. We can share its **design vocabulary**, not copy an entire obsolete cutaway scene or depend on unrelated CSS selectors. `chinaFinalPhone` already has reusable live elements `chinaBatteryLabel`, `chinaPhoneMessage`, `chinaPhoneStatus`.

## Proposed 3-frame storyboard (same for all three routes)

### Frame 1 — “About to send” (existing finalStep 0)

- Existing illustrated destination background, with **one large, recognisable smartphone in portrait orientation** centred towards the right. Dark navy comic bezel, earpiece/notch and luminous screen, consistent with approved game palette.
- Screen heading: existing **STEPHEN RESCUE GROUP**.
- Screen text: **the actual route-specific unfinished message** from `messageByRoute`, as live, selectable, accessible HTML text. No screenshots of text and no new chat messages.
- Prominent red battery glyph, red **1%** marker and clear non-dialogue warning **LOW BATTERY** high on the phone; `chinaPhoneStatus` still says **Sending…**.
- Preserve Stephen's background/portrait if he is present in the existing stage; don't create a second portrait. Preserve narrator and top control bar.
- Player sees both what Stephen typed *and* why it probably will not send.

### Frame 2 — “Dead phone” and Stephen's existing reaction (existing finalStep 1)

- Pressing Continue, or existing autoplay advancing, makes the **same phone** visibly power down. Phone screen goes almost-black, screen content and sending animation disappear; bezel/earpiece/reflective sheen remain, so it reads unmistakably as a *switched-off phone*, not a missing UI.
- An external, high-contrast comic status ribbon outside the dead screen communicates **0% · BATTERY FLAT** and **MESSAGE NOT SENT**. Use `aria-live` for the status; expose route context for screen-reader users without leaving visible messages on a supposedly powered-off display.
- Place the existing **STEPHEN: “Oh, for fuck's sake.”** speech overlay away from the phone/glow and navigation, preserving its exact recorded cue at finalStep 1.
- No generic “signal lost” mystery, no fabricated chat bubbles, and no extra voice or animation dependency. A short power-down transition is optional, but must respect reduced motion and be instantly complete after navigation/resume.

### Frame 3 — “Back in England” (existing finalStep 2)

- Existing England handoff with its established narrator cue and Continue to the real David/Paul alarm; G1B will add approved art to this step separately.
- The phone is hidden, with no retained battery or message overlay. Route choice and saved game remain unchanged.

## Asset count and implementation plan after owner storyboard sign-off

**Recommended new image files: ZERO.** Build the visual handset from lightweight CSS and existing text elements, reusing the pre-existing comic phone framing as a design reference. A single reusable phone for all three routes is more reliable and accessible than three rendered screenshots. If the owner specifically wants a more painted handset, request **one** reusable transparent illustrated shell for separate approval; never burn route messages into pixels. No owner reference art is required for the phone UI.

- Implement state via `#chinaFinalPhone[data-power="low"|"off"]` or an equivalent **derived from existing finalStep**; do not introduce persistent state.
- Preserve `finalStep` 0/1/2, IDs, saved-state and `china.final.001` sound cue, voice auto-advance, Next, Pause, contextual Skip, replay, and navigation.
- On resumed finalStep 1, the screen must already be off; don't replay a misleading power-on frame.
- On route switch, render `messageByRoute[route]` only; no stale previous message.
- Fit the phone to 1366×768 desktop and narrow portrait devices, ensure full text and battery marker fit, and keep a separate, readable Stephen speech bubble, narrator subtitle and controls.

## Visual and functional acceptance

1. Owner approves this storyboard and **zero-raster-asset** approach (or requests one painted phone-shell illustration) **before art/code visual design is locked**.
2. Draft PR working preview: all 3 routes show exactly their existing incomplete message plus RED 1%, then a screen that *actually goes dark* with **MESSAGE NOT SENT**, then Stephen's existing reaction, then England.
3. Test Sound On/Off, voice missing/fails, Pause/Continue, Next/Skip, Save/Resume at all three `finalStep` values, switch endings, real rescue-alarm transition, desktop/tablet/mobile widths, reduced motion and readable live regions.
4. Owner separately approves the rendered preview before merge. Do not expand this package into G1B's England painting.

## Explicit non-goals

No additional dialogue or route, no re-illustration of Stephen, no extra narrative step, no version migration, no duplicate battery artwork per route, no invented messages or new voice audio, and no England illustration (G1B).
