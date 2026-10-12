# Art direction

**Status:** Stephen, David and Paul reference sheets human-approved under SP-WP1.1. The fictional boyfriend's design is deferred until story work requires it.

## Visual language
Use a bold, slightly worn comic-poster / graphic-novel illustration approach compatible with Berserk Llama Syndrome's existing album covers: expressive faces, thick illustrated linework, textured print/halftone shading, vibrant warm accents and purposeful exaggeration.

For the playable game, prefer simplified, readable versions of these forms, optimised for desktop and tablet. Don't make every scene an overloaded full album-cover collage.

## Canonical Stephen reference
- `public/assets/generated/characters/stephen-martin-baseline.webp`
- `generated-assets/manifests/character-stephen-martin-baseline.json`
- Original is staged in Google Drive under `stephen-martin-character-baseline-v01.png`.

Preserve the approved side-parted fair/light-brown hair, neat facial stubble, expressive brows, blue quarter-zip top, overall silhouette and slightly sceptical comic expressions. Multiple character portraits should remain recognisably the same man.

## Canonical David reference
- `public/assets/generated/characters/david-baseline.webp`
- `generated-assets/manifests/character-david-baseline.json`
- Original is staged in Google Drive as `david-character-baseline-v01.png` (Drive ID `1DJLH4ni0z81_SMrslKx99z_U2agTm8vS`).

Preserve David's tall (6 ft 2 in) silhouette, bald head, blue eyes and short auburn/dark ginger beard. The approved comic reference wears a charcoal hoodie/jacket, olive-green T-shirt, blue jeans and casual trainers. Maintain the comic sheet's consistent facial shape, expressive brows and characteristic mixture of misplaced confidence, suspicion and frustration across future illustrations.

## Canonical Paul reference
- `public/assets/generated/characters/paul-baseline.webp`
- `generated-assets/manifests/character-paul-baseline.json`
- Original PNG in Google Drive: `paul-character-baseline-v01.png` (ID `1J-_Zxy7U7VGAnUS9S3L7CAAR54KNaSYk`).

Preserve his approximately 5 ft 10 in stocky/heavier silhouette, bald crown with short side/back hair stubble, **no facial hair**, glasses and characteristic white polo shirt. In the approved reference he also wears blue jeans and casual trainers. His neutral or vaguely confused face is the most important expression; others include bewilderment, mild concern, hands-on-head stress and palms-up uncertainty. Do not inadvertently revert to the rejected earlier design that gave him beard stubble or a smug expression.

## GAME-SP1.1 approved expression sheets (12 October 2026)

These are **human-approved composite expression masters**, using the established comic character styles. All three masters have now been split into 18 optimised, individually sourced and materialised runtime portraits under `public/assets/generated/characters/expressions/`.

- **Stephen:** `public/assets/generated/characters/stephen-expressions-sheet-v01.webp` (manifest `generated-assets/manifests/character-stephen-expressions-v01.json`). Original Google Drive source: `stephen-expressions-v01.png` (ID `1ds0NaYTXQl2c-mQFgeJ6YZt0Lv8VFVZW`). Six reactions: neutral, amused, laughing, confused, annoyed, exasperated.
- **David:** `public/assets/generated/characters/david-expressions-sheet-v01.webp` (manifest `generated-assets/manifests/character-david-expressions-v01.json`). Original Google Drive source: `david-expressions-v01.png` (ID `1ucx1v3v3bPPD4FX7CML6gIntgxvZs-z6`). Six reactions: neutral, confident, serious, frustrated, shocked, systems expert.
- **Paul:** `public/assets/generated/characters/paul-expressions-sheet-v01.webp` (manifest `generated-assets/manifests/paul-expressions-v01.json`). Original Google Drive source: `paul-expressions-v01.png`. Six reactions: neutral, confused, concerned, blank, pleased, missing the point. Its 2-by-3 sheet layout differs from the others, but the owner explicitly accepted this as production-ready after splitting.
- Each of the 18 runtime files is named `<character>-<expression>.webp` and stored under `public/assets/generated/characters/expressions/`. Every source WebP lives in the approved Drive staging folder with an individual provenance manifest in `generated-assets/manifests/`.
- **Next implementation:** wire `src/reactions.js` cues to these assets in `src/game.js`, then visually inspect transitions in the Cloudflare preview. The portraits have been committed to the development PR but are not yet switched on in the actual cutscene.

## Production conventions
- David's and Paul's character and expression sheets are approved. Keep their proportions and demeanours distinct.
- Reuse approved character designs across game, music and comic.
- Keep text and dialogue editable in the final medium; don't rely on generated illustrations for long accurately spelt dialogue.
- Source images in Google Drive, approved optimised WebP in GitHub; manifest and revision ensure provenance.
- Character sheet approvals are a human gate. Verify the actual file pixels instead of an unrelated placeholder or illustrative thumbnail.

## Pending design choices
Fictional boyfriend design; scene dimensions, character sprite treatment and comic panel typography are to be scoped with the relevant work package.
