// GAME-SP4.1G5B: approved replacement recordings, exact ID-to-file mapping.
// Protect against accidentally reintroducing the earlier faulty MP3s.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const crypto = require("node:crypto");

const root = path.resolve(__dirname, "..");
const window = {};
for (const file of ["src/rescue-framework.js", "src/reassemble-data.js"]) {
  vm.runInNewContext(fs.readFileSync(path.join(root, file), "utf8"), {window}, {timeout:1000});
}
const approved = [
  {id:"reassemble.intro.002", speaker:"Paul", text:"It's a spa.",
    sha256:"5cfd1d2059e00e58a60e464238fbe9e4debe40b4589e793956487caa412ce43b"},
  {id:"reassemble.ending.007", speaker:"Stephen", text:"That says 'custom souvenir cut-out'.",
    sha256:"38be729a1f8a205a319b9ab81db3ec5117970639154da02d5b7604b8a6ab3a7d"},
  {id:"reassemble.ending.008", speaker:"Paul", text:"Oh.",
    sha256:"be17822e45b343af7821fe35fc53cb5f587925522bfbdd1814025915af22622b"},
  {id:"reassemble.ending.012", speaker:"Stephen", text:"WHY?",
    sha256:"f1b08ec139894fac7b08e0dc89eb90c42b1ea7f138422dbb9f33dd1df665ca9a"}
];

for (const item of approved) {
  test("G5B approved audio is present and matches script: "+item.id, () => {
    const filepath = path.join(root,"public/assets/audio/dialogue",item.id+".mp3");
    const content = fs.readFileSync(filepath);
    assert.ok(content.length > 128, "MP3 must not be empty");
    assert.equal(content.toString("ascii",0,3), "ID3", "expected ElevenLabs ID3 MP3");
    assert.equal(crypto.createHash("sha256").update(content).digest("hex"), item.sha256,
      "the recording differs from the owner-approved replacement");
    const lines = item.id.startsWith("reassemble.intro.")
      ? window.SMP_RESCUE_FRAMEWORK.routes.reassemble.intro
      : window.SMP_REASSEMBLE.ending;
    const beat = lines.find(line => line.id === item.id);
    assert.ok(beat, "spoken beat must still exist");
    assert.equal(beat.speaker,item.speaker);
    assert.equal(beat.text,item.text);
  });
}
