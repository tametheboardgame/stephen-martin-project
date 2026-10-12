/* GAME-SP1: tiny dependency-free office cutscene player.
   Approved artwork: public/assets/generated/characters/*.webp
   No network calls, tracking, login, or third-party services. */
(function () {
  "use strict";

  const shots = window.SMP_OFFICE_SHOTS;
  if (!Array.isArray(shots) || shots.length !== 7) {
    document.body.textContent = "The opening scene could not load. Please refresh.";
    return;
  }

  const $ = (id) => document.getElementById(id);
  const STORE_KEY = "stephen-martin-game-sp1-save-v1";
  const shotLineCounts = shots.map((shot) => shot.lines.length);
  const totalLines = shotLineCounts.reduce((sum, n) => sum + n, 0);
  const screens = { menu: $("menuScreen"), office: $("officeScreen"), holiday: $("holidayScreen") };
  const cast = { Stephen: $("castStephen"), David: $("castDavid"), Paul: $("castPaul") };

  let soundEnabled = false;
  let audioContext = null;
  let state = { version: 1, scene: "menu", shotIndex: 0, lineIndex: 0, openingSeen: false };

  // All snippets below are our own fictional UI props. No user-entered HTML.
  const effects = {
    suitcase: '<div class="effect-tag">✈ TWO WEEKS OFF</div>',
    risk: '<div class="effect-paper"><small>CLASSIFIED*　*not actually</small><strong>OPERATION:<br>PROBABLY FINE</strong><span>THREAT LEVEL</span><b>HIGH RISK</b></div>',
    laptop: '<div class="effect-tag">A VERY PARTICULAR SET OF IT SKILLS</div>',
    bear: '<div class="effect-bear" aria-label="Illustrated bear sticker">🐻<span>🍯</span></div><span class="effect-caption">NO MORE BEARS, PAUL.</span>',
    chat: '<div class="effect-chat"><span>✉ NEW GROUP</span><strong>STEPHEN RESCUE GROUP</strong><small>(PRE-EMPTIVE)</small></div>',
    music: '<div class="effect-music"><span>♫ ♪ ♫</span><strong>THE OPTIMISTIC VERSION</strong></div>',
    title: '<div class="effect-title"><span>RESCUE</span><strong>STEPHEN MARTIN</strong><span>FROM CHINA</span><small>Two colleagues. Zero training. One completely avoidable situation.</small></div>'
  };

  function readSave() {
    try {
      const data = JSON.parse(window.localStorage.getItem(STORE_KEY) || "null");
      if (!data || data.version !== 1 || !["office", "holiday"].includes(data.scene)) return null;
      if (!Number.isInteger(data.shotIndex) || data.shotIndex < 0 || data.shotIndex >= shots.length) return null;
      if (!Number.isInteger(data.lineIndex) || data.lineIndex < 0 || data.lineIndex >= shots[data.shotIndex].lines.length) return null;
      return data;
    } catch (_) {
      return null;
    }
  }

  function persist() {
    try { window.localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
    catch (_) { /* Storage denied: the scene remains fully playable. */ }
    $("resumeButton").hidden = !readSave();
  }

  function reveal(screenName) {
    for (const [name, screen] of Object.entries(screens)) screen.hidden = name !== screenName;
  }

  function setSound(enabled) {
    soundEnabled = enabled;
    $("soundButton").textContent = enabled ? "Sound: On" : "Sound: Off";
    $("soundButton").setAttribute("aria-pressed", String(enabled));
  }

  function beep(note = "ping") {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioContext) audioContext = new AudioContextClass();
      if (audioContext.state === "suspended") void audioContext.resume();
      const notes = note === "song" ? [392, 440, 330, 523] : note === "printer" ? [115, 145] : note === "sting" ? [196, 294, 392] : [740];
      notes.forEach((frequency, i) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const start = audioContext.currentTime + i * (note === "song" ? 0.16 : 0.09);
        oscillator.type = note === "printer" ? "square" : "triangle";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.045, start + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.14);
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start(start);
        oscillator.stop(start + 0.15);
      });
    } catch (_) {
      // Audio is decorative. Browser/device sound limitations should never block the story.
    }
  }

  function completedLineCount() {
    return shotLineCounts.slice(0, state.shotIndex).reduce((sum, n) => sum + n, 0) + state.lineIndex + 1;
  }

  function renderOffice() {
    reveal("office");
    const shot = shots[state.shotIndex];
    const beat = shot.lines[state.lineIndex];
    const prop = beat.prop || shot.prop;
    const current = completedLineCount();
    const percent = Math.round((current / totalLines) * 100);

    $("sceneNumber").textContent = "SCENE " + String(state.shotIndex + 1).padStart(2, "0") + " / 07";
    $("sceneTitle").textContent = shot.label;
    $("sceneCaption").textContent = shot.caption;
    $("speakerName").textContent = beat.speaker === "System" ? "NOTIFICATION" : beat.speaker.toUpperCase();
    $("lineCount").textContent = String(state.lineIndex + 1).padStart(2, "0") + " / " + String(shot.lines.length).padStart(2, "0");
    $("lineText").textContent = beat.text;
    $("sceneEffect").innerHTML = effects[prop] || "";
    $("stage").dataset.moment = shot.moment;
    $("stage").dataset.prop = prop;
    $("stage").dataset.expression = beat.expression || "neutral";
    $("progressFill").style.width = percent + "%";
    $("storyProgress").setAttribute("aria-valuenow", String(percent));
    $("backButton").disabled = state.shotIndex === 0 && state.lineIndex === 0;
    $("nextButton").innerHTML = (state.shotIndex === shots.length - 1 && state.lineIndex === shot.lines.length - 1)
      ? 'See Stephen’s holiday <span aria-hidden="true">→</span>'
      : 'Next <span aria-hidden="true">→</span>';

    for (const [name, el] of Object.entries(cast)) {
      const active = beat.speaker === name;
      el.classList.toggle("is-speaking", active);
      el.classList.toggle("is-listening", beat.speaker in cast && !active);
    }
    persist();
    if (beat.sound) beep(beat.sound);
  }

  function startOffice() {
    state = { version: 1, scene: "office", shotIndex: 0, lineIndex: 0, openingSeen: false };
    renderOffice();
  }

  function next() {
    if (screens.office.hidden) return;
    const currentShot = shots[state.shotIndex];
    if (state.lineIndex < currentShot.lines.length - 1) {
      state.lineIndex++;
    } else if (state.shotIndex < shots.length - 1) {
      state.shotIndex++;
      state.lineIndex = 0;
    } else {
      showHoliday();
      return;
    }
    renderOffice();
  }

  function previous() {
    if (screens.office.hidden) return;
    if (state.lineIndex > 0) {
      state.lineIndex--;
    } else if (state.shotIndex > 0) {
      state.shotIndex--;
      state.lineIndex = shots[state.shotIndex].lines.length - 1;
    } else {
      return;
    }
    renderOffice();
  }

  function showHoliday() {
    state.scene = "holiday";
    state.openingSeen = true;
    state.shotIndex = shots.length - 1;
    state.lineIndex = shots[shots.length - 1].lines.length - 1;
    reveal("holiday");
    persist();
  }

  function showMenu() {
    reveal("menu");
    $("resumeButton").hidden = !readSave();
  }

  function resume() {
    const saved = readSave();
    if (!saved) { startOffice(); return; }
    state = saved;
    if (state.scene === "holiday") showHoliday();
    else renderOffice();
  }

  $("startButton").addEventListener("click", startOffice);
  $("resumeButton").addEventListener("click", resume);
  $("nextButton").addEventListener("click", next);
  $("backButton").addEventListener("click", previous);
  $("skipButton").addEventListener("click", showHoliday);
  $("restartButton").addEventListener("click", startOffice);
  $("replayButton").addEventListener("click", startOffice);
  $("homeButton").addEventListener("click", showMenu);
  $("soundButton").addEventListener("click", () => setSound(!soundEnabled));
  $("dialogueBox").addEventListener("click", (event) => {
    if (!event.target.closest("button")) next();
  });

  document.addEventListener("keydown", (event) => {
    if (screens.office.hidden || event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target instanceof HTMLElement && event.target.closest("button, input, textarea, select, a")) return;
    if (event.key === " " || event.key === "Enter" || event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }
  });

  setSound(false);
  showMenu();
})();
