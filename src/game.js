/* GAME-SP1: tiny dependency-free office cutscene player.
   Approved artwork: public/assets/generated/characters/*.webp
   No network calls, tracking, login, or third-party services. */
(function () {
  "use strict";

  const shots = window.SMP_OFFICE_SHOTS;
  if (!Array.isArray(shots) || shots.length !== 2 || shots[0].id !== "O00") {
    document.body.textContent = "The opening scene could not load. Please refresh.";
    return;
  }

  const $ = (id) => document.getElementById(id);
  const STORE_KEY = "stephen-martin-game-sp1-save-v1";
  const beats = shots.flatMap(shot => shot.lines);
  const totalLines = beats.length;
  const beatIndexById = new Map(beats.map((beat, i) => [beat.id, i]));
  const finalBeatId = beats[beats.length - 1].id;
  const screens = { menu: $("menuScreen"), office: $("officeScreen"), holiday: $("holidayScreen") };
  const cast = { Stephen: $("castStephen"), David: $("castDavid"), Paul: $("castPaul") };
  const greatWall = window.SMP_CHINA_WALL;
  const palace = window.SMP_CHINA_PALACE;
  const market = window.SMP_CHINA_MARKET;
  const chinaFinal = window.SMP_CHINA_FINAL;
  const rescueAlarm = window.SMP_RESCUE_ALARM;
  const rescuePortraits = {
    David: {
      serious: "./public/assets/generated/characters/david-office-seated-serious-v01.webp",
      confident: "./public/assets/generated/characters/david-office-seated-confident-v01.webp",
      frustrated: "./public/assets/generated/characters/david-office-seated-frustrated-v01.webp",
      "systems-expert": "./public/assets/generated/characters/david-office-seated-systems-expert-v01.webp"
    },
    Paul: {
      neutral: "./public/assets/generated/characters/paul-office-seated-neutral-v01.webp",
      confused: "./public/assets/generated/characters/paul-office-seated-confused-v01.webp",
      pleased: "./public/assets/generated/characters/paul-office-seated-pleased-v01.webp"
    }
  };
  const validHolidayRoutes = ["cult", "detention", "reassemble"];
  const travelStephenHonoured = "./public/assets/generated/characters/stephen-holiday-forbidden-city-pleased-v01.webp";
  const planLabels = {
    cult: "The Summit",
    detention: "International Cultural Excellence Banquet",
    reassemble: "Total Renewal Spa"
  };
  function bookingName(plan) { return planLabels[plan] || "Nothing booked yet"; }
  // D2 proof-only control: the approved neutral/amused image pair shares one
  // canvas; the toggle allows owner A/B checks without restarting the story.
  const proofModes = ["auto", "neutral", "amused", "confused", "annoyed", "exasperated", "laughing"];
  let stephenProofMode = "auto";
  const davidProofModes = ["auto","neutral","confident","serious","frustrated","shocked","systems-expert"];
  let davidProofMode = "auto";
  const paulProofModes = ["auto", "neutral", "confused", "pleased"];
  let paulProofMode = "auto";

  const stephenSeatedSources = {
    neutral: "./public/assets/generated/characters/stephen-office-seated-neutral-v01.webp",
    amused: "./public/assets/generated/characters/stephen-office-seated-amused-v01.webp?v=3",
    confused: "./public/assets/generated/characters/stephen-office-seated-confused-v01.webp?v=1",
    annoyed: "./public/assets/generated/characters/stephen-office-seated-annoyed-v01.webp?v=1",
    exasperated: "./public/assets/generated/characters/stephen-office-seated-exasperated-v01.webp?v=3",
    laughing: "./public/assets/generated/characters/stephen-office-seated-laughing-v01.webp?v=1"
  };

  // Approved seated art: one complete transparent sprite per person.
  // David's six expressions and Paul's approved Neutral, Confused and Pleased
  // seated assets are registered. Paul's "blank" cue resolves to Neutral.
  const seatedExpressionSources = {
    Stephen: stephenSeatedSources,
    David: {
      neutral: "./public/assets/generated/characters/david-office-seated-neutral-v01.webp",
      confident: "./public/assets/generated/characters/david-office-seated-confident-v01.webp?v=4",
      serious: "./public/assets/generated/characters/david-office-seated-serious-v01.webp?v=1",
      frustrated: "./public/assets/generated/characters/david-office-seated-frustrated-v01.webp?v=1",
      shocked: "./public/assets/generated/characters/david-office-seated-shocked-v01.webp?v=1",
      "systems-expert": "./public/assets/generated/characters/david-office-seated-systems-expert-v01.webp?v=1"
    },
    Paul: {
      neutral: "./public/assets/generated/characters/paul-office-seated-neutral-v01.webp",
      confused: "./public/assets/generated/characters/paul-office-seated-confused-v01.webp?v=1",
      pleased: "./public/assets/generated/characters/paul-office-seated-pleased-v01.webp?v=1"
    }
  };

  function applySeatedExpression(name) {
    const sources = seatedExpressionSources[name];
    const reaction = cast[name].dataset.expression || "neutral";
    const requested = name === "Stephen" && stephenProofMode !== "auto"
      ? stephenProofMode
      : name === "David" && davidProofMode !== "auto"
        ? davidProofMode
        : name === "Paul" && paulProofMode !== "auto"
          ? paulProofMode
          : reaction;
    // Approved acting cues select their whole seated sprites. Unmapped acting
    // cues, including Paul's "blank", deliberately resolve to Neutral.
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

  function cycleDavidProof() {
    davidProofMode = davidProofModes[(davidProofModes.indexOf(davidProofMode) + 1) % davidProofModes.length];
    const label = davidProofMode === "systems-expert"
      ? "Systems Expert" : davidProofMode[0].toUpperCase() + davidProofMode.slice(1);
    const button = $("davidProofButton");
    button.textContent = "David: " + label + " ↻";
    button.setAttribute("aria-label", "David expression preview: " + label + ". Click to cycle Auto, Neutral, Confident, Serious, Frustrated, Shocked and Systems Expert");
    // Preview only David's approved complete sprite; leave story timing and other actors unchanged.
    applySeatedExpression("David");
  }

  function cyclePaulProof() {
    paulProofMode = paulProofModes[(paulProofModes.indexOf(paulProofMode) + 1) % paulProofModes.length];
    const label = paulProofMode[0].toUpperCase() + paulProofMode.slice(1);
    const button = $("paulProofButton");
    button.textContent = "Paul: " + label + " ↻";
    button.setAttribute("aria-label", "Paul expression preview: " + label + ". Click to cycle Auto, Neutral, Confused and Pleased");
    // Proof must not advance dialogue, reset audio or alter either other actor.
    applySeatedExpression("Paul");
  }

  let autoPlaying = true;
  let advanceTimer = null;
  const MIN_LINE_MS = 1800;
  const MAX_LINE_MS = 4700;
  const VOICE_PATH = "./public/assets/audio/dialogue/";
  const VOICE_GAP_MS = 400;
  const VOICE_START_TIMEOUT_MS = 8000;
  let voice = null;
  let voiceBeatId = null;
  let voicePhase = "off";
  let voiceToken = 0;
  let voiceStartTimeout = null;
  const missingVoiceIds = new Set();

  function clearVoiceStartTimeout() {
    if (voiceStartTimeout !== null) {
      clearTimeout(voiceStartTimeout);
      voiceStartTimeout = null;
    }
  }

  function stopVoice() {
    voiceToken++;
    clearVoiceStartTimeout();
    const old = voice;
    voice = null;
    voiceBeatId = null;
    voicePhase = "off";
    if (old) {
      old.onended = null;
      old.onerror = null;
      try { old.pause(); } catch (_) { /* No audio support. */ }
    }
  }

  function unavailableVoice(clip, token, missingFile = false) {
    if (token !== voiceToken || voice !== clip) return;
    if (missingFile) missingVoiceIds.add(voiceBeatId);
    stopVoice();
    voicePhase = "missing";
    scheduleAdvance(); // Voice unavailable: retain the original text timer.
  }

  function playVoice(clip, token) {
    if (voice !== clip || token !== voiceToken) return;
    voicePhase = "loading";
    clearVoiceStartTimeout();
    voiceStartTimeout = setTimeout(() => {
      if (voice === clip && token === voiceToken && voicePhase === "loading") {
        unavailableVoice(clip, token);
      }
    }, VOICE_START_TIMEOUT_MS);
    try {
      const playback = clip.play();
      if (playback && typeof playback.then === "function") {
        playback.then(() => {
          if (voice !== clip || token !== voiceToken || voicePhase === "finished") return;
          clearVoiceStartTimeout();
          if (voicePhase === "paused") return;
          voicePhase = "playing";
          syncPlaybackControls();
        }).catch(() => {
          if (voice !== clip || token !== voiceToken) return;
          if (voicePhase === "paused") return;
          unavailableVoice(clip, token);
        });
      } else {
        clearVoiceStartTimeout();
        voicePhase = "playing";
      }
    } catch (_) {
      unavailableVoice(clip, token);
    }
  }

  function startVoice(beat) {
    stopVoice();
    if (!soundEnabled || beat.type !== "dialogue" ||
        missingVoiceIds.has(beat.id) || typeof window.Audio !== "function") return;
    try {
      const clip = new window.Audio();
      const token = voiceToken;
      clip.preload = "auto";
      clip.src = VOICE_PATH + beat.id + ".mp3";
      clip.onended = () => {
        if (voice !== clip || token !== voiceToken) return;
        clearVoiceStartTimeout();
        voicePhase = "finished";
        scheduleAdvance(); // Never cut off a clip with the text timer.
      };
      clip.onerror = () => unavailableVoice(clip, token, true);
      voice = clip;
      voiceBeatId = beat.id;
      playVoice(clip, token);
    } catch (_) {
      stopVoice();
    }
  }

  function clearAdvanceTimer() {
    if (advanceTimer !== null) {
      clearTimeout(advanceTimer);
      advanceTimer = null;
    }
  }

  function lineDuration(beat) {
    if (beat.type !== "dialogue") return beat.duration || 1600;
    if (beat.duration) return beat.duration;
    return Math.min(MAX_LINE_MS, Math.max(MIN_LINE_MS, 1250 + beat.text.length * 36));
  }

  function syncPlaybackControls() {
    const button = $("playPauseButton");
    button.textContent = autoPlaying ? "Ⅱ Pause" : "▶ Play";
    button.setAttribute("aria-pressed", String(autoPlaying));
    const voicing = voicePhase === "playing" || voicePhase === "loading";
    $("playbackStatus").textContent = autoPlaying
      ? voicing ? "AUTO PLAYING · VOICED DIALOGUE" : "AUTO PLAYING · TAP PAUSE TO READ"
      : "PAUSED · USE NEXT / BACK";
    $("officeScreen").dataset.voice = voicePhase;
    $("officeScreen").dataset.playback = autoPlaying ? "auto" : "paused";
  }

  function scheduleAdvance() {
    clearAdvanceTimer();
    syncPlaybackControls();
    if (!autoPlaying || screens.office.hidden || document.hidden) return;
    const beat = beats[beatIndexById.get(state.beatId)];
    // A recording owns the timeline until it ends; silent visual beats and
    // missing recordings retain the established script durations.
    if (voice && (voicePhase === "loading" || voicePhase === "playing" || voicePhase === "paused")) return;
    const wait = voicePhase === "finished" ? VOICE_GAP_MS : lineDuration(beat);
    advanceTimer = setTimeout(() => {
      advanceTimer = null;
      if (autoPlaying && !screens.office.hidden && !document.hidden) next();
    }, wait);
  }

  function setAutoplay(enabled) {
    autoPlaying = Boolean(enabled);
    if (!autoPlaying && voice && (voicePhase === "playing" || voicePhase === "loading")) {
      clearVoiceStartTimeout();
      voicePhase = "paused";
      try { voice.pause(); } catch (_) { /* Fall back to text timing. */ }
    } else if (autoPlaying && voice && voicePhase === "paused") {
      playVoice(voice, voiceToken);
    }
    scheduleAdvance();
  }

  let soundEnabled = false;
  // Keep the initial menu muted. Clicking Start/Continue is an explicit gesture
  // to play the voiced story; an intentional Sound toggle always wins.
  let soundPreferenceSet = false;
  let audioContext = null;
  let state = { version: 3, scene: "menu", beatId: "intro.exterior", openingSeen: false };

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

  function migrateHolidaySave(stored) {
    if (stored.scene !== "holiday" || stored.holidayFlowVersion === 2) return stored;
    const old = { ...stored, holidayFlowVersion: 2 };
    // Older preview saves allowed several same-day invitations to be accepted.
    // Respect the FIRST acceptance and move directly to its incident. Never
    // silently keep a route generated by a subsequent invitation.
    if (old.wallDecision === "accept" &&
        !["transition","wall"].includes(old.holidayPhase)) {
      old.holidayPhase = "route-handoff";
      old.route = "cult";
      old.pendingPlan = "cult";
      old.finalStep = 0;
    } else if (old.wallDecision === "decline" && old.palaceDecision === "accept" &&
        !["palace","wall","transition"].includes(old.holidayPhase)) {
      old.holidayPhase = "route-handoff";
      old.route = "detention";
      old.pendingPlan = "detention";
      old.finalStep = 0;
    } else if (old.holidayPhase === "market") {
      // The final market invitation is now obligatory, not a selectable fork.
      old.marketDecision = old.marketStep >= market.lines.length ? "accept" : null;
      old.pendingPlan = old.marketDecision === "accept" ? "reassemble" : null;
      old.marketFallbackRoute = null;
      delete old.route;
    } else if (old.holidayPhase === "final-message" &&
               old.wallDecision === "decline" && old.palaceDecision === "decline") {
      old.route = "reassemble";
      old.pendingPlan = "reassemble";
    } else if (old.holidayPhase === "palace" && old.wallDecision !== "decline") {
      old.holidayPhase = "wall";
    }
    if (!old.holidayPhase) old.holidayPhase = "transition";
    return old;
  }

  function readSave() {
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORE_KEY) || "null");
      if (!stored || !["office", "holiday"].includes(stored.scene)) return null;
      if (stored.version === 3) {
        if (!beatIndexById.has(stored.beatId)) return null;
        return migrateHolidaySave(stored);
      }
      if (![1, 2].includes(stored.version)) return null;
      if (stored.scene === "holiday") {
        return { version: 3, scene: "holiday", beatId: finalBeatId, openingSeen: true };
      }
      const shot = stored.version === 1 ? stored.shotIndex : stored.shotIndex - 1;
      if (!Number.isInteger(stored.lineIndex) || !Number.isInteger(stored.shotIndex)) return null;
      if (stored.version === 2 && stored.shotIndex === 0 && stored.lineIndex === 0) {
        return { version: 3, scene: "office", beatId: "intro.exterior", openingSeen: false };
      }
      const oldIds = window.SMP_LEGACY_BEAT_IDS;
      if (!oldIds || !oldIds[shot] || !oldIds[shot][stored.lineIndex]) return null;
      const id = oldIds[shot][stored.lineIndex];
      if (!beatIndexById.has(id)) return null;
      return { version: 3, scene: "office", beatId: id, openingSeen: false };
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
    if (screenName !== "office") {
      clearAdvanceTimer();
      stopVoice();
    }
    const entering = screens[screenName].hidden;
    for (const [name, screen] of Object.entries(screens)) screen.hidden = name !== screenName;
    // Starting on a scrolled menu used to leave the office scene's toolbar
    // outside the visible laptop viewport. Reset only on actual screen changes,
    // not on every spoken line, Back, or Next.
    if (entering && typeof window.scrollTo === "function") window.scrollTo(0, 0);
  }

  function setSound(enabled, rememberChoice = false) {
    if (rememberChoice) soundPreferenceSet = true;
    soundEnabled = Boolean(enabled);
    if (!soundEnabled) {
      stopVoice();
      if (!screens.office.hidden) scheduleAdvance();
    } else if (!screens.office.hidden && !document.hidden) {
      startVoice(beats[beatIndexById.get(state.beatId)]);
      scheduleAdvance();
    }
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
    return beatIndexById.get(state.beatId) + 1;
  }

  const cutaways = {
    risk: '<div class="cutaway-heading">DAVID’S LAPTOP · TOP SECRET*</div><div class="cutaway-laptop"><div class="cutaway-screen"><span>OPERATION:</span><strong>PROBABLY FINE</strong><div class="cutaway-risk-grid"><span>INTERNATIONAL TRAVEL</span><b>HIGH RISK</b><span>HOLIDAY ROMANCE</span><b>HIGH RISK</b><span>DAVID’S CONFIDENCE</span><b>UNREASONABLY HIGH</b></div><small>*NOT ACTUALLY SECRET</small></div><div class="cutaway-keyboard"></div></div>',
    printer: '<div class="cutaway-heading">OFFICE PRINTER · 40 DOCUMENTS QUEUED</div><div class="cutaway-printer"><div class="cutaway-output-sheet sheet-one">🐻 ▧<small>HONEY BEAR #01</small></div><div class="cutaway-output-sheet sheet-two">🐻 ▧<small>HONEY BEAR #02</small></div><div class="cutaway-printer-body"><span>PRINTING…</span><span class="printer-light"></span></div><div class="cutaway-paper-stack">▤ ▤ ▤</div></div>',
    chat: '<div class="cutaway-heading">A COMPLETELY UNNECESSARY GROUP CHAT</div><div class="cutaway-phone"><div class="phone-notch"></div><div class="phone-screen"><small>NEW GROUP CREATED ✓</small><strong>STEPHEN RESCUE GROUP</strong><span>(PRE-EMPTIVE)</span><div class="phone-avatars">STEPHEN · DAVID · PAUL</div><div class="phone-message">🐻🍯<span>Paul · group administrator</span></div></div></div>',
    song: '<div class="cutaway-heading">THE OPTIMISTIC VERSION · STEPHEN’S GOODBYE SONG</div><div class="cutaway-special cutaway-song"><div class="song-notes">♫ ♪ ♫</div><strong>STEPHEN’S GOODBYE SONG</strong><p>♪ Stephen’s off to China, he’ll probably be fine!</p><p>♪ Unless he gets kidnapped, then that’s a bad sign!</p></div>',
    muted: '<div class="cutaway-heading">PHONE NOTIFICATION</div><div class="cutaway-special cutaway-notification"><strong>STEPHEN RESCUE GROUP</strong><p>Stephen Martin has muted the group.</p></div>',
    folder: '<div class="cutaway-heading">DAVID’S LAPTOP · FILE EXPLORER</div><div class="cutaway-special cutaway-folder"><strong>📁 RESCUE PLAN - FINAL - FINAL 2</strong><p>📄 Backup rescue plan · 📄 Alternative rescue plan · 📄 Risk matrix · 📄 Final final final</p></div>'
  };

  function cutawayFor(beat) {
    return beat.visual || null;
  }

  // Approved, individually cropped game portraits. Reaction aliases map the
  // original dialogue cues to the six available facial expressions per person.
  // D1 composition playtest: one human-approved, transparent seated sprite
  // per actor. Keep reaction cues in the scene state for the future D2 pass,
  // but never swap misaligned head-and-shoulder portraits into seated bodies.
  // Static sprite file paths live in index.html for immediate/offline rendering.

  function renderOffice() {
    stopVoice(); // Next/Back/Restart interrupt the previous line immediately.
    reveal("office");
    const beat = beats[beatIndexById.get(state.beatId)];
    const percent = Math.round((completedLineCount() / totalLines) * 100);
    const visualOnly = beat.type !== "dialogue";
    const cutaway = cutawayFor(beat);
    $("sceneNumber").textContent = "CHAPTER 1 · OPENING";
    $("sceneTitle").textContent = "The Pre-Holiday Briefing";
    $("sceneCaption").textContent = "One continuous office conversation";
    $("speakerName").textContent = visualOnly ? "" : beat.speaker.toUpperCase();
    $("lineText").textContent = visualOnly ? "" : beat.text;
    $("dialogueBox").hidden = visualOnly;
    $("cutawayPanel").hidden = !cutaway;
    $("cutawayPanel").setAttribute("aria-hidden", String(!cutaway));
    $("cutawayContent").innerHTML = cutaway ? cutaways[cutaway] : "";
    $("stage").dataset.cutaway = cutaway || "none";
    $("stage").dataset.location = beat.id === "intro.exterior" ? "exterior" : "interior";
    $("stage").dataset.moment = beat.type === "title" ? "title" : "office";
    $("stage").dataset.visual = beat.type;
    $("stage").setAttribute("aria-label", visualOnly ? beat.text : beat.speaker + ": " + beat.text);
    $("sceneEffect").innerHTML = beat.type === "title" ? effects.title : "";
    $("progressFill").style.width = percent + "%";
    $("storyProgress").setAttribute("aria-valuenow", String(percent));
    $("backButton").disabled = state.beatId === beats[0].id;
    $("nextButton").innerHTML = state.beatId === finalBeatId
      ? 'See Stephen’s holiday <span aria-hidden="true">→</span>'
      : 'Next <span aria-hidden="true">→</span>';
    for (const [name, el] of Object.entries(cast)) {
      const active = beat.speaker === name;
      el.classList.toggle("is-speaking", active);
      el.classList.toggle("is-listening", beat.speaker in cast && !active);
      const expression = beat.reactions[name];
      el.dataset.expression = expression;
      // Stephen remains absent for every subsequent beat, including after Back.
      el.hidden = expression === "absent";
    }
    for (const name of Object.keys(cast)) applySeatedExpression(name);
    persist();
    if (beat.sound) beep(beat.sound);
    startVoice(beat);
    scheduleAdvance();
  }

  function startOffice() {
    clearAdvanceTimer();
    if (!soundPreferenceSet) setSound(true);
    autoPlaying = true;
    state = { version: 3, scene: "office", beatId: "intro.exterior", openingSeen: false };
    renderOffice();
  }

  function next() {
    if (screens.office.hidden) return;
    const position = beatIndexById.get(state.beatId);
    if (position === beats.length - 1) {
      showHoliday();
      return;
    }
    state.beatId = beats[position + 1].id;
    renderOffice();
  }

  function previous() {
    if (screens.office.hidden) return;
    autoPlaying = false;
    const position = beatIndexById.get(state.beatId);
    if (position === 0) return;
    state.beatId = beats[position - 1].id;
    renderOffice();
  }

  // GAME-SP2.3C: single-choice branching. A declined invitation unlocks the
  // next sightseeing location after an intermission; acceptance bypasses all
  // subsequent locations and commits the matching incident route at handoff.
  // Existing mini-games are future work, not simulated as completed gameplay.
  const handoffs = {
    cult: {
      title: "THE SUMMIT",
      description: "Stephen heads into the mountains for an unusually enthusiastic welcome. It's definitely a retreat. Probably."
    },
    detention: {
      title: "THE CULTURAL EXCELLENCE BANQUET",
      description: "Stephen arrives at a rather official-looking dinner. His new title is getting increasingly out of hand."
    },
    reassemble: {
      title: "TOTAL RENEWAL SPA",
      description: "Stephen has found a ninety-per-cent discount on a complete body-renewal package. An excellent bargain, apparently."
    }
  };
  function clearDownstream() {
    state.palaceStep = 0;
    state.palaceReplyStep = 0;
    state.palaceDecision = null;
    state.marketStep = 0;
    state.marketDecision = null;
    state.marketFallbackRoute = null;
    state.pendingPlan = null;
    state.finalStep = 0;
    delete state.route;
    state.rescueAlarmStep = 0;
    state.rescueTravelStep = 0;
  }
  function renderHoliday() {
    reveal("holiday");
    const phase = state.holidayPhase || "transition";
    const inWall = phase === "wall";
    const inPalace = phase === "palace";
    const inMarket = phase === "market";
    const inIntermission = phase === "intermission";
    const inHandoff = phase === "route-handoff";
    const inFinal = phase === "final-message";
    const inAlarm = phase === "rescue-alarm";
    const inTravel = phase === "rescue-travel";
    const inArrival = phase === "rescue-hub-arrival";
    $("chinaTransition").hidden = phase !== "transition";
    $("wallScene").hidden = !inWall;
    $("palaceScene").hidden = !inPalace;
    $("marketScene").hidden = !inMarket;
    $("chinaIntermission").hidden = !inIntermission;
    $("chinaRouteHandoff").hidden = !inHandoff;
    $("chinaFinalScene").hidden = !inFinal;
    $("rescueAlarmScene").hidden = !inAlarm;
    $("rescueTravelScene").hidden = !inTravel;
    $("rescueHubArrival").hidden = !inArrival;
    if (inWall) {
      const position = Number.isInteger(state.wallStep)
        ? Math.max(0, Math.min(state.wallStep, greatWall.lines.length)) : 0;
      state.wallStep = position;
      const decision = state.wallDecision;
      const choiceMade = decision === "accept" || decision === "decline";
      $("wallPromoter").hidden = position === 0;
      $("wallPhone").hidden = position !== 0;
      $("wallPhoneText").textContent = greatWall.phoneText;
      $("wallBookingLabel").textContent = decision === "accept" ? "The Summit — accepted" : "The Summit";
      $("wallDialogue").hidden = position >= greatWall.lines.length;
      $("wallNextButton").hidden = position >= greatWall.lines.length;
      $("wallChoices").hidden = position !== greatWall.lines.length || choiceMade;
      $("wallResult").hidden = !choiceMade;
      $("wallGoPalaceButton").hidden = decision !== "decline";
      $("wallGoIncidentButton").hidden = decision !== "accept";
      if (position < greatWall.lines.length) {
        const line = greatWall.lines[position];
        $("wallSpeakerName").textContent = line.speaker.toUpperCase();
        $("wallLineText").textContent = line.text;
      }
      $("wallProgressLabel").textContent = choiceMade ? "Great Wall decision saved"
        : position >= greatWall.lines.length ? "Choose Stephen's next destination"
        : "Great Wall conversation · " + (position + 1) + " of " + greatWall.lines.length;
      if (choiceMade) {
        $("wallResultTitle").textContent = decision === "accept" ? "The Summit — accepted ✓" : "Invitation declined";
        $("wallResultText").textContent = decision === "accept"
          ? greatWall.acceptReaction : greatWall.declineReaction;
      }
    }
    if (inPalace) {
      const position = Number.isInteger(state.palaceStep)
        ? Math.max(0, Math.min(state.palaceStep, palace.lines.length)) : 0;
      const replyIndex = Number.isInteger(state.palaceReplyStep)
        ? Math.max(0, Math.min(state.palaceReplyStep, palace.acceptReply.length)) : 0;
      state.palaceStep = position;
      state.palaceReplyStep = replyIndex;
      const decision = state.palaceDecision;
      const accepted = decision === "accept";
      const choiceMade = accepted || decision === "decline";
      const showingIntro = position < palace.lines.length;
      const showingReply = accepted && replyIndex < palace.acceptReply.length;
      $("palaceChoices").hidden = showingIntro || choiceMade;
      $("palaceNextButton").hidden = !showingIntro && !showingReply;
      $("palaceDialogue").hidden = !showingIntro && !showingReply;
      $("palaceResult").hidden = !choiceMade || showingReply;
      $("palaceGoMarketButton").hidden = decision !== "decline";
      $("palaceGoIncidentButton").hidden = !accepted || showingReply;
      $("palaceBookingLabel").textContent = accepted ? "Cultural banquet — accepted" : "Honorary banquet";
      $("palaceHonourBadge").hidden = !accepted;
      const palacePortrait = $("palaceStephen");
      if (palacePortrait.dataset.sprite !== "forbidden-city-pleased") {
        palacePortrait.src = travelStephenHonoured;
        palacePortrait.dataset.sprite = "forbidden-city-pleased";
      }
      $("palacePhotoGag").hidden = !accepted || showingReply;
      if (showingIntro || showingReply) {
        const line = showingIntro ? palace.lines[position] : palace.acceptReply[replyIndex];
        $("palaceSpeakerName").textContent = line.speaker.toUpperCase();
        $("palaceLineText").textContent = line.text;
      }
      if (showingIntro) {
        $("palaceProgressLabel").textContent = "Forbidden City conversation · " + (position + 1) + " of " + palace.lines.length;
      } else if (!choiceMade) {
        $("palaceProgressLabel").textContent = "Choose whether Stephen attends the banquet";
      } else if (showingReply) {
        $("palaceProgressLabel").textContent = "Banquet invitation · " + (replyIndex + 1) + " of " + palace.acceptReply.length;
      } else {
        $("palaceProgressLabel").textContent = "Forbidden City decision saved";
        $("palaceResultTitle").textContent = accepted ? "Banquet invitation accepted ✓" : "Invitation declined";
        $("palaceResultText").textContent = accepted
          ? "Paul's bear picture has somehow become Stephen's event photo."
          : palace.declineReply;
      }
    }
    if (inMarket) {
      const position = Number.isInteger(state.marketStep)
        ? Math.max(0, Math.min(state.marketStep, market.lines.length)) : 0;
      state.marketStep = position;
      const complete = position >= market.lines.length;
      $("marketSpaRep").hidden = position < 2;
      $("marketSpaSign").hidden = position < 1;
      $("marketBookingLabel").textContent = complete ? "Total Renewal Spa — Stephen's going" : "Total Renewal Spa — 90% off";
      $("marketDialogue").hidden = complete;
      $("marketNextButton").hidden = complete;
      $("marketResult").hidden = !complete;
      $("marketProgressLabel").textContent = complete ? "Stephen's bargain is sealed"
        : "Night Market conversation · " + (position + 1) + " of " + market.lines.length;
      if (!complete) {
        const line = market.lines[position];
        $("marketSpeakerName").textContent = line.speaker.toUpperCase();
        $("marketLineText").textContent = line.text;
      } else {
        $("marketResultTitle").textContent = "Stephen takes the 90%-off deal ✓";
        $("marketResultText").textContent = market.acceptLabel + " " + market.acceptReaction;
      }
    }
    if (inIntermission) {
      const palaceNext = state.intermissionTarget === "palace";
      $("intermissionArt").dataset.destination = palaceNext ? "palace" : "market";
      $("intermissionTime").textContent = palaceNext ? "A FEW DAYS LATER…" : "THE NEXT EVENING…";
      $("intermissionDestination").textContent = palaceNext ? "THE FORBIDDEN CITY" : "THE NIGHT MARKET";
      $("intermissionComment").textContent = palaceNext
        ? "Still having an absolutely wonderful time. Still ignoring the group chat."
        : "Another day of sightseeing. Surely nothing can go wrong tonight.";
    }
    if (inHandoff) {
      const route = validHolidayRoutes.includes(state.route) ? state.route : "reassemble";
      $("routeHandoffArt").dataset.route = route;
      $("handoffTitle").textContent = handoffs[route].title;
      $("handoffDescription").textContent = handoffs[route].description;
    }
    if (inFinal) {
      const route = validHolidayRoutes.includes(state.route) ? state.route : null;
      const step = Number.isInteger(state.finalStep) ? Math.max(0, Math.min(2,state.finalStep)) : 0;
      state.finalStep = step;
      $("chinaFinalPhone").hidden = step === 2;
      $("chinaFinalReaction").hidden = step !== 1;
      $("chinaFinalEngland").hidden = step !== 2;
      $("chinaFinalNextButton").hidden = false;
      $("chinaFinalNextButton").textContent = step === 2
        ? "Back to David and Paul →" : "Continue →";
      $("chinaAnotherEndingButton").hidden = step !== 2;
      $("chinaBatteryLabel").textContent = step ? "0% · Battery depleted" : "1% battery";
      $("chinaPhoneStatus").textContent = step ? "Message interrupted — not delivered" : "Sending…";
      $("chinaPhoneMessage").textContent = route ? chinaFinal.messageByRoute[route] : "";
      $("chinaFinalProgress").textContent = step === 2 ? "Stephen's holiday chapter complete"
        : step === 1 ? "No signal from Stephen" : "Stephen's last message";
    }
    if (inAlarm) {
      const position = Number.isInteger(state.rescueAlarmStep)
        ? Math.max(0, Math.min(state.rescueAlarmStep, rescueAlarm.lines.length)) : 0;
      state.rescueAlarmStep = position;
      const complete = position >= rescueAlarm.lines.length;
      $("rescueAlarmNextButton").hidden = complete;
      $("rescueAlarmTravelButton").hidden = !complete;
      $("rescueAlarmPhoneText").textContent = chinaFinal.messageByRoute[state.route] || "";
      $("rescueAlarmPhone").hidden = complete ||
        !(rescueAlarm.lines[position] && rescueAlarm.lines[position].showPhone);
      $("rescueAlarmProgress").textContent = complete
        ? "Operation: Probably Fine — approved by David"
        : "Office Alarm · " + (position + 1) + " of " + rescueAlarm.lines.length;
      if (!complete) {
        const line = rescueAlarm.lines[position];
        $("rescueAlarmSpeaker").textContent = line.speaker.toUpperCase();
        $("rescueAlarmLine").textContent = line.text;
        for (const actor of ["David","Paul"]) {
          const pose = line[actor.toLowerCase()];
          const img = $("rescueAlarm" + actor);
          if (img.dataset.sprite !== pose) {
            img.src = rescuePortraits[actor][pose];
            img.dataset.sprite = pose;
          }
        }
      } else {
        $("rescueAlarmSpeaker").textContent = "DAVID";
        $("rescueAlarmLine").textContent = "Pack everything.";
      }
    }
    if (inTravel) {
      const position = Number.isInteger(state.rescueTravelStep)
        ? Math.max(0, Math.min(state.rescueTravelStep, rescueAlarm.montage.length - 1)) : 0;
      state.rescueTravelStep = position;
      const line = rescueAlarm.montage[position];
      $("rescueTravelEyebrow").textContent = line.eyebrow;
      $("rescueTravelSymbol").textContent = line.symbol;
      $("rescueTravelTitle").textContent = line.title;
      $("rescueTravelDetail").textContent = line.subtext;
      $("rescueTravelProgress").textContent = "Unnecessary travel · "
        + (position + 1) + " of " + rescueAlarm.montage.length;
      $("rescueTravelNextButton").textContent = position === rescueAlarm.montage.length - 1
        ? "Arrive at visitor information →" : "Continue →";
    }
    state.holidayFlowVersion = 2;
    persist();
  }

  function showHoliday() {
    state.scene = "holiday";
    state.openingSeen = true;
    state.beatId = finalBeatId;
    state.holidayPhase = "transition";
    state.holidayFlowVersion = 2;
    state.intermissionTarget = null;
    state.wallStep = 0;
    state.wallDecision = null;
    clearDownstream();
    renderHoliday();
  }

  function startWall() {
    if (screens.holiday.hidden || state.holidayPhase !== "transition") return;
    state.holidayPhase = "wall";
    state.wallStep = 0;
    state.wallDecision = null;
    clearDownstream();
    renderHoliday();
  }

  function nextWallLine() {
    if (screens.holiday.hidden || state.holidayPhase !== "wall" ||
        state.wallDecision || state.wallStep >= greatWall.lines.length) return;
    state.wallStep++;
    renderHoliday();
  }

  function decideWall(decision) {
    if (screens.holiday.hidden || state.holidayPhase !== "wall" ||
        state.wallStep !== greatWall.lines.length || state.wallDecision ||
        !["accept","decline"].includes(decision)) return;
    state.wallDecision = decision;
    state.pendingPlan = decision === "accept" ? "cult" : null;
    renderHoliday();
  }

  function replayWall() {
    if (screens.holiday.hidden || state.holidayPhase !== "wall") return;
    state.wallStep = 0;
    state.wallDecision = null;
    clearDownstream();
    renderHoliday();
  }

  function beginIntermission(destination) {
    if (screens.holiday.hidden || !["palace","market"].includes(destination)) return;
    if (destination === "palace" &&
        (state.holidayPhase !== "wall" || state.wallDecision !== "decline")) return;
    if (destination === "market" &&
        (state.holidayPhase !== "palace" || state.palaceDecision !== "decline")) return;
    state.holidayPhase = "intermission";
    state.intermissionTarget = destination;
    renderHoliday();
  }

  function continueIntermission() {
    if (screens.holiday.hidden || state.holidayPhase !== "intermission") return;
    if (state.intermissionTarget === "palace" && state.wallDecision === "decline") {
      state.holidayPhase = "palace";
      if (!Number.isInteger(state.palaceStep)) state.palaceStep = 0;
    } else if (state.intermissionTarget === "market" &&
               state.wallDecision === "decline" && state.palaceDecision === "decline") {
      state.holidayPhase = "market";
      if (!Number.isInteger(state.marketStep)) state.marketStep = 0;
    } else return;
    renderHoliday();
  }

  function nextPalaceLine() {
    if (screens.holiday.hidden || state.holidayPhase !== "palace") return;
    if (state.palaceStep < palace.lines.length) {
      state.palaceStep++;
    } else if (state.palaceDecision === "accept" &&
               state.palaceReplyStep < palace.acceptReply.length) {
      state.palaceReplyStep++;
    } else return;
    renderHoliday();
  }

  function decidePalace(decision) {
    if (screens.holiday.hidden || state.holidayPhase !== "palace" ||
        state.wallDecision !== "decline" || state.palaceStep !== palace.lines.length ||
        state.palaceDecision || !["accept","decline"].includes(decision)) return;
    state.palaceDecision = decision;
    state.palaceReplyStep = 0;
    state.pendingPlan = decision === "accept" ? "detention" : null;
    renderHoliday();
  }

  function replayPalace() {
    if (screens.holiday.hidden || state.holidayPhase !== "palace") return;
    state.palaceStep = 0;
    state.palaceReplyStep = 0;
    state.palaceDecision = null;
    state.pendingPlan = null;
    state.marketStep = 0;
    state.marketDecision = null;
    state.marketFallbackRoute = null;
    delete state.route;
    renderHoliday();
  }

  function returnToWall() {
    if (screens.holiday.hidden || state.holidayPhase !== "palace" ||
        state.wallDecision !== "decline") return;
    state.holidayPhase = "wall";
    renderHoliday();
  }

  function nextMarketLine() {
    if (screens.holiday.hidden || state.holidayPhase !== "market" ||
        state.wallDecision !== "decline" || state.palaceDecision !== "decline" ||
        state.marketStep >= market.lines.length) return;
    state.marketStep++;
    if (state.marketStep === market.lines.length) {
      state.marketDecision = "accept"; // This last offer is mandatory.
      state.pendingPlan = "reassemble";
    }
    renderHoliday();
  }

  function returnToPalace() {
    if (screens.holiday.hidden || state.holidayPhase !== "market" ||
        state.palaceDecision !== "decline") return;
    state.holidayPhase = "palace";
    state.marketStep = 0;
    state.marketDecision = null;
    state.pendingPlan = null;
    renderHoliday();
  }

  function beginRouteHandoff(route) {
    if (screens.holiday.hidden || !validHolidayRoutes.includes(route)) return;
    const ready = route === "cult"
      ? state.holidayPhase === "wall" && state.wallDecision === "accept"
      : route === "detention"
        ? state.holidayPhase === "palace" && state.wallDecision === "decline" &&
          state.palaceDecision === "accept" && state.palaceReplyStep >= palace.acceptReply.length
        : state.holidayPhase === "market" && state.wallDecision === "decline" &&
          state.palaceDecision === "decline" && state.marketStep >= market.lines.length;
    if (!ready || (state.route && state.route !== route)) return;
    state.route = route;
    state.pendingPlan = route;
    state.holidayPhase = "route-handoff";
    renderHoliday();
  }

  function continueRouteHandoff() {
    if (screens.holiday.hidden || state.holidayPhase !== "route-handoff" ||
        !validHolidayRoutes.includes(state.route)) return;
    state.finalStep = 0;
    state.holidayPhase = "final-message";
    renderHoliday();
  }

  function advanceFinalMessage() {
    if (screens.holiday.hidden || state.holidayPhase !== "final-message") return;
    if (state.finalStep >= 2) {
      // The phone and Back in England card now lead into the genuine
      // shared rescue story rather than a placeholder ending.
      if (!validHolidayRoutes.includes(state.route)) return;
      state.holidayPhase = "rescue-alarm";
      state.rescueAlarmStep = 0;
    } else {
      state.finalStep++;
    }
    renderHoliday();
  }

  function nextRescueAlarmLine() {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-alarm" ||
        state.rescueAlarmStep >= rescueAlarm.lines.length) return;
    state.rescueAlarmStep++;
    renderHoliday();
  }

  function startRescueTravel() {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-alarm" ||
        state.rescueAlarmStep !== rescueAlarm.lines.length ||
        !validHolidayRoutes.includes(state.route)) return;
    state.rescueTravelStep = 0;
    state.holidayPhase = "rescue-travel";
    renderHoliday();
  }

  function nextRescueTravel() {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-travel" ||
        !validHolidayRoutes.includes(state.route)) return;
    if (state.rescueTravelStep < rescueAlarm.montage.length - 1) {
      state.rescueTravelStep++;
    } else {
      // The forthcoming interactive hub must be approved before importing
      // new generated art. This is a clear, non-playable handoff only.
      state.holidayPhase = "rescue-hub-arrival";
    }
    renderHoliday();
  }

  function chooseAnotherEnding() {
    if (screens.holiday.hidden ||
        !(state.holidayPhase === "final-message" && state.finalStep === 2 ||
          state.holidayPhase === "rescue-hub-arrival")) return;
    // Rewind explicitly to the first route choice, preserving the voiced
    // office story and Great Wall dialogue but clearing all branch decisions.
    state.wallStep = greatWall.lines.length;
    state.wallDecision = null;
    clearDownstream();
    state.intermissionTarget = null;
    state.holidayPhase = "wall";
    renderHoliday();
  }

  function showMenu() {
    reveal("menu");
    $("resumeButton").hidden = !readSave();
  }

  function resume() {
    clearAdvanceTimer();
    if (!soundPreferenceSet) setSound(true);
    autoPlaying = true;
    const saved = readSave();
    if (!saved) { startOffice(); return; }
    state = saved;
    if (state.scene === "holiday") renderHoliday();
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
  $("chinaStartButton").addEventListener("click", startWall);
  $("wallNextButton").addEventListener("click", nextWallLine);
  $("wallAcceptButton").addEventListener("click", () => decideWall("accept"));
  $("wallDeclineButton").addEventListener("click", () => decideWall("decline"));
  $("wallReplayButton").addEventListener("click", replayWall);
  $("wallGoPalaceButton").addEventListener("click", () => beginIntermission("palace"));
  $("wallGoIncidentButton").addEventListener("click", () => beginRouteHandoff("cult"));
  $("palaceNextButton").addEventListener("click", nextPalaceLine);
  $("palaceAcceptButton").addEventListener("click", () => decidePalace("accept"));
  $("palaceDeclineButton").addEventListener("click", () => decidePalace("decline"));
  $("palaceReplayButton").addEventListener("click", replayPalace);
  $("palaceBackButton").addEventListener("click", returnToWall);
  $("palaceGoMarketButton").addEventListener("click", () => beginIntermission("market"));
  $("palaceGoIncidentButton").addEventListener("click", () => beginRouteHandoff("detention"));
  $("marketNextButton").addEventListener("click", nextMarketLine);
  $("marketBackButton").addEventListener("click", returnToPalace);
  $("marketGoIncidentButton").addEventListener("click", () => beginRouteHandoff("reassemble"));
  $("intermissionContinueButton").addEventListener("click", continueIntermission);
  $("handoffContinueButton").addEventListener("click", continueRouteHandoff);
  $("chinaFinalNextButton").addEventListener("click", advanceFinalMessage);
  $("chinaAnotherEndingButton").addEventListener("click", chooseAnotherEnding);
  $("rescueAlarmNextButton").addEventListener("click", nextRescueAlarmLine);
  $("rescueAlarmTravelButton").addEventListener("click", startRescueTravel);
  $("rescueTravelNextButton").addEventListener("click", nextRescueTravel);
  $("rescueHubReplayButton").addEventListener("click", chooseAnotherEnding);
  $("soundButton").addEventListener("click", () => setSound(!soundEnabled, true));
  $("sceneSoundButton").addEventListener("click", () => setSound(!soundEnabled, true));
  $("menuSoundButton").addEventListener("click", () => setSound(!soundEnabled, true));
  $("playPauseButton").addEventListener("click", () => setAutoplay(!autoPlaying));
  $("stephenProofButton").addEventListener("click", cycleStephenProof);
  $("davidProofButton").addEventListener("click", cycleDavidProof);
  $("paulProofButton").addEventListener("click", cyclePaulProof);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      // Pausing on hidden tabs prevents timed dialogue from being skipped while away.
      clearAdvanceTimer();
      autoPlaying = false;
      if (voice) {
        clearVoiceStartTimeout();
        voicePhase = "paused";
        try { voice.pause(); } catch (_) { /* Tab remains paused. */ }
      }
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
