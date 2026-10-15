# GAME-SP4.0B — Summit entrance cast and bottom-dialogue presentation

**Date:** 15 October 2026
**Branch:** `agent/game-sp40a-summit-visual-proof` (draft PR #33, based on SP3.4 main)
**Owner state:** Three revised sprites approved for integration; final *in-engine* visual/scale approval outstanding.

## Approved scene design

The Summit entrance must play as a **character scene**, like the Visitor Information lobby, with its approved exterior background clearly visible. Do **not** obscure the entire background with a giant centre briefing panel. David, Paul and the gatekeeper are independent transparent full-body sprites, in deliberately different poses from their hotel equivalents. The gatekeeper is an Asian adult male doorman in an extravagant fictional dark-and-gold lodge uniform.

A familiar, editable **bottom dialogue box** holds each of the existing seven route-introduction lines and speaker label. Dialogue retains SP3.4 automatic pacing and the same top-right Pause/Next/Change route/Menu controls. The current line's speaker gets a small static light/glow cue; sprites do not jump between lines. At the end of the seventh line, the normal handoff moves to the centred **blue Admissions Test panel**, retaining its answer cards, hints, save/resume and route locking. No dialogue was rewritten and no new voice files were generated.

## Assets / provenance

The owner approved the revised standalone PNG cutouts; each is stored in the existing dedicated Google Drive staging folder and materialised via the standard generated-asset OIDC workflow, maintaining alpha transparency.

| Character | Drive original | Manifest | Output |
|---|---|---|---|
| David, assertively gesturing with phone | `summit-entrance-david-speaking-v01.png` (`1paeX1lW4vxIL12V9jow_acAG7IPjd6AB`) | `generated-assets/manifests/game-sp40b-summit-david-speaking-v01.json` | `public/assets/generated/characters/summit-david-speaking-v01.webp` |
| Paul, wary half-shrug and raised hand | `summit-entrance-paul-wary-v01.png` (`1OXQBHmHoSgJSAVxFKA2-0uaDwCVuZuc-`) | `generated-assets/manifests/game-sp40b-summit-paul-wary-v01.json` | `public/assets/generated/characters/summit-paul-wary-v01.webp` |
| Asian Summit gatekeeper, open gloved hand | `summit-entrance-gatekeeper-v01.png` (`1b8WoS9QQ2gWjbSK5Z2GNYsq7iF5gZnZ6`) | `generated-assets/manifests/game-sp40b-summit-gatekeeper-v01.json` | `public/assets/generated/characters/summit-gatekeeper-v01.webp` |

The browser sources only the derived WebPs and the independently approved `summit-entrance-v01.webp` background; no raw PNGs are committed to GitHub. The build explicitly includes all three characters and checks WebP alpha. Tests guard the character set, cast/route isolation, seven spoken lines and transition to the Admissions Test.

## Staging

- The Summit intro's existing `#rescueRouteIntro` uses `data-route="cult"` to select the approved exterior, layer the three actors and reposition the existing HTML `#routeIntroDialogue` to the bottom. Speaker-specific `data-speaker` styling provides subtle highlighting.
- For other destinations, the existing central introduction panel remains unchanged, with the Summit cast completely hidden.
- `#summitAdmissions` remains the **central blue quiz panel** over the same exterior background, but the character-sprite stage is *not* shared with the quiz. This avoids competing with the three cards.
- The Summit throne-room finale, hotel cast and all detention/spa scenes remain untouched. A separate interior artwork package will be prepared later.

## Review checklist before merging

1. Play the Summit from the hotel deduction. See David left, Paul near the centre and the gatekeeper right, with believable scale and grounded feet.
2. Confirm the bottom caption speaks all seven lines with the right speaker, leaves the figures and entrance visible, and does not overlap the persistent top-right controls.
3. Let autoplay reach the Admissions Test; confirm the familiar central blue quiz appears and its three choices still require player input.
4. Check desktop and tablet widths plus a narrow/mobile crop for dialogue contrast, sprite overlap, scaling and foot placement.
5. Replay/Change route and verify no Summit people are shown in the paperwork or spa route intros. Confirm restore from a briefing save.
6. Run full GitHub smoke/build and verify Cloudflare branch preview. Keep PR #33 draft until owner visual approval; **do not merge without that explicit instruction**.
