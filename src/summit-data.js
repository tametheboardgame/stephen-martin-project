/* GAME-SP3.1: approved Summit admissions choices and original ending dialogue.
   Fictional comedy; no additional image, voice or network dependencies. */
(function () {
  "use strict";
  const rounds = [
    {
      title: "Offer a sacred object",
      promptId: "summit.check.001.prompt", prompt: "GATEKEEPER: Every device must stay charged. What sacred object do you offer?",
      clue: "ALL DEVICES MUST STAY CHARGED · Stephen's phone is flat.",
      hintId: "summit.check.001.hint", hint: "Paul: His phone ran out of battery. Maybe give them the thing that charges phones?",
      options: [
        { id:"vase", label:"Golden ceremonial vase", artSlot:"a1", correct:false,
          response:"Gatekeeper: Very shiny. Can it charge an iPhone? David: A ceremonial power source. No? Fine.", voices:[{"id":"summit.check.001.vase.001","speaker":"Gatekeeper","text":"Very shiny. Can it charge an iPhone?"},{"id":"summit.check.001.vase.002","speaker":"David","text":"A ceremonial power source. No? Fine."}] },
        { id:"ticket", label:"Airline ticket", artSlot:"a2", correct:false,
          response:"Paul: That's a flight ticket. Not a charger. David: We're testing border protocols.", voices:[{"id":"summit.check.001.ticket.001","speaker":"Paul","text":"That's a flight ticket. Not a charger."},{"id":"summit.check.001.ticket.002","speaker":"David","text":"We're testing border protocols."}] },
        { id:"charger", label:"Phone charger", artSlot:"a3", correct:true,
          response:"Gatekeeper: The sacred cable! You may proceed. Paul: Told you it was about his phone.", voices:[{"id":"summit.check.001.charger.001","speaker":"Gatekeeper","text":"The sacred cable! You may proceed."},{"id":"summit.check.001.charger.002","speaker":"Paul","text":"Told you it was about his phone."}] }
      ]
    },
    {
      title: "Recite the highest compliment",
      promptId: "summit.check.002.prompt", prompt: "GATEKEEPER: Speak the phrase our radiant chairman most wishes to hear.",
      clue: "The chairman has just discovered a holiday full of flattering strangers.",
      hintId: "summit.check.002.hint", hint: "Paul: Maybe compliment the bloke, rather than his paperwork.",
      options: [
        { id:"spreadsheet", label:"Your spreadsheet is compliant", artSlot:"b1", correct:false,
          response:"Gatekeeper: That sounds deeply unromantic. David: It's the highest praise in my organisation.", voices:[{"id":"summit.check.002.spreadsheet.001","speaker":"Gatekeeper","text":"That sounds deeply unromantic."},{"id":"summit.check.002.spreadsheet.002","speaker":"David","text":"It's the highest praise in my organisation."}] },
        { id:"legs", label:"Great legs, your magnificence", artSlot:"b2", correct:true,
          response:"Gatekeeper: Extraordinary reverence. Paul: Well, he's not wrong.", voices:[{"id":"summit.check.002.legs.001","speaker":"Gatekeeper","text":"Extraordinary reverence."},{"id":"summit.check.002.legs.002","speaker":"Paul","text":"Well, he's not wrong."}] },
        { id:"ticket", label:"I'm here to raise a ticket", artSlot:"b3", correct:false,
          response:"Gatekeeper: We don't do tickets. David: You'll wish you did when this escalates.", voices:[{"id":"summit.check.002.ticket.001","speaker":"Gatekeeper","text":"We don't do tickets."},{"id":"summit.check.002.ticket.002","speaker":"David","text":"You'll wish you did when this escalates."}] }
      ]
    },
    {
      title: "Declare your intention",
      promptId: "summit.check.003.prompt", prompt: "GATEKEEPER: One final question. Why have you come to see our chairman?",
      clue: "The entire club seems terrified that its extremely popular new chairman might leave.",
      hintId: "summit.check.003.hint", hint: "Paul: They really don't want him leaving, do they? Mention the return flight.",
      options: [
        { id:"rescue", label:"I am here to rescue Stephen", artSlot:"c1", correct:false,
          response:"Gatekeeper: Rescue him from having a lovely time? What a peculiar request.", voices:[{"id":"summit.check.003.rescue.001","speaker":"Gatekeeper","text":"Rescue him from having a lovely time? What a peculiar request."}] },
        { id:"join", label:"I wish to join the club", artSlot:"c2", correct:false,
          response:"Gatekeeper: Membership forms are in the lobby. David: I am not filling another form in.", voices:[{"id":"summit.check.003.join.001","speaker":"Gatekeeper","text":"Membership forms are in the lobby."},{"id":"summit.check.003.join.002","speaker":"David","text":"I am not filling another form in."}] },
        { id:"flight", label:"I bring news of the return flight", artSlot:"c3", correct:true,
          response:"Gatekeeper: His flight? Already? Quickly, someone fetch the chairman! Paul: That worked suspiciously well.", voices:[{"id":"summit.check.003.flight.001","speaker":"Gatekeeper","text":"His flight? Already? Quickly, someone fetch the chairman!"},{"id":"summit.check.003.flight.002","speaker":"Paul","text":"That worked suspiciously well."}] }
      ]
    }
  ];
  const ending = [
    {id:"summit.ending.001",speaker:"Stephen",text:"David? Paul? What the hell are you doing here?"},
    {id:"summit.ending.002",speaker:"David",text:"We're here to rescue you."},
    {id:"summit.ending.003",speaker:"Stephen",text:"From what?"},
    {id:"summit.ending.004",speaker:"Paul",text:"The cult."},
    {id:"summit.ending.005",speaker:"Stephen",text:"It's a social club."},
    {id:"summit.ending.006",speaker:"David",text:"They've made you their leader."},
    {id:"summit.ending.007",speaker:"Stephen",text:"Yes. It's been a very successful afternoon."},
    {id:"summit.ending.008",speaker:"David",text:"Come home. This has gone too far."},
    {id:"summit.ending.009",speaker:"Stephen",text:"I have a mountain view, excellent company, and nobody has asked me to join a meeting. Why would I?"},
    {id:"summit.ending.010",speaker:"Paul",text:"Fair."},
    {id:"summit.ending.011",speaker:"David",text:"Paul, stop agreeing with the hostage."},
    {id:"summit.ending.012",speaker:"Stephen",text:"Also, I've cancelled my return flight."},
    {id:"summit.ending.013",speaker:"Paul",text:"Do you get a refund on those?"},
    {id:"summit.ending.014",speaker:"Narrator",text:"David applies for a senior position in the club. The form asks for 'humility'. He fails instantly."}
  ];
  window.SMP_SUMMIT = Object.freeze({ rounds, ending, endCard:"ENDING A: HEAVEN WAS A PLACE ON EARTH" });
})();
