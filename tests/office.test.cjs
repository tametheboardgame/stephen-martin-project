const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const dataSource = read("src/office-data.js");
const gameSource = read("src/game.js");
const html = read("index.html");

function loadShots() {
  const window = {};
  vm.runInNewContext(dataSource, { window }, { timeout: 1000 });
  return window.SMP_OFFICE_SHOTS;
}

test("approved office script is complete and ordered", () => {
  const shots = loadShots();
  assert.equal(shots.length, 7);
  assert.deepEqual(Array.from(shots, (s) => s.id), ["O01", "O02", "O03", "O04", "O05", "O06", "O07"]);
  assert.equal(shots.reduce((n, s) => n + s.lines.length, 0), 64);
  assert.ok(shots.every((s) => s.label && s.caption && s.moment && s.prop && s.lines.length));
  assert.ok(shots.every((s) => s.lines.every((b) => b.text && ["Stephen", "David", "Paul", "Narrator", "System"].includes(b.speaker))));
  assert.ok(shots.some((s) => s.lines.some((b) => b.text.includes("highly particular set of skills"))));
  assert.ok(shots.some((s) => s.lines.some((b) => b.text.includes("It's a famous bear"))));
  assert.ok(shots.some((s) => s.lines.some((b) => b.text.includes("That's the optimistic version"))));
  assert.ok(shots.some((s) => s.lines.some((b) => b.text.includes("Yet."))));
});

test("all source image paths match approved character assets", () => {
  for (const filename of ["stephen-martin-baseline.webp", "david-baseline.webp", "paul-baseline.webp"]) {
    assert.ok(html.includes("public/assets/generated/characters/" + filename));
  }
  assert.ok(!html.includes("http://") && !html.includes("https://"));
  assert.ok(!gameSource.includes("fetch(") && !gameSource.includes("XMLHttpRequest"));
});

test("static HTML exposes the named controls and scripts in dependency order", () => {
  const ids = [...gameSource.matchAll(/\$\("([A-Za-z][A-Za-z0-9]+)"\)/g)].map((m) => m[1]);
  for (const id of ids) assert.ok(html.includes('id="' + id + '"'), "Missing element " + id);
  assert.ok(html.indexOf("office-data.js") < html.indexOf("game.js"));
  assert.ok(html.includes("aria-live"));
  assert.ok(html.includes("lang=\"en-GB\""));
});

function setupFakeGame() {
  const listeners = new Map();
  const elements = new Map();
  const stored = new Map();
  class FakeElement {
    constructor(id) {
      this.id = id;
      this.hidden = false;
      this.disabled = false;
      this.textContent = "";
      this.innerHTML = "";
      this.style = {};
      this.dataset = {};
      this.attributes = {};
      this.events = {};
      this.classList = { toggle() {} };
    }
    addEventListener(type, callback) { this.events[type] = callback; }
    setAttribute(name, value) { this.attributes[name] = value; }
    click() { if (!this.disabled) this.events.click?.({ target: this, preventDefault() {} }); }
    closest() { return "button"; }
  }
  const getElementById = (id) => {
    if (!elements.has(id)) elements.set(id, new FakeElement(id));
    return elements.get(id);
  };
  const document = {
    getElementById,
    body: new FakeElement("body"),
    addEventListener(type, callback) { listeners.set(type, callback); }
  };
  const window = {
    SMP_OFFICE_SHOTS: loadShots(),
    localStorage: {
      getItem(key) { return stored.has(key) ? stored.get(key) : null; },
      setItem(key, value) { stored.set(key, value); }
    }
  };
  const ctx = { window, document, HTMLElement: FakeElement };
  vm.runInNewContext(gameSource, ctx, { timeout: 1000 });
  return { elements, stored, getElementById, window };
}

test("start, back, complete and replay preserve valid scene state", () => {
  const p = setupFakeGame();
  const el = p.getElementById;
  assert.equal(el("officeScreen").hidden, true);
  el("startButton").click();
  assert.equal(el("officeScreen").hidden, false);
  assert.equal(el("lineText").textContent, "Is China far?");
  assert.equal(el("backButton").disabled, true);
  el("nextButton").click();
  assert.equal(el("lineText").textContent, "Quite.");
  el("backButton").click();
  assert.equal(el("lineText").textContent, "Is China far?");
  for (let i = 0; i < 64; i++) el("nextButton").click();
  assert.equal(el("holidayScreen").hidden, false);
  assert.equal(el("officeScreen").hidden, true);
  assert.equal(JSON.parse(p.stored.values().next().value).openingSeen, true);
  el("replayButton").click();
  assert.equal(el("sceneNumber").textContent, "SCENE 01 / 07");
  assert.equal(el("lineText").textContent, "Is China far?");
});

test("skip and resume work without selecting a holiday route", () => {
  const p = setupFakeGame();
  const el = p.getElementById;
  el("startButton").click();
  el("skipButton").click();
  assert.equal(el("holidayScreen").hidden, false);
  const save = JSON.parse(p.stored.values().next().value);
  assert.equal(save.scene, "holiday");
  assert.equal(Object.prototype.hasOwnProperty.call(save, "route"), false);
  el("homeButton").click();
  assert.equal(el("menuScreen").hidden, false);
  assert.equal(el("resumeButton").hidden, false);
  el("resumeButton").click();
  assert.equal(el("holidayScreen").hidden, false);
});
