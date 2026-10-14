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
  const travelStephenHonoured = "./public/assets/generated/characters/stephen-holiday-forbidden-city-pleased-v01.webp";
  const planLabels = {
    cult: "The Summit",
    detention: "International Cultural Excellence Banquet"
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

  function readSave() {
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORE_KEY) || "null");
      if (!stored || !["office", "holiday"].includes(stored.scene)) return null;
      if (stored.version === 3) {
        if (!beatIndexById.has(stored.beatId)) return null;
        return stored;
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

  // GAME-SP2.2: the first playable Stephen scene lives after the approved
  // 67-beat voiced office story. Preserve V3 saves and never lock a finale here.
  function renderHoliday() {
    reveal("holiday");
    const inWall = state.holidayPhase === "wall";
    const inPalace = state.holidayPhase === "palace";
    $("chinaTransition").hidden = inWall || inPalace;
    $("wallScene").hidden = !inWall;
    $("palaceScene").hidden = !inPalace;
    if (inWall) {
      const position = Number.isInteger(state.wallStep)
        ? Math.max(0, Math.min(state.wallStep, greatWall.lines.length)) : 0;
      state.wallStep = position;
      const choiceMade = state.wallDecision === "accept" || state.wallDecision === "decline";
      // The opening beat shows David's phone notification; the approved Summit
      // promoter then enters beside Stephen so the right-hand portrait is clear.
      $("wallPromoter").hidden = position === 0;
      $("wallPhone").hidden = position !== 0;
      $("wallPhoneText").textContent = greatWall.phoneText;
      $("wallBookingLabel").textContent = bookingName(state.pendingPlan);
      $("wallDialogue").hidden = position >= greatWall.lines.length;
      $("wallNextButton").hidden = position >= greatWall.lines.length;
      $("wallChoices").hidden = position !== greatWall.lines.length || choiceMade;
      $("wallResult").hidden = !choiceMade;
      if (position < greatWall.lines.length) {
        const line = greatWall.lines[position];
        $("wallSpeakerName").textContent = line.speaker.toUpperCase();
        $("wallLineText").textContent = line.text;
      }
      $("wallProgressLabel").textContent = choiceMade ? "Great Wall decision saved"
        : position >= greatWall.lines.length ? "Choose Stephen's evening plans"
        : "Great Wall conversation · " + (position + 1) + " of " + greatWall.lines.length;
      if (choiceMade) {
        $("wallResultTitle").textContent = state.wallDecision === "accept"
          ? "The Summit booked ✓" : "Invitation declined";
        $("wallResultText").textContent = state.wallDecision === "accept"
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
      $("palaceBookingLabel").textContent = bookingName(state.pendingPlan);
      $("palaceHonourBadge").hidden = !accepted;
      // The owner's second, approved Stephen travel pose is the canonical
      // Forbidden City sprite throughout this scene, not a post-choice swap.
      // Accept/decline still controls the booking and the ceremonial UI.
      if ($("palaceStephen").src !== travelStephenHonoured) {
        $("palaceStephen").src = travelStephenHonoured;
      }
      $("palaceStephen").alt = "Stephen sightseeing in his approved Forbidden City holiday pose";
      $("palacePhotoGag").hidden = !accepted || showingReply;
      if (showingIntro || showingReply) {
        const line = showingIntro ? palace.lines[position] : palace.acceptReply[replyIndex];
        $("palaceSpeakerName").textContent = line.speaker.toUpperCase();
        $("palaceLineText").textContent = line.text;
      }
      if (showingIntro) {
        $("palaceProgressLabel").textContent = "Forbidden City conversation · "
          + (position + 1) + " of " + palace.lines.length;
      } else if (!choiceMade) {
        $("palaceProgressLabel").textContent = "Choose Stephen's next evening plan";
      } else if (showingReply) {
        $("palaceProgressLabel").textContent = "Banquet booking · "
          + (replyIndex + 1) + " of " + palace.acceptReply.length;
      } else {
        $("palaceProgressLabel").textContent = "Forbidden City decision saved";
        $("palaceResultTitle").textContent = accepted
          ? "Banquet booked ✓" : "Invitation declined";
        $("palaceResultText").textContent = accepted
          ? "The banquet replaces your earlier evening plans. Paul’s bear picture has somehow become the event photo."
          : palace.declineReply;
      }
    }
    persist();
  }

  function showHoliday() {
    state.scene = "holiday";
    state.openingSeen = true;
    state.beatId = finalBeatId;
    state.holidayPhase = "transition";
    state.wallStep = 0;
    state.wallDecision = null;
    state.pendingPlan = null;
    state.palaceStep = 0;
    state.palaceReplyStep = 0;
    state.palaceDecision = null;
    renderHoliday();
  }

  function startWall() {
    if (screens.holiday.hidden || state.holidayPhase === "wall") return;
    state.holidayPhase = "wall";
    state.wallStep = 0;
    state.wallDecision = null;
    state.pendingPlan = null;
    if (typeof window.scrollTo === "function") window.scrollTo(0, 0);
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
        !["accept", "decline"].includes(decision)) return;
    state.wallDecision = decision;
    state.pendingPlan = decision === "accept" ? "cult" : null;
    // The route is deliberately NOT committed until the third scene (SP2.3).
    renderHoliday();
  }

  function replayWall() {
    if (screens.holiday.hidden || state.holidayPhase !== "wall") return;
    state.wallStep = 0;
    state.wallDecision = null;
    state.pendingPlan = null;
    state.palaceStep = 0;
    state.palaceReplyStep = 0;
    state.palaceDecision = null;
    renderHoliday();
  }

  function enterPalace() {
    if (screens.holiday.hidden || state.holidayPhase !== "wall" ||
        !["accept","decline"].includes(state.wallDecision)) return;
    state.holidayPhase = "palace";
    if (!Number.isInteger(state.palaceStep)) state.palaceStep = 0;
    if (!Number.isInteger(state.palaceReplyStep)) state.palaceReplyStep = 0;
    if (!["accept","decline"].includes(state.palaceDecision)) state.palaceDecision = null;
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
        state.palaceStep !== palace.lines.length || state.palaceDecision ||
        !["accept","decline"].includes(decision)) return;
    state.palaceDecision = decision;
    state.palaceReplyStep = 0;
    // Accept replaces the Summit; decline preserves the existing booking.
    if (decision === "accept") state.pendingPlan = "detention";
    // Never lock state.route until the third location is completed.
    renderHoliday();
  }

  function replayPalace() {
    if (screens.holiday.hidden || state.holidayPhase !== "palace") return;
    state.palaceStep = 0;
    state.palaceReplyStep = 0;
    state.palaceDecision = null;
    state.pendingPlan = state.wallDecision === "accept" ? "cult" : null;
    renderHoliday();
  }

  function returnToWall() {
    if (screens.holiday.hidden || state.holidayPhase !== "palace") return;
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
  $("wallGoPalaceButton").addEventListener("click", enterPalace);
  $("palaceNextButton").addEventListener("click", nextPalaceLine);
  $("palaceAcceptButton").addEventListener("click", () => decidePalace("accept"));
  $("palaceDeclineButton").addEventListener("click", () => decidePalace("decline"));
  $("palaceReplayButton").addEventListener("click", replayPalace);
  $("palaceBackButton").addEventListener("click", returnToWall);
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
