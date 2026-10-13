/* GAME-SP1.1-D3: owner-approved continuous office scene and acting cues.
 * All 54 original spoken lines are preserved. Visual beats never become narration.
 * Stable beat IDs power expressions, cutaways and save migration.
 */
(function () {
  "use strict";
  window.SMP_OFFICE_SHOTS = [
  {
    "id": "O00",
    "label": "The Pre-Holiday Briefing",
    "caption": "An unassuming office",
    "moment": "exterior",
    "prop": "none",
    "lines": [
      {
        "id": "intro.exterior",
        "speaker": "Narrator",
        "text": "In an unassuming office in the heart of somewhere, three idiots discuss one idiot's holiday plans.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "neutral",
          "David": "neutral",
          "Paul": "blank"
        },
        "duration": 4800
      }
    ]
  },
  {
    "id": "O01",
    "label": "The Pre-Holiday Briefing",
    "caption": "One continuous office conversation",
    "moment": "office",
    "prop": "none",
    "lines": [
      {
        "id": "office.001",
        "speaker": "Stephen",
        "text": "Right, I'm off. Two weeks. China. Romance. Culture. Absolutely no work.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "serious",
          "Paul": "blank"
        }
      },
      {
        "id": "office.002",
        "speaker": "Paul",
        "text": "Is China far?",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "neutral",
          "Paul": "confused"
        }
      },
      {
        "id": "office.003",
        "speaker": "Stephen",
        "text": "Quite.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "neutral",
          "Paul": "blank"
        }
      },
      {
        "id": "office.004",
        "speaker": "Paul",
        "text": "Right.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "neutral",
          "Paul": "pleased"
        }
      },
      {
        "id": "office.v01",
        "speaker": "",
        "text": "Paul slowly nods, Stephen smirks and David looks at him in disbelief.",
        "type": "reaction",
        "reactions": {
          "Stephen": "amused",
          "David": "frustrated",
          "Paul": "pleased"
        },
        "duration": 1300
      },
      {
        "id": "office.005",
        "speaker": "David",
        "text": "I've conducted a preliminary risk assessment.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "confused",
          "David": "serious",
          "Paul": "blank"
        }
      },
      {
        "id": "office.006",
        "speaker": "Stephen",
        "text": "You've done what?",
        "type": "dialogue",
        "reactions": {
          "Stephen": "confused",
          "David": "confident",
          "Paul": "blank"
        }
      },
      {
        "id": "office.007",
        "speaker": "David",
        "text": "International travel. Mysterious new boyfriend. Foreign territory. There are variables.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "annoyed",
          "David": "systems-expert",
          "Paul": "blank"
        }
      },
      {
        "id": "office.008",
        "speaker": "Stephen",
        "text": "The main variable is whether I get through a fortnight without either of you being weird.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "annoyed",
          "David": "confident",
          "Paul": "blank"
        }
      },
      {
        "id": "office.009",
        "speaker": "Paul",
        "text": "Do they do meal deals in China?",
        "type": "dialogue",
        "reactions": {
          "Stephen": "confused",
          "David": "frustrated",
          "Paul": "blank"
        }
      },
      {
        "id": "office.010",
        "speaker": "Stephen",
        "text": "I genuinely don't know, Paul.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "confused",
          "David": "frustrated",
          "Paul": "blank"
        }
      },
      {
        "id": "office.011",
        "speaker": "Paul",
        "text": "Could you check? No rush.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "annoyed",
          "David": "frustrated",
          "Paul": "pleased"
        }
      },
      {
        "id": "office.v02",
        "speaker": "",
        "text": "David turns his laptop towards them. OPERATION: PROBABLY FINE lists international travel and romance as high risk, and David's confidence as unreasonably high.",
        "type": "cutaway",
        "reactions": {
          "Stephen": "exasperated",
          "David": "confident",
          "Paul": "blank"
        },
        "visual": "risk",
        "duration": 3600
      },
      {
        "id": "office.012",
        "speaker": "David",
        "text": "If anything goes wrong, you call me. I possess a highly particular set of skills.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "annoyed",
          "David": "confident",
          "Paul": "blank"
        }
      },
      {
        "id": "office.013",
        "speaker": "Stephen",
        "text": "You work in IT.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "confident",
          "Paul": "blank"
        }
      },
      {
        "id": "office.014",
        "speaker": "David",
        "text": "Exactly.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "confident",
          "Paul": "blank"
        }
      },
      {
        "id": "office.015",
        "speaker": "Stephen",
        "text": "You reset passwords.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "serious",
          "Paul": "blank"
        }
      },
      {
        "id": "office.016",
        "speaker": "David",
        "text": "At scale.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "systems-expert",
          "Paul": "blank"
        }
      },
      {
        "id": "office.017",
        "speaker": "Paul",
        "text": "You fixed the Wi-Fi once.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "frustrated",
          "Paul": "blank"
        }
      },
      {
        "id": "office.018",
        "speaker": "David",
        "text": "Because I understand systems.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "systems-expert",
          "Paul": "blank"
        }
      },
      {
        "id": "office.019",
        "speaker": "Paul",
        "text": "I've been turning the fridge off and on. Is that IT?",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "serious",
          "Paul": "confused"
        }
      },
      {
        "id": "office.020",
        "speaker": "David",
        "text": "Why are you turning the fridge off?",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "shocked",
          "Paul": "blank"
        }
      },
      {
        "id": "office.021",
        "speaker": "Paul",
        "text": "It was making a noise.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "laughing",
          "David": "frustrated",
          "Paul": "blank"
        }
      },
      {
        "id": "office.v03",
        "speaker": "",
        "text": "David stares at Paul. Stephen bursts into laughter. Paul remains perfectly innocent.",
        "type": "reaction",
        "reactions": {
          "Stephen": "laughing",
          "David": "frustrated",
          "Paul": "blank"
        },
        "duration": 1950
      },
      {
        "id": "office.v04",
        "speaker": "",
        "text": "The office printer produces an ever-growing pile of sheets depicting a cartoon honey-bear alongside a fictional official.",
        "type": "cutaway",
        "reactions": {
          "Stephen": "confused",
          "David": "serious",
          "Paul": "blank"
        },
        "visual": "printer",
        "duration": 2900
      },
      {
        "id": "office.022",
        "speaker": "Stephen",
        "text": "Why is the printer producing forty pictures of a bear?",
        "type": "dialogue",
        "reactions": {
          "Stephen": "confused",
          "David": "serious",
          "Paul": "blank"
        }
      },
      {
        "id": "office.023",
        "speaker": "Paul",
        "text": "It's a famous bear.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "confused",
          "David": "serious",
          "Paul": "blank"
        }
      },
      {
        "id": "office.024",
        "speaker": "David",
        "text": "Paul, why have you put a bear next to the Chinese leader?",
        "type": "dialogue",
        "reactions": {
          "Stephen": "confused",
          "David": "frustrated",
          "Paul": "blank"
        }
      },
      {
        "id": "office.025",
        "speaker": "Paul",
        "text": "I thought they'd like each other. They look quite similar.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "annoyed",
          "David": "shocked",
          "Paul": "pleased"
        }
      },
      {
        "id": "office.026",
        "speaker": "Stephen",
        "text": "Please don't send those to me while I'm away.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "annoyed",
          "David": "frustrated",
          "Paul": "blank"
        }
      },
      {
        "id": "office.027",
        "speaker": "Paul",
        "text": "I've already made a group.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "annoyed",
          "David": "shocked",
          "Paul": "pleased"
        }
      },
      {
        "id": "office.v05",
        "speaker": "",
        "text": "Paul's phone shows STEPHEN RESCUE GROUP (PRE-EMPTIVE), with Stephen, David and Paul as members, Paul as administrator and a bear icon.",
        "type": "cutaway",
        "reactions": {
          "Stephen": "exasperated",
          "David": "shocked",
          "Paul": "pleased"
        },
        "visual": "chat",
        "duration": 3300
      },
      {
        "id": "office.028",
        "speaker": "David",
        "text": "Delete the group.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "frustrated",
          "Paul": "blank"
        }
      },
      {
        "id": "office.029",
        "speaker": "Paul",
        "text": "Can't. I'm the admin.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "frustrated",
          "Paul": "pleased"
        }
      },
      {
        "id": "office.030",
        "speaker": "David",
        "text": "Then delete yourself.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "frustrated",
          "Paul": "blank"
        }
      },
      {
        "id": "office.031",
        "speaker": "Paul",
        "text": "From the group?",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "frustrated",
          "Paul": "confused"
        }
      },
      {
        "id": "office.032",
        "speaker": "David",
        "text": "Yes, Paul. From the group.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "frustrated",
          "Paul": "blank"
        }
      },
      {
        "id": "office.033",
        "speaker": "Paul",
        "text": "Right.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "amused",
          "David": "frustrated",
          "Paul": "pleased"
        }
      },
      {
        "id": "office.v06",
        "speaker": "",
        "text": "David closes his eyes in frustration. Stephen is amused and Paul satisfied.",
        "type": "reaction",
        "reactions": {
          "Stephen": "amused",
          "David": "frustrated",
          "Paul": "pleased"
        },
        "duration": 1500
      },
      {
        "id": "office.034",
        "speaker": "David",
        "text": "We've also made you a goodbye song.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "confused",
          "David": "confident",
          "Paul": "pleased"
        }
      },
      {
        "id": "office.035",
        "speaker": "Stephen",
        "text": "Absolutely not.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "annoyed",
          "David": "confident",
          "Paul": "pleased"
        }
      },
      {
        "id": "office.036",
        "speaker": "Paul",
        "text": "Too late.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "annoyed",
          "David": "confident",
          "Paul": "pleased"
        }
      },
      {
        "id": "office.v07",
        "speaker": "",
        "text": "An outrageously cheerful player titled THE OPTIMISTIC VERSION performs the two-line goodbye song.",
        "type": "cutaway",
        "reactions": {
          "Stephen": "exasperated",
          "David": "confident",
          "Paul": "pleased"
        },
        "visual": "song",
        "duration": 6000,
        "sound": "song",
        "songLyrics": "♪ Stephen's off to China, he'll probably be fine!\n♪ Unless he gets kidnapped, then that's a bad sign!"
      },
      {
        "id": "office.037",
        "speaker": "Stephen",
        "text": "Is that meant to be comforting?",
        "type": "dialogue",
        "reactions": {
          "Stephen": "exasperated",
          "David": "confident",
          "Paul": "pleased"
        }
      },
      {
        "id": "office.038",
        "speaker": "David",
        "text": "That's the optimistic version.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "annoyed",
          "David": "confident",
          "Paul": "blank"
        }
      },
      {
        "id": "office.039",
        "speaker": "Stephen",
        "text": "There is another version?",
        "type": "dialogue",
        "reactions": {
          "Stephen": "confused",
          "David": "confident",
          "Paul": "blank"
        }
      },
      {
        "id": "office.040",
        "speaker": "Paul",
        "text": "It has a key change.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "confused",
          "David": "confident",
          "Paul": "pleased"
        }
      },
      {
        "id": "office.041",
        "speaker": "David",
        "text": "And a post-mortem.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "exasperated",
          "David": "serious",
          "Paul": "pleased"
        }
      },
      {
        "id": "office.042",
        "speaker": "Stephen",
        "text": "Delete the song.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "annoyed",
          "David": "confident",
          "Paul": "blank"
        }
      },
      {
        "id": "office.043",
        "speaker": "David",
        "text": "Send us one message every day so we know you're safe.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "annoyed",
          "David": "serious",
          "Paul": "blank"
        }
      },
      {
        "id": "office.044",
        "speaker": "Stephen",
        "text": "I will be muting both of you before I reach the airport.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "annoyed",
          "David": "confident",
          "Paul": "blank"
        }
      },
      {
        "id": "office.045",
        "speaker": "Paul",
        "text": "Can you bring me back a souvenir?",
        "type": "dialogue",
        "reactions": {
          "Stephen": "annoyed",
          "David": "neutral",
          "Paul": "pleased"
        }
      },
      {
        "id": "office.046",
        "speaker": "Stephen",
        "text": "What do you want?",
        "type": "dialogue",
        "reactions": {
          "Stephen": "confused",
          "David": "neutral",
          "Paul": "pleased"
        }
      },
      {
        "id": "office.047",
        "speaker": "Paul",
        "text": "A little fridge magnet, preferably with Wi-Fi.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "exasperated",
          "David": "serious",
          "Paul": "pleased"
        }
      },
      {
        "id": "office.048",
        "speaker": "Stephen",
        "text": "Goodbye, you absolute idiots.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "exasperated",
          "David": "confident",
          "Paul": "blank"
        }
      },
      {
        "id": "office.v08",
        "speaker": "",
        "text": "Stephen pushes back from the desk and exits the office. His chair remains empty.",
        "type": "departure",
        "reactions": {
          "Stephen": "absent",
          "David": "serious",
          "Paul": "blank"
        },
        "duration": 2100
      },
      {
        "id": "office.v09",
        "speaker": "",
        "text": "A phone vibrates: Stephen Martin has muted the group.",
        "type": "cutaway",
        "reactions": {
          "Stephen": "absent",
          "David": "shocked",
          "Paul": "blank"
        },
        "visual": "muted",
        "duration": 2700
      },
      {
        "id": "office.049",
        "speaker": "David",
        "text": "That's our first warning sign.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "absent",
          "David": "serious",
          "Paul": "blank"
        }
      },
      {
        "id": "office.050",
        "speaker": "Paul",
        "text": "Should I buy a suitcase?",
        "type": "dialogue",
        "reactions": {
          "Stephen": "absent",
          "David": "serious",
          "Paul": "confused"
        }
      },
      {
        "id": "office.051",
        "speaker": "David",
        "text": "For what?",
        "type": "dialogue",
        "reactions": {
          "Stephen": "absent",
          "David": "shocked",
          "Paul": "blank"
        }
      },
      {
        "id": "office.052",
        "speaker": "Paul",
        "text": "Rescue.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "absent",
          "David": "shocked",
          "Paul": "blank"
        }
      },
      {
        "id": "office.053",
        "speaker": "David",
        "text": "We're not rescuing anyone, Paul.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "absent",
          "David": "frustrated",
          "Paul": "blank"
        }
      },
      {
        "id": "office.054",
        "speaker": "Paul",
        "text": "Yet.",
        "type": "dialogue",
        "reactions": {
          "Stephen": "absent",
          "David": "shocked",
          "Paul": "blank"
        }
      },
      {
        "id": "office.v10",
        "speaker": "",
        "text": "Paul holds an entirely blank stare while David starts thinking his rescue plans could become useful.",
        "type": "reaction",
        "reactions": {
          "Stephen": "absent",
          "David": "serious",
          "Paul": "blank"
        },
        "duration": 1600
      },
      {
        "id": "office.v11",
        "speaker": "",
        "text": "David's laptop opens a folder labelled RESCUE PLAN - FINAL - FINAL 2, containing dozens of files.",
        "type": "cutaway",
        "reactions": {
          "Stephen": "absent",
          "David": "serious",
          "Paul": "blank"
        },
        "visual": "folder",
        "duration": 3100
      },
      {
        "id": "office.v12",
        "speaker": "",
        "text": "RESCUE STEPHEN MARTIN FROM CHINA. Two colleagues. Zero training. One completely avoidable situation.",
        "type": "title",
        "reactions": {
          "Stephen": "absent",
          "David": "serious",
          "Paul": "blank"
        },
        "duration": 4400
      }
    ]
  }
];
  // Legacy v1 saves used O01–O07; v2 inserted O00 ahead of them.
  // Each old position maps to the closest corresponding approved V3 beat.
  window.SMP_LEGACY_BEAT_IDS = [
  [
    "office.002",
    "office.003",
    "office.004",
    "office.v01"
  ],
  [
    "office.001",
    "office.005",
    "office.006",
    "office.007",
    "office.008",
    "office.009",
    "office.010",
    "office.011",
    "office.v02"
  ],
  [
    "office.012",
    "office.013",
    "office.014",
    "office.015",
    "office.016",
    "office.017",
    "office.018",
    "office.019",
    "office.020",
    "office.021",
    "office.v03"
  ],
  [
    "office.v04",
    "office.022",
    "office.023",
    "office.024",
    "office.025",
    "office.026",
    "office.027",
    "office.v05",
    "office.028",
    "office.029",
    "office.030",
    "office.031",
    "office.032",
    "office.033"
  ],
  [
    "office.034",
    "office.035",
    "office.036",
    "office.v07",
    "office.037",
    "office.038",
    "office.039",
    "office.040",
    "office.041",
    "office.042"
  ],
  [
    "office.043",
    "office.044",
    "office.045",
    "office.046",
    "office.047",
    "office.048",
    "office.v08",
    "office.v09",
    "office.049",
    "office.050",
    "office.051",
    "office.052",
    "office.053",
    "office.054"
  ],
  [
    "office.v11",
    "office.v12"
  ]
];
})();
