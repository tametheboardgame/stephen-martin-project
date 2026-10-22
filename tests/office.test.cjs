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
const rescueFrameworkSource = read("src/rescue-framework.js");
const summitSource = read("src/summit-data.js");
const detentionSource = read("src/detention-data.js");
const assemblySource = read("src/reassemble-data.js");
const engine = read("src/game.js");
const html = read("index.html");
const css = read("src/styles.css");

function story() {
  const window = {};
  vm.runInNewContext(source, { window }, { timeout: 1000 });
  vm.runInNewContext(reactions, { window }, { timeout: 1000 });
  vm.runInNewContext(china, { window }, { timeout: 1000 });
  vm.runInNewContext(rescueFrameworkSource, { window }, { timeout: 1000 });
  vm.runInNewContext(summitSource, { window }, { timeout: 1000 });
  vm.runInNewContext(detentionSource, { window }, { timeout: 1000 });
  vm.runInNewContext(assemblySource, { window }, { timeout: 1000 });
  return window;
}
const beats = () => Array.from(story().SMP_OFFICE_SHOTS, shot => Array.from(shot.lines)).flat();
const all = beats();
const ids = all.map(b => b.id);

class Element {
  constructor(id) {
    this.id=id;this.hidden=false;this.disabled=false;this.textContent="";
    this.innerHTML="";this.src="";this.style={};this.dataset={};this.scrollTop=0;this.scrollHeight=900;this.clientHeight=300;
    this.attributes={};this.events={};this.classList={toggle() {}};
  }
  addEventListener(t,cb){this.events[t]=cb;}
  setAttribute(k,v){this.attributes[k]=v;}
  click(){if(!this.disabled)this.events.click?.({target:this,preventDefault() {}});}
  closest(){return "button";}
  focus(){this.focusCount=(this.focusCount||0)+1;}
}
function preview({audio=false,assetLoader=null,saveData=false}={}) {
  const elements=new Map(),stored=new Map(),timeouts=new Map(),listeners=new Map(),voices=[];
  const el=id=>{if(!elements.has(id))elements.set(id,new Element(id));return elements.get(id);};
  const document={getElementById:el,body:new Element("body"),hidden:false,
    addEventListener(type,cb){listeners.set(type,cb);}};
  const window={localStorage:{
    getItem:key=>stored.get(key)||null,
    setItem:(key,value)=>stored.set(key,value)
  },scrollTo() {}};
  if(assetLoader) window.SMP_ASSET_LOADER={
    present(){return false;},busy(){return false;},cancel(){},...assetLoader
  };
  if(saveData) window.navigator={connection:{saveData:true}};
  if(audio) window.Audio=class {
    constructor(){this.src="";this.preload="";this.paused=true;this.pauseCount=0;this.playCount=0;this.currentTime=0;this.duration=120;voices.push(this);}
    play(){this.paused=false;this.playCount++;return Promise.resolve();}
    pause(){this.paused=true;this.pauseCount++;}
    finish(){this.onended?.();}
    fail(){this.onerror?.();}
  };
  vm.runInNewContext(source,{window},{timeout:1000});
  vm.runInNewContext(reactions,{window},{timeout:1000});
  vm.runInNewContext(china,{window},{timeout:1000});
  vm.runInNewContext(rescueFrameworkSource,{window},{timeout:1000});
  vm.runInNewContext(summitSource,{window},{timeout:1000});
  vm.runInNewContext(detentionSource,{window},{timeout:1000});
  vm.runInNewContext(assemblySource,{window},{timeout:1000});
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

test("five illustrated cutaways remain, and the song uses only its dedicated player",()=>{
  const p=preview();p.start();
  for(const [beat,fragment] of [
    ["office.v02","office-david-risk-cutaway-v01.webp"],
    ["office.v04","office-printer-bear-cutaway-v01.webp"],
    ["office.v05","office-phone-group-chat-cutaway-v01.webp"],
    ["office.v09","office-phone-group-muted-cutaway-v01.webp"],
    ["office.v11","RESCUE PLAN - FINAL - FINAL 2"]
  ]){
    p.at(beat);
    assert.equal(p.el("cutawayPanel").hidden,false,beat);
    assert.equal(p.el("cutawayPanel").attributes["aria-hidden"],"false");
    assert.equal(p.el("dialogueBox").hidden,true);
    assert.ok(p.el("cutawayContent").innerHTML.includes(fragment),beat);
    assert.equal(p.el("stage").dataset.location,"interior");
  }
  const songView=preview();songView.start();songView.at("office.v07");
  assert.equal(songView.el("cutawayPanel").hidden,true,"Retired song card is not painted underneath");
  assert.equal(songView.el("cutawayContent").innerHTML,"","No obsolete song/lyrics duplicate");
  assert.equal(songView.el("stage").dataset.cutaway,"none");
  assert.equal(songView.el("stage").dataset.songActive,"true");
  assert.equal(songView.el("officeSongOverlay").hidden,false);
  assert.equal(songView.el("officeSongLyricsScroll").hidden,false);
  p.at("office.v12");
  assert.equal(p.el("cutawayPanel").hidden,true);
  assert.equal(p.el("stage").dataset.songActive,"false");
  assert.ok(p.el("sceneEffect").innerHTML.includes("RESCUE"));
});

test("approved seated expressions react automatically and independently across office beats",()=>{
  const p=preview();p.start();p.at("office.021");
  assert.equal(p.el("castStephen").dataset.expression,"laughing");
  assert.match(p.el("portraitStephen").src,/stephen-office-seated-laughing-v01\.webp/);
  assert.equal(p.el("castDavid").dataset.expression,"frustrated");
  assert.equal(p.el("castDavid").dataset.seatedSprite,"frustrated");
  assert.match(p.el("portraitDavid").src,/david-office-seated-frustrated-v01\.webp\?v=1$/);
  assert.equal(p.el("castPaul").dataset.seatedSprite,"neutral");
  const before=all.findIndex(x=>x.id==="office.021");
  p.el("nextButton").click();
  const next=all[before+1];
  assert.equal(saved(p).beatId,next.id);
  for(const actor of ["Stephen","David","Paul"]){
    const expected=next.reactions[actor];
    const source=actor==="Paul" && !["confused","pleased"].includes(expected)?"neutral":expected;
    assert.equal(p.el("cast"+actor).dataset.expression,expected);
    assert.equal(p.el("cast"+actor).dataset.seatedSprite,source);
    assert.ok(p.el("portrait"+actor).src.includes(actor.toLowerCase()+"-office-seated-"+source+"-v01.webp"));
  }
  p.el("backButton").click();
  assert.equal(saved(p).beatId,"office.021");
  assert.equal(p.el("castStephen").dataset.seatedSprite,"laughing");
  assert.equal(p.el("castDavid").dataset.seatedSprite,"frustrated");
});
test("David's full approved six-state set is mapped to every scripted beat",()=>{
  const expected={neutral:"neutral",confident:"confident",serious:"serious",frustrated:"frustrated",shocked:"shocked","systems-expert":"systems-expert"};
  const p=preview();p.start();
  for(let i=0;i<all.length;i++){
    if(i) {
      p.el("nextButton").click();
      if(all[i-1].id==="office.041") p.el("nextButton").click(); // Explicit musical-choice beat.
    }
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

test("David's expressions follow the script on Next and Back without manual overrides",()=>{
  const p=preview();p.start();p.at("office.006");
  assert.equal(p.el("castDavid").dataset.expression,"confident");
  assert.equal(p.el("castDavid").dataset.seatedSprite,"confident");
  assert.match(p.el("portraitDavid").src,/david-office-seated-confident-v01\.webp\?v=4$/);
  const paulSrc=p.el("portraitPaul").src,stephenSrc=p.el("portraitStephen").src;
  p.el("nextButton").click();
  assert.equal(p.el("castDavid").dataset.expression,"systems-expert");
  assert.equal(p.el("castDavid").dataset.seatedSprite,"systems-expert");
  assert.match(p.el("portraitDavid").src,/david-office-seated-systems-expert-v01\.webp\?v=1$/);
  assert.equal(p.el("portraitPaul").src,paulSrc);
  assert.equal(p.el("castStephen").dataset.expression,all.find(x=>x.id===saved(p).beatId).reactions.Stephen);
  assert.notEqual(p.el("portraitStephen").src,stephenSrc,"Stephen must continue reacting automatically");
  p.el("backButton").click();
  assert.equal(saved(p).beatId,"office.006");
  assert.equal(p.el("castDavid").dataset.seatedSprite,"confident");
  assert.match(p.el("portraitDavid").src,/david-office-seated-confident-v01\.webp\?v=4$/);
});
test("Paul Confused and Pleased use approved seated sprites; Blank stays Neutral",()=>{
  const p=preview();p.start();
  p.at("office.002");
  assert.equal(p.el("castPaul").dataset.expression,"confused");
  assert.equal(p.el("castPaul").dataset.seatedSprite,"confused");
  assert.ok(p.el("portraitPaul").src.endsWith("paul-office-seated-confused-v01.webp?v=2"));
  p.el("backButton").click();
  assert.equal(saved(p).beatId,"office.001");
  assert.equal(p.el("castPaul").dataset.expression,"blank");
  assert.equal(p.el("castPaul").dataset.seatedSprite,"neutral");
  p.at("office.004");
  assert.equal(p.el("castPaul").dataset.expression,"pleased");
  assert.equal(p.el("castPaul").dataset.seatedSprite,"pleased");
  assert.ok(p.el("portraitPaul").src.endsWith("paul-office-seated-pleased-v01.webp?v=2"));
});

test("Paul's expressions follow Confused, Blank fallback and Pleased automatically",()=>{
  const p=preview();p.start();p.at("office.002");
  assert.equal(p.el("castPaul").dataset.seatedSprite,"confused");
  assert.match(p.el("portraitPaul").src,/paul-office-seated-confused-v01\.webp\?v=2$/);
  p.el("nextButton").click();
  assert.equal(saved(p).beatId,"office.003");
  assert.equal(p.el("castPaul").dataset.expression,"blank");
  assert.equal(p.el("castPaul").dataset.seatedSprite,"neutral");
  assert.match(p.el("portraitPaul").src,/paul-office-seated-neutral-v01\.webp$/);
  p.el("nextButton").click();
  assert.equal(saved(p).beatId,"office.004");
  assert.equal(p.el("castPaul").dataset.seatedSprite,"pleased");
  assert.match(p.el("portraitPaul").src,/paul-office-seated-pleased-v01\.webp\?v=2$/);
  p.el("backButton").click();
  assert.equal(p.el("castPaul").dataset.seatedSprite,"neutral");
});
test("Paul's scripted reactions select Confused/Pleased and Blank resolves to Neutral across the intro",()=>{
  const p=preview();p.start();
  for(let i=0;i<all.length;i++){
    if(i) {
      p.el("nextButton").click();
      if(all[i-1].id==="office.041") p.el("nextButton").click();
    }
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
  assert.equal(p.timeouts.size,1,"Holiday cinematic now auto-advances by default");
  assert.equal(saved(p).scene,"holiday");
  assert.equal(Object.hasOwn(saved(p),"route"),false);
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(p.el("holidayScreen").hidden,false);
});

test("the complete 67-beat intro can play through and replay",()=>{
  const p=preview();p.start();
  for(let i=1;i<all.length;i++) {
    p.el("nextButton").click();
    if(all[i-1].id==="office.041") p.el("nextButton").click();
  }
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
    // G0A revised Paul's confused and pleased sprites with safe lateral margins.
    // The remaining seated portraits retain their approved 1086px widths.
    assert.equal(w,["paul-office-seated-confused-v01.webp","paul-office-seated-pleased-v01.webp"].includes(asset)?1130:1086);
    assert.equal(h,1448);
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
  assert.equal(Array.from(p.timeouts.values())[0].delay,260);
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
  const previousOfficeClip=p.voices.at(-1);
  p.el("skipButton").click();
  assert.equal(previousOfficeClip.paused,true,"Office recording stops on scene change");
  assert.ok(p.voices.at(-1).src.endsWith("transition.china.chapter-two.001.mp3"),
    "Chapter Two now has its own off-stage narrator cue");
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
  assert.equal(p.el("chinaBatteryLabel").textContent,"1% · LOW BATTERY");
  p.el("chinaFinalNextButton").click();
  assert.equal(p.el("chinaBatteryLabel").textContent,"0% · Battery flat");
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
  assert.match(html,/id="rescueHotelScene"/,"Hotel investigation remains available after travel");
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
  // Stage David slightly farther back and smaller than before, while
  // Paul's accepted positions are preserved at every responsive breakpoint.
  assert.match(css,/\.rescue-hotel-actor \{[\s\S]*?bottom:24%/);
  assert.match(css,/\.rescue-hotel-david \{height:56%;left:22%;bottom:28%;max-width:31%/);
  assert.match(css,/\.rescue-hotel-paul \{height:50%;left:42%;max-width:28%/);
  assert.match(css,/@media \(max-width:800px\) \{[\s\S]*?\.rescue-hotel-actor \{bottom:24%/);
  assert.match(css,/\.rescue-hotel-david \{height:50%;left:16%;bottom:28%;max-width:42%/);
  assert.match(css,/\.rescue-hotel-paul \{height:45%;left:44%;max-width:36%/);
  assert.match(css,/@media \(max-width:450px\) \{[\s\S]*?\.rescue-hotel-actor \{bottom:26%/);
  assert.match(css,/\.rescue-hotel-david \{height:42%;left:10%;bottom:30%;max-width:56%/);
  assert.match(css,/\.rescue-hotel-paul \{height:38%;left:45%;max-width:54%/);
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

test("SP3.0 shared framework exposes the three approved intros and ending contracts",()=>{
  const f=story().SMP_RESCUE_FRAMEWORK;
  assert.deepEqual(Object.keys(f.routes),["cult","detention","reassemble"]);
  assert.equal(f.routes.cult.gameTitle,"The Summit Admissions Test");
  assert.equal(f.routes.detention.gameTitle,"The Great Stamp Catastrophe");
  assert.equal(f.routes.reassemble.endingTitle,"SOME ASSEMBLY REQUIRED");
  assert.match(f.routes.cult.intro[0].text,/radiant new chairman/);
  assert.match(f.routes.detention.intro.at(-1).text,/printer/);
  assert.match(f.routes.reassemble.intro[2].text,/replacement parts/);
  assert.equal(f.fresh("bogus"),null);
  for(const [route,def] of Object.entries(f.routes)){
    assert.ok(def.intro.length>=6);
    assert.equal(f.fresh(route).route,route);
    assert.equal(f.fresh(route).finished,false);
    assert.equal(f.fresh(route).miniGameStage,0);
  }
  assert.ok(html.includes('src="./src/rescue-framework.js"'));
  assert.ok(read("scripts/build.mjs").includes('"src/rescue-framework.js"'));
  assert.ok(html.indexOf('src="./src/rescue-framework.js"')<html.indexOf('src="./src/game.js"'));
});
test("SP3.0 choice rounds are monotonic and no-fail, with Paul hint after two errors",()=>{
  const f=story().SMP_RESCUE_FRAMEWORK;
  for(const route of ["cult","detention"]){
    let p=f.fresh(route);
    p=f.wrong(p,route);
    assert.equal(p.wrongAnswers,1);assert.equal(p.hintVisible,false);
    p=f.wrong(p,route);
    assert.equal(p.wrongAnswers,2);assert.equal(p.hintVisible,true);
    p=f.completeStep(p,route,1);
    assert.equal(p.miniGameStage,0,"Cannot complete a future round early");
    p=f.completeStep(p,route,0);
    assert.equal(p.miniGameStage,1);assert.equal(p.wrongAnswers,0);
    p=f.completeStep(p,route,0);
    assert.equal(p.miniGameStage,1,"Repeated answer cannot skip a step");
    p=f.completeStep(p,route,1);
    p=f.completeStep(p,route,2);
    assert.equal(p.finished,true);assert.equal(p.miniGameStage,3);
    p=f.wrong(p,route);
    assert.equal(p.miniGameStage,3);
  }
});
test("SP3.0 cardboard matching retains six distinct slots, rejects extras and resumes idempotently",()=>{
  const f=story().SMP_RESCUE_FRAMEWORK;
  let p=f.fresh("reassemble");
  p=f.placePart(p,"reassemble","toaster","torso");
  p=f.placePart(p,"reassemble","banana","head");
  assert.equal(p.hintVisible,true);
  assert.equal(p.miniGameStage,0);
  p=f.placePart(p,"reassemble","head","torso");
  assert.equal(p.miniGameStage,0);
  p=f.placePart(p,"reassemble","head","head");
  assert.equal(p.miniGameStage,1);assert.equal(p.hintVisible,false);
  p=f.placePart(p,"reassemble","head","head");
  assert.equal(p.miniGameStage,1,"Duplicate piece cannot increase count");
  const restored=f.normalise(JSON.parse(JSON.stringify(p)),"reassemble");
  assert.equal(restored.miniGameStage,1);
  for(const part of ["torso","left-arm","right-arm","left-leg","right-leg"])
    p=f.placePart(p,"reassemble",part,part);
  assert.equal(p.finished,true);
  assert.equal(p.miniGameStage,6);
  assert.equal(p.placedParts.length,6);
});
test("SP3.0 save normaliser rejects mismatched routes and bounds progress",()=>{
  const f=story().SMP_RESCUE_FRAMEWORK;
  const bad={version:1,route:"cult",introStep:999,miniGameStage:999,wrongAnswers:999,
    placedParts:["head"],finished:true,endingStep:999999};
  const changed=f.normalise(bad,"detention");
  assert.equal(changed.route,"detention");assert.equal(changed.miniGameStage,0);
  const same=f.normalise(bad,"cult");
  assert.equal(same.introStep,f.routes.cult.intro.length);
  assert.equal(same.miniGameStage,3);
  assert.equal(same.wrongAnswers,4);
  assert.equal(same.finished,true);
  const assembly=f.normalise({...bad,route:"reassemble",placedParts:["head","head","toaster"]},"reassemble");
  assert.equal(assembly.miniGameStage,1);
  assert.equal(assembly.finished,false,"Incomplete assembly never resumes as completed");
});
test("SP3.0 route briefings preserve progress and do not skip either available puzzle",()=>{
  const f=story().SMP_RESCUE_FRAMEWORK;
  for(const route of ["cult","detention","reassemble"]){
    const p=toHotelInvestigation(route);
    completeHotelIntro(p);
    const button="hotel"+route[0].toUpperCase()+route.slice(1)+"Button";
    p.el(button).click();
    for(let i=0;i<6;i++)p.el("hotelFinishButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-route-intro");
    assert.equal(saved(p).rescueProgress.route,route);
    assert.equal(saved(p).rescueProgress.introStep,0);
    assert.equal(p.el("routeIntroSpeaker").textContent,f.routes[route].intro[0].speaker.toUpperCase());
    p.el("routeIntroNextButton").click();
    p.el("homeButton").click();p.el("resumeButton").click();
    assert.equal(saved(p).rescueProgress.introStep,1,"Continue must restore the exact spoken line");
    assert.equal(p.el("routeIntroLine").textContent,f.routes[route].intro[1].text);
    for(let i=1;i<f.routes[route].intro.length;i++)p.el("routeIntroNextButton").click();
    assert.equal(saved(p).rescueProgress.introStep,f.routes[route].intro.length);
    p.el("routeIntroNextButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-minigame");
    assert.equal(p.el("rescueMiniGameTitle").textContent,f.routes[route].gameTitle);
    assert.equal(p.el("summitAdmissions").hidden,route!=="cult");
    assert.equal(p.el("detentionPaperwork").hidden,route!=="detention");
    assert.equal(p.el("reassembleWorkshop").hidden,route!=="reassemble");
    assert.equal(p.el("rescueEndingSummary").hidden,true,"Do not present an unbuilt ending");
    p.el("homeButton").click();p.el("resumeButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-minigame");
    p.el("rescueMiniGameBackButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-route-intro");
    p.el("routeIntroNextButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-minigame");
    p.el("rescueMiniGameReplayButton").click();
    assert.equal(saved(p).holidayPhase,"wall");
    assert.equal(saved(p).wallDecision,null);
    assert.equal(saved(p).hubMatched,false);
    assert.equal(Object.hasOwn(saved(p),"rescueProgress"),false);
    assert.equal(Object.hasOwn(saved(p),"route"),false);
  }
});

test("SP3.0 legacy V3 hotel handoff saves migrate without changing Stephen's route",()=>{
  const p=toHotelInvestigation("cult");
  completeHotelIntro(p);
  p.el("hotelCultButton").click();
  for(let i=0;i<6;i++)p.el("hotelFinishButton").click();
  const legacy=saved(p);
  assert.equal(legacy.holidayPhase,"rescue-route-intro");
  delete legacy.rescueProgress;
  p.stored.set("stephen-martin-game-sp1-save-v1",JSON.stringify(legacy));
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).route,"cult");
  assert.equal(saved(p).rescueProgress.version,1);
  assert.equal(saved(p).rescueProgress.route,"cult");
  assert.equal(saved(p).rescueProgress.introStep,0);
  // An invalid unfinished ending summary must never masquerade as a win.
  const corrupted=saved(p);
  corrupted.holidayPhase="rescue-ending-summary";
  corrupted.rescueProgress={version:1,route:"detention",miniGameStage:3,finished:true};
  p.stored.set("stephen-martin-game-sp1-save-v1",JSON.stringify(corrupted));
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-minigame");
  assert.equal(saved(p).rescueProgress.route,"cult");
  assert.equal(saved(p).rescueProgress.finished,false);
  assert.equal(p.el("rescueEndingSummary").hidden,true);
});

function toSummitAdmissions(){
  const p=toHotelInvestigation("cult");
  completeHotelIntro(p);
  p.el("hotelCultButton").click();
  for(let i=0;i<6;i++)p.el("hotelFinishButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-intro");
  const intro=story().SMP_RESCUE_FRAMEWORK.routes.cult.intro;
  for(let i=0;i<=intro.length;i++)p.el("routeIntroNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-minigame");
  assert.equal(p.el("summitAdmissions").hidden,false);
  return p;
}
test("SP3.1 approved Summit script, correct cards, preview assets and responsive selectors",()=>{
  const data=story().SMP_SUMMIT;
  assert.equal(data.rounds.length,3);
  assert.deepEqual(Array.from(data.rounds,x=>x.options.find(o=>o.correct).id),["charger","legs","flight"]);
  for(const round of data.rounds){
    assert.equal(round.options.length,3);
    assert.ok(round.hint.startsWith("Paul:"));
    assert.equal(new Set(round.options.map(x=>x.id)).size,3);
  }
  assert.equal(story().SMP_RESCUE_FRAMEWORK.routes.cult.intro.length,7);
  assert.match(story().SMP_RESCUE_FRAMEWORK.routes.cult.intro[6].text,/outside the gate/);
  assert.equal(data.ending.length,14);
  assert.match(data.ending[0].text,/what the hell/i);
  assert.match(data.ending.at(-1).text,/humility/);
  assert.equal(data.endCard,"ENDING A: HEAVEN WAS A PLACE ON EARTH");
  assert.ok(html.includes('id="summitEndingScene"'));
  assert.ok(html.includes('id="summitChoice2"'));
  assert.ok(html.indexOf('src="./src/summit-data.js"')<html.indexOf('src="./src/game.js"'));
  assert.ok(read("scripts/build.mjs").includes('"src/summit-data.js"'));
  assert.match(css,/\.summit-cards \{display:grid;grid-template-columns:repeat\(3/);
  assert.match(css,/\.summit-card \{[\s\S]*?min-height:166px/);
  assert.match(css,/@media \(max-width:800px\) \{[\s\S]*?\.summit-cards \{grid-template-columns:1fr/);
});
test("GAME-SP4.1G3C artwork well IDs follow the unchanged nine Summit answer choices",()=>{
  const data=story().SMP_SUMMIT;
  const expected=[
    ["a1","a2","a3"],["b1","b2","b3"],["c1","c2","c3"]
  ];
  const ids=new Set();
  for(let round=0;round<3;round++){
    const options=data.rounds[round].options;
    assert.equal(options.length,3);
    for(let choice=0;choice<3;choice++){
      assert.equal(options[choice].artSlot,expected[round][choice]);
      ids.add(options[choice].artSlot);
      assert.ok(options[choice].label.length>4);
    }
  }
  assert.equal(ids.size,9,"Every image well is uniquely addressed even for two ticket IDs");
  for(let i=0;i<3;i++){
    assert.match(html,new RegExp('id="summitChoice'+i+'"[\\s\\S]*?id="summitChoiceArt'+i+'"[^>]*aria-hidden="true"[\\s\\S]*?id="summitChoiceLabel'+i+'"'));
  }
  assert.doesNotMatch(html,/Illustrated choices in preparation/,"Final icon build has no draft notice");
  assert.doesNotMatch(css,/ART PENDING/,"Final icon art wells have no draft markers");
  const slots={
    a1:"vase",a2:"airline-ticket",a3:"phone-charger",
    b1:"spreadsheet",b2:"legs",b3:"it-ticket",
    c1:"rescue-kit",c2:"membership-card",c3:"return-flight"
  };
  for(const [slot,slug] of Object.entries(slots)){
    assert.ok(css.includes('.summit-card-art[data-slot="'+slot+'"]'),"CSS slot "+slot+" exists");
    assert.ok(css.includes('summit-choice-'+slug+'-cutout-v01.webp'),"Approved WebP "+slug+" is referenced");
  }
  assert.ok(css.includes("height:92px;width:100%"),"Desktop art well has real height");
  assert.ok(css.includes("grid-template-columns:84px minmax(0,1fr)"),"Tablet cards use compact side-by-side art");
  assert.ok(css.includes("grid-template-columns:60px minmax(0,1fr)"),"Phone cards use smaller art wells");
  assert.ok(!css.includes("summit-admissions-icons-atlas-v01.webp"),"Unapproved atlas must not ship");
});

test("GAME-SP4.1G3C all nine staged approved WebP choices are built and packaged",()=>{
  const names=[
    "vase","airline-ticket","phone-charger",
    "spreadsheet","legs","it-ticket",
    "rescue-kit","membership-card","return-flight"
  ];
  for(const slug of names){
    const asset="public/assets/generated/game/summit-choice-"+slug+"-cutout-v01.webp";
    assert.ok(fs.existsSync(path.join(root,asset)),asset+" has been materialised");
    const raw=fs.readFileSync(path.join(root,asset));
    assert.equal(raw.subarray(0,4).toString("ascii"),"RIFF");
    assert.equal(raw.subarray(8,12).toString("ascii"),"WEBP");
    assert.ok(raw.length>2500 && raw.length<2*1024*1024,asset+" size is plausible");
    assert.equal(raw.subarray(12,16).toString("ascii"),"VP8X",asset+" has extended alpha header");
    assert.ok((raw[20] & 0x10)!==0,asset+" preserves transparency");
    const builder=read("scripts/build.mjs");
    assert.ok(builder.includes('"public/assets/generated/game/summit-choice-" + slug + "-cutout-v01.webp"'),
      "Cloudflare build must copy all nine approved icons");
    assert.ok(builder.includes('copyFile(path.join(root, relative), path.join(output, relative))'),
      "Build includes each generated WebP in published dist");
    assert.ok(css.includes("../public/assets/generated/game/summit-choice-"+slug+"-cutout-v01.webp"),
      "CSS image URL resolves to the same path copied into dist");

  }
});

test("GAME-SP4.1G3C short laptop screens keep puzzle heading below toolbar without default-scroll bloat",()=>{
  const start=css.indexOf("/* GAME-SP4.1G3C laptop-height polish");
  const end=css.indexOf("/* GAME-SP3.2 provisional fictional paperwork",start);
  assert.ok(start>=0 && end>start,"Laptop-height responsive rule is present");
  const rules=css.slice(start,end);
  assert.ok(rules.includes("@media (min-width:801px) and (max-height:900px)"),
    "Only short laptop/desktop screens get the compact card layout");
  assert.ok(rules.includes(".rescue-route-intro-stage {\n    padding:94px 3% 68px;"),
    "Leave clear space below the global top navigation");
  assert.ok(rules.includes("#summitAdmissions h2 {\n    font-size:clamp(21px,2.1vw,29px)"),
    "Shrink the question heading on smaller-height laptops");
  assert.ok(rules.includes(".summit-card {\n    min-height:133px;"),
    "Reclaim vertical room from provisional answer card images");
  assert.ok(rules.includes(".summit-card-art {\n    height:69px;"),
    "Match the compact art well to the card height");
  assert.ok(rules.includes("@media (min-width:801px) and (max-height:680px)"),
    "Extra-short landscape screens keep a second compact breakpoint");
  assert.match(css,/#holidayScreen \.summit-admissions \{[\s\S]*?overflow-y:auto/,
    "Long accessibility feedback and hints can still scroll when genuinely necessary");
  assert.ok(css.includes("@media (max-width:800px) {\n  #holidayScreen .summit-cards"),
    "Portrait tablet and phone continue to use the existing horizontal illustrated choices");
});

test("GAME-SP4.1G3C all three rounds refresh pictured slots and accessible labels without changing answers",()=>{
  const p=toSummitAdmissions();
  const rounds=story().SMP_SUMMIT.rounds;
  for(let round=0;round<3;round++){
    for(let i=0;i<3;i++){
      const option=rounds[round].options[i];
      assert.equal(p.el("summitChoiceLabel"+i).textContent,option.label);
      assert.equal(p.el("summitChoiceArt"+i).dataset.slot,option.artSlot);
      assert.equal(p.el("summitChoiceArt"+i).textContent,"","Art is decorative, not duplicated as button text");
      assert.equal(p.el("summitChoice"+i).dataset.correct,"false");
    }
    if(round===0){
      p.el("homeButton").click();p.el("resumeButton").click();
      assert.equal(p.el("summitChoiceLabel0").textContent,rounds[0].options[0].label,
        "Save/Resume still redraws live labels");
    }
    const correct=rounds[round].options.findIndex(o=>o.correct);
    p.el("summitChoice"+correct).click();
    assert.equal(p.el("summitChoiceCards").hidden,true);
    p.el("summitNextButton").click();
  }
  assert.equal(saved(p).holidayPhase,"rescue-route-ending");
});

test("SP3.1 wrong answers persist, Paul hints after 2, correct answers require acknowledgement",()=>{
  const p=toSummitAdmissions();
  p.el("summitChoice0").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,0);
  assert.equal(saved(p).rescueProgress.wrongAnswers,1);
  assert.equal(p.el("summitHint").hidden,true);
  assert.match(p.el("summitFeedback").textContent,/Can it charge/);
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.match(p.el("summitFeedback").textContent,/Can it charge/);
  p.el("summitChoice1").click();
  assert.equal(saved(p).rescueProgress.wrongAnswers,2);
  assert.equal(p.el("summitHint").hidden,false);
  assert.match(p.el("summitHint").textContent,/charges phones/);
  p.el("summitChoice0").click();p.el("summitChoice1").click();p.el("summitChoice0").click();
  assert.equal(saved(p).rescueProgress.wrongAnswers,4,"Wrong count capped");
  p.el("summitNextButton").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,0,"Wrong option never advances");
  p.el("summitChoice2").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,1);
  assert.equal(saved(p).rescueProgress.wrongAnswers,0);
  assert.equal(p.el("summitChoiceCards").hidden,true);
  assert.match(p.el("summitFeedback").textContent,/sacred cable/);
  p.el("summitChoice2").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,1,"Double tap cannot skip");
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.match(p.el("summitFeedback").textContent,/sacred cable/,"Acknowledgement resumes");
  p.el("summitNextButton").click();
  assert.equal(p.el("summitRoundTitle").textContent,"Recite the highest compliment");
  assert.equal(saved(p).rescueProgress.miniGameStage,1);
  assert.equal(p.el("summitHint").hidden,true,"Hint resets per round");
});
test("SP3.1 complete OFFICE-to-Summit path plays every approved ending line and summary",()=>{
  const p=toSummitAdmissions();
  for(const correctIndex of [2,1,2]){
    const before=saved(p).rescueProgress.miniGameStage;
    p.el("summitChoice"+correctIndex).click();
    assert.equal(saved(p).rescueProgress.miniGameStage,before+1);
    assert.equal(saved(p).route,"cult");
    assert.equal(p.el("summitNextButton").hidden,false);
    p.el("summitNextButton").click();
  }
  assert.equal(saved(p).rescueProgress.finished,true);
  assert.equal(saved(p).holidayPhase,"rescue-route-ending");
  assert.equal(p.el("summitEndingScene").hidden,false);
  assert.match(p.el("summitEndingLine").textContent,/what the hell are you doing/i);
  for(let i=0;i<7;i++)p.el("summitEndingNextButton").click();
  assert.equal(saved(p).rescueProgress.endingStep,7);
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-ending");
  assert.equal(saved(p).rescueProgress.endingStep,7);
  assert.match(p.el("summitEndingLine").textContent,/Come home/);
  const total=story().SMP_SUMMIT.ending.length;
  for(let i=7;i<total;i++)p.el("summitEndingNextButton").click();
  assert.equal(saved(p).rescueProgress.endingStep,total);
  assert.match(p.el("summitEndingLine").textContent,/HEAVEN WAS A PLACE ON EARTH/);
  p.el("summitEndingNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-ending-summary");
  assert.match(p.el("rescueSummaryHeading").textContent,/HEAVEN WAS A PLACE ON EARTH/);
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-ending-summary");
  p.el("rescueSummaryReplayButton").click();
  assert.equal(saved(p).holidayPhase,"wall");
  assert.equal(saved(p).wallDecision,null);
  assert.equal(Object.hasOwn(saved(p),"route"),false);
  assert.equal(Object.hasOwn(saved(p),"summitResponse"),false);
  assert.equal(Object.hasOwn(saved(p),"rescueProgress"),false);
});
test("SP3.1 Summit interactions stay isolated from the other routes after replay",()=>{
  const p=toSummitAdmissions();
  p.el("summitChoice2").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,1);
  p.el("rescueMiniGameReplayButton").click();
  assert.equal(saved(p).holidayPhase,"wall");
  assert.equal(Object.hasOwn(saved(p),"summitResponse"),false);
  p.el("summitNextButton").click();
  p.el("summitChoice2").click();
  assert.equal(saved(p).holidayPhase,"wall","Stale event handlers cannot advance a different scene");
  for(const route of ["detention","reassemble"]){
    const q=toHotelInvestigation(route);
    completeHotelIntro(q);
    q.el("hotel"+route[0].toUpperCase()+route.slice(1)+"Button").click();
    for(let i=0;i<6;i++)q.el("hotelFinishButton").click();
    const count=story().SMP_RESCUE_FRAMEWORK.routes[route].intro.length;
    for(let i=0;i<=count;i++)q.el("routeIntroNextButton").click();
    assert.equal(q.el("summitAdmissions").hidden,true);
    q.el("summitChoice2").click();
    assert.equal(saved(q).rescueProgress.miniGameStage,0);
    assert.equal(q.el("rescueEndingSummary").hidden,true);
    assert.equal(saved(q).route,route);
  }
});

function toDetentionPaperwork(){
  const p=toHotelInvestigation("detention");
  completeHotelIntro(p);
  p.el("hotelDetentionButton").click();
  for(let i=0;i<6;i++)p.el("hotelFinishButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-intro");
  const intro=story().SMP_RESCUE_FRAMEWORK.routes.detention.intro;
  for(let i=0;i<=intro.length;i++)p.el("routeIntroNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-minigame");
  assert.equal(saved(p).route,"detention");
  assert.equal(p.el("detentionPaperwork").hidden,false);
  return p;
}
function finishDetentionForms(p){
  p.el("detentionChoice1").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,1);
  p.el("detentionNextButton").click();
  p.el("detentionChoice2").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,2);
  p.el("detentionNextButton").click();
}
test("SP3.2 approved three fictional form steps, permit wording, ending lines and asset gate",()=>{
  const data=story().SMP_DETENTION;
  assert.equal(data.rounds.length,3);
  assert.deepEqual(Array.from(data.rounds,x=>x.options.find(o=>o.correct).id),
    ["retrieve","stationery","drink"]);
  for(const round of data.rounds){
    assert.equal(round.options.length,3);
    assert.equal(new Set(round.options.map(x=>x.id)).size,3);
    assert.match(round.hint,/Paul:/);
  }
  assert.equal(data.ending.length,14);
  assert.match(data.ending[0].text,/Why are you both/);
  assert.match(data.ending.at(-1).text,/frames his/);
  assert.equal(data.endCard,"ENDING B: DETAINED BY ADMINISTRATION");
  assert.equal(data.permitText,"APPROVED: ALL OF YOU PLEASE LEAVE");
  assert.ok(html.indexOf('src="./src/detention-data.js"')<html.indexOf('src="./src/game.js"'));
  assert.ok(read("scripts/build.mjs").includes('"src/detention-data.js"'));
  assert.ok(html.includes('id="detentionEndingScene"'));
  for(const id of ["detentionPaperwork","detentionChoice0","detentionChoice1","detentionChoice2",
    "detentionStampButton","detentionPermitButton","detentionFeedback","detentionNextButton",
    "detentionHint","detentionEndingLine","detentionEndingNextButton"])
    assert.ok(html.includes('id="'+id+'"'),id);
  assert.match(html,/draggable="true"/,"Mouse drag and drop remains optional");
  assert.match(css,/\.detention-cards \{display:grid;grid-template-columns:repeat\(3/);
  assert.match(css,/@media \(max-width:800px\) \{[\s\S]*?\.detention-cards \{grid-template-columns:1fr/);
  assert.match(css,/\.detention-card,#holidayScreen \.detention-stamp,[\s\S]*?min-height:65px/);
});
test("SP3.2 wrong choices are no-fail, Paul hints after two mistakes, progress survives Continue",()=>{
  const p=toDetentionPaperwork();
  p.el("detentionChoice0").click();
  assert.equal(saved(p).rescueProgress.wrongAnswers,1);
  assert.equal(saved(p).rescueProgress.miniGameStage,0);
  assert.equal(p.el("detentionHint").hidden,true);
  assert.match(p.el("detentionFeedback").textContent,/Form 99Z/);
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.match(p.el("detentionFeedback").textContent,/Form 99Z/);
  p.el("detentionChoice2").click();
  assert.equal(saved(p).rescueProgress.wrongAnswers,2);
  assert.equal(p.el("detentionHint").hidden,false);
  assert.match(p.el("detentionHint").textContent,/collect the bloke/);
  p.el("detentionChoice0").click();p.el("detentionChoice2").click();p.el("detentionChoice0").click();
  assert.equal(saved(p).rescueProgress.wrongAnswers,4,"Capped wrong answers");
  p.el("detentionNextButton").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,0,"Wrong answers never move stage");
  p.el("detentionChoice1").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,1);
  assert.equal(saved(p).rescueProgress.wrongAnswers,0);
  assert.equal(p.el("detentionChoiceCards").hidden,true);
  assert.match(p.el("detentionFeedback").textContent,/Reason accepted/);
  p.el("detentionChoice1").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,1,"No double completion");
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.match(p.el("detentionFeedback").textContent,/Reason accepted/);
  p.el("detentionNextButton").click();
  assert.match(p.el("detentionRoundTitle").textContent,/bear picture/);
  assert.equal(p.el("detentionHint").hidden,true,"Hints reset per stage");
});
test("SP3.2 final stamp is hidden until drink inspected and supports tap/select with save",()=>{
  const p=toDetentionPaperwork();
  finishDetentionForms(p);
  assert.equal(saved(p).rescueProgress.miniGameStage,2);
  assert.equal(p.el("detentionStampPanel").hidden,true);
  p.el("detentionPermitButton").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,2,"Cannot stamp before finding it");
  p.el("detentionChoice0").click();p.el("detentionChoice1").click();
  assert.equal(p.el("detentionHint").hidden,false);
  assert.match(p.el("detentionHint").textContent,/takeaway cup/);
  p.el("detentionChoice2").click();
  assert.equal(saved(p).detentionStampFound,true);
  assert.equal(p.el("detentionStampPanel").hidden,false);
  assert.equal(p.el("detentionChoiceCards").hidden,true);
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(p.el("detentionStampPanel").hidden,false,"Stamp discovery persists");
  p.el("detentionPermitButton").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,2,"Cannot use unselected stamp");
  p.el("detentionStampButton").click();
  assert.equal(saved(p).detentionStampSelected,true);
  assert.equal(p.el("detentionStampButton").dataset.selected,"true");
  p.el("homeButton").click();p.el("resumeButton").click();
  p.el("detentionPermitButton").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,3);
  assert.equal(saved(p).rescueProgress.finished,true);
  assert.match(p.el("detentionFeedback").textContent,/APPROVED: ALL OF YOU PLEASE LEAVE/);
  p.el("detentionPermitButton").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,3,"Repeated stamp is idempotent");
});
test("SP3.2 final stamp supports drag-to-permit with keyboard/touch tap fallback",()=>{
  const p=toDetentionPaperwork();
  finishDetentionForms(p);
  p.el("detentionChoice2").click();
  const transfer={value:"",setData(_type,value){this.value=value;},getData(){return this.value;}};
  p.el("detentionStampButton").events.dragstart({dataTransfer:transfer});
  assert.equal(transfer.value,"approved-stamp");
  let cancelled=0;
  p.el("detentionPermitButton").events.dragover({preventDefault(){cancelled++;}});
  p.el("detentionPermitButton").events.drop({preventDefault(){cancelled++;},dataTransfer:transfer});
  assert.equal(cancelled,2);
  assert.equal(saved(p).rescueProgress.finished,true);
  p.el("detentionNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-ending");
});
test("SP3.2 complete paperwork opens approved Ending B, persists mid-dialogue and replays",()=>{
  const p=toDetentionPaperwork();
  finishDetentionForms(p);
  p.el("detentionChoice2").click();
  p.el("detentionStampButton").click();
  p.el("detentionPermitButton").click();
  assert.equal(saved(p).rescueProgress.finished,true);
  p.el("detentionNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-ending");
  assert.equal(p.el("detentionEndingScene").hidden,false);
  assert.equal(p.el("summitEndingScene").hidden,true);
  assert.match(p.el("detentionEndingLine").textContent,/Why are you both/);
  for(let i=0;i<6;i++)p.el("detentionEndingNextButton").click();
  assert.equal(saved(p).rescueProgress.endingStep,6);
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).rescueProgress.endingStep,6);
  assert.match(p.el("detentionEndingLine").textContent,/You started the operation/);
  const total=story().SMP_DETENTION.ending.length;
  for(let i=6;i<total;i++)p.el("detentionEndingNextButton").click();
  assert.equal(saved(p).rescueProgress.endingStep,total);
  assert.match(p.el("detentionEndingLine").textContent,/DETAINED BY ADMINISTRATION/);
  p.el("detentionEndingNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-ending-summary");
  assert.equal(p.el("rescueSummaryHeading").textContent,"DETAINED BY ADMINISTRATION");
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-ending-summary");
  p.el("rescueSummaryReplayButton").click();
  assert.equal(saved(p).holidayPhase,"wall");
  assert.equal(saved(p).wallDecision,null);
  assert.equal(Object.hasOwn(saved(p),"route"),false);
  assert.equal(Object.hasOwn(saved(p),"rescueProgress"),false);
  assert.equal(Object.hasOwn(saved(p),"detentionStampFound"),false);
});
test("SP3.2 cannot activate paperwork or false ending on other committed routes",()=>{
  for(const route of ["cult","reassemble"]){
    const p=toHotelInvestigation(route);
    completeHotelIntro(p);
    p.el("hotel"+route[0].toUpperCase()+route.slice(1)+"Button").click();
    for(let i=0;i<6;i++)p.el("hotelFinishButton").click();
    const intro=story().SMP_RESCUE_FRAMEWORK.routes[route].intro;
    for(let i=0;i<=intro.length;i++)p.el("routeIntroNextButton").click();
    assert.equal(p.el("detentionPaperwork").hidden,true);
    p.el("detentionChoice1").click();
    p.el("detentionStampButton").click();
    p.el("detentionPermitButton").click();
    assert.equal(saved(p).route,route);
    assert.equal(saved(p).rescueProgress.miniGameStage,0);
    assert.equal(p.el("detentionEndingScene").hidden,true);
  }
});

function toAssemblyWorkshop(){
  const p=toHotelInvestigation("reassemble");
  completeHotelIntro(p);
  p.el("hotelReassembleButton").click();
  for(let i=0;i<6;i++)p.el("hotelFinishButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-intro");
  const lines=story().SMP_RESCUE_FRAMEWORK.routes.reassemble.intro;
  for(let i=0;i<=lines.length;i++)p.el("routeIntroNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-minigame");
  assert.equal(saved(p).route,"reassemble");
  assert.equal(p.el("reassembleWorkshop").hidden,false);
  return p;
}
test("SP3.3 approved cardboard puzzle, six named slots, comic extras and ending source",()=>{
  const data=story().SMP_REASSEMBLE;
  const ids=Array.from(data.parts,p=>p.id);
  assert.deepEqual(ids,["head","torso","left-arm","right-arm","left-leg","right-leg"]);
  assert.equal(data.decoys.length,7);
  assert.ok(Array.from(data.decoys,p=>p.id).includes("toaster"));
  assert.ok(Array.from(data.decoys,p=>p.id).includes("wifi-heart"));
  assert.equal(data.ending.length,15);
  assert.match(data.ending[0].text,/cardboard version/);
  assert.match(data.ending[11].text,/WHY/);
  assert.match(data.ending[12].text,/turning me off and on again/);
  assert.match(data.ending.at(-1).text,/Stephen walks away/);
  assert.equal(data.endCard,"ENDING C: SOME ASSEMBLY REQUIRED");
  assert.match(data.reaction("head","left-arm"),/handshake/);
  assert.match(data.reaction("toaster","torso"),/breakfast/);
  assert.ok(read("scripts/build.mjs").includes('"src/reassemble-data.js"'));
  assert.ok(html.indexOf('src="./src/reassemble-data.js"')<html.indexOf('src="./src/game.js"'));
  for(const id of ["reassembleWorkshop","assemblyPowerButton","assemblyProgress",
    "assemblyHint","assemblyFeedback","reassembleEndingScene","assemblyEndingLine"])
    assert.ok(html.includes('id="'+id+'"'),id);
  for(let i=0;i<13;i++)assert.ok(html.includes('id="assemblyPiece'+i+'"'));
  for(let i=0;i<6;i++)assert.ok(html.includes('id="assemblySlot'+i+'"'));
  assert.match(css,/\.assembly-layout \{display:grid;grid-template-columns:1\.1fr \.9fr/);
  assert.match(css,/\.assembly-piece,#holidayScreen \.assembly-slot \{[\s\S]*?min-height:50px/);
  assert.match(css,/@media \(max-width:800px\) \{[\s\S]*?\.assembly-layout \{grid-template-columns:1fr/);
  assert.match(html,/This is a <strong>foam-and-cardboard souvenir model<\/strong>/);
});
test("SP3.3 wrong foam pieces are never consumed, Paul hints and correct slot highlighted",()=>{
  const p=toAssemblyWorkshop();
  p.el("assemblyPowerButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-minigame");
  p.el("assemblySlot0").click();
  assert.match(p.el("assemblyFeedback").textContent,/Select a cardboard piece/);
  p.el("assemblyPiece10").click(); // toaster
  p.el("assemblySlot1").click();
  assert.match(p.el("assemblyFeedback").textContent,/breakfast/);
  assert.equal(saved(p).rescueProgress.wrongAnswers,1);
  p.el("assemblySlot1").click();
  assert.equal(saved(p).rescueProgress.wrongAnswers,2);
  assert.equal(p.el("assemblyHint").hidden,false);
  assert.match(p.el("assemblyHint").textContent,/Spare kidneys/);
  assert.equal(p.el("assemblyPiece10").disabled,false);
  p.el("assemblyPiece0").click();
  assert.equal(p.el("assemblyPiece0").dataset.selected,"true");
  assert.equal(p.el("assemblySlot0").dataset.hint,"true");
  p.el("assemblySlot2").click();
  assert.match(p.el("assemblyFeedback").textContent,/handshake/);
  assert.equal(saved(p).rescueProgress.miniGameStage,0);
  p.el("assemblySlot0").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,1);
  assert.equal(saved(p).rescueProgress.wrongAnswers,0);
  assert.equal(p.el("assemblyPiece0").disabled,true);
  assert.equal(p.el("assemblySlot0").disabled,true);
  assert.equal(p.el("assemblyHint").hidden,true);
  p.el("assemblyPiece0").click();p.el("assemblySlot0").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,1);
});
test("SP3.3 all six placements persist individually and POWER ON is an explicit gate",()=>{
  const p=toAssemblyWorkshop();
  p.el("assemblyPiece0").click();p.el("assemblySlot0").click();
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).rescueProgress.placedParts.length,1);
  assert.equal(p.el("assemblySlot0").disabled,true);
  for(let i=1;i<6;i++){
    p.el("assemblyPiece"+i).click();
    p.el("assemblySlot"+i).click();
    assert.equal(saved(p).rescueProgress.placedParts.length,i+1);
  }
  assert.equal(saved(p).rescueProgress.finished,true);
  assert.equal(p.el("assemblyPowerButton").hidden,false);
  assert.equal(p.el("reassembleEndingScene").hidden,true);
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(p.el("assemblyPowerButton").hidden,false);
  p.el("assemblyPowerButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-ending");
  assert.equal(saved(p).assemblyPowered,true);
  assert.equal(p.el("reassembleEndingScene").hidden,false);
  p.el("assemblyPowerButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-ending");
});
test("SP3.3 optional drag and drop plus keyboard/touch select-tap both use identical validation",()=>{
  const p=toAssemblyWorkshop();
  const transfer={value:"",setData(_type,value){this.value=value;},getData(){return this.value;}};
  p.el("assemblyPiece3").events.dragstart({dataTransfer:transfer});
  assert.equal(transfer.value,"right-arm");
  let prevented=0;
  p.el("assemblySlot3").events.dragover({preventDefault(){prevented++;}});
  p.el("assemblySlot3").events.drop({preventDefault(){prevented++;},dataTransfer:transfer});
  assert.equal(prevented,2);
  assert.equal(saved(p).rescueProgress.miniGameStage,1);
  assert.equal(saved(p).rescueProgress.placedParts[0],"right-arm");
  p.el("assemblyPiece4").click();p.el("assemblySlot4").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,2);
  p.el("assemblyPiece6").events.dragstart({dataTransfer:transfer}); // kidney
  p.el("assemblySlot2").events.drop({preventDefault(){},dataTransfer:transfer});
  assert.equal(saved(p).rescueProgress.miniGameStage,2,"Dragged decoy does not complete a slot");
  assert.equal(p.el("assemblyPiece6").disabled,false);
});
test("SP3.3 all Ending C dialogue beats save and replay without leaking mannequin state",()=>{
  const p=toAssemblyWorkshop();
  for(let i=0;i<6;i++){p.el("assemblyPiece"+i).click();p.el("assemblySlot"+i).click();}
  p.el("assemblyPowerButton").click();
  assert.match(p.el("assemblyEndingLine").textContent,/cardboard version/);
  for(let i=0;i<8;i++)p.el("assemblyEndingNextButton").click();
  assert.equal(saved(p).rescueProgress.endingStep,8);
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).rescueProgress.endingStep,8);
  assert.match(p.el("assemblyEndingLine").textContent,/translation was ambiguous/);
  const total=story().SMP_REASSEMBLE.ending.length;
  for(let i=8;i<total;i++)p.el("assemblyEndingNextButton").click();
  assert.equal(saved(p).rescueProgress.endingStep,total);
  assert.match(p.el("assemblyEndingLine").textContent,/SOME ASSEMBLY REQUIRED/);
  p.el("assemblyEndingNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-ending-summary");
  assert.equal(p.el("rescueSummaryHeading").textContent,"SOME ASSEMBLY REQUIRED");
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-ending-summary");
  p.el("rescueSummaryReplayButton").click();
  assert.equal(saved(p).holidayPhase,"wall");
  assert.equal(Object.hasOwn(saved(p),"assemblyPowered"),false);
  assert.equal(Object.hasOwn(saved(p),"assemblySelectedPart"),false);
  assert.equal(Object.hasOwn(saved(p),"rescueProgress"),false);
});
test("SP3.3 gate blocks unfinished and route-mismatched ending saves",()=>{
  const p=toAssemblyWorkshop();
  p.el("assemblyPiece0").click();p.el("assemblySlot0").click();
  let old=saved(p);
  old.holidayPhase="rescue-route-ending";
  old.assemblyPowered=true;
  p.stored.set("stephen-martin-game-sp1-save-v1",JSON.stringify(old));
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-minigame");
  assert.equal(p.el("reassembleEndingScene").hidden,true);
  old=saved(p);
  old.holidayPhase="rescue-ending-summary";
  old.rescueProgress={version:1,route:"detention",miniGameStage:3,finished:true};
  old.assemblyPowered=true;
  p.stored.set("stephen-martin-game-sp1-save-v1",JSON.stringify(old));
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-minigame");
  assert.equal(saved(p).rescueProgress.route,"reassemble");
  assert.equal(p.el("rescueEndingSummary").hidden,true);
  p.el("detentionNextButton").click();p.el("summitNextButton").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,0);
});

test("SP3.4 shared footer replaces the forest of Next/Replay buttons",()=>{
  for(const id of ["holidayPauseButton","holidayNextButton","holidayRouteButton",
    "holidayPlaybackStatus","homeButton"])assert.ok(html.includes('id="'+id+'"'),id);
  const hiddenInUnifiedBar=["wallReplayButton","palaceReplayButton",
    "hotelRouteReplayButton","rescueMiniGameReplayButton","rescueSummaryReplayButton",
    "rescueAlarmNextButton","routeIntroNextButton","summitEndingNextButton"];
  for(const id of hiddenInUnifiedBar)assert.match(css,new RegExp("#holidayScreen #"+id.replace(/[.*+?^$\\{}()|[\\]\\]/g,"\\$&")),
    "Legacy duplicate "+id+" is hidden in the unified footer layout");
  assert.match(css,/\.china-footer \{[\s\S]*?top:10px !important;right:10px !important/);
  assert.match(engine,/function scheduleHolidayAdvance\(/);
  assert.match(engine,/function holidayStoryStep\(/);
});
test("SP3.4 chapter two auto-advances dialogue but stops for Great Wall decisions",()=>{
  const p=preview();p.start();p.el("skipButton").click();
  assert.equal(saved(p).holidayPhase,"transition");
  assert.equal(p.timeouts.size,1);
  p.el("holidayPauseButton").click();
  assert.equal(p.timeouts.size,0,"Pause cancels existing holiday timer");
  assert.match(p.el("holidayPauseButton").textContent,/Play/);
  assert.equal(p.el("holidayNextButton").hidden,false,"Manual Next is always available");
  p.el("holidayNextButton").click();
  assert.equal(saved(p).holidayPhase,"wall");
  assert.equal(saved(p).wallStep,0);
  assert.equal(p.timeouts.size,0,"Manual mode does not create another timer");
  p.el("holidayPauseButton").click();
  assert.equal(p.timeouts.size,1);
  for(let i=0;i<story().SMP_CHINA_WALL.lines.length;i++)assert.equal(p.tick(),true);
  assert.equal(saved(p).wallStep,story().SMP_CHINA_WALL.lines.length);
  assert.equal(p.timeouts.size,0,"No auto selection of travel destination");
  assert.equal(p.el("holidayRouteButton").hidden,true);
  assert.equal(p.el("holidayNextButton").hidden,true);
  p.el("wallAcceptButton").click();
  assert.equal(p.el("holidayRouteButton").hidden,false);
  assert.equal(p.timeouts.size,1,"Safe handoff resumes after user's selection");
  p.el("holidayRouteButton").click();
  assert.equal(saved(p).holidayPhase,"wall");
  assert.equal(saved(p).wallDecision,null);
  assert.equal(p.el("wallChoices").hidden,false);
  assert.equal(p.el("holidayRouteButton").hidden,true);
  assert.equal(p.timeouts.size,0);
});
test("SP3.4 auto-progresses cinematic cards and pauses for hotel clues and puzzle input",()=>{
  const p=toWallChoice();
  p.el("wallAcceptButton").click();
  assert.equal(p.tick(),true);
  assert.equal(saved(p).holidayPhase,"route-handoff");
  assert.equal(p.tick(),true);
  assert.equal(saved(p).holidayPhase,"final-message");
  for(let i=0;i<3;i++)assert.equal(p.tick(),true);
  assert.equal(saved(p).holidayPhase,"rescue-alarm");
  const lines=story().SMP_RESCUE_ALARM.lines.length;
  for(let i=0;i<=lines;i++)assert.equal(p.tick(),true);
  assert.equal(saved(p).holidayPhase,"rescue-travel");
  const montage=story().SMP_RESCUE_ALARM.montage.length;
  for(let i=0;i<montage;i++)assert.equal(p.tick(),true);
  assert.equal(saved(p).holidayPhase,"rescue-hub-arrival");
  assert.equal(p.tick(),true);
  assert.equal(saved(p).holidayPhase,"rescue-hotel");
  const arrival=story().SMP_RESCUE_HUB.opening.length;
  for(let i=0;i<arrival;i++)assert.equal(p.tick(),true);
  assert.equal(p.timeouts.size,0,"Hotel evidence and decision must be manual");
  assert.equal(p.el("rescueHotelHotspots").hidden,false);
  p.el("hotelCultButton").click();
  assert.equal(saved(p).hubMatched,true);
  assert.equal(p.timeouts.size,1,"Resolution dialogue now continues automatically");
});
test("SP3.4 pause, hidden-tab and route choice guard do not advance puzzle",()=>{
  const p=toSummitAdmissions();
  assert.equal(p.timeouts.size,0,"Unanswered admission test never advances");
  p.el("summitChoice2").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,1);
  assert.equal(p.timeouts.size,1,"Correct joke response advances after reading");
  p.document.hidden=true;
  p.listeners.get("visibilitychange")();
  assert.equal(p.timeouts.size,0);
  assert.match(p.el("holidayPauseButton").textContent,/Play/);
  p.document.hidden=false;
  assert.equal(p.timeouts.size,0,"Return from hidden tab never skips a line");
  p.el("holidayNextButton").click();
  assert.equal(saved(p).summitVoiceStep,1,"Paused Next advances to the second speaker");
  p.el("holidayNextButton").click();
  assert.equal(saved(p).summitVoiceStep,null,"Paused Next skips the second speaker");
  p.el("holidayNextButton").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,1);
  assert.equal(p.el("summitRoundTitle").textContent,"Recite the highest compliment");
  assert.equal(p.timeouts.size,0,"Remains paused until Play is explicitly pressed");
  p.el("summitChoice0").click();
  assert.equal(saved(p).rescueProgress.miniGameStage,1);
  assert.equal(p.timeouts.size,0);
});

test("SP3.4 all three fully-earned finales autoplay their lines but stop at summary",()=>{
  const cases=[
    {route:"cult",make:()=>{
      const p=toSummitAdmissions();
      for(const index of [2,1,2]){
        p.el("summitChoice"+index).click();
        for(let line=0;line<3;line++)
          assert.equal(p.tick(),true,"Each correct answer speaks two actors before advancing");
      }
      return p;
    },lines:story().SMP_SUMMIT.ending.length},
    {route:"detention",make:()=>{
      const p=toDetentionPaperwork();
      finishDetentionForms(p);
      p.el("detentionChoice2").click();
      p.el("detentionStampButton").click();
      p.el("detentionPermitButton").click();
      p.el("detentionNextButton").click();
      return p;
    },lines:story().SMP_DETENTION.ending.length},
    {route:"reassemble",make:()=>{
      const p=toAssemblyWorkshop();
      for(let i=0;i<6;i++){
        p.el("assemblyPiece"+i).click();
        p.el("assemblySlot"+i).click();
      }
      assert.equal(saved(p).assemblyPowered,undefined,"POWER ON must remain a manual choice");
      if(p.timeouts.size) p.tick(); // Complete Paul\'s harmless spoken fit acknowledgement.
      assert.equal(saved(p).assemblyPowered,undefined,"Voice completion cannot turn on cardboard Stephen");
      p.el("assemblyPowerButton").click();
      return p;
    },lines:story().SMP_REASSEMBLE.ending.length}
  ];
  for(const c of cases){
    const p=c.make();
    assert.equal(saved(p).route,c.route);
    assert.equal(saved(p).holidayPhase,"rescue-route-ending");
    for(let i=0;i<=c.lines;i++)assert.equal(p.tick(),true,"Ending "+c.route+" should autoplay beat "+i);
    assert.equal(saved(p).holidayPhase,"rescue-ending-summary");
    assert.equal(p.timeouts.size,0,"Summary waits for player; never auto-replays");
    assert.equal(p.el("holidayRouteButton").hidden,false);
    assert.match(p.el("holidayRouteButton").textContent,/Play another ending/);
    p.el("holidayRouteButton").click();
    assert.equal(saved(p).holidayPhase,"wall");
    assert.equal(saved(p).wallDecision,null);
    assert.equal(Object.hasOwn(saved(p),"route"),false);
  }
});


test("SP4.0A Summit entrance art is route-scoped, materialised and build-packaged",()=>{
  const manifest=JSON.parse(read("generated-assets/manifests/game-sp40a-summit-entrance-v01.json"));
  assert.equal(manifest.source.provider,"google-drive");
  assert.equal(manifest.expectedSourceName,"summit-entrance-background-v01.png");
  assert.equal(manifest.destination,"public/assets/generated/locations/summit-entrance-v01.webp");
  assert.ok(read("scripts/build.mjs").includes('"public/assets/generated/locations/summit-entrance-v01.webp"'));
  assert.match(css,/#rescueRouteIntro\[data-route="cult"\] \.rescue-route-intro-stage/);
  assert.match(css,/#rescueMiniGameScene:has\(#summitAdmissions:not\(\[hidden\]\)\) \.rescue-route-intro-stage/);
  assert.equal(css.split('url("../public/assets/generated/locations/summit-entrance-v01.webp")').length,2);
  assert.doesNotMatch(css,/#summitEndingScene[^\n]*summit-entrance-v01\.webp/);
  const p=toHotelInvestigation("cult");
  completeHotelIntro(p);
  p.el("hotelCultButton").click();
  for(let i=0;i<6;i++)p.el("hotelFinishButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-intro");
  assert.equal(p.el("rescueRouteIntro").dataset.route,"cult");
  p.el("hotelRouteReplayButton").click();
  assert.equal(p.el("rescueRouteIntro").dataset.route,"other");
  const q=toHotelInvestigation("detention");
  completeHotelIntro(q);
  q.el("hotelDetentionButton").click();
  for(let i=0;i<6;i++)q.el("hotelFinishButton").click();
  assert.equal(q.el("rescueRouteIntro").dataset.route,"other");
});


test("SP4.0B three approved Summit PNGs become independent transparent WebP cutouts",()=>{
  const spriteFiles=[
    "summit-david-speaking-v01.webp",
    "summit-paul-wary-v01.webp",
    "summit-gatekeeper-v01.webp"
  ];
  for(const name of spriteFiles){
    const data=fs.readFileSync(path.join(root,"public/assets/generated/characters",name));
    assert.ok(data.length>10000,"Nonempty Summit cutout: "+name);
    assert.equal(data.toString("ascii",0,4),"RIFF");
    assert.equal(data.toString("ascii",12,16),"VP8X");
    assert.ok(data[20]&0x10,"Must retain alpha: "+name);
    assert.ok(read("scripts/build.mjs").includes('"'+name+'"'));
    assert.ok(html.includes("public/assets/generated/characters/"+name));
  }
  for(const name of ["david-speaking","paul-wary","gatekeeper"]){
    const j=JSON.parse(read("generated-assets/manifests/game-sp40b-summit-"+name+"-v01.json"));
    assert.equal(j.source.provider,"google-drive");
    assert.match(j.destination,/\/characters\/summit-/);
    assert.ok(j.expectedSourceName.endsWith(".png"));
  }
  assert.match(html,/id="summitEntranceDavid"/);
  assert.match(html,/id="summitEntrancePaul"/);
  assert.match(html,/id="summitEntranceGatekeeper"/);
  assert.match(css,/#rescueRouteIntro\[data-route="cult"\] \.rescue-travel-panel/);
  assert.match(css,/#rescueRouteIntro\[data-route="cult"\] \.rescue-intro-dialogue/);
  assert.match(css,/#rescueRouteIntro\[data-route="cult"\] \.summit-entrance-gatekeeper/);
  assert.match(css,/#rescueRouteIntro \.(?:summit-entrance-label|summit-entrance-actor)/);
  assert.match(css,/@media \(max-width:450px\) \{/);
  assert.doesNotMatch(html,/id="summitEndingScene"[^>]*summit-entrance-(?:david|paul|gatekeeper)/);
});

test("SP4.0B Summit briefing uses lower dialogue and highlights the correct speaker, then shows puzzle panel",()=>{
  const p=toHotelInvestigation("cult");
  completeHotelIntro(p);
  p.el("hotelCultButton").click();
  for(let i=0;i<6;i++)p.el("hotelFinishButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-intro");
  assert.equal(p.el("rescueRouteIntro").dataset.route,"cult");
  const intro=story().SMP_RESCUE_FRAMEWORK.routes.cult.intro;
  for(let i=0;i<intro.length;i++){
    assert.equal(p.el("routeIntroLine").textContent,intro[i].text);
    assert.equal(p.el("rescueRouteIntro").dataset.speaker,intro[i].speaker.toLowerCase());
    assert.equal(p.el("routeIntroDialogue").hidden,false);
    p.el("routeIntroNextButton").click();
  }
  assert.equal(p.el("routeIntroDialogue").hidden,true);
  assert.match(p.el("routeIntroStatus").textContent,/Approach complete · The Summit Admissions Test next/);
  p.el("routeIntroNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-minigame");
  assert.equal(p.el("summitAdmissions").hidden,false);
  assert.equal(p.el("summitRoundTitle").textContent,"Offer a sacred object");
  assert.equal(p.el("summitEndingScene").hidden,true);
});

test("SP4.0B Summit foreground cast remains hidden on detention and spa briefings",()=>{
  for(const route of ["detention","reassemble"]){
    const p=toHotelInvestigation(route);
    completeHotelIntro(p);
    p.el("hotel"+route[0].toUpperCase()+route.slice(1)+"Button").click();
    for(let i=0;i<6;i++)p.el("hotelFinishButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-route-intro");
    assert.equal(p.el("rescueRouteIntro").dataset.route,route === "reassemble" ? "reassemble" : "other");
    assert.equal(p.el("rescueRouteIntro").dataset.speaker,route === "detention" ? "official" : "david",
      "Only the actor belonging to the current route may be highlighted");
    assert.equal(p.el("routeIntroDialogue").hidden,false);
  }
});


test("SP4.0B revised Summit arrangement uses mirrored small transparent sprites at every breakpoint",()=>{
  // Flip each sprite rather than regenerating approved David, Paul and gatekeeper.
  // Never mirror the background, editable text, or persistent story toolbar.
  const summitCss=css.slice(css.indexOf("/* SP4.0B — Owner-approved Summit entrance cast"));
  assert.ok(summitCss.includes("transform:scaleX(-1);transform-origin:center bottom;"));
  const selector=label=>'#holidayScreen #rescueRouteIntro[data-route="cult"] .summit-entrance-'+label;
  const block=(source,label)=>{
    const search=selector(label)+" {";
    const start=source.indexOf(search);
    assert.notEqual(start,-1,"Missing "+label+" sprite CSS");
    return source.slice(start,source.indexOf("}",start)+1);
  };
  const desktop=summitCss.split("@media (max-width:800px)")[0];
  const tablet=summitCss.split("@media (max-width:800px)")[1].split("@media (max-width:450px)")[0];
  const mobile=summitCss.split("@media (max-width:450px)")[1];
  for(const part of [desktop,tablet,mobile]){
    const guard=block(part,"gatekeeper"),paul=block(part,"paul"),david=block(part,"david");
    assert.match(guard,/left:[\d.-]+%;right:auto/,"Guard stands at left");
    assert.match(paul,/left:auto;right:[\d.-]+%/,"Paul stands on right side");
    assert.match(david,/left:auto;right:[\d.-]+%/,"David stands on far right");
    const h=label=>Number(block(part,label).match(/height:(\d+)%/)[1]);
    assert.ok(h("gatekeeper")<=48 && h("david")<=48 && h("paul")<=40,
      "Characters deliberately smaller than original hotel-sized first staging");
    assert.ok(h("paul")<h("david"),"Paul smaller in distance/perspective");
    const paulR=Number(paul.match(/right:([\d.-]+)%/)[1]);
    const davidR=Number(david.match(/right:([\d.-]+)%/)[1]);
    assert.ok(paulR>davidR,"Paul nearer centre, David far right");
  }
  assert.match(summitCss,/data-speaker="david"/);
  assert.match(summitCss,/data-speaker="paul"/);
  assert.match(summitCss,/data-speaker="gatekeeper"/);
  assert.match(summitCss,/#routeIntroDialogue\[hidden\]/);
  assert.doesNotMatch(summitCss,/#summitAdmissions[^\n]*transform:scaleX/);
});


test("SP4.0C approved throne and Stephen sprite are separate, packaged and transparency-safe",()=>{
  const background="summit-throne-room-v01.webp";
  const sprite="summit-stephen-seated-chairman-v02.webp";
  const room=fs.readFileSync(path.join(root,"public/assets/generated/locations",background));
  const person=fs.readFileSync(path.join(root,"public/assets/generated/characters",sprite));
  assert.ok(room.length>50000,"Approved illustrated room present");
  assert.equal(room.toString("ascii",0,4),"RIFF");
  assert.equal(room.toString("ascii",8,12),"WEBP");
  assert.ok(person.length>30000,"Owner-approved Stephen present");
  assert.equal(person.toString("ascii",0,4),"RIFF");
  assert.equal(person.toString("ascii",12,16),"VP8X");
  assert.ok((person[20]&0x10)!==0,"Seated Stephen must preserve transparency");
  const bgManifest=JSON.parse(read("generated-assets/manifests/game-sp40c-summit-throne-room-v01.json"));
  const stephenManifest=JSON.parse(read("generated-assets/manifests/game-sp40c-summit-stephen-chairman-v02.json"));
  assert.equal(bgManifest.source.provider,"google-drive");
  assert.equal(stephenManifest.source.provider,"google-drive");
  assert.equal(bgManifest.destination,"public/assets/generated/locations/"+background);
  assert.equal(stephenManifest.destination,"public/assets/generated/characters/"+sprite);
  const build=read("scripts/build.mjs");
  assert.ok(build.includes('"public/assets/generated/locations/'+background+'"'));
  assert.ok(build.includes('"'+sprite+'"'));
  assert.ok(build.includes("Approved seated Stephen must preserve WebP alpha transparency"));
  assert.match(html,/id="summitThroneStephen"[^>]*summit-stephen-seated-chairman-v02\.webp/);
  assert.match(css,/#summitEndingScene \.summit-ending-stage \{/);
  assert.ok(css.includes('url("../public/assets/generated/locations/'+background+'")'));
  assert.ok(css.includes('#summitEndingScene .summit-throne-stephen'));
  assert.ok(css.includes('#summitEndingScene[data-speaker="stephen"] .summit-throne-stephen'));
  const scene=html.split('id="summitEndingScene"')[1].split('id="detentionEndingScene"')[0];
  assert.doesNotMatch(scene,/summitEntrance(?:David|Paul|Gatekeeper)/);
  assert.doesNotMatch(scene,/summit-chairman-sash/,"Do not overlay redundant chairman sash");
  assert.doesNotMatch(scene,/summit-art-note/,"No placeholder text in approved art scene");
  assert.match(css,/@media \(max-width:450px\) \{[\s\S]*?#summitEndingScene \.summit-throne-stephen/);
});

test("SP4.0C throne cutscene keeps all Ending A lines, speaker glow, autoplay and replay",()=>{
  const p=toSummitAdmissions();
  for(const correct of [2,1,2]){
    p.el("summitChoice"+correct).click();
    p.el("summitNextButton").click();
  }
  assert.equal(saved(p).holidayPhase,"rescue-route-ending");
  assert.equal(p.el("summitEndingScene").hidden,false);
  assert.equal(p.el("summitEndingSpeaker").textContent,"STEPHEN");
  assert.equal(p.el("summitEndingScene").dataset.speaker,"stephen");
  assert.match(p.el("summitEndingLine").textContent,/what the hell/i);
  assert.equal(p.el("summitThroneStephen").hidden,false);
  p.el("summitEndingNextButton").click();
  assert.equal(p.el("summitEndingSpeaker").textContent,"DAVID");
  assert.equal(p.el("summitEndingScene").dataset.speaker,"david");
  for(let i=1;i<story().SMP_SUMMIT.ending.length;i++)p.el("summitEndingNextButton").click();
  assert.equal(p.el("summitEndingSpeaker").textContent,"ENDING A");
  assert.equal(p.el("summitEndingScene").dataset.speaker,"");
  assert.match(p.el("summitEndingLine").textContent,/HEAVEN WAS A PLACE ON EARTH/);
  p.el("summitEndingNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-ending-summary");
  assert.equal(p.el("summitEndingScene").hidden,true);
  assert.equal(p.el("rescueSummaryHeading").textContent,"HEAVEN WAS A PLACE ON EARTH");
});


test("SP4.0C Stephen is sized for the background's raised throne at desktop/tablet/mobile widths",()=>{
  const part=css.slice(css.indexOf("/* GAME-SP4.0C — Owner-approved Summit throne"));
  const selector="#holidayScreen #summitEndingScene .summit-throne-stephen {";
  const readPlacement=source=>{
    const start=source.indexOf(selector);
    assert.notEqual(start,-1,"Seated Stephen placement missing");
    const block=source.slice(start,source.indexOf("}",start));
    const height=Number(block.match(/height:(\d+)%/)[1]);
    const bottom=Number(block.match(/bottom:(\d+)%/)[1]);
    return {height,bottom};
  };
  const desktop=readPlacement(part.split("@media (max-width:800px)")[0]);
  const tablet=readPlacement(part.split("@media (max-width:800px)")[1].split("@media (max-width:450px)")[0]);
  const mobile=readPlacement(part.split("@media (max-width:450px)")[1]);
  assert.deepEqual(desktop,{height:17,bottom:46});
  assert.deepEqual(tablet,{height:16,bottom:46});
  assert.deepEqual(mobile,{height:14,bottom:43});
  assert.ok(desktop.height<23,"Stephen reduced further after second owner screenshot");
  assert.ok(desktop.bottom>39,"Stephen raised onto chair rather than steps");
  assert.match(part,/transform:translateX\(-50%\)/,"Sprite stays centred on original throne");
  assert.match(part,/data-speaker="stephen"/,"Speaker highlight retained");
});


test("GAME-SP4.1G3F album cards, linked platforms and safe checkpoints are packaged",()=>{
  const build=read("scripts/build.mjs");
  for(const name of ["madness","tracklist"]){
    const filename="bls-stephen-martin-"+name+"-cover-v01.webp";
    const relative="public/assets/generated/game/"+filename;
    const b=fs.readFileSync(path.join(root,relative));
    assert.equal(b.toString("ascii",0,4),"RIFF");
    assert.equal(b.toString("ascii",8,12),"WEBP");
    assert.ok(build.includes('for(const name of ["madness","tracklist"])') &&
      build.includes('"public/assets/generated/game/bls-stephen-martin-"+name+"-cover-v01.webp"'),
      "Cloudflare must package both approved covers");
    const manifest=JSON.parse(read("generated-assets/manifests/game-sp41g3f-bls-"+name+"-cover-v01.json"));
    assert.equal(manifest.destination,relative);
    assert.equal(manifest.source.provider,"google-drive");
  }
  const albums=[
    ["martiin","Stephen Martiin","madness","3pplNTs1JPhcowaDVFu1kX","1892550046","OLAK5uy_lfcCREgMXnjHssdMy-I1xFi34VfEi4hvE"],
    ["martin","Stephen Martin","tracklist","1OGTtKaWAP3qNpqIiigcyQ","1860668056","OLAK5uy_lcQUOTNEoQdXQ6-n6XAk5j5OU8Rc3_Awk"]
  ];
  for(const [key,title,asset,spotify,apple,youtube] of albums){
    const start=html.indexOf('data-album="'+key+'"');
    assert.ok(start>0,"Missing "+title+" card");
    const card=html.slice(start,html.indexOf("</article>",start));
    assert.ok(card.includes("bls-stephen-martin-"+asset+"-cover-v01.webp"));
    assert.ok(card.includes('alt="'+title+' album cover"'));
    assert.ok(card.includes('>'+title+'</strong>'));
    assert.ok(card.includes(spotify)&&card.includes(apple)&&card.includes(youtube));
    assert.equal((card.match(/class="bls-platform-link /g)||[]).length,3);
    assert.equal((card.match(/target="_blank" rel="noopener noreferrer"/g)||[]).length,4);
    for(const site of ["Spotify","Apple Music","YouTube"]){
      assert.ok(card.includes("Listen to "+title+" on "+site));
    }
  }
  // Both Apple Music tiles must use the approved coloured icon, not the generic note SVG.
  assert.equal((html.match(/class="bls-apple-music-logo"/g)||[]).length,2);
  assert.equal(html.split("https://marketing.services.apple/mdsa/assets/storage/blobs/images/640a25ea26ab1a0007c2b3fd/en-us-large%401x.png").length-1,2);
  assert.doesNotMatch(html,/<a class="bls-platform-link bls-platform-apple"[^>]*><svg/);
  assert.match(css,/\.bls-platform-apple \.bls-apple-music-logo/);
  assert.doesNotMatch(css,/\.bls-platform-apple\s*\{[^}]*background:transparent/);
  assert.match(css,/\.bls-platform-link\s*\{[^}]*background:rgba\(255,255,255,\.13\);[^}]*border:1px solid/);
  assert.doesNotMatch(html,/id="blsAlbumLightbox"/);
  assert.doesNotMatch(engine,/blsAlbumLightbox|openAlbumPreview/);
  assert.match(css,/top:12%;right:3%;bottom:auto/);
  assert.match(css,/top:auto;left:5%;right:5%;bottom:15%/);
  assert.match(html,/id="rescueSummaryJumpSelect"/);
  assert.match(html,/value="hotel"/);
  assert.match(engine,/function jumpFromEnding/);
  assert.match(engine,/state\.hubMatched = false/);
  assert.match(engine,/rescueFramework\.fresh\(state\.route\)/);
});
test("GAME-SP4.1G3E approved crowned Steve finale appears only after fourteen Ending A lines",()=>{
  const filename="ending-a-finale-stephen-crowned-wink-v01.webp";
  const asset="public/assets/generated/locations/"+filename;
  const bytes=fs.readFileSync(path.join(root,asset));
  assert.ok(bytes.length>25000,"Owner-approved image must be materialised");
  assert.equal(bytes.toString("ascii",0,4),"RIFF");
  assert.equal(bytes.toString("ascii",8,12),"WEBP");
  const manifest=JSON.parse(read("generated-assets/manifests/game-sp41g3e-ending-a-finale-stephen-crowned-wink-v01.json"));
  assert.equal(manifest.source.provider,"google-drive");
  assert.equal(manifest.expectedSourceName,"ending-a-finale-stephen-crowned-wink-v01.png");
  assert.equal(manifest.destination,asset);
  assert.ok(manifest.source.fileId,"Original image is tracked to approved Drive staging");
  assert.ok(read("scripts/build.mjs").includes('"'+asset+'"'),"Cloudflare packages the approved finale WebP");
  assert.ok(css.includes('#summitEndingScene[data-finale="true"] .summit-ending-stage'));
  assert.ok(css.includes('#rescueEndingSummary[data-route="cult"] .rescue-route-intro-stage'));
  assert.ok(css.includes('url("../'+asset+'")'),"Both end card and summary use the approved image");
  assert.ok(css.includes('#summitEndingScene[data-finale="true"] .summit-throne-actor'));
  assert.ok(css.includes('#rescueEndingSummary[data-route="cult"] .rescue-travel-panel'));
  assert.ok(css.includes('max-height:43%'),"Mobile summary text can fit without masking Steve's face");
  const p=toSummitAdmissions();
  for(const correct of [2,1,2]){
    p.el("summitChoice"+correct).click();
    p.el("summitNextButton").click();
  }
  assert.equal(saved(p).holidayPhase,"rescue-route-ending");
  assert.equal(p.el("summitEndingScene").dataset.finale,"false","Dialogue scene remains the approved throne");
  for(let i=0;i<story().SMP_SUMMIT.ending.length;i++){
    assert.equal(p.el("summitEndingScene").dataset.finale,"false","No portrait before finishing spoken line "+(i+1));
    p.el("summitEndingNextButton").click();
  }
  assert.equal(p.el("summitEndingScene").dataset.finale,"true","Final card reveals crowned Steve");
  assert.equal(p.el("summitEndingSpeaker").textContent,"ENDING A");
  assert.equal(p.el("summitEndingLine").textContent,story().SMP_SUMMIT.endCard);
  p.el("summitEndingNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-ending-summary");
  assert.equal(p.el("rescueEndingSummary").dataset.route,"cult");
  assert.equal(p.el("rescueSummaryHeading").textContent,"HEAVEN WAS A PLACE ON EARTH");
  assert.doesNotMatch(p.el("rescueSummaryDisclaimer").textContent,/deferred/i);
  p.el("rescueSummaryReplayButton").click();
  assert.equal(saved(p).holidayPhase,"wall","Existing replay still resets the route");
  assert.equal(p.el("rescueEndingSummary").hidden,true);
});

test("SP4.0C approved David-left and Paul-right actors are independently packaged and focused",()=>{
  const scenes=[
    {name:"david",asset:"summit-throne-david-confrontational-v01.webp",manifest:"game-sp40c-throne-david-v01.json",id:"summitThroneDavid"},
    {name:"paul",asset:"summit-throne-paul-astonished-v01.webp",manifest:"game-sp40c-throne-paul-v01.json",id:"summitThronePaul"}
  ];
  const build=read("scripts/build.mjs");
  for(const c of scenes){
    const img=fs.readFileSync(path.join(root,"public/assets/generated/characters",c.asset));
    assert.ok(img.length>10000,"Nonempty sprite "+c.name);
    assert.equal(img.toString("ascii",0,4),"RIFF");
    assert.equal(img.toString("ascii",12,16),"VP8X");
    assert.ok((img[20]&0x10)!==0,"Transparency preserved "+c.name);
    assert.ok(build.includes('"'+c.asset+'"'));
    const manifest=JSON.parse(read("generated-assets/manifests/"+c.manifest));
    assert.equal(manifest.source.provider,"google-drive");
    assert.equal(manifest.destination,"public/assets/generated/characters/"+c.asset);
    assert.ok(html.includes('id="'+c.id+'"'));
    assert.ok(html.includes('public/assets/generated/characters/'+c.asset));
    assert.ok(css.includes('.summit-throne-'+c.name+" {"));
    assert.ok(css.includes('[data-speaker="'+c.name+'"] .summit-throne-'+c.name));
  }
  const throneMarkup=html.split('id="summitEndingScene"')[1].split('id="detentionEndingScene"')[0];
  assert.ok(throneMarkup.indexOf("summitThroneDavid")<throneMarkup.indexOf("summit-ending-content"));
  assert.ok(throneMarkup.indexOf("summitThronePaul")<throneMarkup.indexOf("summit-ending-content"));
  const cssBlock=css.slice(css.indexOf("/* GAME-SP4.0C — Owner-approved Summit throne"));
  assert.match(cssBlock,/\.summit-throne-david \{\s*left:30%;bottom:33%;height:28%/);
  assert.match(cssBlock,/\.summit-throne-paul \{\s*right:29%;bottom:33%;height:27%/);
  assert.match(cssBlock,/@media \(max-width:800px\)/);
  assert.match(cssBlock,/@media \(max-width:450px\)/);
  assert.ok(cssBlock.includes('height:17%;width:auto;max-width:18%;'),"Stephen's approved desktop scale is unchanged");
  const p=toSummitAdmissions();
  for(const correct of [2,1,2]){p.el("summitChoice"+correct).click();p.el("summitNextButton").click();}
  assert.equal(saved(p).holidayPhase,"rescue-route-ending");
  assert.equal(p.el("summitEndingScene").dataset.speaker,"stephen");
  p.el("summitEndingNextButton").click();
  assert.equal(p.el("summitEndingScene").dataset.speaker,"david");
  p.el("summitEndingNextButton").click();
  assert.equal(p.el("summitEndingScene").dataset.speaker,"stephen");
  p.el("summitEndingNextButton").click();
  assert.equal(p.el("summitEndingScene").dataset.speaker,"paul");
});

test("SP4.0C stair-foot placement keeps David and Paul near throne and Stephen unchanged at each breakpoint",()=>{
 const stageCss=css.slice(css.indexOf("/* GAME-SP4.0C — Owner-approved Summit throne"));
 const parts=[
   {source:stageCss.split("@media (max-width:800px)")[0], left:30,right:29,bottom:33,davidH:28,paulH:27,stephenH:17},
   {source:stageCss.split("@media (max-width:800px)")[1].split("@media (max-width:450px)")[0],left:24,right:23,bottom:33,davidH:26,paulH:25,stephenH:16},
   {source:stageCss.split("@media (max-width:450px)")[1],left:12,right:12,bottom:33,davidH:22,paulH:22,stephenH:14}
 ];
 const rule=(source,name)=>{
   const key="#holidayScreen #summitEndingScene .summit-throne-"+name+" {";
   const start=source.indexOf(key);
   assert.notEqual(start,-1,"Missing "+name+" positioning rule");
   return source.slice(start,source.indexOf("}",start));
 };
 for(const p of parts){
   const david=rule(p.source,"david"),paul=rule(p.source,"paul"),stephen=rule(p.source,"stephen");
   assert.ok(david.includes("left:"+p.left+"%;bottom:"+p.bottom+"%;height:"+p.davidH+"%;"));
   assert.ok(paul.includes("right:"+p.right+"%;bottom:"+p.bottom+"%;height:"+p.paulH+"%;"));
   assert.ok(stephen.includes("height:"+p.stephenH+"%;"),"Approved Stephen scale unchanged");
 }
 assert.ok(stageCss.includes('[data-speaker="david"] .summit-throne-david'));
 assert.ok(stageCss.includes('[data-speaker="paul"] .summit-throne-paul'));
 assert.ok(stageCss.includes('[data-speaker="stephen"] .summit-throne-stephen'));
});


test("SP4.0C four approved attendants are independent alpha-transparent decorative actors",()=>{
  const actors=[
    ["fan","summitThroneAttendantFan"],
    ["tray","summitThroneAttendantTray"],
    ["ewer","summitThroneAttendantEwer"],
    ["towel","summitThroneAttendantTowel"]
  ];
  const scene=html.split('id="summitEndingScene"')[1].split('id="detentionEndingScene"')[0];
  const build=read("scripts/build.mjs");
  for(const [name,id] of actors){
    const basename="summit-throne-attendant-"+name+"-v01.webp";
    const src="public/assets/generated/characters/"+basename;
    const manifest=JSON.parse(read("generated-assets/manifests/game-sp40c-attendant-"+name+"-v01.json"));
    assert.equal(manifest.source.provider,"google-drive");
    assert.equal(manifest.destination,src);
    assert.equal(manifest.expectedSourceName,"summit-throne-attendant-"+name+"-v01.png");
    assert.ok(manifest.source.fileId,"Attendant provenance must be recorded");
    const bytes=fs.readFileSync(path.join(root,src));
    assert.ok(bytes.length>25000,"Approved attendant must be a full sprite "+name);
    assert.equal(bytes.toString("ascii",0,4),"RIFF");
    assert.equal(bytes.toString("ascii",12,16),"VP8X");
    assert.ok((bytes[20]&0x10)!==0,"Attendant keeps transparency "+name);
    assert.ok(build.includes('"'+basename+'"'),"Attendant is copied into deployed build "+name);
    assert.ok(scene.includes('id="'+id+'"'),"Actor remains within Summit ending only");
    assert.ok(scene.includes('src="./'+src+'"'));
    assert.ok(scene.includes('class="summit-throne-attendant summit-throne-attendant-'+name+'"'));
    assert.ok(css.includes('#holidayScreen #summitEndingScene .summit-throne-attendant-'+name+' {'));
  }
  assert.equal((scene.match(/class="summit-throne-attendant summit-throne-attendant-/g)||[]).length,4);
  assert.ok(css.includes('z-index:2;pointer-events:none;'),"Attendants never intercept player actions");
  assert.ok(css.includes('#holidayScreen #summitEndingScene .summit-ending-content {'),"Bottom captions remain separate");
  assert.ok(css.includes('#holidayScreen #summitEndingScene[data-speaker="stephen"] .summit-throne-stephen'));
  assert.ok(css.includes('#holidayScreen #summitEndingScene[data-speaker="david"] .summit-throne-david'));
  assert.ok(css.includes('[data-speaker="paul"] .summit-throne-paul'));
  assert.equal(css.includes('[data-speaker="fan"]'),false,"Attendants do not become dialogue speakers");
});

test("SP4.0C places larger standing pair forward and smaller kneeling pair at rear, at every breakpoint",()=>{
  const stageCss=css.slice(css.indexOf("/* GAME-SP4.0C — Owner-approved Summit throne"));
  const desktop=stageCss.split("@media (max-width:800px)")[0];
  const tablet=stageCss.split("@media (max-width:800px)")[1].split("@media (max-width:450px)")[0];
  const mobile=stageCss.split("@media (max-width:450px)")[1];
  const expectations=[
    {source:desktop,fan:"left:9%;bottom:29%;height:31%",tray:"left:auto;right:9%;bottom:29%;height:31%",ewer:"left:17%;right:auto;bottom:31%;height:22%",towel:"right:17%;bottom:31%;height:22%"},
    {source:tablet,fan:"left:7%;bottom:31%;height:29%",tray:"right:7%;bottom:31%;height:29%",ewer:"left:15%;bottom:33%;height:20%",towel:"right:15%;bottom:33%;height:20%"},
    {source:mobile,fan:"left:-1%;bottom:33%;height:24%",tray:"right:-1%;bottom:33%;height:24%",ewer:"left:8%;bottom:35%;height:17%",towel:"right:8%;bottom:35%;height:17%"}
  ];
  const rule=(text,name)=>{
    const key="#holidayScreen #summitEndingScene .summit-throne-attendant-"+name+" {";
    const index=text.indexOf(key);
    assert.ok(index>=0,"Attendant positioned at this breakpoint: "+name);
    return text.slice(index,text.indexOf("}",index));
  };
  for(const positions of expectations){
    for(const name of ["fan","tray","ewer","towel"]){
      assert.ok(rule(positions.source,name).includes(positions[name]),"Attendant placement: "+name);
    }
  }
  // Standing figures are taller and nearer, but set back from the stage lip.
  for(const pos of expectations){
    const numeric=(name,prop)=>Number(pos[name].match(new RegExp(prop+":(-?\\d+)%"))[1]);
    assert.ok(numeric("fan","height")>numeric("ewer","height"),"Standing left sprite is larger");
    assert.ok(numeric("tray","height")>numeric("towel","height"),"Standing right sprite is larger");
    assert.ok(numeric("fan","height")>=numeric("ewer","height")*1.35,"Kneeling actor must not look like a miniature");
    assert.ok(numeric("fan","height")<=numeric("ewer","height")*1.6,"G3D reduces excessive standing/kneeling scale difference");
    assert.ok(numeric("fan","bottom")<numeric("ewer","bottom"),"Standing left sprite is farther forward");
    assert.ok(numeric("tray","bottom")<numeric("towel","bottom"),"Standing right sprite is farther forward");
  }
  assert.ok(desktop.includes("left:50%;bottom:46%;height:17%;width:auto;max-width:18%;"),"Stephen retains approved placement");
  assert.ok(desktop.includes("left:30%;bottom:33%;height:28%;max-width:23%;"),"David retains foot-of-stairs placement");
  assert.ok(desktop.includes("right:29%;bottom:33%;height:27%;max-width:23%;"),"Paul retains foot-of-stairs placement");
});


test("SP4.0C right standing and kneeling attendants face inward via sprite-only mirroring",()=>{
  const stage=css.slice(css.indexOf("/* GAME-SP4.0C — Owner-approved Summit throne"));
  const desktop=stage.split("@media (max-width:800px)")[0];
  const block=name=>{
    const start=desktop.indexOf('#holidayScreen #summitEndingScene .summit-throne-attendant-'+name+' {');
    assert.ok(start>=0,"Expected independent attendant style "+name);
    return desktop.slice(start,desktop.indexOf("}",start));
  };
  const fan=block("fan"),tray=block("tray"),ewer=block("ewer"),towel=block("towel");
  assert.match(fan,/left:9%;bottom:29%;height:31%/,"Fan stands forward left");
  assert.match(tray,/right:9%;bottom:29%;height:31%/,"Tray stands forward right");
  assert.match(ewer,/left:17%;right:auto;bottom:31%;height:22%/,"Ewer kneels beside left standing attendant on marble");
  assert.match(towel,/right:17%;bottom:31%;height:22%/,"Towel kneels beside right standing attendant on marble");
  assert.doesNotMatch(fan,/scaleX\(-1\)/,"Left-standing fan faces centre without a flip");
  assert.doesNotMatch(ewer,/scaleX\(-1\)/,"Left-kneeling ewer faces centre without a flip");
  assert.match(tray,/transform:scaleX\(-1\);transform-origin:center bottom/,"Right-standing tray faces centre");
  assert.match(towel,/transform:scaleX\(-1\);transform-origin:center bottom/,"Right-kneeling towel faces centre");
  assert.doesNotMatch(block("fan"),/right:\d+%/,"Fan stays on left");
  assert.ok(desktop.includes('left:50%;bottom:46%;height:17%;width:auto;max-width:18%;'),"Approved Stephen scale stays");
  assert.ok(desktop.includes('left:30%;bottom:33%;height:28%;max-width:23%;'),"David unchanged");
  assert.ok(desktop.includes('right:29%;bottom:33%;height:27%;max-width:23%;'),"Paul unchanged");
});


test("GAME-SP4.1G3D symmetric kneeling performers read at believable scale and remain behind standing cast",()=>{
  const section=css.slice(css.indexOf("/* GAME-SP4.0C — Owner-approved Summit throne"));
  const all=[
    section.split("@media (max-width:800px)")[0],
    section.split("@media (max-width:800px)")[1].split("@media (max-width:450px)")[0],
    section.split("@media (max-width:450px)")[1]
  ];
  const getRule=(fragment,name)=>{
    const key="#holidayScreen #summitEndingScene .summit-throne-attendant-"+name+" {";
    const i=fragment.indexOf(key);
    assert.ok(i>=0,name+" must have a scoped placement");
    return fragment.slice(i,fragment.indexOf("}",i));
  };
  const coord=(style,key)=>{
    const m=style.match(new RegExp(key+":(-?\\d+)%"));
    assert.ok(m,key+" must be explicitly set");
    return Number(m[1]);
  };
  for(const [i,sectionPart] of all.entries()){
    const fan=getRule(sectionPart,"fan"),tray=getRule(sectionPart,"tray");
    const ewer=getRule(sectionPart,"ewer"),towel=getRule(sectionPart,"towel");
    assert.equal(coord(fan,"left"),coord(tray,"right"),"Standing pair balanced at breakpoint "+i);
    assert.equal(coord(ewer,"left"),coord(towel,"right"),"Kneeling pair balanced at breakpoint "+i);
    assert.equal(coord(ewer,"height"),coord(towel,"height"),"Kneeling pair match height at breakpoint "+i);
    assert.equal(coord(fan,"height"),coord(tray,"height"),"Standing pair match height at breakpoint "+i);
    const protagonists=[{david:28,paul:27},{david:26,paul:25},{david:22,paul:22}][i];
    assert.ok(coord(fan,"height")>protagonists.david && coord(tray,"height")>protagonists.paul,
      "Foreground standing attendants must read slightly larger than David and Paul");
    const expectedSizes=[{standing:31,kneeling:22},{standing:29,kneeling:20},{standing:24,kneeling:17}][i];
    assert.equal(coord(fan,"height"),expectedSizes.standing,"Attendant increase is controlled at breakpoint "+i);
    assert.equal(coord(ewer,"height"),expectedSizes.kneeling,"Kneeling increase is controlled at breakpoint "+i);
    assert.ok(coord(ewer,"height")>=Math.round(coord(fan,"height")*0.65),
      "Kneeling actors remain legible without miniature scaling at breakpoint "+i);
    assert.ok(coord(ewer,"bottom")>coord(fan,"bottom"),"Kneeling actors remain slightly behind in depth");
    assert.ok(coord(ewer,"bottom")-coord(fan,"bottom")<=2,
      "Kneeling figures' contact points must share the foreground floor plane");
    assert.ok(coord(ewer,"left")-coord(fan,"left")<=10,
      "Left pair must read as a group rather than scattered across the room");
    assert.ok(coord(towel,"right")-coord(tray,"right")<=10,
      "Right pair must read as a group rather than scattered across the room");
    if(i===0){
      assert.ok(ewer.includes("z-index:1;")&&towel.includes("z-index:1;"),
        "Rear kneeling pair is painted beneath standing attendants");
      assert.ok(tray.includes("transform:scaleX(-1);"),"Right standing attendant faces Stephen");
      assert.ok(towel.includes("transform:scaleX(-1);"),"Right kneeling attendant faces Stephen");
    }
  }
  const scene=html.split('id="summitEndingScene"')[1].split('id="detentionEndingScene"')[0];
  for(const id of ["summitThroneStephen","summitThroneDavid","summitThronePaul",
    "summitThroneAttendantFan","summitThroneAttendantTray","summitThroneAttendantEwer","summitThroneAttendantTowel"]){
    assert.ok(scene.includes('id="'+id+'"'),id+" remains independent and visible");
  }
  assert.ok(section.includes(".summit-throne-actor {")&&section.includes("z-index:3;pointer-events:none;"),"Protagonists remain in front");
  assert.ok(section.includes(".summit-ending-content {")&&section.includes("z-index:5;"),"Live subtitles stay above the cast");
  assert.ok(section.includes('data-speaker="stephen"'));
  assert.ok(section.includes('data-speaker="david"'));
  assert.ok(section.includes('data-speaker="paul"'));
  const subtitleFix=css.slice(css.indexOf("/* G3D: On shorter laptops"));
  assert.ok(subtitleFix.includes('#summitEndingScene .summit-ending-content.story-speech {'),
    "Speech correction stays scoped to the Summit ending");
  assert.ok(subtitleFix.includes("bottom:13%;height:auto;min-height:0;max-height:26% !important"),
    "Laptop caption and progress are lifted above overlapping action strip");
  assert.ok(subtitleFix.includes("bottom:15%;max-height:30% !important"),
    "Tablet dialogue keeps progress clear of the footer");
  assert.ok(subtitleFix.includes("bottom:18%;max-height:33% !important"),
    "Phone dialogue keeps progress clear of the footer");
  assert.ok(subtitleFix.includes("overflow-y:auto !important;overflow-x:hidden !important"),
    "Longer subtitles scroll internally instead of clipping behind footer");
  assert.equal(story().SMP_SUMMIT.ending.length,14,"All fourteen Ending A lines remain unchanged");
});

test("SP4.0D optimistic music cutaway plays up to 20 seconds and preserves full-track option",async()=>{
  const p=preview({audio:true});p.start();p.at("office.v07");
  assert.equal(p.el("officeSongActions").hidden,false);
  assert.match(p.el("songListenButton").textContent,/whole song/);
  const clip=p.voices.at(-1);
  assert.ok(clip.src.endsWith("/audio/songs/optimistic.mp3"));
  await Promise.resolve();
  assert.ok([...p.timeouts.values()].some(t=>t.delay===20000),"Preview has 20-second clock");
  p.el("songListenButton").click();
  assert.equal(p.voices.at(-1),clip,"Full optimistic play continues the same audio at its current position");
  assert.equal(p.el("songStopButton").hidden,false);
  assert.equal([...p.timeouts.values()].some(t=>t.delay===20000),false,"Full song is not cut off after 20 seconds");
  clip.finish();
  assert.equal(saved(p).beatId,"office.037","After the entire song, resume original story");
});

test("SP4.0D optimistic preview advances at twenty seconds, pause freezes it, and Next stops music",async()=>{
  const p=preview({audio:true});p.start();p.at("office.v07");
  const clip=p.voices.at(-1);
  await Promise.resolve();
  p.el("playPauseButton").click();
  assert.equal(clip.paused,true);
  assert.equal(p.timeouts.size,0);
  p.el("playPauseButton").click();
  await Promise.resolve();
  assert.ok([...p.timeouts.values()].some(t=>t.delay===20000));
  assert.equal(p.tick(),true);
  assert.equal(saved(p).beatId,"office.037");
  assert.equal(clip.paused,true);
  const q=preview({audio:true});q.start();q.at("office.v07");
  const second=q.voices.at(-1);
  q.el("nextButton").click();
  assert.equal(second.paused,true,"Manual Next never leaves the song playing");
});

test("SP4.0D pessimistic choice appears after post-mortem line and plays full song",async()=>{
  const p=preview({audio:true});p.start();p.at("office.039");
  assert.equal(p.el("officeSongOverlay").hidden,true,"Not offered at Stephen's question");
  p.at("office.041");
  assert.equal(p.el("officeSongOverlay").hidden,true,"Not offered before David finishes");
  const speaking=p.voices.at(-1);
  p.el("nextButton").click(); // End the post-mortem line manually.
  assert.equal(p.el("officeSongOverlay").hidden,false);
  assert.equal(p.el("officeSongOverlay").dataset.mode,"offer");
  assert.equal(p.el("officeSongLyricsScroll").hidden,false,"Both offers share the large accessible lyrics area");
  assert.match(p.el("officeSongLyrics").innerHTML,/Massive final orchestral chord/i);
  assert.match(p.el("songListenButton").textContent,/pessimistic version/);
  assert.equal(speaking.paused,true);
  p.el("songListenButton").click();
  const music=p.voices.at(-1);
  assert.ok(music.src.endsWith("/audio/songs/pessimistic.mp3"));
  assert.equal(p.el("officeSongLyricsScroll").hidden,false);
  assert.match(p.el("officeSongLyrics").innerHTML,/Massive final orchestral chord/i);
  await Promise.resolve();
  assert.equal(p.timeouts.size,0,"Full song holds story until it ends");
  music.finish();
  assert.equal(saved(p).beatId,"office.042","Post-mortem offer resumes after the next beat");
  const q=preview({audio:true});q.start();q.at("office.041");
  q.el("nextButton").click();
  q.el("songListenButton").click();
  q.el("songStopButton").click();
  assert.equal(saved(q).beatId,"office.042","Stopping the song also continues");
});

test("SP4.0D narrated post-mortem finishes before the seven-second song choice",async()=>{
  const p=preview({audio:true});p.start();p.at("office.041");
  await Promise.resolve();
  assert.equal(p.el("officeSongOverlay").hidden,true);
  p.voices.at(-1).finish();
  assert.equal(p.el("officeSongOverlay").hidden,true,"Voice finished but prompt waits for gap");
  assert.ok([...p.timeouts.values()].some(t=>t.delay===400));
  p.tick();
  assert.equal(p.el("officeSongOverlay").hidden,false);
  assert.equal(p.el("songDeclineButton").hidden,false);
  assert.ok([...p.timeouts.values()].some(t=>t.delay===7000));
  p.el("playPauseButton").click();
  assert.equal(p.timeouts.size,0,"Offer can be paused");
  p.el("playPauseButton").click();
  assert.ok([...p.timeouts.values()].some(t=>t.delay===7000));
  p.tick();
  assert.equal(saved(p).beatId,"office.042","Non-selection automatically carries on");
  const q=preview({audio:true});q.start();q.at("office.041");
  q.el("nextButton").click();
  q.el("songDeclineButton").click();
  assert.equal(saved(q).beatId,"office.042","Decline button skips the choice immediately");
});

test("SP4.0D full user-supplied lyrics scroll against real playback progress",async()=>{
  const p=preview({audio:true});p.start();p.at("office.v07");
  assert.equal(p.el("officeSongOverlay").hidden,false);
  const panel=p.el("officeSongLyrics");
  assert.match(panel.innerHTML,/Ninety-seven per cent!/);
  assert.match(panel.innerHTML,/favourite shoes/);
  const clip=p.voices.at(-1);
  await Promise.resolve();
  clip.currentTime=10;clip.duration=120;
  clip.ontimeupdate();
  assert.equal(p.el("officeSongLyricsScroll").scrollTop,16,"First verse stays in view as audio begins");
  p.el("songListenButton").click();
  assert.equal(p.el("officeSongOverlay").dataset.mode,"full");
  assert.equal(p.voices.at(-1),clip,"Full track continues without seeking back");
  clip.currentTime=60;
  clip.ontimeupdate();
  assert.equal(p.el("officeSongLyricsScroll").scrollTop,300,"Full-song scrolling follows track progress");
  const q=preview({audio:true});q.start();q.at("office.041");
  q.el("nextButton").click();q.el("songListenButton").click();
  assert.match(q.el("officeSongLyrics").innerHTML,/tribute too!/);
  assert.match(q.el("officeSongLyrics").innerHTML,/Looks like noodles/);
  assert.match(q.el("officeSongLyrics").innerHTML,/RIDICULOUS KEY CHANGE/);
  assert.match(html,/id="officeSongOverlay"[\s\S]*id="songListenButton"/);
  assert.ok(html.indexOf('id="officeSongOverlay"')<html.indexOf('id="storyProgress"'),"Player belongs in the scene, not under the timeline");
});

test("SP4.0D missing song files fail gracefully, and hide/pause never advance music",async()=>{
  const p=preview({audio:true});p.start();p.at("office.v07");
  const song=p.voices.at(-1);
  song.fail();
  assert.match(p.el("songStatus").textContent,/unavailable/);
  assert.equal([...p.timeouts.values()].some(t=>t.delay===6000),true,"Missing MP3 reverts to existing visual duration");
  p.at("office.041");
  p.el("nextButton").click();
  p.el("songListenButton").click();
  const full=p.voices.at(-1);
  p.document.hidden=true;
  p.listeners.get("visibilitychange")();
  assert.equal(full.paused,true);
  assert.equal(p.timeouts.size,0);
  p.document.hidden=false;
  p.el("playPauseButton").click();
  await Promise.resolve();
  assert.equal(full.paused,false);
  p.el("sceneSoundButton").click();
  assert.equal(full.paused,true,"Sound Off silences optional tracks too");
});
test("SP4.0D build automatically packages only the two approved optional song filenames",()=>{
  const pack=read("scripts/build.mjs");
  assert.match(pack,/const songSource = "public\/assets\/audio\/songs"/);
  assert.match(pack,/new Set\(\["optimistic\.mp3", "pessimistic\.mp3"\]\)/);
  assert.match(pack,/copyFile\(original, path\.join\(output, songSource, filename\)\)/);
  assert.ok(fs.existsSync(path.join(root,"public/assets/audio/songs/README.md")));
  for(const id of ["officeSongOverlay","officeSongActions","songListenButton","songStopButton","songDeclineButton","officeSongLyrics","officeSongLyricsScroll","songStatus"])
    assert.ok(html.includes('id="'+id+'"'));
});


test("SP4.0D keeps reactions brief and printer cutaway readable",()=>{
  const durations={
    "office.v01":450,"office.v02":2600,"office.v03":400,"office.v04":2400,
    "office.v05":2300,"office.v06":450,"office.v08":1350,"office.v09":2000,
    "office.v10":450,"office.v11":2200
  };
  for(const [id,duration] of Object.entries(durations))
    assert.equal(all.find(beat=>beat.id===id).duration,duration,id+" timing");
  assert.equal(ids[ids.indexOf("office.v03")+1],"office.v04");
  assert.equal(all.find(beat=>beat.id==="office.v07").duration,6000,"Optimistic missing-song fallback unchanged");
  assert.equal(all.find(beat=>beat.id==="office.v12").duration,4400,"Title card remains intentional");
});

test("SP4.0D voice-to-printer transition removes redundant two-second pause",async()=>{
  const p=preview({audio:true});p.start();p.at("office.021");
  await Promise.resolve();
  p.voices.at(-1).finish();
  assert.equal([...p.timeouts.values()].at(-1).delay,100,"Short handoff from voice to reaction");
  p.tick();
  assert.equal(saved(p).beatId,"office.v03");
  assert.equal([...p.timeouts.values()].at(-1).delay,400,"Brief comic expression");
  p.tick();
  assert.equal(saved(p).beatId,"office.v04");
  assert.equal([...p.timeouts.values()].at(-1).delay,2400,"Static printer image retains the existing screen hold");
  assert.match(p.el("cutawayContent").innerHTML,/office-printer-bear-cutaway-v01\.webp/);
});

test("SP4.0D David expression scales are bottom-anchored to neutral",()=>{
  const start=css.indexOf("GAME-SP4.0D: optically register David");
  const chunk=css.slice(start,css.indexOf("#officeScreen .cast-seated .cast-actor.is-listening",start));
  assert.ok(start>0);
  assert.ok(chunk.includes("transform-origin: center bottom"));
  const values={confident:".93",serious:".96",frustrated:".92",shocked:".94","systems-expert":".94"};
  for(const [name,scale] of Object.entries(values)){
    assert.ok(chunk.includes('data-seated-sprite="'+name+'"'),name+" has a distinct placement");
    assert.ok(chunk.includes('transform: scale('+scale+') !important;'),name+" shrink factor");
  }
  assert.ok(!chunk.includes('data-seated-sprite="neutral"'),"Neutral sprite remains the visual baseline");
});

test("GAME-SP4.1G0B pessimistic lyrics advance faster and finish two seconds before the MP3 ends",async()=>{
  const p=preview({audio:true});p.start();p.at("office.041");
  p.el("nextButton").click();
  p.el("songListenButton").click();
  const clip=p.voices.at(-1);
  await Promise.resolve();
  clip.duration=120;
  clip.currentTime=0;clip.ontimeupdate();
  assert.equal(p.el("officeSongLyricsScroll").scrollTop,0,"First line starts in view");
  clip.currentTime=12;clip.ontimeupdate();
  const early=p.el("officeSongLyricsScroll").scrollTop;
  assert.ok(early>90&&early<160,"Pessimistic lyrics move ahead of the original slow progression");
  clip.currentTime=60;clip.ontimeupdate();
  const middle=p.el("officeSongLyricsScroll").scrollTop;
  assert.ok(middle>360&&middle<420,"Song advances past halfway during its middle verses");
  clip.currentTime=117;clip.ontimeupdate();
  assert.ok(p.el("officeSongLyricsScroll").scrollTop<600,"Scrolling has not ended prematurely");
  clip.currentTime=118;clip.ontimeupdate();
  assert.equal(p.el("officeSongLyricsScroll").scrollTop,600,"Final lyrics arrive two seconds before audio end");
  clip.currentTime=119.5;clip.ontimeupdate();
  assert.equal(p.el("officeSongLyricsScroll").scrollTop,600,"Final lyrics stay in view through instrumental");
  clip.currentTime=120;clip.ontimeupdate();
  assert.equal(p.el("officeSongLyricsScroll").scrollTop,600,"Final position is clamped");
});


test("SP4.0E owner-approved David laptop cutaway is wide, packaged and isolated to v02",()=>{
  const file="public/assets/generated/game/office-david-risk-cutaway-v01.webp";
  const manifest=JSON.parse(read("generated-assets/manifests/game-sp40e-office-david-risk-v01.json"));
  assert.equal(manifest.schemaVersion,1);
  assert.equal(manifest.source.provider,"google-drive");
  assert.equal(manifest.expectedSourceName,"office-david-risk-cutaway-v01.png");
  assert.equal(manifest.destination,file);
  assert.equal(manifest.transform.maxWidth,1672);
  assert.equal(manifest.transform.maxHeight,941);
  assert.equal(manifest.revision,1);
  const image=fs.readFileSync(path.join(root,file));
  assert.ok(image.length>50000&&image.length<2*1024*1024);
  assert.equal(image.toString("ascii",0,4),"RIFF");
  assert.equal(image.toString("ascii",8,12),"WEBP");
  assert.ok(read("scripts/build.mjs").includes('const approvedRiskCutaway = "'+file+'"'));
  const beat=all.find(b=>b.id==="office.v02");
  assert.equal(beat.visual,"risk");
  assert.equal(beat.duration,2600,"Existing scene pacing preserved");
  assert.ok(beat.text.includes("David turns his laptop towards them"));
  assert.match(engine,/risk: '<img class="cutaway-approved-art cutaway-approved-risk"/);
  assert.ok(engine.includes(file));
  assert.match(css,/#officeScreen \.stage\[data-cutaway="risk"\] \.cutaway-approved-risk/);
  assert.match(css,/aspect-ratio: 1672 \/ 941/);
  const p=preview();p.start();p.at("office.v02");
  assert.match(p.el("cutawayContent").innerHTML,/office-david-risk-cutaway-v01\.webp/);
  assert.match(p.el("cutawayContent").innerHTML,/alt="David’s laptop showing/);
  p.el("nextButton").click();
  assert.equal(saved(p).beatId,"office.006");
  assert.equal(p.el("cutawayPanel").hidden,true);
});


test("SP4.0E David laptop appears immediately after risk-assessment introduction",async()=>{
  const riskAt=ids.indexOf("office.v02");
  assert.equal(ids[riskAt-1],"office.005","David introduces the risk assessment immediately beforehand");
  assert.equal(ids[riskAt+1],"office.006","Stephen's 'You've done what?' follows the visual gag");
  assert.equal(ids[ids.indexOf("office.011")+1],"office.012",
    "The original delayed laptop placement is gone after Paul's meal-deal request");
  assert.equal(all[riskAt].duration,2600,"Approved hold time is unchanged");
  assert.equal(all.filter(beat=>beat.id==="office.v02").length,1,"Risk cutaway occurs exactly once");

  const manual=preview();manual.start();manual.at("office.005");
  manual.el("nextButton").click();
  assert.equal(saved(manual).beatId,"office.v02");
  assert.match(manual.el("cutawayContent").innerHTML,/office-david-risk-cutaway-v01.webp/);
  manual.el("nextButton").click();
  assert.equal(saved(manual).beatId,"office.006");
  manual.el("backButton").click();
  assert.equal(saved(manual).beatId,"office.v02","Back returns to the new cutaway position");

  const voiced=preview({audio:true});voiced.start();voiced.at("office.005");
  await Promise.resolve();
  voiced.voices.at(-1).finish();
  assert.ok([...voiced.timeouts.values()].some(t=>t.delay===100),
    "After David finishes, cut to the risk assessment without a long silent hold");
  voiced.tick();
  assert.equal(saved(voiced).beatId,"office.v02");
  assert.ok([...voiced.timeouts.values()].some(t=>t.delay===2600),
    "Full risk cutaway plays before Stephen answers");
});


test("SP4.0F approved office printer still is materialised, shown and isolated to the existing beat",()=>{
  const file="public/assets/generated/game/office-printer-bear-cutaway-v01.webp";
  const manifest=JSON.parse(read("generated-assets/manifests/game-sp40f-office-printer-bear-v01.json"));
  assert.equal(manifest.schemaVersion,1);
  assert.equal(manifest.source.provider,"google-drive");
  assert.equal(manifest.expectedSourceName,"office-printer-bear-cutaway-v01.png");
  assert.equal(manifest.destination,file);
  assert.equal(manifest.transform.maxWidth,1672);
  assert.equal(manifest.transform.maxHeight,941);
  assert.equal(manifest.revision,1);
  const bytes=fs.readFileSync(path.join(root,file));
  assert.ok(bytes.length>50000&&bytes.length<2*1024*1024);
  assert.equal(bytes.toString("ascii",0,4),"RIFF");
  assert.equal(bytes.toString("ascii",8,12),"WEBP");
  assert.ok(read("scripts/build.mjs").includes('const approvedPrinterCutaway = "'+file+'"'));
  const beat=all.find(x=>x.id==="office.v04");
  assert.equal(beat.type,"cutaway");
  assert.equal(beat.visual,"printer");
  assert.equal(beat.duration,2400,"Timing unchanged; animation comes later");
  assert.equal(ids[ids.indexOf("office.v04")-1],"office.v03");
  assert.equal(ids[ids.indexOf("office.v04")+1],"office.022");
  assert.match(engine,/printer: '<img class="cutaway-approved-art cutaway-approved-printer"/);
  assert.ok(engine.includes(file));
  assert.match(css,/#officeScreen \.stage\[data-cutaway="printer"\] \.cutaway-approved-printer/);
  assert.match(css,/aspect-ratio: 1672 \/ 941/);
  const p=preview();p.start();p.at("office.v04");
  assert.match(p.el("cutawayContent").innerHTML,/office-printer-bear-cutaway-v01\.webp/);
  assert.doesNotMatch(p.el("cutawayContent").innerHTML,/cutaway-output-sheet|cutaway-printer-body/);
  p.el("nextButton").click();
  assert.equal(saved(p).beatId,"office.022");
  assert.equal(p.el("cutawayPanel").hidden,true);
});


test("Chapter Two has exactly 25 unique stable MP3 IDs, including all branch replies",()=>{
  const c=story();
  const ids=[
    ...c.SMP_CHINA_WALL.lines, ...c.SMP_CHINA_PALACE.lines,
    ...c.SMP_CHINA_PALACE.acceptReply, ...c.SMP_CHINA_MARKET.lines
  ].map(b=>b.id).concat([
    c.SMP_CHINA_WALL.acceptReactionId,c.SMP_CHINA_WALL.declineReactionId,
    c.SMP_CHINA_PALACE.declineReplyId,c.SMP_CHINA_MARKET.acceptReactionId,
    c.SMP_CHINA_FINAL.stephenLastLineId
  ]);
  assert.equal(ids.length,25);
  assert.equal(new Set(ids).size,25);
  assert.ok(ids.every(id=>/^china\.[a-z]+\.[a-z0-9.-]+$/.test(id)));
  assert.ok(ids.includes("china.wall.accept-reaction"));
  assert.ok(ids.includes("china.wall.decline-reaction"));
  assert.ok(ids.includes("china.palace.accept.005"));
  assert.ok(ids.includes("china.palace.decline-reaction"));
  assert.ok(ids.includes("china.market.accept-reaction"));
  assert.ok(ids.includes("china.final.001"));
  assert.ok(read("scripts/build.mjs").includes("holidaySpokenIds.forEach(id => permitted.add(id +"));
  assert.ok(fs.existsSync(path.join(root,"docs/CHINA-VOICE-IMPORT.md")));
});

test("Great Wall recording owns scene timing and Play/Pause resumes the same MP3",async()=>{
  const p=preview({audio:true});p.start();
  p.el("skipButton").click();p.el("chinaStartButton").click();
  const first=p.voices.at(-1);
  assert.ok(first.src.endsWith("china.wall.001.mp3"));
  await Promise.resolve();
  assert.equal(p.timeouts.size,0,"No timed advance while holiday voice plays");
  p.el("holidayPauseButton").click();
  assert.equal(first.paused,true);
  assert.equal(p.timeouts.size,0);
  p.el("holidayPauseButton").click();
  await Promise.resolve();
  assert.equal(first.playCount,2,"Play resumes the existing MP3");
  first.finish();
  assert.equal(p.timeouts.size,1);
  assert.equal(Array.from(p.timeouts.values())[0].delay,260);
  p.tick();
  assert.equal(saved(p).wallStep,1);
  assert.equal(first.paused,true,"Next line releases prior voice");
  assert.ok(p.voices.at(-1).src.endsWith("china.wall.002.mp3"));
});

test("Missing holiday clip retains text timing; next clip still plays",async()=>{
  const p=preview({audio:true});p.start();p.el("skipButton").click();
  p.el("chinaStartButton").click();
  const first=p.voices.at(-1);
  await Promise.resolve();
  first.fail();
  assert.equal(p.timeouts.size,1,"Missing file gets text-timed fallback");
  assert.ok(Array.from(p.timeouts.values())[0].delay>260);
  p.tick();
  assert.equal(saved(p).wallStep,1);
  assert.ok(p.voices.at(-1).src.endsWith("china.wall.002.mp3"));
  p.el("sceneSoundButton").click();
  assert.equal(p.el("sceneSoundButton").textContent,"Sound: Off");
  assert.equal(p.voices.at(-1).paused,true);
  assert.equal(p.timeouts.size,1,"Muted holiday uses text timer");
});

test("Great Wall branches each resolve to separately named Stephen recordings",()=>{
  for(const [decision,expected] of [
    ["wallAcceptButton","china.wall.accept-reaction.mp3"],
    ["wallDeclineButton","china.wall.decline-reaction.mp3"]
  ]){
    const p=preview({audio:true});p.start();p.el("skipButton").click();p.el("chinaStartButton").click();
    for(let i=0;i<5;i++)p.el("wallNextButton").click();
    p.el(decision).click();
    assert.ok(p.voices.at(-1).src.endsWith(expected));
    assert.equal(saved(p).wallStep,5);
  }
});

test("Forbidden City branch recordings and Night Market files follow actual routes",()=>{
  const p=preview({audio:true});p.start();p.el("skipButton").click();p.el("chinaStartButton").click();
  for(let i=0;i<5;i++)p.el("wallNextButton").click();
  p.el("wallDeclineButton").click();p.el("wallGoPalaceButton").click();
  p.el("intermissionContinueButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("china.palace.001.mp3"));
  for(let i=0;i<4;i++)p.el("palaceNextButton").click();
  p.el("palaceAcceptButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("china.palace.accept.001.mp3"));
  for(let i=0;i<4;i++)p.el("palaceNextButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("china.palace.accept.005.mp3"));
  // Independently verify the decline path reaches market and its own voices.
  const p2=preview({audio:true});p2.start();p2.el("skipButton").click();p2.el("chinaStartButton").click();
  for(let i=0;i<5;i++)p2.el("wallNextButton").click();
  p2.el("wallDeclineButton").click();p2.el("wallGoPalaceButton").click();p2.el("intermissionContinueButton").click();
  for(let i=0;i<4;i++)p2.el("palaceNextButton").click();
  p2.el("palaceDeclineButton").click();
  assert.ok(p2.voices.at(-1).src.endsWith("china.palace.decline-reaction.mp3"));
  p2.el("palaceGoMarketButton").click();p2.el("intermissionContinueButton").click();
  assert.ok(p2.voices.at(-1).src.endsWith("china.market.001.mp3"));
  for(let i=0;i<6;i++)p2.el("marketNextButton").click();
  assert.ok(p2.voices.at(-1).src.endsWith("china.market.accept-reaction.mp3"));
  p2.el("marketGoIncidentButton").click();p2.el("handoffContinueButton").click();
  p2.el("chinaFinalNextButton").click();
  assert.ok(p2.voices.at(-1).src.endsWith("china.final.001.mp3"));
  const phoneClip=p2.voices.at(-1);
  p2.el("chinaFinalNextButton").click();
  assert.equal(phoneClip.paused,true,"Leaving Stephen's phone cancels his voice");
  assert.ok(p2.voices.at(-1).src.endsWith("transition.england.back.001.mp3"),
    "Back in England now uses the separate narrator rather than Stephen's voice");
});

test("SP4.0G approved phone cutaway shows group creation without messages",()=>{
  const file="public/assets/generated/game/office-phone-group-chat-cutaway-v01.webp";
  const manifest=JSON.parse(read("generated-assets/manifests/game-sp40g-office-phone-chat-v01.json"));
  assert.equal(manifest.schemaVersion,1);
  assert.equal(manifest.source.provider,"google-drive");
  assert.equal(manifest.expectedSourceName,"office-phone-group-chat-cutaway-v01.png");
  assert.equal(manifest.destination,file);
  assert.equal(manifest.transform.maxWidth,1672);
  assert.equal(manifest.transform.maxHeight,940);
  assert.equal(manifest.revision,2);
  const bytes=fs.readFileSync(path.join(root,file));
  assert.ok(bytes.length>50000&&bytes.length<2*1024*1024);
  assert.equal(bytes.toString("ascii",0,4),"RIFF");
  assert.equal(bytes.toString("ascii",8,12),"WEBP");
  assert.ok(read("scripts/build.mjs").includes('const approvedPhoneChatCutaway = "'+file+'"'));
  const beat=all.find(b=>b.id==="office.v05");
  assert.equal(beat.type,"cutaway");
  assert.equal(beat.visual,"chat");
  assert.equal(beat.duration,2300,"Existing 2.3s hold unchanged");
  assert.equal(ids[ids.indexOf("office.v05")-1],"office.027");
  assert.equal(ids[ids.indexOf("office.v05")+1],"office.028");
  assert.ok(beat.text.includes("Paul added David and Stephen to the group"));
  assert.ok(beat.text.includes("There are no chat messages"));
  assert.match(engine,/chat: '<img class="cutaway-approved-art cutaway-approved-chat"/);
  assert.ok(engine.includes(file));
  assert.match(css,/#officeScreen \.stage\[data-cutaway="chat"\] \.cutaway-approved-chat/);
  assert.match(css,/aspect-ratio: 1672 \/ 940/);
  const p=preview();p.start();p.at("office.v05");
  assert.match(p.el("cutawayContent").innerHTML,/office-phone-group-chat-cutaway-v01\.webp/);
  assert.doesNotMatch(p.el("cutawayContent").innerHTML,/phone-message|phone-avatars|cutaway-heading/);
  p.el("nextButton").click();
  assert.equal(saved(p).beatId,"office.028");
  assert.equal(p.el("cutawayPanel").hidden,true);
});


test("SP4.0H approved later phone still shows Stephen muting the group",()=>{
  const file="public/assets/generated/game/office-phone-group-muted-cutaway-v01.webp";
  const manifest=JSON.parse(read("generated-assets/manifests/game-sp40h-office-phone-muted-v01.json"));
  assert.equal(manifest.schemaVersion,1);
  assert.equal(manifest.source.provider,"google-drive");
  assert.equal(manifest.expectedSourceName,"office-phone-group-muted-cutaway-v01.png");
  assert.equal(manifest.destination,file);
  assert.equal(manifest.transform.maxWidth,1672);
  assert.equal(manifest.transform.maxHeight,940);
  assert.equal(manifest.revision,1);
  const bytes=fs.readFileSync(path.join(root,file));
  assert.ok(bytes.length>50000 && bytes.length<2*1024*1024);
  assert.equal(bytes.toString("ascii",0,4),"RIFF");
  assert.equal(bytes.toString("ascii",8,12),"WEBP");
  assert.ok(read("scripts/build.mjs").includes('const approvedMutedChatCutaway = "'+file+'"'));
  const beat=all.find(b=>b.id==="office.v09");
  assert.equal(beat.visual,"muted");
  assert.equal(beat.duration,2000,"Existing 2.0s phone notification hold unchanged");
  const firstChat=all.find(b=>b.id==="office.v05");
  assert.equal(firstChat.visual,"chat","Group creation still keeps its original cutaway");
  assert.equal(firstChat.duration,2300,"Original chat hold remains 2.3 seconds");
  assert.equal(ids[ids.indexOf("office.v09")-1],"office.v08");
  assert.equal(ids[ids.indexOf("office.v09")+1],"office.049");
  assert.ok(beat.text.includes("Stephen Martin has muted the group"));
  assert.match(engine,/muted: '<img class="cutaway-approved-art cutaway-approved-muted"/);
  assert.ok(engine.includes(file));
  assert.match(css,/#officeScreen \.stage\[data-cutaway="muted"\] \.cutaway-approved-muted/);
  assert.match(css,/aspect-ratio: 1672 \/ 940/);
  const p=preview();p.start();p.at("office.v09");
  assert.match(p.el("cutawayContent").innerHTML,/office-phone-group-muted-cutaway-v01\.webp/);
  assert.doesNotMatch(p.el("cutawayContent").innerHTML,/cutaway-notification|cutaway-heading/);
  p.el("nextButton").click();
  assert.equal(saved(p).beatId,"office.049");
  assert.equal(p.el("cutawayPanel").hidden,true);
});


// GAME-SP4 — natural-duration optional voice clips for the shared office alarm.
// Drive the shortest (Summit) route into the real Back in England scene.
function voicedRescueAlarm() {
  const p=preview({audio:true});
  p.start();p.el("skipButton").click();p.el("chinaStartButton").click();
  for(let i=0;i<5;i++)p.el("wallNextButton").click();
  p.el("wallAcceptButton").click();p.el("wallGoIncidentButton").click();
  p.el("handoffContinueButton").click();
  for(let i=0;i<3;i++)p.el("chinaFinalNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-alarm");
  return p;
}

test("Back in England has ten unique whitelisted voice IDs and no spoken travel cards",()=>{
  const alarm=story().SMP_RESCUE_ALARM;
  const ids=Array.from(alarm.lines,l=>l.id);
  assert.deepEqual(ids,Array.from({length:10},(_,i)=>"rescue.alarm."+String(i+1).padStart(3,"0")));
  assert.equal(new Set(ids).size,10);
  assert.ok(alarm.montage.every(card=>card.id.startsWith("rescue.travel.")));
  assert.ok(read("scripts/build.mjs").includes('alarmIds.forEach(id => permitted.add(id + ".mp3"))'));
  assert.ok(read("scripts/build.mjs").includes('permitted.size !== 254'),"Original ten alarm IDs remain included in expanded voice whitelist");
  assert.ok(fs.existsSync(path.join(root,"docs/RESCUE-ALARM-VOICE-IMPORT.md")));
});

test("Back in England automatically plays David then Paul, advancing only after each recording ends",async()=>{
  const p=voicedRescueAlarm();
  const david=p.voices.at(-1);
  assert.ok(david.src.endsWith("rescue.alarm.001.mp3"));
  await Promise.resolve();
  assert.equal(p.timeouts.size,0,"Voice duration controls autoplay, not subtitle timing");
  david.finish();
  assert.equal(p.timeouts.size,1);
  assert.equal(Array.from(p.timeouts.values())[0].delay,260);
  p.tick();
  assert.equal(saved(p).rescueAlarmStep,1);
  assert.equal(david.paused,true);
  assert.ok(p.voices.at(-1).src.endsWith("rescue.alarm.002.mp3"));
  assert.equal(p.el("rescueAlarmSpeaker").textContent,"PAUL");
});

test("Back in England Pause/Play resumes the same clip and Next cancels stale sound",async()=>{
  const p=voicedRescueAlarm();
  const first=p.voices.at(-1);
  await Promise.resolve();
  p.el("holidayPauseButton").click();
  assert.equal(first.paused,true);
  assert.equal(p.timeouts.size,0);
  p.el("holidayPauseButton").click();
  await Promise.resolve();
  assert.equal(first.playCount,2);
  p.el("holidayNextButton").click();
  assert.equal(saved(p).rescueAlarmStep,1);
  assert.equal(first.paused,true);
  first.finish();
  assert.equal(saved(p).rescueAlarmStep,1,"Old clip cannot advance a later line");
});

test("Back in England missing MP3 falls back to timed subtitles; other recordings still play",async()=>{
  const p=voicedRescueAlarm();
  await Promise.resolve();
  const first=p.voices.at(-1);
  first.fail();
  assert.equal(p.timeouts.size,1);
  assert.ok(Array.from(p.timeouts.values())[0].delay>=2600);
  p.tick();
  assert.equal(saved(p).rescueAlarmStep,1);
  assert.ok(p.voices.at(-1).src.endsWith("rescue.alarm.002.mp3"));
  p.el("sceneSoundButton").click();
  assert.equal(p.voices.at(-1).paused,true);
  assert.equal(p.timeouts.size,1,"Muted audio restores the old text timer");
});

test("All ten alarm files map in order; travel montage now uses optional narrator recordings",()=>{
  const p=voicedRescueAlarm();
  for(let i=0;i<10;i++){
    assert.ok(p.voices.at(-1).src.endsWith("rescue.alarm."+String(i+1).padStart(3,"0")+".mp3"));
    if(i===5)assert.equal(p.el("rescueAlarmPhone").hidden,false);
    p.el("rescueAlarmNextButton").click();
  }
  assert.equal(saved(p).rescueAlarmStep,10);
  const last=p.voices.at(-1);
  assert.equal(last.paused,true);
  const total=p.voices.length;
  p.el("rescueAlarmTravelButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-travel");
  p.el("rescueTravelNextButton").click();
  assert.equal(p.voices.length,total+2,"Two successive travel cards request two distinct narrator IDs");
  assert.ok(p.voices.at(-2).src.endsWith("transition.travel.001.mp3"));
  assert.ok(p.voices.at(-1).src.endsWith("transition.travel.002.mp3"));
});


// GAME-SP4 — full optional voiced Visitor Information dialogue, including
// incorrect deduction reactions and Paul's one-time route-specific clue.
function voicedHotel(route="cult") {
  const p=preview({audio:true});
  p.start();p.el("skipButton").click();p.el("chinaStartButton").click();
  for(let i=0;i<5;i++)p.el("wallNextButton").click();
  if(route==="cult"){
    p.el("wallAcceptButton").click();p.el("wallGoIncidentButton").click();
  }else if(route==="detention"){
    p.el("wallDeclineButton").click();p.el("wallGoPalaceButton").click();p.el("intermissionContinueButton").click();
    for(let i=0;i<4;i++)p.el("palaceNextButton").click();
    p.el("palaceAcceptButton").click();
    for(let i=0;i<5;i++)p.el("palaceNextButton").click();
    p.el("palaceGoIncidentButton").click();
  }else{
    p.el("wallDeclineButton").click();p.el("wallGoPalaceButton").click();p.el("intermissionContinueButton").click();
    for(let i=0;i<4;i++)p.el("palaceNextButton").click();
    p.el("palaceDeclineButton").click();p.el("palaceGoMarketButton").click();p.el("intermissionContinueButton").click();
    for(let i=0;i<6;i++)p.el("marketNextButton").click();
    p.el("marketGoIncidentButton").click();
  }
  p.el("handoffContinueButton").click();
  for(let i=0;i<3;i++)p.el("chinaFinalNextButton").click();
  for(let i=0;i<10;i++)p.el("rescueAlarmNextButton").click();
  p.el("rescueAlarmTravelButton").click();
  for(let i=0;i<4;i++)p.el("rescueTravelNextButton").click();
  p.el("rescueHubStartButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-hotel");
  return p;
}

test("Visitor Information 22 voice IDs match screenplay and automatic file whitelist",()=>{
  const h=story().SMP_RESCUE_HUB;
  const routes=["cult","detention","reassemble"];
  const ids=[
    ...Array.from(h.opening,l=>l.id),
    ...routes.flatMap(route=>Array.from(h.wrong[route],l=>l.id)),
    ...routes.map(route=>"rescue.hub.hint."+route),
    ...Array.from(h.correct,l=>l.id)
  ];
  assert.equal(ids.length,22);
  assert.equal(new Set(ids).size,22);
  assert.ok(ids.every(id=>/^rescue\.hub\.[a-z0-9.]+$/.test(id)));
  assert.equal(h.correct[4].id,"rescue.hub.correct.005");
  assert.ok(read("scripts/build.mjs").includes("hubVoiceIds.forEach(id => permitted.add(id +"));
  assert.ok(read("scripts/build.mjs").includes("permitted.size !== 254"));
  assert.ok(fs.existsSync(path.join(root,"docs/VISITOR-INFORMATION-VOICE-IMPORT.md")));
});

test("Visitor Information opens with David/Paul voices in order; evidence stays silent",async()=>{
  const p=voicedHotel("cult");
  const first=p.voices.at(-1);
  assert.ok(first.src.endsWith("rescue.hub.001.mp3"));
  await Promise.resolve();
  assert.equal(p.timeouts.size,0,"Actual MP3 duration owns timing");
  p.el("holidayPauseButton").click();
  assert.equal(first.paused,true);
  p.el("holidayPauseButton").click();
  await Promise.resolve();
  assert.equal(first.playCount,2);
  first.finish();p.tick();
  assert.equal(saved(p).hubIntroStep,1);
  assert.ok(p.voices.at(-1).src.endsWith("rescue.hub.002.mp3"));
  for(let i=1;i<8;i++)p.el("hotelNextButton").click();
  assert.equal(saved(p).hubIntroStep,8);
  const voices=p.voices.length;
  assert.equal(p.el("holidayNextButton").hidden,true);
  p.el("hotelPhoneButton").click();
  p.el("hotelEvidenceCloseButton").click();
  p.el("hotelBrochureButton").click();
  p.el("hotelEvidenceCloseButton").click();
  assert.equal(p.voices.length,voices,"Evidence is silent");
});

test("Wrong destination replies sequence, second wrong guess speaks actual-route hint once",()=>{
  const p=voicedHotel("cult");
  for(let i=0;i<8;i++)p.el("hotelNextButton").click();
  p.el("hotelDetentionButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("rescue.hub.wrong.detention.001.mp3"));
  p.el("holidayNextButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("rescue.hub.wrong.detention.002.mp3"));
  p.el("holidayNextButton").click();
  assert.equal(p.el("holidayNextButton").hidden,true);
  p.el("hotelReassembleButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("rescue.hub.wrong.reassemble.001.mp3"));
  p.el("holidayNextButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("rescue.hub.wrong.reassemble.002.mp3"));
  p.el("holidayNextButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("rescue.hub.hint.cult.mp3"));
  p.el("holidayNextButton").click();
  assert.equal(saved(p).hubVoiceHintHeard,true);
  assert.equal(p.el("holidayNextButton").hidden,true);
  p.el("hotelDetentionButton").click();
  p.el("holidayNextButton").click();p.el("holidayNextButton").click();
  assert.equal(p.el("holidayNextButton").hidden,true,"Hint only recorded once per investigation");
});

test("Correct Visitor Information deduction cuts off a wrong recording then plays all five",()=>{
  const p=voicedHotel("detention");
  for(let i=0;i<8;i++)p.el("hotelNextButton").click();
  p.el("hotelCultButton").click();
  const old=p.voices.at(-1);
  p.el("hotelDetentionButton").click();
  assert.equal(old.paused,true);
  assert.ok(p.voices.at(-1).src.endsWith("rescue.hub.correct.001.mp3"));
  for(let i=0;i<5;i++){
    assert.ok(p.voices.at(-1).src.endsWith("rescue.hub.correct."+String(i+1).padStart(3,"0")+".mp3"));
    p.el("hotelFinishButton").click();
  }
  assert.equal(saved(p).hubCorrectStep,5);
  assert.equal(p.voices.at(-1).paused,true);
  p.el("hotelFinishButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-intro");
});

test("Visitor Information missing MP3 falls back to subtitles and next line still speaks",async()=>{
  const p=voicedHotel("reassemble");
  const first=p.voices.at(-1);
  await Promise.resolve();
  first.fail();
  assert.equal(p.timeouts.size,1);
  assert.ok(Array.from(p.timeouts.values())[0].delay>=2600);
  p.tick();
  assert.equal(saved(p).hubIntroStep,1);
  assert.ok(p.voices.at(-1).src.endsWith("rescue.hub.002.mp3"));
});

test("GAME-SP4B: approved independent Ending B images are present in build and script",()=>{
  const images=[
    "public/assets/generated/locations/ending-b-bureau-office-v01.webp",
    "public/assets/generated/game/ending-b-puzzle-desk-v01.webp",
    "public/assets/generated/game/ending-b-bear-classification-v01.webp",
    "public/assets/generated/game/ending-b-pauls-takeaway-cup-master-v01.webp",
    "public/assets/generated/game/ending-b-pauls-takeaway-cup-alpha-v01.webp",
    "public/assets/generated/game/ending-b-approved-stamp-v01.webp",
    "public/assets/generated/game/ending-b-approved-ink-impression-v01.webp",
    "public/assets/generated/game/ending-b-release-permit-canonical-portrait-proof-v01.webp"
  ];
  const build=read("scripts/build.mjs");
  assert.ok(build.includes("const endingBImages = ["));
  for(const file of images){
    const data=fs.readFileSync(path.join(root,file));
    assert.ok(data.length>20000 && data.length<3*1024*1024,file);
    assert.equal(data.toString("ascii",0,4),"RIFF",file);
    assert.equal(data.toString("ascii",8,12),"WEBP",file);
    assert.ok(build.includes('"'+file+'"'),"Build needs "+file);
  }
  for(const file of images.filter(x=>/cup-alpha|approved-stamp|approved-ink-impression/.test(x))){
    const data=fs.readFileSync(path.join(root,file));
    assert.equal(data.toString("ascii",12,16),"VP8X",file);
    assert.ok((data[20]&0x10)!==0,"Independent prop must have genuine alpha: "+file);
  }
  assert.match(css,/rescueMiniGameScene\[data-route="detention"\]/);
  assert.match(css,/ending-b-bureau-office-v01\.webp/);
  assert.match(html,/id="detentionBearArtLink"/);
  assert.match(html,/id="detentionCupPreview"/);
  assert.match(html,/id="detentionApprovedPreview"/);
  assert.match(html,/id="detentionInkOnPermit"/);
  assert.match(html,/id="detentionStampButton"[^>]*draggable="true"/);
  assert.match(html,/ending-b-release-permit-canonical-portrait-proof-v01\.webp/);
  assert.match(html,/ending-b-approved-ink-impression-v01\.webp/);
  assert.match(html,/class="detention-ending-actor detention-ending-stephen"/);
});

test("GAME-SP4B: artwork follows stage and saved stamp state without changing answers",()=>{
  const p=toDetentionPaperwork();
  assert.equal(p.el("rescueMiniGameScene").dataset.route,"detention");
  assert.equal(p.el("detentionBearArtLink").hidden,true,"Not yet on bear classification");
  assert.equal(p.el("detentionCupPreview").hidden,true,"Cup is revealed in final form stage");
  p.el("detentionChoice1").click();p.el("detentionNextButton").click();
  assert.equal(p.el("detentionBearArtLink").hidden,false,"Show locked bear form only in stage two");
  assert.equal(p.el("detentionCupPreview").hidden,true);
  p.el("detentionChoice2").click();p.el("detentionNextButton").click();
  assert.equal(p.el("detentionBearArtLink").hidden,true);
  assert.equal(p.el("detentionCupPreview").hidden,false,"Show Paul's cup before discovery");
  p.el("detentionChoice2").click();
  assert.equal(saved(p).detentionStampFound,true);
  assert.equal(p.el("detentionCupPreview").hidden,true,"Cup moves once hidden stamp found");
  assert.equal(p.el("detentionStampPanel").hidden,false);
  assert.equal(p.el("detentionApprovedPreview").hidden,true);
  p.el("detentionStampButton").click();
  assert.equal(saved(p).detentionStampSelected,true);
  assert.equal(p.el("detentionStampButton").dataset.selected,"true");
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(p.el("detentionStampPanel").hidden,false,"Image interaction survives Continue");
  p.el("detentionPermitButton").click();
  assert.equal(saved(p).rescueProgress.finished,true);
  assert.equal(p.el("detentionApprovedPreview").hidden,false,"Impression appears on permit after success");
  assert.match(p.el("detentionPermitLabel").textContent,/ALL OF YOU PLEASE LEAVE/);
  p.el("detentionNextButton").click();
  assert.equal(p.el("detentionEndingScene").hidden,false);
  assert.equal(saved(p).holidayPhase,"rescue-route-ending");
});


test("GAME-SP4B.1 Ending B briefing uses accessible bottom-of-stage subtitles, not old modal",()=>{
  assert.match(html,/class="detention-office-label" aria-hidden="true"/);
  const introSelector='#rescueRouteIntro[data-ending-b="true"]';
  assert.ok(css.includes(introSelector+' .rescue-route-intro-stage'));
  assert.ok(css.includes(introSelector+' .rescue-travel-panel'));
  assert.ok(css.includes(introSelector+' .rescue-travel-panel > h2'));
  assert.ok(css.includes(introSelector+' #routeIntroDialogue[hidden]'));
  assert.ok(css.includes(introSelector+':has(#routeIntroDialogue:not([hidden])) #routeIntroStatus'));
  const introRules=css.slice(css.indexOf("/* GAME-SP4B.1"));
  assert.match(introRules,/#rescueRouteIntro\[data-ending-b="true"\] \.rescue-travel-panel \{[\s\S]*?position:absolute;[\s\S]*?bottom:10%;/);
  assert.match(introRules,/#detentionEndingScene \.detention-ending-content \{[\s\S]*?position:absolute;[\s\S]*?bottom:8%;/);
  // The existing Summit route treatment must remain separate, with its own
  // bottom subtitles; Ending B's labels must not appear in the Summit.
  assert.match(css,/#rescueRouteIntro\[data-route="cult"\] \.rescue-travel-panel/);
  const p=toHotelInvestigation("detention");
  completeHotelIntro(p);
  p.el("hotelDetentionButton").click();
  for(let i=0;i<6;i++)p.el("hotelFinishButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-intro");
  assert.equal(p.el("rescueRouteIntro").dataset.route,"other","Keep canonical Summit route scope");
  assert.equal(p.el("rescueRouteIntro").dataset.endingB,"true");
  assert.equal(p.el("routeIntroDialogue").hidden,false);
  assert.match(p.el("routeIntroLine").textContent,/./);
  assert.ok(p.el("routeIntroStatus").textContent.length>0,"Progress remains available after dialogue");
  p.el("routeIntroNextButton").click();
  assert.equal(p.el("rescueRouteIntro").dataset.endingB,"true");
  assert.equal(p.el("routeIntroDialogue").hidden,false);
});


test("GAME-SP4B.2 approved official is the original transparent full-body sprite",()=>{
  const sprite="public/assets/generated/characters/ending-b-ceremonial-official-neutral-v01.webp";
  const data=fs.readFileSync(path.join(root,sprite));
  assert.equal(data.toString("ascii",0,4),"RIFF");
  assert.equal(data.toString("ascii",8,12),"WEBP");
  assert.equal(data.toString("ascii",12,16),"VP8X");
  assert.ok((data[20]&0x10)!==0,"The official must preserve alpha transparency");
  assert.match(html,/class="detention-intro-official"[^>]*ending-b-ceremonial-official-neutral-v01\.webp/);
  assert.match(html,/class="detention-ending-official"[^>]*ending-b-ceremonial-official-neutral-v01\.webp/);
  assert.match(css,/\.detention-intro-official,\s*\n#holidayScreen \.detention-ending-official \{[\s\S]*?clip-path:none/);
  assert.match(css,/data-speaker="official"\] \.detention-intro-official/);
  assert.match(css,/data-speaker="official"\] \.detention-ending-official/);
  assert.match(read("src/game.js"),/detentionEndingScene"\)\.dataset\.speaker = showCard/);
  assert.match(read("scripts/build.mjs"),/ending-b-ceremonial-official-neutral-v01\.webp/);
});


test("GAME-SP4B.4 official stands full length between David and Paul on matching floor level",()=>{
  const rules=css.slice(css.lastIndexOf("/* GAME-SP4B.4:"));
  const standing=rules.match(/#holidayScreen \.detention-intro-official,\s*#holidayScreen \.detention-ending-official \{([^}]+)\}/);
  assert.ok(standing,"Briefing and ending reuse one unmasked, full-height sprite");
  assert.match(standing[1],/top:auto;/);
  assert.match(standing[1],/bottom:22%;/);
  assert.match(standing[1],/left:52%;/);
  assert.match(standing[1],/height:54%;/);
  assert.match(standing[1],/clip-path:none;/,"The original full-length sprite must not be cut at a desk");
  assert.doesNotMatch(rules,/clip-path:inset/,"No legacy reception counter cropping");
  assert.match(rules,/#detentionEndingScene \.detention-ending-official \{\s*bottom:25%;left:57%;height:52%;/);
  assert.match(rules,/#detentionEndingScene \.detention-ending-david \{\s*left:27%;height:52%;/);
  assert.match(rules,/#detentionEndingScene \.detention-ending-paul \{\s*right:5%;height:50%;/);
  assert.match(rules,/@media \(max-width:800px\) \{[\s\S]*?\.detention-intro-official \{\s*bottom:30%;left:52%;height:43%;/);
  assert.match(rules,/@media \(max-width:450px\) \{[\s\S]*?\.detention-intro-official \{\s*bottom:34%;left:52%;height:33%;/);
  // The three separate actors remain in the approved left/centre/right configuration.
  assert.match(css,/#rescueRouteIntro\[data-ending-b="true"\] \.detention-intro-david \{\s*height:56%;bottom:22%;left:9%;/);
  assert.match(css,/#rescueRouteIntro\[data-ending-b="true"\] \.detention-intro-paul \{\s*height:51%;bottom:22%;right:9%;/);
});

test("GAME-SP4B.5 paperwork places illustration and all selection states side-by-side on laptops",()=>{
  const paper=html.slice(html.indexOf('<section id="detentionPaperwork"'),html.indexOf('<section id="reassembleWorkshop"'));
  const head=paper.indexOf('class="detention-form-header"');
  const cols=paper.indexOf('class="detention-form-columns"');
  const reading=paper.indexOf('class="detention-reading-column"');
  const answers=paper.indexOf('class="detention-answer-column"');
  assert.ok(head>=0 && cols>head && reading>cols && answers>reading,
    "Form header precedes distinct image and answer columns");
  for(const id of ["detentionRoundPrompt","detentionRoundClue","detentionArtDisplay","detentionChoiceCards",
    "detentionStampPanel","detentionApprovedPreview","detentionFeedback","detentionHint","detentionNextButton"]){
    if(id==="detentionArtDisplay") {
      assert.match(paper,/class="detention-art-display"/);
    } else {
      assert.match(paper,new RegExp('id="'+id+'"'),"Preserve existing puzzle element "+id);
    }
  }
  assert.ok(paper.indexOf('id="detentionChoiceCards"')>answers);
  assert.ok(paper.indexOf('id="detentionStampPanel"')>answers);
  assert.ok(paper.indexOf('id="detentionApprovedPreview"')>answers);
  assert.ok(paper.indexOf('id="detentionNextButton"')>answers);
  const styles=css.slice(css.lastIndexOf("/* GAME-SP4B.5:"));
  assert.match(styles,/\.detention-form-columns \{[\s\S]*?grid-template-columns:minmax\(0,\.98fr\) minmax\(0,1\.02fr\)/);
  assert.match(styles,/\.detention-paperwork \.detention-cards \{[\s\S]*?grid-template-columns:1fr/);
  assert.match(styles,/\.detention-paperwork \.detention-card \{[\s\S]*?min-height:52px/);
  assert.match(styles,/@media \(max-width:800px\) \{[\s\S]*?\.detention-form-columns \{[\s\S]*?grid-template-columns:1fr/);
  assert.match(styles,/overflow-y:auto; \/\* fallback only for unusually short windows/);
  // Layout only. The full selectable/acknowledgement/stamp and save/resume logic is
  // tested by GAME-SP4B's existing three-stage route tests.
});


test("GAME-SP4C spa artwork has a separate location and three transparent locked actors",()=>{
  const base="public/assets/generated/";
  const location="locations/ending-c-spa-lounge-background-v01.webp";
  const actors=[
    "characters/ending-c-stephen-spa-robe-v01.webp",
    "characters/ending-c-david-spa-visitor-v01.webp",
    "characters/ending-c-paul-spa-visitor-v01.webp"
  ];
  for(const filename of [location,...actors]) {
    const bytes=fs.readFileSync(path.join(root,base,filename));
    assert.equal(bytes.toString("ascii",0,4),"RIFF",filename+" must be a WebP");
    assert.equal(bytes.toString("ascii",8,12),"WEBP");
    if(filename.includes("/characters/")) {
      assert.equal(bytes.toString("ascii",12,16),"VP8X",filename+" must have extended WebP format");
      assert.ok((bytes[20]&0x10)!==0,filename+" must retain transparency");
    }
  }
  const intro=html.slice(html.indexOf('id="rescueRouteIntro"'),html.indexOf('id="rescueMiniGameScene"'));
  const ending=html.slice(html.indexOf('id="reassembleEndingScene"'),html.indexOf('id="rescueEndingSummary"'));
  for(const name of ["david","paul"]) {
    assert.match(intro,new RegExp('class="spa-intro-actor spa-intro-'+name+'"[^>]*ending-c-'+name+'-spa-visitor-v01\\.webp'));
    assert.match(ending,new RegExp('class="spa-ending-actor spa-ending-'+name+'"[^>]*ending-c-'+name+'-spa-visitor-v01\\.webp'));
  }
  assert.doesNotMatch(intro,/spa-intro-stephen/,"Stephen's appearance remains the final reveal");
  assert.ok(ending.includes('class="spa-ending-actor spa-ending-stephen"') && ending.includes("ending-c-stephen-spa-robe-v01.webp"));
  const stage=css.slice(css.indexOf("/* GAME-SP4C.1: approved EMPTY spa"));
  assert.ok(stage.includes("ending-c-spa-lounge-background-v01.webp"));
  assert.ok(stage.includes('#rescueRouteIntro[data-route="reassemble"]'));
  assert.ok(stage.includes('#reassembleEndingScene[data-speaker="stephen"] .spa-ending-stephen'));
  assert.ok(engine.includes('reassembleEndingScene").dataset.speaker = card'));
  assert.match(read("scripts/build.mjs"),/Approved Ending C scene artworks packaged/);
});


test("GAME-SP4C.1B locked spa display workshop is separate from live puzzle controls",()=>{
  const file="public/assets/generated/locations/ending-c-spa-assembly-workshop-background-v01.webp";
  const data=fs.readFileSync(path.join(root,file));
  assert.equal(data.toString("ascii",0,4),"RIFF");
  assert.equal(data.toString("ascii",8,12),"WEBP");
  const styles=css.slice(css.lastIndexOf("/* GAME-SP4C.1B:"));
  assert.ok(styles.includes("ending-c-spa-assembly-workshop-background-v01.webp"));
  assert.ok(styles.includes('#rescueMiniGameScene[data-route="reassemble"]'));
  const puzzle=html.slice(html.indexOf('id="reassembleWorkshop"'),html.indexOf('id="reassembleEndingScene"'));
  assert.match(puzzle,/id="assemblyPiece0"/);
  assert.match(puzzle,/id="assemblySlot0"/);
  assert.match(read("scripts/build.mjs"),/Approved Ending C scene artworks packaged/);
});


test("GAME-SP4C.2-3 all approved illustrated pieces stay separate and preserve puzzle controls",()=>{
  const ids=[
    "head","torso","left-arm","right-arm","left-leg","right-leg",
    "kidney-1","kidney-2","kidney-3","wifi-heart","toaster","banana","spleen"
  ];
  const block=html.slice(html.indexOf('id="reassembleWorkshop"'),html.indexOf('id="reassembleEndingScene"'));
  for(const [i,id] of ids.entries()){
    const asset="ending-c-cardboard-"+id+"-v01.webp";
    const bytes=fs.readFileSync(path.join(root,"public/assets/generated/game",asset));
    assert.ok(bytes.length>20000,"Asset should be the actual approved art: "+asset);
    assert.equal(bytes.toString("ascii",0,4),"RIFF",asset);
    assert.equal(bytes.toString("ascii",8,16),"WEBPVP8X",asset);
    assert.ok((bytes[20]&0x10)!==0,"Approved art must retain WebP alpha: "+asset);
    assert.ok(block.includes('id="assemblyPiece'+i+'"'),"Keep original selectable button "+id);
    assert.ok(block.includes('id="assemblyPieceLabel'+i+'"'),"Keep accessible label "+id);
    assert.ok(block.includes(asset),"Render individual art "+id);
  }
  const board=fs.readFileSync(path.join(root,"public/assets/generated/game/ending-c-cardboard-board-v01.webp"));
  assert.equal(board.toString("ascii",8,16),"WEBPVP8X");
  assert.ok((board[20]&0x10)!==0,"Board must retain transparency");
  assert.ok(block.includes('class="assembly-board-art"'));
  for(let i=0;i<6;i++){
    assert.ok(block.includes('id="assemblySlot'+i+'"'),"Preserve six interactive slots");
    assert.ok(block.includes('id="assemblySlotArt'+i+'"'),"Keep separate fitted art layer");
    assert.ok(block.includes('id="assemblySlotLabel'+i+'"'),"Keep six human-readable slot labels");
  }
  assert.ok(engine.includes('("assemblySlotArt"+i).hidden = !filled;'),"Reveal only fitted cardboard art");
  assert.ok(engine.includes('("assemblyPieceLabel"+i).textContent'),"Rerender cannot destroy images");
  assert.ok(engine.includes('("assemblySlotLabel"+i).textContent'),"Keep saved slot images mounted");
  const artCss=css.slice(css.lastIndexOf("/* GAME-SP4C.2-3: interactive cardboard puzzle"));
  assert.ok(artCss.includes("grid-template-columns:repeat(5,minmax(0,1fr))"),"Laptop shows compact art tray");
  assert.ok(artCss.includes("@media (max-width:800px)"),"Stack at tablet widths");
  assert.ok(artCss.includes("@media (max-width:450px)"),"Retain large mobile tap targets");
});


test("GAME-SP4C.3A fitted parts are opaque and labelled slots do not obscure the board",()=>{
  const stage=css.slice(css.lastIndexOf("/* GAME-SP4C.3A: stable standee layers"));
  assert.ok(stage.includes('.assembly-slot[data-filled="true"]:disabled'),"Completed slots must counter the generic disabled button opacity");
  assert.match(stage,/\.assembly-slot\[data-filled="true"\]:disabled\s*\{[^}]*opacity:1;/);
  assert.match(stage,/\.assembly-slot-art\s*\{[^}]*z-index:3;/);
  assert.match(stage,/\.assembly-board-art\s*\{[^}]*z-index:0;/);
  assert.match(stage,/\.assembly-slot\[data-filled="true"\]\s*\{[^}]*z-index:4;/);
  assert.match(stage,/\.assembly-slot-art\s*\{[^}]*object-fit:fill;/);
  assert.match(stage,/\.assembly-slot-label\s*\{[^}]*display:none !important;/);
  assert.match(stage,/@media \(min-width:801px\)[\s\S]*?grid-template-rows:min-content repeat\(3,minmax\(88px,1fr\)\)/);
  assert.match(stage,/\.assembly-tray\s*\{[^}]*overflow:visible;/);
  assert.match(stage,/@media \(min-width:801px\) and \(max-height:730px\)/);
  assert.ok(engine.includes('("assemblySlotArt"+i).hidden = !filled;'),"Fitted state must switch the independent image on");
  const slots=html.slice(html.indexOf('class="assembly-silhouette"'),html.indexOf('id="assemblyFeedback"'));
  for(let i=0;i<6;i++){
    assert.ok(slots.includes('id="assemblySlotArt'+i+'"'),"Keep each individual artwork image");
    assert.ok(slots.includes('id="assemblySlotLabel'+i+'"'),"Retain accessible label text in DOM");
    assert.match(slots,new RegExp('id="assemblySlot'+i+'"[^>]*aria-label='),"Each target retains an accessible name");
  }
});


test("GAME-SP4C.3B anatomically oriented cardboard arms and legs retain natural proportions",()=>{
  const rules=css.slice(css.lastIndexOf("/* GAME-SP4C.3B: anatomical limb placement"));
  assert.ok(rules.length>500,"Dedicated fit-and-placement stage should exist");
  function rule(name) {
    const i=rules.indexOf("#holidayScreen .assembly-workshop ."+name+" {");
    assert.ok(i>=0,"Expected shaped placement selector: "+name);
    return rules.slice(i,rules.indexOf("}",i));
  }
  // Stephen faces the player: his LEFT hand and leg must land on screen RIGHT.
  const la=rule("assembly-slot-left-arm");
  const ra=rule("assembly-slot-right-arm");
  const ll=rule("assembly-slot-left-leg");
  const rl=rule("assembly-slot-right-leg");
  function left(rule){return Number(rule.match(/left:(\d+(?:\.\d+)?)%/)?.[1])}
  assert.ok(left(la)>left(ra)+50,"Left arm is on viewer right");
  assert.ok(left(ll)>left(rl)+20,"Left leg is on viewer right");
  for(const part of [la,ra,ll,rl]){
    assert.match(part,/width:\d+%;height:\d+%/,"Use a specified silhouette-shaped region");
  }
  assert.match(rules,/\.assembly-slot-left-arm::before,[\s\S]*?clip-path:polygon/);
  assert.match(rules,/\.assembly-slot-left-leg::before,[\s\S]*?clip-path:polygon/);
  assert.ok(rules.includes("object-fit:contain"),"Do not stretch the approved body parts to an arbitrary rectangle");
  assert.ok(rules.includes("width:auto;height:112%"),"Limb overlays follow the original art aspect ratio");
  assert.doesNotMatch(rules,/\.assembly-slot-art\s*\{[^}]*object-fit:fill/);
  assert.match(rules,/\.assembly-slot\[data-filled="true"\]\s*\{[^}]*opacity:1;/);
  assert.ok(html.includes("Stephen faces you, so his left is on your right"),"Explain anatomical left and right");
  assert.ok(engine.includes("He faces us, so his left is on your right"),"Hint no longer claims visible slot labels");
  for(const id of ["left-arm","right-arm","left-leg","right-leg"]) {
    assert.ok(html.includes('data-slot="'+id+'"'),"Don't change persisted puzzle slot IDs: "+id);
  }
  assert.ok(engine.includes('("assemblySlotArt"+i).hidden = !filled;'),"Keep fitted art state tied to existing progress");
});


test("GAME-SP4C.4A approved cardboard Stephen is an extra final-scene actor",()=>{
  const ending=html.slice(html.indexOf('id="reassembleEndingScene"'),html.indexOf('id="rescueEndingSummary"'));
  const intro=html.slice(html.indexOf('id="rescueRouteIntro"'),html.indexOf('id="rescueMiniGameScene"'));
  const real='ending-c-stephen-spa-robe-v01.webp';
  const cardboard='ending-c-stephen-cardboard-rebuilt-v01.webp';
  assert.ok(ending.includes('class="spa-ending-actor spa-ending-stephen"'));
  assert.ok(ending.includes(real),"Real spa Stephen must remain in the scene");
  assert.ok(ending.includes('class="spa-ending-actor spa-ending-cardboard-stephen"'));
  assert.ok(ending.includes(cardboard),"Taped cardboard Stephen must have his own independent actor");
  assert.ok(ending.includes('class="spa-ending-actor spa-ending-david"'));
  assert.ok(ending.includes('class="spa-ending-actor spa-ending-paul"'));
  assert.ok(!intro.includes(cardboard),"No cardboard figure before POWER ON");
  const image=fs.readFileSync(path.join(root,"public/assets/generated/characters",cardboard));
  assert.ok(image.length>20000,"Must package the approved original artwork, not a placeholder");
  assert.equal(image.toString("ascii",0,4),"RIFF");
  assert.equal(image.toString("ascii",8,16),"WEBPVP8X");
  assert.ok((image[20]&0x10)!==0,"The cardboard standee must have transparent background");
  const code=css.slice(css.lastIndexOf("/* GAME-SP4C.4A: badly assembled cardboard Stephen"));
  assert.ok(code.includes('.spa-ending-cardboard-stephen'));
  assert.ok(code.includes('[data-speaker="cardboard stephen"] .spa-ending-cardboard-stephen'));
  assert.ok(code.includes('@media (max-width:800px)'));
  assert.ok(code.includes('@media (max-width:450px)'));
  assert.ok(engine.includes('line.speaker.toLowerCase()'),
    "The existing speaker cue must continue to highlight the new independent figure");
  assert.ok(read("scripts/build.mjs").includes('endingCImages.length + "/20."'));
});


test("GAME-SP4.1B London David uses the already approved opening optical registration",()=>{
  const expected={"serious":".96","confident":".93","frustrated":".92","systems-expert":".94"};
  const opening=css.slice(css.indexOf("/* GAME-SP4.0D: optically register David"),
    css.indexOf("/* Listening actors retain"));
  const london=css.slice(css.indexOf("/* GAME-SP4.1B: use the already-approved opening David"),
    css.indexOf("#holidayScreen .rescue-alarm-paul {right:16%;}"));
  assert.ok(london.length>750,"Must keep focused London-only actor CSS");
  assert.match(london,/#rescueAlarmScene #rescueAlarmDavid\s*\{[^}]*width:32%;[^}]*height:64%;[^}]*object-fit:contain;[^}]*transform-origin:center bottom;[^}]*transition:none;/);
  for(const [pose,scale] of Object.entries(expected)){
    const openRule=opening.match(new RegExp('data-seated-sprite="'+pose.replace("-","\\-")+'"[^}]*transform: scale\\((\\.[0-9]+)\\) !important;'));
    const alarmRule=london.match(new RegExp('data-sprite="'+pose.replace("-","\\-")+'"[^}]*transform:scale\\((\\.[0-9]+)\\);'));
    assert.ok(openRule&&alarmRule,"Require both optical calibration rules for "+pose);
    assert.equal(openRule[1],scale,"Opening approval value must remain unchanged for "+pose);
    assert.equal(alarmRule[1],scale,"Reuse approved optical calibration in London for "+pose);
  }
  assert.match(london,/@media \(max-width:800px\)/);
  assert.match(london,/@media \(max-width:450px\)/);
  assert.doesNotMatch(london,/#rescueAlarmPaul|\.rescue-alarm-paul/,"Paul's sprites remain independently positioned");
});
test("GAME-SP4.1B all ten alarm beats use the unchanged pose assets and checkpoint",()=>{
  const p=toRescueAlarm();
  const lines=story().SMP_RESCUE_ALARM.lines;
  const valid=["serious","confident","frustrated","systems-expert"];
  for(let i=0;i<lines.length;i++){
    const actor=p.el("rescueAlarmDavid");
    assert.equal(actor.dataset.sprite,lines[i].david,"Pose must match approved line "+lines[i].id);
    assert.ok(valid.includes(actor.dataset.sprite));
    assert.ok(actor.src.endsWith("david-office-seated-"+lines[i].david+"-v01.webp"),
      "Use only the original approved WebP on "+lines[i].id);
    assert.equal(p.el("rescueAlarmScene").hidden,false);
    if(i+1<lines.length)p.el("rescueAlarmNextButton").click();
  }
  assert.equal(saved(p).rescueAlarmStep,9,"Keep resume checkpoint and voice IDs unchanged");
  assert.equal(saved(p).holidayPhase,"rescue-alarm");
});


test("GAME-SP4.1C Summit entrance retains full daylight and uses local contrast only",()=>{
  const start=css.indexOf("/* GAME-SP4.0A / GAME-SP4.1C");
  const end=css.indexOf("/* SP4.0B",start);
  assert.ok(start>=0&&end>start,"Summit daylight style block must be explicitly scoped");
  const summitCss=css.slice(start,end);
  const stageRules=summitCss.slice(summitCss.indexOf("#holidayScreen #rescueRouteIntro[data-route=\"cult\"] .rescue-route-intro-stage"),summitCss.indexOf("/* The Summit-specific title"));
  const approved='url("../public/assets/generated/locations/summit-entrance-v01.webp")';
  assert.ok(stageRules.includes(approved),"Both exterior stages use the original approved image");
  assert.equal((stageRules.match(/summit-entrance-v01\.webp/g)||[]).length,1,
    "Briefing and admissions must use a common approved background rule");
  assert.ok(stageRules.includes('#rescueMiniGameScene:has(#summitAdmissions:not([hidden]))'),
    "Admission test uses the same full-daylight exterior");
  assert.doesNotMatch(stageRules,/linear-gradient|rgba\s*\(/,
    "Never darken the entire outdoor environment to make text readable");
  assert.match(summitCss,/\.rescue-travel-panel\s*\{[^}]*background:rgba\(5,25,47,\.9\)/,
    "Intro's bounded text surface must remain contrast-protected");
  assert.match(css,/\.summit-entrance-label\s*\{[^}]*background:rgba\(7,30,53,\.84\)/,
    "Summit title uses a local opaque backing");
  assert.match(css,/\.rescue-intro-dialogue,[\s\S]*?background:rgba\(5,25,48,\.94\)/,
    "Named dialogue remains individually legible without a global tint");
  assert.match(css,/#holidayScreen \.summit-admissions\s*\{[^}]*background:rgba\(5,25,47,\.94\)/,
    "Admission questions retain their legible local card");
  assert.ok(!stageRules.includes("summit-throne"),"The separate throne room art must be untouched");
  assert.ok(css.includes("summit-throne-room-v01.webp"),"Original throne-room artwork remains present");
  assert.ok(!stageRules.includes('data-route="detention"')&&!stageRules.includes('data-route="reassemble"'),
    "The outdoor colour correction must not change other ending routes");
});

test("GAME-SP4.1D0 retires proof switches without removing approved acting or playback",()=>{
  assert.doesNotMatch(html,/expression-proof-controls|stephenProofButton|davidProofButton|paulProofButton|Stephen: Auto|David: Auto|Paul: Auto/);
  assert.doesNotMatch(engine,/ProofMode|proofModes|ProofButton|cycleStephenProof|cycleDavidProof|cyclePaulProof/);
  assert.doesNotMatch(css,/d2-proof-button|expression-proof-controls/);
  assert.ok(engine.includes('const requested = reaction;'),"Automatic authored cues remain the sole source of portrait expressions");
  assert.match(engine,/for \(const name of Object\.keys\(cast\)\) applySeatedExpression\(name\)/);
  assert.match(engine,/cast\[name\]\.dataset\.seatedSprite = sprite/);
  for(const id of ["playPauseButton","backButton","nextButton","soundButton","storyProgress"]){
    assert.ok(html.includes('id="'+id+'"'),"Playback/progress control must remain: "+id);
  }
  assert.ok(css.includes('data-seated-sprite="confident"'),"Keep calibrated seated portraits");
});


test("GAME-SP4.1D0 saved intro resumes its authored character acting, not a proof override",()=>{
  const p=preview();p.start();p.at("office.021");
  const checkpoint=saved(p).beatId;
  const before=Object.fromEntries(["Stephen","David","Paul"].map(name=>
    [name,p.el("portrait"+name).src]));
  p.el("homeButton").click();
  p.el("resumeButton").click();
  assert.equal(saved(p).beatId,checkpoint);
  for(const name of ["Stephen","David","Paul"]){
    assert.equal(p.el("portrait"+name).src,before[name],name+" resumes its scripted pose");
    assert.equal(p.el("cast"+name).dataset.expression,all.find(x=>x.id===checkpoint).reactions[name]);
  }
  p.el("nextButton").click();
  const current=all.find(x=>x.id===saved(p).beatId);
  assert.ok(current);
  for(const name of ["Stephen","David","Paul"]){
    assert.equal(p.el("cast"+name).dataset.expression,current.reactions[name],
      name+" keeps automatic reactions after Resume");
  }
});


test("GAME-SP4.1D1 shares a paper speech style and gives both story sections a top control bar",()=>{
  for(const id of ["playPauseButton","backButton","nextButton","sceneSoundButton",
      "holidayPauseButton","holidayNextButton","holidaySoundButton","homeButton"]){
    assert.ok(html.includes('id="'+id+'"'),id+" is retained");
  }
  const officeToolbar=html.slice(html.indexOf('class="scene-toolbar-actions"'),
    html.indexOf('class="scene-toolbar-actions"')+750);
  for(const id of ["playPauseButton","backButton","nextButton","sceneSoundButton"])
    assert.ok(officeToolbar.includes('id="'+id+'"'),id+" belongs in the top office menu");
  assert.match(html,/class="china-footer story-top-controls"/);
  assert.match(css,/GAME-SP4\.1D1: one opening-office-style named speech tab throughout/);
  assert.match(css,/#holidayScreen \.china-footer\.story-top-controls/);
  const p=toWallChoice();
  const beforeSound = p.el("holidaySoundButton").textContent;
  p.el("holidaySoundButton").click();
  assert.equal(p.el("sceneSoundButton").textContent,p.el("holidaySoundButton").textContent);
  assert.notEqual(p.el("holidaySoundButton").textContent,beforeSound);
  assert.equal(p.el("holidayTopbarChapter").textContent,"CHAPTER TWO");
});

test("GAME-SP4.1D1 spoken decisions return to named scene dialogue rather than footer captions",()=>{
  const wall=toWallChoice();
  wall.el("wallAcceptButton").click();
  assert.equal(wall.el("wallDialogue").hidden,false);
  assert.equal(wall.el("wallSpeakerName").textContent,"STEPHEN");
  assert.match(wall.el("wallLineText").textContent,/actual cult/);
  assert.equal(wall.el("wallResultText").hidden,true);
  const palace=toPalaceChoice();
  palace.el("palaceDeclineButton").click();
  assert.equal(palace.el("palaceDialogue").hidden,false);
  assert.equal(palace.el("palaceSpeakerName").textContent,"STEPHEN");
  assert.match(palace.el("palaceLineText").textContent,/meetings/);
  assert.equal(palace.el("palaceResultText").hidden,true);
  const market=toMarket();
  finishMarket(market);
  assert.equal(market.el("marketDialogue").hidden,false);
  assert.equal(market.el("marketSpeakerName").textContent,"STEPHEN");
  assert.match(market.el("marketLineText").textContent,/saved a fortune/);
  assert.equal(market.el("marketResultText").hidden,true);
});

test("GAME-SP4.1D1 hotel replies and both puzzle routes show named speech without changing choices",()=>{
  const hotel=toHotelInvestigation("detention");
  completeHotelIntro(hotel);
  hotel.el("hotelCultButton").click();
  assert.equal(hotel.el("rescueHotelDialogue").hidden,false);
  assert.equal(hotel.el("hotelSpeaker").textContent,"PAUL");
  assert.equal(hotel.el("hotelDeductionFeedback").hidden,true);
  hotel.el("hotelDetentionButton").click();
  assert.equal(hotel.el("rescueHotelDialogue").hidden,false);
  assert.equal(hotel.el("hotelSpeaker").textContent,"DAVID");
  assert.match(hotel.el("hotelLine").textContent,/our location/);
  const summit=toSummitAdmissions();
  summit.el("summitChoice0").click();
  assert.equal(summit.el("summitResponseCard").hidden,false);
  assert.equal(summit.el("summitResponseSpeaker").textContent,"GATEKEEPER");
  assert.match(summit.el("summitFeedback").textContent,/Can it charge/);
  const detention=toDetentionPaperwork();
  detention.el("detentionChoice0").click();
  assert.equal(detention.el("detentionResponseCard").hidden,false);
  assert.equal(detention.el("detentionResponseSpeaker").textContent,"OFFICIAL");
  assert.match(detention.el("detentionFeedback").textContent,/Form 99Z/);
});


test("GAME-SP4.1D1 all spoken cards use the opening's external name-tab layout",()=>{
  const expectedIds=[
    "wallSpeakerName","palaceSpeakerName","marketSpeakerName",
    "rescueAlarmSpeaker","hotelSpeaker","routeIntroSpeaker",
    "summitEndingSpeaker","detentionEndingSpeaker","assemblyEndingSpeaker",
    "summitResponseSpeaker","detentionResponseSpeaker"
  ];
  for(const id of expectedIds){
    const tag=html.match(new RegExp('<strong id="'+id+'"[^>]*>'));
    assert.ok(tag,id+" retains a real speaker label, not baked-in art");
  }
  assert.match(css,/#holidayScreen \.story-speech > strong \{[\s\S]*?position:absolute;[\s\S]*?transform:translateY\(calc\(-100% \+ 5px\)\)/,
    "Every later spoken speaker badge sits outside the top edge");
  assert.match(css,/#holidayScreen \.story-speech > strong \{[\s\S]*?background:#105baa !important;/,
    "Speaker tab uses the opening's approved blue");
  assert.match(css,/#holidayScreen \.story-speech > p:not\(\[hidden\]\) \{[\s\S]*?margin:0 !important;/,
    "Speech text no longer reserves a header row inside the bubble");
  for(const cls of ["wall-dialogue","rescue-intro-dialogue","summit-ending-content","detention-ending-content","assembly-ending-content"]){
    assert.ok(css.includes("."+cls+".story-speech"),cls+" has compact speech padding");
  }
  assert.match(css,/#holidayScreen \.story-puzzle-response \{[\s\S]*?overflow:visible;/,
    "Puzzle reply tabs are not clipped by their paper cards");
  const opening=html.match(/id="dialogueBox"/);
  assert.ok(opening,"The approved office speech remains the reference");
  assert.match(html,/id="speakerName" class="speaker"/);
  assert.match(css,/\.dialogue-header \{ position:absolute;top:-31px/,
    "The original office label geometry is unchanged");
  assert.match(html,/id="hotelDeductions"/);
  assert.match(html,/id="assemblyFeedback" class="assembly-feedback"/);
});


test("GAME-SP4.1D2 one top-bar skip points at the first unanswered Wall choice",()=>{
  assert.match(html,/id="holidaySkipButton"[^>]*hidden>/);
  assert.match(css,/#holidayScreen #holidaySkipButton\[hidden\] \{display:none !important;/);
  const p=preview();
  p.start();p.el("skipButton").click();
  assert.equal(saved(p).holidayPhase,"transition");
  assert.match(p.el("holidaySkipButton").textContent,/Skip to choice/);
  p.el("holidaySkipButton").click();
  assert.equal(saved(p).holidayPhase,"wall");
  assert.equal(saved(p).wallStep,story().SMP_CHINA_WALL.lines.length);
  assert.equal(saved(p).wallDecision,null);
  assert.equal(p.el("wallChoices").hidden,false);
  assert.equal(p.el("holidaySkipButton").hidden,true,"No skip at unanswered route choice");
  assert.equal(p.el("holidayNextButton").hidden,true);
  assert.equal(p.el("wallAcceptButton").focusCount,1);
  p.el("holidaySkipButton").click(); // Stale hidden click must be guarded.
  assert.equal(saved(p).wallDecision,null);
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(p.el("holidaySkipButton").hidden,true);
  assert.equal(saved(p).wallStep,story().SMP_CHINA_WALL.lines.length);
});

test("GAME-SP4.1D2 declined invitations skip to real Palace choice and fixed Market invitation",()=>{
  const p=toWallChoice();
  p.el("wallDeclineButton").click();
  assert.match(p.el("holidaySkipButton").textContent,/Skip to choice/);
  p.el("holidaySkipButton").click();
  assert.equal(saved(p).holidayPhase,"palace");
  assert.equal(saved(p).palaceStep,story().SMP_CHINA_PALACE.lines.length);
  assert.equal(saved(p).palaceDecision,null);
  assert.equal(p.el("palaceChoices").hidden,false);
  assert.equal(p.el("holidaySkipButton").hidden,true);
  p.el("palaceDeclineButton").click();
  assert.match(p.el("holidaySkipButton").textContent,/Skip to invitation/);
  p.el("holidaySkipButton").click();
  assert.equal(saved(p).holidayPhase,"market");
  assert.equal(saved(p).marketStep,story().SMP_CHINA_MARKET.lines.length);
  assert.equal(saved(p).marketDecision,"accept","Night Market invitation is a fixed scripted outcome");
  assert.equal(saved(p).pendingPlan,"reassemble");
  assert.equal(p.el("holidaySkipButton").hidden,false);
  assert.match(p.el("holidaySkipButton").textContent,/Skip to investigation/);
  p.el("holidaySkipButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-hotel");
  assert.equal(saved(p).route,"reassemble");
  assert.equal(saved(p).hubMatched,false);
  assert.deepEqual(saved(p).hubViewed,[]);
  assert.equal(p.el("hotelDeductions").hidden,false);
  assert.equal(p.el("holidaySkipButton").hidden,true,"Hotel evidence cannot be skipped");
});

test("GAME-SP4.1D2 all accepted routes skip to unsolved hotel and preserve checkpoint on Resume",()=>{
  for(const [route,setup] of [
    ["cult",p=>{p.el("wallAcceptButton").click();}],
    ["detention",p=>{
      p.el("wallDeclineButton").click();p.el("holidaySkipButton").click();
      p.el("palaceAcceptButton").click();
    }]
  ]){
    const p=toWallChoice();
    setup(p);
    assert.match(p.el("holidaySkipButton").textContent,/Skip to investigation/);
    p.el("holidaySkipButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-hotel",route);
    assert.equal(saved(p).route,route);
    assert.equal(saved(p).hubMatched,false);
    assert.equal(saved(p).hubWrongGuesses,0);
    assert.equal(saved(p).hubIntroStep,story().SMP_RESCUE_HUB.opening.length);
    assert.equal(p.el("rescueHotelHotspots").hidden,false);
    assert.equal(p.el("holidaySkipButton").hidden,true);
    p.el("homeButton").click();p.el("resumeButton").click();
    assert.equal(saved(p).route,route);
    assert.equal(saved(p).holidayPhase,"rescue-hotel");
    assert.equal(p.el("holidaySkipButton").hidden,true);
  }
});

test("GAME-SP4.1D2 alarm, travel and hotel introduction stop at manual clue investigation",()=>{
  const alarm=toRescueAlarm("cult");
  assert.match(alarm.el("holidaySkipButton").textContent,/investigation/);
  alarm.el("holidayPauseButton").click();
  alarm.el("holidaySkipButton").click();
  assert.equal(saved(alarm).holidayPhase,"rescue-hotel");
  assert.equal(alarm.timeouts.size,0,"Pausing persists through the skip");
  assert.equal(alarm.el("hotelPhoneButton").focusCount,1);

  const travel=toHotelInvestigation("detention");
  assert.match(travel.el("holidaySkipButton").textContent,/investigation/);
  travel.el("holidaySkipButton").click();
  assert.equal(saved(travel).hubIntroStep,8);
  assert.equal(travel.el("hotelDeductions").hidden,false);
  travel.el("hotelDeskButton").click();
  assert.equal(travel.el("holidaySkipButton").hidden,true,"Open clue is manual");
  travel.el("hotelEvidenceCloseButton").click();
  travel.el("hotelCultButton").click();
  assert.match(travel.el("holidaySkipButton").textContent,/investigation/);
  const wrongCount=saved(travel).hubWrongGuesses;
  travel.el("holidaySkipButton").click();
  assert.equal(saved(travel).hubWrongGuesses,wrongCount);
  assert.equal(saved(travel).hubMatched,false);
  assert.equal(saved(travel).hubVoiceFeedbackStep,null);
  assert.equal(travel.el("holidaySkipButton").hidden,true);
});

test("GAME-SP4.1D2 all routes jump from earned hotel match or route intro to fresh UNSOLVED game",()=>{
  for(const [route,button,game,choice] of [
    ["cult","hotelCultButton","summitAdmissions","summitChoice0"],
    ["detention","hotelDetentionButton","detentionPaperwork","detentionChoice0"],
    ["reassemble","hotelReassembleButton","reassembleWorkshop","assemblyPiece0"]
  ]){
    const p=toHotelInvestigation(route);
    p.el("holidaySkipButton").click();
    p.el(button).click();
    assert.equal(saved(p).hubMatched,true);
    assert.match(p.el("holidaySkipButton").textContent,/Skip to game/);
    p.el("holidaySkipButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-minigame");
    assert.equal(saved(p).route,route);
    assert.equal(saved(p).rescueProgress.finished,false);
    assert.equal(saved(p).rescueProgress.miniGameStage,0);
    assert.equal(p.el(game).hidden,false);
    assert.equal(p.el(choice).focusCount,1);
    assert.equal(p.el("holidaySkipButton").hidden,true,"Unsolved game has no skip");
    p.el("holidaySkipButton").click();
    assert.equal(saved(p).rescueProgress.miniGameStage,0,"Stale click cannot answer puzzle");
  }
  const branch=toHotelInvestigation("cult");
  branch.el("holidaySkipButton").click();
  branch.el("hotelCultButton").click();
  for(let i=0;i<6;i++)branch.el("hotelFinishButton").click();
  assert.equal(saved(branch).holidayPhase,"rescue-route-intro");
  assert.match(branch.el("holidaySkipButton").textContent,/Skip to game/);
  branch.el("holidaySkipButton").click();
  assert.equal(saved(branch).holidayPhase,"rescue-minigame");
  assert.equal(saved(branch).rescueProgress.miniGameStage,0);
});

test("GAME-SP4.1D2 Skip to end is hidden before puzzle completion and available after all three routes",()=>{
  const cases=[
    {route:"cult",make:toSummitAdmissions,complete:p=>{
      for(const idx of [2,1,2]){p.el("summitChoice"+idx).click();p.el("summitNextButton").click();}
    },count:story().SMP_SUMMIT.ending.length},
    {route:"detention",make:toDetentionPaperwork,complete:p=>{
      finishDetentionForms(p);
      p.el("detentionChoice2").click();p.el("detentionStampButton").click();
      p.el("detentionPermitButton").click();p.el("detentionNextButton").click();
    },count:story().SMP_DETENTION.ending.length},
    {route:"reassemble",make:toAssemblyWorkshop,complete:p=>{
      for(let i=0;i<6;i++){p.el("assemblyPiece"+i).click();p.el("assemblySlot"+i).click();}
      assert.equal(saved(p).rescueProgress.finished,true);
      assert.equal(p.el("holidaySkipButton").hidden,true,"POWER ON is mandatory");
      p.el("assemblyPowerButton").click();
    },count:story().SMP_REASSEMBLE.ending.length}
  ];
  for(const c of cases){
    const p=c.make();
    assert.equal(p.el("holidaySkipButton").hidden,true,c.route+" must earn puzzle");
    c.complete(p);
    assert.equal(saved(p).rescueProgress.finished,true);
    assert.match(p.el("holidaySkipButton").textContent,/Skip to end/);
    p.el("holidaySkipButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-ending-summary");
    assert.equal(saved(p).route,c.route);
    assert.equal(saved(p).rescueProgress.endingStep,c.count);
    assert.equal(p.el("rescueEndingSummary").hidden,false);
    assert.equal(p.el("holidaySkipButton").hidden,true,"Summary cannot be skipped");
    p.el("homeButton").click();p.el("resumeButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-ending-summary");
    p.el("rescueSummaryReplayButton").click();
    assert.equal(saved(p).holidayPhase,"wall","Replay still allows another ending");
    assert.equal(saved(p).wallDecision,null);
    assert.equal(p.el("holidaySkipButton").hidden,true);
  }
});

test("GAME-SP4.1D2 skip cancels voiced line and any old pending onended callback",()=>{
  const p=preview({audio:true});
  p.start();p.el("skipButton").click();p.el("chinaStartButton").click();
  assert.equal(saved(p).holidayPhase,"wall");
  const old=p.voices.at(-1);
  assert.ok(old && old.src.includes("china.wall"),"Wall voice was started");
  const prior=old.onended;
  assert.equal(typeof prior,"function");
  p.el("holidaySkipButton").click();
  assert.equal(saved(p).wallStep,story().SMP_CHINA_WALL.lines.length);
  assert.equal(old.paused,true);
  assert.equal(old.onended,null,"Old voice callback unregistered");
  assert.equal(p.timeouts.size,0);
  prior(); // Simulate a late completion from the cancelled audio.
  assert.equal(saved(p).wallDecision,null);
  assert.equal(saved(p).wallStep,story().SMP_CHINA_WALL.lines.length);
  assert.equal(p.timeouts.size,0,"Cancelled callback cannot enqueue new beats");
});


test("GAME-SP4.1E office focus follows active character and clears on exterior, pause and menu",()=>{
  const p=preview();p.start();
  const speaking=id=>p.el(id).dataset.speaking;
  assert.equal(speaking("castDavid"),"false","Non-dialogue exterior is silent");
  assert.equal(speaking("castStephen"),"false");
  p.el("nextButton").click();
  assert.equal(speaking("castStephen"),"true");
  assert.equal(speaking("castDavid"),"false");
  assert.equal(speaking("castPaul"),"false");
  p.el("playPauseButton").click();
  assert.equal(speaking("castStephen"),"false","Pause clears the warm focus");
  p.el("playPauseButton").click();
  assert.equal(speaking("castStephen"),"true","Play restores current speaker");
  p.el("nextButton").click();
  assert.equal(speaking("castPaul"),"true","Paul owns the next line");
  assert.equal(speaking("castStephen"),"false");
  p.el("homeButton").click(); // Holiday-only Menu handler is safely inert here.
  p.el("skipButton").click();
  assert.equal(speaking("castPaul"),"false","Holiday transition clears office focus");
  p.el("homeButton").click();
  assert.equal(speaking("castStephen"),"false","Menu has no surviving glow");
});

test("GAME-SP4.1E China focus follows visible Stephen and promoter, never a choice or absent cast",()=>{
  const p=preview();p.start();p.el("skipButton").click();
  p.el("chinaStartButton").click();
  assert.equal(p.el("wallStephen").dataset.speaking,"true");
  assert.equal(p.el("wallPromoter").dataset.speaking,"false","Promoter is not visible yet");
  p.el("wallNextButton").click();
  assert.equal(p.el("wallStephen").dataset.speaking,"false");
  assert.equal(p.el("wallPromoter").dataset.speaking,"true");
  for(let i=1;i<5;i++)p.el("wallNextButton").click();
  assert.equal(p.el("wallChoices").hidden,false);
  assert.equal(p.el("wallPromoter").dataset.speaking,"false");
  assert.equal(p.el("wallStephen").dataset.speaking,"false","Unanswered choice glows no actor");
  p.el("wallDeclineButton").click();
  assert.equal(p.el("wallStephen").dataset.speaking,"true","Spoken post-choice reply belongs to Stephen");
  p.el("wallGoPalaceButton").click();p.el("intermissionContinueButton").click();
  assert.equal(p.el("palaceAttendant").dataset.speaking,"true");
  p.el("palaceNextButton").click();
  assert.equal(p.el("palaceStephen").dataset.speaking,"true");
  p.el("palaceDeclineButton").click(); // Cannot decide before all four lines.
  assert.equal(saved(p).palaceDecision,null);
  for(let i=1;i<4;i++)p.el("palaceNextButton").click();
  assert.equal(p.el("palaceAttendant").dataset.speaking,"false");
  assert.equal(p.el("palaceStephen").dataset.speaking,"false");
  p.el("palaceDeclineButton").click();
  assert.equal(p.el("palaceStephen").dataset.speaking,"true");
  p.el("palaceGoMarketButton").click();p.el("intermissionContinueButton").click();
  assert.equal(p.el("marketStephen").dataset.speaking,"true");
  p.el("marketNextButton").click();p.el("marketNextButton").click();
  assert.equal(p.el("marketSpaRep").dataset.speaking,"true");
  assert.equal(p.el("marketStephen").dataset.speaking,"false");
});

test("GAME-SP4.1E office alarm and hotel speaker focus cleanly switch and pause",()=>{
  const p=toRescueAlarm("detention");
  assert.equal(p.el("rescueAlarmDavid").dataset.speaking,"true");
  p.el("rescueAlarmNextButton").click();
  assert.equal(p.el("rescueAlarmPaul").dataset.speaking,"true");
  assert.equal(p.el("rescueAlarmDavid").dataset.speaking,"false");
  p.el("holidayPauseButton").click();
  assert.equal(p.el("rescueAlarmPaul").dataset.speaking,"false");
  p.el("holidayPauseButton").click();
  assert.equal(p.el("rescueAlarmPaul").dataset.speaking,"true");
  for(let i=1;i<10;i++)p.el("rescueAlarmNextButton").click();
  assert.equal(p.el("rescueAlarmPaul").dataset.speaking,"false");
  assert.equal(p.el("rescueAlarmDavid").dataset.speaking,"false","Completed alarm has no active speech");
  const q=toHotelInvestigation("cult");
  assert.equal(q.el("rescueHotelDavid").dataset.speaking,"true");
  q.el("hotelNextButton").click();
  assert.equal(q.el("rescueHotelPaul").dataset.speaking,"true");
  completeHotelIntro(q);
  assert.equal(q.el("rescueHotelDavid").dataset.speaking,"false");
  assert.equal(q.el("rescueHotelPaul").dataset.speaking,"false","Unresolved clues are not dialogue");
  q.el("hotelDeskButton").click();
  assert.equal(q.el("rescueHotelDavid").dataset.speaking,"false");
  q.el("hotelEvidenceCloseButton").click();
  q.el("hotelDetentionButton").click();
  assert.equal(q.el("rescueHotelPaul").dataset.speaking,"true","Wrong guess uses recorded Paul response");
});

test("GAME-SP4.1E each route introduction only highlights its own physical actors",()=>{
  for(const [route,correct,expected,other] of [
    ["cult","hotelCultButton","summitEntranceGatekeeper","detentionIntroOfficial"],
    ["detention","hotelDetentionButton","detentionIntroOfficial","summitEntranceGatekeeper"],
    ["reassemble","hotelReassembleButton","spaIntroDavid","summitEntranceGatekeeper"]
  ]){
    const p=toHotelInvestigation(route);
    completeHotelIntro(p);
    p.el(correct).click();
    for(let i=0;i<6;i++)p.el("hotelFinishButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-route-intro");
    assert.equal(p.el(expected).dataset.speaking,"true",route+" opening speaker");
    assert.equal(p.el(other).dataset.speaking,"false","Wrong-route sprite cannot glow");
    p.el("routeIntroNextButton").click();
    assert.equal(p.el(route==="cult"?"summitEntranceDavid":
       route==="detention"?"detentionIntroDavid":"spaIntroPaul").dataset.speaking,"true");
    p.el("holidayPauseButton").click();
    assert.equal(p.el(expected).dataset.speaking,"false");
    assert.equal(p.el("rescueRouteIntro").dataset.speaker,"");
    p.el("homeButton").click();p.el("resumeButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-route-intro");
    assert.equal(p.el(route==="cult"?"summitEntranceDavid":
      route==="detention"?"detentionIntroDavid":"spaIntroPaul").dataset.speaking,"true");
  }
});

test("GAME-SP4.1E every ending maps only its real current speaker; cardboard and Stephen stay independent",()=>{
  const cases=[
    {route:"cult",make:toSummitAdmissions,finish:p=>{
      for(const idx of [2,1,2]){p.el("summitChoice"+idx).click();p.el("summitNextButton").click();}
    },current:"summitThroneStephen",next:"summitThroneDavid",step:"summitEndingNextButton"},
    {route:"detention",make:toDetentionPaperwork,finish:p=>{
      finishDetentionForms(p);p.el("detentionChoice2").click();
      p.el("detentionStampButton").click();p.el("detentionPermitButton").click();
      p.el("detentionNextButton").click();
    },current:"detentionEndingStephenActor",next:"detentionEndingDavidActor",step:"detentionEndingNextButton"},
    {route:"reassemble",make:toAssemblyWorkshop,finish:p=>{
      for(let i=0;i<6;i++){p.el("assemblyPiece"+i).click();p.el("assemblySlot"+i).click();}
      p.el("assemblyPowerButton").click();
    },current:"assemblyEndingStephenActor",next:"assemblyEndingDavidActor",step:"assemblyEndingNextButton"}
  ];
  for(const c of cases){
    const p=c.make();
    assert.equal(p.el("holidaySkipButton").hidden,true,"Unsolved puzzle still blocks skip");
    c.finish(p);
    assert.equal(saved(p).holidayPhase,"rescue-route-ending");
    assert.equal(p.el(c.current).dataset.speaking,"true",c.route+" opening");
    p.el(c.step).click();
    assert.equal(p.el(c.current).dataset.speaking,"false");
    assert.equal(p.el(c.next).dataset.speaking,"true",c.route+" second speaker");
    if(c.route==="reassemble"){
      for(let i=1;i<12;i++)p.el(c.step).click();
      assert.equal(p.el("assemblyEndingCardboardActor").dataset.speaking,"true");
      assert.equal(p.el("assemblyEndingStephenActor").dataset.speaking,"false",
        "Cardboard Stephen cannot light up real Stephen");
      p.el(c.step).click();
      assert.equal(p.el("assemblyEndingCardboardActor").dataset.speaking,"false");
    }
    p.el("holidaySkipButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-ending-summary");
    assert.equal(p.el(c.current).dataset.speaking,"false");
    assert.equal(p.el(c.next).dataset.speaking,"false");
  }
});

test("GAME-SP4.1E no actor highlighting survives tab hide, skip or a changed route",()=>{
  const p=toWallChoice();
  p.el("wallAcceptButton").click();
  assert.equal(p.el("wallStephen").dataset.speaking,"true");
  p.document.hidden=true;p.listeners.get("visibilitychange")();
  assert.equal(p.el("wallStephen").dataset.speaking,"false");
  p.document.hidden=false;
  assert.equal(p.el("wallStephen").dataset.speaking,"false","Visibility does not auto-resume");
  p.el("holidayPauseButton").click();
  assert.equal(p.el("wallStephen").dataset.speaking,"true");
  p.el("holidaySkipButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-hotel");
  assert.equal(p.el("wallStephen").dataset.speaking,"false");
  assert.equal(p.el("rescueHotelDavid").dataset.speaking,"false",
    "Skipped arrival is waiting on manual clue work");
  p.el("holidayRouteButton").click();
  assert.equal(saved(p).holidayPhase,"wall");
  assert.equal(saved(p).wallDecision,null);
  assert.equal(p.el("wallStephen").dataset.speaking,"false","Unanswered choice resets all actors");
});

test("GAME-SP4.1E actor selectors stay tied to the approved art, no extra sprites",()=>{
  const ids=[
    "wallStephen","wallPromoter","palaceStephen","palaceAttendant",
    "marketStephen","marketSpaRep","rescueAlarmDavid","rescueAlarmPaul",
    "rescueHotelDavid","rescueHotelPaul","summitEntranceDavid",
    "summitEntrancePaul","summitEntranceGatekeeper","detentionIntroOfficial",
    "detentionIntroDavid","detentionIntroPaul","spaIntroDavid","spaIntroPaul",
    "summitThroneStephen","summitThroneDavid","summitThronePaul",
    "detentionEndingOfficialActor","detentionEndingStephenActor",
    "detentionEndingDavidActor","detentionEndingPaulActor",
    "assemblyEndingDavidActor","assemblyEndingStephenActor",
    "assemblyEndingCardboardActor","assemblyEndingPaulActor"
  ];
  for(const id of ids)assert.match(html,new RegExp('id="'+id+'"[^>]*data-speaker-focus'),
    id+" must target its existing sprite");
  assert.match(css,/GAME-SP4\.1E — the actor speaking gets the same restrained warm focus/);
  assert.match(css,/prefers-reduced-motion:reduce/);
  assert.match(engine,/function refreshSpeakerFocus\(\)/);
  assert.match(engine,/function clearSpeakerFocus\(\)/);
  assert.match(engine,/"cardboard stephen":"assemblyEndingCardboardActor"/);
});

test("GAME-SP4.1C2 Ending B uses approved original colours at briefing, puzzle and finale",()=>{
  const header=css.slice(css.indexOf("GAME-SP4B / GAME-SP4.1C2 — Ending B daylight"));
  assert.ok(header.length>0,"Daylight contract must exist");
  const selectors=[
    '#holidayScreen #rescueRouteIntro[data-ending-b="true"] .rescue-route-intro-stage',
    '#holidayScreen #rescueMiniGameScene[data-route="detention"] .rescue-route-intro-stage',
    '#holidayScreen #detentionEndingScene .detention-ending-stage'
  ];
  const block=header.slice(0,header.indexOf("}",header.indexOf("background:"))+1);
  for(const selector of selectors)assert.ok(block.includes(selector),"Background shared by "+selector);
  assert.match(block,/background:url\("\.\.\/public\/assets\/generated\/locations\/ending-b-bureau-office-v01\.webp"\) center\/cover no-repeat;/);
  assert.doesNotMatch(block,/linear-gradient|brightness\(|opacity:/,
    "No full-scene gradient, dimming or desaturation may be introduced");
  // Approved artwork is unchanged, and the independent foreground actors
  // retain their precisely staged positions.
  assert.ok(css.includes("ending-b-bureau-office-v01.webp"),
    "Approved room remains the CSS background");
  for(const file of [
    "ending-b-ceremonial-official-neutral-v01.webp",
    "ending-b-release-permit-canonical-portrait-proof-v01.webp"
  ])assert.ok(html.includes(file),file+" remains in the build");
  assert.match(css,/#holidayScreen #rescueRouteIntro\[data-ending-b="true"\] \.detention-office-label/);
  assert.match(css,/#holidayScreen #rescueRouteIntro\[data-ending-b="true"\] \.rescue-intro-dialogue/);
  assert.match(css,/#holidayScreen #rescueMiniGameScene\[data-route="detention"\] \.detention-paperwork/);
  assert.match(css,/#holidayScreen #detentionEndingScene \.detention-ending-content/);
  assert.ok(!css.slice(css.indexOf("GAME-SP4B / GAME-SP4.1C2 — Ending B daylight")).includes("filter:brightness(.5)"),
    "No full-scene dimming reintroduced");
});


test("GAME-SP4.1F four locked transition WebPs are valid, packaged, and used only in intended scenes",()=>{
  const names=[
    "transition-china-passing-time-v01.webp",
    "transition-operation-flight-luggage-v01.webp",
    "transition-operation-map-expenses-v01.webp",
    "transition-stephen-route-handoff-v01.webp"
  ];
  for(const name of names){
    const bytes=fs.readFileSync(path.join(root,"public/assets/generated/locations",name));
    assert.equal(bytes.toString("ascii",0,4),"RIFF",name);
    assert.equal(bytes.toString("ascii",8,12),"WEBP",name);
    assert.ok(bytes.length>20000&&bytes.length<2*1024*1024,"Approved WebP size "+name);
    assert.ok(css.includes(name),"Styles must reference "+name);
    assert.ok(read("scripts/build.mjs").includes(name),"Static build must include "+name);
    const manifest=JSON.parse(read("generated-assets/manifests/game-sp41f-"+name.replace(/\.webp$/,"")+".json"));
    assert.equal(manifest.destination,"public/assets/generated/locations/"+name);
    assert.equal(manifest.transform.maxWidth,1672);
    assert.equal(manifest.transform.maxHeight,941);
  }
  assert.match(css,/#holidayScreen \.china-intermission-art\[data-destination="palace"\],\s*#holidayScreen \.china-intermission-art\[data-destination="market"\]/);
  assert.match(css,/#holidayScreen \.china-route-handoff-art\[data-route="cult"\],\s*#holidayScreen \.china-route-handoff-art\[data-route="detention"\],\s*#holidayScreen \.china-route-handoff-art\[data-route="reassemble"\]/);
  assert.match(css,/#holidayScreen #rescueTravelScene\[data-montage="flight-luggage"\]/);
  assert.match(css,/#holidayScreen #rescueTravelScene\[data-montage="map-expenses"\]/);
  assert.match(css,/#holidayScreen #transitionNarration\[hidden\] \{display:none !important;/);
  assert.ok(!html.includes("transition.china.chapter-two.001.mp3"),
    "No hardcoded audio resource, just dynamic optional ID playback");
});

test("GAME-SP4.1F narrator subtitle tracks chapter, both time jumps and all three route handoffs",()=>{
  const p=preview();p.start();p.el("skipButton").click();
  assert.equal(p.el("transitionNarration").hidden,false);
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.china.chapter-two.001");
  assert.match(p.el("transitionNarrationLine").textContent,/risk assessment/);
  p.el("chinaStartButton").click();
  assert.equal(p.el("transitionNarration").hidden,true);
  for(let i=0;i<5;i++)p.el("wallNextButton").click();
  p.el("wallDeclineButton").click();p.el("wallGoPalaceButton").click();
  assert.equal(saved(p).holidayPhase,"intermission");
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.china.to-palace.001");
  assert.equal(p.el("intermissionArt").dataset.destination,"palace");
  p.el("intermissionContinueButton").click();
  assert.equal(p.el("transitionNarration").hidden,true);
  for(let i=0;i<4;i++)p.el("palaceNextButton").click();
  p.el("palaceDeclineButton").click();p.el("palaceGoMarketButton").click();
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.china.to-market.001");
  assert.equal(p.el("intermissionArt").dataset.destination,"market");
  p.el("intermissionContinueButton").click();
  for(let i=0;i<6;i++)p.el("marketNextButton").click();
  p.el("marketGoIncidentButton").click();
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.route.spa.001");
  assert.equal(p.el("routeHandoffArt").dataset.route,"reassemble");
  p.el("handoffContinueButton").click();
  assert.equal(p.el("transitionNarration").hidden,true);
  p.el("chinaFinalNextButton").click();
  assert.equal(p.el("transitionNarration").hidden,true,"Stephen's own spoken line is not duplicated");
  p.el("chinaFinalNextButton").click();
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.england.back.001");
  const cult=toRescueAlarm("cult");
  cult.el("holidayRouteButton").click(); // Route reset remains separate from narrator.
  const allCases=[
    ["cult","transition.route.summit.001"],
    ["detention","transition.route.banquet.001"],
    ["reassemble","transition.route.spa.001"]
  ];
  for(const [route,id]of allCases){
    const q=toRescueAlarm(route);
    q.el("holidayNextButton"); // Route already locked by choice.
    q.el("holidayRouteButton").click();
    assert.equal(saved(q).wallDecision,null);
    const pre=preview();pre.start();pre.el("skipButton").click();
    pre.el("chinaStartButton").click();
    for(let i=0;i<5;i++)pre.el("wallNextButton").click();
    if(route==="cult"){pre.el("wallAcceptButton").click();pre.el("wallGoIncidentButton").click();}
    else{
      pre.el("wallDeclineButton").click();pre.el("wallGoPalaceButton").click();
      pre.el("intermissionContinueButton").click();
      for(let i=0;i<4;i++)pre.el("palaceNextButton").click();
      if(route==="detention"){
        pre.el("palaceAcceptButton").click();
        for(let i=0;i<5;i++)pre.el("palaceNextButton").click();
        pre.el("palaceGoIncidentButton").click();
      } else {
        pre.el("palaceDeclineButton").click();pre.el("palaceGoMarketButton").click();
        pre.el("intermissionContinueButton").click();
        for(let i=0;i<6;i++)pre.el("marketNextButton").click();
        pre.el("marketGoIncidentButton").click();
      }
    }
    assert.equal(pre.el("transitionNarration").dataset.cue,id,route);
  }
});

test("GAME-SP4.1F four rescue travel cards select the two approved backdrops and hotel arrival subtitle",()=>{
  const p=toRescueAlarm("cult");
  for(let i=0;i<10;i++)p.el("rescueAlarmNextButton").click();
  p.el("rescueAlarmTravelButton").click();
  for(let i=0;i<4;i++){
    assert.equal(saved(p).holidayPhase,"rescue-travel");
    assert.equal(p.el("rescueTravelScene").dataset.montage,i<2?"flight-luggage":"map-expenses");
    assert.equal(p.el("transitionNarration").dataset.cue,"transition.travel."+String(i+1).padStart(3,"0"));
    assert.ok(p.el("transitionNarrationLine").textContent.length>50);
    p.el("rescueTravelNextButton").click();
  }
  assert.equal(saved(p).holidayPhase,"rescue-hub-arrival");
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.hotel.arrival.001");
  p.el("rescueHubStartButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-hotel");
  assert.equal(p.el("transitionNarration").hidden,true);
  assert.equal(p.el("holidaySkipButton").hidden,false);
});

test("GAME-SP4.1F existing voice engine plays optional narrator audio and falls back on missing files",async()=>{
  const p=preview({audio:true});p.start();p.el("skipButton").click();
  let voice=p.voices.at(-1);
  assert.ok(voice.src.endsWith("transition.china.chapter-two.001.mp3"));
  await Promise.resolve();
  assert.equal(p.timeouts.size,0,"Present narrator MP3 owns transition timing");
  p.el("holidayPauseButton").click();
  assert.equal(voice.paused,true);
  assert.equal(p.timeouts.size,0);
  p.el("holidayPauseButton").click();
  await Promise.resolve();
  assert.equal(voice.playCount,2);
  voice.fail(); // All narrator recordings are not uploaded yet.
  assert.equal(p.el("transitionNarration").dataset.audio,"text-fallback");
  assert.equal(p.timeouts.size,1,"Missing narrator falls back to original card duration");
  assert.equal(Array.from(p.timeouts.values())[0].delay,3600);
  p.tick();
  assert.equal(saved(p).holidayPhase,"wall");
  assert.equal(p.el("transitionNarration").hidden,true);
  assert.ok(p.voices.at(-1).src.endsWith("china.wall.001.mp3"));
});

test("GAME-SP4.1F manual Next/Skip/mute cancel narration and preserve unanswered choices",async()=>{
  const p=preview({audio:true});p.start();p.el("skipButton").click();
  const first=p.voices.at(-1);
  await Promise.resolve();
  const stale=first.onended;
  p.el("holidaySkipButton").click();
  assert.equal(first.paused,true);
  assert.equal(first.onended,null);
  assert.equal(saved(p).holidayPhase,"wall");
  assert.equal(saved(p).wallDecision,null);
  assert.equal(p.el("wallChoices").hidden,false);
  assert.equal(p.el("transitionNarration").hidden,true);
  stale();
  assert.equal(saved(p).wallDecision,null);
  assert.equal(p.timeouts.size,0);
  p.el("holidayRouteButton").click(); // Can only change a route after choosing one.
  assert.equal(saved(p).wallDecision,null);
  const q=preview({audio:true});q.start();q.el("skipButton").click();
  assert.equal(q.el("transitionNarration").hidden,false);
  const clip=q.voices.at(-1);
  q.el("holidaySoundButton").click(); // Sound off, text still visible.
  assert.equal(clip.paused,true);
  assert.equal(q.el("transitionNarration").hidden,false);
  assert.equal(q.timeouts.size,1);
  q.el("holidayNextButton").click();
  assert.equal(saved(q).holidayPhase,"wall");
  assert.equal(q.el("transitionNarration").hidden,true);
});

test("GAME-SP4.1F narrator filename allow-list exactly matches IDs reserved in game data",()=>{
  const src=read("scripts/build.mjs");
  const ids=[...engine.matchAll(/id:"(transition\.[a-z0-9.-]+)"/g)].map(m=>m[1]);
  const filenames=[...src.matchAll(/"(transition\.[a-z0-9.-]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,12);
  assert.equal(new Set(ids).size,12);
  assert.equal(filenames.length,12);
  assert.deepEqual(ids.slice().sort(),filenames.slice().sort());
  assert.match(src,/permitted\.size !== 124/);
  assert.match(src,/Approved transition artworks packaged:/);
  assert.match(read("public/assets/audio/dialogue/README.md"),/transition\.travel\.004\.mp3/);
  assert.ok(fs.existsSync(path.join(root,"docs/story/GAME-SP4.1F-APPROVED-ASSETS.md")));
});


test("GAME-SP4.1F.1 every old transition title panel contains headings, not duplicated narrator prose",()=>{
  const between=(start,end)=>{
    const a=html.indexOf(start);
    assert.ok(a>=0,"Expected scene section "+start);
    const z=html.indexOf(end,a+start.length);
    assert.ok(z>a,"Expected section boundary "+end);
    return html.slice(a,z);
  };
  const cuts=[
    ["id=\"chinaIntermission\"","id=\"chinaRouteHandoff\"","intermission"],
    ["id=\"chinaRouteHandoff\"","id=\"chinaFinalScene\"","handoff"],
    ["id=\"rescueTravelScene\"","id=\"rescueHubArrival\"","travel"],
    ["id=\"rescueHubArrival\"","id=\"rescueHotelScene\"","arrival"]
  ];
  for(const [start,end,label] of cuts){
    const scene=between(start,end);
    assert.doesNotMatch(scene,/<p(?:\s|>)/i,label+" does not repeat narrator dialogue");
    assert.doesNotMatch(scene,/<small(?:\s|>)/i,label+" does not add another story subtitle");
    assert.match(scene,/<h[23]\b/,label+" preserves a readable title");
  }
  const england=between('id="chinaFinalEngland"','id="rescueAlarmScene"');
  assert.doesNotMatch(england,/<p(?:\s|>)|<small(?:\s|>)/i);
  assert.match(england,/BACK IN ENGLAND/);
  assert.ok(!html.includes('id="intermissionComment"'));
  assert.ok(!html.includes('id="handoffDescription"'));
  assert.ok(!html.includes('id="rescueTravelDetail"'));
  assert.doesNotMatch(engine,/\$\("(?:intermissionComment|handoffDescription|rescueTravelDetail)"\)/);
  assert.match(html,/id="transitionNarration"[^>]*aria-label="Transition narrator subtitles"/);
  assert.match(html,/id="transitionNarrationLine" aria-live="off"/);
});

test("GAME-SP4.1F.1 compact transition plates leave artwork and narrator separate at all viewports",()=>{
  const block=css.slice(css.indexOf("GAME-SP4.1F.1 — compact"));
  assert.ok(block.length>0,"Dedicated last-in-cascade title-only styling");
  assert.match(block,/\.intermission-frame,\s*#holidayScreen \.route-handoff-card \{[\s\S]*?width:min\(45%,610px\);/);
  assert.match(block,/#holidayScreen #rescueTravelScene \.rescue-travel-panel,\s*#holidayScreen #rescueHubArrival \.rescue-travel-panel \{[\s\S]*?width:min\(44%,580px\);/);
  assert.match(block,/@media \(max-width:800px\)/);
  assert.match(block,/@media \(max-width:450px\)/);
  assert.match(css,/#holidayScreen \.transition-narration \{[\s\S]*?z-index:22;/);
  // The label and subtitle stay outside the scene title plate in the markup.
  const subtitleOffset=html.indexOf('id="transitionNarration"');
  assert.ok(subtitleOffset>html.indexOf('id="rescueHubArrival"'));
  assert.ok(subtitleOffset<html.indexOf('id="holidayTopbarChapter"'));
});

test("GAME-SP4.1F.1 narrator subtitles remain on transitions while title plates contain only destinations",()=>{
  const p=preview();p.start();p.el("skipButton").click();
  assert.equal(p.el("transitionNarration").hidden,false);
  assert.match(p.el("transitionNarrationLine").textContent,/marvellous time/);
  p.el("chinaStartButton").click();
  assert.equal(p.el("transitionNarration").hidden,true);
  for(let i=0;i<5;i++)p.el("wallNextButton").click();
  p.el("wallDeclineButton").click();p.el("wallGoPalaceButton").click();
  assert.equal(p.el("intermissionDestination").textContent,"THE FORBIDDEN CITY");
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.china.to-palace.001");
  p.el("intermissionContinueButton").click();
  for(let i=0;i<4;i++)p.el("palaceNextButton").click();
  p.el("palaceDeclineButton").click();p.el("palaceGoMarketButton").click();
  assert.equal(p.el("intermissionDestination").textContent,"THE NIGHT MARKET");
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.china.to-market.001");
  p.el("intermissionContinueButton").click();
  for(let i=0;i<6;i++)p.el("marketNextButton").click();
  p.el("marketGoIncidentButton").click();
  assert.ok(p.el("handoffTitle").textContent.length>0);
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.route.spa.001");
  p.el("handoffContinueButton").click();
  assert.equal(p.el("transitionNarration").hidden,true);
});


test("GAME-SP4.1F.2 Chapter Two narrator avoids printed title and continue button without moving other subtitles",()=>{
  const marker="GAME-SP4.1F.2 — Chapter Two title-art subtitle clearance";
  const start=css.indexOf(marker);
  assert.ok(start>0,"Opener-only narrator correction is in the stylesheet");
  const rules=css.slice(start);
  assert.match(rules,/@media \(min-width:801px\)/);
  assert.match(rules,/#holidayScreen:has\(#chinaTransition:not\(\[hidden\]\)\) #transitionNarration \{\s*bottom:16px;\s*left:3%;\s*transform:none;\s*width:min\(60%,790px\);/);
  assert.match(rules,/@media \(max-width:800px\)/);
  assert.match(rules,/#holidayScreen:has\(#chinaTransition:not\(\[hidden\]\)\) #transitionNarration \{\s*position:relative;\s*bottom:auto;\s*left:auto;\s*transform:none;/);
  assert.match(rules,/@media \(max-width:450px\)/);
  assert.ok(!rules.includes("#chinaIntermission"),"Do not disturb approved sightseeing cards");
  assert.ok(!rules.includes("#chinaRouteHandoff"),"Do not disturb approved route cards");
  assert.ok(!rules.includes("#rescueTravelScene"),"Do not disturb approved travel cards");
  assert.match(html,/id="chinaTransition" class="china-transition"/);
  assert.match(html,/id="chinaStartButton"/);
  const p=preview();p.start();p.el("skipButton").click();
  assert.equal(saved(p).holidayPhase,"transition");
  assert.equal(p.el("transitionNarration").hidden,false);
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.china.chapter-two.001");
  p.el("chinaStartButton").click();
  assert.equal(saved(p).holidayPhase,"wall");
  assert.equal(p.el("transitionNarration").hidden,true);
});

test("GAME-SP4.1G0A replacement Paul pleased WebP is packaged, versioned and free of temporary CSS scaling",()=>{
  const manifest=JSON.parse(read("generated-assets/manifests/paul-office-seated-pleased-v01.json"));
  assert.equal(manifest.source.provider,"google-drive");
  assert.equal(manifest.source.fileId,"15eJA-wLRl_lsWvCnYh1kgAYV894S_C7B");
  assert.equal(manifest.expectedSourceName,"paul-office-seated-pleased-recanvas-v02.png");
  assert.equal(manifest.revision,2);
  assert.equal(manifest.destination,"public/assets/generated/characters/paul-office-seated-pleased-v01.webp");
  const bytes=fs.readFileSync(path.join(root,manifest.destination));
  assert.equal(bytes.toString("ascii",0,4),"RIFF");
  assert.equal(bytes.toString("ascii",8,12),"WEBP");
  assert.ok(bytes.length>100_000&&bytes.length<400_000);
  assert.doesNotMatch(css,/#castPaul\[data-seated-sprite="pleased"\][^\{]*\{[^}]*transform:/);
  const p=preview();p.start();p.at("office.004");
  assert.equal(p.el("castPaul").dataset.seatedSprite,"pleased");
  assert.match(p.el("portraitPaul").src,/paul-office-seated-pleased-v01\.webp\?v=2$/);
  p.el("backButton").click();
  assert.equal(p.el("castPaul").dataset.seatedSprite,"neutral");
  p.el("nextButton").click();
  assert.equal(p.el("castPaul").dataset.seatedSprite,"pleased");
});

test("GAME-SP4.1G0A repaired confused sprite is versioned and matches the verified non-clipped WebP",()=>{
  const manifest=JSON.parse(read("generated-assets/manifests/paul-office-seated-confused-v01.json"));
  assert.equal(manifest.schemaVersion,1);
  assert.equal(manifest.source.provider,"google-drive");
  assert.equal(manifest.source.fileId,"1z8x-Cn24crE0hHbPwgneb2HGLyuWuhIN");
  assert.equal(manifest.expectedSourceName,"paul-office-seated-confused-replacement-v02.png");
  assert.equal(manifest.revision,2);
  assert.equal(manifest.destination,"public/assets/generated/characters/paul-office-seated-confused-v01.webp");
  const bytes=fs.readFileSync(path.join(root,manifest.destination));
  assert.equal(bytes.length,169190);
  assert.equal(bytes.toString("ascii",0,4),"RIFF");
  assert.equal(bytes.toString("ascii",8,12),"WEBP");
  const digest=require("node:crypto").createHash("sha256").update(bytes).digest("hex");
  assert.equal(digest,"3f7133bf3037a97fc7a315d4a2841d730561bc56bf8ba15290145db2e168adfd");
  assert.doesNotMatch(css,/#castPaul\[data-seated-sprite="confused"\][^\{]*\{[^}]*transform:/);
  const p=preview();p.start();p.at("office.002");
  assert.equal(p.el("castPaul").dataset.seatedSprite,"confused");
  assert.match(p.el("portraitPaul").src,/paul-office-seated-confused-v01\.webp\?v=2$/);
});

test("GAME-SP4.1G0A keeps Paul separated from Stephen across seated reactions",()=>{
  // office.002 uses the v2 confused portrait with a repaired outer outline.
  // A previous 7.25% inset put Paul's left shoulder over Stephen's sleeve.
  // The original positions leave 1.5% clear stage width between the actor boxes.
  assert.match(css,/#officeScreen \.cast-seated #castPaul \{ right: 3\.5%; \}/);
  assert.match(css,/#officeScreen \.cast-seated #castStephen \{ left: 35%; width: 30%; \}/);
  assert.doesNotMatch(css,/#officeScreen \.cast-seated #castPaul \{[^}]*z-index:/);
  assert.match(css,/#officeScreen \.cast-seated \.actor-portrait \{[\s\S]*?overflow: visible;/);
  assert.doesNotMatch(css,/#castPaul\[data-seated-sprite="(?:pleased|confused)"\] .actor-portrait img \{[^}]*transform:/);
  const p=preview();p.start();
  p.at("office.002");
  assert.equal(saved(p).beatId,"office.002");
  assert.equal(p.el("castPaul").dataset.seatedSprite,"confused");
  assert.match(p.el("portraitPaul").src,/paul-office-seated-confused-v01\.webp\?v=2$/);
  p.at("office.003");
  assert.equal(p.el("castPaul").dataset.seatedSprite,"neutral");
  p.at("office.004");
  assert.equal(p.el("castPaul").dataset.seatedSprite,"pleased");
  assert.match(p.el("portraitPaul").src,/paul-office-seated-pleased-v01\.webp\?v=2$/);
});


test("GAME-SP4.1G0B both songs share a responsive large lyric panel without ghost cutaways",async()=>{
  assert.doesNotMatch(engine,/song: '<div class="cutaway-heading">THE OPTIMISTIC VERSION/);
  assert.match(engine,/return beat\.visual === "song" \? null : beat\.visual \|\| null/);
  assert.match(css,/#officeScreen \.office-song-overlay \{[\s\S]*?height: 92%;[\s\S]*?display: flex;/);
  assert.match(css,/#officeScreen \.office-song-lyrics-scroll \{[\s\S]*?flex: 1 1 0;[\s\S]*?max-height: none;/);
  assert.doesNotMatch(css,/office-song-overlay\[data-mode="offer"\] \{[^}]*width:/);
  assert.match(css,/#officeScreen \.stage\[data-song-active="true"\] \{[\s\S]*?height: clamp\(390px, 76dvh, 620px\)/);
  assert.match(html,/id="officeSongLyricsScroll"[^>]*tabindex="0"/);
  const p=preview({audio:true});p.start();p.at("office.v07");
  assert.equal(p.el("cutawayPanel").hidden,true);
  assert.equal(p.el("stage").dataset.songActive,"true");
  assert.equal(p.el("officeSongOverlay").dataset.kind,"optimistic");
  assert.equal(p.el("officeSongLyricsScroll").attributes["aria-label"],"Optimistic song lyrics");
  const clip=p.voices.at(-1);
  await Promise.resolve();
  p.el("songListenButton").click();
  assert.equal(p.voices.at(-1),clip,"Preview upgrades to full without replacing the clip");
  clip.currentTime=0;clip.duration=120;clip.ontimeupdate();
  assert.equal(p.el("officeSongLyricsScroll").scrollTop,0);
  clip.currentTime=120;clip.ontimeupdate();
  assert.equal(p.el("officeSongLyricsScroll").scrollTop,600,"Last chorus remains reachable");
  p.el("nextButton").click();
  assert.equal(p.el("stage").dataset.songActive,"false");
  p.at("office.041");p.el("nextButton").click();
  assert.equal(p.el("officeSongOverlay").dataset.kind,"pessimistic");
  assert.equal(p.el("officeSongOverlay").dataset.mode,"offer");
  assert.equal(p.el("officeSongLyricsScroll").hidden,false);
  assert.equal(p.el("officeSongLyricsScroll").attributes["aria-label"],"Pessimistic song lyrics");
  assert.equal(p.el("officeSongLyricsScroll").scrollTop,0,"Offer starts at the first line");
  p.el("songListenButton").click();
  const music=p.voices.at(-1);await Promise.resolve();
  music.duration=120;music.currentTime=60;music.ontimeupdate();
  const scrolled=p.el("officeSongLyricsScroll").scrollTop;
  assert.ok(scrolled>360&&scrolled<420,"Pessimistic scroll advances faster than optimistic");
  p.document.activeElement=p.el("officeSongLyricsScroll");
  music.currentTime=115;music.ontimeupdate();
  assert.equal(p.el("officeSongLyricsScroll").scrollTop,scrolled,"Keyboard/manual lyric reading is not overwritten");
  p.el("songStopButton").click();
  assert.equal(saved(p).beatId,"office.042");
  assert.equal(p.el("stage").dataset.songActive,"false");
});


test("GAME-SP4.1G2A uses one baked-in desk, keeps Chapter 1 layers and registers both alarm actors",()=>{
  const alarmHtml=html.slice(html.indexOf('id="rescueAlarmScene"'),html.indexOf('id="rescueTravelScene"'));
  assert.ok(alarmHtml.length>1000,"Alarm scene markup exists");
  assert.match(alarmHtml,/class="rescue-alarm-background"[^>]*office-clean-01-v01\.webp/);
  assert.doesNotMatch(alarmHtml,/rescue-alarm-foreground|office-foreground-01-v01\.webp/);
  assert.match(html,/class="office-foreground"/,"Chapter 1 has its original foreground layer");
  assert.match(css,/#officeScreen \.office-foreground \{[^}]*office-foreground-01-v01\.webp/);
  const alarmCSS=css.slice(css.indexOf("/* GAME-SP2.4A — OFFICE-ALARM"),css.indexOf("/* GAME-SP2.4B"));
  assert.doesNotMatch(alarmCSS,/rescue-alarm-foreground/);
  assert.match(alarmCSS,/#holidayScreen \.rescue-alarm-actor \{[^}]*bottom:24%;height:64%;width:32%;max-width:none;/);
  assert.match(alarmCSS,/#holidayScreen \.rescue-alarm-david \{left:16%;\}/);
  assert.match(alarmCSS,/#holidayScreen \.rescue-alarm-paul \{right:16%;\}/);
  assert.match(alarmCSS,/#rescueAlarmScene #rescueAlarmDavid \{[^}]*width:32%;[^}]*height:64%;/);
  assert.match(alarmCSS,/#holidayScreen \.rescue-alarm-actor \{height:64%;width:42%;max-width:none;\}/);
  assert.match(alarmCSS,/#holidayScreen \.rescue-alarm-actor \{height:60%;width:43%;max-width:none;\}/);
  assert.match(alarmCSS,/#holidayScreen \.rescue-alarm-dialogue \{bottom:11%;left:3%;width:min\(73%,850px\);z-index:7;\}/);
  assert.equal((alarmHtml.match(/data-speaker-focus/g)||[]).length,2,"Only David and Paul are active actors");
  for(const id of ["rescueAlarmPhone","rescueAlarmNextButton","rescueAlarmTravelButton"])
    assert.match(alarmHtml,new RegExp('id="'+id+'"'));
  assert.match(alarmCSS,/rescue-alarm-phone \{top:3%;right:2%;width:44%;\}/);
});

test("GAME-SP4.1G2A all rescue alarm dialogue, phone cues and travel remain intact",()=>{
  for(const route of ["hotel","cult","detention"]){
    const p=toRescueAlarm(route);
    assert.equal(p.el("rescueAlarmScene").hidden,false);
    assert.equal(saved(p).rescueAlarmStep,0);
    const lines=story().SMP_RESCUE_ALARM.lines;
    assert.equal(lines.length,10);
    for(let i=0;i<lines.length;i++){
      const line=lines[i];
      assert.equal(p.el("rescueAlarmSpeaker").textContent,line.speaker.toUpperCase());
      assert.equal(p.el("rescueAlarmLine").textContent,line.text);
      assert.equal(p.el("rescueAlarmPhone").hidden,!line.showPhone);
      if(i<lines.length-1)p.el("rescueAlarmNextButton").click();
    }
    p.el("rescueAlarmNextButton").click();
    assert.equal(p.el("rescueAlarmTravelButton").hidden,false);
    p.el("rescueAlarmTravelButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-travel");
  }
});


test("GAME-SP4.1G1A new approved phone artwork is packaged and old intro proof is unused",()=>{
  const dest="public/assets/generated/game/stephen-phone-shell-g1a-v01.webp";
  const manifest=JSON.parse(read("generated-assets/manifests/game-sp41g1a-phone-shell-v01.json"));
  assert.equal(manifest.schemaVersion,1);
  assert.equal(manifest.source.provider,"google-drive");
  assert.equal(manifest.source.fileId,"1ybwzoz01UyHzV0-QmqFue1Hsmf0yfe2F");
  assert.equal(manifest.expectedSourceName,"stephen-phone-shell-g1a-v01.png");
  assert.equal(manifest.destination,dest);
  const bytes=fs.readFileSync(path.join(root,dest));
  assert.ok(bytes.length>20000&&bytes.length<2*1024*1024);
  assert.equal(bytes.toString("ascii",0,4),"RIFF");
  assert.equal(bytes.toString("ascii",8,12),"WEBP");
  assert.match(read("scripts/build.mjs"),/approvedFinalPhoneShell = "public\/assets\/generated\/game\/stephen-phone-shell-g1a-v01\.webp"/);
  const htmlPhone=html.slice(html.indexOf('id="chinaFinalScene"'),html.indexOf('id="rescueAlarmScene"'));
  assert.match(htmlPhone,/class="china-final-phone-shell"[^>]*stephen-phone-shell-g1a-v01\.webp/);
  assert.doesNotMatch(htmlPhone,/(?:class="|class="[^"]* )cutaway-phone\b|(?:class="|class="[^"]* )phone-notch\b|(?:class="|class="[^"]* )phone-screen\b|office-phone-group-chat-cutaway|office-phone-group-muted-cutaway/);
  assert.match(htmlPhone,/class="china-final-phone-screen"/);
  assert.match(htmlPhone,/id="chinaPhonePowerNotice"[^>]*aria-live="polite"/);
  assert.match(css,/#holidayScreen \.china-final-phone\[data-power="off"\] \.china-final-phone-screen \{\s*visibility: hidden;/);
  assert.doesNotMatch(engine,/Message interrupted — not delivered|MESSAGE NOT SENT/);
  assert.match(css,/@media \(max-width:450px\)/);
  assert.match(css,/prefers-reduced-motion:reduce/);
});

test("GAME-SP4.1G1A each canonical partial message is received before the phone switches off",()=>{
  for(const route of ["cult","detention","reassemble"]){
    let p;
    if(route==="cult"){ p=toWallChoice();p.el("wallAcceptButton").click();p.el("wallGoIncidentButton").click(); }
    else if(route==="detention"){ p=toPalaceChoice();p.el("palaceAcceptButton").click();for(let i=0;i<5;i++)p.el("palaceNextButton").click();p.el("palaceGoIncidentButton").click(); }
    else { p=toMarket();finishMarket(p);p.el("marketGoIncidentButton").click(); }
    assert.equal(saved(p).route,route);
    p.el("handoffContinueButton").click();
    assert.equal(saved(p).holidayPhase,"final-message");
    assert.equal(saved(p).finalStep,0);
    const message=story().SMP_CHINA_FINAL.messageByRoute[route];
    assert.equal(p.el("chinaPhoneMessage").textContent,message);
    assert.equal(p.el("chinaFinalPhone").dataset.power,"low");
    assert.equal(p.el("chinaBatteryLabel").textContent,"1% · LOW BATTERY");
    assert.equal(p.el("chinaPhoneStatus").textContent,"Partial message delivered");
    assert.equal(p.el("chinaPhonePowerNotice").hidden,true);
    p.el("chinaFinalNextButton").click();
    assert.equal(saved(p).finalStep,1);
    assert.equal(p.el("chinaFinalPhone").dataset.power,"off");
    assert.equal(p.el("chinaPhonePowerNotice").hidden,false);
    assert.equal(p.el("chinaPhoneStatus").textContent,"Last partial message delivered · phone switched off");
    assert.equal(p.el("chinaBatteryLabel").textContent,"0% · Battery flat");
    assert.equal(p.el("chinaPhoneMessage").textContent,message,"Delivered fragment stays in data");
    assert.equal(p.el("chinaFinalReaction").hidden,false);
    assert.match(html,/Oh, for fuck's sake\./,"Stephen's original spoken reaction is untouched");
    p.el("homeButton").click();p.el("resumeButton").click();
    assert.equal(p.el("chinaFinalPhone").dataset.power,"off","Resume must not light the dead screen");
    assert.equal(saved(p).finalStep,1);
    p.el("chinaFinalNextButton").click();
    assert.equal(saved(p).finalStep,2);
    assert.equal(p.el("chinaFinalPhone").hidden,true);
    assert.equal(p.el("chinaPhonePowerNotice").hidden,true);
    p.el("chinaFinalNextButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-alarm");
    for(let i=0;i<6;i++)p.el("rescueAlarmNextButton").click();
    assert.equal(p.el("rescueAlarmPhoneText").textContent,message,"David and Paul received the partial message");
  }
});


test("GAME-SP4.1G1A phone stays independently anchored above the visible action bar",()=>{
  const stage=css.slice(css.indexOf("#holidayScreen .china-final-stage {"),css.indexOf("/* GAME-SP4.1G1A: owner-approved new handset art."));
  assert.match(stage,/box-sizing: border-box;/);
  assert.match(stage,/display: block;/);
  assert.match(stage,/overflow: hidden;/);
  assert.match(stage,/padding: 0;/);
  assert.doesNotMatch(stage,/display:\s*grid|place-items:\s*center/);
  const phone=css.slice(css.indexOf("#holidayScreen .china-final-phone {"),css.indexOf("#holidayScreen .china-final-phone-shell {"));
  assert.match(phone,/position: absolute;/);
  assert.match(phone,/top: 14%;/);
  assert.match(phone,/left: 50%;/);
  assert.match(phone,/height: min\(72%, 680px\);/);
  assert.match(phone,/transform: translateX\(-50%\);/);
  assert.doesNotMatch(phone,/position: relative|height:\s*min\(78%/);
  const tablet=css.slice(css.indexOf("@media (max-width:800px) {",css.indexOf("#holidayScreen #marketScene,#holidayScreen #chinaFinalScene")),css.indexOf("@media (max-width:450px) {",css.indexOf("#holidayScreen #marketScene,#holidayScreen #chinaFinalScene")));
  assert.match(tablet,/#holidayScreen \.china-final-stage \{aspect-ratio:4\/3;\}/);
  const mobile=css.slice(css.indexOf("@media (max-width:450px) {",css.indexOf("#holidayScreen #marketScene,#holidayScreen #chinaFinalScene")),css.indexOf("/* GAME-SP2.3C",css.indexOf("#holidayScreen #marketScene,#holidayScreen #chinaFinalScene")));
  assert.match(mobile,/#holidayScreen \.china-final-stage \{aspect-ratio:3\/4;\}/);
  assert.match(mobile,/#holidayScreen \.china-final-phone \{top:5%;left:50%;height:70%;max-width:90%;transform:translateX\(-50%\);margin:0;\}/);
  assert.match(css, /@media \(min-width:451px\) and \(max-width:580px\)/);
  assert.match(css, /china-final-phone \{top:5%;left:50%;height:70%;max-width:88%;transform:translateX\(-50%\);margin:0;\}/);
  assert.match(css,/#holidayScreen \.china-final-controls \{position:absolute;z-index:8;bottom:0;/);
  // The stage's final-message state and route-sensitive text are unaffected.
  assert.match(engine,/\$\("chinaFinalPhone"\)\.dataset\.power = step === 0 \? "low" : "off"/);
  assert.match(engine,/\$\("chinaPhoneMessage"\)\.textContent = route \? chinaFinal\.messageByRoute\[route\] : ""/);
});


test("GAME-SP4.1G1A two-step cinematography centres the delivered phone, then slides it left",()=>{
  const main=css.slice(css.indexOf("#holidayScreen .china-final-phone {"),css.indexOf("#holidayScreen .china-final-phone-shell {"));
  const hero=main.slice(0,main.indexOf('#holidayScreen .china-final-phone[data-power="off"] {'));
  const dead=main.slice(main.indexOf('#holidayScreen .china-final-phone[data-power="off"] {'));
  assert.match(hero,/position: absolute;/);
  assert.match(hero,/top: 14%;/);
  assert.match(hero,/left: 50%;/,"Received message gets full centre stage");
  assert.match(hero,/height: min\(72%, 680px\);/);
  assert.match(hero,/transform: translateX\(-50%\);/);
  assert.match(hero,/transition: left 220ms ease, top 220ms ease, height 220ms ease;/);
  assert.match(dead,/left: 34%;/,"Dead phone shifts left to make room for supporting cards");
  assert.match(dead,/top: 15%;/);
  assert.match(dead,/height: min\(62%, 580px\);/,"Dead phone shrinks slightly");
  assert.match(css,/#holidayScreen \.china-final-power-notice \{[\s\S]*?top: 22%;[\s\S]*?right: 6%;/);
  assert.match(css,/#holidayScreen \.china-final-reaction \{[^}]*right:6%;left:auto;width:min\(34%,440px\)/);
  // Both composition states remain wholly within the stage, above bottom controls.
  assert.ok(14+72<=88,"Hero phone leaves at least 12% of stage clear at bottom");
  assert.ok(15+62<=85,"Off-state phone leaves more room for the reaction");
  assert.match(css, /@media \(prefers-reduced-motion:reduce\) \{[\s\S]*?\.china-final-phone-screen \{transition:none !important;\}/);
});

test("GAME-SP4.1G1A narrow stages use centred hero and shrink upwards for stacked dead-phone notices",()=>{
  const tablet=css.slice(css.indexOf("@media (max-width:800px) {",css.indexOf("#holidayScreen #marketScene,#holidayScreen #chinaFinalScene")),css.indexOf("@media (max-width:450px) {",css.indexOf("#holidayScreen #marketScene,#holidayScreen #chinaFinalScene")));
  assert.match(tablet,/china-final-phone \{height:min\(72%,520px\);max-width:65%;\}/);
  assert.match(tablet,/china-final-phone\[data-power="off"\] \{top:14%;left:30%;height:min\(60%,450px\);\}/);
  const portrait=css.slice(css.indexOf("@media (max-width:450px) {",css.indexOf("#holidayScreen #marketScene,#holidayScreen #chinaFinalScene")),css.indexOf("/* GAME-SP2.3C",css.indexOf("#holidayScreen #marketScene,#holidayScreen #chinaFinalScene")));
  assert.match(portrait,/china-final-phone \{top:5%;left:50%;height:70%;max-width:90%;transform:translateX\(-50%\);margin:0;\}/);
  assert.match(portrait,/china-final-phone\[data-power="off"\] \{top:5%;left:50%;height:46%;\}/);
  assert.match(portrait,/china-final-power-notice \{[\s\S]*?bottom:33%;/);
  assert.match(portrait,/china-final-reaction \{[\s\S]*?bottom:17%;/);
  const narrow=css.slice(css.indexOf("@media (min-width:451px) and (max-width:580px) {"));
  assert.match(narrow,/china-final-phone \{top:5%;left:50%;height:70%;max-width:88%;transform:translateX\(-50%\);margin:0;\}/);
  assert.match(narrow,/china-final-phone\[data-power="off"\] \{top:5%;left:50%;height:44%;\}/);
  assert.match(narrow,/china-final-power-notice \{top:auto;bottom:39%;/);
  assert.match(narrow,/china-final-reaction \{bottom:17%;/);
  assert.doesNotMatch(engine,/Message interrupted — not delivered/);
});


test("GAME-SP4.1G1A narrow phone layout keeps shutdown/reaction blocks above controls",()=>{
  // The two supported portrait breakpoints reserve a 17% bottom strip for
  // controls, and keep the flat-battery announcement higher up.
  for(const [width,offHeight,noticeBottom] of [[390,46,33],[580,44,39]]){
    const source=width<451
      ? css.slice(css.indexOf("@media (max-width:450px) {",css.indexOf("#holidayScreen #marketScene,#holidayScreen #chinaFinalScene")),css.indexOf("/* GAME-SP2.3C",css.indexOf("#holidayScreen #marketScene,#holidayScreen #chinaFinalScene")))
      : css.slice(css.indexOf("@media (min-width:451px) and (max-width:580px) {"));
    assert.match(source,new RegExp('phone\\[data-power="off"\\] \\{top:5%;left:50%;height:'+offHeight+'%;\\}'));
    assert.match(source,new RegExp('power-notice \\{[^}]*bottom:'+noticeBottom+'%;'));
    assert.match(source,/china-final-reaction \{[^}]*bottom:17%;/);
    assert.ok(5+offHeight<100-noticeBottom-9,"Off phone leaves a gap above the warning");
  }
});


test("GAME-SP4.1G1B approved postcard collage is versioned, materialised and included in the preview build",()=>{
  const img="transition-back-in-england-postcard-collage-v01.webp";
  const file="public/assets/generated/locations/"+img;
  const manifest=JSON.parse(read("generated-assets/manifests/game-sp41g1b-england-postcard-collage-v01.json"));
  assert.equal(manifest.schemaVersion,1);
  assert.equal(manifest.source.provider,"google-drive");
  assert.equal(manifest.source.fileId,"1dhu_9fDVe9K_7XqMDzN2m95Oq7qp9euU");
  assert.equal(manifest.expectedSourceName,"transition-back-in-england-postcard-collage-v01.png");
  assert.equal(manifest.destination,file);
  assert.equal(manifest.revision,1);
  const bytes=fs.readFileSync(path.join(root,file));
  assert.ok(bytes.length>20000&&bytes.length<=2*1024*1024);
  assert.equal(bytes.toString("ascii",0,4),"RIFF");
  assert.equal(bytes.toString("ascii",8,12),"WEBP");
  assert.match(read("scripts/build.mjs"),/"transition-back-in-england-postcard-collage-v01\.webp"/);
  assert.match(css,/#holidayScreen \.china-final-england \{[\s\S]*?transition-back-in-england-postcard-collage-v01\.webp/);
  assert.match(css,/#holidayScreen \.china-final-england h2 \{[\s\S]*?position: absolute;[\s\S]*?background: rgba\(7,27,47,\.85\);/);
  assert.doesNotMatch(css,/#holidayScreen \.china-final-england \{[^}]*background:#090e18/);
  assert.match(css,/@media \(max-width:800px\) \{[\s\S]*?\.china-final-england h2 \{/);
  assert.match(css,/@media \(max-width:450px\) \{[\s\S]*?\.china-final-england h2 \{/);
  const scene=html.slice(html.indexOf('id="chinaFinalEngland"'),html.indexOf('id="chinaFinalEngland"')+185);
  assert.match(scene,/>BACK IN ENGLAND…<\/h2>/);
  assert.doesNotMatch(scene,/NARRATOR|Meanwhile, back in England/,"Narration stays in a separate subtitle");
});

test("GAME-SP4.1G1B all three routes retain the existing England narrator and rescue-alarm handoff",()=>{
  for(const route of ["cult","detention","reassemble"]){
    let p;
    if(route==="cult"){
      p=toWallChoice();p.el("wallAcceptButton").click();p.el("wallGoIncidentButton").click();
    }else if(route==="detention"){
      p=toPalaceChoice();p.el("palaceAcceptButton").click();
      for(let i=0;i<5;i++)p.el("palaceNextButton").click();
      p.el("palaceGoIncidentButton").click();
    }else{
      p=toMarket();finishMarket(p);p.el("marketGoIncidentButton").click();
    }
    p.el("handoffContinueButton").click();
    p.el("chinaFinalNextButton").click();
    p.el("chinaFinalNextButton").click();
    assert.equal(saved(p).finalStep,2);
    assert.equal(saved(p).route,route);
    assert.equal(p.el("chinaFinalEngland").hidden,false);
    assert.equal(p.el("transitionNarration").hidden,false);
    assert.equal(p.el("transitionNarration").dataset.cue,"transition.england.back.001");
    assert.match(p.el("transitionNarrationLine").textContent,/back in England/);
    p.el("homeButton").click();p.el("resumeButton").click();
    assert.equal(p.el("chinaFinalEngland").hidden,false,"England collage survives save/resume");
    p.el("chinaFinalNextButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-alarm");
  }
});


test("GAME-SP4.1G1B prewarms the approved England postcard once as Chapter Two begins",()=>{
  const calls=[];
  const src="./public/assets/generated/locations/transition-back-in-england-postcard-collage-v01.webp";
  const p=preview({assetLoader:{warm(url){calls.push(url);}}});
  p.start();
  assert.deepEqual(calls,[],"Do not download distant Chapter Two scenery at menu/Chapter One startup");
  p.el("skipButton").click();
  assert.equal(saved(p).scene,"holiday");
  assert.equal(saved(p).holidayPhase,"transition");
  assert.deepEqual(calls,[src],"Predecode the England illustration as Chapter Two starts");
  p.el("chinaStartButton").click();
  for(let i=0;i<5;i++)p.el("wallNextButton").click();
  assert.deepEqual(calls,[src],"Do not issue duplicate downloads on successive dialogue renders");
  assert.match(read("src/asset-loader.js"),/function warm\(url\)/);
  assert.match(engine,/loader\.warm\(englandCollageSrc\)/);
  assert.doesNotMatch(html,/<link rel="preload"[^>]*transition-back-in-england-postcard-collage/);
});

test("GAME-SP4.1G1B honours Save-Data and still permits a valid late England scene",()=>{
  const calls=[];
  const p=preview({saveData:true,assetLoader:{warm(url){calls.push(url);}}});
  p.start();
  p.el("skipButton").click();
  assert.deepEqual(calls,[],"Data-saving users are not forced to prefetch distant artwork");
  p.el("chinaStartButton").click();
  for(let i=0;i<5;i++)p.el("wallNextButton").click();
  p.el("wallAcceptButton").click();
  p.el("wallGoIncidentButton").click();
  p.el("handoffContinueButton").click();
  p.el("chinaFinalNextButton").click();
  p.el("chinaFinalNextButton").click();
  assert.equal(p.el("chinaFinalEngland").hidden,false);
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.england.back.001");
});

test("GAME-SP4.1G1B missing asset loader never blocks narration or route progression",()=>{
  const p=preview();
  p.start();p.el("skipButton").click();
  p.el("chinaStartButton").click();
  for(let i=0;i<5;i++)p.el("wallNextButton").click();
  p.el("wallAcceptButton").click();
  p.el("wallGoIncidentButton").click();
  p.el("handoffContinueButton").click();
  p.el("chinaFinalNextButton").click();
  p.el("chinaFinalNextButton").click();
  assert.equal(p.el("chinaFinalEngland").hidden,false);
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.england.back.001");
});

// GAME-SP4 — voiced Summit gate, per-speaker responses, hints, and ending.
// Existing playable mechanics and save/resume continue to use the same states.
function voicedSummitAdmissions() {
  const p=voicedHotel("cult");
  for(let i=0;i<8;i++)p.el("hotelNextButton").click();
  p.el("hotelCultButton").click();
  for(let i=0;i<6;i++)p.el("hotelFinishButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-intro");
  return p;
}

test("Summit audio has exactly 44 unique approved IDs with unchanged comic dialogue",()=>{
  const f=story().SMP_RESCUE_FRAMEWORK.routes.cult;
  const summit=story().SMP_SUMMIT;
  const ids=[...Array.from(f.intro,x=>x.id)];
  for(let i=0;i<summit.rounds.length;i++){
    const round=summit.rounds[i];
    ids.push(round.promptId,round.hintId);
    for(const option of round.options){
      assert.equal(option.voices.map(x=>x.speaker+": "+x.text).join(" "),option.response);
      ids.push(...Array.from(option.voices,x=>x.id));
    }
  }
  ids.push(...Array.from(summit.ending,x=>x.id));
  assert.equal(ids.length,44);
  assert.equal(new Set(ids).size,44);
  assert.ok(ids.every(x=>/^summit\.[a-z0-9.]+$/.test(x)));
  assert.equal(summit.ending[13].speaker,"Narrator");
  assert.equal(summit.ending[13].id,"summit.ending.014");
  assert.ok(read("scripts/build.mjs").includes("summitIds.forEach(id => permitted.add"));
  assert.ok(read("scripts/build.mjs").includes("permitted.size !== 254"),"44 Summit voices plus 12 reserved narrator clips are whitelisted");
  assert.ok(fs.existsSync(path.join(root,"docs/SUMMIT-VOICE-IMPORT.md")));
});

test("Summit gate voices use natural clip timing then introduce check one's spoken prompt",async()=>{
  const p=voicedSummitAdmissions();
  const gate=p.voices.at(-1);
  assert.ok(gate.src.endsWith("summit.intro.001.mp3"));
  await Promise.resolve();
  assert.equal(p.timeouts.size,0);
  gate.finish();
  assert.equal(Array.from(p.timeouts.values())[0].delay,260);
  p.tick();
  assert.ok(p.voices.at(-1).src.endsWith("summit.intro.002.mp3"));
  for(let i=1;i<=7;i++)p.el("routeIntroNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-minigame");
  const prompt=p.voices.at(-1);
  assert.ok(prompt.src.endsWith("summit.check.001.prompt.mp3"));
  prompt.finish();
  assert.equal(p.el("holidayNextButton").hidden,true,"A question never chooses an answer automatically");
  assert.equal(p.timeouts.size,0);
});

test("Summit answer plays both speakers, pauses naturally and waits on wrong choice",async()=>{
  const p=voicedSummitAdmissions();
  for(let i=0;i<=7;i++)p.el("routeIntroNextButton").click();
  p.el("summitChoice0").click();
  const gatekeeper=p.voices.at(-1);
  assert.ok(gatekeeper.src.endsWith("summit.check.001.vase.001.mp3"));
  await Promise.resolve();
  p.el("holidayPauseButton").click();
  assert.equal(gatekeeper.paused,true);
  p.el("holidayPauseButton").click();
  await Promise.resolve();
  assert.equal(gatekeeper.playCount,2);
  gatekeeper.finish();p.tick();
  assert.ok(p.voices.at(-1).src.endsWith("summit.check.001.vase.002.mp3"));
  p.el("holidayNextButton").click();
  assert.equal(saved(p).summitVoiceStep,null);
  assert.equal(saved(p).rescueProgress.miniGameStage,0);
  assert.equal(p.el("holidayNextButton").hidden,true);
  const total=p.voices.length;
  p.el("summitChoice0").click();
  assert.ok(p.voices.at(-1).src.endsWith("summit.check.001.vase.001.mp3"));
  assert.equal(p.voices.length,total+1,"Selecting the same wrong choice restarts its first MP3");
});

test("Summit hints play once per round and correct answer reaches check two only after voice completion",async()=>{
  const p=voicedSummitAdmissions();
  for(let i=0;i<=7;i++)p.el("routeIntroNextButton").click();
  p.el("summitChoice0").click();
  p.el("holidayNextButton").click();p.el("holidayNextButton").click();
  p.el("summitChoice1").click();
  p.el("holidayNextButton").click();p.el("holidayNextButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("summit.check.001.hint.mp3"));
  p.el("holidayNextButton").click();
  assert.equal(saved(p).summitHintHeard,true);
  p.el("summitChoice0").click();
  p.el("holidayNextButton").click();p.el("holidayNextButton").click();
  assert.equal(p.el("holidayNextButton").hidden,true,"Round hint must not repeat");
  p.el("summitChoice2").click();
  assert.ok(p.voices.at(-1).src.endsWith("summit.check.001.charger.001.mp3"));
  await Promise.resolve();
  const first=p.voices.at(-1);first.finish();p.tick();
  assert.ok(p.voices.at(-1).src.endsWith("summit.check.001.charger.002.mp3"));
  assert.equal(saved(p).rescueProgress.miniGameStage,1);
  assert.equal(p.el("summitRoundTitle").textContent,"Offer a sacred object");
  const second=p.voices.at(-1);second.finish();p.tick();
  assert.equal(saved(p).summitVoiceStep,null);
  assert.equal(p.voices.at(-1).paused,true);
  p.tick();
  assert.equal(p.el("summitRoundTitle").textContent,"Recite the highest compliment");
  assert.ok(p.voices.at(-1).src.endsWith("summit.check.002.prompt.mp3"));
  assert.equal(saved(p).summitHintHeard,false,"Hint reset for next admission check");
});

test("Summit ending voices all fourteen lines including Narrator; summary title stays silent",()=>{
  const p=voicedSummitAdmissions();
  for(let i=0;i<=7;i++)p.el("routeIntroNextButton").click();
  for(const idx of [2,1,2]){
    p.el("summitChoice"+idx).click();
    p.el("summitNextButton").click();
  }
  assert.equal(saved(p).holidayPhase,"rescue-route-ending");
  for(let i=1;i<=14;i++){
    assert.ok(p.voices.at(-1).src.endsWith("summit.ending."+String(i).padStart(3,"0")+".mp3"));
    p.el("summitEndingNextButton").click();
  }
  const last=p.voices.at(-1);
  assert.equal(last.paused,true);
  assert.equal(p.el("summitEndingLine").textContent,"ENDING A: HEAVEN WAS A PLACE ON EARTH");
  assert.equal(p.el("holidayNextButton").hidden,false);
  p.el("summitEndingNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-ending-summary");
});

test("Missing Summit voice falls back to text-timed progression; skipped response cancels prior clip",async()=>{
  const p=voicedSummitAdmissions();
  const first=p.voices.at(-1);
  await Promise.resolve();first.fail();
  assert.equal(p.timeouts.size,1);
  p.tick();
  assert.ok(p.voices.at(-1).src.endsWith("summit.intro.002.mp3"));
  for(let i=1;i<=7;i++)p.el("routeIntroNextButton").click();
  p.el("summitChoice0").click();
  const wrong=p.voices.at(-1);
  p.el("summitChoice2").click();
  assert.equal(wrong.paused,true);
  assert.ok(p.voices.at(-1).src.endsWith("summit.check.001.charger.001.mp3"));
});

// GAME-SP4 — all remaining narration must be packaged without affecting
// unrecorded Ending B/C character dialogue or the already-voiced Summit ending.
test("Narration audit finds exactly 14 remaining narrator IDs with distinct approved texts",()=>{
  const s=story();
  const d=s.SMP_DETENTION.ending, c=s.SMP_REASSEMBLE.ending;
  assert.equal(d.length,14);
  assert.equal(c.length,15);
  assert.equal(d.at(-1).id,"detention.ending.014");
  assert.equal(c.at(-1).id,"reassemble.ending.015");
  assert.equal(d.at(-1).speaker,"Narrator");
  assert.equal(c.at(-1).speaker,"Narrator");
  assert.match(d.at(-1).text,/PLEASE LEAVE certificate/);
  assert.match(c.at(-1).text,/cardboard display/);
  assert.equal(d.filter(line=>line.speaker==="Narrator").length,1);
  assert.equal(c.filter(line=>line.speaker==="Narrator").length,1);
  assert.ok(d.slice(0,-1).every((line,i)=>line.id === "detention.ending."+String(i+1).padStart(3,"0")),"Ending B now has all its actor voice IDs");
  assert.ok(c.slice(0,-1).every((line,i)=>line.id === "reassemble.ending."+String(i+1).padStart(3,"0")));
  const src=read("scripts/build.mjs");
  assert.ok(src.includes('closingNarrators.forEach(({id})=>permitted.add(id+".mp3"))'));
  assert.ok(src.includes("permitted.size !== 254"));
  assert.ok(src.includes('"/254 maximum (215 established voices + 39 Ending C recordings)."'));
  assert.ok(fs.existsSync(path.join(root,"docs/REMAINING-NARRATION-VOICE-IMPORT.md")));
});

function toVoicedEndingNarrator(route) {
  const p=voicedHotel(route);
  const snapshot=saved(p), ending=route==="detention"
    ? story().SMP_DETENTION.ending : story().SMP_REASSEMBLE.ending;
  snapshot.hubMatched=true;
  snapshot.holidayPhase="rescue-route-ending";
  snapshot.rescueProgress={
    version:1,route,introStep:7,miniGameStage:route==="detention"?3:6,
    wrongAnswers:0,hintVisible:false,finished:true,endingStep:ending.length-1,
    placedParts:route==="reassemble"
      ? ["head","torso","left-arm","right-arm","left-leg","right-leg"] : []
  };
  if(route==="reassemble")snapshot.assemblyPowered=true;
  p.el("homeButton").click();
  p.stored.set("stephen-martin-game-sp1-save-v1",JSON.stringify(snapshot));
  p.el("resumeButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-ending");
  return p;
}

test("Ending B and C narrator stingers play as MP3s and leave end cards silent",async()=>{
  const cases=[
    ["detention","detention.ending.014.mp3","detentionEndingLine"],
    ["reassemble","reassemble.ending.015.mp3","assemblyEndingLine"]
  ];
  for(const [route,filename,lineId] of cases){
    const p=toVoicedEndingNarrator(route);
    const voice=p.voices.at(-1);
    assert.ok(voice.src.endsWith(filename),route+" narrator file");
    await Promise.resolve();
    assert.equal(p.timeouts.size,0,"Narrator duration owns ending timing");
    voice.finish();
    assert.equal(p.timeouts.size,1);
    p.tick();
    assert.equal(p.voices.at(-1).paused,true);
    assert.match(p.el(lineId).textContent,/ENDING [BC]/);
    assert.equal(p.timeouts.size,1,"End-card text still advances via normal timer");
  }
});

test("Ending B narrator falls back when unavailable; skipped Ending C clip is cancelled",async()=>{
  const p=toVoicedEndingNarrator("detention");
  const voice=p.voices.at(-1);
  await Promise.resolve();
  voice.fail();
  assert.equal(p.timeouts.size,1);
  assert.ok(Array.from(p.timeouts.values())[0].delay>=2600);
  p.tick();
  assert.match(p.el("detentionEndingLine").textContent,/ENDING B/);
  const q=toVoicedEndingNarrator("reassemble");
  const clip=q.voices.at(-1);
  await Promise.resolve();
  q.el("holidayNextButton").click();
  assert.equal(clip.paused,true);
  assert.equal(clip.onended,null);
  assert.match(q.el("assemblyEndingLine").textContent,/ENDING C/);
});




/* GAME-SP4.1G1C — Three-route Chapter 2 handoff QA.
 * Drive the real scene handlers, never mutate saves to fabricate a route.
 * Keep this suite isolated from artwork, dialogue and the separate voice work.
 */
function g1cToHandoff(route,{audio=false}={}) {
  const p=preview({audio});p.start();p.el("skipButton").click();
  p.el("chinaStartButton").click();
  for(let i=0;i<5;i++)p.el("wallNextButton").click();
  if(route==="cult"){
    p.el("wallAcceptButton").click();
    p.el("wallGoIncidentButton").click();
  } else {
    p.el("wallDeclineButton").click();p.el("wallGoPalaceButton").click();
    p.el("intermissionContinueButton").click();
    for(let i=0;i<4;i++)p.el("palaceNextButton").click();
    if(route==="detention"){
      p.el("palaceAcceptButton").click();
      for(let i=0;i<5;i++)p.el("palaceNextButton").click();
      p.el("palaceGoIncidentButton").click();
    } else {
      assert.equal(route,"reassemble","Unknown route is not a valid handoff");
      p.el("palaceDeclineButton").click();p.el("palaceGoMarketButton").click();
      p.el("intermissionContinueButton").click();
      for(let i=0;i<6;i++)p.el("marketNextButton").click();
      p.el("marketGoIncidentButton").click();
    }
  }
  assert.equal(saved(p).holidayPhase,"route-handoff");
  assert.equal(saved(p).route,route);
  return p;
}

test("GAME-SP4.1G1C all three endings preserve received fragments, checkpoint saves and the real David/Paul alarm",()=>{
  const routes=["cult","detention","reassemble"];
  const canonical=story().SMP_CHINA_FINAL.messageByRoute;
  for(const route of routes){
    const p=g1cToHandoff(route);
    p.el("handoffContinueButton").click();
    assert.equal(saved(p).finalStep,0);
    assert.equal(saved(p).route,route);
    assert.equal(p.el("chinaFinalPhone").dataset.power,"low");
    assert.equal(p.el("chinaPhoneMessage").textContent,canonical[route]);
    assert.equal(p.el("chinaPhoneStatus").textContent,"Partial message delivered");
    assert.equal(p.el("chinaFinalEngland").hidden,true);
    p.el("homeButton").click();p.el("resumeButton").click();
    assert.equal(saved(p).finalStep,0,"Full 1%-message checkpoint resumes without skipping a beat");
    assert.equal(p.el("chinaPhoneMessage").textContent,canonical[route]);
    p.el("chinaFinalNextButton").click();
    assert.equal(saved(p).finalStep,1);
    assert.equal(p.el("chinaFinalPhone").dataset.power,"off");
    assert.equal(p.el("chinaPhonePowerNotice").hidden,false);
    assert.equal(p.el("chinaFinalReaction").hidden,false);
    assert.equal(p.el("chinaPhoneMessage").textContent,canonical[route]);
    p.el("homeButton").click();p.el("resumeButton").click();
    assert.equal(saved(p).finalStep,1,"Dead phone must stay dead after resume");
    assert.equal(p.el("chinaFinalPhone").dataset.power,"off");
    assert.equal(p.el("chinaPhonePowerNotice").hidden,false);
    p.el("chinaFinalNextButton").click();
    assert.equal(saved(p).finalStep,2);
    assert.equal(p.el("chinaFinalEngland").hidden,false);
    assert.equal(p.el("chinaFinalPhone").hidden,true);
    assert.equal(p.el("chinaPhonePowerNotice").hidden,true);
    assert.equal(p.el("transitionNarration").hidden,false);
    assert.equal(p.el("transitionNarration").dataset.cue,"transition.england.back.001");
    assert.equal(p.el("chinaFinalNextButton").textContent,"Back to David and Paul →");
    p.el("homeButton").click();p.el("resumeButton").click();
    assert.equal(saved(p).finalStep,2,"Back in England checkpoint resumes unchanged");
    assert.equal(saved(p).route,route);
    assert.equal(p.el("transitionNarration").dataset.cue,"transition.england.back.001");
    p.el("chinaFinalNextButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-alarm");
    assert.equal(saved(p).rescueAlarmStep,0);
    assert.equal(p.el("transitionNarration").hidden,true,"England subtitle clears once alarm starts");
    assert.equal(p.el("rescueAlarmScene").hidden,false);
    assert.equal(p.el("rescueAlarmSpeaker").textContent,"DAVID");
    assert.equal(p.el("rescueAlarmPhoneText").textContent,canonical[route]);
    for(let n=0;n<5;n++)p.el("rescueAlarmNextButton").click();
    assert.equal(p.el("rescueAlarmPhone").hidden,false,"David and Paul can examine the delivered partial message");
    assert.equal(p.el("rescueAlarmPhoneText").textContent,canonical[route]);
    p.el("rescueAlarmNextButton").click();
    assert.match(p.el("rescueAlarmLine").textContent,/battery/i,"Paul's benign battery explanation survives all routes");
    assert.equal(saved(p).route,route);
  }
});

test("GAME-SP4.1G1C paused/manual Next invalidates Stephen's old voice before England narration",async()=>{
  const p=g1cToHandoff("cult",{audio:true});
  p.el("handoffContinueButton").click();
  assert.equal(saved(p).finalStep,0);
  p.el("chinaFinalNextButton").click();
  assert.equal(saved(p).finalStep,1);
  const stephen=p.voices.at(-1);
  assert.match(stephen.src,/china\.final\.001\.mp3$/);
  await Promise.resolve();
  assert.equal(typeof stephen.onended,"function");
  const stale=stephen.onended;
  p.el("holidayPauseButton").click();
  assert.equal(stephen.paused,true);
  assert.equal(p.el("holidayScreen").dataset.autoAdvance,"paused");
  p.el("holidayNextButton").click();
  assert.equal(saved(p).finalStep,2);
  assert.equal(stephen.onended,null,"The old Stephen cue is detached on Next");
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.england.back.001");
  stale(); // Simulate a late recorded completion from the prior beat.
  assert.equal(saved(p).finalStep,2,"Stale voice must not skip the illustrated England shot");
  assert.equal(p.timeouts.size,0,"Stale callback must not enqueue an autoplay step while paused");
  p.el("holidayPauseButton").click();
  await Promise.resolve();
  const narrator=p.voices.at(-1);
  assert.match(narrator.src,/transition\.england\.back\.001\.mp3$/);
  assert.equal(typeof narrator.onended,"function");
  const oldEngland=narrator.onended;
  p.el("chinaFinalNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-alarm");
  assert.equal(narrator.onended,null,"England narration cannot continue over the alarm");
  oldEngland();
  assert.equal(saved(p).rescueAlarmStep,0,"Late narrator must not skip David's first line");
  assert.equal(p.el("transitionNarration").hidden,true);
});

test("GAME-SP4.1G1C optional England MP3 failure keeps subtitles and follows the timed fallback",async()=>{
  const p=g1cToHandoff("detention",{audio:true});
  p.el("handoffContinueButton").click();
  p.el("chinaFinalNextButton").click();
  p.el("chinaFinalNextButton").click();
  assert.equal(saved(p).finalStep,2);
  await Promise.resolve();
  const clip=p.voices.at(-1);
  assert.match(clip.src,/transition\.england\.back\.001\.mp3$/);
  assert.equal(p.el("transitionNarration").hidden,false);
  clip.fail();
  assert.equal(p.el("transitionNarration").dataset.audio,"text-fallback");
  assert.equal(p.el("chinaFinalEngland").hidden,false);
  assert.equal(p.timeouts.size,1,"England still has a safe fallback duration");
  assert.equal(Array.from(p.timeouts.values())[0].delay,3600);
  p.tick();
  assert.equal(saved(p).holidayPhase,"rescue-alarm");
  assert.equal(p.el("rescueAlarmPhoneText").textContent,story().SMP_CHINA_FINAL.messageByRoute.detention);
  assert.equal(p.el("transitionNarration").hidden,true);
});

test("GAME-SP4.1G1C Sound Off and contextual Skip preserve a locked route without completing a puzzle",()=>{
  for(const route of ["cult","detention","reassemble"]){
    const p=g1cToHandoff(route,{audio:true});
    p.el("handoffContinueButton").click();
    p.el("holidaySoundButton").click();
    assert.equal(p.el("holidaySoundButton").textContent,"Sound: Off");
    assert.equal(p.el("chinaPhoneMessage").textContent,story().SMP_CHINA_FINAL.messageByRoute[route]);
    p.el("chinaFinalNextButton").click();
    p.el("chinaFinalNextButton").click();
    assert.equal(p.el("transitionNarration").hidden,false,"Sound Off cannot remove live narrator text");
    assert.match(p.el("holidaySkipButton").textContent,/Skip to investigation/);
    p.el("holidaySkipButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-hotel");
    assert.equal(saved(p).route,route);
    assert.notEqual(saved(p).hubMatched,true);
    assert.equal(saved(p).hubWrongGuesses,0);
    assert.equal(saved(p).hubActiveClue,null);
    assert.equal(p.el("transitionNarration").hidden,true);
    assert.equal(p.el("rescueHotelScene").hidden,false);
  }
});

test("GAME-SP4.1G1C England/phone layout retains distinct title, captions and responsive boundaries",()=>{
  const phone=html.slice(html.indexOf('id="chinaFinalScene"'),html.indexOf('id="rescueAlarmScene"'));
  const england=phone.slice(phone.indexOf('id="chinaFinalEngland"'),phone.indexOf('id="chinaFinalEngland"')+150);
  assert.match(england,/>BACK IN ENGLAND…<\/h2>/);
  assert.doesNotMatch(england,/NARRATOR|Meanwhile/);
  assert.match(phone,/id="chinaPhonePowerNotice"[^>]*aria-live="polite"/);
  assert.match(phone,/id="chinaFinalReaction"/);
  assert.match(css,/#holidayScreen \.china-final-phone\[data-power="off"\] \{[^}]*left: 34%;/);
  assert.match(css,/#holidayScreen \.china-final-england \{[\s\S]*?transition-back-in-england-postcard-collage-v01\.webp/);
  assert.match(css,/#holidayScreen \.china-final-controls \{position:absolute;z-index:8;bottom:0;/);
  assert.match(css,/#holidayScreen \.transition-narration \{[\s\S]*?z-index:22;/);
  assert.match(css,/@media \(max-width:800px\) \{[\s\S]*?china-final-england h2/);
  assert.match(css,/@media \(max-width:450px\) \{[\s\S]*?china-final-england h2/);
  assert.match(css,/@media \(prefers-reduced-motion:reduce\) \{[\s\S]*?china-final-phone-screen \{transition:none !important;\}/);
  assert.doesNotMatch(engine,/Message interrupted — not delivered/);
});


// GAME-SP4.1H-B: all 45 character clips and existing Ending B narrator.
test("Ending B 45 canonical voice IDs preserve each original form response and approved dialogue",()=>{
  const route=story().SMP_RESCUE_FRAMEWORK.routes.detention;
  const data=story().SMP_DETENTION;
  const ids=[...Array.from(route.intro,b=>b.id)];
  for(let i=0;i<3;i++){
    const round=data.rounds[i];
    ids.push(round.promptId,round.hintId);
    for(const option of round.options){
      ids.push(...Array.from(option.voices,b=>b.id));
      assert.equal(option.response,option.voices.map(b=>b.speaker+": "+b.text).join(" "));
    }
    if(round.approvedVoices)ids.push(...Array.from(round.approvedVoices,b=>b.id));
  }
  ids.push(...Array.from(data.stampSelectedVoices,b=>b.id));
  ids.push(...Array.from(data.ending.slice(0,-1),b=>b.id));
  assert.equal(ids.length,45);
  assert.equal(new Set(ids).size,45);
  assert.ok(ids.every(id=>/^detention\.[a-z0-9.-]+$/.test(id)));
  assert.equal(data.ending.at(-1).id,"detention.ending.014");
  assert.equal(data.rounds[2].approvedVoices[0].text,"APPROVED: ALL OF YOU PLEASE LEAVE.");
  assert.equal(data.rounds[2].approvedResponse,"OFFICIAL: APPROVED: ALL OF YOU PLEASE LEAVE. The printer releases a celebratory shower of unwanted paper.");
  assert.ok(read("scripts/build.mjs").includes("detentionIds.forEach(id=>permitted.add(id+"));
  assert.ok(read("scripts/build.mjs").includes("permitted.size !== 254"));
  assert.ok(fs.existsSync(path.join(root,"docs/ENDING-B-VOICE-IMPORT.md")));
});

function voicedDetention() {
  const p=voicedHotel("detention");
  for(let i=0;i<8;i++)p.el("hotelNextButton").click();
  p.el("hotelDetentionButton").click();
  for(let i=0;i<6;i++)p.el("hotelFinishButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-intro");
  return p;
}
function voicedDetentionPuzzle() {
  const p=voicedDetention();
  for(let i=0;i<=6;i++)p.el("routeIntroNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-minigame");
  return p;
}

test("Ending B official route intro plays six existing lines then first spoken form prompt",async()=>{
  const p=voicedDetention();
  const first=p.voices.at(-1);
  assert.ok(first.src.endsWith("detention.intro.001.mp3"));
  await Promise.resolve();
  assert.equal(p.timeouts.size,0);
  first.finish();
  assert.equal(Array.from(p.timeouts.values())[0].delay,260);
  p.tick();
  assert.ok(p.voices.at(-1).src.endsWith("detention.intro.002.mp3"));
  for(let i=1;i<=6;i++)p.el("routeIntroNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-minigame");
  assert.ok(p.voices.at(-1).src.endsWith("detention.form.001.prompt.mp3"));
  assert.equal(p.el("holidayNextButton").hidden,true,"Form choices remain manual");
});

test("Ending B wrong-answer character voices sequence then Paul hint plays once",()=>{
  const p=voicedDetentionPuzzle();
  p.el("detentionChoice0").click();
  assert.ok(p.voices.at(-1).src.endsWith("detention.form.001.operation.001.mp3"));
  p.el("holidayNextButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("detention.form.001.operation.002.mp3"));
  p.el("holidayNextButton").click();
  assert.equal(p.el("holidayNextButton").hidden,true);
  p.el("detentionChoice2").click();
  assert.ok(p.voices.at(-1).src.endsWith("detention.form.001.meal.001.mp3"));
  p.el("holidayNextButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("detention.form.001.meal.002.mp3"));
  p.el("holidayNextButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("detention.form.001.hint.mp3"));
  p.el("holidayNextButton").click();
  assert.equal(saved(p).detentionHintHeard,true);
  p.el("detentionChoice0").click();
  p.el("holidayNextButton").click();
  p.el("holidayNextButton").click();
  assert.equal(p.el("holidayNextButton").hidden,true);
  assert.equal(saved(p).rescueProgress.miniGameStage,0);
});

test("Ending B correct response finishes both speakers before changing forms",async()=>{
  const p=voicedDetentionPuzzle();
  p.el("detentionChoice1").click();
  const voice=p.voices.at(-1);
  assert.ok(voice.src.endsWith("detention.form.001.retrieve.001.mp3"));
  assert.equal(saved(p).rescueProgress.miniGameStage,1);
  await Promise.resolve();
  voice.finish();p.tick();
  assert.ok(p.voices.at(-1).src.endsWith("detention.form.001.retrieve.002.mp3"));
  assert.equal(saved(p).detentionResponse.correct,true);
  const second=p.voices.at(-1);
  second.finish();p.tick();
  assert.equal(saved(p).detentionVoiceStep,null);
  p.tick();
  assert.equal(saved(p).detentionResponse,undefined);
  assert.equal(saved(p).rescueProgress.miniGameStage,1);
  assert.ok(p.voices.at(-1).src.endsWith("detention.form.002.prompt.mp3"));
});

test("Ending B stamp selection and Official approval are voice-only, narration stays recorded",()=>{
  const p=voicedDetentionPuzzle();
  for(const correct of [1,2]){
    p.el("detentionChoice"+correct).click();
    p.el("detentionNextButton").click();
  }
  assert.equal(saved(p).rescueProgress.miniGameStage,2);
  p.el("detentionChoice2").click();
  assert.ok(p.voices.at(-1).src.endsWith("detention.form.003.drink.001.mp3"));
  p.el("detentionStampButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("detention.stamp.selected.001.mp3"));
  p.el("holidayNextButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("detention.stamp.selected.002.mp3"));
  p.el("detentionPermitButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("detention.stamp.approved.001.mp3"));
  assert.equal(saved(p).rescueProgress.finished,true);
  p.el("detentionNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-ending");
  for(let i=1;i<=14;i++){
    assert.ok(p.voices.at(-1).src.endsWith("detention.ending."+String(i).padStart(3,"0")+".mp3"));
    p.el("detentionEndingNextButton").click();
  }
  assert.match(p.el("detentionEndingLine").textContent,/ENDING B/);
});

test("GAME-SP4.1G3A Summit staging makes a moderate left shift on smaller screens",()=>{
  const start=css.indexOf("/* SP4.0B — Owner-approved Summit entrance cast");
  const end=css.indexOf("/* GAME-SP4.0C",start);
  assert.ok(start>=0 && end>start,"Summit style section is present");
  const summitCss=css.slice(start,end);
  const wide=summitCss.split("@media (max-width:1500px)")[0];
  const laptop=summitCss.split("@media (max-width:1500px)")[1].split("@media (max-width:800px)")[0];
  const tablet=summitCss.split("@media (max-width:800px)")[1].split("@media (max-width:450px)")[0];
  const phone=summitCss.split("@media (max-width:450px)")[1];
  const rule=(part,actor)=>{
    const marker=".summit-entrance-"+actor+" {";
    const i=part.indexOf(marker);
    assert.ok(i>=0,actor+" CSS present");
    return part.slice(i+marker.length,part.indexOf("}",i));
  };
  const percent=(block,name)=>{
    const match=block.match(new RegExp(name+":(-?\\d+)%"));
    assert.ok(match,name+" must have a percent position");
    return Number(match[1]);
  };
  assert.equal(percent(rule(wide,"paul"),"right"),40,"Wide-screen Paul unchanged");
  assert.equal(percent(rule(wide,"david"),"right"),22,"Wide-screen David unchanged");
  for(const [name,part,paulRight,davidRight,bottom] of [
    ["laptop",laptop,45,27,null],
    ["tablet",tablet,42,24,27],
    ["phone",phone,41,12,31]
  ]){
    const paul=rule(part,"paul"),david=rule(part,"david");
    assert.equal(percent(paul,"right"),paulRight,name+" Paul is modestly left");
    assert.equal(percent(david,"right"),davidRight,name+" David is modestly left");
    assert.ok(percent(paul,"right")>percent(david,"right"),name+" keeps Paul to David's left");
    if(bottom!==null){
      assert.equal(percent(paul,"bottom"),bottom,name+" Paul stays grounded");
      assert.equal(percent(david,"bottom"),bottom,name+" David shares groundline");
      assert.ok(percent(rule(part,"gatekeeper"),"left")>=0,"Gatekeeper stays on left side");
    }else{
      assert.doesNotMatch(paul+" "+david,/height:|bottom:|left:/,"Laptop actor overrides change horizontal placement only");
    }
  }
  assert.ok(summitCss.includes("transform:scaleX(-1);"),"Approved sprite mirroring remains");
  assert.doesNotMatch(summitCss,/summit-throne/,"Do not restage throne-room actors");
});

test("GAME-SP4.1G3B Summit status reflects a rescue attempt, leaving B/C copy untouched",()=>{
  const p=toHotelInvestigation("cult");
  completeHotelIntro(p);
  p.el("hotelCultButton").click();
  for(let i=0;i<6;i++)p.el("hotelFinishButton").click();
  const intro=story().SMP_RESCUE_FRAMEWORK.routes.cult.intro;
  assert.equal(p.el("routeIntroPhaseLabel").textContent,"Investigation complete · Summit approach");
  assert.equal(p.el("routeIntroStatus").textContent,"Rescue attempt · Summit entrance · 1 of "+intro.length);
  for(let i=0;i<intro.length;i++)p.el("routeIntroNextButton").click();
  assert.equal(p.el("routeIntroStatus").textContent,"Approach complete · The Summit Admissions Test next.");
  p.el("routeIntroNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-minigame");
  assert.equal(p.el("summitAdmissions").hidden,false);
  for(const route of ["detention","reassemble"]){
    const q=toHotelInvestigation(route);
    completeHotelIntro(q);
    q.el("hotel"+route[0].toUpperCase()+route.slice(1)+"Button").click();
    for(let i=0;i<6;i++)q.el("hotelFinishButton").click();
    assert.equal(q.el("routeIntroPhaseLabel").textContent,route==="detention"
      ? "Investigation complete · Release office"
      : "Investigation complete · Rescue briefing");
    assert.match(q.el("routeIntroStatus").textContent,route==="detention"
      ? /^Ceremonial release process · 1 of / : /^Rescue briefing · 1 of /);
  }
});


// GAME-SP4.1H-C: exact owner-approved spa line count and strict case mapping.
test("Ending C has 39 independent actor clips with unchanged puzzle reaction text",()=>{
  const route=story().SMP_RESCUE_FRAMEWORK.routes.reassemble;
  const spa=story().SMP_REASSEMBLE;
  const ids=[...Array.from(route.intro,line=>line.id),
    ...Array.from(spa.ending.slice(0,-1),line=>line.id),
    ...Object.values(spa.reactionVoices).flatMap(lines=>Array.from(lines,line=>line.id)),
    ...Array.from(spa.fitVoices,line=>line.id),
    ...Array.from(spa.noSelectionVoices,line=>line.id),
    ...Object.values(spa.hintVoices).map(line=>line.id)];
  assert.equal(route.intro.length,7);
  assert.equal(spa.ending.length,15);
  assert.equal(spa.ending.at(-1).id,"reassemble.ending.015");
  assert.equal(ids.length,39);
  assert.equal(new Set(ids).size,39);
  assert.ok(ids.every(id=>/^reassemble\.[a-z0-9.-]+$/.test(id)));
  for(const [part,slot] of [["wifi-heart","head"],["toaster","head"],["banana","torso"],
    ["kidney-1","head"],["spleen","head"],["head","left-arm"],["right-arm","head"]]){
    assert.equal(spa.reaction(part,slot),
      Array.from(spa.reactionVoice(part,slot),line=>line.speaker+": "+line.text).join(" "));
  }
  assert.equal(spa.hintVoice("head").text,
    "Match the Head shape to the standee. He faces us, so his left is on your right.");
  assert.equal(spa.hintVoice("kidney-1").text,
    "Try the six normal cardboard bits. Spare kidneys, Wi-Fi hearts and toasters are extras.");
  assert.ok(read("scripts/build.mjs").includes("assemblyIds.forEach(id=>permitted.add(id+"));
  assert.ok(read("scripts/build.mjs").includes("permitted.size !== 254"));
  assert.ok(fs.existsSync(path.join(root,"docs/ENDING-C-VOICE-IMPORT.md")));
});

function voicedSpaIntro() {
  const p=voicedHotel("reassemble");
  for(let i=0;i<8;i++)p.el("hotelNextButton").click();
  p.el("hotelReassembleButton").click();
  for(let i=0;i<6;i++)p.el("hotelFinishButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-intro");
  return p;
}
function voicedSpaPuzzle() {
  const p=voicedSpaIntro();
  for(let i=0;i<8;i++)p.el("routeIntroNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-minigame");
  return p;
}
test("Spa approach speaks seven actors in order before entering unattempted puzzle",()=>{
  const p=voicedSpaIntro();
  assert.ok(p.voices.at(-1).src.endsWith("reassemble.intro.001.mp3"));
  p.el("routeIntroNextButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("reassemble.intro.002.mp3"));
  for(let i=1;i<=7;i++)p.el("routeIntroNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-minigame");
  assert.equal(saved(p).rescueProgress.miniGameStage,0);
});


test("Spa piece selection, wrong-piece reactions and hints use individual clip timings",async()=>{
  const p=voicedSpaPuzzle();
  p.el("assemblyPiece6").click(); // First kidney is a decoy.
  p.el("assemblySlot0").click();
  assert.ok(p.voices.at(-1).src.endsWith("reassemble.reaction.kidney.001.mp3"));
  assert.equal(saved(p).rescueProgress.miniGameStage,0);
  p.el("holidayNextButton").click();
  p.el("assemblyPiece7").click(); // Second mistake unlocks Paul.
  p.el("assemblySlot0").click();
  assert.ok(p.voices.at(-1).src.endsWith("reassemble.reaction.kidney.001.mp3"));
  p.el("holidayNextButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("reassemble.hint.general.001.mp3"));
  p.el("holidayNextButton").click();
  assert.equal(saved(p).assemblyHintsHeard["reassemble.hint.general.001"],true);
  p.el("assemblyPiece0").click();
  assert.ok(p.voices.at(-1).src.endsWith("reassemble.hint.head.001.mp3"));
  p.el("holidayNextButton").click();
  assert.equal(saved(p).assemblyHintsHeard["reassemble.hint.head.001"],true);
  assert.equal(saved(p).rescueProgress.miniGameStage,0);
});

test("Spa voice follows the six manually fitted pieces and all fifteen ending lines",async()=>{
  const p=voicedSpaPuzzle();
  for(let i=0;i<6;i++){
    p.el("assemblyPiece"+i).click();
    p.el("assemblySlot"+i).click();
    assert.ok(p.voices.at(-1).src.endsWith("reassemble.reaction.fit.001.mp3"));
    assert.equal(saved(p).rescueProgress.miniGameStage,i+1);
  }
  assert.equal(saved(p).rescueProgress.finished,true);
  p.el("assemblyPowerButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-ending");
  for(let i=1;i<=15;i++){
    const filename="reassemble.ending."+String(i).padStart(3,"0")+".mp3";
    assert.ok(p.voices.at(-1).src.endsWith(filename),filename);
    p.el("assemblyEndingNextButton").click();
  }
  assert.match(p.el("assemblyEndingLine").textContent,/ENDING C/);
});

test("Spa reactions split David and Paul, cancel stale audio and keep puzzle manual",()=>{
  const p=voicedSpaPuzzle();
  p.el("assemblyPiece9").click(); // Wi-Fi heart decoy
  p.el("assemblySlot0").click();
  assert.ok(p.voices.at(-1).src.endsWith("reassemble.reaction.wifi-heart.001.mp3"));
  p.el("holidayNextButton").click();
  assert.ok(p.voices.at(-1).src.endsWith("reassemble.reaction.wifi-heart.002.mp3"));
  const old=p.voices.at(-1);
  p.el("assemblyPiece10").click(); // Toaster decoy cancels old clip
  assert.equal(old.paused,true);
  p.el("assemblySlot0").click();
  assert.ok(p.voices.at(-1).src.endsWith("reassemble.reaction.toaster.001.mp3"));
  assert.equal(saved(p).rescueProgress.miniGameStage,0);
});


test("GAME-SP4.1H-C1 spa final dialogue stays a short bottom bubble, not a full-height workshop card",()=>{
  const styles=read("src/styles.css");
  const scene=html.slice(html.indexOf('id="reassembleEndingScene"'),
    html.indexOf('id="rescueEndingSummary"'));
  assert.match(scene,/class="assembly-ending-content story-speech"/);
  assert.match(scene,/id="assemblyEndingSpeaker"/);
  assert.match(scene,/id="assemblyEndingLine"/);
  assert.match(scene,/id="assemblyEndingProgress"/);
  const shared=styles.indexOf("/* GAME-SP4.1D1: one opening-office-style named speech tab");
  const fix=styles.indexOf("/* GAME-SP4.1H-C1 — Ending C dialogue must never inherit");
  assert.ok(shared>=0 && fix>shared,"Compact Ending C override must come after shared speech styles");
  const css=styles.slice(fix,styles.indexOf("/* GAME-SP4.1D2:",fix));
  assert.match(css,/#holidayScreen #reassembleEndingScene \.assembly-ending-content\.story-speech \{\s*height:auto;\s*max-height:28% !important;\s*overflow:visible !important;/);
  assert.match(css,/@media\(max-width:800px\) \{[\s\S]*?max-height:32% !important;/);
  assert.match(css,/@media\(max-width:450px\) \{[\s\S]*?max-height:34% !important;/);
  assert.doesNotMatch(css,/\.spa-ending-(david|stephen|paul|cardboard-stephen)|#summitEndingScene|#detentionEndingScene/,
    "Keep approved cast and the other endings unchanged");
  assert.match(styles,/#holidayScreen #reassembleEndingScene \.assembly-ending-content \{\s*position:absolute;z-index:5;left:3%;right:3%;bottom:8%/,
    "The dialogue stays above the bottom status bar");
});


/* G3G regression: reach endings by completing their real puzzles, then test all hub jumps. */
function g3gComplete(route){
  const p=route==="cult"?toSummitAdmissions():route==="detention"?toDetentionPaperwork():toAssemblyWorkshop();
  if(route==="cult"){
    p.el("summitChoice0").click(); // wrong answer cannot progress
    assert.equal(saved(p).rescueProgress.miniGameStage,0);
    for(const correct of [2,1,2]){p.el("summitChoice"+correct).click();p.el("summitNextButton").click();}
  }else if(route==="detention"){
    finishDetentionForms(p);
    p.el("detentionChoice2").click();p.el("detentionStampButton").click();
    p.el("detentionPermitButton").click();p.el("detentionNextButton").click();
  }else{
    p.el("assemblyPiece6").click();p.el("assemblySlot0").click();
    assert.equal(saved(p).rescueProgress.miniGameStage,0);
    for(let i=0;i<6;i++){p.el("assemblyPiece"+i).click();p.el("assemblySlot"+i).click();}
    p.el("assemblyPowerButton").click();
  }
  assert.equal(saved(p).holidayPhase,"rescue-route-ending");
  const data=route==="cult"?story().SMP_SUMMIT:route==="detention"?story().SMP_DETENTION:story().SMP_REASSEMBLE;
  const next=route==="cult"?"summitEndingNextButton":route==="detention"?"detentionEndingNextButton":"assemblyEndingNextButton";
  for(let i=0;i<=data.ending.length;i++)p.el(next).click();
  assert.equal(saved(p).holidayPhase,"rescue-ending-summary");
  assert.equal(p.el("rescueEndingSummary").hidden,false);
  assert.equal(p.el("rescueSummaryJumpButton").disabled,true);
  assert.equal(saved(p).rescueProgress.finished,true);
  return p;
}
function g3gSelect(p,value){
  p.el("rescueSummaryJumpSelect").value=value;
  p.el("rescueSummaryJumpSelect").events.change();
  assert.equal(p.el("rescueSummaryJumpButton").disabled,false);
  p.el("rescueSummaryJumpButton").click();
}
for(const route of ["cult","detention","reassemble"]){
  test("G3G "+route+" ending hub survives save/resume and replay",()=>{
    const p=g3gComplete(route),title=p.el("rescueSummaryHeading").textContent;
    assert.ok(title.length>10);
    p.el("homeButton").click();p.el("resumeButton").click();
    assert.equal(saved(p).holidayPhase,"rescue-ending-summary");
    assert.equal(p.el("rescueSummaryHeading").textContent,title);
    assert.equal(p.el("rescueSummaryJumpButton").disabled,true);
    p.el("rescueSummaryReplayButton").click();
    assert.equal(saved(p).holidayPhase,"wall");
    assert.equal(saved(p).wallDecision,null);
    assert.equal(saved(p).wallStep,story().SMP_CHINA_WALL.lines.length);
    assert.equal(Object.hasOwn(saved(p),"route"),false);
    assert.equal(Object.hasOwn(saved(p),"rescueProgress"),false);
  });
  for(const dest of ["office","china","wall","hotel","route"]){
    test("G3G "+route+" completed ending jumps safely to "+dest,()=>{
      const p=g3gComplete(route);
      g3gSelect(p,dest);
      const s=saved(p);
      assert.equal(s.version,3);
      if(dest==="office"){
        assert.equal(s.scene,"office");assert.equal(s.beatId,"intro.exterior");
        assert.equal(Object.hasOwn(s,"rescueProgress"),false);
      }else if(dest==="china"){
        assert.equal(s.holidayPhase,"transition");assert.equal(s.wallStep,0);
        assert.equal(s.wallDecision,null);assert.equal(Object.hasOwn(s,"route"),false);
      }else if(dest==="wall"){
        assert.equal(s.holidayPhase,"wall");assert.equal(s.wallDecision,null);
        assert.equal(Object.hasOwn(s,"route"),false);
        assert.equal(Object.hasOwn(s,"rescueProgress"),false);
      }else if(dest==="hotel"){
        assert.equal(s.holidayPhase,"rescue-hub-arrival");
        assert.equal(s.route,route);assert.equal(s.hubIntroStep,0);
        assert.equal(s.hubMatched,false);assert.equal(s.hubViewed.length,0);
        assert.equal(Object.hasOwn(s,"rescueProgress"),false);
      }else{
        assert.equal(s.holidayPhase,"rescue-route-intro");
        assert.equal(s.route,route);assert.equal(s.hubMatched,true);
        assert.equal(s.rescueProgress.miniGameStage,0);
        assert.equal(s.rescueProgress.finished,false);
        assert.equal(s.rescueProgress.endingStep,0);
        for(const name of ["summitResponse","detentionResponse","detentionStampFound",
          "detentionStampSelected","assemblyPowered","assemblySelectedPart","assemblyHintsHeard"])
          assert.equal(Object.hasOwn(s,name),false,"stale replay state "+name);
        const intro=story().SMP_RESCUE_FRAMEWORK.routes[route].intro;
        for(let i=0;i<=intro.length;i++)p.el("routeIntroNextButton").click();
        assert.equal(saved(p).holidayPhase,"rescue-minigame");
        assert.equal(saved(p).rescueProgress.finished,false);
        assert.equal(saved(p).rescueProgress.miniGameStage,0);
        assert.equal(p.el("holidaySkipButton").hidden,true);
        if(route==="reassemble"){
          for(let i=0;i<6;i++){p.el("assemblyPiece"+i).click();p.el("assemblySlot"+i).click();}
          assert.equal(saved(p).rescueProgress.finished,true);
          p.el("assemblyPowerButton").click();
          assert.equal(saved(p).holidayPhase,"rescue-route-ending");
        }else if(route==="detention"){
          finishDetentionForms(p);
          p.el("detentionChoice2").click();p.el("detentionStampButton").click();
          p.el("detentionPermitButton").click();
          assert.equal(saved(p).rescueProgress.finished,true);
        }else{
          p.el("summitChoice2").click();
          assert.equal(saved(p).rescueProgress.miniGameStage,1);
        }
      }
      p.el("homeButton").click();p.el("resumeButton").click();
      assert.notEqual(saved(p).holidayPhase,"rescue-ending-summary");
    });
  }
}
test("G3G ending menu preserves six listening links, responsive layout and focus",()=>{
  const fragment=html.slice(html.indexOf('id="rescueEndingSummary"'),
    html.indexOf("<!-- Off-stage transition narration:"));
  assert.ok(fragment.indexOf('data-album="martiin"')<fragment.indexOf('data-album="martin"'));
  assert.equal((fragment.match(/class="bls-platform-link /g)||[]).length,6);
  assert.equal((fragment.match(/target="_blank" rel="noopener noreferrer"/g)||[]).length,8);
  for(const platform of ["spotify","apple","youtube"])
    assert.equal((fragment.match(new RegExp("bls-platform-"+platform,"g"))||[]).length,2);
  for(const id of ["rescueSummaryJumpSelect","rescueSummaryJumpButton",
    "rescueSummaryReplayButton","rescueSummaryRestartButton","rescueSummaryMenuButton"])
    assert.ok(fragment.includes('id="'+id+'"'));
  const layout=css.slice(css.indexOf("/* GAME-SP4.1G3F: restored wide lower caption"));
  assert.match(layout,/top:auto;left:5%;right:5%;bottom:15%/);
  assert.match(layout,/top:12%;right:3%;bottom:auto/);
  assert.match(layout,/@media\(max-width:800px\)/);
  assert.match(layout,/@media\(max-width:450px\)/);
  assert.match(layout,/:focus-visible/);
});


test("GAME-SP4.1G4A Forbidden City uses the precise approved Chapter 1 bear print, never an emoji",()=>{
  const canonical="./public/assets/generated/game/office-printer-bear-cutaway-v01.webp";
  assert.ok(engine.includes('printer: \'<img class="cutaway-approved-art cutaway-approved-printer" src="'+canonical+'"'),
    "Chapter 1 source is the original approved printer cutaway");
  const scene=html.slice(html.indexOf('id="palacePhotoGag"'),html.indexOf('id="palaceGoMarketButton"'));
  assert.ok(scene.includes('src="'+canonical+'"'),"Banquet reuses the very same WebP URL");
  assert.ok(scene.includes('alt="The same printed photograph'));
  assert.ok(scene.includes("FIRST PHOTO: UPLOADED"));
  assert.doesNotMatch(scene,/🐻|data:image|bear-classification-v01|new-generated-bear/i);
  const manifest=JSON.parse(read("generated-assets/manifests/game-sp40f-office-printer-bear-v01.json"));
  assert.equal(manifest.destination,canonical.slice(2));
  assert.equal(manifest.expectedSourceName,"office-printer-bear-cutaway-v01.png");
  const built=read("scripts/build.mjs");
  assert.ok(built.includes('const approvedPrinterCutaway = "'+canonical.slice(2)+'"'));
  const style=css.slice(css.indexOf("/* G4A: crop the actual approved office printer cutaway"),
    css.indexOf("#holidayScreen .palace-scene .wall-choices p"));
  assert.match(style,/\.palace-photo-crop/);
  assert.match(style,/overflow:hidden/);
  assert.match(style,/img \{[\s\S]*?width:214%/);
  assert.match(style,/left:-56%;top:-68%/);
  assert.doesNotMatch(style,/#detentionEndingScene|#summitEndingScene|#reassembleEndingScene/);
});

test("GAME-SP4.1G4A identical printed photo is shown only after the full accepted banquet reply",()=>{
  const p=toPalaceChoice();
  assert.equal(p.el("palacePhotoGag").hidden,true);
  p.el("palaceAcceptButton").click();
  assert.equal(p.el("palacePhotoGag").hidden,true,"Five canonical replies must not be skipped");
  for(let i=0;i<4;i++) {
    p.el("palaceNextButton").click();
    assert.equal(p.el("palacePhotoGag").hidden,true,"Photo is only revealed after complete reply");
  }
  p.el("palaceNextButton").click();
  assert.equal(p.el("palacePhotoGag").hidden,false);
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(p.el("palacePhotoGag").hidden,false,"Accepted photo reveal survives saved-game resume");
  p.el("palaceReplayButton").click();
  assert.equal(p.el("palacePhotoGag").hidden,true,"Replay clears the previous accepted reveal");
  const declined=toPalaceChoice();
  declined.el("palaceDeclineButton").click();
  assert.equal(declined.el("palacePhotoGag").hidden,true,"Declining the banquet never uploads the photo");
});


/*
 * GAME-SP4.1G4B: Ending B's genuinely selected banquet must reuse the
 * approved G1A phone and G1B England card exactly once, including after G4A.
 * These are state/audio integration tests, not screenshot or listening claims.
 */
test("GAME-SP4.1G4B actual banquet photo flows into the existing phone, England and complete rescue alarm",()=>{
  const p=toPalaceChoice();
  p.el("palaceAcceptButton").click();
  assert.equal(saved(p).pendingPlan,"detention");
  assert.equal(p.el("palacePhotoGag").hidden,true,"Canonical G4A photo cannot precede dialogue");
  for(let i=0;i<5;i++)p.el("palaceNextButton").click();
  assert.equal(p.el("palacePhotoGag").hidden,false);
  p.el("palaceGoIncidentButton").click();
  assert.equal(saved(p).holidayPhase,"route-handoff");
  assert.equal(saved(p).route,"detention");
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.route.banquet.001");
  p.el("handoffContinueButton").click();
  const message=story().SMP_CHINA_FINAL.messageByRoute.detention;
  assert.equal(saved(p).holidayPhase,"final-message");
  assert.equal(saved(p).finalStep,0);
  assert.equal(p.el("chinaPhoneMessage").textContent,message);
  assert.equal(p.el("chinaPhoneStatus").textContent,"Partial message delivered");
  assert.equal(p.el("chinaBatteryLabel").textContent,"1% · LOW BATTERY");
  assert.equal(p.el("chinaFinalPhone").dataset.power,"low");
  assert.equal(p.el("chinaPhonePowerNotice").hidden,true);
  assert.equal(p.el("chinaFinalReaction").hidden,true);
  assert.equal(p.el("chinaFinalEngland").hidden,true);
  assert.equal(p.el("transitionNarration").hidden,true,"Do not narrate England over Stephen's phone");

  p.el("chinaFinalNextButton").click();
  assert.equal(saved(p).finalStep,1);
  assert.equal(p.el("chinaPhoneMessage").textContent,message);
  assert.equal(p.el("chinaFinalPhone").dataset.power,"off");
  assert.equal(p.el("chinaBatteryLabel").textContent,"0% · Battery flat");
  assert.equal(p.el("chinaPhonePowerNotice").hidden,false);
  assert.equal(p.el("chinaFinalReaction").hidden,false);
  assert.match(html,/id="chinaFinalReaction"[^>]*><strong>STEPHEN<\/strong><p>Oh, for fuck's sake\.<\/p>/);
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(saved(p).finalStep,1);
  assert.equal(p.el("chinaFinalPhone").dataset.power,"off");

  p.el("chinaFinalNextButton").click();
  assert.equal(saved(p).finalStep,2);
  assert.equal(p.el("chinaFinalPhone").hidden,true);
  assert.equal(p.el("chinaPhonePowerNotice").hidden,true);
  assert.equal(p.el("chinaFinalEngland").hidden,false);
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.england.back.001");
  assert.equal(p.el("transitionNarration").hidden,false);
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.england.back.001");
  p.el("chinaFinalNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-alarm");
  assert.equal(saved(p).route,"detention");
  assert.equal(saved(p).rescueAlarmStep,0);
  assert.equal(p.el("transitionNarration").hidden,true,"No second England card");
  assert.equal(p.el("rescueAlarmPhoneText").textContent,message);

  const alarm=story().SMP_RESCUE_ALARM;
  assert.equal(alarm.lines.length,10);
  for(let i=0;i<alarm.lines.length;i++){
    assert.equal(p.el("rescueAlarmLine").textContent,alarm.lines[i].text,
      "Keep the canonical David/Paul dialogue and order at line "+(i+1));
    assert.equal(p.el("rescueAlarmPhoneText").textContent,message);
    p.el("rescueAlarmNextButton").click();
  }
  assert.equal(saved(p).rescueAlarmStep,10);
  assert.equal(p.el("rescueAlarmTravelButton").hidden,false);
  p.el("rescueAlarmTravelButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-travel");
  for(let i=0;i<4;i++)p.el("rescueTravelNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-hub-arrival",
    "A single England handoff leads to the real hotel investigation, not another postcard");
  assert.equal(saved(p).route,"detention");
  assert.equal(saved(p).hubMatched,false,"Investigation has not been fabricated as completed");
});

test("GAME-SP4.1G4B Ending B voice follows reaction then a single narrator and cancels stale audio",async()=>{
  const p=g1cToHandoff("detention",{audio:true});
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.route.banquet.001");
  await Promise.resolve();
  const banquetNarrator=p.voices.at(-1);
  assert.match(banquetNarrator.src,/transition\.route\.banquet\.001\.mp3$/);
  p.el("handoffContinueButton").click();
  assert.equal(saved(p).finalStep,0);
  assert.equal(banquetNarrator.paused,true);

  p.el("chinaFinalNextButton").click();
  assert.equal(saved(p).finalStep,1);
  await Promise.resolve();
  const stephen=p.voices.at(-1);
  assert.match(stephen.src,/china\.final\.001\.mp3$/);
  const oldStephen=stephen.onended;
  assert.equal(typeof oldStephen,"function");
  p.el("holidayPauseButton").click();
  assert.equal(stephen.paused,true);
  p.el("holidayNextButton").click();
  assert.equal(saved(p).finalStep,2);
  assert.equal(stephen.onended,null);
  oldStephen();
  assert.equal(saved(p).finalStep,2,"Old Stephen MP3 cannot skip the illustrated England card");
  assert.equal(p.timeouts.size,0,"Pause prevents an extra automatic transition");

  p.el("holidayPauseButton").click();
  await Promise.resolve();
  const englandNarrator=p.voices.at(-1);
  assert.match(englandNarrator.src,/transition\.england\.back\.001\.mp3$/);
  assert.equal(p.el("transitionNarration").dataset.cue,"transition.england.back.001");
  const englandEnd=englandNarrator.onended;
  assert.equal(typeof englandEnd,"function");
  p.el("chinaFinalNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-alarm");
  assert.equal(englandNarrator.paused,true);
  assert.equal(englandNarrator.onended,null);
  englandEnd();
  assert.equal(saved(p).rescueAlarmStep,0,
    "A late England MP3 completion must not skip David's first alarm line");
  assert.equal(p.el("transitionNarration").hidden,true);
});

test("GAME-SP4.1G4B production handoff reuses exactly the approved G1A and G1B assets",()=>{
  const shell="stephen-phone-shell-g1a-v01.webp";
  const postcard="transition-back-in-england-postcard-collage-v01.webp";
  const phonePath="public/assets/generated/game/"+shell;
  const collagePath="public/assets/generated/locations/"+postcard;
  assert.ok(html.includes("./"+phonePath));
  assert.ok(css.includes(postcard));
  assert.ok(read("scripts/build.mjs").includes('"'+phonePath+'"'));
  assert.ok(read("scripts/build.mjs").includes('"'+postcard+'"'));
  for(const [manifestName,destination] of [
    ["game-sp41g1a-phone-shell-v01.json",phonePath],
    ["game-sp41g1b-england-postcard-collage-v01.json",collagePath]
  ]){
    const manifest=JSON.parse(read("generated-assets/manifests/"+manifestName));
    assert.equal(manifest.destination,destination);
    assert.equal(manifest.source.provider,"google-drive");
    const img=fs.readFileSync(path.join(root,destination));
    assert.equal(img.toString("ascii",0,4),"RIFF");
    assert.equal(img.toString("ascii",8,12),"WEBP");
  }
  const phone=html.slice(html.indexOf('id="chinaFinalScene"'),html.indexOf('id="rescueAlarmScene"'));
  assert.equal((phone.match(/id="chinaFinalPhone"/g)||[]).length,1);
  assert.equal((phone.match(/id="chinaFinalEngland"/g)||[]).length,1);
  assert.equal((phone.match(new RegExp(shell.replace(/\./g,"\\."),"g"))||[]).length,1);
  assert.match(engine,/case "final-message":[\s\S]*?state\.finalStep === 2 \? transitionNarration\.backEngland/);
  assert.match(engine,/id:"transition\.england\.back\.001"/);
});


// GAME-SP4.1G4D–G4F: player-visible B corrections without touching the actors' voice IDs.
test("G4D Ending B says release office and administrative approach, not rescue briefing",()=>{
  const p=toHotelInvestigation("detention");
  completeHotelIntro(p);
  p.el("hotelDetentionButton").click();
  for(let i=0;i<6;i++)p.el("hotelFinishButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-intro");
  const lines=story().SMP_RESCUE_FRAMEWORK.routes.detention.intro;
  assert.equal(p.el("routeIntroPhaseLabel").textContent,"Investigation complete · Release office");
  assert.equal(p.el("routeIntroStatus").textContent,
    "Ceremonial release process · 1 of "+lines.length);
  for(let i=0;i<lines.length;i++){
    assert.equal(p.el("routeIntroLine").textContent,lines[i].text);
    p.el("routeIntroNextButton").click();
  }
  assert.equal(p.el("routeIntroStatus").textContent,
    "Administrative approach complete. "+story().SMP_RESCUE_FRAMEWORK.routes.detention.gameTitle+" is next.");
  assert.doesNotMatch(p.el("routeIntroStatus").textContent,/briefing/i);
  p.el("routeIntroNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-minigame");
  assert.equal(p.el("detentionPaperwork").dataset.permitApproved,"false");
});

test("G4E permit expands only after real approved stamp, survives resume and clears before Ending B",()=>{
  const p=toDetentionPaperwork();
  finishDetentionForms(p);
  assert.equal(saved(p).rescueProgress.miniGameStage,2);
  assert.equal(p.el("detentionApprovedPreview").hidden,true);
  assert.equal(p.el("detentionPaperwork").dataset.permitApproved,"false");
  p.el("detentionPermitButton").click();
  assert.equal(p.el("detentionApprovedPreview").hidden,true,"Cannot fake approval");
  p.el("detentionChoice2").click();
  p.el("detentionStampButton").click();
  p.el("detentionPermitButton").click();
  assert.equal(saved(p).rescueProgress.finished,true);
  assert.equal(p.el("detentionPaperwork").dataset.permitApproved,"true");
  assert.equal(p.el("detentionApprovedPreview").hidden,false);
  assert.equal(p.el("detentionApprovedPreview").focusCount,1,
    "Keyboard focus moves to the approved permit proof");
  assert.equal(p.el("detentionRoundTitle").textContent,"Ceremonial release approved");
  assert.equal(p.el("detentionRoundProgress").textContent,"APPROVED · Review the full-size permit");
  assert.equal(p.el("detentionNextButton").hidden,false);
  assert.equal(p.el("detentionNextButton").textContent,"Continue to Stephen →");
  p.el("homeButton").click();p.el("resumeButton").click();
  assert.equal(p.el("detentionApprovedPreview").hidden,false);
  assert.equal(p.el("detentionPaperwork").dataset.permitApproved,"true");
  p.el("detentionNextButton").click();
  assert.equal(saved(p).holidayPhase,"rescue-route-ending");
  assert.equal(p.el("detentionEndingScene").hidden,false);
  assert.equal(p.el("rescueMiniGameScene").hidden,true,
    "The entire paperwork stage is hidden once Ending B dialogue begins");
  const ending=html.slice(html.indexOf('id="detentionEndingScene"'),html.indexOf('id="reassembleEndingScene"'));
  assert.doesNotMatch(ending,/detention-ending-permit|ending-b-release-permit-canonical-portrait-proof-v01\.webp/,
    "No redundant floating permit during the four-character dialogue");
});

test("G4E approved original permit is the readable proof without new/repainted art",()=>{
  const htmlProof=html.slice(html.indexOf('id="detentionApprovedPreview"'),html.indexOf('id="detentionResponseCard"'));
  assert.match(htmlProof,/role="region" aria-labelledby="detentionPermitProofTitle" tabindex="-1"/);
  assert.match(htmlProof,/ending-b-release-permit-canonical-portrait-proof-v01\.webp/);
  assert.match(htmlProof,/ending-b-approved-ink-impression-v01\.webp/);
  assert.match(htmlProof,/detention-proof-caption/);
  const rules=css.slice(css.lastIndexOf("/* GAME-SP4.1G4D–G4F:"));
  assert.match(rules,/data-permit-approved="true"/);
  assert.match(rules,/width:min\(100%,32vh,310px\);height:auto;aspect-ratio:2\/3/,
    "Approved permit uses its actual 2:3 coordinate frame, without wide gutters");
  assert.match(rules,/@media \(max-width:800px\)/);
  assert.match(rules,/@media \(max-width:450px\)/);
});

test("G4F Ending B actors share one foot anchor and four columns on three screen sizes",()=>{
  const ending=html.slice(html.indexOf('id="detentionEndingScene"'),html.indexOf('id="reassembleEndingScene"'));
  for(const id of ["detentionEndingStephenActor","detentionEndingDavidActor",
    "detentionEndingOfficialActor","detentionEndingPaulActor"]){
    assert.ok(ending.includes('id="'+id+'"'),"Approved actor remains: "+id);
  }
  const rules=css.slice(css.lastIndexOf("/* GAME-SP4.1G4D–G4F:"));
  assert.match(rules,/\.detention-ending-actor,[\s\S]*?\.detention-ending-official \{\s*position:absolute;bottom:25%;/);
  assert.match(rules,/object-position:center bottom/);
  assert.match(rules,/transform:translateX\(-50%\)/);
  assert.match(rules,/@media \(max-width:800px\)[\s\S]*?bottom:33%;max-width:24%/);
  assert.match(rules,/@media \(max-width:450px\)[\s\S]*?bottom:37%;max-width:25%/);
  assert.ok(css.includes('data-speaker-focus][data-speaking="true"]'),
    "Existing speaker glow remains intact");
});


test("G4E screenshot: red ink stays in the actual 2:3 permit approval box",()=>{
 const s=css.slice(css.lastIndexOf("/* GAME-SP4.1G4D–G4F:"));
 assert.match(s,/width:min\(100%,32vh,310px\);height:auto;aspect-ratio:2\/3/);
 assert.doesNotMatch(s,/width:min\(100%,690px\)/);
 assert.match(s,/\.detention-approved-preview-frame \.detention-ink-overlay \{\s*left:55%;top:64%;width:39%;height:21%/);
 assert.match(s,/width:min\(100%,28vh,267px\);height:auto/);
 assert.match(s,/width:min\(100%,26vh,215px\);height:auto/);
 const htmlProof=html.slice(html.indexOf('id="detentionApprovedPreview"'),html.indexOf('id="detentionResponseCard"'));
 assert.match(htmlProof,/ending-b-release-permit-canonical-portrait-proof-v01\.webp/);
 assert.match(htmlProof,/ending-b-approved-ink-impression-v01\.webp/);
});
test("G4F screenshot: Stephen is lowered at all sizes without disturbing Dave Paul Official",()=>{
 const s=css.slice(css.lastIndexOf("/* GAME-SP4.1G4D–G4F:"));
 assert.match(s,/\.detention-ending-stephen \{\s*left:16%;height:52%;bottom:22%;z-index:2;/);
 assert.match(s,/\.detention-ending-stephen \{left:15%;height:43%;bottom:30%;\}/);
 assert.match(s,/\.detention-ending-stephen \{left:15%;height:33%;bottom:34%;\}/);
 for(const a of ["left:35%;height:50%;z-index:2;","left:58%;height:54%;z-index:2;","left:77%;height:48%;z-index:2;"])
  assert.ok(s.includes(a));
 assert.match(s,/\.detention-ending-content\.story-speech \{\s*z-index:5/);
});


test("G4F owner spacing revision: Stephen and Paul move inward without shifting David or Official",()=>{
  const rules=css.slice(css.lastIndexOf("/* GAME-SP4.1G4D–G4F:"));
  const checks=[
    ["desktop Stephen",/\.detention-ending-stephen \{\s*left:16%;height:52%;bottom:22%;z-index:2;/],
    ["desktop Paul",/\.detention-ending-paul \{\s*left:77%;height:48%;z-index:2;/],
    ["tablet Stephen",/\.detention-ending-stephen \{left:15%;height:43%;bottom:30%;\}/],
    ["tablet Paul",/\.detention-ending-paul \{left:79%;height:39%;\}/],
    ["mobile Stephen",/\.detention-ending-stephen \{left:15%;height:33%;bottom:34%;\}/],
    ["mobile Paul",/\.detention-ending-paul \{left:80%;height:30%;\}/],
    ["David unchanged",/\.detention-ending-david \{\s*left:35%;height:50%;z-index:2;/],
    ["Official unchanged",/\.detention-ending-official \{\s*left:58%;height:54%;z-index:2;/]
  ];
  for (const [description,pattern] of checks) assert.match(rules,pattern,description);
  assert.match(rules,/\.detention-ending-actor,[\s\S]*?object-position:center bottom/);
  assert.match(rules,/\.detention-ending-content\.story-speech \{\s*z-index:5/);
});


test("G4G approved illustrated Ending B uses actual WebP, detention-only layout and lower-right album cards",()=>{
  const asset="public/assets/generated/locations/ending-b-finale-ceremonial-release-v01.webp";
  const bytes=fs.readFileSync(path.join(root,asset));
  assert.ok(bytes.length>20000 && bytes.length<3*1024*1024);
  assert.equal(bytes.toString("ascii",0,4),"RIFF");
  assert.equal(bytes.toString("ascii",8,12),"WEBP");
  assert.match(engine,/\$\("rescueEndingSummary"\)\.dataset\.route = inSummary \? \(state\.route \|\| "other"\) : "other"/);
  assert.match(engine,/route === "detention"\s*\?\s*"Ending B complete\. The Office of Ceremonial Misunderstandings/);
  const styles=css.slice(css.lastIndexOf("/* GAME-SP4.1G4G"));
  assert.match(styles,/rescueEndingSummary\[data-route="detention"\] \.rescue-route-intro-stage/);
  assert.match(styles,/ending-b-finale-ceremonial-release-v01\.webp/);
  assert.match(styles,/rescueEndingSummary\[data-route="detention"\] \.bls-albums \{\s*top:auto;right:3%;bottom:15%/);
  assert.match(styles,/@media \(max-width:800px\)/);
  assert.match(styles,/@media \(max-width:450px\)/);
  assert.match(styles,/bottom:calc\(16% \+ 148px\)/);
  assert.doesNotMatch(styles,/rescueEndingSummary\[data-route="cult"\]/);
  assert.doesNotMatch(styles,/rescueEndingSummary\[data-route="reassemble"\]/);
  assert.match(html,/id="rescueSummaryHeading"/);
  assert.match(html,/class="bls-albums"/);
  assert.match(read("scripts/build.mjs"),/Approved Ending B artworks packaged: " \+ endingBImages\.length \+ "\/10/);
});


test("G4G.1 Ending B responsive summary/album boxes shrink and never use internal scrollbars",()=>{
  const styles=css.slice(css.lastIndexOf("/* GAME-SP4.1G4G"));
  const b='rescueEndingSummary[data-route="detention"]';
  assert.ok(styles.includes(b));
  assert.doesNotMatch(styles,/overflow-y:\s*auto|overflow:\s*(auto|scroll)|max-height:\s*(\d|clamp|min|calc)/,
    "No overflow scrollboxes or fixed-height clamps in Ending B finale");
  for (const sel of [".rescue-travel-panel",".bls-albums"]) {
    assert.ok(styles.includes(b+" "+sel),"Detention-only selector: "+sel);
  }
  assert.match(styles,/\.rescue-travel-panel h2 \{\s*font-size:clamp\(17px,1\.8vw,30px\)/);
  assert.match(styles,/\.rescue-travel-panel p \{\s*font-size:clamp\(11px,1\.08vw,16px\)/);
  assert.match(styles,/\.bls-albums \{\s*top:auto;right:3%;bottom:15%;width:min\(27%,290px\)/);
  assert.match(styles,/\.bls-album-cover img \{\s*width:100%;height:auto;max-height:112px/);
  assert.match(styles,/@media \(max-height:650px\) and \(min-width:801px\)/);
  assert.match(styles,/@media \(max-width:800px\)/);
  assert.match(styles,/@media \(max-width:600px\)/);
  assert.match(styles,/\.rescue-travel-panel \{\s*top:auto;left:3%;right:3%;bottom:calc\(16% \+ 148px\);width:94%/);
  assert.match(styles,/\.bls-albums \{\s*top:auto;right:3%;bottom:16%;width:min\(76%,245px\)/);
  assert.doesNotMatch(styles,/data-route="cult"|data-route="reassemble"/);
  assert.match(html,/id="rescueSummaryHeading"/);
  assert.match(html,/class="bls-albums"/);
});
