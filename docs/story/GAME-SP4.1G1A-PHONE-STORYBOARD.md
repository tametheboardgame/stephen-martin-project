# GAME-SP4.1G1A — Stephen's dying phone: revised storyboard and art audit

**Status:** owner-approved phone-shell artwork integrated on draft PR #65; awaiting deployed visual review before merge (19 October 2026).

**Baseline:** G2A approved merge `d99b474a688c2116d449285f9a65c1d0654693e9`. Scope is the existing 3-step phone-to-England sequence across all three Chapter 2 routes. G1B's England illustration is a separate package.

## Canonical story rule: the incomplete message WAS received

**Important owner correction:** David and Paul **receive and subsequently read the partial message** during the Chapter 3 rescue alarm (and the shared hotel investigation). A phone-screen notice saying **"MESSAGE NOT SENT"** is categorically incorrect. The phone dies **after the partial message has reached the group**, preventing Stephen from finishing his thought or sending any further explanation. David and Paul mistake the ominous-looking fragment and Stephen's subsequent silence for an international incident.

- `rescueAlarmPhoneText` and the hotel phone evidence already read `chinaFinal.messageByRoute[route]`. Do not alter their content or remove them.
- `src/china-data.js` remains the single source for all three exact, canonical incomplete messages:
  - `cult` / Summit: **This place is unreal. They've asked me to be their...**
  - `detention` / Forbidden City banquet: **I've just been introduced as the official...**
  - `reassemble` / spa: **This spa is incredible. They're taking my entire...**
- Existing code at finalStep 1 says **"Message interrupted — not delivered"**, and finalStep 0 says **"Sending…"**. Both must be replaced during the G1A implementation so the visual/accessible status correctly communicates that the **partial message was delivered** and the battery cut off **further** contact. Existing recipient scenes must continue to show the fragment.
- Stephen's approved line **"Oh, for fuck's sake."** remains `china.final.001` with its existing timing and voice, at finalStep 1. The existing narrator says the battery was mistaken for an incident; preserve that.
- Don't write new chats, add messages or change the unfinished fragment to a complete message.

## Legacy phone artwork and why it must NOT return

**Second owner correction:** The CSS classes `.cutaway-phone`, `.phone-notch` and `.phone-screen` are **vestiges of an early intro proof that the team stopped using**. The current `src/game.js` and `index.html` do not instantiate those classes. They should **not be reused, resurrected, or presented as the approved visual language for G1A**.

The opening now uses **separately owner-approved illustration assets**, with different purpose and context:
- `public/assets/generated/game/office-phone-group-chat-cutaway-v01.webp` for `office.v05`;
- `public/assets/generated/game/office-phone-group-muted-cutaway-v01.webp` for `office.v09`.

**Do not reuse these two opening phone paintings as G1A art either**: they already depict specific group-creation and muted notifications, not Stephen's final battery failure. Leave Chapter 1 cutaways unchanged. Existing generic `chinaFinalPhone` HTML is a wide text panel rather than an accepted final-art handset.

**Revised art recommendation:** Design **one NEW purpose-built, independently owner-approved transparent phone-shell image**, portrait oriented, comic-painted to match the current game. It must be empty of message text, battery numerals and screen-state lettering, which remain live, accessible, route-specific HTML. Then overlay screen content and a reusable dark/power-off state in this one G1A scene. If CSS must supply glass/reflection/low battery warning, use **new G1A-scoped selectors**, not the abandoned intro classes. No new images should be generated before a separate owner visual approval of the planned appearance.

## Revised three-frame storyboard (all three routes, existing saves/steps)

### Frame 1 — Message RECEIVED, low battery (existing finalStep 0)

- Place the **new dedicated illustrated smartphone shell** in front of the approved existing destination background. Screen shows **STEPHEN RESCUE GROUP**, the route-specific *partial* message from `messageByRoute`, and a legible successful-delivery status such as **"PARTIAL MESSAGE SENT"** or **"Sent to rescue group"**.
- The same screen also shows **prominent red 1% · LOW BATTERY**, with a recognisable low-charge glyph. Make clear that the fragment has already reached David and Paul, and Stephen cannot continue.
- Keep the actual typed message as selectable live HTML, never baked into an image. Only one reusable phone-screen implementation is needed for three routes.
- Keep the existing stage, top controls, subtitle and existing actor composition untouched.

### Frame 2 — Phone powered off, Stephen reacts (existing finalStep 1)

- Press Continue / existing autoplay to **visibly power down the same handset**. The actual display turns black, with the distinct physical shell visible; no ghost messages glowing beneath it.
- An **external** caption or simple battery warning reads **"0% · PHONE SWITCHED OFF"** or **"BATTERY FLAT"**. It must **never** say "Message not sent", "Message failed", "Delivery failed" or imply that the already-received fragment disappeared. Where useful for accessibility, the status can clarify **"Last partial message delivered; phone now off."**
- Stephen delivers the **existing** line **"Oh, for fuck's sake."**, still at its existing beat and with the same audio asset. Place the speech bubble where it does not obscure the phone and controls.
- Optional brief display-blackout transition, instant on resume/reduced motion. No new voice or sound dependency.

### Frame 3 — Back in England (existing finalStep 2)

- Hide Stephen's handset and transition to the current England narrator card; G1B will add separate approved art later.
- Chapter 3 David/Paul alarm **must still display and analyse the route-specific received fragment**. Paul's pre-existing "Could just be his battery" line is the intended ironic explanation; David's alarm remains mistaken.
- Keep the same route, saved checkpoint, and genuine rescue game transition.

## Technical constraints for the later implementation

- Existing phase `holidayPhase === "final-message"` and persisted `finalStep` 0 → 1 → 2 → rescue-alarm are unchanged: **no new step or save migration**. On reload at finalStep 1, show the dead screen directly.
- Render power state derived from `finalStep` in dedicated G1A selectors. Preserve `chinaBatteryLabel`, `chinaPhoneMessage`, `chinaPhoneStatus` IDs where feasible for established tests and accessibility. The live text can become visually hidden only during the powered-off display; it is still canonically available in England.
- All three ending routes use the same approved phone-shell art, with live route text, battery and off-state overlays. No story route/cue, narrator, Pause/Next/Skip, Sound Off, resume or three-endings functionality is changed.
- Test 1366×768, tablet and portrait phone for full message readability and correct separation from Stephen's speech, chapter controls and subtitles.
- The old intro CSS proof (`.cutaway-phone` etc.) and the approved `office-phone-group-*` WebPs are **not** implementation dependencies.

## Gates and tests

1. **This revised storyboard:** owner confirms delivered partial message and the one-*new*-shell approach.
2. **Artwork:** generate or design ONE transparent, blank-screen new handset image and obtain explicit owner approval before adding it to the playable build; stage approved original PNG in dedicated Stephen Martin Drive folder; materialise and version the optimised WebP using the project asset pipeline.
3. **Code and preview:** make 1% red and the actual sent fragment visible, then genuinely dark/off at 0%, with Stephen's recorded line and an external **battery-flat** caption. Validate all three routes still reveal that same fragment to David/Paul.
4. **Automated regression:** per-route exact received text, status never says not delivered, Sound On/Off, missing MP3, Pause/Next/Skip, Save/Resume at all three steps, leaving final scene, focus/a11y, device widths and reduced motion.
5. **Human review:** approve the rendered phone sequence and running preview separately before merge. G1B England artwork follows independently.

## Non-goals

No legacy intro-art revival, no reused group-chat/muted paintings, no new conversations, no complete messages, no extra dialogue, no changed Chapter 1 assets, no expanded gameplay, no new final steps or saving format, no new voice clips, and no G1B England illustration.

## Implementation handoff (19 October 2026)

The owner approved the purpose-made dark illustrated portrait phone. Source in Drive staging: [stephen-phone-shell-g1a-v01.png](https://drive.google.com/file/d/1ybwzoz01UyHzV0-QmqFue1Hsmf0yfe2F/view), 1088×1600 RGBA with transparent 32px margins and no baked text or battery graphics. GitHub's approved OIDC/Drive materialiser produced the versioned WebP into `public/assets/generated/game/stephen-phone-shell-g1a-v01.webp`; its manifest is `generated-assets/manifests/game-sp41g1a-phone-shell-v01.json`. Build copies only this optimised WebP, never the source PNG.

The phone now has live `chinaPhoneMessage`, `chinaBatteryLabel` and `chinaPhoneStatus` elements. `finalStep=0` gives **Partial message delivered / 1% · LOW BATTERY**; `finalStep=1` turns off the displayed screen and shows **0% · PHONE SWITCHED OFF** outside it, while the received fragment stays intact in game state and is read by David/Paul. Stephen's exact recorded reaction remains `china.final.001`. No extra scene steps or voice clips; no rejected intro phone styles or artworks are used. Owner's next gate is a visual review of the running preview, including mobile.
