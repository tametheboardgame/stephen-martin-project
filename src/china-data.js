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
    acceptReactionId: "china.wall.accept-reaction",
    acceptReaction: "Right. So, is it a social club or an actual cult? Actually, don't answer that.",
    declineReactionId: "china.wall.decline-reaction",
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
      { id: "china.palace.accept.001", speaker: "Stephen", text: "Do I need to prepare a speech?" },
      { id: "china.palace.accept.002", speaker: "Attendant", text: "No, sir. We have already prepared one in your name." },
      { id: "china.palace.accept.003", speaker: "Stephen", text: "Outstanding." },
      { id: "china.palace.accept.004", speaker: "Attendant", text: "Could we use a photo of you for the promotional slideshow?" },
      { id: "china.palace.accept.005", speaker: "Stephen", text: "Sure, just use the first one on my phone." }
    ],
    declineReplyId: "china.palace.decline-reaction",
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
    acceptReactionId: "china.market.accept-reaction",
    acceptReaction: "If this goes wrong, at least I've saved a fortune.",
    declineReaction: "Actually, no. I've already got somewhere to be."
  });
  window.SMP_CHINA_FINAL = Object.freeze({
    messageByRoute: {
      cult: "This place is unreal. They've asked me to be their...",
      detention: "I've just been introduced as the official...",
      reassemble: "This spa is incredible. They're taking my entire..."
    },
    stephenLastLineId: "china.final.001",
    stephenLastLine: "Oh, for fuck's sake.",
    title: "BACK IN ENGLAND…",
    subtitle: "Two idiots are about to make this considerably worse."
  });
})();


// GAME-SP2.4A — owner-approved OFFICE-ALARM dialogue and tiny shared
// travel montage from SP-WP1.2-GAME-TREATMENT; all characters are fictional.
(function () {
  "use strict";
  window.SMP_RESCUE_ALARM = Object.freeze({
    lines: [
      { id: "rescue.alarm.001", speaker: "David", text: "Stephen has stopped responding.", david: "serious", paul: "neutral" },
      { id: "rescue.alarm.002", speaker: "Paul", text: "He said he was muting us.", david: "serious", paul: "confused" },
      { id: "rescue.alarm.003", speaker: "David", text: "Exactly. Pre-arranged silence. A signal.", david: "confident", paul: "neutral" },
      { id: "rescue.alarm.004", speaker: "Paul", text: "That would be a very stupid signal.", david: "frustrated", paul: "neutral" },
      { id: "rescue.alarm.005", speaker: "David", text: "We have established that he makes questionable decisions.", david: "serious", paul: "neutral" },
      { id: "rescue.alarm.006", speaker: "David", text: "There it is. The final transmission.", david: "systems-expert", paul: "confused", showPhone: true },
      { id: "rescue.alarm.007", speaker: "Paul", text: "Could just be his battery.", david: "serious", paul: "confused", showPhone: true },
      { id: "rescue.alarm.008", speaker: "David", text: "Paul. Please respect the gravity of this international incident.", david: "frustrated", paul: "neutral" },
      { id: "rescue.alarm.009", speaker: "Paul", text: "Right. Shall I pack the bears?", david: "serious", paul: "pleased" },
      { id: "rescue.alarm.010", speaker: "David", text: "Pack everything.", david: "confident", paul: "neutral" }
    ],
    montage: [
      { id: "rescue.travel.001", eyebrow: "OPERATION: PROBABLY FINE", title: "TWO TICKETS. ZERO PLANNING.", subtext: "Non-refundable, obviously.", symbol: "✈" },
      { id: "rescue.travel.002", eyebrow: "LUGGAGE CAROUSEL", title: "THE PRINTER MADE IT.", subtext: "Paul has packed an entirely unreasonable quantity of bear printouts.", symbol: "🧳" },
      { id: "rescue.travel.003", eyebrow: "DAVID'S STRATEGIC BRIEFING", title: "THE MAP IS UPSIDE DOWN.", subtext: "David insists this is a tactical perspective.", symbol: "🗺" },
      { id: "rescue.travel.004", eyebrow: "SEVERAL HOURS LATER…", title: "A SPECTACULAR AMOUNT OF UNNECESSARY SPENDING", subtext: "And neither of them has checked whether Stephen is actually missing.", symbol: "💳" }
    ],
    arriveHeading: "CHAPTER THREE — THE RESCUE",
    arriveLocation: "VISITOR INFORMATION",
    arriveNote: "Next: David and Paul's hotel evidence investigation (GAME-SP2.4B)."
  });
})();


// GAME-SP2.4B — shared visitor information evidence investigation.
// Dialogue and clue design follow the approved SP-WP1.2-GAME-TREATMENT.
// This is a single puzzle; it never changes Stephen's committed route.
(function () {
  "use strict";
  window.SMP_RESCUE_HUB = Object.freeze({
    opening: [
      { id:"rescue.hub.001", speaker:"David", text:"We begin with intelligence gathering. Observe, analyse, act." },
      { id:"rescue.hub.002", speaker:"Paul", text:"The hotel has little shampoos." },
      { id:"rescue.hub.003", speaker:"David", text:"Paul, focus." },
      { id:"rescue.hub.004", speaker:"Paul", text:"I am. They do conditioner too." },
      { id:"rescue.hub.005", speaker:"David", text:"I don't know why I brought you." },
      { id:"rescue.hub.006", speaker:"Paul", text:"You said you needed muscle." },
      { id:"rescue.hub.007", speaker:"David", text:"I said I needed backup." },
      { id:"rescue.hub.008", speaker:"Paul", text:"Same thing, isn't it?" }
    ],
    hotspots: {
      phone: {
        title:"Stephen's last message",
        speaker:"David",
        text:"An incomplete message. A disappearing signal. This is definitely a classified operation."
      },
      brochure: {
        title:"Holiday activities",
        speaker:"Paul",
        text:"Look, they've got a brochure. It tells you where all the places are."
      },
      desk: {
        title:"Visitor information desk",
        speaker:"David",
        text:"There's a booking receipt here. One symbol has been circled in red. A crucial clue."
      }
    },
    destinations: [
      {route:"cult",symbol:"▲",label:"The Summit",clue:"Mountain silhouette"},
      {route:"detention",symbol:"★",label:"Cultural Honours Banquet",clue:"Ceremonial badge"},
      {route:"reassemble",symbol:"⚙",label:"Total Renewal Spa",clue:"Spa cogwheel"}
    ],
    wrong: {
      cult: [
        {speaker:"Paul",text:"That's a hill, David."},
        {speaker:"David",text:"Topographic deception."}
      ],
      detention: [
        {speaker:"Paul",text:"Do we have to dress up?"},
        {speaker:"David",text:"This is covert."}
      ],
      reassemble: [
        {speaker:"Paul",text:"I wouldn't mind a massage."},
        {speaker:"David",text:"Then you are an operational liability."}
      ]
    },
    hint: {
      cult:"Paul: He mentions being 'their' something. Could it be that mountain club?",
      detention:"Paul: 'Official' sounds like the banquet people with the special badges.",
      reassemble:"Paul: He said 'spa'. It probably means the spa, David."
    },
    correct: [
      {speaker:"David",text:"We have our location."},
      {speaker:"Paul",text:"The brochure has a map."},
      {speaker:"David",text:"Exactly. My deduction has been confirmed."},
      {speaker:"Paul",text:"By the brochure?"},
      {speaker:"David",text:"Don't undermine the operation."}
    ],
    routeIntro: {
      cult:"The Summit — Stephen's exclusive mountain social club.",
      detention:"The Office of Ceremonial Misunderstandings — a purely fictional bureaucracy.",
      reassemble:"Total Renewal Spa — the premium-person display workshop."
    }
  });
})();
