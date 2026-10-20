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
  // All nine approved comic reaction lines (seven cases), with speaker
  // boundaries preserved for independent recordings and pacing.
  const reactionVoices = Object.freeze({
    "wifi-heart":Object.freeze([{"id":"reassemble.reaction.wifi-heart.001","speaker":"David","text":"Upgradeable. Excellent."},{"id":"reassemble.reaction.wifi-heart.002","speaker":"Paul","text":"Not a real organ, though."}]),
    "toaster":Object.freeze([{"id":"reassemble.reaction.toaster.001","speaker":"Paul","text":"He's always liked breakfast. But that's a toaster."}]),
    "banana":Object.freeze([{"id":"reassemble.reaction.banana.001","speaker":"Paul","text":"That's a plastic banana, mate."}]),
    "kidney":Object.freeze([{"id":"reassemble.reaction.kidney.001","speaker":"Paul","text":"That's a spare, isn't it? They've given us three."}]),
    "spleen":Object.freeze([{"id":"reassemble.reaction.spleen.001","speaker":"David","text":"Unknown peripheral detected."},{"id":"reassemble.reaction.spleen.002","speaker":"Paul","text":"It's a foam spleen."}]),
    "head-arm":Object.freeze([{"id":"reassemble.reaction.head-arm.001","speaker":"Paul","text":"He'd have a very strange handshake."}]),
    "default":Object.freeze([{"id":"reassemble.reaction.default.001","speaker":"Paul","text":"That doesn't fit there. The cardboard shape labels might help."}])
  });
  const fitVoices = Object.freeze([
    {id:"reassemble.reaction.fit.001",speaker:"Paul",text:"That actually fits."}
  ]);
  const noSelectionVoices = Object.freeze([
    {id:"reassemble.reaction.no-selection.001",speaker:"Paul",text:"Select a cardboard piece from the tray first."}
  ]);
  // The existing conditional hint caption is always preserved. Each variant
  // gets a separate MP3 so changing the selected body part remains accurate.
  const hintVoices = Object.freeze({"general":{"id":"reassemble.hint.general.001","speaker":"Paul","text":"Try the six normal cardboard bits. Spare kidneys, Wi-Fi hearts and toasters are extras."},"head":{"id":"reassemble.hint.head.001","speaker":"Paul","text":"Match the Head shape to the standee. He faces us, so his left is on your right."},"torso":{"id":"reassemble.hint.torso.001","speaker":"Paul","text":"Match the Torso shape to the standee. He faces us, so his left is on your right."},"left-arm":{"id":"reassemble.hint.left-arm.001","speaker":"Paul","text":"Match the Left arm shape to the standee. He faces us, so his left is on your right."},"right-arm":{"id":"reassemble.hint.right-arm.001","speaker":"Paul","text":"Match the Right arm shape to the standee. He faces us, so his left is on your right."},"left-leg":{"id":"reassemble.hint.left-leg.001","speaker":"Paul","text":"Match the Left leg shape to the standee. He faces us, so his left is on your right."},"right-leg":{"id":"reassemble.hint.right-leg.001","speaker":"Paul","text":"Match the Right leg shape to the standee. He faces us, so his left is on your right."}});
  function reactionVoice(part,slot) {
    const which = part === "wifi-heart" ? "wifi-heart" :
      part === "toaster" ? "toaster" : part === "banana" ? "banana" :
      part?.startsWith("kidney") ? "kidney" : part === "spleen" ? "spleen" :
      part === "head" && slot?.includes("arm") ? "head-arm" : "default";
    return reactionVoices[which];
  }
  function hintVoice(selectedPart) {
    const part = parts.some(p=>p.id === selectedPart) ? selectedPart : "general";
    return hintVoices[part];
  }
  const ending = Object.freeze([
    {id:"reassemble.ending.001",speaker:"Stephen",text:"Why is there a cardboard version of me?"},
    {id:"reassemble.ending.002",speaker:"David",text:"Stephen! You're alive!"},
    {id:"reassemble.ending.003",speaker:"Stephen",text:"I was having a massage."},
    {id:"reassemble.ending.004",speaker:"Paul",text:"We bought your replacement organs."},
    {id:"reassemble.ending.005",speaker:"Stephen",text:"You what?"},
    {id:"reassemble.ending.006",speaker:"David",text:"We reconstructed you. We weren't going to abandon you."},
    {id:"reassemble.ending.007",speaker:"Stephen",text:"That says 'custom souvenir cut-out'."},
    {id:"reassemble.ending.008",speaker:"Paul",text:"Oh."},
    {id:"reassemble.ending.009",speaker:"David",text:"The translation was ambiguous."},
    {id:"reassemble.ending.010",speaker:"Stephen",text:"You built a cardboard man to rescue me from a massage?"},
    {id:"reassemble.ending.011",speaker:"Paul",text:"It came with an extra kidney."},
    {id:"reassemble.ending.012",speaker:"Stephen",text:"WHY?"},
    {id:"reassemble.ending.013",speaker:"Cardboard Stephen",text:"Have you tried turning me off and on again?"},
    {id:"reassemble.ending.014",speaker:"David",text:"Technical triumph. I knew the framework would work."},
    {id:"reassemble.ending.015",speaker:"Narrator",text:"Stephen walks away. David congratulates the cardboard display."}
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
    parts,decoys,ending,reaction,reactionVoices,reactionVoice,fitVoices,noSelectionVoices,hintVoices,hintVoice,
    endCard:"ENDING C: SOME ASSEMBLY REQUIRED",
    powerText:"POWER ON STEPHEN",
    successText:"The cardboard display's LEDs flash. Its speaker crackles. David declares a successful rescue."
  });
})();
