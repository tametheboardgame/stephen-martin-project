/* GAME-SP3.1: approved Summit admissions choices and original ending dialogue.
   Fictional comedy; no additional image, voice or network dependencies. */
(function () {
  "use strict";
  const rounds = [
    {
      title: "Offer a sacred object",
      prompt: "GATEKEEPER: Every device must stay charged. What sacred object do you offer?",
      clue: "ALL DEVICES MUST STAY CHARGED · Stephen's phone is flat.",
      hint: "Paul: His phone ran out of battery. Maybe give them the thing that charges phones?",
      options: [
        { id:"vase", label:"Golden ceremonial vase", correct:false,
          response:"Gatekeeper: Very shiny. Can it charge an iPhone? David: A ceremonial power source. No? Fine." },
        { id:"ticket", label:"Airline ticket", correct:false,
          response:"Paul: That's a flight ticket. Not a charger. David: We're testing border protocols." },
        { id:"charger", label:"Phone charger", correct:true,
          response:"Gatekeeper: The sacred cable! You may proceed. Paul: Told you it was about his phone." }
      ]
    },
    {
      title: "Recite the highest compliment",
      prompt: "GATEKEEPER: Speak the phrase our radiant chairman most wishes to hear.",
      clue: "The chairman has just discovered a holiday full of flattering strangers.",
      hint: "Paul: Maybe compliment the bloke, rather than his paperwork.",
      options: [
        { id:"spreadsheet", label:"Your spreadsheet is compliant", correct:false,
          response:"Gatekeeper: That sounds deeply unromantic. David: It's the highest praise in my organisation." },
        { id:"legs", label:"Great legs, your magnificence", correct:true,
          response:"Gatekeeper: Extraordinary reverence. Paul: Well, he's not wrong." },
        { id:"ticket", label:"I'm here to raise a ticket", correct:false,
          response:"Gatekeeper: We don't do tickets. David: You'll wish you did when this escalates." }
      ]
    },
    {
      title: "Declare your intention",
      prompt: "GATEKEEPER: One final question. Why have you come to see our chairman?",
      clue: "The entire club seems terrified that its extremely popular new chairman might leave.",
      hint: "Paul: They really don't want him leaving, do they? Mention the return flight.",
      options: [
        { id:"rescue", label:"I am here to rescue Stephen", correct:false,
          response:"Gatekeeper: Rescue him from having a lovely time? What a peculiar request." },
        { id:"join", label:"I wish to join the club", correct:false,
          response:"Gatekeeper: Membership forms are in the lobby. David: I am not filling another form in." },
        { id:"flight", label:"I bring news of the return flight", correct:true,
          response:"Gatekeeper: His flight? Already? Quickly, someone fetch the chairman! Paul: That worked suspiciously well." }
      ]
    }
  ];
  const ending = [
    {speaker:"Stephen",text:"David? Paul? What the hell are you doing here?"},
    {speaker:"David",text:"We're here to rescue you."},
    {speaker:"Stephen",text:"From what?"},
    {speaker:"Paul",text:"The cult."},
    {speaker:"Stephen",text:"It's a social club."},
    {speaker:"David",text:"They've made you their leader."},
    {speaker:"Stephen",text:"Yes. It's been a very successful afternoon."},
    {speaker:"David",text:"Come home. This has gone too far."},
    {speaker:"Stephen",text:"I have a mountain view, excellent company, and nobody has asked me to join a meeting. Why would I?"},
    {speaker:"Paul",text:"Fair."},
    {speaker:"David",text:"Paul, stop agreeing with the hostage."},
    {speaker:"Stephen",text:"Also, I've cancelled my return flight."},
    {speaker:"Paul",text:"Do you get a refund on those?"},
    {speaker:"Narrator",text:"David applies for a senior position in the club. The form asks for 'humility'. He fails instantly."}
  ];
  window.SMP_SUMMIT = Object.freeze({ rounds, ending, endCard:"ENDING A: HEAVEN WAS A PLACE ON EARTH" });
})();
