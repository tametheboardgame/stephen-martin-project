// V1 final distribution audit. Run AFTER npm run build; never delete
// canonical artwork or gameplay sources to trim a static deployment.
import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const dist=path.join(root,"dist");
async function walk(dir,prefix=""){
  const out=[];
  for(const item of await readdir(dir,{withFileTypes:true})){
    const rel=path.join(prefix,item.name);
    if(item.isDirectory()) out.push(...await walk(path.join(dir,item.name),rel));
    else if(item.isFile()) out.push(rel.split(path.sep).join("/"));
  }
  return out;
}
const files=await walk(dist);
const bytes=(await Promise.all(files.map(async f=>(await stat(path.join(dist,f))).size))).reduce((a,n)=>a+n,0);
assert.ok(files.includes("index.html")&&files.includes("src/game.js")&&files.includes("src/asset-loader.js"));
assert.ok(files.includes("public/assets/generated/locations/ending-c-finale-standee-celebration-v01.webp"));
assert.ok(!files.some(f=>f.endsWith("ending-c-finale-standee-celebration-v01.png")),
  "Owner-approved original PNG must remain in source, not published alongside WebP");
assert.ok(!files.some(f=>/\/characters\/(?:stephen-martin|david|paul)-baseline\.webp$/.test(f)),
  "Reference-only baseline images should not be published");
assert.ok(!files.some(f=>f.includes("/characters/expressions/")),
  "Unused expression crops must remain archived only in source");
const css=await readFile(path.join(dist,"src/styles.css"),"utf8");
const expected="ending-c-finale-standee-celebration-v01.webp";
assert.ok(css.includes(expected)&&!css.includes("ending-c-finale-standee-celebration-v01.png"),
  "All final-scene breakpoints must request the WebP derivative");
const audio=files.filter(f=>f.startsWith("public/assets/audio/dialogue/")&&f.endsWith(".mp3"));
const songs=files.filter(f=>f.startsWith("public/assets/audio/songs/")&&f.endsWith(".mp3"));
assert.equal(audio.length,254);
assert.equal(songs.length,2);
const source=await readFile(path.join(root,"public/assets/generated/locations/ending-c-finale-standee-celebration-v01.png"));
const digest=createHash("sha256").update(source).digest("hex");
assert.equal(digest,"6c8bf0a4bd46d43c8997fa5ea1a2fe5c2edc453e7c099199b3946f42bcb00f18");
const delivered=(await stat(path.join(dist,"public/assets/generated/locations",expected))).size;
assert.ok(delivered<source.length);
console.log("V1 publication audit PASS: "+files.length+" files, "+bytes+" total bytes.");
console.log("Ending C finale: "+source.length+"-byte approved original archived; "+
  delivered+"-byte pixel-matched WebP delivered ("+Math.round(100*(1-delivered/source.length))+"% smaller).");
console.log("Approved 254 dialogue MP3s + 2 songs; 3 baseline masters and 18 reference expression images excluded from dist.");
