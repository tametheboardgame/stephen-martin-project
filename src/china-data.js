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

// GAME-SP2.3: locked GAME-SP2.1 Forbidden City dialogue and booking choice.
// Event staff and banquet are fictional, not representatives of the real site.
(function () {
  "use strict";
  window.SMP_CHINA_PALACE = Object.freeze({
    title: "THE FORBIDDEN CITY",
    event: "International Cultural Excellence Banquet",
    titleBadge: "VISITING INTERNATIONAL SPECIALIST",
    lines: [
      { id: "china.palace.001", speaker: "Attendant", text: "Excuse me, sir. Would you like to be our guest of honour at tonight's International Cultural Excellence Banquet?" },
      { id: "china.palace.002", speaker: "Stephen", text: "Why?" },
      { id: "china.palace.003", speaker: "Attendant", text: "You're British. And you've got a very confident face." },
      { id: "china.palace.004", speaker: "Stephen", text: "That's genuinely the best qualification I've ever had." }
    ],
    acceptLabel: "Free dinner AND I get to feel important? Absolutely.",
    declineLabel: "No thanks. This sounds suspiciously like a work event.",
    acceptReply: [
      { speaker: "Stephen", text: "Do I need to prepare a speech?" },
      { speaker: "Attendant", text: "No, sir. We have already prepared one in your name." },
      { speaker: "Stephen", text: "Outstanding." },
      { speaker: "Attendant", text: "Could we use a photo of you for the promotional slideshow?" },
      { speaker: "Stephen", text: "Sure, just use the first one on my phone." }
    ],
    declineReply: "I've come thousands of miles to get away from meetings. Absolutely not."
  });
})();


// GAME-SP2.3B — locked Night Market and final interrupted-message canon.
// The market and the Total Renewal Spa are entirely fictional.
(function () {
  "use strict";
  window.SMP_CHINA_MARKET = Object.freeze({
    title: "THE NIGHT MARKET",
    spaName: "Total Renewal Spa",
    signHeadline: "90% OFF",
    signOffer: "THE COMPLETE STEPHEN EXPERIENCE",
    signFinePrint: "Replacement components sold separately.",
    lines: [
      { id: "china.market.001", speaker: "Stephen", text: "Paul asked for one with Wi-Fi. How the fuck would that even work?" },
      { id: "china.market.002", speaker: "Stephen", text: "Ninety per cent off? Fucking hell." },
      { id: "china.market.003", speaker: "Spa representative", text: "Sir, would you be interested in our complete body-renewal package?" },
      { id: "china.market.004", speaker: "Stephen", text: "What does complete mean?" },
      { id: "china.market.005", speaker: "Spa representative", text: "Everything." },
      { id: "china.market.006", speaker: "Stephen", text: "That sounds brilliant." }
    ],
    acceptLabel: "Ninety per cent off? I'd be an idiot not to.",
    declineLabel: "I think I'll stick with my existing plans.",
    acceptReaction: "If this goes wrong, at least I've saved a fortune.",
    declineReaction: "Actually, no. I've already got somewhere to be."
  });
  window.SMP_CHINA_FINAL = Object.freeze({
    messageByRoute: {
      cult: "This place is unreal. They've asked me to be their...",
      detention: "I've just been introduced as the official...",
      reassemble: "This spa is incredible. They're taking my entire..."
    },
    stephenLastLine: "Oh, for fuck's sake.",
    title: "BACK IN ENGLAND…",
    subtitle: "Two idiots are about to make this considerably worse."
  });
})();
