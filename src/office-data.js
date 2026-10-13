/* GAME-SP1: approved office opening, SP-WP1.2. Fictional dialogue. */
(function () {
  "use strict";

  const line = (speaker, text, extra = {}) => ({ speaker, text, ...extra });

  window.SMP_OFFICE_SHOTS = [
    {
      id: "O00", label: "Somewhere in the heart of somewhere", caption: "An unassuming office", moment: "exterior", prop: "none",
      lines: [
        line("Narrator", "In an unassuming office in the heart of somewhere, three idiots discuss one idiot's holiday plans.", { expression: "none" })
      ]
    },
    {
      id: "O01", label: "Somewhere in an office. Unfortunately.", caption: "Last day before the holiday", moment: "establishing", prop: "suitcase",
      lines: [
        line("Paul", "Is China far?", { expression: "blank" }),
        line("Stephen", "Quite."),
        line("Paul", "Right.", { expression: "blank" }),
        line("Narrator", "Paul nods. He has contributed all he intended.", { expression: "none" })
      ]
    },
    {
      id: "O02", label: "The Pre-Holiday Briefing", caption: "Operation: Probably Fine", moment: "assessment", prop: "risk",
      lines: [
        line("Stephen", "Right, I'm off. Two weeks. China. Romance. Culture. Absolutely no work."),
        line("David", "I've conducted a preliminary risk assessment.", { expression: "confident" }),
        line("Stephen", "You've done what?"),
        line("David", "International travel. Mysterious new boyfriend. Foreign territory. There are variables."),
        line("Stephen", "The main variable is whether I get through a fortnight without either of you being weird."),
        line("Paul", "Do they do meal deals in China?", { expression: "blank" }),
        line("Stephen", "I genuinely don't know, Paul."),
        line("Paul", "Could you check? No rush.", { expression: "blank" }),
        line("Narrator", "David turns his laptop round. OPERATION: PROBABLY FINE. Every box is marked HIGH RISK.", { expression: "none", prop: "risk" })
      ]
    },
    {
      id: "O03", label: "A Very Particular Set of Skills", caption: "A man who understands systems", moment: "briefing", prop: "laptop",
      lines: [
        line("David", "If anything goes wrong, you call me. I possess a highly particular set of skills.", { expression: "confident" }),
        line("Stephen", "You work in IT."),
        line("David", "Exactly."),
        line("Stephen", "You reset passwords."),
        line("David", "At scale."),
        line("Paul", "You fixed the Wi-Fi once.", { expression: "blank" }),
        line("David", "Because I understand systems."),
        line("Paul", "I've been turning the fridge off and on. Is that IT?", { expression: "blank" }),
        line("David", "Why are you turning the fridge off?", { expression: "frustrated" }),
        line("Paul", "It was making a noise.", { expression: "blank" }),
        line("Narrator", "David stares. Stephen tries not to laugh. Paul resumes his completely empty expression.", { expression: "none" })
      ]
    },
    {
      id: "O04", label: "The Printer Incident", caption: "The bear situation escalates", moment: "printer", prop: "bear",
      lines: [
        line("Narrator", "The printer whirs. Then whirs again. It produces another picture of a honey-loving cartoon bear.", { expression: "none", sound: "printer" }),
        line("Stephen", "Why is the printer producing forty pictures of a bear?"),
        line("Paul", "It's a famous bear.", { expression: "blank" }),
        line("David", "Paul, why have you put a bear next to the Chinese leader?"),
        line("Paul", "I thought they'd like each other. They look quite similar.", { expression: "blank" }),
        line("Stephen", "Please don't send those to me while I'm away."),
        line("Paul", "I've already made a group.", { expression: "blank", prop: "chat" }),
        line("System", "GROUP CREATED: STEPHEN RESCUE GROUP (PRE-EMPTIVE)", { expression: "none", prop: "chat", sound: "ping" }),
        line("David", "Delete the group."),
        line("Paul", "Can't. I'm the admin.", { expression: "blank" }),
        line("David", "Then delete yourself."),
        line("Paul", "From the group?", { expression: "blank" }),
        line("David", "Yes, Paul. From the group.", { expression: "frustrated" }),
        line("Paul", "Right.", { expression: "blank" })
      ]
    },
    {
      id: "O05", label: "The Goodbye Song", caption: "The optimistic version", moment: "song", prop: "music",
      lines: [
        line("David", "We've also made you a goodbye song.", { expression: "confident" }),
        line("Stephen", "Absolutely not."),
        line("Paul", "Too late.", { expression: "blank" }),
        line("System", "♪ Stephen's off to China, he'll probably be fine!\n♪ Unless he gets kidnapped, then that's a bad sign!", { expression: "none", prop: "music", sound: "song" }),
        line("Stephen", "Is that meant to be comforting?"),
        line("David", "That's the optimistic version."),
        line("Stephen", "There is another version?"),
        line("Paul", "It has a key change.", { expression: "blank" }),
        line("David", "And a post-mortem."),
        line("Stephen", "Delete the song.")
      ]
    },
    {
      id: "O06", label: "An Absolutely Normal Departure", caption: "Several warning signs, apparently", moment: "departure", prop: "suitcase",
      lines: [
        line("David", "Send us one message every day so we know you're safe."),
        line("Stephen", "I will be muting both of you before I reach the airport."),
        line("Paul", "Can you bring me back a souvenir?", { expression: "blank" }),
        line("Stephen", "What do you want?"),
        line("Paul", "A little fridge magnet, preferably with Wi-Fi.", { expression: "blank" }),
        line("Stephen", "Goodbye, you absolute idiots."),
        line("Narrator", "Stephen exits. The office suddenly feels a little quieter.", { expression: "none" }),
        line("System", "Stephen Martin has muted the group.", { expression: "none", prop: "chat", sound: "ping" }),
        line("David", "That's our first warning sign.", { expression: "concerned" }),
        line("Paul", "Should I buy a suitcase?", { expression: "blank" }),
        line("David", "For what?"),
        line("Paul", "Rescue.", { expression: "blank" }),
        line("David", "We're not rescuing anyone, Paul."),
        line("Paul", "Yet.", { expression: "blank" })
      ]
    },
    {
      id: "O07", label: "OPERATION: PROBABLY FINE", caption: "And so it begins", moment: "title", prop: "title",
      lines: [
        line("Narrator", "David opens an enormous laptop folder marked RESCUE PLAN - FINAL - FINAL 2.", { expression: "none" }),
        line("System", "RESCUE STEPHEN MARTIN FROM CHINA\nTwo colleagues. Zero training. One completely avoidable situation.", { expression: "none", prop: "title", sound: "sting" })
      ]
    }
  ];
})();
