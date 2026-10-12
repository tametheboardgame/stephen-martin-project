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
  // Stephen is intentionally the ONLY seated character whose single img
  // source switches; David and Paul stay as the approved neutral sprites.
  assert.match(el("portraitStephen").src, /stephen-office-seated-confused-v01\.webp\?v=1$/);
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
  assert.ok(css.includes("177.68dvh - 128px"), "Cinematic office must size from viewport height with minimal transport reserve");
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

test("D1D cinematic office fills laptop screen and keeps controls in-stage", () => {
  const css = read("src/styles.css");
  assert.ok(css.includes("GAME-SP1.1-D1D: cinematic viewport composition"));
  assert.ok(css.includes("position: absolute;\n    z-index: 20"), "Scene toolbar must overlay the artwork");
  assert.ok(css.includes("body:has(#officeScreen:not([hidden])) .topbar"), "Old global header must be hidden during office scene");
  assert.ok(css.includes("1672px"), "Stage should grow toward its native resolution");
  assert.ok(css.includes("177.68dvh - 128px"), "Use safe viewport arithmetic for image aspect ratio");
  assert.ok(html.includes('id="sceneSoundButton"'), "Sound remains accessible when global header is hidden");
  assert.ok(gameSource.includes('["soundButton", "sceneSoundButton", "menuSoundButton"]'), "All three sound controls must stay synchronised");
});

test("D1D floating risk graphic never covers Paul's face between cutaways", () => {
  const p = setupFakeGame();
  const el = p.getElementById;
  el("startButton").click();
  for (let i = 0; i < 7; i++) el("nextButton").click();
  // O02/line 3 is Stephen's response, not the dedicated risk cutaway.
  assert.equal(el("stage").dataset.cutaway, "none");
  assert.equal(el("sceneEffect").innerHTML, "");
  assert.equal(el("cutawayPanel").hidden, true);
  el("backButton").click();
  el("backButton").click();
  assert.equal(el("stage").dataset.cutaway, "risk");
  assert.equal(el("cutawayPanel").hidden, false);
  assert.ok(el("cutawayContent").innerHTML.includes("UNREASONABLY HIGH"));
});

test("D1D stage sound button toggles sound from the overlay toolbar", () => {
  const p = setupFakeGame();
  const el = p.getElementById;
  el("startButton").click();
  el("sceneSoundButton").click();
  assert.equal(el("sceneSoundButton").textContent, "Sound: On");
  assert.equal(el("soundButton").textContent, "Sound: On");
  el("soundButton").click();
  assert.equal(el("sceneSoundButton").textContent, "Sound: Off");
});

test("D1E menu overlays real office art, not three stacked page sections", () => {
  const css = read("src/styles.css");
  const menuStart = html.indexOf('id="menuScreen"');
  const menuEnd = html.indexOf('id="officeScreen"', menuStart);
  const menu = html.slice(menuStart, menuEnd);
  assert.ok(menu.includes('class="menu-office-art"'), "Approved scenery should be one contained layer");
  assert.ok(menu.includes('class="menu-hero-title"'), "Menu needs a floating title");
  assert.ok(menu.includes('class="menu-hero-tagline"'), "Subtitle must sit on the desk, away from faces");
  assert.ok(menu.includes('class="menu-hero-actions"'), "Start/Continue must be in a floating desk panel");
  assert.ok(menu.includes('id="menuSoundButton"'), "Sound control must be reachable when old topbar is hidden");
  assert.ok(!menu.includes('class="menu-office-heading"'), "Old stacked heading should be removed");
  assert.ok(!menu.includes('class="menu-office-transport"'), "Old stacked bottom transport should be removed");
  assert.ok(menu.indexOf('menu-office-art') < menu.indexOf('menu-hero-title'));
  assert.ok(menu.indexOf('menu-hero-title') < menu.indexOf('menu-hero-actions'));
  assert.ok(css.includes('body:has(#menuScreen:not([hidden])) .topbar'), "Global topbar must be hidden in hero mode");
  assert.ok(css.includes('#menuScreen .menu-office-stage'), "Layered hero stage must exist");
  assert.ok(css.includes('177.68dvh - 25px'), "Hero must fit laptop viewport height");
  assert.ok(css.includes('#menuScreen .menu-hero-buttons .btn'), "Menu buttons must remain usable");
  assert.ok(css.includes('@media (max-width: 650px)'), "Touch layout must keep controls outside the art");
});

test("D1E floating sound control remains in sync across menu and office", () => {
  const p = setupFakeGame();
  const el = p.getElementById;
  el("menuSoundButton").click();
  for (const id of ["menuSoundButton", "sceneSoundButton", "soundButton"]) {
    assert.equal(el(id).textContent, "Sound: On");
    assert.equal(el(id).attributes["aria-pressed"], "true");
  }
  el("startButton").click();
  el("sceneSoundButton").click();
  for (const id of ["menuSoundButton", "sceneSoundButton", "soundButton"]) {
    assert.equal(el(id).textContent, "Sound: Off");
  }
  el("homeButton").click();
  assert.equal(el("menuScreen").hidden, false);
});

test("D1E start and saved-game continuation work from floating action panel", () => {
  const p = setupFakeGame();
  const el = p.getElementById;
  assert.equal(el("resumeButton").hidden, true);
  el("startButton").click();
  el("nextButton").click();
  assert.equal(el("lineText").textContent, "Quite.");
  el("homeButton").click();
  assert.equal(el("resumeButton").hidden, false);
  el("resumeButton").click();
  assert.equal(el("officeScreen").hidden, false);
  assert.equal(el("lineText").textContent, "Quite.");
});


test("D2 Stephen Neutral, Amused, Confused, Annoyed and Exasperated preserve alpha and canvas registration", () => {
  const sourceRoot = "public/assets/generated/characters/";
  const getWebpDimensions = (relative) => {
    const bytes = fs.readFileSync(path.join(root, relative));
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
    assert.equal(bytes.toString("ascii", 8, 16), "WEBPVP8X");
    assert.ok((bytes[20] & 0x10) !== 0, "Transparent WebP alpha required: " + relative);
    return [bytes.readUIntLE(24, 3) + 1, bytes.readUIntLE(27, 3) + 1];
  };
  const neutralPath = sourceRoot + "stephen-office-seated-neutral-v01.webp";
  const amusedPath = sourceRoot + "stephen-office-seated-amused-v01.webp";
  const confusedPath = sourceRoot + "stephen-office-seated-confused-v01.webp";
  const annoyedPath = sourceRoot + "stephen-office-seated-annoyed-v01.webp";
  const exasperatedPath = sourceRoot + "stephen-office-seated-exasperated-v01.webp";
  assert.deepEqual(getWebpDimensions(neutralPath), [1086, 1448]);
  assert.deepEqual(getWebpDimensions(amusedPath), [1086, 1448]);
  assert.deepEqual(getWebpDimensions(confusedPath), [1086, 1448]);
  assert.deepEqual(getWebpDimensions(annoyedPath), [1086, 1448]);
  assert.deepEqual(getWebpDimensions(exasperatedPath), [1086, 1448]);
  assert.ok(read("scripts/build.mjs").includes("stephen-office-seated-exasperated-v01.webp"));
  assert.ok(read("scripts/build.mjs").includes("stephen-office-seated-annoyed-v01.webp"));
  assert.ok(read("scripts/build.mjs").includes("stephen-office-seated-confused-v01.webp"));

  // One transparent whole-body sprite at a time, not stacked silhouettes.
  const stephenStage = html.slice(html.indexOf('id="castStephen"'), html.indexOf('id="castPaul"'));
  assert.equal((stephenStage.match(/<img /g) || []).length, 1);
  assert.ok(stephenStage.includes('id="portraitStephen"'));
  assert.ok(!html.includes('id="portraitStephenAmused"'));
  assert.ok(html.includes("stephen-office-seated-amused-v01.webp?v=3"));
  assert.ok(html.includes("stephen-office-seated-confused-v01.webp?v=1"));
  assert.ok(html.includes("stephen-office-seated-annoyed-v01.webp?v=1"));
  assert.ok(html.includes("stephen-office-seated-exasperated-v01.webp?v=3"));
  const amusedManifest = JSON.parse(read("generated-assets/manifests/stephen-office-seated-amused-v01.json"));
  assert.equal(amusedManifest.revision, 2);
  assert.equal(amusedManifest.expectedSourceName, "stephen-office-seated-amused-d2-v03.png");
  assert.equal(amusedManifest.destination, amusedPath);
  const confusedManifest = JSON.parse(read("generated-assets/manifests/stephen-office-seated-confused-v01.json"));
  assert.equal(confusedManifest.revision, 1);
  assert.equal(confusedManifest.expectedSourceName, "stephen-office-seated-confused-d2-v01.png");
  assert.equal(confusedManifest.destination, confusedPath);
  const annoyedManifest = JSON.parse(read("generated-assets/manifests/stephen-office-seated-annoyed-v01.json"));
  assert.equal(annoyedManifest.revision, 1);
  assert.equal(annoyedManifest.expectedSourceName, "stephen-office-seated-annoyed-d2-v01.png");
  assert.equal(annoyedManifest.destination, annoyedPath);
  const exasperatedManifest = JSON.parse(read("generated-assets/manifests/stephen-office-seated-exasperated-v01.json"));
  assert.equal(exasperatedManifest.revision, 1);
  assert.equal(exasperatedManifest.expectedSourceName, "stephen-office-seated-exasperated-d2-v03.png");
  assert.equal(exasperatedManifest.destination, exasperatedPath);
  const css = read("src/styles.css");
  assert.ok(css.includes('#officeScreen .cast-seated #castStephen #portraitStephen'));
  assert.ok(!css.includes("#portraitStephenAmused"));
  assert.ok(!css.includes("transition: opacity 140ms"));
  assert.ok(gameSource.includes('portrait.src = stephenSeatedSources[sprite]'));
});

test("D2 Stephen dialogue cues select Amused, Confused and Annoyed with safe fallback", () => {
  const p = setupFakeGame();
  const el = p.getElementById;
  el("startButton").click();
  assert.equal(el("castStephen").dataset.expression, "amused");
  assert.equal(el("castStephen").dataset.seatedSprite, "amused");
  assert.match(el("portraitStephen").src, /amused-v01\.webp\?v=3$/);
  el("nextButton").click(); // O01:1 Stephen: Quite
  assert.equal(el("castStephen").dataset.seatedSprite, "amused");
  el("nextButton").click(); // O01:2 Paul: Right
  assert.equal(el("castStephen").dataset.expression, "confused");
  assert.equal(el("castStephen").dataset.seatedSprite, "confused");
  assert.match(el("portraitStephen").src, /confused-v01\.webp\?v=1$/);
  el("backButton").click();
  assert.equal(el("castStephen").dataset.seatedSprite, "amused");
  // O02 has annoyed cues. The new whole-body pose replaces the old sprite.
  for (let i = 0; i < 6; i++) el("nextButton").click();
  assert.equal(el("castStephen").dataset.expression, "annoyed");
  assert.equal(el("castStephen").dataset.seatedSprite, "annoyed");
  assert.match(el("portraitStephen").src, /annoyed-v01\.webp\?v=1$/);
  assert.equal(el("castDavid").dataset.staging, "seated-neutral");
  assert.equal(el("castPaul").dataset.staging, "seated-neutral");
});


test("D2 Exasperated cues occur at five story-appropriate beats, with fallback remaining neutral", () => {
  const window = { SMP_OFFICE_SHOTS: loadShots() };
  vm.runInNewContext(reactionSource, { window }, { timeout: 1000 });
  const cues = window.SMP_REACTIONS;
  const expected = ["O02:8", "O04:7", "O05:3", "O05:8", "O06:5"];
  assert.deepEqual(
    Object.entries(cues).flatMap(([shot, beats]) =>
      Object.entries(beats).filter(([, reactions]) => reactions.Stephen === "exasperated")
        .map(([index]) => shot + ":" + index)
    ),
    expected
  );
  const p = setupFakeGame();
  const el = p.getElementById;
  const shots = loadShots();
  el("startButton").click();
  let covered = 0;
  let checkedFallback = 0;
  for (const shot of shots) {
    for (let i = 0; i < shot.lines.length; i++) {
      const actualCue = cues[shot.id]?.[i]?.Stephen ||
        (shot.lines[i].speaker === "Stephen" ? shot.lines[i].expression || "neutral" : "neutral");
      if (actualCue === "exasperated") {
        assert.equal(el("castStephen").dataset.expression, "exasperated", shot.id + ":" + i);
        assert.equal(el("castStephen").dataset.seatedSprite, "exasperated", shot.id + ":" + i);
        assert.match(el("portraitStephen").src, /exasperated-v01\.webp\?v=3$/);
        covered++;
      } else if (actualCue === "concerned" || actualCue === "laughing") {
        assert.equal(el("castStephen").dataset.seatedSprite, "neutral", shot.id + ":" + i);
        checkedFallback++;
      }
      el("nextButton").click();
    }
  }
  assert.equal(covered, 5);
  assert.ok(checkedFallback >= 1, "Incomplete future expressions should still use Neutral");
  assert.equal(el("holidayScreen").hidden, false, "Office sequence must remain playable");
});

test("D2 proof cycles Auto Neutral Amused Confused Annoyed Exasperated without changing dialogue or autoplay", () => {
  const p = setupFakeGame();
  const el = p.getElementById;
  el("startButton").click(); // O01:0 naturally amused
  const initialText = el("lineText").textContent;
  const pendingTimers = p.timeouts.size;
  assert.equal(el("castStephen").dataset.seatedSprite, "amused");
  el("stephenProofButton").click();
  assert.equal(el("castStephen").dataset.seatedSprite, "neutral");
  assert.match(el("portraitStephen").src, /stephen-office-seated-neutral-v01\.webp$/);
  el("stephenProofButton").click();
  assert.equal(el("castStephen").dataset.seatedSprite, "amused");
  el("stephenProofButton").click();
  assert.equal(el("castStephen").dataset.seatedSprite, "confused");
  assert.match(el("portraitStephen").src, /confused-v01\.webp\?v=1$/);
  assert.match(el("stephenProofButton").attributes["aria-label"], /Confused/);
  el("stephenProofButton").click();
  assert.equal(el("castStephen").dataset.seatedSprite, "annoyed");
  assert.match(el("portraitStephen").src, /annoyed-v01\.webp\?v=1$/);
  assert.match(el("stephenProofButton").attributes["aria-label"], /Annoyed/);
  el("stephenProofButton").click();
  assert.equal(el("castStephen").dataset.seatedSprite, "exasperated");
  assert.match(el("portraitStephen").src, /exasperated-v01\.webp\?v=3$/);
  assert.match(el("stephenProofButton").attributes["aria-label"], /Exasperated/);
  el("stephenProofButton").click();
  assert.equal(el("castStephen").dataset.seatedSprite, "amused"); // back to Auto
  assert.match(el("stephenProofButton").textContent, /Auto/);
  assert.equal(el("lineText").textContent, initialText);
  assert.equal(p.timeouts.size, pendingTimers);
  assert.equal(el("playPauseButton").attributes["aria-pressed"], "true");

  // Manual forced emotion overrides auto reactions across subsequent beats.
  el("stephenProofButton").click(); // neutral
  el("stephenProofButton").click(); // amused
  el("stephenProofButton").click(); // confused
  el("stephenProofButton").click(); // annoyed
  el("stephenProofButton").click(); // exasperated
  el("nextButton").click();
  assert.equal(el("castStephen").dataset.expression, "amused");
  assert.equal(el("castStephen").dataset.seatedSprite, "exasperated");
  el("stephenProofButton").click(); // Auto
  assert.equal(el("castStephen").dataset.seatedSprite, "amused");
});
