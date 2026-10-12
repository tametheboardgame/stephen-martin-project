import { cp, copyFile, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist");
const files = ["index.html", "src/office-data.js", "src/game.js", "src/styles.css"];
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
console.log("Cloudflare Pages static output: dist/");
console.log("Only game HTML, scripts, styles and 3 approved character images were included.");
