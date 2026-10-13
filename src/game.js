/* GAME-SP1: tiny dependency-free office cutscene player.
   Approved artwork: public/assets/generated/characters/*.webp
   No network calls, tracking, login, or third-party services. */
(function () {
  "use strict";

  const shots = window.SMP_OFFICE_SHOTS;
  if (!Array.isArray(shots) || shots.length !== 8 || shots[0].id !== "O00") {
    document.body.textContent = "The opening scene could not load. Please refresh.";
    return;
  }

  const $ = (id) => document.getElementById(id);
  const STORE_KEY = "stephen-martin-game-sp1-save-v1";
  const shotLineCounts = shots.map((shot) => shot.lines.length);
  const totalLines = shotLineCounts.reduce((sum, n) => sum + n, 0);
  const screens = { menu: $("menuScreen"), office: $("officeScreen"), holiday: $("holidayScreen") };
  const cast = { Stephen: $("castStephen"), David: $("castDavid"), Paul: $("castPaul") };
  // D2 proof-only control: the approved neutral/amused image pair shares one
  // canvas; the toggle allows owner A/B checks without restarting the story.
  const proofModes = ["auto", "neutral", "amused", "confused", "annoyed", "exasperated", "laughing"];
  let stephenProofMode = "auto";

  const stephenSeatedSources = {
    neutral: "./public/assets/generated/characters/stephen-office-seated-neutral-v01.webp",
    amused: "./public/assets/generated/characters/stephen-office-seated-amused-v01.webp?v=3",
    confused: "./public/assets/generated/characters/stephen-office-seated-confused-v01.webp?v=1",
    annoyed: "./public/assets/generated/characters/stephen-office-seated-annoyed-v01.webp?v=1",
    exasperated: "./public/assets/generated/characters/stephen-office-seated-exasperated-v01.webp?v=3",
    laughing: "./public/assets/generated/characters/stephen-office-seated-laughing-v01.webp?v=1"
  };

  // Approved seated art: one complete transparent sprite per person.
  // David/Paul start with their existing neutral assets; add future approved
  // expressions to their maps without changing renderOffice or stacking images.
  const seatedExpressionSources = {
    Stephen: stephenSeatedSources,
    David: {
      neutral: "./public/assets/generated/characters/david-office-seated-neutral-v01.webp"
    },
    Paul: {
      neutral: "./public/assets/generated/characters/paul-office-seated-neutral-v01.webp"
    }
  };

  function applySeatedExpression(name) {
    const sources = seatedExpressionSources[name];
    const reaction = cast[name].dataset.expression || "neutral";
    const requested = name === "Stephen" && stephenProofMode !== "auto" ? stephenProofMode : reaction;
    // The dialogue already carries reactions for all three people. Until the
    // corresponding whole-body art is approved, keep the original neutral body.
    const sprite = Object.hasOwn(sources, requested) ? requested : "neutral";
    const portrait = $("portrait" + name);
    if (portrait.dataset.sprite !== sprite) {
      // Change one image src, never crossfade two translucent silhouettes.
      portrait.src = sources[sprite];
      portrait.dataset.sprite = sprite;
    }
    cast[name].dataset.seatedSprite = sprite;
    cast[name].dataset.staging = name === "Stephen" || sprite !== "neutral"
      ? "seated-expression-proof" : "seated-neutral";
  }

  function applyStephenSeatedExpression() {
    // The Stephen-only comparison button must not reset David or Paul.
    applySeatedExpression("Stephen");
  }

  function cycleStephenProof() {
    stephenProofMode = proofModes[(proofModes.indexOf(stephenProofMode) + 1) % proofModes.length];
    const label = stephenProofMode[0].toUpperCase() + stephenProofMode.slice(1);
    const button = $("stephenProofButton");
    button.textContent = "Stephen: " + label + " ↻";
    button.setAttribute("aria-label", "Stephen expression preview: " + label + ". Click to cycle Auto, Neutral, Amused, Confused, Annoyed, Exasperated and Laughing");
    // Never render a fresh dialogue beat or restart the autoplay timer just
    // because the user is comparing images.
    applyStephenSeatedExpression();
  }

  let autoPlaying = true;
  let advanceTimer = null;
  const MIN_LINE_MS = 2200;
  const MAX_LINE_MS = 5800;

  function clearAdvanceTimer() {
    if (advanceTimer !== null) {
      clearTimeout(advanceTimer);
      advanceTimer = null;
    }
  }

  function lineDuration(beat) {
    const plainTextLength = beat.text.length;
    const calculated = Math.min(MAX_LINE_MS, Math.max(MIN_LINE_MS, 1800 + plainTextLength * 45));
    if (beat.sound === "song") return 6000;
    if (beat.prop === "title") return Math.max(4800, calculated);
    if (beat.speaker === "Narrator") return Math.max(3200, calculated);
    return calculated;
  }

  function syncPlaybackControls() {
    const button = $("playPauseButton");
    button.textContent = autoPlaying ? "Ⅱ Pause" : "▶ Play";
    button.setAttribute("aria-pressed", String(autoPlaying));
    $("playbackStatus").textContent = autoPlaying ? "AUTO PLAYING · TAP PAUSE TO READ" : "PAUSED · USE NEXT / BACK";
    $("officeScreen").dataset.playback = autoPlaying ? "auto" : "paused";
  }

  function scheduleAdvance() {
    clearAdvanceTimer();
    syncPlaybackControls();
    if (!autoPlaying || screens.office.hidden || document.hidden) return;
    const beat = shots[state.shotIndex].lines[state.lineIndex];
    advanceTimer = setTimeout(() => {
      advanceTimer = null;
      if (autoPlaying && !screens.office.hidden && !document.hidden) next();
    }, lineDuration(beat));
  }

  function setAutoplay(enabled) {
    autoPlaying = Boolean(enabled);
    scheduleAdvance();
  }

  let soundEnabled = false;
  let audioContext = null;
  let state = { version: 2, scene: "menu", shotIndex: 0, lineIndex: 0, openingSeen: false };

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
      if (!data || !["office", "holiday"].includes(data.scene)) return null;
      // The new exterior is scene 0. Preserve saves from the approved seven-shot
      // office cutscene by shifting their indexes forward exactly once.
      if (data.version === 1 && Number.isInteger(data.shotIndex) &&
          data.shotIndex >= 0 && data.shotIndex < shots.length - 1) {
        data.shotIndex += 1;
        data.version = 2;
      }
      if (data.version !== 2) return null;
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
    if (screenName !== "office") clearAdvanceTimer();
    const entering = screens[screenName].hidden;
    for (const [name, screen] of Object.entries(screens)) screen.hidden = name !== screenName;
    // Starting on a scrolled menu used to leave the office scene's toolbar
    // outside the visible laptop viewport. Reset only on actual screen changes,
    // not on every spoken line, Back, or Next.
    if (entering && typeof window.scrollTo === "function") window.scrollTo(0, 0);
  }

  function setSound(enabled) {
    soundEnabled = enabled;
    for (const id of ["soundButton", "sceneSoundButton", "menuSoundButton"]) {
      const button = $(id);
      button.textContent = enabled ? "Sound: On" : "Sound: Off";
      button.setAttribute("aria-pressed", String(enabled));
    }
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

  const cutaways = {
    risk: '<div class="cutaway-heading">DAVID’S LAPTOP · TOP SECRET*</div><div class="cutaway-laptop"><div class="cutaway-screen"><span>OPERATION:</span><strong>PROBABLY FINE</strong><div class="cutaway-risk-grid"><span>INTERNATIONAL TRAVEL</span><b>HIGH RISK</b><span>HOLIDAY ROMANCE</span><b>HIGH RISK</b><span>DAVID’S CONFIDENCE</span><b>UNREASONABLY HIGH</b></div><small>*NOT ACTUALLY SECRET</small></div><div class="cutaway-keyboard"></div></div>',
    printer: '<div class="cutaway-heading">OFFICE PRINTER · 40 DOCUMENTS QUEUED</div><div class="cutaway-printer"><div class="cutaway-output-sheet sheet-one">🐻<small>HONEY BEAR #01</small></div><div class="cutaway-output-sheet sheet-two">🐻<small>HONEY BEAR #02</small></div><div class="cutaway-printer-body"><span>PRINTING…</span><span class="printer-light"></span></div><div class="cutaway-paper-stack">▤ ▤ ▤</div></div>',
    chat: '<div class="cutaway-heading">A COMPLETELY UNNECESSARY GROUP CHAT</div><div class="cutaway-phone"><div class="phone-notch"></div><div class="phone-screen"><small>NEW GROUP CREATED ✓</small><strong>STEPHEN RESCUE GROUP</strong><span>(PRE-EMPTIVE)</span><div class="phone-avatars">S　D　P</div><div class="phone-message">🐻🍯<span>Paul: added a picture</span></div></div></div>'
  };

  function cutawayFor(shotIndex, lineIndex) {
    const shotId = shots[shotIndex].id;
    if (shotId === "O02" && (lineIndex === 1 || lineIndex === 8)) return "risk";
    if (shotId === "O04" && lineIndex <= 2) return "printer";
    if (shotId === "O04" && (lineIndex === 6 || lineIndex === 7)) return "chat";
    return null;
  }

  // Approved, individually cropped game portraits. Reaction aliases map the
  // original dialogue cues to the six available facial expressions per person.
  // D1 composition playtest: one human-approved, transparent seated sprite
  // per actor. Keep reaction cues in the scene state for the future D2 pass,
  // but never swap misaligned head-and-shoulder portraits into seated bodies.
  // Static sprite file paths live in index.html for immediate/offline rendering.

  function renderOffice() {
    reveal("office");
    const shot = shots[state.shotIndex];
    const beat = shot.lines[state.lineIndex];
    const prop = beat.prop || shot.prop;
    const current = completedLineCount();
    const percent = Math.round((current / totalLines) * 100);

    $("sceneNumber").textContent = "SCENE " + String(state.shotIndex + 1).padStart(2, "0") + " / " + String(shots.length).padStart(2, "0");
    $("sceneTitle").textContent = shot.label;
    $("sceneCaption").textContent = shot.caption;
    $("speakerName").textContent = beat.speaker === "System" ? "NOTIFICATION" : beat.speaker.toUpperCase();

    $("lineText").textContent = beat.text;
    const cutaway = cutawayFor(state.shotIndex, state.lineIndex);
    $("cutawayPanel").hidden = !cutaway;
    $("cutawayContent").innerHTML = cutaway ? cutaways[cutaway] : "";
    $("stage").dataset.cutaway = cutaway || "none";
    // Paperwork belongs in David's real risk-assessment cutaway.
    // Don't float giant prop graphics over Paul (or any other seated actor).
    // Only the deliberate final-title beat uses a stage-wide effect.
    $("sceneEffect").innerHTML = !cutaway && prop === "title" ? effects.title : "";
    $("stage").dataset.location = shot.id === "O00" ? "exterior" : "interior";
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
      const reactions = (window.SMP_REACTIONS && window.SMP_REACTIONS[shot.id] && window.SMP_REACTIONS[shot.id][state.lineIndex]) || {};
      const expression = reactions[name] || (active ? (beat.expression || "neutral") : "neutral");
      // Cue metadata is preserved for aligned seated expression work in D2.
      el.dataset.expression = expression;
      el.dataset.staging = "seated-neutral";
      // David and Paul remain their approved static-neutral seated sprites.
    }
    for (const name of Object.keys(cast)) applySeatedExpression(name);
    persist();
    if (beat.sound) beep(beat.sound);
    scheduleAdvance();
  }

  function startOffice() {
    clearAdvanceTimer();
    autoPlaying = true;
    state = { version: 2, scene: "office", shotIndex: 0, lineIndex: 0, openingSeen: false };
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
    // A manual rewind should never immediately skip the line the player re-read.
    autoPlaying = false;
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
    clearAdvanceTimer();
    autoPlaying = true;
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
  $("sceneSoundButton").addEventListener("click", () => setSound(!soundEnabled));
  $("menuSoundButton").addEventListener("click", () => setSound(!soundEnabled));
  $("playPauseButton").addEventListener("click", () => setAutoplay(!autoPlaying));
  $("stephenProofButton").addEventListener("click", cycleStephenProof);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      // Pausing on hidden tabs prevents timed dialogue from being skipped while away.
      clearAdvanceTimer();
      autoPlaying = false;
      syncPlaybackControls();
    }
  });
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

  for (const name of Object.keys(cast)) {
    const actor = cast[name];
    const portrait = $("portrait" + name);
    portrait.addEventListener("error", () => {
      // Don't silently insert the old oversized portrait sheets if an asset
      // fails to load; keep the scene and dialogue usable.
      actor.dataset.assetMissing = "true";
      portrait.hidden = true;
    });
  }
  setSound(false);
  showMenu();
})();
