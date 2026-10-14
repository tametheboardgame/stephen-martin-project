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

test("GAME-SP2.2 approved Great Wall data is compact and keeps the route provisional",()=>{
  const w=story().SMP_CHINA_WALL;
  assert.equal(w.title,"THE GREAT WALL");
  assert.equal(w.lines.length,5);
  assert.deepEqual(Array.from(w.lines,x=>x.id),[
    "china.wall.001","china.wall.002","china.wall.003","china.wall.004","china.wall.005"
  ]);
  assert.equal(w.lines[0].speaker,"Stephen");
  assert.equal(w.lines[1].speaker,"Promoter");
  assert.match(w.phoneText,/geopolitical variables/);
  assert.match(w.acceptReaction,/actual cult/);
  assert.ok(!w.lines.some(x=>x.id.startsWith("office.")));
  assert.ok(read("scripts/build.mjs").includes('src/china-data.js'));
});

test("office finale and Skip enter approved Chapter Two card then playable Great Wall",()=>{
  const p=preview();p.start();p.el("skipButton").click();
  assert.equal(saved(p).scene,"holiday");
  assert.equal(saved(p).holidayPhase,"transition");
  assert.equal(p.el("chinaTransition").hidden,false);
  assert.equal(p.el("wallScene").hidden,true);
  assert.equal(p.timeouts.size,0,"Chapter Two transition waits for an explicit user action");
  p.el("chinaStartButton").click();
  assert.equal(saved(p).holidayPhase,"wall");
  assert.equal(saved(p).wallStep,0);
  assert.equal(p.el("wallScene").hidden,false);
  assert.equal(p.el("chinaTransition").hidden,true);
  assert.match(p.el("wallLineText").textContent,/wonders of the world/);
  assert.match(p.el("wallPhoneText").textContent,/geopolitical variables/);
  assert.equal(p.el("wallBookingLabel").textContent,"Nothing booked yet");
  assert.equal(p.el("wallPromoter").hidden,true,"Promoter has not entered on Stephen's phone beat");
  assert.equal(p.el("wallPhone").hidden,false,"David's notification is visible on the opening beat");
  assert.equal(p.el("wallChoices").hidden,true);
});

test("Great Wall choice gates at script end; accept sets only pending plan and supports replay",()=>{
  const p=preview();p.start();p.el("skipButton").click();p.el("chinaStartButton").click();
  p.el("wallAcceptButton").click(); // Guard against choosing too soon
  assert.equal(saved(p).wallDecision,null);
  p.el("wallNextButton").click();
  assert.equal(p.el("wallPromoter").hidden,false,"Promoter enters on his first line");
  assert.equal(p.el("wallPhone").hidden,true,"Phone gets out of the way for the two-character scene");
  for(let i=1;i<5;i++)p.el("wallNextButton").click();
  assert.equal(saved(p).wallStep,5);
  assert.equal(p.el("wallChoices").hidden,false);
  assert.equal(p.el("wallNextButton").hidden,true);
  p.el("wallAcceptButton").click();
  assert.equal(saved(p).wallDecision,"accept");
  assert.equal(saved(p).pendingPlan,"cult");
  assert.equal(Object.hasOwn(saved(p),"route"),false,"Final route cannot lock in scene 1");
  assert.equal(p.el("wallBookingLabel").textContent,"The Summit");
  assert.match(p.el("wallResultText").textContent,/actual cult/);
  assert.equal(p.el("wallChoices").hidden,true);
  p.el("wallReplayButton").click();
  assert.equal(saved(p).wallStep,0);
  assert.equal(saved(p).wallDecision,null);
  assert.equal(saved(p).pendingPlan,null);
  assert.equal(p.el("wallDialogue").hidden,false);
  assert.equal(p.el("wallPromoter").hidden,true,"Restart returns to the solo Stephen opening beat");
  assert.equal(p.el("wallPhone").hidden,false);
});

test("declining keeps an empty plan; Continue restores saved Great Wall position",()=>{
  const p=preview();p.start();p.el("skipButton").click();p.el("chinaStartButton").click();
  p.el("wallNextButton").click();
  p.el("homeButton").click();
  assert.equal(p.el("menuScreen").hidden,false);
  p.el("resumeButton").click();
  assert.equal(p.el("holidayScreen").hidden,false);
  assert.equal(saved(p).wallStep,1);
  assert.equal(p.el("wallPromoter").hidden,false,"Resume re-enters the active promoter encounter");
  assert.equal(p.el("wallPhone").hidden,true);
  assert.equal(p.el("wallLineText").textContent,"You look like someone who'd enjoy The Summit. Exclusive mountain retreat. Very friendly gentlemen. Spectacular views.");
  for(let i=1;i<5;i++)p.el("wallNextButton").click();
  p.el("wallDeclineButton").click();
  assert.equal(saved(p).wallDecision,"decline");
  assert.equal(saved(p).pendingPlan,null);
  assert.match(p.el("wallResultText").textContent,/I'll regret this/);
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(p.el("wallResult").hidden,false);
  assert.equal(p.el("wallBookingLabel").textContent,"Nothing booked yet");
});

test("the three approved Chapter Two WebPs are packaged and standing Stephen retains transparency",()=>{
  const rootAssets="public/assets/generated";
  const sprite=fs.readFileSync(path.join(root,rootAssets,"characters/stephen-holiday-standing-neutral-v01.webp"));
  assert.equal(sprite.toString("ascii",0,4),"RIFF");
  assert.equal(sprite.toString("ascii",12,16),"VP8X");
  assert.ok(sprite[20]&0x10,"Holiday Stephen must be a separate transparent sprite");
  for(const asset of ["chapter-two-days-later-title-v01.webp","china-great-wall-background-v01.webp"]){
    const buf=fs.readFileSync(path.join(root,rootAssets,"locations",asset));
    assert.equal(buf.toString("ascii",0,4),"RIFF");
    assert.equal(buf.toString("ascii",8,12),"WEBP");
    assert.ok(read("scripts/build.mjs").includes(asset));
  }
  assert.match(html,/id="chinaStartButton"/);
  assert.match(html,/id="wallAcceptButton"/);
  assert.match(css,/#holidayScreen\.china-screen/);
  assert.ok(!read("src/office-data.js").includes("china.wall.001"));
});

test("approved full-body promoter is independently staged and preserves transparent sprite format",()=>{
  const name="great-wall-summit-promoter-standing-v01.webp";
  const asset=fs.readFileSync(path.join(root,"public/assets/generated/characters",name));
  assert.equal(asset.toString("ascii",0,4),"RIFF");
  assert.equal(asset.toString("ascii",12,16),"VP8X");
  assert.ok((asset[20]&0x10)!==0,"The promoter has a transparent background");
  assert.equal(1+asset.readUIntLE(24,3),1086,"Promoter width matches Stephen's source canvas");
  assert.equal(1+asset.readUIntLE(27,3),1448,"Promoter height matches Stephen's source canvas");
  assert.ok(html.includes('id="wallPromoter"'));
  assert.ok(html.includes('id="wallPhone"'));
  assert.ok(html.includes(name));
  assert.ok(css.includes("#holidayScreen .wall-promoter"));
  assert.ok(read("scripts/build.mjs").includes(name));
});

test("GAME-SP2.3 Forbidden City dialogue is canonical and distinct from the Summit promoter",()=>{
  const pal=story().SMP_CHINA_PALACE;
  assert.equal(pal.lines.length,4);
  assert.deepEqual(Array.from(pal.lines,l=>l.id),[
    "china.palace.001","china.palace.002","china.palace.003","china.palace.004"
  ]);
  assert.equal(pal.lines[0].speaker,"Attendant");
  assert.equal(pal.lines[1].speaker,"Stephen");
  assert.match(pal.lines[0].text,/International Cultural Excellence Banquet/);
  assert.equal(pal.titleBadge,"VISITING INTERNATIONAL SPECIALIST");
  assert.equal(pal.acceptReply.length,5);
  assert.match(pal.acceptReply.at(-1).text,/first one on my phone/);
  assert.ok(!pal.lines.some(l=>l.id.startsWith("office.")));
});

test("Forbidden City is inaccessible before the Wall booking choice, then opens as a second scene",()=>{
  const p=preview();p.start();p.el("skipButton").click();p.el("chinaStartButton").click();
  p.el("wallGoPalaceButton").click();
  assert.equal(saved(p).holidayPhase,"wall","Cannot bypass the Great Wall decision");
  for(let i=0;i<5;i++)p.el("wallNextButton").click();
  p.el("wallGoPalaceButton").click();
  assert.equal(saved(p).holidayPhase,"wall");
  p.el("wallDeclineButton").click();
  p.el("wallGoPalaceButton").click();
  assert.equal(saved(p).holidayPhase,"palace");
  assert.equal(p.el("wallScene").hidden,true);
  assert.equal(p.el("palaceScene").hidden,false);
  assert.equal(p.el("chinaTransition").hidden,true);
  assert.equal(p.el("palaceSpeakerName").textContent,"ATTENDANT");
  assert.match(p.el("palaceLineText").textContent,/guest of honour/);
  assert.equal(p.el("palaceBookingLabel").textContent,"Nothing booked yet");
  assert.ok(p.el("palaceStephen").src.endsWith("stephen-holiday-standing-neutral-v01.webp"));
  assert.equal(p.el("palaceHonourBadge").hidden,true);
  assert.equal(Object.hasOwn(saved(p),"route"),false);
});

test("Accepting the banquet replaces Summit, shows the approved pleased Stephen and photo gag",()=>{
  const p=preview();p.start();p.el("skipButton").click();p.el("chinaStartButton").click();
  for(let i=0;i<5;i++)p.el("wallNextButton").click();
  p.el("wallAcceptButton").click();p.el("wallGoPalaceButton").click();
  assert.equal(saved(p).pendingPlan,"cult");
  p.el("palaceAcceptButton").click();
  assert.equal(saved(p).palaceDecision,null,"Early acceptance is disallowed");
  for(let i=0;i<4;i++)p.el("palaceNextButton").click();
  assert.equal(p.el("palaceChoices").hidden,false);
  assert.equal(p.el("palaceNextButton").hidden,true);
  p.el("palaceAcceptButton").click();
  assert.equal(saved(p).pendingPlan,"detention");
  assert.equal(saved(p).palaceDecision,"accept");
  assert.equal(p.el("palaceBookingLabel").textContent,"International Cultural Excellence Banquet");
  assert.equal(Object.hasOwn(saved(p),"route"),false,"The Night Market still controls the final route lock");
  assert.equal(p.el("palaceHonourBadge").hidden,false);
  assert.ok(p.el("palaceStephen").src.endsWith("stephen-holiday-forbidden-city-pleased-v01.webp"));
  assert.match(p.el("palaceLineText").textContent,/prepare a speech/);
  assert.equal(p.el("palacePhotoGag").hidden,true,"The photo joke waits until the dialogue ends");
  for(let i=0;i<5;i++)p.el("palaceNextButton").click();
  assert.equal(p.el("palaceDialogue").hidden,true);
  assert.equal(p.el("palaceResult").hidden,false);
  assert.equal(p.el("palacePhotoGag").hidden,false);
  assert.match(p.el("palaceResultText").textContent,/bear picture/);
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).holidayPhase,"palace");
  assert.equal(p.el("palacePhotoGag").hidden,false);
  assert.equal(saved(p).pendingPlan,"detention");
});

test("Declining the banquet preserves Summit, and replay restores the earlier plan",()=>{
  const p=preview();p.start();p.el("skipButton").click();p.el("chinaStartButton").click();
  for(let i=0;i<5;i++)p.el("wallNextButton").click();
  p.el("wallAcceptButton").click();p.el("wallGoPalaceButton").click();
  p.el("palaceNextButton").click();
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).holidayPhase,"palace");
  assert.equal(saved(p).palaceStep,1,"Resume preserves the attendant encounter");
  for(let i=1;i<4;i++)p.el("palaceNextButton").click();
  p.el("palaceDeclineButton").click();
  assert.equal(saved(p).pendingPlan,"cult");
  assert.equal(p.el("palaceResult").hidden,false);
  assert.equal(p.el("palacePhotoGag").hidden,true);
  assert.equal(p.el("palaceHonourBadge").hidden,true);
  assert.match(p.el("palaceResultText").textContent,/get away from meetings/);
  p.el("palaceReplayButton").click();
  assert.equal(saved(p).palaceDecision,null);
  assert.equal(saved(p).pendingPlan,"cult","Great Wall booking survives palace replay");
  assert.equal(saved(p).palaceStep,0);
  p.el("palaceBackButton").click();
  assert.equal(saved(p).holidayPhase,"wall");
  assert.equal(p.el("wallBookingLabel").textContent,"The Summit");
  p.el("wallGoPalaceButton").click();
  assert.equal(saved(p).holidayPhase,"palace");
  assert.equal(saved(p).palaceStep,0);
});

test("Forbidden City art is in the build, with transparent independent characters and no baked interface",()=>{
  for(const name of ["china-banquet-attendant-standing-v01.webp","stephen-holiday-forbidden-city-pleased-v01.webp"]){
    const image=fs.readFileSync(path.join(root,"public/assets/generated/characters",name));
    assert.equal(image.toString("ascii",0,4),"RIFF");
    assert.equal(image.toString("ascii",12,16),"VP8X");
    assert.ok((image[20]&0x10)!==0,"Transparent character "+name);
    assert.equal(1+image.readUIntLE(24,3),1086);
    assert.equal(1+image.readUIntLE(27,3),1448);
    assert.ok(read("scripts/build.mjs").includes(name));
  }
  const place="china-forbidden-city-background-v01.webp";
  const bg=fs.readFileSync(path.join(root,"public/assets/generated/locations",place));
  assert.equal(bg.toString("ascii",0,4),"RIFF");
  assert.equal(bg.toString("ascii",8,12),"WEBP");
  assert.ok(read("scripts/build.mjs").includes(place));
  for(const id of ["palaceScene","palaceAcceptButton","palaceDeclineButton","palaceReplayButton","wallGoPalaceButton"]){
    assert.ok(html.includes('id="'+id+'"'));
  }
  assert.ok(css.includes("#holidayScreen #palaceScene"),"Palace matches office and Great Wall viewport contract");
});

test("Chapter Two desktop fits the same 16:9 viewport envelope as office",()=>{
  const block=css.split("GAME-SP2.2-F1 — Chapter Two desktop viewport fit")[1];
  assert.ok(block,"Viewport fix must remain scoped and documented");
  assert.match(block,/@media \(min-width: 801px\)/);
  assert.match(block,/body:has\(#holidayScreen:not\(\[hidden\]\)\) \.game-shell/);
  assert.match(block,/min-height: 100dvh/);
  assert.match(block,/body:has\(#holidayScreen:not\(\[hidden\]\)\) \.topbar/);
  assert.match(block,/body:has\(#holidayScreen:not\(\[hidden\]\)\) \.footnote/);
  assert.match(block,/width: min\(calc\(100vw - 22px\), calc\(177\.68dvh - 32px\), 1672px\)/);
  assert.match(block,/aspect-ratio: 1672 \/ 941/);
  assert.match(block,/#holidayScreen #chinaTransition/);
  assert.match(block,/#holidayScreen #wallScene/);
  assert.match(block,/\.wall-action-strip \{[\s\S]*?position: absolute/);
  assert.match(block,/\.china-footer \{[\s\S]*?position: absolute/);
  assert.match(block,/overflow-y: auto/,"Tall choices must remain usable");
  assert.ok(!block.includes("overflow-y: hidden"),"Do not make content inaccessible");
});

test("new expressions need only a registered seated source and no story edits",()=>{
  assert.ok(engine.includes("seatedExpressionSources"));
  assert.ok(engine.includes("David: {"));
  assert.ok(engine.includes("Paul: {"));
  assert.ok(engine.includes('applySeatedExpression(name)'));
  assert.ok(!reactions.includes("http"));
  assert.ok(read("index.html").indexOf("office-data.js")<read("index.html").indexOf("reactions.js"));
});
