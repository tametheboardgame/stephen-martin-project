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
  const rescueHub = window.SMP_RESCUE_HUB;
  const rescueFramework = window.SMP_RESCUE_FRAMEWORK;
  const summit = window.SMP_SUMMIT;
  const detention = window.SMP_DETENTION;
  const assembly = window.SMP_REASSEMBLE;
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
  // GAME-SP4.1D0: expression selection follows the approved acting cues.
  // Development-time manual portrait preview overrides have been retired.
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
      confused: "./public/assets/generated/characters/paul-office-seated-confused-v01.webp?v=2",
      pleased: "./public/assets/generated/characters/paul-office-seated-pleased-v01.webp?v=2"
    }
  };

  function applySeatedExpression(name) {
    const sources = seatedExpressionSources[name];
    const reaction = cast[name].dataset.expression || "neutral";
    const requested = reaction;
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
      ? "seated-expression" : "seated-neutral";
  }

  let autoPlaying = true;
  let advanceTimer = null;
  const MIN_LINE_MS = 1800;
  const MAX_LINE_MS = 4700;
  const VOICE_PATH = "./public/assets/audio/dialogue/";
  const VOICE_GAP_MS = 260;
  const VOICE_VISUAL_GAP_MS = 100;
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


  // GAME-SP4.0D: two independently uploaded, optional full-length songs.
  // The optimistic cutaway previews only its first 20 audible seconds; either
  // full track interrupts the normal timeline until it ends or is skipped.
  const SONG_PATH = "./public/assets/audio/songs/";
  const SONG_PREVIEW_SECONDS = 20;
  const SONG_START_TIMEOUT_MS = 8000;
  const SONG_FILES = { optimistic: "optimistic.mp3", pessimistic: "pessimistic.mp3" };
  let song = null;
  let songKind = null;
  let songMode = null;
  let songPhase = "off";
  let songToken = 0;
  let songPreviewTimer = null;
  let songStartTimer = null;


  const PESSIMISTIC_OFFER_MS = 7000;
  let pessimisticOffer = false;
  let songNotice = "";
  // Full owner-approved lyrics, approximate smooth scroll against audio position.
  const SONG_LYRICS = {"optimistic":["[Verse 1]","Stephen's off to China, he'll probably be fine!","Unless he gets kidnapped, then that's a bad sign!","He's packed his bags for romance, he's packed his favourite shoes,","And David's done a spreadsheet full of deeply troubling news!","[Chorus]","Have a lovely holiday! We hope you have a ball!","Don't forget to message us, or David's bound to call!","Paul has made a group chat, the rescue plan is done,","So Stephen, have a brilliant trip, get out there and have fun!","[Verse 2]","Enjoy the food and culture, the sights and all the men!","And if you disappear, we'll simply come and look again!","We've got a risk assessment, and Paul's packed extra pants,","There's absolutely nothing that could spoil your holiday romance!","[Final Chorus]","Have a lovely holiday! We know you'll be all right!","Just send a little message so we know you're safe at night!","The odds are looking positive, we're sure you'll be just fine!","[Cheerful spoken ending]","David: \"Ninety-seven per cent!\"","Paul: \"What happened to the other three?\"","David: \"...China!\""],"pessimistic":["[Verse 1, solemn piano]","Stephen's off to China, the outlook's rather grim!","David's run the numbers, and the odds don't favour him!","His phone will lose its signal, his luggage will be gone,","And Paul has printed missing posters before he's even flown!","[Chorus, dramatic strings]","Farewell, farewell, dear Stephen! We fear this is goodbye!","We've checked the risk assessment, and the numbers do not lie!","We'll bravely mount a rescue, though we've never left the ground,","And if we can't retrieve you, we'll at least report you found!","[Verse 2, increasingly theatrical]","David's got a flowchart, Paul's got forty bears,","Neither knows the language, but at least they've packed some flares!","The embassy won't answer, the printer's out of ink,","And Stephen's probably having fun, but that's not what we think!","[Chorus, full orchestra and choir]","Farewell, farewell, dear Stephen! We've prepared for the worst!","The crisis team's assembled, though the printer's nearly burst!","We've organised a search party with absolutely no clue,","And if the mission fails us, we'll arrange a tribute too!","[RIDICULOUS KEY CHANGE, UPWARDS]","The post-mortem's booked for Tuesday!","The minutes are prepared!","We've ordered commemorative mugs!","The budget's been declared!","[Music suddenly stops]","Paul, spoken: \"He's just sent a photo of his dinner.\"","David, gravely: \"Could be a hostage signal.\"","Paul: \"Looks like noodles.\"","[Massive final orchestral chord]"]};
  function songLyricsMarkup(kind) {
    const escape = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;")
      .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
    return SONG_LYRICS[kind].map(line => line.startsWith("[")
      ? '<h4 class="song-lyrics-heading">' + escape(line.slice(1,-1)) + '</h4>'
      : '<p class="song-lyrics-line">' + escape(line) + '</p>').join("");
  }
  function scrollSongLyrics(clip) {
    if (song !== clip || songPhase === "paused") return;
    const viewport = $("officeSongLyricsScroll");
    const duration = Number(clip.duration), time = Number(clip.currentTime);
    if (!Number.isFinite(duration) || duration <= 0 || !Number.isFinite(time)) return;
    if (viewport.hidden || document.activeElement === viewport) return;
    const space = Math.max(0,Number(viewport.scrollHeight) - Number(viewport.clientHeight));
    if (!Number.isFinite(space)) return;
    // The pessimistic version finishes its sung lyrics before an instrumental
    // tail. Progress faster through its verses and reach the final lyric position
    // a full two seconds before the MP3 ends, then hold it in view. Preserve the
    // calmer, opening-verse hold on the optimistic version.
    const progress = songKind === "pessimistic"
      ? Math.pow(Math.min(1,Math.max(0,time/Math.max(1,duration-2))),0.72)
      : Math.min(1,Math.max(0,(time/duration-0.06)/0.88));
    viewport.scrollTop = Math.round(space*progress);
  }
  function offerPessimisticSong() {
    if (state.beatId !== "office.041" || screens.office.hidden || pessimisticOffer) return;
    pessimisticOffer = true;
    clearAdvanceTimer();
    syncSongActions();
    scheduleAdvance();
  }
  function declinePessimisticSong() {
    if (state.beatId === "office.041" && pessimisticOffer && !song) next();
  }

  function clearSongTimers() {
    if (songPreviewTimer !== null) clearTimeout(songPreviewTimer);
    if (songStartTimer !== null) clearTimeout(songStartTimer);
    songPreviewTimer = null;
    songStartTimer = null;
  }

  function stopSong() {
    songToken++;
    clearSongTimers();
    const previous = song;
    song = null;
    songKind = null;
    songMode = null;
    songPhase = "off";
    if (previous) {
      previous.onended = null;
      previous.onerror = null;
      previous.ontimeupdate = null;
      try { previous.pause(); } catch (_) { /* Audio is optional. */ }
    }
  }

  function syncSongActions() {
    const optimistic = state.beatId === "office.v07";
    const offer = state.beatId === "office.041" && pessimisticOffer;
    const available = optimistic || offer;
    const kind = optimistic ? "optimistic" : "pessimistic";
    const overlay = $("officeSongOverlay");
    overlay.hidden = !available;
    overlay.dataset.kind = kind;
    overlay.dataset.mode = songMode === "full" ? "full"
      : songMode === "preview" ? "preview" : offer ? "offer" : "ready";
    $("stage").dataset.songActive = String(available);
    $("officeSongActions").hidden = !available;
    $("songListenButton").hidden = !available || songMode === "full";
    $("songStopButton").hidden = songMode !== "full";
    $("songDeclineButton").hidden = !offer || Boolean(song);
    $("songListenButton").textContent = optimistic
      ? "♫ Listen to the whole song" : "♫ Play the pessimistic version";
    $("officeSongTitle").textContent = optimistic
      ? "THE OPTIMISTIC VERSION" : "THE PESSIMISTIC VERSION";
    $("officeSongIntro").textContent = optimistic
      ? songMode === "full" ? "The complete, suspiciously cheerful farewell."
        : "20-second preview · Want the entire ridiculous song?"
      : songMode === "full" ? "A completely unnecessary musical catastrophe."
        : "David has a second version. Care to hear it? The story continues shortly.";
    // The same large, readable lyrics area is available in both versions,
    // including the optional pessimistic offer before playback starts.
    const showLyrics = available;
    $("officeSongLyricsScroll").hidden = !showLyrics;
    $("officeSongLyricsScroll").setAttribute("aria-label", optimistic
      ? "Optimistic song lyrics" : "Pessimistic song lyrics");
    if (showLyrics && $("officeSongLyrics").dataset.kind !== kind) {
      $("officeSongLyrics").dataset.kind = kind;
      $("officeSongLyrics").innerHTML = songLyricsMarkup(kind);
      $("officeSongLyricsScroll").scrollTop = 0;
    }
    $("songStatus").textContent = songNotice || (songMode === "full"
      ? "Full track playing · Pause or skip"
      : songMode === "preview" ? "Playing first 20 seconds"
        : offer ? "Optional · about seven seconds to decide" : "");
  }

  function completeSong(token, unavailable = false) {
    if (!song || token !== songToken) return;
    const wasPreview = songMode === "preview";
    stopSong();
    if (unavailable) {
      songNotice = "Song unavailable; continuing the story.";
      syncSongActions();
      if (wasPreview) beep("song");
      if (pessimisticOffer && state.beatId === "office.041") {
        if (autoPlaying) next();
      } else scheduleAdvance();
      return;
    }
    syncSongActions();
    if (autoPlaying && !document.hidden && !screens.office.hidden) next();
    else scheduleAdvance();
  }

  function scheduleSongPreview(clip, token) {
    if (song !== clip || token !== songToken || songMode !== "preview" || !autoPlaying) return;
    if (songPreviewTimer !== null) clearTimeout(songPreviewTimer);
    const elapsed = Number.isFinite(clip.currentTime) ? clip.currentTime : 0;
    const remaining = Math.max(0, (SONG_PREVIEW_SECONDS - elapsed) * 1000);
    songPreviewTimer = setTimeout(() => {
      songPreviewTimer = null;
      completeSong(token);
    }, remaining);
  }

  function playSongAudio(clip, token) {
    if (song !== clip || token !== songToken) return;
    songPhase = "loading";
    if (songStartTimer !== null) clearTimeout(songStartTimer);
    songStartTimer = setTimeout(() => completeSong(token, true), SONG_START_TIMEOUT_MS);
    try {
      const playing = clip.play();
      const started = () => {
        if (song !== clip || token !== songToken || songPhase === "paused") return;
        if (songStartTimer !== null) clearTimeout(songStartTimer);
        songStartTimer = null;
        songPhase = "playing";
        scheduleSongPreview(clip, token);
        syncPlaybackControls();
      };
      if (playing && typeof playing.then === "function")
        playing.then(started).catch(() => completeSong(token, true));
      else started();
    } catch (_) {
      completeSong(token, true);
    }
  }

  function startSong(kind, mode) {
    if (!Object.hasOwn(SONG_FILES, kind) || !["preview", "full"].includes(mode) ||
        screens.office.hidden || document.hidden) return;
    if (mode === "full" && kind === "optimistic" && song &&
        songKind === kind && songMode === "preview") {
      // Keep the current position, so choosing "full" during the preview
      // does not abruptly restart the track.
      songMode = "full";
      if (songPreviewTimer !== null) clearTimeout(songPreviewTimer);
      songPreviewTimer = null;
      if (songPhase === "paused") playSongAudio(song, songToken);
      syncSongActions();
      syncPlaybackControls();
      return;
    }
    stopSong();
    songNotice = "";
    if (!soundEnabled || typeof window.Audio !== "function") {
      if (mode === "full") $("songStatus").textContent = "Turn on sound to listen to the song.";
      else beep("song");
      return;
    }
    clearAdvanceTimer();
    if (mode === "full") stopVoice();
    try {
      const clip = new window.Audio();
      song = clip;
      songKind = kind;
      songMode = mode;
      const token = songToken;
      clip.preload = "auto";
      clip.src = SONG_PATH + SONG_FILES[kind];
      clip.onended = () => completeSong(token);
      clip.onerror = () => completeSong(token, true);
      clip.ontimeupdate = () => {
        scrollSongLyrics(clip);
        if (song === clip && token === songToken && songMode === "preview" &&
            Number.isFinite(clip.currentTime) && clip.currentTime >= SONG_PREVIEW_SECONDS)
          completeSong(token);
      };
      syncSongActions();
      playSongAudio(clip, token);
    } catch (_) {
      stopSong();
      syncSongActions();
      scheduleAdvance();
    }
  }

  function listenToSong() {
    if (screens.office.hidden) return;
    const kind = state.beatId === "office.v07" ? "optimistic"
      : state.beatId === "office.041" && pessimisticOffer ? "pessimistic" : null;
    if (!kind) return;
    if (!soundEnabled) setSound(true, true); // Direct "listen" click overrides mute.
    startSong(kind, "full");
  }

  function skipFullSong() {
    if (!song || songMode !== "full") return;
    completeSong(songToken);
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
    $("playbackStatus").textContent = song && songMode === "full"
      ? autoPlaying ? "PLAYING FULL SONG · STOP TO CONTINUE" : "SONG PAUSED · PRESS PLAY TO RESUME"
      : song && songMode === "preview"
        ? autoPlaying ? "PLAYING 20-SECOND SONG PREVIEW" : "SONG PAUSED · PRESS PLAY"
        : autoPlaying
          ? voicing ? "AUTO PLAYING · VOICED DIALOGUE" : "AUTO PLAYING · TAP PAUSE TO READ"
          : "PAUSED · USE NEXT / BACK";
    $("officeScreen").dataset.voice = voicePhase;
    $("officeScreen").dataset.playback = autoPlaying ? "auto" : "paused";
  }

  function scheduleAdvance() {
    clearAdvanceTimer();
    syncPlaybackControls();
    if (!autoPlaying || screens.office.hidden || document.hidden || window.SMP_ASSET_LOADER?.busy()) return;
    const beat = beats[beatIndexById.get(state.beatId)];
    // A recording owns the timeline until it ends; silent visual beats and
    // missing recordings retain the established script durations.
    if (song) return; // Music owns the timeline while loading/playing/paused.
    if (voice && (voicePhase === "loading" || voicePhase === "playing" || voicePhase === "paused")) return;
    const nextBeat = beats[beatIndexById.get(state.beatId) + 1];
    const wait = pessimisticOffer && beat.id === "office.041"
      ? PESSIMISTIC_OFFER_MS
      : voicePhase === "finished"
        ? beat.id === "office.041" ? 400
          : nextBeat && nextBeat.type !== "dialogue" ? VOICE_VISUAL_GAP_MS : VOICE_GAP_MS
        : lineDuration(beat);
    advanceTimer = setTimeout(() => {
      advanceTimer = null;
      if (!autoPlaying || screens.office.hidden || document.hidden) return;
      if (beat.id === "office.041" && !pessimisticOffer) offerPessimisticSong();
      else next();
    }, wait);
  }

  function setAutoplay(enabled) {
    autoPlaying = Boolean(enabled);
    if (!autoPlaying && song) {
      clearSongTimers();
      songPhase = "paused";
      try { song.pause(); } catch (_) { /* Pause must remain safe. */ }
    } else if (autoPlaying && song && songPhase === "paused") {
      playSongAudio(song, songToken);
    }
    if (!autoPlaying && voice && (voicePhase === "playing" || voicePhase === "loading")) {
      clearVoiceStartTimeout();
      voicePhase = "paused";
      try { voice.pause(); } catch (_) { /* Fall back to text timing. */ }
    } else if (autoPlaying && voice && voicePhase === "paused") {
      playVoice(voice, voiceToken);
    }
    scheduleAdvance();
    refreshSpeakerFocus();
  }


  // GAME-SP4: optional, ID-addressed dialogue for sightseeing and the shared
  // Back in England rescue opening. Absence/404 retains text timing.
  let holidayVoice = null;
  let holidayVoiceId = null;
  let holidayVoiceStatus = "off";
  let holidayVoiceToken = 0;
  let holidayVoiceStartTimer = null;
  const missingHolidayVoices = new Set();


  // GAME-SP4.1F: OFF-STAGE narrator for illustrated transition cards. These
  // optional IDs share the existing holiday voice player, audio ownership,
  // playback controls and 404 fallback. Every cue is independent of the
  // approved character dialogue IDs, and no route/decision is manufactured.
  const transitionNarration = Object.freeze({
    chapterTwo: Object.freeze({id:"transition.china.chapter-two.001",
      text:"Two days later, in China. Stephen was having a marvellous time. David’s risk assessment had not made the journey."}),
    palace: Object.freeze({id:"transition.china.to-palace.001",
      text:"A few days later, Stephen continued sightseeing, blissfully unaware that the group chat was still in a state of emergency."}),
    market: Object.freeze({id:"transition.china.to-market.001",
      text:"The next evening, Stephen headed into the night market. Surely nothing completely unnecessary would happen there."}),
    cult: Object.freeze({id:"transition.route.summit.001",
      text:"Stephen was off to the Summit. Spectacular scenery, extremely friendly company, and absolutely no cause for concern."}),
    detention: Object.freeze({id:"transition.route.banquet.001",
      text:"Stephen had accepted an honorary banquet invitation. It was about to become a great deal more official than anyone intended."}),
    reassemble: Object.freeze({id:"transition.route.spa.001",
      text:"Stephen had chosen the spa. David and Paul, unfortunately, were not going to enjoy the relaxing part."}),
    backEngland: Object.freeze({id:"transition.england.back.001",
      text:"Meanwhile, back in England, two men were about to mistake a flat phone battery for an international incident."}),
    travel: Object.freeze([
      {id:"transition.travel.001",text:"Two tickets were booked. Neither was refundable. Neither had been properly thought through."},
      {id:"transition.travel.002",text:"Paul had brought all the printer’s bear pictures. The luggage allowance had not been consulted."},
      {id:"transition.travel.003",text:"David consulted his map. Paul suggested turning it the right way up."},
      {id:"transition.travel.004",text:"Several hours and a spectacular expense claim later, neither had tried phoning Stephen’s hotel."}
    ].map(Object.freeze)),
    hotel: Object.freeze({id:"transition.hotel.arrival.001",
      text:"At last, visitor information. The investigation could begin, despite there being absolutely nothing to investigate."})
  });

  function transitionNarrationBeat() {
    if (state.scene !== "holiday") return null;
    switch (state.holidayPhase) {
      case "transition": return transitionNarration.chapterTwo;
      case "intermission":
        return state.intermissionTarget === "palace" ? transitionNarration.palace :
          state.intermissionTarget === "market" ? transitionNarration.market : null;
      case "route-handoff": return transitionNarration[state.route] || null;
      case "final-message":
        return state.finalStep === 2 ? transitionNarration.backEngland : null;
      case "rescue-travel":
        return transitionNarration.travel[state.rescueTravelStep] || null;
      case "rescue-hub-arrival": return transitionNarration.hotel;
      default: return null; // Never narrate an unanswered decision or game.
    }
  }

  function renderTransitionNarration() {
    const cue = transitionNarrationBeat();
    const box = $("transitionNarration");
    box.hidden = !cue;
    $("transitionNarrationLine").textContent = cue?.text || "";
    box.dataset.cue = cue?.id || "";
    // Text is always a usable subtitle even if no MP3 has been uploaded.
    box.dataset.audio = cue && missingHolidayVoices.has(cue.id)
      ? "text-fallback" : "optional";
  }

  function holidayVoiceBeat() {
    if (state.scene !== "holiday") return null;
    const narration = transitionNarrationBeat();
    if (narration) return narration;
    if (state.holidayPhase === "wall") {
      if (state.wallStep < greatWall.lines.length) return greatWall.lines[state.wallStep];
      if (state.wallDecision === "accept") return {id:greatWall.acceptReactionId, text:greatWall.acceptReaction};
      if (state.wallDecision === "decline") return {id:greatWall.declineReactionId, text:greatWall.declineReaction};
    }
    if (state.holidayPhase === "palace") {
      if (state.palaceStep < palace.lines.length) return palace.lines[state.palaceStep];
      if (state.palaceDecision === "accept" && state.palaceReplyStep < palace.acceptReply.length)
        return palace.acceptReply[state.palaceReplyStep];
      if (state.palaceDecision === "decline") return {id:palace.declineReplyId, text:palace.declineReply};
    }
    if (state.holidayPhase === "market") {
      if (state.marketStep < market.lines.length) return market.lines[state.marketStep];
      if (state.marketDecision === "accept") return {id:market.acceptReactionId, text:market.acceptReaction};
    }
    if (state.holidayPhase === "final-message" && state.finalStep === 1)
      return {id:chinaFinal.stephenLastLineId, text:chinaFinal.stephenLastLine};
    // Shared rescue opening: reuse Chapter Two's audio-completion, Pause/Play,
    // Next and missing-file fallback contract without changing its screenplay.
    if (state.holidayPhase === "rescue-alarm" && state.rescueAlarmStep < rescueAlarm.lines.length)
      return rescueAlarm.lines[state.rescueAlarmStep];
    if (state.holidayPhase === "rescue-hotel") {
      if (state.hubIntroStep < rescueHub.opening.length)
        return rescueHub.opening[state.hubIntroStep];
      if (state.hubMatched)
        return state.hubCorrectStep < rescueHub.correct.length
          ? rescueHub.correct[state.hubCorrectStep] : null;
      if (!state.hubActiveClue && Number.isInteger(state.hubVoiceFeedbackStep)) {
        const replies = rescueHub.wrong[state.hubLastWrongRoute];
        if (replies && state.hubVoiceFeedbackStep < replies.length)
          return replies[state.hubVoiceFeedbackStep];
        if (state.hubVoiceFeedbackStep === 2 && state.hubWrongGuesses >= 2 && !state.hubVoiceHintHeard)
          return {id:"rescue.hub.hint."+state.route,
            text:rescueHub.hint[state.route].replace(/^Paul:\s*/, "")};
      }
    }
    if (state.route === "cult" && state.holidayPhase === "rescue-route-intro") {
      const line = rescueFramework.routes.cult.intro[state.rescueProgress?.introStep];
      return line || null;
    }
    if (state.route === "cult" && state.holidayPhase === "rescue-minigame") {
      const p = rescueFramework.normalise(state.rescueProgress,"cult");
      const reply = state.summitResponse;
      const roundIndex = reply?.correct && reply.round === p.miniGameStage - 1
        ? reply.round : p.miniGameStage;
      const round = summit.rounds[roundIndex];
      if (!round) return null;
      if (reply && reply.round === roundIndex) {
        const selected = round.options.find(option => option.id === reply.choice);
        if (!selected) return null;
        const index = state.summitVoiceStep;
        if (Number.isInteger(index) && index >= 0 && index < selected.voices.length)
          return selected.voices[index];
        if (!reply.correct && index === selected.voices.length &&
            p.hintVisible && !state.summitHintHeard)
          return {id:round.hintId, text:round.hint.replace(/^Paul:\s*/, "")};
        return null; // Feedback finished; player chooses again or correct choice continues.
      }
      return {id:round.promptId, text:round.prompt.replace(/^GATEKEEPER:\s*/, "")};
    }
    if (state.route === "cult" && state.holidayPhase === "rescue-route-ending") {
      const p = rescueFramework.normalise(state.rescueProgress,"cult");
      return summit.ending[p.endingStep] || null; // End card remains silent.
    }
    return null;
  }

  function stopHolidayVoice() {
    holidayVoiceToken++;
    if (holidayVoiceStartTimer !== null) clearTimeout(holidayVoiceStartTimer);
    holidayVoiceStartTimer = null;
    const old = holidayVoice;
    holidayVoice = null;
    holidayVoiceId = null;
    holidayVoiceStatus = "off";
    if (old) {
      old.onended = null;
      old.onerror = null;
      try { old.pause(); } catch (_) { /* Optional audio. */ }
    }
  }

  function holidayVoiceUnavailable(clip, token, missingFile = false) {
    if (holidayVoice !== clip || token !== holidayVoiceToken) return;
    // Do not retry the same failed clip on every reschedule. The current
    // beat falls back to its text duration while later clips still work.
    missingHolidayVoices.add(holidayVoiceId);
    stopHolidayVoice();
    holidayVoiceStatus = "missing";
    renderTransitionNarration();
    scheduleHolidayAdvance();
  }

  function playHolidayVoice(clip, token) {
    if (holidayVoice !== clip || holidayVoiceToken !== token) return;
    holidayVoiceStatus = "loading";
    if (holidayVoiceStartTimer !== null) clearTimeout(holidayVoiceStartTimer);
    holidayVoiceStartTimer = setTimeout(() => {
      if (holidayVoice === clip && holidayVoiceStatus === "loading")
        holidayVoiceUnavailable(clip, token);
    }, VOICE_START_TIMEOUT_MS);
    try {
      const playing = clip.play();
      if (playing && typeof playing.then === "function") {
        playing.then(() => {
          if (holidayVoice !== clip || holidayVoiceToken !== token) return;
          if (holidayVoiceStartTimer !== null) clearTimeout(holidayVoiceStartTimer);
          holidayVoiceStartTimer = null;
          if (holidayVoiceStatus !== "paused") holidayVoiceStatus = "playing";
          scheduleHolidayAdvance();
        }).catch(() => holidayVoiceUnavailable(clip, token));
      } else {
        if (holidayVoiceStartTimer !== null) clearTimeout(holidayVoiceStartTimer);
        holidayVoiceStartTimer = null;
        holidayVoiceStatus = "playing";
      }
    } catch (_) {
      holidayVoiceUnavailable(clip, token);
    }
  }

  function syncHolidayVoice() {
    const beat = holidayVoiceBeat();
    const id = beat?.id || null;
    const enabled = soundEnabled && !screens.holiday.hidden && !document.hidden &&
      typeof window.Audio === "function";
    if (!id || !enabled || missingHolidayVoices.has(id)) {
      if (holidayVoice) stopHolidayVoice();
      holidayVoiceStatus = id && missingHolidayVoices.has(id) ? "missing" : "off";
      return;
    }
    if (holidayVoice && holidayVoiceId !== id) stopHolidayVoice();
    if (!holidayAutoPlaying) {
      if (holidayVoice && ["loading","playing"].includes(holidayVoiceStatus)) {
        if (holidayVoiceStartTimer !== null) clearTimeout(holidayVoiceStartTimer);
        holidayVoiceStartTimer = null;
        holidayVoiceStatus = "paused";
        try { holidayVoice.pause(); } catch (_) { /* Keep manual navigation. */ }
      }
      return;
    }
    if (holidayVoice) {
      if (holidayVoiceStatus === "paused") playHolidayVoice(holidayVoice, holidayVoiceToken);
      return;
    }
    let clip;
    try { clip = new window.Audio(); }
    catch (_) {
      missingHolidayVoices.add(id);
      holidayVoiceStatus = "missing";
      return;
    }
    const token = holidayVoiceToken;
    holidayVoice = clip;
    holidayVoiceId = id;
    clip.preload = "auto";
    clip.src = VOICE_PATH + id + ".mp3";
    clip.onended = () => {
      if (holidayVoice !== clip || holidayVoiceToken !== token) return;
      if (holidayVoiceStartTimer !== null) clearTimeout(holidayVoiceStartTimer);
      holidayVoiceStartTimer = null;
      holidayVoiceStatus = "finished";
      scheduleHolidayAdvance();
    };
    clip.onerror = () => holidayVoiceUnavailable(clip, token, true);
    playHolidayVoice(clip, token);
  }

  // GAME-SP3.4: Holiday scenes share the pauseable, cinematic playback bar.
  // Optional recordings own timing for their scene; choices remain manual.
  let holidayAutoPlaying = true;
  let holidayAdvanceTimer = null;
  let holidayAdvanceAction = null;
  let holidayAdvanceToken = 0;

  function clearHolidayAdvanceTimer() {
    holidayAdvanceToken++;
    if (holidayAdvanceTimer !== null) {
      clearTimeout(holidayAdvanceTimer);
      holidayAdvanceTimer = null;
    }
    holidayAdvanceAction = null;
  }

  function holidayLineMs(text, isCard = false) {
    if (isCard) return 3600;
    const chars = typeof text === "string" ? text.length : 0;
    return Math.min(8500, Math.max(2600, 1550 + chars * 43));
  }

  // Return only steps with no unresolved choice, active clue or puzzle gesture.
  // Scene-specific continuations can still be used by the legacy test harness.
  function holidayStoryStep() {
    const phase = state.holidayPhase;
    const step = (run, text, isCard = false) => ({run, wait:holidayLineMs(text, isCard)});
    if (phase === "transition") return step(startWall, "", true);
    if (phase === "wall") {
      if (state.wallStep < greatWall.lines.length && !state.wallDecision) {
        return step(nextWallLine, greatWall.lines[state.wallStep]?.text);
      }
      if (state.wallDecision === "accept") return step(() => beginRouteHandoff("cult"), "", true);
      if (state.wallDecision === "decline") return step(() => beginIntermission("palace"), "", true);
    }
    if (phase === "palace") {
      if (state.palaceStep < palace.lines.length) return step(nextPalaceLine, palace.lines[state.palaceStep]?.text);
      if (state.palaceDecision === "accept" &&
          state.palaceReplyStep < palace.acceptReply.length)
        return step(nextPalaceLine, palace.acceptReply[state.palaceReplyStep]?.text);
      if (state.palaceDecision === "accept") return step(() => beginRouteHandoff("detention"), "", true);
      if (state.palaceDecision === "decline") return step(() => beginIntermission("market"), "", true);
    }
    if (phase === "market") {
      if (state.marketStep < market.lines.length) return step(nextMarketLine,market.lines[state.marketStep]?.text);
      if (state.marketDecision === "accept") return step(()=>beginRouteHandoff("reassemble"), "", true);
    }
    if (phase === "intermission") return step(continueIntermission, "", true);
    if (phase === "route-handoff") return step(continueRouteHandoff, "", true);
    if (phase === "final-message") return step(advanceFinalMessage, "", true);
    if (phase === "rescue-alarm") {
      if (state.rescueAlarmStep < rescueAlarm.lines.length)
        return step(nextRescueAlarmLine, rescueAlarm.lines[state.rescueAlarmStep]?.text);
      return step(startRescueTravel, "", true);
    }
    if (phase === "rescue-travel") {
      const line = rescueAlarm.montage[state.rescueTravelStep];
      return step(nextRescueTravel, line?.text || line?.detail, true);
    }
    if (phase === "rescue-hub-arrival") return step(enterHotelInvestigation, "", true);
    if (phase === "rescue-hotel") {
      if (state.hubIntroStep < rescueHub.opening.length)
        return step(nextHotelIntro, rescueHub.opening[state.hubIntroStep]?.text);
      if (state.hubMatched === true) {
        const line = rescueHub.correct[Math.min(state.hubCorrectStep || 0,rescueHub.correct.length - 1)];
        return step(advanceHotelResolution, line?.text);
      }
      // Wrong-guess dialogue and Paul's first hint speak while deduction
      // buttons remain active. Clue props themselves remain silent.
      if (!state.hubActiveClue && Number.isInteger(state.hubVoiceFeedbackStep)) {
        const line = rescueHub.wrong[state.hubLastWrongRoute]?.[state.hubVoiceFeedbackStep];
        if (line) return step(nextHotelFeedback, line.text);
        if (state.hubVoiceFeedbackStep === 2 && state.hubWrongGuesses >= 2 &&
            !state.hubVoiceHintHeard)
          return step(nextHotelFeedback, rescueHub.hint[state.route].replace(/^Paul:\s*/, ""));
      }
      return null; // Stop while clues or destination options are active.
    }
    if (phase === "rescue-route-intro") {
      const route = rescueFramework.routes[state.route];
      if (!route) return null;
      return step(nextRouteIntro, route.intro[state.rescueProgress?.introStep]?.text, 
        state.rescueProgress?.introStep >= route.intro.length);
    }
    if (phase === "rescue-minigame") {
      const p = rescueFramework.normalise(state.rescueProgress,state.route);
      if (!p) return null;
      if (state.route === "cult") {
        const reply = state.summitResponse;
        const roundIndex = reply?.correct && reply.round === p.miniGameStage - 1
          ? reply.round : p.miniGameStage;
        const round = summit.rounds[roundIndex];
        const choice = reply && round?.options.find(o=>o.id===reply.choice);
        if (choice && Number.isInteger(state.summitVoiceStep)) {
          if (state.summitVoiceStep < choice.voices.length)
            return step(advanceSummitVoice, choice.voices[state.summitVoiceStep]?.text);
          if (!reply.correct && state.summitVoiceStep === choice.voices.length &&
              p.hintVisible && !state.summitHintHeard)
            return step(advanceSummitVoice, round.hint);
        }
        if (reply?.correct && reply.round === p.miniGameStage - 1)
          return {run:continueSummit,wait:VOICE_GAP_MS};
      }
      if (state.route === "detention" && state.detentionResponse?.correct === true &&
          state.detentionResponse.round === p.miniGameStage - 1)
        return step(continueDetention, detention.rounds[state.detentionResponse.round]?.approvedResponse || "Form accepted.");
      return null; // All new answers, stamp and assembly pieces are manual.
    }
    if (phase === "rescue-route-ending") {
      const p = rescueFramework.normalise(state.rescueProgress,state.route);
      if (!p?.finished) return null;
      const data = state.route === "cult" ? summit : state.route === "detention" ? detention
        : state.route === "reassemble" && state.assemblyPowered === true ? assembly : null;
      const action = state.route === "cult" ? advanceSummitEnding
        : state.route === "detention" ? advanceDetentionEnding : advanceAssemblyEnding;
      if (!data) return null;
      return step(action,data.ending[p.endingStep]?.text,p.endingStep >= data.ending.length);
    }
    return null; // Ending summaries and unresolved decisions wait for input.
  }


  // GAME-SP4.1D2: explicit atomic checkpoints. Never drive them by repeated
  // synthetic Next clicks and never manufacture an unresolved choice or a
  // successful puzzle result. All changes are persisted by renderHoliday().
  let pendingSkipFocus = null;

  function skipToInvestigation(route) {
    // Only a route chosen by Stephen, or previously locked by that choice,
    // may land at the hotel. The clue puzzle remains completely unattempted.
    state.route = route;
    state.pendingPlan = route;
    state.finalStep = 2;
    state.rescueAlarmStep = rescueAlarm.lines.length;
    state.rescueTravelStep = rescueAlarm.montage.length - 1;
    state.hubIntroStep = rescueHub.opening.length;
    state.hubViewed = [];
    state.hubActiveClue = null;
    state.hubWrongGuesses = 0;
    state.hubLastWrongRoute = null;
    state.hubMatched = false;
    state.hubCorrectStep = 0;
    state.hubVoiceFeedbackStep = null;
    state.hubVoiceHintHeard = false;
    delete state.rescueProgress;
    delete state.summitResponse;
    delete state.summitVoiceStep;
    delete state.summitHintHeard;
    delete state.detentionResponse;
    delete state.detentionStampFound;
    delete state.detentionStampSelected;
    delete state.assemblySelectedPart;
    delete state.assemblyFeedback;
    delete state.assemblyPowered;
    state.holidayPhase = "rescue-hotel";
  }

  function skipToPalaceChoice() {
    // Preserve the earlier Wall decline, but discard any later tentative
    // decisions before revealing the genuinely unanswered Palace choice.
    clearDownstream();
    state.palaceStep = palace.lines.length;
    state.holidayPhase = "palace";
  }

  function skipToMarketInvitation() {
    // Night Market has no optional branch. The last, fixed invitation was
    // always accepted by advancing the script normally.
    state.marketStep = market.lines.length;
    state.marketDecision = "accept";
    state.pendingPlan = "reassemble";
    state.holidayPhase = "market";
  }

  function finishScriptedEnding(route) {
    const data = route === "cult" ? summit :
      route === "detention" ? detention : assembly;
    const progress = rescueFramework.normalise(state.rescueProgress,route);
    state.rescueProgress = progress;
    progress.endingStep = data.ending.length;
    state.holidayPhase = "rescue-ending-summary";
  }

  function holidaySkipCheckpoint() {
    const phase = state.holidayPhase;
    const point = (label,focusId,apply) => ({label,focusId,apply});
    const route = state.route;
    const locked = validHolidayRoutes.includes(route) &&
      (route === "cult" && state.wallDecision === "accept" ||
       route === "detention" && state.wallDecision === "decline" &&
         state.palaceDecision === "accept" ||
       route === "reassemble" && state.wallDecision === "decline" &&
         state.palaceDecision === "decline" && state.marketDecision === "accept");
    const toHotel = (r) => point("Skip to investigation","hotelPhoneButton",
      () => skipToInvestigation(r));

    if (phase === "transition" ||
        phase === "wall" && !state.wallDecision && state.wallStep < greatWall.lines.length)
      return point("Skip to choice","wallAcceptButton",() => {
        if (phase === "transition") {
          state.wallDecision = null;
          clearDownstream();
          state.holidayPhase = "wall";
        }
        state.wallStep = greatWall.lines.length;
      });
    if (phase === "wall" && state.wallDecision === "accept")
      return toHotel("cult");
    if (phase === "wall" && state.wallDecision === "decline")
      return point("Skip to choice","palaceAcceptButton",skipToPalaceChoice);

    if (phase === "intermission" && state.intermissionTarget === "palace" &&
        state.wallDecision === "decline")
      return point("Skip to choice","palaceAcceptButton",skipToPalaceChoice);
    if (phase === "intermission" && state.intermissionTarget === "market" &&
        state.wallDecision === "decline" && state.palaceDecision === "decline")
      return point("Skip to invitation","marketGoIncidentButton",skipToMarketInvitation);

    if (phase === "palace" && state.wallDecision === "decline") {
      if (!state.palaceDecision && state.palaceStep < palace.lines.length)
        return point("Skip to choice","palaceAcceptButton",
          () => { state.palaceStep = palace.lines.length; });
      if (state.palaceDecision === "accept") return toHotel("detention");
      if (state.palaceDecision === "decline")
        return point("Skip to invitation","marketGoIncidentButton",skipToMarketInvitation);
    }
    if (phase === "market" && state.wallDecision === "decline" &&
        state.palaceDecision === "decline") {
      if (state.marketStep < market.lines.length)
        return point("Skip to invitation","marketGoIncidentButton",skipToMarketInvitation);
      if (state.marketDecision === "accept") return toHotel("reassemble");
    }

    if (["route-handoff","final-message","rescue-alarm","rescue-travel",
         "rescue-hub-arrival"].includes(phase) && locked)
      return toHotel(route);
    if (phase === "rescue-hotel" && validHolidayRoutes.includes(route)) {
      if (state.hubIntroStep < rescueHub.opening.length)
        return point("Skip to investigation","hotelPhoneButton",
          () => { state.hubIntroStep = rescueHub.opening.length; });
      if (state.hubMatched === true && !state.hubActiveClue)
        return point("Skip to game",route === "cult" ? "summitChoice0" :
          route === "detention" ? "detentionChoice0" : "assemblyPiece0",() => {
          state.hubCorrectStep = rescueHub.correct.length;
          state.rescueProgress = rescueFramework.fresh(route);
          state.holidayPhase = "rescue-minigame";
        });
      if (!state.hubMatched && !state.hubActiveClue &&
          Number.isInteger(state.hubVoiceFeedbackStep))
        return point("Skip to investigation","hotelCultButton",() => {
          state.hubVoiceHintHeard = state.hubVoiceHintHeard ||
            state.hubWrongGuesses >= 2;
          state.hubVoiceFeedbackStep = null;
        });
      return null; // An open clue or unanswered deduction is never skipped.
    }
    if (phase === "rescue-route-intro" && state.hubMatched === true &&
        validHolidayRoutes.includes(route))
      return point("Skip to game",route === "cult" ? "summitChoice0" :
        route === "detention" ? "detentionChoice0" : "assemblyPiece0",() => {
        // Preserve already-solved steps if the player returned to briefing.
        state.rescueProgress = rescueFramework.normalise(state.rescueProgress,route);
        state.holidayPhase = "rescue-minigame";
      });

    if (["rescue-minigame","rescue-route-ending"].includes(phase) &&
        state.hubMatched === true && validHolidayRoutes.includes(route)) {
      const progress = rescueFramework.normalise(state.rescueProgress,route);
      if (!progress.finished ||
          route === "reassemble" && state.assemblyPowered !== true)
        return null;
      // Game success must already have been recorded by the real puzzle.
      return point("Skip to end","rescueSummaryReplayButton",
        () => finishScriptedEnding(route));
    }
    return null;
  }

  function focusSkippedCheckpoint() {
    if (!pendingSkipFocus || window.SMP_ASSET_LOADER?.busy()) return;
    const target = $(pendingSkipFocus);
    pendingSkipFocus = null;
    if (target && !target.hidden && typeof target.focus === "function") {
      target.focus({preventScroll:true});
    }
  }

  function skipHolidayToCheckpoint() {
    if (screens.holiday.hidden) return;
    const checkpoint = holidaySkipCheckpoint();
    if (!checkpoint) return; // Reject clicks on an obsolete/hidden control.
    clearHolidayAdvanceTimer();
    stopHolidayVoice(); // Also invalidates late audio callbacks and queued starts.
    pendingSkipFocus = checkpoint.focusId;
    checkpoint.apply();
    renderHoliday();
    focusSkippedCheckpoint();
  }

  function scheduleHolidayAdvance() {
    clearHolidayAdvanceTimer();
    if (screens.holiday.hidden) return;
    const next = holidayStoryStep();
    holidayAdvanceAction = next?.run || null;
    const playing = holidayAutoPlaying && !document.hidden;
    $("holidayScreen").dataset.autoAdvance = playing ? "playing" : "paused";
    $("holidayPauseButton").textContent = playing ? "Ⅱ Pause" : "▶ Play";
    $("holidayPauseButton").setAttribute("aria-pressed", String(playing));
    $("holidayNextButton").hidden = !next;
    const skipCheckpoint = holidaySkipCheckpoint();
    $("holidaySkipButton").hidden = !skipCheckpoint;
    $("holidaySkipButton").textContent = skipCheckpoint ? skipCheckpoint.label+" ↗" : "Skip ↗";
    const canChange = state.wallDecision === "accept" || state.wallDecision === "decline";
    $("holidayRouteButton").hidden = !canChange;
    $("holidayRouteButton").textContent = state.holidayPhase === "rescue-ending-summary"
      ? "Play another ending ↺" : "Change route ↺";
    $("holidayPlaybackStatus").textContent = !playing ? "Paused · Next advances one line"
      : next ? "Playing · choices and puzzles pause automatically"
        : "Waiting for your choice";
    if (window.SMP_ASSET_LOADER?.busy()) {
      // A previous holiday-scene MP3 must not continue playing behind a new
      // loading curtain. Do not interrupt the current beat on a repeat render.
      const upcomingId = holidayVoiceBeat()?.id || null;
      if (holidayVoice && holidayVoiceId !== upcomingId) stopHolidayVoice();
      return;
    }
    syncHolidayVoice();
    if (!playing || !next || ["loading","playing","paused"].includes(holidayVoiceStatus)) return;
    const token = holidayAdvanceToken;
    const wait = holidayVoiceStatus === "finished" ? VOICE_GAP_MS : next.wait;
    holidayAdvanceTimer = setTimeout(() => {
      holidayAdvanceTimer = null;
      if (token !== holidayAdvanceToken || !holidayAutoPlaying ||
          screens.holiday.hidden || document.hidden) return;
      next.run();
    },wait);
  }

  function setHolidayAutoplay(enabled) {
    holidayAutoPlaying = Boolean(enabled);
    scheduleHolidayAdvance();
    refreshSpeakerFocus();
  }

  function nextHolidayStoryBeat() {
    if (screens.holiday.hidden || !holidayAdvanceAction) return;
    const run = holidayAdvanceAction;
    clearHolidayAdvanceTimer();
    run();
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
        const migrated = migrateHolidaySave(stored);
        if (migrated.scene === "holiday" &&
            ["rescue-route-intro", "rescue-minigame", "rescue-route-ending", "rescue-ending-summary"].includes(migrated.holidayPhase)) {
          // An old save is still valid: initialise the new narrow progress
          // record. Never revive an uncommitted or mismatched route.
          if (!rescueFramework.validRoute(migrated.route) || migrated.hubMatched !== true) {
            migrated.holidayPhase = rescueFramework.validRoute(migrated.route) ? "rescue-hotel" : "wall";
            delete migrated.rescueProgress;
          } else {
            migrated.rescueProgress = rescueFramework.normalise(migrated.rescueProgress, migrated.route);
            if (["rescue-route-ending","rescue-ending-summary"].includes(migrated.holidayPhase)) {
              const validEnding = migrated.rescueProgress.finished &&
                (migrated.route === "cult" || migrated.route === "detention" ||
                 migrated.route === "reassemble" && migrated.assemblyPowered === true);
              if (!validEnding) migrated.holidayPhase = "rescue-minigame";
            }
          }
        }
        return migrated;
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
    if (screenName !== "holiday") {
      clearHolidayAdvanceTimer();
      stopHolidayVoice();
    }
    if (screenName !== "office") {
      clearAdvanceTimer();
      stopVoice();
      stopSong();
      pessimisticOffer = false;
    }
    const entering = screens[screenName].hidden;
    for (const [name, screen] of Object.entries(screens)) screen.hidden = name !== screenName;
    // Starting on a scrolled menu used to leave the office scene's toolbar
    // outside the visible laptop viewport. Reset only on actual screen changes,
    // not on every spoken line, Back, or Next.
    if (entering && typeof window.scrollTo === "function") window.scrollTo(0, 0);
    if (screenName === "menu") clearSpeakerFocus();
  }

  function setSound(enabled, rememberChoice = false) {
    if (rememberChoice) soundPreferenceSet = true;
    soundEnabled = Boolean(enabled);
    if (!soundEnabled) {
      stopVoice();
      stopSong();
      stopHolidayVoice();
      if (!screens.office.hidden) {
        syncSongActions();
        scheduleAdvance();
      }
    } else if (!screens.office.hidden && !document.hidden) {
      const beat = beats[beatIndexById.get(state.beatId)];
      if (!pessimisticOffer) startVoice(beat);
      if (beat.id === "office.v07" && autoPlaying) startSong("optimistic", "preview");
      scheduleAdvance();
    }
    if (!screens.holiday.hidden) scheduleHolidayAdvance();
    for (const id of ["soundButton", "sceneSoundButton", "menuSoundButton", "holidaySoundButton"]) {
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
    risk: '<img class="cutaway-approved-art cutaway-approved-risk" src="./public/assets/generated/game/office-david-risk-cutaway-v01.webp" width="1672" height="941" alt="David’s laptop showing his over-detailed pre-holiday risk assessment for Stephen’s China trip: 97% likely to be fine, with exaggerated dangers and David’s absurd contingency planning.">',
    printer: '<img class="cutaway-approved-art cutaway-approved-printer" src="./public/assets/generated/game/office-printer-bear-cutaway-v01.webp" width="1672" height="941" alt="In the office, the multifunction printer is producing large cartoon pictures of a smiling Chinese leader with a honey-loving bear. Several printed bear pictures are visible, with no separate page animation yet.">',
    chat: '<img class="cutaway-approved-art cutaway-approved-chat" src="./public/assets/generated/game/office-phone-group-chat-cutaway-v01.webp" width="1672" height="940" alt="An office phone displays a new group called Operation: Save Stephen. The group portrait is a honey-loving cartoon bear, and the only notification reads: Paul added David and Stephen to the group. There are no chat messages yet.">',
    muted: '<img class="cutaway-approved-art cutaway-approved-muted" src="./public/assets/generated/game/office-phone-group-muted-cutaway-v01.webp" width="1672" height="940" alt="The Operation: Save Stephen group on an office phone. Beneath Paul’s earlier group-creation notice, a crossed-out bell marks a new system notification: Stephen Martin has muted the group. The honey-loving bear remains the group picture.">',
    folder: '<div class="cutaway-heading">DAVID’S LAPTOP · FILE EXPLORER</div><div class="cutaway-special cutaway-folder"><strong>📁 RESCUE PLAN - FINAL - FINAL 2</strong><p>📄 Backup rescue plan · 📄 Alternative rescue plan · 📄 Risk matrix · 📄 Final final final</p></div>'
  };

  function cutawayFor(beat) {
    // GAME-SP4.1G0B: the dedicated song modal replaces the obsolete
    // optimistic cutaway; never render two lyric/song cards simultaneously.
    return beat.visual === "song" ? null : beat.visual || null;
  }

  // Approved, individually cropped game portraits. Reaction aliases map the
  // original dialogue cues to the six available facial expressions per person.
  // D1 composition playtest: one human-approved, transparent seated sprite
  // per actor. Keep reaction cues in the scene state for the future D2 pass,
  // but never swap misaligned head-and-shoulder portraits into seated bodies.
  // Static sprite file paths live in index.html for immediate/offline rendering.

  function renderOffice() {
    pessimisticOffer = false;
    songNotice = "";
    stopSong();
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
    // A revisit must start at the first verse, but a preview-to-full switch
    // on the same beat must retain its current scroll and audio position.
    $("officeSongLyrics").dataset.kind = "";
    $("officeSongLyricsScroll").scrollTop = 0;
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
    refreshSpeakerFocus();
    // GAME-SP4.1A: reveal each illustrated set only after its visible images
    // and CSS backgrounds have decoded. Alternate expressions retain the
    // current scene and are not allowed to restart the loading curtain.
    const officeArtworkKey = "office:" + (cutaway || (beat.id === "intro.exterior" ? "exterior" : "interior"));
    const officeArtworkPending = window.SMP_ASSET_LOADER?.present(officeArtworkKey, $("stage"), () => {
      if (screens.office.hidden || state.beatId !== beat.id) return;
      refreshSpeakerFocus();
      startVoice(beat);
      scheduleAdvance();
    }) || false;
    persist();
    syncSongActions();
    if (beat.sound && beat.visual !== "song") beep(beat.sound);
    if (!officeArtworkPending) startVoice(beat);
    if (beat.id === "office.v07" && autoPlaying) startSong("optimistic", "preview");
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
    if (state.beatId === "office.041" && !pessimisticOffer) {
      stopVoice();
      offerPessimisticSong();
      return;
    }
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
    state.hubIntroStep = 0;
    state.hubActiveClue = null;
    state.hubViewed = [];
    state.hubWrongGuesses = 0;
    state.hubLastWrongRoute = null;
    state.hubMatched = false;
    state.hubCorrectStep = 0;
    state.hubVoiceFeedbackStep = null;
    state.hubVoiceHintHeard = false;
    delete state.rescueProgress;
    delete state.summitResponse;
    delete state.summitVoiceStep;
    delete state.summitHintHeard;
    delete state.detentionResponse;
    delete state.detentionStampFound;
    delete state.detentionStampSelected;
    delete state.assemblySelectedPart;
    delete state.assemblyFeedback;
    delete state.assemblyPowered;
  }
  // Keep each existing reply and choice ID. Promote the first spoken
  // character prefix into the named card; later character cues stay inline.
  function renderNamedResponse(cardId, speakerId, textId, response) {
    const copy = typeof response === "string" ? response : "";
    const prefix = /^([A-Za-z][A-Za-z ]{1,24}):\s*/.exec(copy);
    $(cardId).hidden = !copy;
    $(textId).hidden = !copy;
    $(speakerId).textContent = prefix ? prefix[1].toUpperCase() : "RESPONSE";
    $(textId).textContent = prefix ? copy.slice(prefix[0].length) : copy;
  }


  // GAME-SP4.1E: visible speaker-to-actor map, shared by every illustrated
  // scene. It annotates existing sprite elements; no position/scale/image
  // changes and never treats a narrator or unseen person as a visible actor.
  const speakerFocusActors = {
    office: {stephen:"castStephen",david:"castDavid",paul:"castPaul"},
    wall: {stephen:"wallStephen",promoter:"wallPromoter"},
    palace: {stephen:"palaceStephen",attendant:"palaceAttendant"},
    market: {stephen:"marketStephen","spa representative":"marketSpaRep"},
    alarm: {david:"rescueAlarmDavid",paul:"rescueAlarmPaul"},
    hotel: {david:"rescueHotelDavid",paul:"rescueHotelPaul"},
    cultIntro: {david:"summitEntranceDavid",paul:"summitEntrancePaul",gatekeeper:"summitEntranceGatekeeper"},
    detentionIntro: {david:"detentionIntroDavid",paul:"detentionIntroPaul",official:"detentionIntroOfficial"},
    reassembleIntro: {david:"spaIntroDavid",paul:"spaIntroPaul"},
    summitEnding: {stephen:"summitThroneStephen",david:"summitThroneDavid",paul:"summitThronePaul"},
    detentionEnding: {stephen:"detentionEndingStephenActor",david:"detentionEndingDavidActor",
      paul:"detentionEndingPaulActor",official:"detentionEndingOfficialActor"},
    reassembleEnding: {stephen:"assemblyEndingStephenActor",david:"assemblyEndingDavidActor",
      paul:"assemblyEndingPaulActor","cardboard stephen":"assemblyEndingCardboardActor"}
  };

  // Previous-scene and narrator glow must be cleared first. Native image
  // elements cannot use pseudo-elements, so CSS uses their own subtle shadow.
  function clearSpeakerFocus() {
    // The office's older speaking/listening classes also need resetting.
    // Otherwise Pause hides the new glow but leaves the old emphasis behind.
    for (const el of Object.values(cast)) {
      el.classList.toggle("is-speaking",false);
      el.classList.toggle("is-listening",false);
    }
    for (const actors of Object.values(speakerFocusActors)) {
      for (const id of Object.values(actors)) $(id).dataset.speaking = "false";
    }
    for (const id of ["rescueRouteIntro","summitEndingScene",
                       "detentionEndingScene","reassembleEndingScene"])
      $(id).dataset.speaker = "";
  }

  function setActiveSpeaker(scene, speaker) {
    const actors = speakerFocusActors[scene] || {};
    const key = typeof speaker === "string" ? speaker.trim().toLowerCase() : "";
    const id = Object.hasOwn(actors,key) ? actors[key] : null;
    if (!id || $(id).hidden) return;
    $(id).dataset.speaking = "true";
    const root = {
      cultIntro:"rescueRouteIntro",detentionIntro:"rescueRouteIntro",
      reassembleIntro:"rescueRouteIntro",summitEnding:"summitEndingScene",
      detentionEnding:"detentionEndingScene",reassembleEnding:"reassembleEndingScene"
    }[scene];
    if (root) $(root).dataset.speaker = key;
  }

  function refreshSpeakerFocus() {
    clearSpeakerFocus();
    const visible = !document.hidden && !window.SMP_ASSET_LOADER?.busy();
    if (!visible) return;
    if (!screens.office.hidden) {
      const beat = beats[beatIndexById.get(state.beatId)];
      if (autoPlaying && beat?.type === "dialogue") {
        for (const [name,el] of Object.entries(cast)) {
          el.classList.toggle("is-speaking",beat.speaker === name && !el.hidden);
          el.classList.toggle("is-listening",beat.speaker in cast && beat.speaker !== name);
        }
        setActiveSpeaker("office",beat.speaker);
      }
      return;
    }
    if (screens.holiday.hidden || !holidayAutoPlaying) return;
    const phase = state.holidayPhase;
    const speech = (box,speaker) => $(box).hidden ? "" : $(speaker).textContent;
    if (phase === "wall") setActiveSpeaker("wall",speech("wallDialogue","wallSpeakerName"));
    else if (phase === "palace") setActiveSpeaker("palace",speech("palaceDialogue","palaceSpeakerName"));
    else if (phase === "market") setActiveSpeaker("market",speech("marketDialogue","marketSpeakerName"));
    else if (phase === "rescue-alarm" && state.rescueAlarmStep < rescueAlarm.lines.length)
      setActiveSpeaker("alarm",$("rescueAlarmSpeaker").textContent);
    else if (phase === "rescue-hotel")
      setActiveSpeaker("hotel",speech("rescueHotelDialogue","hotelSpeaker"));
    else if (phase === "rescue-route-intro") {
      const route = state.route === "cult" ? "cultIntro" :
        state.route === "detention" ? "detentionIntro" :
        state.route === "reassemble" ? "reassembleIntro" : null;
      if (route) setActiveSpeaker(route,speech("routeIntroDialogue","routeIntroSpeaker"));
    } else if (phase === "rescue-route-ending") {
      const ending = state.route === "cult" ? ["summitEnding","summitEndingSpeaker"] :
        state.route === "detention" ? ["detentionEnding","detentionEndingSpeaker"] :
        state.route === "reassemble" ? ["reassembleEnding","assemblyEndingSpeaker"] : null;
      if (ending) setActiveSpeaker(ending[0],$(ending[1]).textContent);
    }
    // Intermissions, phone, travel, puzzles and the end summary have no
    // active on-stage spoken character. Their visuals remain unhighlighted.
  }

  function renderHoliday() {
    clearHolidayAdvanceTimer();
    reveal("holiday");
    if (["rescue-route-intro", "rescue-minigame", "rescue-route-ending", "rescue-ending-summary"].includes(state.holidayPhase) &&
        (!rescueFramework.validRoute(state.route) || state.hubMatched !== true)) {
      state.holidayPhase = rescueFramework.validRoute(state.route) ? "rescue-hotel" : "wall";
      delete state.rescueProgress;
    }
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
    const inHotel = phase === "rescue-hotel";
    const inRouteIntro = phase === "rescue-route-intro";
    const inMiniGame = phase === "rescue-minigame";
    const inSummitEnding = phase === "rescue-route-ending" && state.route === "cult";
    const inDetentionEnding = phase === "rescue-route-ending" && state.route === "detention";
    const inAssemblyEnding = phase === "rescue-route-ending" && state.route === "reassemble";
    const inSummary = phase === "rescue-ending-summary";
    $("holidayTopbarChapter").textContent = inSummary ? "THE END" :
      (inRouteIntro || inMiniGame || inSummitEnding || inDetentionEnding || inAssemblyEnding)
        ? "CHAPTER FOUR" : (inAlarm || inTravel || inArrival || inHotel)
          ? "CHAPTER THREE" : "CHAPTER TWO";
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
    $("rescueHotelScene").hidden = !inHotel;
    $("rescueRouteIntro").hidden = !inRouteIntro;
    // The approved Summit entrance appears only while approaching/entering
    // the fictional club. Detention/spa keep their own staging, and the
    // throne-room finale will receive a separate interior background.
    $("rescueRouteIntro").dataset.route = state.route === "cult" ? "cult" : state.route === "reassemble" ? "reassemble" : "other";
    $("rescueMiniGameScene").hidden = !inMiniGame;
    $("summitEndingScene").hidden = !inSummitEnding;
    $("detentionEndingScene").hidden = !inDetentionEnding;
    $("reassembleEndingScene").hidden = !inAssemblyEnding;
    $("rescueEndingSummary").hidden = !inSummary;
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
      $("wallDialogue").hidden = position >= greatWall.lines.length && !choiceMade;
      $("wallNextButton").hidden = position >= greatWall.lines.length;
      $("wallChoices").hidden = position !== greatWall.lines.length || choiceMade;
      $("wallResult").hidden = !choiceMade;
      $("wallGoPalaceButton").hidden = decision !== "decline";
      $("wallGoIncidentButton").hidden = decision !== "accept";
      if (position < greatWall.lines.length) {
        const line = greatWall.lines[position];
        $("wallSpeakerName").textContent = line.speaker.toUpperCase();
        $("wallLineText").textContent = line.text;
      } else if (choiceMade) {
        $("wallSpeakerName").textContent = "STEPHEN";
        $("wallLineText").textContent = decision === "accept"
          ? greatWall.acceptReaction : greatWall.declineReaction;
      }
      $("wallProgressLabel").textContent = choiceMade ? "Great Wall decision saved"
        : position >= greatWall.lines.length ? "Choose Stephen's next destination"
        : "Great Wall conversation · " + (position + 1) + " of " + greatWall.lines.length;
      if (choiceMade) {
        $("wallResultTitle").textContent = decision === "accept" ? "The Summit — accepted ✓" : "Invitation declined";
        $("wallResultText").textContent = decision === "accept"
          ? greatWall.acceptReaction : greatWall.declineReaction;
        $("wallResultText").hidden = true; // Spoken dialogue is on the stage.
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
      const spokenDecline = decision === "decline" && !showingIntro;
      $("palaceDialogue").hidden = !showingIntro && !showingReply && !spokenDecline;
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
      } else if (spokenDecline) {
        $("palaceSpeakerName").textContent = "STEPHEN";
        $("palaceLineText").textContent = palace.declineReply;
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
        $("palaceResultText").hidden = !accepted;
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
      $("marketDialogue").hidden = false; // Final reaction is also spoken.
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
        $("marketResultText").hidden = true;
        $("marketSpeakerName").textContent = "STEPHEN";
        $("marketLineText").textContent = market.acceptReaction;
      }
    }
    if (inIntermission) {
      const palaceNext = state.intermissionTarget === "palace";
      $("intermissionArt").dataset.destination = palaceNext ? "palace" : "market";
      $("intermissionTime").textContent = palaceNext ? "A FEW DAYS LATER…" : "THE NEXT EVENING…";
      $("intermissionDestination").textContent = palaceNext ? "THE FORBIDDEN CITY" : "THE NIGHT MARKET";
    }
    if (inHandoff) {
      const route = validHolidayRoutes.includes(state.route) ? state.route : "reassemble";
      $("routeHandoffArt").dataset.route = route;
      $("handoffTitle").textContent = handoffs[route].title;
    }
    if (inFinal) {
      const route = validHolidayRoutes.includes(state.route) ? state.route : null;
      const step = Number.isInteger(state.finalStep) ? Math.max(0, Math.min(2,state.finalStep)) : 0;
      state.finalStep = step;
      $("chinaFinalPhone").hidden = step === 2;
      $("chinaFinalPhone").dataset.power = step === 0 ? "low" : "off";
      $("chinaPhonePowerNotice").hidden = step !== 1;
      $("chinaFinalReaction").hidden = step !== 1;
      $("chinaFinalEngland").hidden = step !== 2;
      $("chinaFinalNextButton").hidden = false;
      $("chinaFinalNextButton").textContent = step === 2
        ? "Back to David and Paul →" : "Continue →";
      $("chinaAnotherEndingButton").hidden = step !== 2;
      // The incomplete message has ALREADY reached David and Paul.
      // Only Stephen's ability to continue is cut short by a flat battery.
      $("chinaBatteryLabel").textContent = step ? "0% · Battery flat" : "1% · LOW BATTERY";
      $("chinaPhoneStatus").textContent = step
        ? "Last partial message delivered · phone switched off"
        : "Partial message delivered";
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
      $("rescueTravelScene").dataset.montage = position < 2 ? "flight-luggage" : "map-expenses";
      const line = rescueAlarm.montage[position];
      $("rescueTravelEyebrow").textContent = line.eyebrow;
      $("rescueTravelSymbol").textContent = line.symbol;
      $("rescueTravelTitle").textContent = line.title;
      $("rescueTravelProgress").textContent = "Unnecessary travel · "
        + (position + 1) + " of " + rescueAlarm.montage.length;
      $("rescueTravelNextButton").textContent = position === rescueAlarm.montage.length - 1
        ? "Arrive at visitor information →" : "Continue →";
    }

    if (inHotel) {
      const introStep = Number.isInteger(state.hubIntroStep)
        ? Math.max(0, Math.min(state.hubIntroStep, rescueHub.opening.length)) : 0;
      state.hubIntroStep = introStep;
      const duringIntro = introStep < rescueHub.opening.length;
      const matched = state.hubMatched === true;
      const clue = ["phone","brochure","desk"].includes(state.hubActiveClue)
        ? state.hubActiveClue : null;
      const route = validHolidayRoutes.includes(state.route) ? state.route : null;
      const choice = rescueHub.destinations.find(item => item.route === route);
      $("rescueHotelDialogue").hidden = !duringIntro;
      $("hotelNextButton").hidden = !duringIntro;
      $("rescueHotelHotspots").hidden = duringIntro || matched;
      $("hotelEvidencePanel").hidden = duringIntro || matched || !clue;
      $("hotelDeductions").hidden = duringIntro || matched || Boolean(clue);
      $("hotelResolved").hidden = !matched;
      $("hotelProgress").textContent = duringIntro
        ? "Hotel arrival · " + (introStep + 1) + " of " + rescueHub.opening.length
        : matched ? "David has finally identified the destination"
          : "Investigation · " + (Array.isArray(state.hubViewed) ? state.hubViewed.length : 0)
            + " of 3 clues inspected";
      if (duringIntro) {
        const line = rescueHub.opening[introStep];
        $("hotelSpeaker").textContent = line.speaker.toUpperCase();
        $("hotelLine").textContent = line.text;
      }
      if (!duringIntro && clue && route && choice) {
        const item = rescueHub.hotspots[clue];
        $("hotelEvidenceTitle").textContent = item.title;
        $("hotelEvidenceText").textContent = clue === "phone"
          ? chinaFinal.messageByRoute[route] : item.text;
        $("hotelEvidenceRouteClue").hidden = clue !== "desk";
        $("hotelEvidenceRouteClue").textContent = clue === "desk"
          ? "Booking receipt · circled symbol " + choice.symbol + " · " + choice.clue : "";
        if (clue === "brochure") {
          $("hotelEvidenceText").textContent = rescueHub.destinations
            .map(d => d.symbol + " " + d.label).join(" · ");
        }
      }
      const wrongRoute = validHolidayRoutes.includes(state.hubLastWrongRoute)
        ? state.hubLastWrongRoute : null;
      const mistakes = Number.isInteger(state.hubWrongGuesses) ? state.hubWrongGuesses : 0;
      $("hotelDeductionFeedback").textContent = wrongRoute
        ? rescueHub.wrong[wrongRoute].map(x => x.speaker + ": " + x.text).join(" ") : "";
      $("hotelHint").hidden = mistakes < 2;
      $("hotelHint").textContent = route ? rescueHub.hint[route] : "";
      for(const destination of rescueHub.destinations) {
        const button = $("hotel" + destination.route[0].toUpperCase() + destination.route.slice(1) + "Button");
        button.dataset.correct = mistakes >= 4 && destination.route === route ? "true" : "false";
      }
      if (matched && route) {
        const step = Number.isInteger(state.hubCorrectStep)
          ? Math.max(0, Math.min(state.hubCorrectStep, rescueHub.correct.length)) : 0;
        state.hubCorrectStep = step;
        const line = rescueHub.correct[Math.min(step, rescueHub.correct.length - 1)];
        $("hotelResolvedText").textContent = line.speaker + ": " + line.text;
        $("hotelFinishButton").textContent = step < rescueHub.correct.length - 1
          ? "Next line →" : step === rescueHub.correct.length - 1
            ? "Finish deduction →" : "Head to " + choice.label + " →";
      }
      // Voiced wrong guesses, Paul's hint and correct replies reuse the
      // existing in-scene named dialogue rather than the blue footer.
      let hotelSpeech = duringIntro ? rescueHub.opening[introStep] : null;
      if (!duringIntro && matched) {
        hotelSpeech = rescueHub.correct[Math.min(state.hubCorrectStep || 0, rescueHub.correct.length - 1)];
      } else if (!duringIntro && !clue && Number.isInteger(state.hubVoiceFeedbackStep)) {
        hotelSpeech = rescueHub.wrong[wrongRoute]?.[state.hubVoiceFeedbackStep] || null;
        if (!hotelSpeech && state.hubVoiceFeedbackStep === 2 &&
            mistakes >= 2 && !state.hubVoiceHintHeard && route) {
          hotelSpeech = {speaker:"Paul",text:rescueHub.hint[route].replace(/^Paul:\s*/, "")};
        }
      }
      $("rescueHotelDialogue").hidden = !hotelSpeech;
      if (hotelSpeech) {
        $("hotelSpeaker").textContent = hotelSpeech.speaker.toUpperCase();
        $("hotelLine").textContent = hotelSpeech.text;
      }
      $("hotelDeductionFeedback").hidden = true;
      $("hotelResolvedText").hidden = Boolean(matched);
    }
    if (inRouteIntro || inMiniGame || inSummitEnding || inDetentionEnding || inAssemblyEnding || inSummary) {
      const route = state.route;
      const config = rescueFramework.routes[route];
      const progress = rescueFramework.normalise(state.rescueProgress, route);
      state.rescueProgress = progress;
      if (inRouteIntro) {
        $("rescueRouteIntro").dataset.endingB = route === "detention" ? "true" : "false";
        const choice = rescueHub.destinations.find(item => item.route === route);
        $("hotelRouteHeading").textContent = choice ? choice.label.toUpperCase() : config.title;
        $("hotelRouteDescription").textContent = rescueHub.routeIntro[route];
        const duringDialogue = progress.introStep < config.intro.length;
        const line = config.intro[Math.min(progress.introStep, config.intro.length - 1)];
        $("routeIntroDialogue").hidden = !duringDialogue;
        $("routeIntroSpeaker").textContent = duringDialogue ? line.speaker.toUpperCase() : "";
        $("routeIntroLine").textContent = duringDialogue ? line.text : "";
        // The three separately approved Summit sprites remain fixed on the
        // exterior stage; highlight whoever owns the current spoken line.
        $("rescueRouteIntro").dataset.speaker = duringDialogue && (route === "cult" || route === "detention" || route === "reassemble")
          ? line.speaker.toLowerCase() : "";
        $("routeIntroStatus").textContent = duringDialogue
          ? "Rescue briefing · " + (progress.introStep + 1) + " of " + config.intro.length
          : "Briefing complete. " + config.gameTitle + " is the next stage.";
        $("routeIntroNextButton").textContent = duringDialogue
          ? "Next line →" : "Continue to " + config.gameTitle + " →";
      }
      if (inMiniGame) {
        $("rescueMiniGameScene").dataset.route = route;
        const playableSummit = route === "cult";
        const playableDetention = route === "detention";
        const playableAssembly = route === "reassemble";
        $("rescueMiniGamePlaceholder").hidden = playableSummit || playableDetention || playableAssembly;
        $("summitAdmissions").hidden = !playableSummit;
        $("detentionPaperwork").hidden = !playableDetention;
        $("reassembleWorkshop").hidden = !playableAssembly;
        $("rescueMiniGameTitle").textContent = config.gameTitle;
        $("rescueMiniGameDescription").textContent = rescueHub.routeIntro[route];
        $("rescueMiniGameStatus").textContent = config.workPackage
          + " will supply the playable puzzle. No rounds or ending can be skipped in this preview.";
        $("rescueMiniGameProgressLabel").textContent = playableSummit
          ? "Summit admissions · three checks to reach Stephen"
          : playableDetention
            ? "Fictional paperwork · three steps to a permit"
            : playableAssembly
              ? "Cardboard souvenir · six slots and a POWER ON button"
              : "Briefing complete · Mini-game forthcoming";
        if (playableSummit) {
          const savedReply = state.summitResponse;
          const acknowledging = savedReply && savedReply.correct === true &&
            savedReply.round === progress.miniGameStage - 1;
          const roundIndex = acknowledging
            ? savedReply.round : Math.min(progress.miniGameStage, summit.rounds.length - 1);
          const round = summit.rounds[roundIndex];
          const response = savedReply && savedReply.round === roundIndex
            ? round.options.find(option => option.id === savedReply.choice) : null;
          $("summitRoundTitle").textContent = round.title;
          $("summitRoundProgress").textContent = "Admission check " + (roundIndex + 1)
            + " of " + summit.rounds.length;
          $("summitRoundPrompt").textContent = round.prompt;
          $("summitRoundClue").textContent = round.clue;
          $("summitChoiceCards").hidden = acknowledging;
          for (let i = 0; i < round.options.length; i++) {
            const button = $("summitChoice" + i);
            button.textContent = round.options[i].label;
            button.dataset.correct = "false";
          }
          renderNamedResponse("summitResponseCard", "summitResponseSpeaker", "summitFeedback",
            response ? response.response : "");
          $("summitHint").hidden = acknowledging || !progress.hintVisible;
          $("summitHint").textContent = progress.hintVisible ? round.hint : "";
          $("summitNextButton").hidden = !acknowledging;
          $("summitNextButton").textContent = progress.finished
            ? "Find Stephen →" : "Continue to check " + (roundIndex + 2) + " →";
        }
        if (playableDetention) {
          const reply = state.detentionResponse;
          const acknowledging = reply && reply.correct === true &&
            reply.round === progress.miniGameStage - 1;
          const roundIndex = acknowledging
            ? reply.round : Math.min(progress.miniGameStage, detention.rounds.length - 1);
          const round = detention.rounds[roundIndex];
          const option = reply && reply.round === roundIndex
            ? round.options.find(value => value.id === reply.choice) : null;
          $("detentionRoundTitle").textContent = round.title;
          $("detentionRoundProgress").textContent = "Form stage " + (roundIndex + 1)
            + " of " + detention.rounds.length;
          $("detentionRoundPrompt").textContent = round.prompt;
          $("detentionRoundClue").textContent = round.clue;
          // Art direction only: the three approved source compositions do not
          // alter answers, hint counting, save keys or touch/keyboard controls.
          $("detentionBearArtLink").hidden = roundIndex !== 1;
          $("detentionCupPreview").hidden = roundIndex !== 2 ||
            state.detentionStampFound === true || Boolean(acknowledging);
          $("detentionApprovedPreview").hidden = !(acknowledging && roundIndex === 2);
          $("detentionInkOnPermit").hidden = !(acknowledging && roundIndex === 2);
          $("detentionChoiceCards").hidden = acknowledging ||
            (roundIndex === 2 && state.detentionStampFound === true);
          for (let i = 0; i < round.options.length; i++) {
            $("detentionChoice" + i).textContent = round.options[i].label;
          }
          const inStampSearch = roundIndex === 2 && state.detentionStampFound === true && !acknowledging;
          $("detentionStampPanel").hidden = !inStampSearch;
          $("detentionStampButton").dataset.selected = inStampSearch && state.detentionStampSelected === true ? "true" : "false";
          $("detentionStampButton").setAttribute("aria-pressed",
            inStampSearch && state.detentionStampSelected === true ? "true" : "false");
          const stampMessage = state.detentionStampSelected === true
            ? "Stamp selected. Tap the permit or drag the stamp onto it."
            : "The APPROVED stamp was under Paul's takeaway drink. Select it and then tap the permit, or drag it onto the permit.";
          $("detentionStampInstructions").textContent = stampMessage;
          $("detentionPermitLabel").textContent = acknowledging
            ? detention.permitText : "Apply stamp to Stephen's release permit";
          const feedback = acknowledging && roundIndex === 2
            ? round.approvedResponse
            : state.detentionStampSelected === true && inStampSearch
              ? "Paul: That's it. Put it on the permit. David: I was about to suggest the same."
              : option ? option.response : "";
          renderNamedResponse("detentionResponseCard", "detentionResponseSpeaker",
            "detentionFeedback", feedback);
          $("detentionHint").hidden = acknowledging || !progress.hintVisible;
          $("detentionHint").textContent = progress.hintVisible ? round.hint : "";
          $("detentionNextButton").hidden = !acknowledging;
          $("detentionNextButton").textContent = progress.finished
            ? "Collect Stephen →" : "Continue to form stage " + (roundIndex + 2) + " →";
        }
        if (playableAssembly) {
          const placed = progress.placedParts;
          const selected = state.assemblySelectedPart;
          const selectedPart = [...assembly.parts,...assembly.decoys].find(part => part.id === selected);
          $("assemblyProgress").textContent = placed.length + " of 6 cardboard pieces placed";
          for(let i=0;i<assembly.parts.length+assembly.decoys.length;i++){
            const part = [...assembly.parts,...assembly.decoys][i];
            const pieceButton = $("assemblyPiece"+i);
            const isPlaced = placed.includes(part.id);
            $("assemblyPieceLabel"+i).textContent = part.label + (isPlaced ? " ✓ Placed" : "");
            pieceButton.disabled = isPlaced || progress.finished;
            pieceButton.dataset.placed = isPlaced ? "true" : "false";
            pieceButton.dataset.selected = selected === part.id && !isPlaced ? "true" : "false";
            pieceButton.setAttribute("aria-pressed",selected === part.id && !isPlaced ? "true" : "false");
          }
          for(let i=0;i<assembly.parts.length;i++){
            const part = assembly.parts[i];
            const slot = $("assemblySlot"+i);
            const filled = placed.includes(part.id);
            $("assemblySlotLabel"+i).textContent = filled ? "✓ "+part.label+" fitted" : part.label+" · empty slot";
            $("assemblySlotArt"+i).hidden = !filled;
            slot.disabled = filled || progress.finished;
            slot.dataset.filled = filled ? "true" : "false";
            slot.dataset.hint = progress.hintVisible && selected === part.id && !filled ? "true" : "false";
          }
          $("assemblyFeedback").textContent = state.assemblyFeedback ||
            "Select a labelled foam/cardboard part and tap the matching silhouette slot.";
          $("assemblyHint").hidden = !progress.hintVisible || progress.finished;
          $("assemblyHint").textContent = selectedPart && assembly.parts.some(part => part.id === selected)
            ? "Paul: Match the "+selectedPart.label+" shape to the standee. He faces us, so his left is on your right."
            : "Paul: Try the six normal cardboard bits. Spare kidneys, Wi-Fi hearts and toasters are extras.";
          $("assemblyPowerButton").hidden = !progress.finished || state.assemblyPowered === true;
          $("assemblyPowerButton").textContent = assembly.powerText+" →";
        }
      }
      if (inSummitEnding) {
        if (route !== "cult" || !progress.finished) {
          state.holidayPhase = "rescue-minigame";
          return renderHoliday();
        }
        const step = Math.min(progress.endingStep, summit.ending.length);
        state.rescueProgress.endingStep = step;
        const card = step === summit.ending.length;
        const line = summit.ending[Math.min(step, summit.ending.length - 1)];
        $("summitEndingSpeaker").textContent = card ? "ENDING A" : line.speaker.toUpperCase();
        // All three approved throne-room sprites stay in place; speaker focus
        // moves between Stephen, David and Paul without interrupting autoplay.
        $("summitEndingScene").dataset.speaker = card ? "" : line.speaker.toLowerCase();
        $("summitEndingLine").textContent = card ? summit.endCard : line.text;
        $("summitEndingProgress").textContent = card
          ? "Stephen appears to be having the time of his life."
          : "The unnecessary rescue · " + (step + 1) + " of " + summit.ending.length;
        $("summitEndingNextButton").textContent = card
          ? "See ending summary →" : step === summit.ending.length - 1
            ? "Reveal ending →" : "Next line →";
      }
      if (inDetentionEnding) {
        if (!progress.finished) {
          state.holidayPhase = "rescue-minigame";
          return renderHoliday();
        }
        const step = Math.min(progress.endingStep, detention.ending.length);
        state.rescueProgress.endingStep = step;
        const showCard = step === detention.ending.length;
        const line = detention.ending[Math.min(step, detention.ending.length - 1)];
        $("detentionEndingScene").dataset.speaker = showCard ? "" : line.speaker.toLowerCase();
        $("detentionEndingSpeaker").textContent = showCard ? "ENDING B" : line.speaker.toUpperCase();
        $("detentionEndingLine").textContent = showCard ? detention.endCard : line.text;
        $("detentionEndingProgress").textContent = showCard
          ? "The printer has finally been left behind."
          : "Diplomatic extraction · " + (step + 1) + " of " + detention.ending.length;
        $("detentionEndingNextButton").textContent = showCard
          ? "See ending summary →" : step === detention.ending.length - 1
            ? "Reveal ending →" : "Next line →";
      }
      if (inAssemblyEnding) {
        if (!progress.finished || state.assemblyPowered !== true) {
          state.holidayPhase = "rescue-minigame";
          return renderHoliday();
        }
        const step = Math.min(progress.endingStep, assembly.ending.length);
        state.rescueProgress.endingStep = step;
        const card = step === assembly.ending.length;
        const line = assembly.ending[Math.min(step,assembly.ending.length-1)];
        $("reassembleEndingScene").dataset.speaker = card ? "" : line.speaker.toLowerCase();
        $("assemblyEndingSpeaker").textContent = card ? "ENDING C" : line.speaker.toUpperCase();
        $("assemblyEndingLine").textContent = card ? assembly.endCard : line.text;
        $("assemblyEndingProgress").textContent = card
          ? "Nobody needed rebuilding. Especially not Stephen."
          : "Spa misunderstanding · "+(step+1)+" of "+assembly.ending.length;
        $("assemblyEndingNextButton").textContent = card
          ? "See ending summary →" : step === assembly.ending.length-1
            ? "Reveal ending →" : "Next line →";
      }
      if (inSummary) {
        const completedEnding = progress.finished &&
          (route === "cult" && progress.endingStep >= summit.ending.length ||
           route === "detention" && progress.endingStep >= detention.ending.length ||
           route === "reassemble" && state.assemblyPowered === true &&
              progress.endingStep >= assembly.ending.length);
        if (!completedEnding) {
          state.holidayPhase = "rescue-minigame";
          return renderHoliday();
        }
        $("rescueSummaryHeading").textContent = config.endingTitle;
        $("rescueSummaryMessage").textContent = route === "cult"
          ? "Stephen is perfectly happy at The Summit. David's operation has rescued absolutely nobody."
          : route === "detention"
            ? "A bear meme caused an administrative queue, not a kidnapping. The fictitious office has approved everybody's departure."
            : "Stephen was enjoying a massage. The lads bought a cardboard cut-out and spare parts, then congratulated themselves.";
        $("rescueSummaryDisclaimer").textContent = "Ending "+(route === "cult" ? "A" : route === "detention" ? "B" : "C")
          + " complete. New illustrations are deferred until the full functional game is approved.";
      }
    }
    renderTransitionNarration();
    // The DOM phase toggles above have completed. Never wait for hidden
    // branches; image decoding is scoped to the currently visible stage.
    const visibleHolidayScene = inWall ? "wallScene" : inPalace ? "palaceScene"
      : inMarket ? "marketScene" : inIntermission ? "chinaIntermission"
      : inHandoff ? "chinaRouteHandoff" : inFinal ? "chinaFinalScene"
      : inAlarm ? "rescueAlarmScene" : inTravel ? "rescueTravelScene"
      : inArrival ? "rescueHubArrival" : inHotel ? "rescueHotelScene"
      : inRouteIntro ? "rescueRouteIntro" : inMiniGame ? "rescueMiniGameScene"
      : inSummitEnding ? "summitEndingScene"
      : inDetentionEnding ? "detentionEndingScene"
      : inAssemblyEnding ? "reassembleEndingScene"
      : inSummary ? "rescueEndingSummary" : "chinaTransition";
    const artworkPhase = phase + ":" + (state.route || "") + ":" + (inMiniGame ? state.rescueProgress?.miniGameStage || 0 : "");
    window.SMP_ASSET_LOADER?.present("holiday:" + artworkPhase,
      $(visibleHolidayScene), () => {
        if (!screens.holiday.hidden && state.holidayPhase === phase) {
          scheduleHolidayAdvance();
          refreshSpeakerFocus();
          focusSkippedCheckpoint();
        }
      });
    state.holidayFlowVersion = 2;
    persist();
    scheduleHolidayAdvance();
    refreshSpeakerFocus();
  }

  function showHoliday() {
    holidayAutoPlaying = true;
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


  function enterHotelInvestigation() {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-hub-arrival" ||
        !validHolidayRoutes.includes(state.route)) return;
    state.holidayPhase = "rescue-hotel";
    state.hubIntroStep = 0;
    state.hubViewed = [];
    state.hubActiveClue = null;
    state.hubWrongGuesses = 0;
    state.hubLastWrongRoute = null;
    state.hubMatched = false;
    state.hubCorrectStep = 0;
    state.hubVoiceFeedbackStep = null;
    state.hubVoiceHintHeard = false;
    renderHoliday();
  }

  function nextHotelFeedback() {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-hotel" ||
        state.hubMatched || state.hubActiveClue ||
        !Number.isInteger(state.hubVoiceFeedbackStep)) return;
    if (state.hubVoiceFeedbackStep < 2) {
      state.hubVoiceFeedbackStep++;
      if (state.hubVoiceFeedbackStep === 2 &&
          (state.hubWrongGuesses < 2 || state.hubVoiceHintHeard))
        state.hubVoiceFeedbackStep = null;
    } else {
      state.hubVoiceHintHeard = true;
      state.hubVoiceFeedbackStep = null;
    }
    renderHoliday();
  }

  function nextHotelIntro() {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-hotel" ||
        state.hubIntroStep >= rescueHub.opening.length) return;
    state.hubIntroStep++;
    renderHoliday();
  }

  function inspectHotelClue(which) {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-hotel" ||
        state.hubIntroStep < rescueHub.opening.length || state.hubMatched ||
        !Object.hasOwn(rescueHub.hotspots, which)) return;
    state.hubActiveClue = which;
    if (!Array.isArray(state.hubViewed)) state.hubViewed = [];
    if (!state.hubViewed.includes(which)) state.hubViewed.push(which);
    renderHoliday();
  }

  function closeHotelClue() {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-hotel" ||
        !state.hubActiveClue) return;
    state.hubActiveClue = null;
    renderHoliday();
  }

  function makeHotelDeduction(route) {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-hotel" ||
        state.hubIntroStep < rescueHub.opening.length || state.hubMatched ||
        state.hubActiveClue || !validHolidayRoutes.includes(route) ||
        !validHolidayRoutes.includes(state.route)) return;
    // A repeated incorrect selection must restart the same voice ID afresh.
    stopHolidayVoice();
    if (route === state.route) {
      state.hubMatched = true;
      state.hubCorrectStep = 0;
      state.hubVoiceFeedbackStep = null;
      state.hubLastWrongRoute = null;
    } else {
      state.hubWrongGuesses = Math.min(4,Math.max(0,state.hubWrongGuesses || 0) + 1);
      state.hubLastWrongRoute = route;
      state.hubVoiceFeedbackStep = 0;
    }
    // This is a deduction puzzle, never a second route choice.
    renderHoliday();
  }

  function advanceHotelResolution() {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-hotel" ||
        state.hubMatched !== true || !validHolidayRoutes.includes(state.route)) return;
    if (state.hubCorrectStep < rescueHub.correct.length) {
      state.hubCorrectStep++;
    } else {
      state.holidayPhase = "rescue-route-intro";
      state.rescueProgress = rescueFramework.fresh(state.route);
    }
    renderHoliday();
  }

  function nextRouteIntro() {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-route-intro" ||
        state.hubMatched !== true || !rescueFramework.validRoute(state.route)) return;
    const config = rescueFramework.routes[state.route];
    state.rescueProgress = rescueFramework.normalise(state.rescueProgress, state.route);
    if (state.rescueProgress.introStep < config.intro.length) state.rescueProgress.introStep++;
    else state.holidayPhase = "rescue-minigame";
    renderHoliday();
  }

  function backToRescueBriefing() {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-minigame" ||
        !rescueFramework.validRoute(state.route)) return;
    state.holidayPhase = "rescue-route-intro";
    state.rescueProgress = rescueFramework.normalise(state.rescueProgress, state.route);
    renderHoliday();
  }

  function advanceSummitVoice() {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-minigame" ||
        state.route !== "cult" || !Number.isInteger(state.summitVoiceStep)) return;
    const reply = state.summitResponse;
    const selected = summit.rounds[reply?.round]?.options.find(o=>o.id===reply.choice);
    if (!selected) return;
    const len = selected.voices.length;
    if (state.summitVoiceStep < len - 1) state.summitVoiceStep++;
    else if (state.summitVoiceStep === len - 1) {
      const progress = rescueFramework.normalise(state.rescueProgress,"cult");
      state.summitVoiceStep = !reply.correct && progress.hintVisible &&
        !state.summitHintHeard ? len : null;
    } else if (state.summitVoiceStep === len) {
      state.summitHintHeard = true;
      state.summitVoiceStep = null;
    }
    renderHoliday();
  }

  function answerSummit(which) {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-minigame" ||
        state.route !== "cult" || state.hubMatched !== true) return;
    const progress = rescueFramework.normalise(state.rescueProgress, "cult");
    if (progress.finished || (state.summitResponse && state.summitResponse.correct &&
        state.summitResponse.round === progress.miniGameStage - 1)) return;
    const round = summit.rounds[progress.miniGameStage];
    if (!round || !Number.isInteger(which) || which < 0 || which >= round.options.length) return;
    const choice = round.options[which];
    const at = progress.miniGameStage;
    stopHolidayVoice(); // Even the same wrong answer must replay from the start.
    state.summitVoiceStep = 0;
    state.rescueProgress = choice.correct
      ? rescueFramework.completeStep(progress, "cult", at)
      : rescueFramework.wrong(progress, "cult");
    state.summitResponse = { round:at, choice:choice.id, correct:choice.correct };
    renderHoliday();
  }

  function continueSummit() {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-minigame" ||
        state.route !== "cult") return;
    const progress = rescueFramework.normalise(state.rescueProgress, "cult");
    const response = state.summitResponse;
    if (!response || response.correct !== true ||
        response.round !== progress.miniGameStage - 1) return;
    delete state.summitResponse;
    state.summitVoiceStep = null;
    state.summitHintHeard = false;
    if (progress.finished) {
      state.holidayPhase = "rescue-route-ending";
      progress.endingStep = 0;
    }
    state.rescueProgress = progress;
    renderHoliday();
  }

  function advanceSummitEnding() {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-route-ending" ||
        state.route !== "cult") return;
    const progress = rescueFramework.normalise(state.rescueProgress, "cult");
    if (!progress.finished) return;
    if (progress.endingStep < summit.ending.length) progress.endingStep++;
    else state.holidayPhase = "rescue-ending-summary";
    state.rescueProgress = progress;
    renderHoliday();
  }

  function chooseDetention(which) {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-minigame" ||
        state.route !== "detention" || state.hubMatched !== true) return;
    const progress = rescueFramework.normalise(state.rescueProgress, "detention");
    if (progress.finished ||
        (state.detentionResponse && state.detentionResponse.correct &&
         state.detentionResponse.round === progress.miniGameStage - 1)) return;
    const roundIndex = progress.miniGameStage;
    const round = detention.rounds[roundIndex];
    if (!round || !Number.isInteger(which) || which < 0 || which >= round.options.length ||
        (roundIndex === 2 && state.detentionStampFound === true)) return;
    const choice = round.options[which];
    if (roundIndex === 2 && choice.correct) {
      state.detentionStampFound = true;
      state.detentionStampSelected = false;
      state.detentionResponse = {round:roundIndex,choice:choice.id,correct:false};
    } else {
      state.rescueProgress = choice.correct
        ? rescueFramework.completeStep(progress, "detention", roundIndex)
        : rescueFramework.wrong(progress, "detention");
      state.detentionResponse = {round:roundIndex,choice:choice.id,correct:choice.correct};
    }
    renderHoliday();
  }

  function selectDetentionStamp() {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-minigame" ||
        state.route !== "detention" || state.hubMatched !== true ||
        state.detentionStampFound !== true) return;
    const progress = rescueFramework.normalise(state.rescueProgress, "detention");
    if (progress.miniGameStage !== 2 || progress.finished) return;
    state.detentionStampSelected = true;
    renderHoliday();
  }

  function applyDetentionStamp() {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-minigame" ||
        state.route !== "detention" || state.hubMatched !== true ||
        state.detentionStampFound !== true || state.detentionStampSelected !== true) return;
    const progress = rescueFramework.normalise(state.rescueProgress, "detention");
    if (progress.miniGameStage !== 2 || progress.finished) return;
    state.rescueProgress = rescueFramework.completeStep(progress,"detention",2);
    state.detentionResponse = {round:2,choice:"approved",correct:true};
    renderHoliday();
  }

  function continueDetention() {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-minigame" ||
        state.route !== "detention") return;
    const progress = rescueFramework.normalise(state.rescueProgress, "detention");
    const response = state.detentionResponse;
    if (!response || response.correct !== true ||
        response.round !== progress.miniGameStage - 1) return;
    delete state.detentionResponse;
    delete state.detentionStampFound;
    delete state.detentionStampSelected;
    if (progress.finished) {
      progress.endingStep = 0;
      state.holidayPhase = "rescue-route-ending";
    }
    state.rescueProgress = progress;
    renderHoliday();
  }

  function advanceDetentionEnding() {
    if (screens.holiday.hidden || state.holidayPhase !== "rescue-route-ending" ||
        state.route !== "detention" || state.hubMatched !== true) return;
    const progress = rescueFramework.normalise(state.rescueProgress,"detention");
    if (!progress.finished) return;
    if (progress.endingStep < detention.ending.length) progress.endingStep++;
    else state.holidayPhase = "rescue-ending-summary";
    state.rescueProgress = progress;
    renderHoliday();
  }

  function selectAssemblyPiece(id) {
    if(screens.holiday.hidden || state.holidayPhase !== "rescue-minigame" ||
       state.route !== "reassemble" || state.hubMatched !== true) return;
    const progress = rescueFramework.normalise(state.rescueProgress,"reassemble");
    const item = [...assembly.parts,...assembly.decoys].find(part => part.id === id);
    if (!item || progress.finished || progress.placedParts.includes(id)) return;
    state.assemblySelectedPart = id;
    state.assemblyFeedback = item.label+" selected. Tap its matching silhouette slot.";
    renderHoliday();
  }

  function placeAssemblyPiece(slot) {
    if(screens.holiday.hidden || state.holidayPhase !== "rescue-minigame" ||
       state.route !== "reassemble" || state.hubMatched !== true) return;
    const progress = rescueFramework.normalise(state.rescueProgress,"reassemble");
    const selected = state.assemblySelectedPart;
    if(progress.finished || !assembly.parts.some(part=>part.id===slot) ||
       progress.placedParts.includes(slot)) return;
    if(!selected || ![...assembly.parts,...assembly.decoys].some(part=>part.id===selected)){
      state.assemblyFeedback = "Paul: Select a cardboard piece from the tray first.";
      renderHoliday();
      return;
    }
    const accepted = selected === slot;
    state.rescueProgress = rescueFramework.placePart(progress,"reassemble",selected,slot);
    state.assemblyFeedback = accepted
      ? "✓ "+assembly.parts.find(part=>part.id===selected).label
        +" snapped into the foam display. Paul: That actually fits."
      : assembly.reaction(selected,slot);
    if(accepted) delete state.assemblySelectedPart;
    renderHoliday();
  }

  function powerOnAssembly() {
    if(screens.holiday.hidden || state.holidayPhase !== "rescue-minigame" ||
       state.route !== "reassemble" || state.hubMatched !== true ||
       state.assemblyPowered === true) return;
    const progress = rescueFramework.normalise(state.rescueProgress,"reassemble");
    if(!progress.finished || progress.placedParts.length !== rescueFramework.slots.length) return;
    state.assemblyPowered = true;
    state.rescueProgress = progress;
    state.rescueProgress.endingStep = 0;
    state.holidayPhase = "rescue-route-ending";
    renderHoliday();
  }

  function advanceAssemblyEnding() {
    if(screens.holiday.hidden || state.holidayPhase !== "rescue-route-ending" ||
       state.route !== "reassemble" || state.hubMatched !== true ||
       state.assemblyPowered !== true) return;
    const progress = rescueFramework.normalise(state.rescueProgress,"reassemble");
    if(!progress.finished) return;
    if(progress.endingStep < assembly.ending.length) progress.endingStep++;
    else state.holidayPhase = "rescue-ending-summary";
    state.rescueProgress = progress;
    renderHoliday();
  }

  function chooseAnotherEnding() {
    if (screens.holiday.hidden ||
        !(state.wallDecision === "accept" || state.wallDecision === "decline")) return;
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
    window.SMP_ASSET_LOADER?.present("menu", $("menuScreen"), () => {
      // Warm only the immediate first exterior scene, not every route.
      window.SMP_ASSET_LOADER?.warm("./public/assets/generated/locations/office-exterior-opening-v01.webp");
    });
  }

  function resume() {
    clearAdvanceTimer();
    clearHolidayAdvanceTimer();
    holidayAutoPlaying = true;
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
  $("rescueHubStartButton").addEventListener("click", enterHotelInvestigation);
  $("hotelNextButton").addEventListener("click", nextHotelIntro);
  $("hotelPhoneButton").addEventListener("click", () => inspectHotelClue("phone"));
  $("hotelBrochureButton").addEventListener("click", () => inspectHotelClue("brochure"));
  $("hotelDeskButton").addEventListener("click", () => inspectHotelClue("desk"));
  $("hotelEvidenceCloseButton").addEventListener("click", closeHotelClue);
  $("hotelCultButton").addEventListener("click", () => makeHotelDeduction("cult"));
  $("hotelDetentionButton").addEventListener("click", () => makeHotelDeduction("detention"));
  $("hotelReassembleButton").addEventListener("click", () => makeHotelDeduction("reassemble"));
  $("hotelFinishButton").addEventListener("click", advanceHotelResolution);
  $("hotelRouteReplayButton").addEventListener("click", chooseAnotherEnding);
  $("routeIntroNextButton").addEventListener("click", nextRouteIntro);
  $("rescueMiniGameBackButton").addEventListener("click", backToRescueBriefing);
  for (let i = 0; i < 3; i++) {
    $("summitChoice" + i).addEventListener("click", () => answerSummit(i));
  }
  $("summitNextButton").addEventListener("click", continueSummit);
  $("summitEndingNextButton").addEventListener("click", advanceSummitEnding);
  for (let i = 0; i < 3; i++) {
    $("detentionChoice" + i).addEventListener("click", () => chooseDetention(i));
  }
  $("detentionStampButton").addEventListener("click", selectDetentionStamp);
  $("detentionStampButton").addEventListener("dragstart", event => {
    selectDetentionStamp();
    if (event.dataTransfer) event.dataTransfer.setData("text/plain","approved-stamp");
  });
  $("detentionPermitButton").addEventListener("click", applyDetentionStamp);
  $("detentionPermitButton").addEventListener("dragover", event => event.preventDefault());
  $("detentionPermitButton").addEventListener("drop", event => {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.getData("text/plain") === "approved-stamp") {
      selectDetentionStamp();
      applyDetentionStamp();
    }
  });
  $("detentionNextButton").addEventListener("click", continueDetention);
  $("detentionEndingNextButton").addEventListener("click", advanceDetentionEnding);
  for(let i=0;i<assembly.parts.length+assembly.decoys.length;i++){
    const item=[...assembly.parts,...assembly.decoys][i];
    const element=$("assemblyPiece"+i);
    element.addEventListener("click",()=>selectAssemblyPiece(item.id));
    element.addEventListener("dragstart",event=>{
      selectAssemblyPiece(item.id);
      if(event.dataTransfer) event.dataTransfer.setData("text/plain",item.id);
    });
  }
  for(let i=0;i<assembly.parts.length;i++){
    const slot=assembly.parts[i];
    const element=$("assemblySlot"+i);
    element.addEventListener("click",()=>placeAssemblyPiece(slot.id));
    element.addEventListener("dragover",event=>event.preventDefault());
    element.addEventListener("drop",event=>{
      event.preventDefault();
      if(!event.dataTransfer) return;
      const id=event.dataTransfer.getData("text/plain");
      if(![...assembly.parts,...assembly.decoys].some(item=>item.id===id)) return;
      selectAssemblyPiece(id);
      placeAssemblyPiece(slot.id);
    });
  }
  $("assemblyPowerButton").addEventListener("click",powerOnAssembly);
  $("assemblyEndingNextButton").addEventListener("click",advanceAssemblyEnding);
  $("rescueMiniGameReplayButton").addEventListener("click", chooseAnotherEnding);
  $("rescueSummaryReplayButton").addEventListener("click", chooseAnotherEnding);
  $("rescueSummaryRestartButton").addEventListener("click", startOffice);
  $("rescueSummaryMenuButton").addEventListener("click", showMenu);
  $("holidayPauseButton").addEventListener("click",()=>setHolidayAutoplay(!holidayAutoPlaying));
  $("holidayNextButton").addEventListener("click",nextHolidayStoryBeat);
  $("holidaySkipButton").addEventListener("click",skipHolidayToCheckpoint);
  $("holidayRouteButton").addEventListener("click",chooseAnotherEnding);
  $("soundButton").addEventListener("click", () => setSound(!soundEnabled, true));
  $("sceneSoundButton").addEventListener("click", () => setSound(!soundEnabled, true));
  $("menuSoundButton").addEventListener("click", () => setSound(!soundEnabled, true));
  $("holidaySoundButton").addEventListener("click", () => setSound(!soundEnabled, true));
  $("playPauseButton").addEventListener("click", () => setAutoplay(!autoPlaying));
  $("songListenButton").addEventListener("click", listenToSong);
  $("songStopButton").addEventListener("click", skipFullSong);
  $("songDeclineButton").addEventListener("click", declinePessimisticSong);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      // Never consume story lines in a background tab.
      if (!screens.holiday.hidden) {
        holidayAutoPlaying = false;
        scheduleHolidayAdvance();
      }
      clearAdvanceTimer();
      autoPlaying = false;
      if (voice) {
        clearVoiceStartTimeout();
        voicePhase = "paused";
        try { voice.pause(); } catch (_) { /* Tab remains paused. */ }
      }
      if (song) {
        clearSongTimers();
        songPhase = "paused";
        try { song.pause(); } catch (_) { /* Tab remains paused. */ }
      }
      syncPlaybackControls();
      refreshSpeakerFocus();
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
