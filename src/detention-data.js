/* GAME-SP3.2: approved fictional paperwork puzzle and Ending B dialogue.
   No real administrative procedure, new art, external assets or network calls. */
(function () {
  "use strict";

  const rounds = Object.freeze([
    {
      title: "Reason for Visit",
      prompt: "OFFICIAL: State the reason for your visit on Visitor Release Authorisation 001.",
      clue: "The form asks for the plainest possible explanation, not a heroic operation.",
      hint: "Paul: Just say we came to collect the bloke they listed as missing. That is what we're doing.",
      options: [
        {id:"operation",label:"International rescue operation",correct:false,
          response:"Official: That is Form 99Z. We only have Form 001. David: This is a diplomatic incident."},
        {id:"retrieve",label:"To retrieve a person we accidentally classified as missing",correct:true,
          response:"Official: Plain, accurate and administratively beautiful. Reason accepted. Paul: Easy when you tell them the truth."},
        {id:"meal",label:"Meal deal inspection",correct:false,
          response:"Official: This is not a sandwich office. Paul: Do they know somewhere that does a meal deal?"}
      ]
    },
    {
      title: "Classify the bear picture",
      prompt: "OFFICIAL: The image of a cartoon bear has compromised the presentation. Enter its classification.",
      clue: "The document is a harmless office joke that someone printed far too many times.",
      hint: "Paul: It's just silly stationery, David. The bear isn't working for anyone.",
      options: [
        {id:"secret",label:"Top secret propaganda",correct:false,
          response:"Official: The bear has no security clearance. David: Exactly why it's so dangerous."},
        {id:"animal",label:"Large yellow animal",correct:false,
          response:"Paul: It's a drawing. Not an actual bear. Official: Please stop identifying zoological threats."},
        {id:"stationery",label:"Unsolicited comedy stationery",correct:true,
          response:"Official: Correct. The bear has been filed. Paul: Can we stop printing it now?"}
      ]
    },
    {
      title: "Locate the final APPROVED stamp",
      prompt: "OFFICIAL: Your application is complete. Unfortunately the APPROVED stamp has gone missing.",
      clue: "Paul is drinking a takeaway coffee. His cup is resting on something strangely rectangular.",
      hint: "Paul: Is that the stamp under my takeaway cup? I've been using it as a coaster.",
      options: [
        {id:"briefcase",label:"Search David's briefcase",correct:false,
          response:"David: Only my risk register. Seventy-eight pages. Official: That counts as a separate incident."},
        {id:"printer",label:"Search the office printer",correct:false,
          response:"Official: The printer is not a storage facility. Paul: I wouldn't be so sure."},
        {id:"drink",label:"Inspect Paul's takeaway drink",correct:true,
          response:"Paul: Oh. The APPROVED stamp's been keeping my drink off the counter. Sorry."}
      ],
      approvedResponse:"OFFICIAL: APPROVED: ALL OF YOU PLEASE LEAVE. The printer releases a celebratory shower of unwanted paper."
    }
  ]);
  const ending = Object.freeze([
    {speaker:"Stephen",text:"Why are you both in this building?"},
    {speaker:"David",text:"We're extracting you from government custody."},
    {speaker:"Stephen",text:"I got stuck in a queue because someone put a bear meme in my presentation."},
    {speaker:"Paul",text:"Did they like the bear?"},
    {speaker:"Stephen",text:"They didn't understand the bear."},
    {speaker:"David",text:"A clear signal that the operation worked."},
    {speaker:"Stephen",text:"You started the operation!"},
    {speaker:"Official",text:"We have approved your departure."},
    {speaker:"David",text:"Excellent. Our diplomatic intervention has succeeded."},
    {speaker:"Official",text:"On one condition."},
    {speaker:"Paul",text:"What's that?"},
    {speaker:"Official",text:"None of you may bring the printer."},
    {speaker:"Paul",text:"It's still in my suitcase."},
    {id:"detention.ending.014",speaker:"Narrator",text:"David proudly frames his government-issued PLEASE LEAVE certificate."}
  ]);
  window.SMP_DETENTION = Object.freeze({
    rounds,ending,endCard:"ENDING B: DETAINED BY ADMINISTRATION",
    permitText:"APPROVED: ALL OF YOU PLEASE LEAVE"
  });
})();
