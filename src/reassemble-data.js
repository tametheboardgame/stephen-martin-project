/* GAME-SP3.3: Fictional foam/cardboard promotional model, never a real person.
   Functional text/emoji proof only; finished art requires owner approval. */
(function () {
  "use strict";
  const parts = Object.freeze([
    {id:"head",label:"Head",mark:"🙂"},
    {id:"torso",label:"Torso",mark:"🧥"},
    {id:"left-arm",label:"Left arm",mark:"💪"},
    {id:"right-arm",label:"Right arm",mark:"💪"},
    {id:"left-leg",label:"Left leg",mark:"👖"},
    {id:"right-leg",label:"Right leg",mark:"👖"}
  ]);
  const decoys = Object.freeze([
    {id:"kidney-1",label:"Spare kidney 1",mark:"🫘"},
    {id:"kidney-2",label:"Spare kidney 2",mark:"🫘"},
    {id:"kidney-3",label:"Spare kidney 3",mark:"🫘"},
    {id:"wifi-heart",label:"Wi-Fi heart",mark:"💗"},
    {id:"toaster",label:"Toaster",mark:"🍞"},
    {id:"banana",label:"Plastic banana",mark:"🍌"},
    {id:"spleen",label:"Mystery foam spleen",mark:"❓"}
  ]);
  const ending = Object.freeze([
    {speaker:"Stephen",text:"Why is there a cardboard version of me?"},
    {speaker:"David",text:"Stephen! You're alive!"},
    {speaker:"Stephen",text:"I was having a massage."},
    {speaker:"Paul",text:"We bought your replacement organs."},
    {speaker:"Stephen",text:"You what?"},
    {speaker:"David",text:"We reconstructed you. We weren't going to abandon you."},
    {speaker:"Stephen",text:"That says 'custom souvenir cut-out'."},
    {speaker:"Paul",text:"Oh."},
    {speaker:"David",text:"The translation was ambiguous."},
    {speaker:"Stephen",text:"You built a cardboard man to rescue me from a massage?"},
    {speaker:"Paul",text:"It came with an extra kidney."},
    {speaker:"Stephen",text:"WHY?"},
    {speaker:"Cardboard Stephen",text:"Have you tried turning me off and on again?"},
    {speaker:"David",text:"Technical triumph. I knew the framework would work."},
    {speaker:"Narrator",text:"Stephen walks away. David congratulates the cardboard display."}
  ]);
  function reaction(part,slot) {
    if(part === "wifi-heart") return "David: Upgradeable. Excellent. Paul: Not a real organ, though.";
    if(part === "toaster") return "Paul: He's always liked breakfast. But that's a toaster.";
    if(part === "banana") return "Paul: That's a plastic banana, mate.";
    if(part && part.startsWith("kidney")) return "Paul: That's a spare, isn't it? They've given us three.";
    if(part === "spleen") return "David: Unknown peripheral detected. Paul: It's a foam spleen.";
    if(part === "head" && slot && slot.includes("arm")) return "Paul: He'd have a very strange handshake.";
    return "Paul: That doesn't fit there. The cardboard shape labels might help.";
  }
  window.SMP_REASSEMBLE = Object.freeze({
    parts,decoys,ending,reaction,
    endCard:"ENDING C: SOME ASSEMBLY REQUIRED",
    powerText:"POWER ON STEPHEN",
    successText:"The cardboard display's LEDs flash. Its speaker crackles. David declares a successful rescue."
  });
})();
