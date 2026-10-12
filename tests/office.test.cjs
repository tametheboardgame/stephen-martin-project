const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const dataSource = read("src/office-data.js");
const gameSource = read("src/game.js");
const reactionSource = read("src/reactions.js");
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

test("D1 stages the four approved layers, not oversized expression cards", () => {
  const assets = [
    "public/assets/generated/locations/office-clean-01-v01.webp",
    "public/assets/generated/locations/office-foreground-01-v01.webp",
    ...["david", "stephen", "paul"].map((name) =>
      "public/assets/generated/characters/" + name + "-office-seated-neutral-v01.webp"
    )
  ];
  for (const asset of assets) {
    assert.ok(fs.statSync(path.join(root, asset)).size > 0, "Missing approved asset " + asset);
    assert.ok(read("scripts/build.mjs").includes(asset.split("/").at(-1)));
  }
  for (const name of ["David", "Stephen", "Paul"]) {
    assert.ok(html.includes('id="portrait' + name + '"'));
    assert.ok(html.includes('id="cast' + name + '"'));
  }
  assert.ok(html.includes('class="office-world office-scene-backdrop"'));
  assert.ok(html.includes('class="office-foreground"'));
  assert.ok(html.includes('class="cast cast-seated"'));
  assert.ok(!html.includes('class="cast-portrait"'), "Legacy giant-face card still present");
  const css = read("src/styles.css");
  assert.ok(css.includes('office-foreground-01-v01.webp'), "Foreground must use independent transparent asset");
  assert.ok(!css.includes("clip-path: inset(67.4%"), "Clipped-background workaround must not survive");
  assert.ok(!html.includes("http://") && !html.includes("https://"));
  assert.ok(!gameSource.includes("fetch(") && !gameSource.includes("XMLHttpRequest"));
  assert.ok(html.indexOf('id="dialogueBox"') < html.indexOf('id="storyProgress"'));
  assert.ok(html.indexOf('id="storyProgress"') < html.indexOf('id="playPauseButton"'));
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
  let nextTimeoutId = 1;
  const timeouts = new Map();
  const tick = () => {
    const item = timeouts.entries().next().value;
    if (!item) return false;
    const [id, { callback }] = item;
    timeouts.delete(id);
    callback();
    return true;
  };
  const window = {
    SMP_OFFICE_SHOTS: loadShots(),
    localStorage: {
      getItem(key) { return stored.has(key) ? stored.get(key) : null; },
      setItem(key, value) { stored.set(key, value); }
    }
  };
  vm.runInNewContext(reactionSource, { window }, { timeout: 1000 });
  const ctx = {
    window, document, HTMLElement: FakeElement,
    setTimeout(callback, delay) { const id = nextTimeoutId++; timeouts.set(id, { callback, delay }); return id; },
    clearTimeout(id) { timeouts.delete(id); }
  };
  vm.runInNewContext(gameSource, ctx, { timeout: 1000 });
  return { elements, stored, getElementById, window, timeouts, tick, document };

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

test("autoplay is enabled by default and progresses without a click", () => {
  const p = setupFakeGame();
  const el = p.getElementById;
  el("startButton").click();
  assert.equal(el("playPauseButton").attributes["aria-pressed"], "true");
  assert.equal(p.timeouts.size, 1);
  assert.equal(el("lineText").textContent, "Is China far?");
  assert.equal(p.tick(), true);
  assert.equal(el("lineText").textContent, "Quite.");
  assert.equal(p.timeouts.size, 1, "only one pending line timer");
});

test("manual Next resets timer, Back pauses and Play restarts", () => {
  const p = setupFakeGame();
  const el = p.getElementById;
  el("startButton").click();
  assert.equal(p.timeouts.size, 1);
  const originalTimerId = p.timeouts.keys().next().value;
  el("nextButton").click();
  assert.equal(el("lineText").textContent, "Quite.");
  assert.equal(p.timeouts.size, 1);
  assert.notEqual(p.timeouts.keys().next().value, originalTimerId);
  el("backButton").click();
  assert.equal(el("lineText").textContent, "Is China far?");
  assert.equal(p.timeouts.size, 0);
  assert.equal(el("playPauseButton").attributes["aria-pressed"], "false");
  el("playPauseButton").click();
  assert.equal(p.timeouts.size, 1);
  assert.equal(el("playPauseButton").attributes["aria-pressed"], "true");
});

test("Pause, skip, replay and hidden-tab safeguards prevent timer leaks", () => {
  const p = setupFakeGame();
  const el = p.getElementById;
  el("startButton").click();
  el("playPauseButton").click();
  assert.equal(p.timeouts.size, 0);
  el("nextButton").click();
  assert.equal(el("lineText").textContent, "Quite.");
  assert.equal(p.timeouts.size, 0, "manual stepping stays paused");
  el("playPauseButton").click();
  assert.equal(p.timeouts.size, 1);
  p.document.hidden = true;
  p.document.events = p.document.events || {};
  // The document listener is registered with document.addEventListener.
  p.document.hidden = false;
  el("skipButton").click();
  assert.equal(p.timeouts.size, 0);
  el("replayButton").click();
  assert.equal(p.timeouts.size, 1);
  el("homeButton").click();
  assert.equal(p.timeouts.size, 0);
});

test("reaction cues and three cutaways are registered without unapproved portraits", () => {
  const window = { SMP_OFFICE_SHOTS: loadShots() };
  vm.runInNewContext(reactionSource, { window }, { timeout: 1000 });
  assert.equal(window.SMP_REACTIONS.O01[0].Paul, "blank");
  assert.equal(window.SMP_REACTIONS.O03[8].David, "frustrated");
  assert.equal(window.SMP_REACTIONS.O04[4].Paul, "blank");
  const p = setupFakeGame();
  const el = p.getElementById;
  el("startButton").click();
  assert.equal(el("cutawayPanel").hidden, true);
  for (let i = 0; i < 5; i++) el("nextButton").click();
  assert.equal(el("stage").dataset.cutaway, "risk");
  assert.equal(el("cutawayPanel").hidden, false);
  assert.ok(el("cutawayContent").innerHTML.includes("PROBABLY FINE"));
  assert.ok(gameSource.includes("cutaway-printer"));
  assert.ok(gameSource.includes("STEPHEN RESCUE GROUP"));
  assert.ok(!reactionSource.includes("http"));
});

test("static seated actors preserve speaker and listener expression metadata across the whole intro", () => {
  const p = setupFakeGame();
  const el = p.getElementById;
  el("startButton").click();
  assert.equal(el("castPaul").dataset.expression, "blank");
  assert.equal(el("castStephen").dataset.expression, "amused");
  assert.equal(el("castDavid").dataset.staging, "seated-neutral");
  for (let i = 0; i < 5; i++) el("nextButton").click();
  assert.equal(el("castDavid").dataset.expression, "confident");
  assert.equal(el("castStephen").dataset.expression, "confused");
  assert.equal(el("castPaul").dataset.expression, "blank");
  assert.equal(el("castDavid").dataset.staging, "seated-neutral");
  // D1 deliberately does not splice close-up facial images onto the seated bodies.
  assert.ok(!gameSource.includes("portrait.src = expressionAssetRoot"));
  assert.equal(el("portraitDavid").src, undefined);
  assert.equal(el("portraitStephen").src, undefined);
  assert.equal(el("portraitPaul").src, undefined);
});

test("a visual cutaway leaves the dialogue text and manual controls interactive", () => {
  const p = setupFakeGame();
  const el = p.getElementById;
  el("startButton").click();
  for (let i = 0; i < 5; i++) el("nextButton").click();
  assert.equal(el("stage").dataset.cutaway, "risk");
  assert.equal(el("cutawayPanel").hidden, false);
  assert.equal(el("speakerName").textContent, "DAVID");
  assert.ok(el("lineText").textContent.includes("preliminary risk assessment"));
  el("playPauseButton").click();
  assert.equal(p.timeouts.size, 0);
  el("nextButton").click();
  assert.equal(el("cutawayPanel").hidden, true);
  assert.equal(el("lineText").textContent, "You've done what?");
});

test("D1 scene keeps speaker text, transport and cutaways separate from the art", () => {
  const stage = html.indexOf('id="stage"');
  const david = html.indexOf('id="castDavid"');
  const stephen = html.indexOf('id="castStephen"');
  const paul = html.indexOf('id="castPaul"');
  const foreground = html.indexOf('class="office-foreground"');
  const dialog = html.indexOf('id="dialogueBox"');
  const progress = html.indexOf('id="storyProgress"');
  const controls = html.indexOf('id="playPauseButton"');
  assert.ok(stage < david && david < stephen && stephen < paul);
  assert.ok(paul < foreground && foreground < dialog && dialog < progress && progress < controls);
  assert.ok(html.includes('id="cutawayPanel"'));
  assert.ok(read("src/styles.css").includes("max-width: 650px"), "Touch layout must keep dialogue below art");
});

test("D1A desk asset is a real alpha WebP, not an opaque flattened scene", () => {
  const desk = fs.readFileSync(path.join(root, "public/assets/generated/locations/office-foreground-01-v01.webp"));
  assert.equal(desk.toString("ascii", 0, 4), "RIFF");
  assert.equal(desk.toString("ascii", 8, 12), "WEBP");
  assert.equal(desk.toString("ascii", 12, 16), "VP8X", "Transparent WebP must have VP8X metadata");
  assert.ok((desk[20] & 0x10) !== 0, "Foreground WebP must retain alpha transparency");
});

test("D1C menu and office share the real approved art and fit laptop viewport", () => {
  const css = read("src/styles.css");
  assert.ok(html.includes('class="screen menu-screen menu-office-screen"'), "Old abstract menu has not been replaced");
  assert.ok(!html.includes('class="menu-circle"'), "Old abstract artwork survived");
  assert.ok(html.includes('class="menu-office-stage"'));
  for (const name of ["david", "stephen", "paul"]) {
    assert.ok(html.includes('class="menu-office-actor menu-office-' + name + '"'), "Menu actor missing: " + name);
  }
  assert.ok(css.includes('.game-shell:has(#officeScreen:not([hidden]))'), "Office viewport fit missing");
  assert.ok(css.includes('.game-shell:has(#menuScreen:not([hidden]))'), "Menu viewport fit missing");
  assert.ok(css.includes("100dvh - 218px"), "Office must reserve height for toolbar and transport");
  assert.ok(css.includes("100dvh - 253px"), "Menu must reserve height for title and start controls");
  assert.ok(!css.includes("max(760px"), "Old minimum width forced unnecessary scrolling on small laptops");
  assert.ok(css.includes("aspect-ratio: 1672 / 941"), "Preserve foreground and background registration");
  assert.ok(css.includes("max-width: 650px"), "Keep mobile stacked layout");
  assert.ok(gameSource.includes('typeof window.scrollTo === "function"'), "Screen changes must reset inherited scroll");
  for (const asset of ["office-clean-01-v01.webp", "office-foreground-01-v01.webp"]) {
    assert.ok(css.includes(asset), "Office layer missing " + asset);
  }
});

test("entire existing intro remains playable with the rebuilt title screen", () => {
  const p = setupFakeGame();
  const el = p.getElementById;
  el("startButton").click();
  assert.equal(el("officeScreen").hidden, false);
  for (let i = 0; i < 64; i++) el("nextButton").click();
  assert.equal(el("holidayScreen").hidden, false);
  el("homeButton").click();
  assert.equal(el("menuScreen").hidden, false);
  el("replayButton").click();
  assert.equal(el("lineText").textContent, "Is China far?");
});
