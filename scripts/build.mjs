import { cp, copyFile, mkdir, readFile, readdir, rm, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist");
const files = ["index.html", "src/office-data.js", "src/reactions.js", "src/china-data.js", "src/rescue-framework.js", "src/summit-data.js", "src/detention-data.js", "src/reassemble-data.js", "src/asset-loader.js", "src/game.js", "src/styles.css"];
const imageSource = "public/assets/generated/characters";
const images = ["stephen-martin-baseline.webp", "david-baseline.webp", "paul-baseline.webp", "stephen-office-seated-neutral-v01.webp", "stephen-office-seated-amused-v01.webp", "stephen-office-seated-confused-v01.webp", "stephen-office-seated-annoyed-v01.webp", "stephen-office-seated-exasperated-v01.webp", "stephen-office-seated-laughing-v01.webp", "david-office-seated-neutral-v01.webp", "david-office-seated-confident-v01.webp", "david-office-seated-systems-expert-v01.webp", "david-office-seated-shocked-v01.webp", "david-office-seated-frustrated-v01.webp", "david-office-seated-serious-v01.webp", "paul-office-seated-neutral-v01.webp", "paul-office-seated-confused-v01.webp", "paul-office-seated-pleased-v01.webp", "stephen-holiday-standing-neutral-v01.webp", "great-wall-summit-promoter-standing-v01.webp", "china-banquet-attendant-standing-v01.webp", "stephen-holiday-forbidden-city-pleased-v01.webp", "china-night-market-spa-representative-v01.webp", "stephen-night-market-skewer-v01.webp", "david-hotel-standing-investigator-v01.webp", "paul-hotel-standing-puzzled-v01.webp", "summit-david-speaking-v01.webp", "summit-paul-wary-v01.webp", "summit-gatekeeper-v01.webp", "summit-stephen-seated-chairman-v02.webp", "summit-throne-david-confrontational-v01.webp", "summit-throne-paul-astonished-v01.webp", "summit-throne-attendant-fan-v01.webp", "summit-throne-attendant-tray-v01.webp", "summit-throne-attendant-ewer-v01.webp", "summit-throne-attendant-towel-v01.webp"];

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
  "public/assets/generated/locations/summit-throne-room-v01.webp",
  "public/assets/generated/locations/ending-a-finale-stephen-crowned-wink-v01.webp"
];
// GAME-SP4.1F: these four exact owner-approved, versioned backgrounds are
// required in every playable build. Do not package the raw Drive PNGs.
const transitionImages = [
  "transition-china-passing-time-v01.webp",
  "transition-operation-flight-luggage-v01.webp",
  "transition-operation-map-expenses-v01.webp",
  "transition-stephen-route-handoff-v01.webp",
  "transition-back-in-england-postcard-collage-v01.webp"
];
for (const filename of transitionImages) {
  const relative = "public/assets/generated/locations/" + filename;
  const bytes = await readFile(path.join(root,relative));
  if (bytes.length < 20000 || bytes.length > 2 * 1024 * 1024 ||
      bytes.toString("ascii",0,4) !== "RIFF" ||
      bytes.toString("ascii",8,12) !== "WEBP") {
    throw new Error("Invalid/missing locked F transition background: " + filename);
  }
  await mkdir(path.dirname(path.join(output,relative)), {recursive:true});
  await copyFile(path.join(root,relative),path.join(output,relative));
}
console.log("Approved transition artworks packaged: " + transitionImages.length + "/5.");
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

// This owner-approved full-stage cutaway is materialised from Drive, not from
// a committed original PNG. Include it in Cloudflare preview output explicitly.
const approvedRiskCutaway = "public/assets/generated/game/office-david-risk-cutaway-v01.webp";
const riskSource = path.join(root, approvedRiskCutaway);
const riskBytes = await readFile(riskSource);
if (riskBytes.length < 50000 || riskBytes.length > 2 * 1024 * 1024 ||
    riskBytes.toString("ascii", 0, 4) !== "RIFF" ||
    riskBytes.toString("ascii", 8, 12) !== "WEBP") {
  throw new Error("Approved David risk cutaway missing or invalid: " + approvedRiskCutaway);
}
await mkdir(path.dirname(path.join(output, approvedRiskCutaway)), { recursive: true });
await copyFile(riskSource, path.join(output, approvedRiskCutaway));

// GAME-SP4.1G1A: one new owner-approved transparent handset, with live
// route-specific message/1%/shutdown UI. Materialised from Drive on this PR.
const approvedFinalPhoneShell = "public/assets/generated/game/stephen-phone-shell-g1a-v01.webp";
const finalPhoneBytes = await readFile(path.join(root,approvedFinalPhoneShell));
if (finalPhoneBytes.length < 20000 || finalPhoneBytes.length > 2 * 1024 * 1024 ||
    finalPhoneBytes.toString("ascii",0,4) !== "RIFF" ||
    finalPhoneBytes.toString("ascii",8,12) !== "WEBP") {
  throw new Error("Approved G1A handset missing or invalid: " + approvedFinalPhoneShell);
}
await mkdir(path.dirname(path.join(output,approvedFinalPhoneShell)), { recursive: true });
await copyFile(path.join(root,approvedFinalPhoneShell),path.join(output,approvedFinalPhoneShell));

// Printer printout remains a single approved still for this work package.
// The original PNG lives only in project Drive; copy the materialised WebP.
const approvedPrinterCutaway = "public/assets/generated/game/office-printer-bear-cutaway-v01.webp";
const printerSource = path.join(root, approvedPrinterCutaway);
const printerBytes = await readFile(printerSource);
if (printerBytes.length < 50000 || printerBytes.length > 2 * 1024 * 1024 ||
    printerBytes.toString("ascii", 0, 4) !== "RIFF" ||
    printerBytes.toString("ascii", 8, 12) !== "WEBP") {
  throw new Error("Approved printer cutaway missing or invalid: " + approvedPrinterCutaway);
}
await mkdir(path.dirname(path.join(output, approvedPrinterCutaway)), { recursive: true });
await copyFile(printerSource, path.join(output, approvedPrinterCutaway));

// The approved chat image remains one static still; its source PNG stays in Drive.
// Include the generated WebP in the playable preview/build.
const approvedPhoneChatCutaway = "public/assets/generated/game/office-phone-group-chat-cutaway-v01.webp";
const chatSource = path.join(root, approvedPhoneChatCutaway);
const chatBytes = await readFile(chatSource);
if (chatBytes.length < 50000 || chatBytes.length > 2 * 1024 * 1024 ||
    chatBytes.toString("ascii", 0, 4) !== "RIFF" ||
    chatBytes.toString("ascii", 8, 12) !== "WEBP") {
  throw new Error("Approved phone group chat cutaway missing or invalid: " + approvedPhoneChatCutaway);
}
await mkdir(path.dirname(path.join(output, approvedPhoneChatCutaway)), { recursive: true });
await copyFile(chatSource, path.join(output, approvedPhoneChatCutaway));

// The matched later phone shot is another approved static image. The original
// remains on Drive; require and bundle only its generated WebP here.
const approvedMutedChatCutaway = "public/assets/generated/game/office-phone-group-muted-cutaway-v01.webp";
const mutedSource = path.join(root, approvedMutedChatCutaway);
const mutedBytes = await readFile(mutedSource);
if (mutedBytes.length < 50000 || mutedBytes.length > 2 * 1024 * 1024 ||
    mutedBytes.toString("ascii", 0, 4) !== "RIFF" ||
    mutedBytes.toString("ascii", 8, 12) !== "WEBP") {
  throw new Error("Approved muted group cutaway missing or invalid: " + approvedMutedChatCutaway);
}
await mkdir(path.dirname(path.join(output, approvedMutedChatCutaway)), { recursive: true });
await copyFile(mutedSource, path.join(output, approvedMutedChatCutaway));

// GAME-SP4.1G3F: two owner-supplied Berserk Llama Syndrome album covers.
for(const name of ["madness","tracklist"]){
  const relative = "public/assets/generated/game/bls-stephen-martin-"+name+"-cover-v01.webp";
  const bytes=await readFile(path.join(root,relative));
  if(bytes.length<10000 || bytes.toString("ascii",0,4)!=="RIFF" ||
     bytes.toString("ascii",8,12)!=="WEBP") throw new Error("G3F album cover missing/invalid: "+relative);
  await mkdir(path.dirname(path.join(output,relative)),{recursive:true});
  await copyFile(path.join(root,relative),path.join(output,relative));
}
// GAME-SP4.1G3C: the nine owner-approved admissions cutouts are materialised
// from Drive and must be present in the published Cloudflare output. Tests
// against repository sources alone do not catch a missing dist copy.
const summitChoiceSlugs = [
  "vase",
  "airline-ticket",
  "phone-charger",
  "spreadsheet",
  "legs",
  "it-ticket",
  "rescue-kit",
  "membership-card",
  "return-flight"
];
if (summitChoiceSlugs.length !== 9 || new Set(summitChoiceSlugs).size !== 9) {
  throw new Error("Expected exactly nine unique approved Summit choice icons.");
}
for (const slug of summitChoiceSlugs) {
  const relative = "public/assets/generated/game/summit-choice-" + slug + "-cutout-v01.webp";
  const bytes = await readFile(path.join(root, relative));
  if (bytes.length < 2500 || bytes.length > 2 * 1024 * 1024 ||
      bytes.toString("ascii", 0, 4) !== "RIFF" ||
      bytes.toString("ascii", 8, 12) !== "WEBP" ||
      bytes.toString("ascii", 12, 16) !== "VP8X" ||
      (bytes[20] & 0x10) === 0) {
    throw new Error("G3C choice icon missing, invalid or not transparent: " + relative);
  }
  await mkdir(path.dirname(path.join(output, relative)), { recursive: true });
  await copyFile(path.join(root, relative), path.join(output, relative));
}
console.log("Approved G3C choice cutouts packaged: " + summitChoiceSlugs.length + "/9.");

// GAME-SP4B: include exactly the locked Ending B images and the release
// permit assembled from Stephen's original approved office sprite pixels.
const endingBImages = [
  "public/assets/generated/locations/ending-b-bureau-office-v01.webp",
  "public/assets/generated/locations/ending-b-finale-ceremonial-release-v01.webp",
  "public/assets/generated/game/ending-b-puzzle-desk-v01.webp",
  "public/assets/generated/game/ending-b-bear-classification-v01.webp",
  "public/assets/generated/game/ending-b-pauls-takeaway-cup-master-v01.webp",
  "public/assets/generated/game/ending-b-pauls-takeaway-cup-alpha-v01.webp",
  "public/assets/generated/game/ending-b-approved-stamp-v01.webp",
  "public/assets/generated/game/ending-b-approved-ink-impression-v01.webp",
  "public/assets/generated/game/ending-b-release-permit-canonical-portrait-proof-v01.webp",
  "public/assets/generated/characters/ending-b-ceremonial-official-neutral-v01.webp"
];
const endingBTransparent = new Set([
  "ending-b-pauls-takeaway-cup-alpha-v01.webp",
  "ending-b-approved-stamp-v01.webp",
  "ending-b-approved-ink-impression-v01.webp",
  "ending-b-ceremonial-official-neutral-v01.webp"
]);
for (const relative of endingBImages) {
  const data = await readFile(path.join(root,relative));
  if (data.length < 20000 || data.length > 3 * 1024 * 1024 ||
      data.toString("ascii",0,4) !== "RIFF" ||
      data.toString("ascii",8,12) !== "WEBP") {
    throw new Error("Missing/invalid locked Ending B artwork: " + relative);
  }
  if (endingBTransparent.has(path.basename(relative)) &&
      (data.toString("ascii",12,16) !== "VP8X" || (data[20] & 0x10) === 0)) {
    throw new Error("Ending B standalone prop lost its alpha channel: " + relative);
  }
  await mkdir(path.dirname(path.join(output,relative)),{recursive:true});
  await copyFile(path.join(root,relative),path.join(output,relative));
}
console.log("Approved Ending B artworks packaged: " + endingBImages.length + "/10.");

// GAME-SP4C: spa lounge and three approved separate alpha characters.
// Fail the preview build rather than silently showing missing assets.
const endingCImages = [
  "public/assets/generated/locations/ending-c-spa-lounge-background-v01.webp",
  "public/assets/generated/locations/ending-c-spa-assembly-workshop-background-v01.webp",
  "public/assets/generated/characters/ending-c-stephen-spa-robe-v01.webp",
  "public/assets/generated/characters/ending-c-stephen-cardboard-rebuilt-v01.webp",
  "public/assets/generated/characters/ending-c-david-spa-visitor-v01.webp",
  "public/assets/generated/characters/ending-c-paul-spa-visitor-v01.webp",
  "public/assets/generated/game/ending-c-cardboard-head-v01.webp",
  "public/assets/generated/game/ending-c-cardboard-torso-v01.webp",
  "public/assets/generated/game/ending-c-cardboard-left-arm-v01.webp",
  "public/assets/generated/game/ending-c-cardboard-right-arm-v01.webp",
  "public/assets/generated/game/ending-c-cardboard-left-leg-v01.webp",
  "public/assets/generated/game/ending-c-cardboard-right-leg-v01.webp",
  "public/assets/generated/game/ending-c-cardboard-board-v01.webp",
  "public/assets/generated/game/ending-c-cardboard-kidney-1-v01.webp",
  "public/assets/generated/game/ending-c-cardboard-kidney-2-v01.webp",
  "public/assets/generated/game/ending-c-cardboard-kidney-3-v01.webp",
  "public/assets/generated/game/ending-c-cardboard-wifi-heart-v01.webp",
  "public/assets/generated/game/ending-c-cardboard-toaster-v01.webp",
  "public/assets/generated/game/ending-c-cardboard-banana-v01.webp",
  "public/assets/generated/game/ending-c-cardboard-spleen-v01.webp"
];
for (const relative of endingCImages) {
  const data = await readFile(path.join(root,relative));
  if (data.length < 20000 || data.length > 3 * 1024 * 1024 ||
      data.toString("ascii",0,4) !== "RIFF" ||
      data.toString("ascii",8,12) !== "WEBP") {
    throw new Error("Missing or invalid locked Ending C art: " + relative);
  }
  if ((relative.includes("/characters/") || relative.includes("/game/ending-c-cardboard-")) &&
      (data.toString("ascii",12,16) !== "VP8X" || (data[20] & 0x10) === 0)) {
    throw new Error("Ending C separate spa actor lost alpha channel: " + relative);
  }
  await mkdir(path.dirname(path.join(output,relative)),{recursive:true});
  await copyFile(path.join(root,relative),path.join(output,relative));
}
console.log("Approved Ending C scene artworks packaged: " + endingCImages.length + "/20.");

// GAME-SP4.1G5F: exact owner-approved 1672x941 closing artwork. Preserve the
// signed-off PNG rather than substituting a different drawing or resizing it.
const endingCFinale = "public/assets/generated/locations/ending-c-finale-standee-celebration-v01.png";
const endingCFinaleBytes = await readFile(path.join(root, endingCFinale));
if (endingCFinaleBytes.length < 200000 || endingCFinaleBytes.length > 4 * 1024 * 1024 ||
    endingCFinaleBytes.subarray(0,8).toString("hex") !== "89504e470d0a1a0a" ||
    endingCFinaleBytes.toString("ascii",12,16) !== "IHDR" ||
    endingCFinaleBytes.readUInt32BE(16) !== 1672 ||
    endingCFinaleBytes.readUInt32BE(20) !== 941 ||
    createHash("sha256").update(endingCFinaleBytes).digest("hex") !==
      "6c8bf0a4bd46d43c8997fa5ea1a2fe5c2edc453e7c099199b3946f42bcb00f18") {
  throw new Error("Ending C finale does not match owner-approved G5F art");
}
await mkdir(path.dirname(path.join(output,endingCFinale)),{recursive:true});
await copyFile(path.join(root,endingCFinale),path.join(output,endingCFinale));
console.log("Approved Ending C G5F finale artwork packaged: 1/1.");




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

// The two individually approved throne-room foreground actors must retain
// alpha transparency. An opaque asset would obscure the throne/background.
for (const name of ["summit-throne-david-confrontational-v01.webp", "summit-throne-paul-astonished-v01.webp"]) {
  const actor = await readFile(path.join(root, imageSource, name));
  if (actor.toString("ascii", 0, 4) !== "RIFF" ||
      actor.toString("ascii", 12, 16) !== "VP8X" ||
      (actor[20] & 0x10) === 0) {
    throw new Error("Approved throne room actor must preserve WebP alpha: " + name);
  }
}

// All four separately approved ceremonial attendants must stay transparent.
// They are decorative actors, not scene composites or opaque overlays.
for (const name of ["summit-throne-attendant-fan-v01.webp", "summit-throne-attendant-tray-v01.webp", "summit-throne-attendant-ewer-v01.webp", "summit-throne-attendant-towel-v01.webp"]) {
  const sprite = await readFile(path.join(root, imageSource, name));
  if (sprite.toString("ascii", 0, 4) !== "RIFF" ||
      sprite.toString("ascii", 12, 16) !== "VP8X" ||
      (sprite[20] & 0x10) === 0) {
    throw new Error("Approved throne attendant must preserve WebP alpha: " + name);
  }
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
// Chapter Two uses the same ID-to-file convention, including outcome-specific
// spoken reactions. Do not ship arbitrary MP3s or unapproved dialogue.
const holidaySandbox = { window: {} };
vm.runInNewContext(await readFile(path.join(root, "src/china-data.js"), "utf8"), holidaySandbox);
const wall = holidaySandbox.window.SMP_CHINA_WALL;
const palace = holidaySandbox.window.SMP_CHINA_PALACE;
const market = holidaySandbox.window.SMP_CHINA_MARKET;
const chinaFinal = holidaySandbox.window.SMP_CHINA_FINAL;
const holidaySpokenIds = [
  ...wall.lines, ...palace.lines, ...palace.acceptReply, ...market.lines
].map(line => line.id).concat([
  wall.acceptReactionId, wall.declineReactionId, palace.declineReplyId,
  market.acceptReactionId, chinaFinal.stephenLastLineId
]);
if (holidaySpokenIds.length !== 25 ||
    new Set(holidaySpokenIds).size !== 25 ||
    holidaySpokenIds.some(id => typeof id !== "string" || !/^china\.[a-z]+\.[a-z0-9.-]+$/.test(id))) {
  throw new Error("Chapter Two dialogue IDs changed unexpectedly; expected 25 unique safe audio IDs.");
}
holidaySpokenIds.forEach(id => permitted.add(id + ".mp3"));
// The David/Paul office alarm immediately after Back in England contains
// ten approved spoken beats; the silent four-card travel montage is excluded.
const alarmIds = holidaySandbox.window.SMP_RESCUE_ALARM.lines.map(line => line.id);
if (alarmIds.length !== 10 || new Set(alarmIds).size !== 10 ||
    alarmIds.some((id, i) => id !== "rescue.alarm." + String(i + 1).padStart(3, "0"))) {
  throw new Error("Back in England script changed: expected ten stable alarm voice IDs.");
}
alarmIds.forEach(id => permitted.add(id + ".mp3"));
// The Visitor Information scene has eight shared arrival lines, three route
// dependent two-line wrong guesses, three Paul hints and five final deductions.
// Evidence props and the travel montage remain unspoken.
const hub = holidaySandbox.window.SMP_RESCUE_HUB;
const hubRoutes = ["cult", "detention", "reassemble"];
const hubVoiceIds = [
  ...hub.opening.map(beat => beat.id),
  ...hubRoutes.flatMap(route => hub.wrong[route].map(beat => beat.id)),
  ...hubRoutes.map(route => "rescue.hub.hint." + route),
  ...hub.correct.map(beat => beat.id)
];
if (hubVoiceIds.length !== 22 || new Set(hubVoiceIds).size !== 22 ||
    hub.opening.some((beat,i) => beat.id !== "rescue.hub." + String(i+1).padStart(3,"0")) ||
    hubRoutes.some(route => hub.wrong[route].length !== 2 ||
      hub.wrong[route].some((beat,i) => beat.id !== "rescue.hub.wrong."+route+"."+String(i+1).padStart(3,"0")) ||
      !hub.hint[route]?.startsWith("Paul: ")) ||
    hub.correct.length !== 5 ||
    hub.correct.some((beat,i) => beat.id !== "rescue.hub.correct."+String(i+1).padStart(3,"0"))) {
  throw new Error("Visitor Information audio script changed: expected 22 unique approved IDs.");
}
hubVoiceIds.forEach(id => permitted.add(id + ".mp3"));
if (permitted.size !== 112) throw new Error("Duplicate approved dialogue voice ID.");
// GAME-SP4.1F: the owner records the existing narrator voice later. These
// reserved IDs must already be permitted so future MP3 uploads bundle with
// no rebuild code changes or weakening of the strict voice allow-list.
const narratorIds = [
  "transition.china.chapter-two.001",
  "transition.china.to-palace.001",
  "transition.china.to-market.001",
  "transition.route.summit.001",
  "transition.route.banquet.001",
  "transition.route.spa.001",
  "transition.england.back.001",
  "transition.travel.001",
  "transition.travel.002",
  "transition.travel.003",
  "transition.travel.004",
  "transition.hotel.arrival.001"
];
if (narratorIds.length !== 12 || new Set(narratorIds).size !== 12 ||
    narratorIds.some(id => !/^transition\.[a-z0-9.-]+$/.test(id))) {
  throw new Error("Invalid/duplicate narrator audio IDs.");
}
narratorIds.forEach(id => permitted.add(id + ".mp3"));
if (permitted.size !== 124) throw new Error("Narration filename overlaps an existing voice ID.");
// Summit route: 7 gate lines, 3 gatekeeper prompts, 17 distinct speaker
// responses to all 9 choices, 3 optional Paul hints and 14 ending beats.
// Preserve every existing sentence, choice, save checkpoint and prop.
const frameworkSandbox = { window:{} };
vm.runInNewContext(await readFile(path.join(root,"src/rescue-framework.js"),"utf8"),frameworkSandbox);
vm.runInNewContext(await readFile(path.join(root,"src/summit-data.js"),"utf8"),frameworkSandbox);
const summitIntro = frameworkSandbox.window.SMP_RESCUE_FRAMEWORK.routes.cult.intro;
const summit = frameworkSandbox.window.SMP_SUMMIT;
const summitIds = [
  ...summitIntro.map(b => b.id),
  ...summit.rounds.flatMap((round,i) => [
    round.promptId,
    ...round.options.flatMap(option => option.voices.map(b => b.id)),
    round.hintId
  ]),
  ...summit.ending.map(b => b.id)
];
if (summitIds.length !== 44 || new Set(summitIds).size !== 44 ||
    summitIntro.length !== 7 ||
    summitIntro.some((b,i) => b.id !== "summit.intro."+String(i+1).padStart(3,"0")) ||
    summit.rounds.length !== 3 ||
    summit.rounds.some((round,i) => {
      const n = String(i+1).padStart(3,"0");
      return round.promptId !== "summit.check."+n+".prompt" ||
        round.hintId !== "summit.check."+n+".hint" ||
        !round.prompt.startsWith("GATEKEEPER: ") ||
        !round.hint.startsWith("Paul: ") ||
        round.options.length !== 3 ||
        round.options.some(option =>
          !option.voices?.length ||
          option.voices.some((b,j)=>b.id !== "summit.check."+n+"."+option.id+"."+String(j+1).padStart(3,"0")) ||
          option.response !== option.voices.map(b=>b.speaker+": "+b.text).join(" "));
    }) ||
    summit.ending.length !== 14 ||
    summit.ending.some((b,i) => b.id !== "summit.ending."+String(i+1).padStart(3,"0"))) {
  throw new Error("Summit voice contract changed: expected 44 canonical spoken beats.");
}
summitIds.forEach(id => permitted.add(id + ".mp3"));
// The remaining two narrator stingers close Endings B and C. The rest of those
// endings remain intentionally text-timed until separate voice work is approved.
vm.runInNewContext(await readFile(path.join(root,"src/detention-data.js"),"utf8"),frameworkSandbox);
vm.runInNewContext(await readFile(path.join(root,"src/reassemble-data.js"),"utf8"),frameworkSandbox);
const closingNarrators = [
  {scene:frameworkSandbox.window.SMP_DETENTION, id:"detention.ending.014",length:14},
  {scene:frameworkSandbox.window.SMP_REASSEMBLE,id:"reassemble.ending.015",length:15}
];
if (closingNarrators.some(({scene,id,length})=>
    scene.ending.length !== length ||
    scene.ending.at(-1)?.speaker !== "Narrator" ||
    scene.ending.at(-1)?.id !== id ||
    scene.ending.filter(line=>line.speaker === "Narrator").length !== 1)) {
  throw new Error("Ending B/C closing narrator script changed unexpectedly.");
}
closingNarrators.forEach(({id})=>permitted.add(id+".mp3"));
// Ending B: all six route-intro lines, 3 official prompts, 17 actor-split
// option replies, 3 Paul hints, 2 stamp-selection replies, final official
// approval, and the 13 character lines before the existing narrator clip.
const detentionIntro = frameworkSandbox.window.SMP_RESCUE_FRAMEWORK.routes.detention.intro;
const detentionData = frameworkSandbox.window.SMP_DETENTION;
const detentionIds = [
  ...detentionIntro.map(line=>line.id),
  ...detentionData.rounds.flatMap(round=>[
    round.promptId, ...round.options.flatMap(o=>o.voices.map(line=>line.id)),
    round.hintId, ...(round.approvedVoices||[]).map(line=>line.id)
  ]),
  ...detentionData.stampSelectedVoices.map(line=>line.id),
  ...detentionData.ending.slice(0,-1).map(line=>line.id)
];
if (detentionIntro.length !== 6 || detentionData.rounds.length !== 3 ||
    detentionData.stampSelectedVoices.length !== 2 ||
    detentionData.ending.length !== 14 ||
    detentionData.ending[13]?.id !== "detention.ending.014" ||
    detentionIds.length !== 45 || new Set(detentionIds).size !== 45 ||
    detentionIntro.some((line,i) =>
      line.id !== "detention.intro."+String(i+1).padStart(3,"0")) ||
    detentionData.ending.slice(0,-1).some((line,i) =>
      line.id !== "detention.ending."+String(i+1).padStart(3,"0")) ||
    detentionData.rounds.some((round,i)=>{
      const n=String(i+1).padStart(3,"0");
      return round.promptId !== "detention.form."+n+".prompt" ||
        round.hintId !== "detention.form."+n+".hint" ||
        !round.prompt.startsWith("OFFICIAL: ") ||
        !round.hint.startsWith("Paul: ") ||
        round.options.length !== 3 ||
        round.options.some(option=>!option.voices?.length ||
          option.voices.some((beat,j)=>beat.id !==
            "detention.form."+n+"."+option.id+"."+String(j+1).padStart(3,"0")) ||
          option.response !== option.voices.map(b=>b.speaker+": "+b.text).join(" ")) ||
        (i===2 && (round.approvedVoices?.length !== 1 ||
          round.approvedVoices[0].id !== "detention.stamp.approved.001" ||
          !round.approvedResponse.startsWith("OFFICIAL: "+round.approvedVoices[0].text+" The printer releases ")));
    }) ||
    detentionData.stampSelectedVoices.some((line,i)=>
      line.id !== "detention.stamp.selected."+String(i+1).padStart(3,"0"))) {
  throw new Error("Ending B voice contract changed: expected 45 canonical actor beats.");
}
detentionIds.forEach(id=>permitted.add(id+".mp3"));
// Ending C: seven spa arrivals, fourteen actors in the ending, nine
// conditional mismatch replies, one successful-fit reaction, one empty-tray
// correction, and seven part-specific/general hints: 39 new recordings.
const assemblyIntro = frameworkSandbox.window.SMP_RESCUE_FRAMEWORK.routes.reassemble.intro;
const assemblyData = frameworkSandbox.window.SMP_REASSEMBLE;
const assemblyIds = [
  ...assemblyIntro.map(beat=>beat.id),
  ...assemblyData.ending.slice(0,-1).map(beat=>beat.id),
  ...Object.values(assemblyData.reactionVoices).flatMap(voices=>voices.map(beat=>beat.id)),
  ...assemblyData.fitVoices.map(beat=>beat.id),
  ...assemblyData.noSelectionVoices.map(beat=>beat.id),
  ...Object.values(assemblyData.hintVoices).map(beat=>beat.id)
];
const reactionCases = [
  ["wifi-heart","head"],["toaster","torso"],["banana","torso"],
  ["kidney-1","torso"],["spleen","torso"],["head","left-arm"],
  ["left-leg","torso"]
];
if (assemblyIntro.length !== 7 || assemblyData.ending.length !== 15 ||
    assemblyData.ending.at(-1)?.id !== "reassemble.ending.015" ||
    assemblyIntro.some((beat,i)=>beat.id !== "reassemble.intro."+String(i+1).padStart(3,"0")) ||
    assemblyData.ending.slice(0,-1).some((beat,i)=>beat.id !== "reassemble.ending."+String(i+1).padStart(3,"0")) ||
    Object.values(assemblyData.reactionVoices).reduce((n,lines)=>n+lines.length,0) !== 9 ||
    reactionCases.some(([part,slot])=>
      assemblyData.reaction(part,slot) !== assemblyData.reactionVoice(part,slot)
        .map(beat=>beat.speaker+": "+beat.text).join(" ")) ||
    Object.values(assemblyData.hintVoices).length !== 7 ||
    assemblyData.fitVoices.length !== 1 ||
    assemblyData.noSelectionVoices.length !== 1 ||
    assemblyIds.length !== 39 || new Set(assemblyIds).size !== 39) {
  throw new Error("Ending C recording script mismatch: expected 39 approved actor lines.");
}
assemblyIds.forEach(id=>permitted.add(id+".mp3"));
if (permitted.size !== 254) throw new Error("Duplicate Ending C audio ID.");

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
console.log("Approved dialogue MP3s packaged: " + voiceCount +
  "/254 maximum (215 established voices + 39 Ending C recordings).");

// Optional owner-supplied songs are uploaded directly to this exact folder
// on the song PR branch. Builds work before upload; once present, the MP3s
// are automatically copied to the public Cloudflare preview.
const songSource = "public/assets/audio/songs";
const songFolder = path.join(root, songSource);
const allowedSongs = new Set(["optimistic.mp3", "pessimistic.mp3"]);
await mkdir(path.join(output, songSource), { recursive: true });
let songCount = 0;
for (const filename of await readdir(songFolder).catch(error => {
  if (error.code === "ENOENT") return [];
  throw error;
})) {
  if (filename === "README.md") continue;
  if (!allowedSongs.has(filename)) throw new Error("Unexpected song filename: " + filename);
  const original = path.join(songFolder, filename);
  const info = await stat(original);
  if (!info.isFile() || info.size < 128 || info.size > 25 * 1024 * 1024)
    throw new Error("Song MP3 must be 128 bytes to 25 MiB: " + filename);
  await copyFile(original, path.join(output, songSource, filename));
  songCount++;
}
console.log("Optional opening song MP3s packaged: " + songCount + "/2.");
// No README, metadata or source docs are published in dist.

console.log("Cloudflare Pages static output: dist/");
console.log("Only game HTML, scripts, styles, approved background and separate foreground desk, 3 Neutral seated sprites, six Stephen poses, six David poses and Paul's Confused and Pleased seated variants, plus base portraits and 18 reference expression WebPs were included.");
