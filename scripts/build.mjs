import { cp, copyFile, mkdir, readFile, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist");
const files = ["index.html", "src/office-data.js", "src/reactions.js", "src/china-data.js", "src/rescue-framework.js", "src/summit-data.js", "src/detention-data.js", "src/reassemble-data.js", "src/game.js", "src/styles.css"];
const imageSource = "public/assets/generated/characters";
const images = ["stephen-martin-baseline.webp", "david-baseline.webp", "paul-baseline.webp", "stephen-office-seated-neutral-v01.webp", "stephen-office-seated-amused-v01.webp", "stephen-office-seated-confused-v01.webp", "stephen-office-seated-annoyed-v01.webp", "stephen-office-seated-exasperated-v01.webp", "stephen-office-seated-laughing-v01.webp", "david-office-seated-neutral-v01.webp", "david-office-seated-confident-v01.webp", "david-office-seated-systems-expert-v01.webp", "david-office-seated-shocked-v01.webp", "david-office-seated-frustrated-v01.webp", "david-office-seated-serious-v01.webp", "paul-office-seated-neutral-v01.webp", "paul-office-seated-confused-v01.webp", "paul-office-seated-pleased-v01.webp", "stephen-holiday-standing-neutral-v01.webp", "great-wall-summit-promoter-standing-v01.webp", "china-banquet-attendant-standing-v01.webp", "stephen-holiday-forbidden-city-pleased-v01.webp", "china-night-market-spa-representative-v01.webp", "stephen-night-market-skewer-v01.webp", "david-hotel-standing-investigator-v01.webp", "paul-hotel-standing-puzzled-v01.webp", "summit-david-speaking-v01.webp", "summit-paul-wary-v01.webp", "summit-gatekeeper-v01.webp", "summit-stephen-seated-chairman-v02.webp"];

await rm(output, { recursive: true, force: true });
await mkdir(path.join(output, "src"), { recursive: true });
await mkdir(path.join(output, imageSource), { recursive: true });

for (const relative of files) {
  await copyFile(path.join(root, relative), path.join(output, relative));
}
for (const name of images) {
  const relative = path.join(imageSource, name);
  const original = path.join(root, relative);
  const { size } = await stat(original);
  if (!size) throw new Error("Empty approved character asset: " + relative);
  await copyFile(original, path.join(output, relative));
}
// Keep public output restricted to human-approved game artwork. The expression
// folder holds precisely six selected crops for each approved main character.
const expressionDir = path.join(imageSource, "expressions");
const expectedExpressions = {
  stephen: ["neutral", "amused", "laughing", "confused", "annoyed", "exasperated"],
  david: ["neutral", "confident", "serious", "frustrated", "shocked", "systems-expert"],
  paul: ["neutral", "confused", "concerned", "blank", "pleased", "missing-the-point"]
};
const expectedNames = Object.entries(expectedExpressions).flatMap(([character, expressions]) =>
  expressions.map((expression) => character + "-" + expression + ".webp")
);
const actualNames = (await readdir(path.join(root, expressionDir))).sort();
if (actualNames.join("|") !== expectedNames.sort().join("|")) {
  throw new Error("Unexpected expression asset set; expected the 18 approved WebP portraits.");
}
await mkdir(path.join(output, expressionDir), { recursive: true });
for (const name of expectedNames) {
  const relative = path.join(expressionDir, name);
  const source = path.join(root, relative);
  if (!(await stat(source)).size) throw new Error("Empty approved expression: " + relative);
  await copyFile(source, path.join(output, relative));
}
// The background is separate from all three actors, allowing a matching
// foreground desk layer without flattening characters or interactive controls.
const officeImages = [
  "public/assets/generated/locations/office-clean-01-v01.webp",
  "public/assets/generated/locations/office-foreground-01-v01.webp",
  "public/assets/generated/locations/office-exterior-opening-v01.webp",
  "public/assets/generated/locations/chapter-two-days-later-title-v01.webp",
  "public/assets/generated/locations/china-great-wall-background-v01.webp",
  "public/assets/generated/locations/china-forbidden-city-background-v01.webp",
  "public/assets/generated/locations/china-night-market-background-v01.webp",
  "public/assets/generated/locations/china-visitor-information-lobby-background-v01.webp",
  "public/assets/generated/locations/summit-entrance-v01.webp",
  "public/assets/generated/locations/summit-throne-room-v01.webp"
];
// Fail the public preview build if the independent desk accidentally becomes an
// opaque image: a black/solid rectangle would cover all three actors.
const foregroundPath = path.join(root, "public/assets/generated/locations/office-foreground-01-v01.webp");
const foregroundHeader = (await readFile(foregroundPath)).subarray(0, 30);
if (foregroundHeader.toString("ascii", 0, 4) !== "RIFF" ||
    foregroundHeader.toString("ascii", 8, 16) !== "WEBPVP8X" ||
    (foregroundHeader[20] & 0x10) === 0) {
  throw new Error("OFFICE-FOREGROUND-01 must retain WebP alpha transparency.");
}
for (const relative of officeImages) {
  const officeSource = path.join(root, relative);
  if (!(await stat(officeSource)).size) throw new Error("Missing office layer: " + relative);
  await mkdir(path.dirname(path.join(output, relative)), { recursive: true });
  await copyFile(officeSource, path.join(output, relative));
}

// The Chapter Two background and sprite remain independently approved WebP
// assets. Refuse accidental opaque travel sprites or incorrectly sized art.
const holidaySprite = await readFile(path.join(root, imageSource, "stephen-holiday-standing-neutral-v01.webp"));
if (holidaySprite.toString("ascii", 0, 4) !== "RIFF" ||
    holidaySprite.toString("ascii", 12, 16) !== "VP8X" ||
    (holidaySprite[20] & 0x10) === 0) {
  throw new Error("Approved Stephen travel sprite must preserve alpha transparency.");
}
const promoterSprite = await readFile(path.join(root, imageSource, "great-wall-summit-promoter-standing-v01.webp"));
if (promoterSprite.toString("ascii", 0, 4) !== "RIFF" ||
    promoterSprite.toString("ascii", 12, 16) !== "VP8X" ||
    (promoterSprite[20] & 0x10) === 0) {
  throw new Error("Approved Summit promoter sprite must preserve alpha transparency.");
}
for (const name of ["china-banquet-attendant-standing-v01.webp", "stephen-holiday-forbidden-city-pleased-v01.webp", "china-night-market-spa-representative-v01.webp", "stephen-night-market-skewer-v01.webp"]) {
  const cutout = await readFile(path.join(root, imageSource, name));
  if (cutout.toString("ascii", 0, 4) !== "RIFF" ||
      cutout.toString("ascii", 12, 16) !== "VP8X" ||
      (cutout[20] & 0x10) === 0) {
    throw new Error("Approved Forbidden City sprite lost WebP transparency: " + name);
  }
}
for (const file of ["chapter-two-days-later-title-v01.webp", "china-great-wall-background-v01.webp", "china-forbidden-city-background-v01.webp", "china-night-market-background-v01.webp"]) {
  const data = await readFile(path.join(root, "public/assets/generated/locations", file));
  if (data.toString("ascii", 0, 4) !== "RIFF" || data.toString("ascii", 8, 12) !== "WEBP") {
    throw new Error("Invalid approved Chapter Two background: " + file);
  }
}

// The approved hotel cast must remain two *independent transparent sprites*,
// not full-scene screenshots or opaque images that obscure the empty lobby.
for (const name of ["david-hotel-standing-investigator-v01.webp", "paul-hotel-standing-puzzled-v01.webp"]) {
  const sprite = await readFile(path.join(root, imageSource, name));
  if (sprite.toString("ascii", 0, 4) !== "RIFF" ||
      sprite.toString("ascii", 12, 16) !== "VP8X" ||
      (sprite[20] & 0x10) === 0) {
    throw new Error("Approved hotel actor must preserve WebP alpha transparency: " + name);
  }
}

// The approved Summit trio must be independent, alpha-preserving characters,
// never opaque pictures or flattened entrance composites.
for (const name of ["summit-david-speaking-v01.webp", "summit-paul-wary-v01.webp", "summit-gatekeeper-v01.webp"]) {
  const sprite = await readFile(path.join(root, imageSource, name));
  if (sprite.toString("ascii", 0, 4) !== "RIFF" ||
      sprite.toString("ascii", 12, 16) !== "VP8X" ||
      (sprite[20] & 0x10) === 0) {
    throw new Error("Approved Summit actor must preserve WebP alpha transparency: " + name);
  }
}

// Ending A uses one approved transparent seated Stephen cutout, not a
// composite or another chair. Reject opaque outputs from the source pipeline.
const seatedStephen = await readFile(path.join(root, imageSource, "summit-stephen-seated-chairman-v02.webp"));
if (seatedStephen.toString("ascii", 0, 4) !== "RIFF" ||
    seatedStephen.toString("ascii", 12, 16) !== "VP8X" ||
    (seatedStephen[20] & 0x10) === 0) {
  throw new Error("Approved seated Stephen must preserve WebP alpha transparency.");
}

// Voice files are supplied independently via GitHub's Upload files UI. The
// canonical screenplay itself defines the permitted filenames, so uploading
// 55 MP3s never requires hand-editing a manifest or changing application code.
const audioSource = "public/assets/audio/dialogue";
const audioFolder = path.join(root, audioSource);
const voiceSandbox = { window: {} };
vm.runInNewContext(await readFile(path.join(root, "src/office-data.js"), "utf8"), voiceSandbox);
const spokenBeats = voiceSandbox.window.SMP_OFFICE_SHOTS.flatMap(shot => shot.lines)
  .filter(beat => beat.type === "dialogue");
const permitted = new Set(spokenBeats.map(beat => beat.id + ".mp3"));
if (spokenBeats.length !== 55 || permitted.size !== 55) {
  throw new Error("Approved voice script changed: expected 55 uniquely identified spoken beats.");
}
await mkdir(path.join(output, audioSource), { recursive: true });
let voiceCount = 0;
for (const filename of await readdir(audioFolder)) {
  if (filename === "README.md") continue;
  if (!permitted.has(filename)) {
    throw new Error("Unexpected voice filename: " + filename + ". Use the exact script ID plus .mp3.");
  }
  const original = path.join(audioFolder, filename);
  const audioStat = await stat(original);
  if (!audioStat.isFile() || audioStat.size < 128 || audioStat.size > 25 * 1024 * 1024) {
    throw new Error("Voice MP3 is empty, oversized or not a file: " + filename);
  }
  await copyFile(original, path.join(output, audioSource, filename));
  voiceCount++;
}
console.log("Approved dialogue MP3s packaged: " + voiceCount + "/55.");
// No README, metadata or source docs are published in dist.

console.log("Cloudflare Pages static output: dist/");
console.log("Only game HTML, scripts, styles, approved background and separate foreground desk, 3 Neutral seated sprites, six Stephen poses, six David poses and Paul's Confused and Pleased seated variants, plus base portraits and 18 reference expression WebPs were included.");
