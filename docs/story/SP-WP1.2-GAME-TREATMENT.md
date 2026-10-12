# SP-WP1.2: Full game story and comedy treatment (v1)

**Status:** **Approved story baseline, 12 October 2026**, for implementation. The three routes, scenes, mini-games and endings are authorised for development. Minor dialogue/pacing improvements remain permissible; major story changes require review.  
**Working title:** Rescue Stephen Martin from China  
**Format:** One short 2D comedy adventure: comic cutscene → play Stephen → cutscene → play David and Paul → branch-specific cutscene → one of three mini-games → matching end cutscene.  
**First-run target:** **15–25 minutes**, ideal about 19–21 minutes including one ending.  
**Main cast:** Stephen Martin, David, Paul; all other characters are unnamed inventions or role titles.

## 1. Story engine

The fictional Stephen is on the holiday of his dreams, travelling with an enigmatic romantic companion. Everything seems spectacular. Through the lens of his overconfident office friend David and deadpan, baffling colleague Paul, every ordinary delay, cryptic message or service advert becomes evidence of a sinister international plot.

Stephen's **one significant choice** determines which of three absurd misadventures he experiences. His phone then goes quiet in a comically plausible way. David and Paul misread it as a kidnapping and stage a wildly disproportionate rescue.

The player sees enough of Stephen's side to know that he has helped create the situation, but the rescuers repeatedly imagine it to be ten times worse.

The game must feel like a compressed, punchy sketch comedy adventure, not a simulation of real Chinese life, laws or security procedures.

### Fiction/privacy rule, mandatory

Only "Stephen Martin" may appear as a real-world full name. David and Paul are fictional first-name character labels. All office, relationship, family, itineraries, messages, conversations, uniform designs and businesses are invented. No real employer, precise dates, actual partner/relative identities, private family circumstances, identifiable photographs or location breadcrumbs. A fictional family misunderstanding may be used, but must be **absurdly invented** rather than reproducing known private facts. No event in the story is presented as a factual allegation about any person.

## 2. Player-facing running time

- **OFFICE-INTRO**: automatic cutscene, about 3 minutes (fully scripted in \`SP-WP1.2-OFFICE-OPENING.md\`).
- **STEVE-HOLIDAY-01**: 3–5 minutes of short interactions and a decisive excursion choice.
- **OFFICE-ALARM**: 40–60 second cutscene establishing the comical disappearance.
- **RESCUE-HUB-01**: 3–5 minutes controlling David, with Paul as the companion; one shared evidence puzzle and quick travel montage.
- **BRANCH-INTRO**: 30–45 second route-specific mini cutscene.
- **ROUTE-MINIGAME**: 3–6 minutes, depending on route and errors.
- **ENDING-CUTSCENE**: 1–2 minutes of route-specific payoff and replay prompt.

**Expected:** 16–23 minutes, paced towards about 19–21. Skipping dialogue may be quicker. Branch replays may launch from a choice checkpoint, so exploring all three endings need not repeat the office introduction.

### Non-goals

No open-world map, immigration simulation, actual hacking, combat, detailed inventory crafting, multistage travel, branching relationship simulator or genuine organ-harvesting visuals. Three small branch experiences share the cutscene, dialogue, state and input systems.

## 3. OFFICE-INTRO: The office, last day before leave

See the **complete scripted and timed cutscene** in \`SP-WP1.2-OFFICE-OPENING.md\`.

Story beats:
1. An anonymous British office with a printer, luggage and three colleagues.
2. Stephen's excited two-week fictional holiday announcement.
3. David's absurd, self-important security briefing.
4. Paul's blank-faced printing of an overlarge pile of original cartoon bear-comparison memes.
5. A hilariously dreadful song the colleagues wrote for Stephen.
6. Stephen leaves; David and Paul agree something has already gone wrong, even though nothing has happened.

**Smash-cut title:** "RESCUE STEPHEN MARTIN FROM CHINA."

The title deliberately occurs *before* the playable Stephen scene.

## 4. STEVE-HOLIDAY-01: Heaven (play as Stephen)

**Purpose:** Give Stephen his own agency, deliver the "heaven" feeling, set up consequences, and let player choices determine one branch. Avoid complex movement or travel interactions.

**Environment:** One fictional neon-lit city/hotel-street collage, with a hotel counter, spectacular food stall, tourist activity screen and Stephen's phone. The male tourists/admirers shown are explicitly adults. Use generic fictional architecture, not a real location or identifiable business.

### S01: Arrival (short 20–30 second playable beat)

**STEPHEN** (looking at city): "Oh. This is excellent. David was wrong about literally everything."

**Phone notification, David:** "Operational check-in. Rate current threat level from 1 to international incident."

**STEPHEN:** "Threat level: hot men and dumplings."

**Phone notification, Paul:** "Have you seen a bear yet?"

**STEPHEN:** "I'm muting this before they ruin my life."

**ACTION:** Player taps the phone to open the invented holiday/chat UI. Choice is flavour-only:
- "Reply: Living my best life" → Stephen sends it; David later calls this "classic hostage language".
- "Mute the group" → Stephen mutes it; David later calls this "comms blackout".

Save flavour flag \`chatBehaviour = replied | muted\`. **This does not select the ending.**

### S02: Three optional hotspots (about 60–90 seconds total)

Player can examine in any order; each interaction is at most 2–3 lines. The scene has a prominently indicated **TODAY'S PLANS** kiosk, which is the main required interaction.

**Food stall**
- STEPHEN: "I don't know what any of this is, but it smells like happiness."
- Vendor (unnamed, friendly): "One?"
- STEPHEN: "Yes. And also whatever that is."
- Optional response: "Outstanding decision-making. No notes."

**Adult social crowd / bar noticeboard**
- STEPHEN: "I have never seen so many excellent-looking people in one place."
- Fictional companion, off-screen message: "You're having fun then?"
- STEPHEN: "I may never leave."

**Phone / hotel counter**
- David sends unsolicited safety bullet points.
- Paul sends a sticker of a fictional bear with honey.
- STEPHEN: "They're basically a public health warning."

No quest dependencies on optional hotspots. These establish tone; the game cannot stall.

### S03: The consequential plan choice (about 60–90 seconds)

At the clearly visible activity kiosk, Stephen sees three spectacularly enticing options. The companion may send a playful, fictional text about an upcoming "family-friendly cultural event"; do not use real relatives or real secrecy details.

**STEPHEN:** "All of these look brilliant. What's the worst that can happen?"

**Choice A, \`route = cult\`:** "**THE SUMMIT** – A secluded mountain mixer, spectacular views, and a welcoming club of handsome adults."
- STEPHEN: "A mountain full of beautiful men? That's not a holiday. That's a calling."
- Fictional off-screen companion: "It's a very exclusive group."
- STEPHEN: "I'm literally built for exclusive groups."
- Visual stinger: A flyer says "**BECOME ONE WITH THE VIBE**."

**Choice B, \`route = detention\`:** "**THE CULTURAL HONOURS BANQUET** – Formal dinner, special guest presentation, complimentary badges."
- STEPHEN: "Free food, fancy clothes, and everyone's pretending to know what they're doing. It's basically work, but better."
- Fictional off-screen companion: "They've listed you as a visiting international specialist."
- STEPHEN: "A specialist in what?"
- Companion: "Unclear. Smile confidently."
- Visual stinger: Stephen's phone pings with Paul's bear image, which he accidentally adds to the event slideshow.

**Choice C, \`route = reassemble\`:** "**THE TOTAL RENEWAL SPA** – An astonishingly cheap premium full-body upgrade."
- STEPHEN: "Luxury spa. Ninety per cent discount. Absolutely no catches."
- Fictional off-screen companion: "That advert seems suspicious."
- STEPHEN: "That's what makes it exclusive."
- Visual stinger: A tiny disclaimer: "**REPLACEMENT COMPONENTS SOLD SEPARATELY**."

Three route outcomes are different but Stephen's decisions all feel appealing rather than obvious "choose cult / prison / organs" menus.

### S04: The message that cuts off (20–30 seconds)

Each route shares the framing, with a branch-specific last fragment:

- Cult: "This place is unreal. They've asked me to be their..."
- Detention: "I've just been introduced as the official..."
- Reassemble: "This spa is incredible. They're taking my entire..."

**SFX:** Low-battery beep / dropped connection. Show 1% battery. Phone goes dark.

**STEPHEN** (unconcerned): "Oh, brilliant."

**CUT TO BLACK.** The player is not shown serious harm; the suspicious sentence is deliberately clipped to maximise misunderstanding.

**Rule:** Save checkpoint \`routeChosen=true\`, \`route\` and \`chatBehaviour\` before the cut to black. On reload, jump to the correct pending story beat.

## 5. OFFICE-ALARM: Two idiots activate a rescue

**Location:** Reuse same fictional office background; half-minute scripted event, optionally as a visual chat overlay rather than fresh art.

**Visual:** David studying the same overwrought "threat assessment", Paul eating lunch while staring into the middle distance.

**DAVID:** "Stephen has stopped responding."

**PAUL:** "He said he was muting us."

**DAVID:** "Exactly. Pre-arranged silence. A signal."

**PAUL:** "That would be a very stupid signal."

**DAVID:** "We have established that he makes questionable decisions."

**Phone:** Show the route-specific truncated last message from S04.

**DAVID:** "There it is. The final transmission."

**PAUL:** "Could just be his battery."

**DAVID** (dead earnest): "Paul. Please respect the gravity of this international incident."

**PAUL:** "Right. Shall I pack the bears?"

**DAVID:** "Pack everything."

**Visual montage:** Comically fast animated travel tickets, a luggage carousel, David consulting an upside-down city map, Paul retrieving a suitcase full of printer paper. One shared music sting, no additional play environments.

**ON-SCREEN CAPTION:** "Several hours and a spectacular amount of unnecessary spending later..."

## 6. RESCUE-HUB-01: Worst detectives imaginable (play as David, Paul follows)

**Location:** One fictional hotel lobby / visitor-information hub. Same assets for all routes: counter, noticeboard, kiosk, luggage, David and Paul. Stephen does not appear yet.

**Purpose:** Set up the rescue dynamic and guide the player to the selected route, not allow selecting a different ending by accident.

### R01: Arrival dialogue (20 seconds)

**DAVID:** "We begin with intelligence gathering. Observe, analyse, act."

**PAUL:** "The hotel has little shampoos."

**DAVID:** "Paul, focus."

**PAUL:** "I am. They do conditioner too."

**DAVID:** "I don't know why I brought you."

**PAUL:** "You said you needed muscle."

**DAVID:** "I said I needed *backup*."

**PAUL:** "Same thing, isn't it?"

### R02: Simple evidence puzzle (2–4 minutes)

Three hotspots, in any order:
- **Phone:** Contains Stephen's unfinished route-specific message and the choice-dependent \`chatBehaviour\` hint.
- **Tourist activity brochure:** Displays the three *fictional* activity titles/logos from the Stephen screen.
- **Visitor desk / noticeboard:** Has a matching route symbol or receipt number associated with Stephen's booking (a mountain silhouette, fancy ceremonial badge, or spa cogwheel).

**Player objective:** Connect the truncated message to a destination. Mechanically:
1. Read the phone.
2. Examine the activity brochure to understand the three possibilities.
3. Tap the matching icon/notice/desk item for the true route. This is *not* a second route decision. Wrong selections deliver short jokes and point back to clues.

A correct guess can be accepted even if the player has not inspected all three hotspots; no arbitrary fetch quest. After two wrong guesses Paul gives a deadpan hint; after four, the correct option visibly highlights.

**Wrong mountain guess:** PAUL: "That's a hill, David." / DAVID: "Topographic deception."

**Wrong banquet guess:** PAUL: "Do we have to dress up?" / DAVID: "This is covert."

**Wrong spa guess:** PAUL: "I wouldn't mind a massage." / DAVID: "Then you are an operational liability."

**Correct selection:**
- DAVID: "We have our location."
- PAUL: "The brochure has a map."
- DAVID: "Exactly. My deduction has been confirmed."
- PAUL: "By the brochure?"
- DAVID: "Don't undermine the operation."

Trigger the matching **BRANCH-INTRO**. Keep the player in control of David. Paul may automatically offer hints and occasionally interact with objects.

## 7. Route A: The Cult of Stephen

### A-INTRO, 30–45 second cutscene

**Visual:** Mountain social club gate, streamers, polished welcome board, line of enthusiastic adult admirers in matching festival sashes; no real world-specific religion or ethnicity caricature.

**GATEKEEPER:** "Welcome to The Summit. Have you come to honour our radiant new chairman?"

**DAVID:** "We've come for Stephen Martin."

**GATEKEEPER:** "Then yes."

**PAUL** (blank): "Does he know he's a chairman?"

**GATEKEEPER:** "He didn't yesterday."

**DAVID:** "We've infiltrated the inner circle."

**PAUL:** "We're standing outside the gate."

### A-MINIGAME: The Summit Admissions Test (4–5 minutes)

**Genre:** Three-card dialogue / inventory-choice quiz using obvious contextual clues and funny rejection dialogue; no timers and no fail state.

**Goal:** Pass three increasingly stupid admissions checks to reach Stephen.

**Round 1, "Offer a sacred object"**: Choose between a golden ceremonial vase, an airline ticket and **a phone charger**. Clue: a giant "ALL DEVICES MUST STAY CHARGED" sign and Stephen's dead phone. Correct: phone charger. Wrong picks yield jokes, then retry.

**Round 2, "Recite the highest compliment"**: Pick between "Your spreadsheet is compliant", "Great legs, your magnificence" and "I'm here to raise a ticket". Correct: complimentary phrase (sexual innuendo, no explicit depiction); wrong choices yield an unimpressed gatekeeper.

**Round 3, "Declare your intention"**: Choose "I am here to rescue Stephen", "I wish to join" or **"I bring news of the return flight"**. Correct: return flight makes the club panic and demand an audience with their chairman, which opens the gate. The joke: "rescuers" succeed because everyone wants to stop Stephen leaving.

**HINT:** After 2 failures per round, Paul accidentally gives the correct reasoning. Every answer has a short comic response.

### A-ENDING, about 75–100 seconds

**Visual:** Stephen on a ludicrous fabric-draped throne, wearing normal holiday clothes plus a sash reading "TEMPORARY SUPREME CHAIRMAN". Adult admirers offer fruit and novelty gift bags.

**STEPHEN:** "David? Paul? What the hell are you doing here?"

**DAVID:** "We're here to rescue you."

**STEPHEN:** "From what?"

**PAUL:** "The cult."

**STEPHEN:** "It's a social club."

**DAVID:** "They've made you their leader."

**STEPHEN:** "Yes. It's been a very successful afternoon."

**DAVID:** "Come home. This has gone too far."

**STEPHEN:** "I have a mountain view, excellent company, and nobody has asked me to join a meeting. Why would I?"

**PAUL:** "Fair."

**DAVID:** "Paul, stop agreeing with the hostage."

**STEPHEN:** "Also, I've cancelled my return flight."

**PAUL:** "Do you get a refund on those?"

**END CARD:** "**ENDING A: HEAVEN WAS A PLACE ON EARTH.**"
**Stinger:** David starts applying for a senior position in the club. The form asks for "humility". He fails instantly.

## 8. Route B: The People's Republic of Stephen (bureaucracy parody)

### B-INTRO, 30–45 second cutscene

**Visual:** An entirely imaginary "Office of Ceremonial Misunderstandings": a generic public counter, enormous stack of forms, pointless coloured stamps. This is a parody bureaucracy, not a depiction of a specific actual institution.

**OFFICIAL:** "You are here for the International Specialist?"

**DAVID:** "We're here to extract Stephen Martin."

**OFFICIAL:** "Form?"

**DAVID:** "No, rescue."

**OFFICIAL:** "Form."

**PAUL:** "I knew we should've brought a printer."

**Cutaway:** Stephen sits unharmed in an adjacent waiting room wearing an absurd visitor sash. He isn't sure whether he's being detained or expected to give a speech.

### B-MINIGAME: The Great Stamp Catastrophe (4–5 minutes)

**Genre:** A funny three-step paperwork-routing game, not a real-government procedure. Drag forms to fictional stamps; wrong stamps bounce back and produce jokes.

**Goal:** Get the fictional "Visitor Release Authorisation" issued.

**Step 1:** Fill **"Reason for Visit"** with the only absurdly acceptable choice: "To retrieve a person we accidentally classified as missing". The obviously grandiose "International rescue operation" and irrelevant "Meal deal inspection" options generate rejection jokes.

**Step 2:** Classify the office bear image. Choose "Unsolicited comedy stationery" instead of "Top secret propaganda" or "Large yellow animal". The desk phone bleeps; Paul quietly pockets the remaining printouts.

**Step 3:** Obtain a final stamp. David cannot find the "APPROVED" stamp; Paul has been using it as a coaster. Player taps Paul's takeaway drink, drags stamp to the permit.

**HINT:** Large visual labels, rejected-choice explanations, Paul offering a blunt clue after two mistakes; never ask player to know actual law or language.

**Win:** A chime, confetti from the printer, and a document "**APPROVED: ALL OF YOU PLEASE LEAVE**".

### B-ENDING, about 75–100 seconds

**STEPHEN:** "Why are you both in this building?"

**DAVID:** "We're extracting you from government custody."

**STEPHEN:** "I got stuck in a queue because someone put a bear meme in my presentation."

**PAUL:** "Did they like the bear?"

**STEPHEN:** "They didn't understand the bear."

**DAVID:** "A clear signal that the operation worked."

**STEPHEN:** "You started the operation!"

**OFFICIAL:** "We have approved your departure."

**DAVID:** "Excellent. Our diplomatic intervention has succeeded."

**OFFICIAL:** "On one condition."

**PAUL:** "What's that?"

**OFFICIAL:** "None of you may bring the printer."

**PAUL:** "It's still in my suitcase."

**END CARD:** "**ENDING B: DETAINED BY ADMINISTRATION.**"
**Stinger:** David proudly frames his government-issued "PLEASE LEAVE" certificate.

## 9. Route C: Reassemble Stephen Martin

### C-INTRO, 30–45 second cutscene

**Visual:** A cartoonishly dodgy "Total Renewal Spa" with backlit spa signs; next door is a bizarre shop advertising "BUILD YOUR OWN PREMIUM PERSON" with fictional body-part-shaped foam props and assembly diagrams. No gore.

**DAVID:** "It's worse than I feared."

**PAUL:** "It's a spa."

**DAVID:** "Look at the catalogue. 'Stephen Martin: replacement parts available'."

**PAUL:** "How do they know his name?"

**DAVID:** "Obviously an international operation."

**PAUL:** "Or they made a name badge."

**DAVID:** "Paul, we're beyond that."

**Visual:** A large cardboard promotional display with Stephen's face and a poorly translated "customisable model" label. The player isn't told the innocuous explanation until the ending.

### C-MINIGAME: Reassemble Stephen Martin (5–6 minutes)

**Genre:** Bright, cartoon construction-table puzzle, not realistic surgery.

**Goal:** Assemble an absurdly obvious **Stephen-shaped display model** to unlock a promotional demonstration room, which David believes to be a secret holding cell.

**Board:** A silhouette with labelled head, torso, two arms, two legs. Six drag-and-drop body-shaped **illustrated cardboard/foam pieces**. Each accepted piece snaps into place, yields a funny sound and a mildly ridiculous check mark. Optional extra components in a tray include cartoon organs (three kidneys, a heart with Wi-Fi, an unidentified spleen), one toaster and a plastic banana.

**Part mismatch reactions** (sample):
- HEAD into ARM: PAUL: "He'd have a very strange handshake."
- HEART-WITH-WI-FI into TORSO: DAVID: "Upgradeable. Excellent."
- TOASTER into STOMACH: PAUL: "He's always liked breakfast."
- EXTRA KIDNEY: PAUL: "That's a spare, isn't it?"

**Win:** All six silhouette slots filled with their matching pieces; press an oversized "**POWER ON STEPHEN**" button. Contrived sound effects and the fake mannequin's LEDs flash. No real-body graphic harm.

**HINT:** Shape guides are labelled and accessible; snap radius generous for touch; after repeated errors the destination briefly flashes. Wrong placements never consume items.

### C-ENDING, about 75–100 seconds

**Visual:** The display room curtain opens. Real Stephen steps out unharmed in a spa robe with cucumber slices in hand. He has been enjoying a complimentary treatment.

**STEPHEN:** "Why is there a cardboard version of me?"

**DAVID:** "Stephen! You're alive!"

**STEPHEN:** "I was having a massage."

**PAUL:** "We bought your replacement organs."

**STEPHEN:** "You what?"

**DAVID:** "We reconstructed you. We weren't going to abandon you."

**STEPHEN:** "That says 'custom souvenir cut-out'."

**PAUL:** "Oh."

**DAVID:** "The translation was ambiguous."

**STEPHEN:** "You built a cardboard man to rescue me from a massage?"

**PAUL:** "It came with an extra kidney."

**STEPHEN:** "WHY?"

**END CARD:** "**ENDING C: SOME ASSEMBLY REQUIRED.**"
**Stinger:** The cardboard Stephen starts speaking: "Have you tried turning me off and on again?" David treats it as proof of genius; Stephen walks away.

This preserves the original dark organ-market *misunderstanding* and the title "Reassemble Stephen Martin" without gore or permanent injury. If a darker ending is preferred, revise in story review, not after implementation.

## 10. End screen and replay

All endings return to the same simple summary screen:
- Ending card and one route-specific illustration/cutscene still.
- Buttons: "**Play another ending**" (load Stephen kiosk choice checkpoint) and "**Play from the start**" and "**Main menu**".
- Optional: After one ending, show "1 of 3 utterly unnecessary rescue outcomes discovered" as a joke counter. Do not let collection systems delay the MVP.
- First-play routes are 15–25 minutes. A route replay is deliberately much shorter and begins after OFFICE-INTRO.

No credits or artwork should imply the fictional events actually occurred. Credits may include "A completely fictional and deeply unnecessary rescue".

## 11. Core voice and comedic rhythm

**Stephen:** Young, quick, sarcastic, ecstatic at novel experiences, increasingly furious with his colleagues' intrusion. A character who makes decisions, not only a passive rescue object. Do not turn every line into a stale slang catchphrase.

**David:** Huge ego, properly skilled at IT but not espionage. Calmly uses management/technical terminology to disguise wild guesses. Repeated lines: "I've assessed the situation"; "We need a framework"; "At scale"; "That's a clear signal."

**Paul:** Older, blank-faced, often spectacularly dense, habitually literal. Rarely recognises a crisis, but on occasion the obvious thing he says is correct. Comic pauses and simple questions are essential. Do not make him a nonstop shouting slapstick fool.

**Companion/boyfriend:** Entirely invented and undefined visually for this initial game. Phone text and off-screen remarks can establish a romantic travelling companion; never use real biographical background or imply verifiable misconduct. He might just be entirely normal, and need not be drawn in v1.

**Original Winnie-the-Pooh reference:** Dialogue may joke about the famous bear and fictional bear comparisons, but use an original simple honey-bear illustration rather than reproducing copyrighted character art. The gag lives within invented chats and institutions. Do not encourage actual provoking real authorities or send messages to a real traveller.

## 12. Reusable transition and flavour writing

**If chatBehaviour = replied:**
- DAVID: "'Living my best life'. Textbook forced reassurance."
- PAUL: "Or he's having a nice time."
- DAVID: "We're trained to consider all possibilities."
- PAUL: "When did we get trained?"

**If chatBehaviour = muted:**
- DAVID: "He's muted us. Full communications blackout."
- PAUL: "He said he was going to."
- DAVID: "A premeditated blackout. Even worse."

**When choosing an incorrect rescue destination:**
- Never redirect the player into another finale.
- Deliver one short topical joke and retain input.
- Highlight the right clue after two errors.
- Persist the originally chosen \`route\` exactly.

**Story framing:** Stephen's perception is romantic comedy; David's is international spy thriller; Paul's is a day out with snacks. Never lose these three simultaneous viewpoints.

## 13. Approval questions for first human pass

1. Does the holiday choice + mistaken-rescue structure sound correct, including that the player selects the **destination** rather than seeing explicit ending labels?
2. Is the cult ending's "he refuses to come home" punchline right?
3. Is bureaucracy / bear meme the right detention route, or should we use a different absurd event?
4. Is the organ route better as **a ludicrous non-gory false alarm** (proposed) or a darker cartoon-fiction version?
5. Is any dialogue too tame, too repetitive or too long for 15–25 minutes?

The scripts are not locked until owner review, and may be edited quickly without rewriting engine systems.
