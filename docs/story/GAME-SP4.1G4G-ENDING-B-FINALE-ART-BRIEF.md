# GAME-SP4.1G4G — Ending B “Detained by the Administration” finale artwork

**Status:** actual image owner-approved; integrated on draft branch and pending Cloudflare/laptop/mobile visual QA. **Base:** merged G4D–G4F PR #82 (`7cdf0af`). **Non-goal:** no additional transitions (G4C deferred), no new puzzle, no script or voice change.

## Canonical final joke and visual proposal

The existing last Ending B narrator line: “David proudly frames his government-issued PLEASE LEAVE certificate.” The single illustrated pay-off should make this genuinely funny rather than presenting a generic detention cell or a new chase. A wide, polished comic-illustration finale:

- **David:** tall, bald, short ginger beard, charcoal hoodie/jacket over olive-green T-shirt; ceremonially delighted to hold up an ornate framed “APPROVED — ALL OF YOU PLEASE LEAVE” certificate as though it were an extraordinary diplomatic achievement. Centre-left protagonist of this joke.
- **Stephen:** approved blue quarter-zip, sandy brown side-parted hair and short stubble; totally unimpressed/sceptical expression, phone in hand; emphatically not a frightened captive.
- **Paul:** stocky, bald crown/short side hair, glasses, clean-shaven, white polo; mild bewilderment, beside an open/overstuffed travel suitcase with the absurd office printer barely concealed and a few loose paper sheets.
- **Fictional Official:** approved black-haired, bespectacled blue-and-gold formal suit, dispassionately ushering the group towards an exit. No direct real-world emblems, government institutions, national insignia or photographs.
- **Setting:** the same invented warm, ornate “Office of Ceremonial Misunderstandings” bureaucracy as the approved Ending B lobby art. Comedic gold-and-blue administrative opulence, excessive document folders and velvet queue ropes. Late-afternoon friendly lighting, not a gloomy prison.
- **Framing:** full-bleed, single coherent scene at **1672 × 941 (16:9)**, same detailed high-contrast graphic-novel/poster style as Ending A's owner-approved `ending-a-finale-stephen-crowned-wink-v01.webp`. Character identity matches the owner-approved existing sprite artwork; no new or off-model faces. Keep key faces/action mainly left and middle, **upper-right ≈35% safe** for two music album cards, and **lower ≈28%** safe for separate live end title and summary. Do not place essential faces or certificate in these UI zones.
- **Artwork typography:** do **not** bake “ENDING B”, title, subtitles, dialogue or album covers into artwork. A short “PLEASE LEAVE” on David's framed certificate is permissible if legible, but live UI handles all narrative copy.

## Existing game integration after owner art acceptance

1. Stage the approved source in project Google Drive as `ending-b-finale-please-leave-certificate-v01.png`, retain source file ID.
2. Add `generated-assets/manifests/game-sp41g4g-ending-b-finale-certificate-v01.json` with validated Drive fileId and target `public/assets/generated/locations/ending-b-finale-please-leave-certificate-v01.webp`, max 1672×941, quality 88.
3. Confirm materialisation/inspection of the actual image, add to build asset checks and preserve the existing common G3F final-menu layout/album links, keyboard and chapter-jump controls.
4. Scope background solely to `#rescueEndingSummary[data-route="detention"]`; assign the true route as a dataset value without breaking Ending A `cult` or Ending C `reassemble` styling.
5. Keep existing `rescueSummaryHeading` and `rescueSummaryMessage` as accessible live text. Replace the obsolete “new illustrations are deferred” ending-B disclaimer with completed-ending copy. Leave spoken Ending B script and music links untouched.
6. Draft PR only; verify GitHub CI, real Cloudflare preview, 1366×768 laptop, tablet/mobile responsive layout, title/album overlap, save/resume and correct A/B/C routing before owner-approved merge.

**Art approval gate:** Owner explicitly approved the final image after matching the existing official and actual ceremonial release permit, with the cast exiting into the street. The asset and responsive album layout must still be reviewed in a deployed build before merging PR #83. GitHub asset manifest points to approved original source in generated-asset staging.
