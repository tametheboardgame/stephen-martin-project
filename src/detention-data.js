/* GAME-SP3.2: approved fictional paperwork puzzle and Ending B dialogue.
   No real administrative procedure, new art, external assets or network calls. */
(function () {
  "use strict";

  const rounds = Object.freeze([
    {
      title: "Reason for Visit",
      promptId:"detention.form.001.prompt", prompt: "OFFICIAL: State the reason for your visit on Visitor Release Authorisation 001.",
      clue: "The form asks for the plainest possible explanation, not a heroic operation.",
      hintId:"detention.form.001.hint", hint: "Paul: Just say we came to collect the bloke they listed as missing. That is what we're doing.",
      options: [
        {id:"operation",label:"International rescue operation",correct:false,
          response:"Official: That is Form 99Z. We only have Form 001. David: This is a diplomatic incident.",voices:[{"id":"detention.form.001.operation.001","speaker":"Official","text":"That is Form 99Z. We only have Form 001."},{"id":"detention.form.001.operation.002","speaker":"David","text":"This is a diplomatic incident."}]},
        {id:"retrieve",label:"To retrieve a person we accidentally classified as missing",correct:true,
          response:"Official: Plain, accurate and administratively beautiful. Reason accepted. Paul: Easy when you tell them the truth.",voices:[{"id":"detention.form.001.retrieve.001","speaker":"Official","text":"Plain, accurate and administratively beautiful. Reason accepted."},{"id":"detention.form.001.retrieve.002","speaker":"Paul","text":"Easy when you tell them the truth."}]},
        {id:"meal",label:"Meal deal inspection",correct:false,
          response:"Official: This is not a sandwich office. Paul: Do they know somewhere that does a meal deal?",voices:[{"id":"detention.form.001.meal.001","speaker":"Official","text":"This is not a sandwich office."},{"id":"detention.form.001.meal.002","speaker":"Paul","text":"Do they know somewhere that does a meal deal?"}]}
      ]
    },
    {
      title: "Classify the bear picture",
      promptId:"detention.form.002.prompt", prompt: "OFFICIAL: The image of a cartoon bear has compromised the presentation. Enter its classification.",
      clue: "The document is a harmless office joke that someone printed far too many times.",
      hintId:"detention.form.002.hint", hint: "Paul: It's just silly stationery, David. The bear isn't working for anyone.",
      options: [
        {id:"secret",label:"Top secret propaganda",correct:false,
          response:"Official: The bear has no security clearance. David: Exactly why it's so dangerous.",voices:[{"id":"detention.form.002.secret.001","speaker":"Official","text":"The bear has no security clearance."},{"id":"detention.form.002.secret.002","speaker":"David","text":"Exactly why it's so dangerous."}]},
        {id:"animal",label:"Large yellow animal",correct:false,
          response:"Paul: It's a drawing. Not an actual bear. Official: Please stop identifying zoological threats.",voices:[{"id":"detention.form.002.animal.001","speaker":"Paul","text":"It's a drawing. Not an actual bear."},{"id":"detention.form.002.animal.002","speaker":"Official","text":"Please stop identifying zoological threats."}]},
        {id:"stationery",label:"Unsolicited comedy stationery",correct:true,
          response:"Official: Correct. The bear has been filed. Paul: Can we stop printing it now?",voices:[{"id":"detention.form.002.stationery.001","speaker":"Official","text":"Correct. The bear has been filed."},{"id":"detention.form.002.stationery.002","speaker":"Paul","text":"Can we stop printing it now?"}]}
      ]
    },
    {
      title: "Locate the final APPROVED stamp",
      promptId:"detention.form.003.prompt", prompt: "OFFICIAL: Your application is complete. Unfortunately the APPROVED stamp has gone missing.",
      clue: "Paul is drinking a takeaway coffee. His cup is resting on something strangely rectangular.",
      hintId:"detention.form.003.hint", hint: "Paul: Is that the stamp under my takeaway cup? I've been using it as a coaster.",
      options: [
        {id:"briefcase",label:"Search David's briefcase",correct:false,
          response:"David: Only my risk register. Seventy-eight pages. Official: That counts as a separate incident.",voices:[{"id":"detention.form.003.briefcase.001","speaker":"David","text":"Only my risk register. Seventy-eight pages."},{"id":"detention.form.003.briefcase.002","speaker":"Official","text":"That counts as a separate incident."}]},
        {id:"printer",label:"Search the office printer",correct:false,
          response:"Official: The printer is not a storage facility. Paul: I wouldn't be so sure.",voices:[{"id":"detention.form.003.printer.001","speaker":"Official","text":"The printer is not a storage facility."},{"id":"detention.form.003.printer.002","speaker":"Paul","text":"I wouldn't be so sure."}]},
        {id:"drink",label:"Inspect Paul's takeaway drink",correct:true,
          response:"Paul: Oh. The APPROVED stamp's been keeping my drink off the counter. Sorry.",voices:[{"id":"detention.form.003.drink.001","speaker":"Paul","text":"Oh. The APPROVED stamp's been keeping my drink off the counter. Sorry."}]}
      ],
      approvedResponse:"OFFICIAL: APPROVED: ALL OF YOU PLEASE LEAVE. The printer releases a celebratory shower of unwanted paper.",approvedVoices:[{id:"detention.stamp.approved.001",speaker:"Official",text:"APPROVED: ALL OF YOU PLEASE LEAVE."}]
    }
  ]);
  const stampSelectedVoices = Object.freeze([
    {id:"detention.stamp.selected.001",speaker:"Paul",text:"That's it. Put it on the permit."},
    {id:"detention.stamp.selected.002",speaker:"David",text:"I was about to suggest the same."}
  ]);
  const ending = Object.freeze([
    {id:"detention.ending.001",speaker:"Stephen",text:"Why are you both in this building?"},
    {id:"detention.ending.002",speaker:"David",text:"We're extracting you from government custody."},
    {id:"detention.ending.003",speaker:"Stephen",text:"I got stuck in a queue because someone put a bear meme in my presentation."},
    {id:"detention.ending.004",speaker:"Paul",text:"Did they like the bear?"},
    {id:"detention.ending.005",speaker:"Stephen",text:"They didn't understand the bear."},
    {id:"detention.ending.006",speaker:"David",text:"A clear signal that the operation worked."},
    {id:"detention.ending.007",speaker:"Stephen",text:"You started the operation!"},
    {id:"detention.ending.008",speaker:"Official",text:"We have approved your departure."},
    {id:"detention.ending.009",speaker:"David",text:"Excellent. Our diplomatic intervention has succeeded."},
    {id:"detention.ending.010",speaker:"Official",text:"On one condition."},
    {id:"detention.ending.011",speaker:"Paul",text:"What's that?"},
    {id:"detention.ending.012",speaker:"Official",text:"None of you may bring the printer."},
    {id:"detention.ending.013",speaker:"Paul",text:"It's still in my suitcase."},
    {id:"detention.ending.014",speaker:"Narrator",text:"David proudly frames his government-issued PLEASE LEAVE certificate."}
  ]);
  window.SMP_DETENTION = Object.freeze({
    rounds,ending,stampSelectedVoices,endCard:"ENDING B: DETAINED BY ADMINISTRATION",
    permitText:"APPROVED: ALL OF YOU PLEASE LEAVE"
  });
})();
