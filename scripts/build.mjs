import { cp, copyFile, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist");
const files = ["index.html", "src/office-data.js", "src/reactions.js", "src/game.js", "src/styles.css"];
const imageSource = "public/assets/generated/characters";
const images = ["stephen-martin-baseline.webp", "david-baseline.webp", "paul-baseline.webp"];

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
console.log("Cloudflare Pages static output: dist/");
console.log("Only game HTML, scripts, styles, 3 approved base portraits and 18 expression WebPs were included.");
