/* GAME-SP3.0: intentionally small, dependency-free shared rescue framework.
   This is state/intro/ending infrastructure, NOT a playable mini-game. */
(function () {
  "use strict";

  const slots = Object.freeze(["head", "torso", "left-arm", "right-arm", "left-leg", "right-leg"]);
  const routes = Object.freeze({
    cult: Object.freeze({
      title: "THE SUMMIT",
      gameTitle: "The Summit Admissions Test",
      endingTitle: "HEAVEN WAS A PLACE ON EARTH",
      workPackage: "GAME-SP3.1",
      kind: "choices",
      stages: 3,
      intro: Object.freeze([
        { speaker:"Gatekeeper", text:"Welcome to The Summit. Have you come to honour our radiant new chairman?" },
        { speaker:"David", text:"We've come for Stephen Martin." },
        { speaker:"Gatekeeper", text:"Then yes." },
        { speaker:"Paul", text:"Does he know he's a chairman?" },
        { speaker:"Gatekeeper", text:"He didn't yesterday." },
        { speaker:"David", text:"We've infiltrated the inner circle." },
        { speaker:"Paul", text:"We're standing outside the gate." }
      ])
    }),
    detention: Object.freeze({
      title: "OFFICE OF CEREMONIAL MISUNDERSTANDINGS",
      gameTitle: "The Great Stamp Catastrophe",
      endingTitle: "DETAINED BY ADMINISTRATION",
      workPackage: "GAME-SP3.2",
      kind: "choices",
      stages: 3,
      intro: Object.freeze([
        { speaker:"Official", text:"You are here for the International Specialist?" },
        { speaker:"David", text:"We're here to extract Stephen Martin." },
        { speaker:"Official", text:"Form?" },
        { speaker:"David", text:"No, rescue." },
        { speaker:"Official", text:"Form." },
        { speaker:"Paul", text:"I knew we should've brought a printer." }
      ])
    }),
    reassemble: Object.freeze({
      title: "TOTAL RENEWAL SPA",
      gameTitle: "Reassemble Stephen Martin",
      endingTitle: "SOME ASSEMBLY REQUIRED",
      workPackage: "GAME-SP3.3",
      kind: "assembly",
      stages: 6,
      intro: Object.freeze([
        { speaker:"David", text:"It's worse than I feared." },
        { speaker:"Paul", text:"It's a spa." },
        { speaker:"David", text:"Look at the catalogue. 'Stephen Martin: replacement parts available'." },
        { speaker:"Paul", text:"How do they know his name?" },
        { speaker:"David", text:"Obviously an international operation." },
        { speaker:"Paul", text:"Or they made a name badge." },
        { speaker:"David", text:"Paul, we're beyond that." }
      ])
    })
  });

  function validRoute(route) { return Object.hasOwn(routes, route); }
  function clamp(value, max) {
    return Number.isInteger(value) ? Math.min(max, Math.max(0, value)) : 0;
  }
  function fresh(route) {
    if (!validRoute(route)) return null;
    return {
      version: 1, route, introStep: 0, miniGameStage: 0,
      wrongAnswers: 0, hintVisible: false, placedParts: [],
      finished: false, endingStep: 0
    };
  }
  function normalise(input, route) {
    const progress = fresh(route);
    if (!progress || !input || input.version !== 1 || input.route !== route) return progress;
    const def = routes[route];
    progress.introStep = clamp(input.introStep, def.intro.length);
    progress.miniGameStage = clamp(input.miniGameStage, def.stages);
    progress.wrongAnswers = clamp(input.wrongAnswers, 4);
    progress.hintVisible = progress.wrongAnswers >= 2;
    if (def.kind === "assembly") {
      const parts = Array.isArray(input.placedParts) ? input.placedParts : [];
      progress.placedParts = slots.filter(part => parts.includes(part));
      progress.miniGameStage = progress.placedParts.length;
    }
    progress.finished = progress.miniGameStage === def.stages && input.finished === true;
    progress.endingStep = progress.finished ? clamp(input.endingStep, 999) : 0;
    return progress;
  }
  function wrong(progress, route) {
    const p = normalise(progress, route);
    if (!p || p.finished || p.miniGameStage >= routes[route].stages) return p;
    p.wrongAnswers = Math.min(4, p.wrongAnswers + 1);
    p.hintVisible = p.wrongAnswers >= 2;
    return p;
  }
  // Called ONLY by the route-specific game after validating a correct answer.
  // A wrong answer cannot advance a stage, and repeated stage submissions
  // cannot advance twice. The final step prepares the ending, not its cutscene.
  function completeStep(progress, route, expectedStage) {
    const p = normalise(progress, route);
    if (!p || routes[route].kind !== "choices" || p.finished ||
        !Number.isInteger(expectedStage) || p.miniGameStage !== expectedStage) return p;
    p.miniGameStage++;
    p.wrongAnswers = 0;
    p.hintVisible = false;
    p.finished = p.miniGameStage === routes[route].stages;
    return p;
  }
  function placePart(progress, route, part, slot) {
    const p = normalise(progress, route);
    if (!p || route !== "reassemble" || p.finished) return p;
    if (!slots.includes(part) || part !== slot) return wrong(p, route);
    if (p.placedParts.includes(part)) return p;
    p.placedParts.push(part);
    p.miniGameStage = p.placedParts.length;
    p.wrongAnswers = 0;
    p.hintVisible = false;
    p.finished = p.miniGameStage === slots.length;
    return p;
  }
  window.SMP_RESCUE_FRAMEWORK = Object.freeze({
    routes, slots, validRoute, fresh, normalise, wrong, completeStep, placePart
  });
})();
