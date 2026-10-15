const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const read = name => fs.readFileSync(path.join(root, name), "utf8");
const source = read("src/office-data.js");
const reactions = read("src/reactions.js");
const china = read("src/china-data.js");
const engine = read("src/game.js");
const html = read("index.html");
const css = read("src/styles.css");

function story() {
  const window = {};
  vm.runInNewContext(source, { window }, { timeout: 1000 });
  vm.runInNewContext(reactions, { window }, { timeout: 1000 });
  vm.runInNewContext(china, { window }, { timeout: 1000 });
  return window;
}
const beats = () => Array.from(story().SMP_OFFICE_SHOTS, shot => Array.from(shot.lines)).flat();
const all = beats();
const ids = all.map(b => b.id);

class Element {
  constructor(id) {
    this.id=id;this.hidden=false;this.disabled=false;this.textContent="";
    this.innerHTML="";this.src="";this.style={};this.dataset={};
    this.attributes={};this.events={};this.classList={toggle() {}};
  }
  addEventListener(t,cb){this.events[t]=cb;}
  setAttribute(k,v){this.attributes[k]=v;}
  click(){if(!this.disabled)this.events.click?.({target:this,preventDefault() {}});}
  closest(){return "button";}
}
function preview({audio=false}={}) {
  const elements=new Map(),stored=new Map(),timeouts=new Map(),listeners=new Map(),voices=[];
  const el=id=>{if(!elements.has(id))elements.set(id,new Element(id));return elements.get(id);};
  const document={getElementById:el,body:new Element("body"),hidden:false,
    addEventListener(type,cb){listeners.set(type,cb);}};
  const window={localStorage:{
    getItem:key=>stored.get(key)||null,
    setItem:(key,value)=>stored.set(key,value)
  },scrollTo() {}};
  if(audio) window.Audio=class {
    constructor(){this.src="";this.preload="";this.paused=true;this.pauseCount=0;this.playCount=0;voices.push(this);}
    play(){this.paused=false;this.playCount++;return Promise.resolve();}
    pause(){this.paused=true;this.pauseCount++;}
    finish(){this.onended?.();}
    fail(){this.onerror?.();}
  };
  vm.runInNewContext(source,{window},{timeout:1000});
  vm.runInNewContext(reactions,{window},{timeout:1000});
  vm.runInNewContext(china,{window},{timeout:1000});
  let timer=0;
  const context={window,document,HTMLElement:Element,
    setTimeout(callback,delay){timeouts.set(++timer,{callback,delay});return timer;},
    clearTimeout(id){timeouts.delete(id);}};
  vm.runInNewContext(engine,context,{timeout:1000});
  const tick=()=>{const first=timeouts.entries().next().value;if(!first)return false;timeouts.delete(first[0]);first[1].callback();return true;};
  const start=()=>el("startButton").click();
  const at=id=>{
    let bound=all.length+1;
    while(el("stage").attributes["aria-label"]!==null && --bound>0){
      const saved=JSON.parse(stored.values().next().value);
      if(saved.beatId===id)return;
      el("nextButton").click();
    }
    throw new Error("Did not reach "+id);
  };
  return {el,start,at,stored,timeouts,tick,document,listeners,voices};
}
function saved(p){return JSON.parse(p.stored.values().next().value);}

test("approved V3 script is one exterior plus one continuous office scene",()=>{
  const shots=story().SMP_OFFICE_SHOTS;
  assert.deepEqual(Array.from(shots,s=>s.id),["O00","O01"]);
  assert.equal(all.length,67);
  assert.equal(all.filter(x=>x.type==="dialogue" && x.speaker!=="Narrator").length,54);
  assert.equal(all.filter(x=>x.type!=="dialogue").length,12);
  assert.equal(all[0].id,"intro.exterior");
  assert.equal(all[1].text,"Right, I'm off. Two weeks. China. Romance. Culture. Absolutely no work.");
  assert.equal(all[2].text,"Is China far?");
  assert.equal(all[all.length-1].type,"title");
  assert.equal(all.find(x=>x.id==="office.054").text,"Yet.");
  assert.equal(new Set(ids).size,ids.length);
  assert.ok(!all.some(x=>x.speaker==="System"||x.type==="narration"));
});

test("all beats declare acting cues for all three actors using the approved vocabulary",()=>{
  const v=story().SMP_EXPRESSION_KEYS;
  assert.deepEqual(Object.keys(v),["Stephen","David","Paul"]);
  for(const beat of all){
    assert.match(beat.id,/^(intro\.exterior|office\.(?:\d{3}|v\d{2}))$/);
    assert.deepEqual(Object.keys(beat.reactions),["Stephen","David","Paul"]);
    for(const name of Object.keys(v)){
      const pose=beat.reactions[name];
      assert.ok(v[name].includes(pose)||name==="Stephen"&&pose==="absent",beat.id+" "+name+": "+pose);
    }
  }
  assert.equal(story().SMP_REACTIONS["office.021"].Stephen,"laughing");
  assert.equal(story().SMP_REACTIONS["office.054"].David,"shocked");
});

test("Stephen never returns once departure has taken place",()=>{
  const start=ids.indexOf("office.v08");
  assert.ok(start>40);
  assert.ok(all.slice(0,start).every(b=>b.reactions.Stephen!=="absent"));
  assert.ok(all.slice(start).every(b=>b.reactions.Stephen==="absent"));
  assert.equal(all[start].type,"departure");
});

test("visual actions are explicit and never spoken as narration",()=>{
  const visual=all.filter(x=>x.visual);
  assert.deepEqual(Array.from(visual,x=>x.visual),["risk","printer","chat","song","muted","folder"]);
  assert.ok(all.find(x=>x.visual==="song").songLyrics.includes("probably be fine"));
  assert.ok(all.find(x=>x.visual==="printer").text.includes("printer"));
  assert.ok(all.find(x=>x.visual==="folder").text.includes("FINAL 2"));
});

test("54 dialogue lines and the character voice are preserved",()=>{
  const words=all.filter(b=>b.type==="dialogue").map(x=>x.text);
  for(const excerpt of [
    "preliminary risk assessment","highly particular set of skills",
    "It was making a noise.","It's a famous bear.",
    "Can't. I'm the admin.","And a post-mortem.",
    "A little fridge magnet, preferably with Wi-Fi.","Yet."
  ])assert.ok(words.some(x=>x.includes(excerpt)),excerpt);
  assert.equal(words.filter(x=>x==="Right.").length,2);
  assert.equal(words.filter(x=>x==="Absolutely not.").length,1);
});

test("old saves map by historical beat, including both format versions",()=>{
  const mappings=story().SMP_LEGACY_BEAT_IDS;
  assert.deepEqual(Array.from(mappings,x=>x.length),[4,9,11,14,10,14,2]);
  for(const row of mappings)for(const id of row)assert.ok(ids.includes(id));
  for(const version of [1,2]){
    const p=preview(),shotIndex=version===1?0:1;
    p.stored.set("stephen-martin-game-sp1-save-v1",JSON.stringify({
      version,scene:"office",shotIndex,lineIndex:1,openingSeen:false
    }));
    p.el("homeButton").click();
    p.el("resumeButton").click();
    assert.equal(p.el("lineText").textContent,"Quite.");
    assert.equal(saved(p).version,3);
    assert.equal(saved(p).beatId,"office.003");
  }
  const v2=preview();
  v2.stored.set("stephen-martin-game-sp1-save-v1",JSON.stringify({version:2,scene:"office",shotIndex:0,lineIndex:0}));
  v2.el("homeButton").click();v2.el("resumeButton").click();
  assert.equal(saved(v2).beatId,"intro.exterior");
});

test("exterior leads into the correctly ordered office and rewind restores exterior",()=>{
  const p=preview();p.start();
  assert.equal(p.el("stage").dataset.location,"exterior");
  assert.equal(p.el("speakerName").textContent,"NARRATOR");
  assert.equal(p.el("sceneNumber").textContent,"CHAPTER 1 · OPENING");
  p.el("nextButton").click();
  assert.equal(p.el("stage").dataset.location,"interior");
  assert.equal(p.el("speakerName").textContent,"STEPHEN");
  p.el("nextButton").click();
  assert.equal(p.el("lineText").textContent,"Is China far?");
  p.el("backButton").click();p.el("backButton").click();
  assert.equal(p.el("stage").dataset.location,"exterior");
  assert.equal(p.timeouts.size,0,"Back pauses autoplay");
});

test("silent reactions hide captions and do not generate fake narration",()=>{
  const p=preview();p.start();p.at("office.v01");
  assert.equal(p.el("dialogueBox").hidden,true);
  assert.equal(p.el("speakerName").textContent,"");
  assert.equal(p.el("stage").dataset.cutaway,"none");
  assert.match(p.el("stage").attributes["aria-label"],/slowly nods/);
  assert.equal(p.el("castPaul").dataset.expression,"pleased");
  p.el("nextButton").click();
  assert.equal(p.el("dialogueBox").hidden,false);
  assert.equal(p.el("speakerName").textContent,"DAVID");
});

test("six scripted cutaways are visible, readable and return to the same office",()=>{
  const p=preview();p.start();
  for(const [beat,fragment] of [
    ["office.v02","PROBABLY FINE"],
    ["office.v04","OFFICE PRINTER"],
    ["office.v05","STEPHEN RESCUE GROUP"],
    ["office.v07","STEPHEN’S GOODBYE SONG"],
    ["office.v09","has muted the group"],
    ["office.v11","RESCUE PLAN - FINAL - FINAL 2"]
  ]){
    p.at(beat);
    assert.equal(p.el("cutawayPanel").hidden,false,beat);
    assert.equal(p.el("cutawayPanel").attributes["aria-hidden"],"false");
    assert.equal(p.el("dialogueBox").hidden,true);
    assert.ok(p.el("cutawayContent").innerHTML.includes(fragment),beat);
    assert.equal(p.el("stage").dataset.location,"interior");
  }
  p.at("office.v12");
  assert.equal(p.el("cutawayPanel").hidden,true);
  assert.ok(p.el("sceneEffect").innerHTML.includes("RESCUE"));
});

test("approved full seated Stephen and David poses swap independently, Paul remains Neutral",()=>{
  const p=preview();p.start();p.at("office.021");
  assert.equal(p.el("castStephen").dataset.expression,"laughing");
  assert.match(p.el("portraitStephen").src,/stephen-office-seated-laughing-v01\.webp/);
  assert.equal(p.el("castDavid").dataset.expression,"frustrated");
  assert.equal(p.el("castDavid").dataset.seatedSprite,"frustrated");
  assert.match(p.el("portraitDavid").src,/david-office-seated-frustrated-v01\.webp\?v=1$/);
  assert.equal(p.el("castPaul").dataset.seatedSprite,"neutral");
  const davidSrc=p.el("portraitDavid").src;
  p.el("stephenProofButton").click();
  assert.equal(p.el("portraitStephen").dataset.sprite,"neutral");
  p.el("stephenProofButton").click();
  assert.equal(p.el("portraitStephen").dataset.sprite,"amused");
  assert.equal(p.el("portraitDavid").src,davidSrc);
  assert.equal(p.el("castPaul").dataset.seatedSprite,"neutral");
});

test("David's full approved six-state set is mapped to every scripted beat",()=>{
  const expected={neutral:"neutral",confident:"confident",serious:"serious",frustrated:"frustrated",shocked:"shocked","systems-expert":"systems-expert"};
  const p=preview();p.start();
  for(let i=0;i<all.length;i++){
    if(i)p.el("nextButton").click();
    const cue=all[i].reactions.David;
    assert.equal(p.el("castDavid").dataset.expression,cue,all[i].id+" acting cue");
    assert.equal(p.el("castDavid").dataset.seatedSprite,expected[cue],all[i].id+" source");
    assert.match(p.el("portraitDavid").src,
      new RegExp("david-office-seated-"+expected[cue]+"-v01\\.webp"),all[i].id);
    const paulCue = all[i].reactions.Paul;
    const paulSprite = paulCue === "confused" || paulCue === "pleased" ? paulCue : "neutral";
    assert.equal(p.el("castPaul").dataset.seatedSprite,paulSprite,all[i].id+" Paul approved/fallback");
  }
});

test("David proof cycles all six states without changing scene or the other actors",()=>{
  const p=preview();p.start();p.at("office.006");
  assert.equal(p.el("castDavid").dataset.expression,"confident");
  assert.equal(p.el("castDavid").dataset.seatedSprite,"confident");
  assert.match(p.el("portraitDavid").src,/david-office-seated-confident-v01\.webp\?v=4$/);
  const paulSrc=p.el("portraitPaul").src,stephenSrc=p.el("portraitStephen").src;
  const timerCount=p.timeouts.size;
  for(const [mode,suffix] of [
    ["neutral","neutral-v01.webp"],["confident","confident-v01.webp?v=4"],
    ["serious","serious-v01.webp?v=1"],["frustrated","frustrated-v01.webp?v=1"],
    ["shocked","shocked-v01.webp?v=1"],["systems-expert","systems-expert-v01.webp?v=1"]
  ]){
    p.el("davidProofButton").click();
    assert.equal(p.el("castDavid").dataset.seatedSprite,mode);
    assert.ok(p.el("portraitDavid").src.endsWith("david-office-seated-"+suffix),mode);
    assert.equal(saved(p).beatId,"office.006");
    assert.equal(p.timeouts.size,timerCount);
    assert.equal(p.el("portraitPaul").src,paulSrc);
    assert.equal(p.el("portraitStephen").src,stephenSrc);
  }
  assert.equal(p.el("davidProofButton").textContent,"David: Systems Expert ↻");
  p.el("davidProofButton").click();
  assert.equal(p.el("castDavid").dataset.seatedSprite,"confident","Auto reuses current beat");
  p.el("nextButton").click();
  assert.equal(p.el("castDavid").dataset.expression,"systems-expert");
  assert.equal(p.el("castDavid").dataset.seatedSprite,"systems-expert");
  assert.equal(p.el("castPaul").dataset.seatedSprite,"neutral");
});

test("Paul Confused and Pleased use approved seated sprites; Blank stays Neutral",()=>{
  const p=preview();p.start();
  p.at("office.002");
  assert.equal(p.el("castPaul").dataset.expression,"confused");
  assert.equal(p.el("castPaul").dataset.seatedSprite,"confused");
  assert.ok(p.el("portraitPaul").src.endsWith("paul-office-seated-confused-v01.webp?v=1"));
  p.el("backButton").click();
  assert.equal(saved(p).beatId,"office.001");
  assert.equal(p.el("castPaul").dataset.expression,"blank");
  assert.equal(p.el("castPaul").dataset.seatedSprite,"neutral");
  p.at("office.004");
  assert.equal(p.el("castPaul").dataset.expression,"pleased");
  assert.equal(p.el("castPaul").dataset.seatedSprite,"pleased");
  assert.ok(p.el("portraitPaul").src.endsWith("paul-office-seated-pleased-v01.webp?v=1"));
});

test("Paul proof cycles Auto, Neutral, Confused and Pleased without affecting the other actors",()=>{
  const p=preview();p.start();p.at("office.002");
  const stephenSrc=p.el("portraitStephen").src;
  const davidSrc=p.el("portraitDavid").src;
  const timerCount=p.timeouts.size;
  p.el("paulProofButton").click();
  assert.equal(p.el("castPaul").dataset.seatedSprite,"neutral");
  assert.ok(p.el("portraitPaul").src.endsWith("paul-office-seated-neutral-v01.webp"));
  p.el("paulProofButton").click();
  assert.equal(p.el("castPaul").dataset.seatedSprite,"confused");
  assert.ok(p.el("portraitPaul").src.endsWith("paul-office-seated-confused-v01.webp?v=1"));
  p.el("paulProofButton").click();
  assert.equal(p.el("castPaul").dataset.seatedSprite,"pleased");
  assert.ok(p.el("portraitPaul").src.endsWith("paul-office-seated-pleased-v01.webp?v=1"));
  p.el("paulProofButton").click();
  assert.equal(p.el("paulProofButton").textContent,"Paul: Auto ↻");
  assert.equal(p.el("castPaul").dataset.seatedSprite,"confused");
  assert.equal(saved(p).beatId,"office.002");
  assert.equal(p.timeouts.size,timerCount);
  assert.equal(p.el("portraitStephen").src,stephenSrc);
  assert.equal(p.el("portraitDavid").src,davidSrc);
});

test("Paul's scripted reactions select Confused/Pleased and Blank resolves to Neutral across the intro",()=>{
  const p=preview();p.start();
  for(let i=0;i<all.length;i++){
    if(i)p.el("nextButton").click();
    const cue=all[i].reactions.Paul;
    const sprite=cue==="confused" ? "confused" : cue==="pleased" ? "pleased" : "neutral";
    assert.equal(p.el("castPaul").dataset.expression,cue,all[i].id+" Paul cue");
    assert.equal(p.el("castPaul").dataset.seatedSprite,sprite,all[i].id+" Paul sprite");
    assert.ok(p.el("portraitPaul").src.includes("paul-office-seated-"+sprite+"-v01.webp"),all[i].id);
  }
});

test("departure hides Stephen, rewind brings him back, then he stays absent",()=>{
  const p=preview();p.start();p.at("office.v08");
  assert.equal(p.el("castStephen").hidden,true);
  p.el("backButton").click();
  assert.equal(saved(p).beatId,"office.048");
  assert.equal(p.el("castStephen").hidden,false);
  p.el("nextButton").click();
  p.at("office.054");
  assert.equal(p.el("castStephen").hidden,true);
  assert.equal(p.el("castDavid").hidden,false);
  assert.equal(p.el("castPaul").hidden,false);
});

test("pause, auto next, skip and resume work without restarting dialogue",()=>{
  const p=preview();p.start();
  assert.equal(p.timeouts.size,1);
  assert.equal(p.tick(),true);
  assert.equal(saved(p).beatId,"office.001");
  p.el("playPauseButton").click();
  assert.equal(p.timeouts.size,0);
  p.el("nextButton").click();
  assert.equal(saved(p).beatId,"office.002");
  assert.equal(p.timeouts.size,0);
  p.el("playPauseButton").click();
  assert.equal(p.timeouts.size,1);
  p.el("skipButton").click();
  assert.equal(p.timeouts.size,0);
  assert.equal(saved(p).scene,"holiday");
  assert.equal(Object.hasOwn(saved(p),"route"),false);
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(p.el("holidayScreen").hidden,false);
});

test("the complete 67-beat intro can play through and replay",()=>{
  const p=preview();p.start();
  for(let i=1;i<all.length;i++)p.el("nextButton").click();
  assert.equal(saved(p).beatId,"office.v12");
  p.el("nextButton").click();
  assert.equal(p.el("holidayScreen").hidden,false);
  p.el("replayButton").click();
  assert.equal(p.el("stage").dataset.location,"exterior");
  assert.equal(saved(p).version,3);
});

test("no unapproved body artwork or legacy portrait overlays",()=>{
  assert.ok(engine.includes('Object.hasOwn(sources, requested) ? requested : "neutral"'));
  assert.ok(engine.includes('el.hidden = expression === "absent"'));
  for(const name of ["David","Stephen","Paul"]){
    assert.ok(html.includes('id="cast'+name+'"'));
    assert.ok(html.includes('id="portrait'+name+'"'));
  }
  assert.ok(html.indexOf('id="castDavid"')<html.indexOf('id="castStephen"'));
  assert.ok(html.indexOf('id="castStephen"')<html.indexOf('id="castPaul"'));
  assert.ok(html.indexOf('class="office-foreground"')<html.indexOf('id="dialogueBox"'));
  assert.ok(!html.includes('id="lineCount"'));
  assert.ok(!engine.includes("fetch("));
  assert.ok(css.includes("#officeScreen .dialogue[hidden]"));
  assert.ok(css.includes('opacity: 1'),"Characters remain fully opaque while listening");
  assert.ok(css.includes("prefers-reduced-motion"));
  assert.ok(html.includes('lang="en-GB"'));
});

test("existing artwork remains present with original alpha and dimensions",()=>{
  const allNames=[
    ...["david","stephen","paul"].map(n=>n+"-office-seated-neutral-v01.webp"),
    ...["amused","confused","annoyed","exasperated","laughing"].map(n=>"stephen-office-seated-"+n+"-v01.webp"),
    "david-office-seated-confident-v01.webp",
    "david-office-seated-serious-v01.webp",
    "david-office-seated-frustrated-v01.webp",
    "david-office-seated-shocked-v01.webp",
    "david-office-seated-systems-expert-v01.webp",
    "paul-office-seated-confused-v01.webp",
    "paul-office-seated-pleased-v01.webp"
  ];
  for(const asset of allNames){
    const file=fs.readFileSync(path.join(root,"public/assets/generated/characters",asset));
    assert.equal(file.toString("ascii",0,4),"RIFF");
    assert.equal(file.toString("ascii",12,16),"VP8X");
    assert.ok((file[20]&0x10)!==0,"alpha lost "+asset);
    const w=1+file.readUIntLE(24,3),h=1+file.readUIntLE(27,3);
    assert.equal(w,1086);assert.equal(h,1448);
    assert.ok(read("scripts/build.mjs").includes(asset));
  }
  for(const asset of ["office-clean-01-v01.webp","office-foreground-01-v01.webp","office-exterior-opening-v01.webp"])
    assert.ok(fs.statSync(path.join(root,"public/assets/generated/locations",asset)).size>0);
});

test("all 55 recordings map exactly to existing spoken beat IDs and never to silent actions",()=>{
  const dialogue=all.filter(b=>b.type==="dialogue");
  assert.equal(dialogue.length,55);
  assert.deepEqual(dialogue.reduce((out,b)=>{
    out[b.speaker]=(out[b.speaker]||0)+1;return out;
  },{}),{Narrator:1,Stephen:16,Paul:20,David:18});
  assert.deepEqual(dialogue.map(b=>b.id).slice(0,5),[
    "intro.exterior","office.001","office.002","office.003","office.004"
  ]);
  assert.deepEqual(dialogue.slice(-2).map(b=>b.id),["office.053","office.054"]);
  assert.ok(!all.some(b=>b.type!=="dialogue" && b.id.endsWith(".mp3")));
  assert.ok(engine.includes('VOICE_PATH + beat.id + ".mp3"'));
  assert.ok(read("scripts/build.mjs").includes('permitted.has(filename)'));
  assert.ok(fs.existsSync(path.join(root,"public/assets/audio/dialogue/README.md")));
});

test("Start voiced story plays narration and follows its natural end instead of text timeout",async()=>{
  const p=preview({audio:true});p.start();
  assert.equal(p.el("soundButton").textContent,"Sound: On");
  assert.equal(p.voices.length,1,"Start user gesture enables voice by default");
  assert.ok(p.voices[0].src.endsWith("intro.exterior.mp3"));
  await Promise.resolve();
  assert.equal(p.timeouts.size,0,"Voice owns timeline");
  p.voices[0].finish();
  assert.equal(p.timeouts.size,1,"Natural delay scheduled after clip ended");
  assert.equal(Array.from(p.timeouts.values())[0].delay,400);
  p.tick();
  assert.equal(saved(p).beatId,"office.001");
  assert.equal(p.voices[0].paused,true,"Previous clip is released");
  assert.ok(p.voices[1].src.endsWith("office.001.mp3"));
});

test("voice pause/resume retains clip position, and navigation stops previous audio",async()=>{
  const p=preview({audio:true});p.start();
  await Promise.resolve();
  const first=p.voices[0];
  p.el("playPauseButton").click();
  assert.equal(first.paused,true);
  assert.equal(p.timeouts.size,0);
  const before=first.playCount;
  p.el("playPauseButton").click();
  assert.equal(first.playCount,before+1,"Unpausing reuses the existing clip");
  await Promise.resolve();
  p.el("nextButton").click();
  assert.ok(p.voices.length>=2);
  assert.equal(first.paused,true);
  assert.ok(p.voices.at(-1).src.endsWith("office.001.mp3"));
  first.finish();
  assert.equal(saved(p).beatId,"office.001","Old clip cannot advance the next beat");
  p.el("backButton").click();
  assert.equal(p.voices.at(-2).paused,true);
  assert.equal(saved(p).beatId,"intro.exterior");
  await Promise.resolve(); // Wait for manually selected line's audio-loading promise.
  assert.equal(p.timeouts.size,0,"Back leaves autoplay disabled");
  p.el("skipButton").click();
  assert.equal(p.voices.at(-1).paused,true);
  assert.equal(saved(p).scene,"holiday");
});

test("missing MP3 and Sound Off fall back cleanly to the original text timer",async()=>{
  const p=preview({audio:true});p.start();
  await Promise.resolve();
  p.voices[0].fail(); // A 404/missing asset.
  assert.equal(p.timeouts.size,1);
  assert.equal(Array.from(p.timeouts.values())[0].delay,4800,"Narrator text duration retained");
  p.tick();
  assert.equal(saved(p).beatId,"office.001");
  const second=p.voices.at(-1);
  p.el("sceneSoundButton").click();
  assert.equal(second.paused,true);
  assert.equal(p.timeouts.size,1,"Muting restores the text timer");
  p.el("nextButton").click();
  assert.equal(saved(p).beatId,"office.002");
  assert.equal(p.voices.length,2,"Muted navigation never creates voice objects");
});

test("a deliberate Sound Off choice before Start remains muted across restart",()=>{
  const p=preview({audio:true});
  p.el("menuSoundButton").click(); // Sound On
  p.el("menuSoundButton").click(); // Sound Off, deliberate user choice
  p.start();
  assert.equal(p.el("soundButton").textContent,"Sound: Off");
  assert.equal(p.voices.length,0);
  assert.equal(p.timeouts.size,1);
  p.el("restartButton").click();
  assert.equal(p.el("soundButton").textContent,"Sound: Off");
  assert.equal(p.voices.length,0);
});


function toWallChoice() {
  const p=preview();p.start();p.el("skipButton").click();p.el("chinaStartButton").click();
  for(let i=0;i<5;i++)p.el("wallNextButton").click();
  return p;
}
function declineWallToPalace(p) {
  p.el("wallDeclineButton").click();
  p.el("wallGoPalaceButton").click();
  assert.equal(saved(p).holidayPhase,"intermission");
  assert.equal(saved(p).intermissionTarget,"palace");
  p.el("intermissionContinueButton").click();
  assert.equal(saved(p).holidayPhase,"palace");
}
function toPalaceChoice() {
  const p=toWallChoice();declineWallToPalace(p);
  for(let i=0;i<4;i++)p.el("palaceNextButton").click();
  return p;
}
function declinePalaceToMarket(p) {
  p.el("palaceDeclineButton").click();p.el("palaceGoMarketButton").click();
  assert.equal(saved(p).holidayPhase,"intermission");
  assert.equal(saved(p).intermissionTarget,"market");
  p.el("intermissionContinueButton").click();
  assert.equal(saved(p).holidayPhase,"market");
}
function toMarket() {
  const p=toPalaceChoice();declinePalaceToMarket(p);return p;
}
function finishMarket(p) {
  for(let i=0;i<6;i++)p.el("marketNextButton").click();
  assert.equal(saved(p).marketStep,6);
}
function finishPhone(p) {
  p.el("handoffContinueButton").click();
  assert.equal(saved(p).holidayPhase,"final-message");
  p.el("chinaFinalNextButton").click();p.el("chinaFinalNextButton").click();
  assert.equal(saved(p).finalStep,2);
}

test("Chapter Two enters Great Wall after voiced office and requires first meaningful choice",()=>{
  const p=toWallChoice();
  assert.equal(saved(p).holidayPhase,"wall");
  assert.equal(saved(p).wallDecision,null);
  assert.equal(saved(p).wallStep,5);
  assert.equal(p.el("wallChoices").hidden,false);
  p.el("wallGoPalaceButton").click();p.el("wallGoIncidentButton").click();
  assert.equal(saved(p).holidayPhase,"wall","Cannot bypass Wall decision");
  assert.equal(Object.hasOwn(saved(p),"route"),false);
  assert.equal(p.el("wallBookingLabel").textContent,"The Summit");
  assert.match(html,/id="chinaTransition"/);
  assert.match(html,/id="chinaStartButton"/);
});

test("Accepting Summit commits cult handoff, bypasses Palace and Market, then uses correct interrupted phone message",()=>{
  const p=toWallChoice();
  p.el("wallAcceptButton").click();
  assert.equal(saved(p).pendingPlan,"cult");
  assert.equal(p.el("wallGoPalaceButton").hidden,true);
  assert.equal(p.el("wallGoIncidentButton").hidden,false);
  p.el("wallGoPalaceButton").click();
  assert.equal(saved(p).holidayPhase,"wall","An accepted offer cannot unlock more sightseeing");
  p.el("wallGoIncidentButton").click();
  assert.equal(saved(p).route,"cult");
  assert.equal(saved(p).holidayPhase,"route-handoff");
  assert.equal(p.el("palaceScene").hidden,true);
  assert.equal(p.el("marketScene").hidden,true);
  assert.equal(p.el("handoffTitle").textContent,"THE SUMMIT");
  assert.equal(p.el("routeHandoffArt").dataset.route,"cult");
  p.el("handoffContinueButton").click();
  assert.match(p.el("chinaPhoneMessage").textContent,/asked me to be their/);
  assert.equal(p.el("chinaBatteryLabel").textContent,"1% battery");
  p.el("chinaFinalNextButton").click();
  assert.equal(p.el("chinaBatteryLabel").textContent,"0% · Battery depleted");
  assert.equal(p.el("chinaFinalReaction").hidden,false);
  p.el("chinaFinalNextButton").click();
  assert.equal(p.el("chinaFinalEngland").hidden,false);
  assert.equal(p.el("chinaAnotherEndingButton").hidden,false);
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).route,"cult");
  assert.equal(saved(p).finalStep,2);
});

test("Declining Summit shows a few days later intermission, then allows Forbidden City but not early Market",()=>{
  const p=toWallChoice();
  p.el("wallDeclineButton").click();
  assert.equal(p.el("wallGoIncidentButton").hidden,true);
  p.el("wallGoPalaceButton").click();
  assert.equal(saved(p).intermissionTarget,"palace");
  assert.equal(p.el("intermissionTime").textContent,"A FEW DAYS LATER…");
  assert.equal(p.el("intermissionDestination").textContent,"THE FORBIDDEN CITY");
  assert.equal(p.el("intermissionArt").dataset.destination,"palace");
  p.el("palaceGoMarketButton").click();
  assert.equal(saved(p).holidayPhase,"intermission");
  p.el("intermissionContinueButton").click();
  assert.equal(saved(p).holidayPhase,"palace");
  assert.equal(p.el("palaceStephen").dataset.sprite,"forbidden-city-pleased");
  assert.equal(p.el("palaceScene").hidden,false);
  assert.equal(p.el("palaceBookingLabel").textContent,"Honorary banquet");
});

test("Accepting the banquet plays its canonical follow-up then branches to detention, skipping Night Market",()=>{
  const p=toPalaceChoice();
  p.el("palaceAcceptButton").click();
  assert.equal(saved(p).pendingPlan,"detention");
  assert.equal(p.el("palaceHonourBadge").hidden,false);
  assert.equal(p.el("palaceGoMarketButton").hidden,true);
  p.el("palaceGoIncidentButton").click();
  assert.equal(saved(p).holidayPhase,"palace","Cannot skip the five follow-up lines");
  for(let i=0;i<5;i++)p.el("palaceNextButton").click();
  assert.equal(p.el("palacePhotoGag").hidden,false);
  assert.equal(p.el("palaceGoIncidentButton").hidden,false);
  p.el("palaceGoIncidentButton").click();
  assert.equal(saved(p).route,"detention");
  assert.equal(saved(p).holidayPhase,"route-handoff");
  assert.equal(p.el("handoffTitle").textContent,"THE CULTURAL EXCELLENCE BANQUET");
  p.el("handoffContinueButton").click();
  assert.match(p.el("chinaPhoneMessage").textContent,/official/);
  assert.equal(p.el("marketScene").hidden,true);
});

test("Declining both invitations shows next evening intermission, then Night Market has no decline option",()=>{
  const p=toPalaceChoice();
  p.el("palaceDeclineButton").click();p.el("palaceGoMarketButton").click();
  assert.equal(saved(p).holidayPhase,"intermission");
  assert.equal(saved(p).intermissionTarget,"market");
  assert.equal(p.el("intermissionTime").textContent,"THE NEXT EVENING…");
  assert.equal(p.el("intermissionDestination").textContent,"THE NIGHT MARKET");
  assert.equal(p.el("intermissionArt").dataset.destination,"market");
  p.el("intermissionContinueButton").click();
  assert.equal(saved(p).holidayPhase,"market");
  assert.equal(p.el("marketBookingLabel").textContent,"Total Renewal Spa — 90% off");
  assert.equal(p.el("marketSpaRep").hidden,true);
  p.el("marketNextButton").click();
  assert.equal(p.el("marketSpaSign").hidden,false);
  p.el("marketNextButton").click();
  assert.equal(p.el("marketSpaRep").hidden,false);
  assert.ok(!html.includes('id="marketDeclineButton"'));
  assert.ok(!html.includes('id="marketAcceptButton"'));
  assert.ok(!html.includes('id="marketFallback"'));
  assert.ok(!engine.includes("function selectFallback("));
});

test("Night Market automatically chooses the spa on the final line and locks reassembly at its handoff",()=>{
  const p=toMarket();
  finishMarket(p);
  assert.equal(saved(p).marketDecision,"accept");
  assert.equal(saved(p).pendingPlan,"reassemble");
  assert.equal(Object.hasOwn(saved(p),"route"),false);
  assert.equal(p.el("marketResult").hidden,false);
  assert.equal(p.el("marketNextButton").hidden,true);
  assert.match(p.el("marketResultText").textContent,/saved a fortune/);
  p.el("marketGoIncidentButton").click();
  assert.equal(saved(p).holidayPhase,"route-handoff");
  assert.equal(saved(p).route,"reassemble");
  assert.equal(p.el("routeHandoffArt").dataset.route,"reassemble");
  p.el("handoffContinueButton").click();
  assert.match(p.el("chinaPhoneMessage").textContent,/taking my entire/);
  p.el("chinaFinalNextButton").click();p.el("chinaFinalNextButton").click();
  assert.equal(p.el("chinaFinalEngland").hidden,false);
});

test("Return navigation and replay never preserve impossible downstream routes",()=>{
  const p=toPalaceChoice();
  p.el("palaceDeclineButton").click();p.el("palaceGoMarketButton").click();
  p.el("intermissionContinueButton").click();
  p.el("marketNextButton").click();
  p.el("marketBackButton").click();
  assert.equal(saved(p).holidayPhase,"palace");
  assert.equal(saved(p).marketStep,0);
  p.el("palaceBackButton").click();
  assert.equal(saved(p).holidayPhase,"wall");
  p.el("wallReplayButton").click();
  assert.equal(saved(p).wallStep,0);
  assert.equal(saved(p).wallDecision,null);
  assert.equal(saved(p).palaceDecision,null);
  assert.equal(saved(p).pendingPlan,null);
  assert.equal(Object.hasOwn(saved(p),"route"),false);
});

test("Choose another ending returns to Great Wall route choice, not the mandatory market",()=>{
  const p=toWallChoice();
  p.el("wallAcceptButton").click();p.el("wallGoIncidentButton").click();
  finishPhone(p);
  p.el("chinaAnotherEndingButton").click();
  assert.equal(saved(p).holidayPhase,"wall");
  assert.equal(saved(p).wallStep,5);
  assert.equal(saved(p).wallDecision,null);
  assert.equal(saved(p).palaceDecision,null);
  assert.equal(saved(p).pendingPlan,null);
  assert.equal(Object.hasOwn(saved(p),"route"),false);
  assert.equal(p.el("wallChoices").hidden,false);
  declineWallToPalace(p);
  for(let i=0;i<4;i++)p.el("palaceNextButton").click();
  p.el("palaceAcceptButton").click();
  for(let i=0;i<5;i++)p.el("palaceNextButton").click();
  p.el("palaceGoIncidentButton").click();
  assert.equal(saved(p).route,"detention");
});

test("SAVE: resumes intermission, mid-Market and incident handoff with no lost decisions",()=>{
  const p=toWallChoice();
  p.el("wallDeclineButton").click();p.el("wallGoPalaceButton").click();
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).holidayPhase,"intermission");
  p.el("intermissionContinueButton").click();
  for(let i=0;i<4;i++)p.el("palaceNextButton").click();
  p.el("palaceDeclineButton").click();p.el("palaceGoMarketButton").click();
  p.el("intermissionContinueButton").click();
  p.el("marketNextButton").click();
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).marketStep,1);
  for(let i=1;i<6;i++)p.el("marketNextButton").click();
  p.el("marketGoIncidentButton").click();
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).holidayPhase,"route-handoff");
  assert.equal(saved(p).route,"reassemble");
  assert.equal(p.el("handoffTitle").textContent,"TOTAL RENEWAL SPA");
});

test("Older same-day multi-accept saves migrate to the FIRST accepted branch",()=>{
  for(const [choices,expected] of [
    [{wallDecision:"accept",palaceDecision:"accept",marketDecision:"accept"},"cult"],
    [{wallDecision:"decline",palaceDecision:"accept",marketDecision:"accept"},"detention"]
  ]){
    const p=preview();
    p.stored.set("stephen-martin-game-sp1-save-v1",JSON.stringify({
      version:3,scene:"holiday",beatId:"office.v12",openingSeen:true,
      holidayPhase:"final-message",route:"reassemble",marketStep:6,finalStep:2,...choices
    }));
    p.el("resumeButton").click();
    assert.equal(saved(p).route,expected);
    assert.equal(saved(p).holidayPhase,"route-handoff");
    assert.equal(saved(p).holidayFlowVersion,2);
  }
});

test("Approval and asset contract: approved scene images preserved with alpha and packaged",()=>{
  const characterDir="public/assets/generated/characters";
  for(const name of [
    "stephen-holiday-standing-neutral-v01.webp",
    "great-wall-summit-promoter-standing-v01.webp",
    "china-banquet-attendant-standing-v01.webp",
    "stephen-holiday-forbidden-city-pleased-v01.webp",
    "china-night-market-spa-representative-v01.webp",
    "stephen-night-market-skewer-v01.webp"
  ]){
    const buff=fs.readFileSync(path.join(root,characterDir,name));
    assert.equal(buff.toString("ascii",0,4),"RIFF");
    assert.equal(buff.toString("ascii",12,16),"VP8X");
    assert.ok((buff[20]&0x10)!==0,"Approved sprite must be transparent: "+name);
    assert.ok(read("scripts/build.mjs").includes(name));
  }
  for(const name of ["chapter-two-days-later-title-v01.webp",
    "china-great-wall-background-v01.webp",
    "china-forbidden-city-background-v01.webp",
    "china-night-market-background-v01.webp"]){
    const buff=fs.readFileSync(path.join(root,"public/assets/generated/locations",name));
    assert.equal(buff.toString("ascii",0,4),"RIFF");
    assert.equal(buff.toString("ascii",8,12),"WEBP");
  }
});

test("Layout: desktop viewport preserved with two-column first and second choices, and accessible intermission",()=>{
  assert.match(css,/GAME-SP2.3C — timeline intermissions/);
  assert.match(css,/#holidayScreen #chinaIntermission\[hidden\]/);
  assert.match(css,/#holidayScreen #chinaRouteHandoff\[hidden\]/);
  assert.match(css,/#holidayScreen \.china-intermission-art\[data-destination="palace"\]/);
  assert.match(css,/#holidayScreen \.china-intermission-art\[data-destination="market"\]/);
  assert.match(css,/grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css,/aspect-ratio:1672\/941/);
  assert.match(css,/@media \(max-width:450px\)/);
  assert.ok(!css.split("GAME-SP2.3C — timeline intermissions")[1].includes("overflow-y:hidden"));
});

test("Holiday story data retains locked 5 Wall, 4 Palace and 6 Market dialogue beats and final text",()=>{
  const w=story();
  assert.equal(w.SMP_CHINA_WALL.lines.length,5);
  assert.equal(w.SMP_CHINA_PALACE.lines.length,4);
  assert.equal(w.SMP_CHINA_PALACE.acceptReply.length,5);
  assert.equal(w.SMP_CHINA_MARKET.lines.length,6);
  assert.match(w.SMP_CHINA_MARKET.signHeadline,/90%/);
  assert.match(w.SMP_CHINA_FINAL.messageByRoute.cult,/asked me to be their/);
  assert.match(w.SMP_CHINA_FINAL.messageByRoute.detention,/official/);
  assert.match(w.SMP_CHINA_FINAL.messageByRoute.reassemble,/entire/);
  assert.equal(w.SMP_CHINA_FINAL.stephenLastLine,"Oh, for fuck's sake.");
});


function toRescueAlarm(route="cult") {
  let p;
  if(route==="cult") {
    p=toWallChoice();
    p.el("wallAcceptButton").click();p.el("wallGoIncidentButton").click();
  } else if(route==="detention") {
    p=toPalaceChoice();
    p.el("palaceAcceptButton").click();
    for(let i=0;i<5;i++)p.el("palaceNextButton").click();
    p.el("palaceGoIncidentButton").click();
  } else {
    p=toMarket();
    finishMarket(p);
    p.el("marketGoIncidentButton").click();
  }
  finishPhone(p);
  p.el("chinaFinalNextButton").click();
  return p;
}
test("GAME-SP2.4A alarm uses all ten approved lines and the route-specific last transmission",()=>{
  const alarm=story().SMP_RESCUE_ALARM;
  assert.equal(alarm.lines.length,10);
  assert.deepEqual(Array.from(alarm.lines,x=>x.id),Array.from({length:10},(_,i)=>"rescue.alarm."+String(i+1).padStart(3,"0")));
  assert.equal(alarm.lines[0].text,"Stephen has stopped responding.");
  assert.equal(alarm.lines[6].text,"Could just be his battery.");
  assert.equal(alarm.lines[9].text,"Pack everything.");
  assert.equal(alarm.montage.length,4);
  assert.match(alarm.montage[3].title,/UNNECESSARY SPENDING/);
  for(const [route,fragment] of [
    ["cult","asked me to be their"],
    ["detention","introduced as the official"],
    ["reassemble","taking my entire"]
  ]){
    const p=toRescueAlarm(route);
    assert.equal(saved(p).route,route,"Route cannot change when rescue starts");
    assert.equal(saved(p).holidayPhase,"rescue-alarm");
    assert.equal(saved(p).rescueAlarmStep,0);
    assert.equal(p.el("rescueAlarmScene").hidden,false);
    assert.equal(p.el("rescueAlarmTravelButton").hidden,true);
    assert.equal(p.el("rescueAlarmSpeaker").textContent,"DAVID");
    assert.equal(p.el("rescueAlarmPhone").hidden,true);
    p.el("rescueAlarmTravelButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-alarm","Cannot skip dialogue");
    for(let i=0;i<5;i++)p.el("rescueAlarmNextButton").click();
    assert.equal(p.el("rescueAlarmPhone").hidden,false,"Final transmission visual on sixth line");
    assert.match(p.el("rescueAlarmPhoneText").textContent,new RegExp(fragment));
    assert.equal(p.el("rescueAlarmDavid").dataset.sprite,"systems-expert");
    p.el("rescueAlarmNextButton").click();
    assert.equal(p.el("rescueAlarmPaul").dataset.sprite,"confused");
  }
});

test("GAME-SP2.4A travel montage is a bounded four-beat cutaway after the last alarm line",()=>{
  const p=toRescueAlarm();
  for(let i=0;i<10;i++)p.el("rescueAlarmNextButton").click();
  assert.equal(saved(p).rescueAlarmStep,10);
  assert.equal(p.el("rescueAlarmNextButton").hidden,true);
  assert.equal(p.el("rescueAlarmTravelButton").hidden,false);
  p.el("rescueAlarmNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-alarm");
  p.el("rescueAlarmTravelButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-travel");
  assert.equal(p.el("rescueTravelTitle").textContent,"TWO TICKETS. ZERO PLANNING.");
  for(let i=0;i<3;i++)p.el("rescueTravelNextButton").click();
  assert.equal(saved(p).rescueTravelStep,3);
  assert.match(p.el("rescueTravelTitle").textContent,/UNNECESSARY SPENDING/);
  p.el("rescueTravelNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-hub-arrival");
  assert.equal(saved(p).route,"cult");
  assert.equal(p.el("rescueHubArrival").hidden,false);
  assert.match(html,/GAME-SP2\.4B/,"Hotel investigation is explicitly future work");
  assert.ok(!html.includes("hotel-visitor-information-background-v01.webp"),"Unapproved generated art must not be packaged");
});

test("GAME-SP2.4A Continue checkpoints alarm, travel and hub arrival; replay resets to first choice",()=>{
  const p=toRescueAlarm("detention");
  p.el("rescueAlarmNextButton").click();p.el("rescueAlarmNextButton").click();
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-alarm");
  assert.equal(saved(p).rescueAlarmStep,2);
  assert.equal(p.el("rescueAlarmLine").textContent,"Exactly. Pre-arranged silence. A signal.");
  for(let i=2;i<10;i++)p.el("rescueAlarmNextButton").click();
  p.el("rescueAlarmTravelButton").click();
  p.el("rescueTravelNextButton").click();
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-travel");
  assert.equal(saved(p).rescueTravelStep,1);
  p.el("rescueTravelNextButton").click();
  p.el("rescueTravelNextButton").click();
  p.el("rescueTravelNextButton").click();
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-hub-arrival");
  p.el("rescueHubReplayButton").click();
  assert.equal(saved(p).holidayPhase,"wall");
  assert.equal(saved(p).wallDecision,null);
  assert.equal(saved(p).rescueAlarmStep,0);
  assert.equal(saved(p).rescueTravelStep,0);
  assert.equal(Object.hasOwn(saved(p),"route"),false);
});

test("GAME-SP2.4A uses existing approved characters and 16:9 scene; no new art imported",()=>{
  assert.match(css,/GAME-SP2\.4A — OFFICE-ALARM/);
  assert.match(css,/#holidayScreen #rescueAlarmScene\[hidden\]/);
  assert.match(css,/\.rescue-alarm-stage,\s*#holidayScreen \.rescue-travel-stage/);
  assert.match(css,/aspect-ratio:1672\/941/);
  for(const name of ["david-office-seated-serious-v01.webp","david-office-seated-confident-v01.webp",
    "david-office-seated-frustrated-v01.webp","david-office-seated-systems-expert-v01.webp",
    "paul-office-seated-neutral-v01.webp","paul-office-seated-confused-v01.webp",
    "paul-office-seated-pleased-v01.webp","office-clean-01-v01.webp","office-foreground-01-v01.webp"])
    assert.ok(html.includes(name)||engine.includes(name),name);
  for(const id of ["rescueAlarmScene","rescueAlarmLine","rescueAlarmNextButton",
    "rescueAlarmTravelButton","rescueTravelScene","rescueTravelNextButton",
    "rescueHubArrival","rescueHubReplayButton"])
    assert.ok(html.includes('id="'+id+'"'),id);
  assert.equal(story().SMP_RESCUE_ALARM.lines.length,10);
});


function toHotelInvestigation(route="cult"){
  const p=toRescueAlarm(route);
  for(let i=0;i<10;i++)p.el("rescueAlarmNextButton").click();
  p.el("rescueAlarmTravelButton").click();
  for(let i=0;i<4;i++)p.el("rescueTravelNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-hub-arrival");
  p.el("rescueHubStartButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-hotel");
  return p;
}
function completeHotelIntro(p) {
  for(let i=0;i<8;i++)p.el("hotelNextButton").click();
  assert.equal(saved(p).hubIntroStep,8);
}
test("SP2.4B hotel starts only after four travel cards; canonical eight arrival lines gate evidence",()=>{
  const p=toHotelInvestigation("cult");
  assert.equal(p.el("rescueHotelScene").hidden,false);
  assert.equal(p.el("rescueHotelHotspots").hidden,true);
  assert.equal(p.el("hotelLine").textContent,"We begin with intelligence gathering. Observe, analyse, act.");
  p.el("hotelCultButton").click();
  p.el("hotelPhoneButton").click();
  assert.equal(saved(p).hubMatched,false);
  assert.equal(saved(p).hubActiveClue,null);
  assert.equal(saved(p).hubWrongGuesses,0);
  completeHotelIntro(p);
  assert.equal(p.el("hotelLine").textContent,"Same thing, isn't it?");
  assert.equal(p.el("rescueHotelHotspots").hidden,false);
  assert.equal(p.el("hotelDeductions").hidden,false);
  assert.equal(p.el("hotelNextButton").hidden,true);
  assert.equal(story().SMP_RESCUE_HUB.opening.length,8);
});
test("SP2.4B approved background remains separate from actors, clickable clues and dialogue UI",()=>{
  const name="china-visitor-information-lobby-background-v01.webp";
  const p="public/assets/generated/locations/"+name;
  const buf=fs.readFileSync(path.join(root,p));
  assert.equal(buf.toString("ascii",0,4),"RIFF");
  assert.equal(buf.toString("ascii",8,12),"WEBP");
  assert.ok(read("scripts/build.mjs").includes(p));
  assert.ok(html.includes(p));
  assert.match(css,/GAME-SP2\.4B — Approved empty Visitor Information environment/);
  assert.match(css,/#holidayScreen \.rescue-hotel-hotspots/);
  for(const id of ["rescueHotelScene","rescueHotelHotspots","hotelPhoneButton","hotelBrochureButton",
    "hotelDeskButton","hotelEvidencePanel","hotelDeductions","hotelHint","hotelResolved"])
    assert.ok(html.includes('id="'+id+'"'),id);
  for(const [name,id] of [
    ["david-hotel-standing-investigator-v01.webp","rescueHotelDavid"],
    ["paul-hotel-standing-puzzled-v01.webp","rescueHotelPaul"]
  ]){
    const asset=path.join(root,"public/assets/generated/characters",name);
    const buff=fs.readFileSync(asset);
    assert.equal(buff.toString("ascii",0,4),"RIFF",name);
    assert.equal(buff.toString("ascii",12,16),"VP8X",name);
    assert.ok((buff[20]&0x10)!==0,"Standing sprite must have alpha: "+name);
    assert.ok(read("scripts/build.mjs").includes(name));
    assert.ok(html.includes(name) && html.includes('id="'+id+'"'),name);
  }
  // Stage actors on a shared floor line beyond the foreground table, with
  // Paul visibly shorter than David at every responsive breakpoint.
  assert.match(css,/\.rescue-hotel-actor \{[\s\S]*?bottom:19%/);
  assert.match(css,/\.rescue-hotel-david \{height:56%;left:21%;max-width:31%/);
  assert.match(css,/\.rescue-hotel-paul \{height:46%;left:40%;max-width:27%/);
  assert.match(css,/@media \(max-width:800px\) \{[\s\S]*?\.rescue-hotel-actor \{bottom:20%/);
  assert.match(css,/\.rescue-hotel-david \{height:50%;left:15%;max-width:43%/);
  assert.match(css,/\.rescue-hotel-paul \{height:41%;left:42%;max-width:35%/);
  assert.match(css,/@media \(max-width:450px\) \{[\s\S]*?\.rescue-hotel-actor \{bottom:22%/);
  assert.match(css,/\.rescue-hotel-david \{height:42%;left:9%;max-width:58%/);
  assert.match(css,/\.rescue-hotel-paul \{height:35%;left:43%;max-width:54%/);
  assert.match(css,/\.rescue-hotel-actor \{[\s\S]*?pointer-events:none/,"Cutouts cannot block hotel clue buttons");
  assert.match(css,/\.rescue-hotel-hotspots \{[^}]*z-index:4/,"Clues stay above independent actors");
});
test("SP2.4B phone, brochure and desk are independent clues in any order; reading none is not a soft lock",()=>{
  const p=toHotelInvestigation("reassemble");
  completeHotelIntro(p);
  p.el("hotelDeskButton").click();
  assert.equal(saved(p).hubActiveClue,"desk");
  assert.equal(saved(p).hubViewed[0],"desk");
  assert.match(p.el("hotelEvidenceRouteClue").textContent,/⚙/);
  assert.equal(p.el("hotelDeductions").hidden,true);
  p.el("hotelCultButton").click();
  assert.equal(saved(p).hubWrongGuesses,0,"Clue panel prevents accidental choice");
  p.el("hotelEvidenceCloseButton").click();
  p.el("hotelBrochureButton").click();
  assert.match(p.el("hotelEvidenceText").textContent,/Total Renewal Spa/);
  p.el("hotelEvidenceCloseButton").click();
  p.el("hotelPhoneButton").click();
  assert.match(p.el("hotelEvidenceText").textContent,/taking my entire/);
  p.el("hotelEvidenceCloseButton").click();
  assert.equal(saved(p).hubViewed.length,3);
  assert.equal(p.el("hotelDeductions").hidden,false);
});
test("SP2.4B wrong guesses produce route-specific jokes, hints after 2 and reveal after 4",()=>{
  const p=toHotelInvestigation("detention");
  completeHotelIntro(p);
  p.el("hotelCultButton").click();
  assert.equal(saved(p).hubWrongGuesses,1);
  assert.equal(p.el("hotelHint").hidden,true);
  assert.match(p.el("hotelDeductionFeedback").textContent,/Topographic deception/);
  p.el("hotelReassembleButton").click();
  assert.equal(saved(p).hubWrongGuesses,2);
  assert.equal(p.el("hotelHint").hidden,false);
  assert.match(p.el("hotelHint").textContent,/banquet/);
  p.el("hotelCultButton").click();
  p.el("hotelReassembleButton").click();
  assert.equal(saved(p).hubWrongGuesses,4);
  assert.equal(p.el("hotelDetentionButton").dataset.correct,"true");
  assert.equal(p.el("hotelCultButton").dataset.correct,"false");
  p.el("hotelReassembleButton").click();
  assert.equal(saved(p).hubWrongGuesses,4,"Mistakes capped to avoid unbounded state");
  assert.equal(saved(p).route,"detention","Deduction never changes a route");
});
test("SP2.4B all three correct deductions lead through canonical five reply lines to their own route intro",()=>{
  for(const [route,label] of [["cult","THE SUMMIT"],["detention","CULTURAL HONOURS BANQUET"],["reassemble","TOTAL RENEWAL SPA"]]){
    const p=toHotelInvestigation(route);
    completeHotelIntro(p);
    p.el("hotel"+route[0].toUpperCase()+route.slice(1)+"Button").click();
    assert.equal(saved(p).hubMatched,true);
    assert.equal(saved(p).route,route);
    assert.equal(p.el("hotelResolved").hidden,false);
    assert.match(p.el("hotelResolvedText").textContent,/We have our location/);
    for(let i=0;i<5;i++)p.el("hotelFinishButton").click();
    assert.equal(saved(p).hubCorrectStep,5);
    assert.match(p.el("hotelResolvedText").textContent,/Don't undermine/);
    p.el("hotelFinishButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-route-intro");
    assert.equal(p.el("hotelRouteHeading").textContent,label);
    assert.equal(p.el("rescueHotelScene").hidden,true);
    assert.equal(p.el("rescueRouteIntro").hidden,false);
    assert.match(p.el("hotelRouteDescription").textContent,/.+/);
    assert.equal(saved(p).route,route);
    p.el("hotelRouteReplayButton").click();
    assert.equal(saved(p).holidayPhase,"wall");
    assert.equal(saved(p).wallDecision,null);
    assert.equal(saved(p).hubMatched,false);
    assert.equal(Object.hasOwn(saved(p),"route"),false);
  }
});
test("SP2.4B save/Continue holds mid-dialogue, inspected clues, wrong guesses and completion",()=>{
  const p=toHotelInvestigation("cult");
  p.el("hotelNextButton").click();p.el("hotelNextButton").click();
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).hubIntroStep,2);
  completeHotelIntro(p);
  p.el("hotelPhoneButton").click();
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).hubActiveClue,"phone");
  assert.equal(saved(p).hubViewed[0],"phone");
  assert.match(p.el("hotelEvidenceText").textContent,/asked me to be their/);
  p.el("hotelEvidenceCloseButton").click();
  p.el("hotelDetentionButton").click();
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).hubWrongGuesses,1);
  p.el("hotelCultButton").click();
  p.el("hotelFinishButton").click();
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).hubCorrectStep,1);
  assert.equal(saved(p).route,"cult");
});
test("new expressions need only a registered seated source and no story edits",()=>{
  assert.ok(engine.includes("seatedExpressionSources"));
  assert.ok(engine.includes("David: {"));
  assert.ok(engine.includes("Paul: {"));
  assert.ok(engine.includes("applySeatedExpression(name)"));
  assert.ok(!reactions.includes("http"));
  assert.ok(read("index.html").indexOf("office-data.js")<read("index.html").indexOf("reactions.js"));
});
