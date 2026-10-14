/* GAME-SP2.2 — owner-locked GAME-SP2.1 holiday script: Great Wall slice. */
(function () {
  "use strict";
  window.SMP_CHINA_WALL = Object.freeze({
    title: "THE GREAT WALL",
    phoneFrom: "DAVID · STEPHEN RESCUE GROUP",
    phoneText: "Please confirm you're safe. I've identified several geopolitical variables.",
    lines: [
      { id: "china.wall.001", speaker: "Stephen", text: "I'm on one of the wonders of the world and he's still being a prick." },
      { id: "china.wall.002", speaker: "Promoter", text: "You look like someone who'd enjoy The Summit. Exclusive mountain retreat. Very friendly gentlemen. Spectacular views." },
      { id: "china.wall.003", speaker: "Stephen", text: "How friendly?" },
      { id: "china.wall.004", speaker: "Promoter", text: "Extremely." },
      { id: "china.wall.005", speaker: "Stephen", text: "Go on." }
    ],
    acceptLabel: "A mountain full of handsome men? Sign me up.",
    declineLabel: "Tempting, but I've got more sightseeing to do.",
    acceptReaction: "Right. So, is it a social club or an actual cult? Actually, don't answer that.",
    declineReaction: "I'll regret this, won't I? Usually do.",
    eveningPlan: "The Summit",
    nextScene: "The Forbidden City"
  });
})();
