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

test("cinematic cast starts with approved individual neutral portraits and has fallback", () => {
  for (const character of ["stephen", "david", "paul"]) {
    assert.ok(html.includes("public/assets/generated/characters/expressions/" + character + "-neutral.webp"));
  }
  for (const filename of ["stephen-martin-baseline.webp", "david-baseline.webp", "paul-baseline.webp"]) {
    assert.ok(gameSource.includes("public/assets/generated/characters/" + filename));
  }
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

test("approved portrait files change for both speakers and listening characters", () => {
  const p = setupFakeGame();
  const el = p.getElementById;
  el("startButton").click();
  assert.ok(el("portraitPaul").src.endsWith("/paul-blank.webp"), "Paul starts with deadpan reaction");
  assert.ok(el("portraitStephen").src.endsWith("/stephen-amused.webp"), "Stephen reacts as listener");
  // O02 begins after four beats in O01. David enters with a serious assessment.
  for (let i = 0; i < 5; i++) el("nextButton").click();
  assert.ok(el("portraitDavid").src.endsWith("/david-confident.webp"));
  assert.ok(el("portraitStephen").src.endsWith("/stephen-confused.webp"));
  assert.ok(el("portraitPaul").src.endsWith("/paul-blank.webp"));
  assert.equal(el("castDavid").dataset.expression, "confident");
  assert.equal(el("castStephen").dataset.expression, "confused");
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
