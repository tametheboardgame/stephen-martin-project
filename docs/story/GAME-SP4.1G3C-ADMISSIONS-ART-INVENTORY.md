# GAME-SP4.1G3C: The Summit illustrated answer assets

**Status (20 October 2026):** The three-choice layout, including the laptop-height compact adjustment, is visually approved by the owner. This revised generation specification replaces the earlier 3×3 runtime atlas proposal. Nine independent transparent image assets are approved as the *production approach*; **individual rendered artwork still requires owner's visual approval before materialisation or merge**.

**Development:** `agent/game-sp41g3c-summit-admissions-illustrated-choices`, draft PR #72. Baseline for G3C was G3A/G3B merge `b8501c0`. Meanwhile `main` has received separate Ending B voice work; reconcile both branches before the eventual G3C merge.

## Decision: nine individual transparent cutouts, not a nine-cell runtime atlas

The approved shallow card layout needs immediately legible, independent images with minimal detail. Create **nine separate transparent PNG masters**, materialised into **nine separate alpha-preserving WebP game assets**. One optional contact sheet may be assembled **for review only**, not used by the runtime. Do not attempt to crop individual images from a combined atlas in the game.

Each icon occupies the existing `summitChoiceArt0/1/2` illustration well, with the original live answer label beside/below it:
- Original desktop art well: approximately **92px high**.
- Shorter laptop art well: approximately **69px high** (approved no-unnecessary-scroll layout).
- Tablet art well: approximately **64px high**.
- Phone art well: approximately **55px high**.

The rendered object must remain clear at **55px**; avoid concepts that depend on details visible only in the original master.

## Global production rules

- **Source canvas:** square 1024×1024 transparent-background PNG per icon; keep a consistent drawing scale. Target approximately **70–80% of the safe canvas** for the primary silhouette. For naturally wide objects, favour a visually chunky near-square composition over a long, thin, unreadable horizontal strip.
- **Runtime:** small WebP with verified alpha, cropped only to a consistent transparent canvas without slicing shadows or contours. Use `object-fit: contain`; centre each illustration and prevent it from enlarging the card or forcing scrollbars.
- **Style:** bold comic-poster / graphic-novel pictogram compatible with `docs/ART-DIRECTION.md`. Thick clean contours, simple warm gold and deep navy palette with restrained complementary accents, limited halftone shading, high contrast, strong shape recognition, similar weight across all nine icons.
- **One dominant object or compact symbolic grouping per icon**, no mini-scenes or human character portraits. Small supporting details only where essential to tell two concepts apart.
- **No baked-in text**, labels, stamps, letters, numbers, watermarks, canvas backdrops, inset panel borders, thumbnail/card frames, correctness badges or green/red success coding. The *game* supplies the parchment/gold frame and the accessible live wording.
- Keep each option equally polished and visually prominent. Do **not** cue the correct option through colour, framing, scale, lighting or composition.
- Maintain consistent orientation, margin, outline strength and export size, even if generated individually.

## Nine-asset generation list and unambiguous mappings

All nine canon choices and recorded voice/dialogue remain unchanged. `artSlot` values already exist in `src/summit-data.js` and should map to these exact destinations once the icons are approved.

### Round 1: Offer a sacred object

1. **A1 · `vase` · Golden ceremonial vase**
   - Visual: large ornate golden two-handled ritual urn, simple strong silhouette, no writing.
   - Source: `summit-choice-vase-cutout-v01.png`
   - Runtime: `public/assets/generated/game/summit-choice-vase-cutout-v01.webp`
2. **A2 · `ticket` · Airline ticket**
   - Visual: obvious angled airline boarding pass with a large plane pictogram and perforation, no real text or airline branding.
   - Source: `summit-choice-airline-ticket-cutout-v01.png`
   - Runtime: `public/assets/generated/game/summit-choice-airline-ticket-cutout-v01.webp`
3. **A3 · `charger` · Phone charger**
   - Visual: chunky phone-charger block with an unmistakable cable loop and USB/phone connector. Prefer strong plug/cable silhouette, not a whole phone.
   - Source: `summit-choice-phone-charger-cutout-v01.png`
   - Runtime: `public/assets/generated/game/summit-choice-phone-charger-cutout-v01.webp`

### Round 2: Recite the highest compliment

4. **B1 · `spreadsheet` · Your spreadsheet is compliant**
   - Visual: bold clipped spreadsheet grid with oversized tick/checkmark; no readable cells or tiny lettering.
   - Source: `summit-choice-spreadsheet-cutout-v01.png`
   - Runtime: `public/assets/generated/game/summit-choice-spreadsheet-cutout-v01.webp`
5. **B2 · `legs` · Great legs, your magnificence**
   - Visual: exaggerated, proud pair of sharply trousered legs in stylish smart shoes; no torso or recognisable person.
   - Source: `summit-choice-legs-cutout-v01.png`
   - Runtime: `public/assets/generated/game/summit-choice-legs-cutout-v01.webp`
6. **B3 · `ticket` · I'm here to raise a ticket**
   - Visual: upright IT service/helpdesk request slip with oversized headset or spanner symbol, clearly *not* the A2 boarding pass.
   - Source: `summit-choice-it-ticket-cutout-v01.png`
   - Runtime: `public/assets/generated/game/summit-choice-it-ticket-cutout-v01.webp`

### Round 3: Declare your intention

7. **C1 · `rescue` · I am here to rescue Stephen**
   - Visual: chunky rescue lifebuoy and coiled rope, rescue symbolism only, **no Stephen portrait**.
   - Source: `summit-choice-rescue-kit-cutout-v01.png`
   - Runtime: `public/assets/generated/game/summit-choice-rescue-kit-cutout-v01.webp`
8. **C2 · `join` · I wish to join the club**
   - Visual: simple official-looking fictional gold-crested membership card or emblem pass, with no invented small-print text.
   - Source: `summit-choice-membership-card-cutout-v01.png`
   - Runtime: `public/assets/generated/game/summit-choice-membership-card-cutout-v01.webp`
9. **C3 · `flight` · I bring news of the return flight**
   - Visual: a compact departures/return-flight notice board paired with a large clock and curved returning plane symbol; clearly different from the A2 boarding pass, no lettering.
   - Source: `summit-choice-return-flight-cutout-v01.png`
   - Runtime: `public/assets/generated/game/summit-choice-return-flight-cutout-v01.webp`

**Critical disambiguation:** airline *boarding pass* (A2) vs upright *IT service ticket* (B3) vs *return-flight information and clock* (C3). Do not reuse or recolour the same ticket silhouette. C1 is rescue gear rather than a person.

## Generation order and review gates

1. Phone charger (A3).
2. Airline ticket (A2).
3. IT support ticket (B3).
4. Return flight notice (C3).
5. Golden ceremonial vase (A1).
6. Compliant spreadsheet (B1).
7. Magnificent legs (B2).
8. Membership card (C2).
9. Rescue kit (C1).

Approve/revise each image against this brief before staging it. The optional review-only contact sheet can be built from the nine **approved** icons, and is not required as a game asset.

## Source staging, integration and QA

- Upload each **approved transparent PNG master** to the established Stephen Martin Google Drive staging folder, rather than committing original generated images to Git.
- Create one versioned `generated-assets/manifests/` record per approved image, mapping the exact Drive filename and file ID to its corresponding `public/assets/generated/game/` WebP. Use the existing OIDC materialisation workflow described in `docs/GENERATED-ASSET-PIPELINE.md`; no long-lived keys.
- Confirm each WebP retains transparent alpha, is readable at 55px and does not overflow or distort its slot. Do not materialise preview mock-ups or unapproved originals.
- Replace each provisional `ART PENDING` slot with the corresponding separate WebP image; keep artwork decorative (`aria-hidden` and empty image alt text), with **the existing full live answer label** as the accessible button name.
- Keep unchanged all three rounds, all nine canonical labels and IDs, correct-answer ordering, feedback, Paul hints, recorded voices, Save/Resume, game state and touch/keyboard operation.
- Verify three original card columns on desktop, compact no-unnecessary-scroll layout on laptop (including ~1366×768), and stacked horizontal cards on tablet and phone. Check text and art remain readable without clipping, overlap or accidental extra scrolling.
- Check current `main` and recent Ending B changes before merging the draft PR. Run full appropriate tests and confirm a deployed Cloudflare preview from the exact final head, followed by owner visual sign-off.

**Non-goals:** a new mini-game, a new clue mechanic, new dialogue, unrelated background artwork, runtime sprite-sheet slicing, additional dependencies, or publication of unapproved assets.
