const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname,"..");
const source = fs.readFileSync(path.join(root,"src/asset-loader.js"),"utf8");
const html = fs.readFileSync(path.join(root,"index.html"),"utf8");
const engine = fs.readFileSync(path.join(root,"src/game.js"),"utf8");
const build = fs.readFileSync(path.join(root,"scripts/build.mjs"),"utf8");

function harness({failure=false,hanging=false}={}) {
  const timeouts = new Map();
  let clock=0, finished=0;
  const elements=new Map();
  const el=id=>{
    if(!elements.has(id))elements.set(id,{
      id, hidden:id==="assetLoadingContinue",textContent:"",attributes:{},events:{},
      setAttribute(k,v){this.attributes[k]=v;},
      removeAttribute(k){delete this.attributes[k];},
      addEventListener(k,cb){this.events[k]=cb;},
      click(){this.events.click?.();}
    });
    return elements.get(id);
  };
  const document={baseURI:"https://game.example.test/",getElementById:el};
  const loaded=[];
  class ImageMock {
    set src(url){this._src=url;loaded.push(url);}
    get src(){return this._src;}
    decode(){
      if(hanging)return new Promise(()=>{});
      return failure ? Promise.reject(new Error("missing")) : Promise.resolve();
    }
  }
  const window={Image:ImageMock,getComputedStyle(node,pseudo){
    return {display:node.display || "block",visibility:"visible",
      backgroundImage:!pseudo?node.background || "none":"none",
      content:pseudo?"none":""};
  }};
  const context={document,window,URL,
    setTimeout(cb,ms){const id=++clock;timeouts.set(id,{cb,ms});return id;},
    clearTimeout(id){timeouts.delete(id);}};
  vm.runInNewContext(source,context,{timeout:1000});
  function stage(url="./one.webp"){
    const actor={tagName:"IMG",hidden:false,currentSrc:"",
      getAttribute:key=>key==="src"?url:null,closest(){return null;}};
    return {hidden:false,background:'url("./background.webp")',
      closest(){return null;},querySelectorAll(){return [actor];}};
  }
  async function settle(){await new Promise(resolve=>setImmediate(resolve));}
  function runTimer(ms){for(const [id,item] of timeouts){if(item.ms===ms){timeouts.delete(id);item.cb();return true;}}return false;}
  return {loader:window.SMP_ASSET_LOADER,el,stage,loaded,timeouts,settle,runTimer,
    get finished(){return finished;}};
}

test("GAME-SP4.1A preloads only five menu images and defers hidden scenes",()=>{
  assert.equal((html.match(/rel="preload" as="image"/g)||[]).length,5);
  assert.ok((html.match(/loading="lazy"/g)||[]).length>=30);
  assert.ok(html.includes('id="assetLoadingOverlay"'));
  assert.ok(html.includes('id="assetLoadingStatus"'));
  assert.ok(html.includes('id="assetLoadingContinue"'));
  assert.ok(html.includes('src="./src/asset-loader.js"'));
  assert.ok(build.includes('"src/asset-loader.js"'));
  assert.ok(engine.includes('window.SMP_ASSET_LOADER?.present("menu"'));
  assert.ok(engine.includes('window.SMP_ASSET_LOADER?.busy()'));
  assert.ok(engine.includes('state.holidayPhase === phase'));
});

test("GAME-SP4.1A decodes visible scene and CSS background once, then releases curtain",async()=>{
  const p=harness();
  let ready=0;
  assert.equal(p.loader.present("menu",p.stage(),()=>ready++),true);
  assert.equal(p.loader.busy(),true);
  assert.equal(p.el("assetLoadingOverlay").hidden,false);
  await p.settle();
  assert.equal(ready,1);
  assert.equal(p.loader.busy(),false);
  assert.equal(p.el("assetLoadingOverlay").hidden,true);
  assert.equal(p.loaded.length,2);
  assert.ok(p.loaded.some(x=>x.endsWith("/one.webp")));
  assert.ok(p.loaded.some(x=>x.endsWith("/background.webp")));
  assert.equal(p.loader.present("menu",p.stage(),()=>ready++),false);
  assert.equal(p.loaded.length,2,"Do not refetch same scene on every dialogue line");
});

test("GAME-SP4.1A failed decode always clears curtain and calls the scene continuation",async()=>{
  const p=harness({failure:true});
  let ready=0;
  p.loader.present("failed-scene",p.stage(),()=>ready++);
  await p.settle();
  assert.equal(ready,1);
  assert.equal(p.loader.busy(),false);
  assert.equal(p.el("assetLoadingOverlay").hidden,true);
  assert.match(p.el("assetLoadingStatus").textContent,/may still be loading/);
});

test("GAME-SP4.1A slow image offers Continue and cannot hold the scene forever",async()=>{
  const p=harness({hanging:true});
  let ready=0;
  p.loader.present("slow-scene",p.stage(),()=>ready++);
  assert.equal(p.runTimer(2200),true);
  assert.equal(p.el("assetLoadingContinue").hidden,false);
  p.el("assetLoadingContinue").click();
  assert.equal(ready,1);
  assert.equal(p.el("assetLoadingOverlay").hidden,true);
  assert.equal(p.loader.busy(),false);
  p.loader.present("another",p.stage("./other.webp"),()=>ready++);
  assert.equal(p.runTimer(7000),true);
  assert.equal(ready,2);
  assert.equal(p.loader.busy(),false);
  await p.settle();
  assert.equal(ready,2,"Late promises must not repeat callbacks");
});

test("GAME-SP4.1A navigation supersedes stale scene promises and resets timers",async()=>{
  const p=harness({hanging:true});
  let old=0,next=0;
  p.loader.present("old",p.stage("./old.webp"),()=>old++);
  p.loader.present("new",p.stage("./new.webp"),()=>next++);
  assert.equal(old,0);
  p.loader.cancel();
  assert.equal(p.loader.busy(),false);
  assert.equal(p.el("assetLoadingOverlay").hidden,true);
  assert.equal(p.timeouts.size,0);
  assert.equal(next,0);
});


test("GAME-SP4.1A does not preload actors hidden by a different route's CSS",async()=>{
  const p=harness();
  const current=p.stage("./correct-route.webp");
  const nodes=current.querySelectorAll();
  nodes.push({tagName:"IMG",hidden:false,currentSrc:"",display:"none",
    getAttribute:key=>key==="src"?"./other-route.webp":null,
    closest(){return null;}});
  current.querySelectorAll=()=>nodes;
  p.loader.present("route-a",current,()=>{});
  await p.settle();
  assert.equal(p.loader.busy(),false);
  assert.ok(p.loaded.some(x=>x.endsWith("/correct-route.webp")));
  assert.ok(!p.loaded.some(x=>x.endsWith("/other-route.webp")));
});

test("V1 loader shares warm-ahead and active-scene decode for the same image",async()=>{
  const p=harness();
  let ready=0;
  p.loader.warm("./one.webp");
  assert.equal(p.loader.present("menu",p.stage("./one.webp"),()=>ready++),true);
  await p.settle();
  assert.equal(ready,1);
  assert.equal(p.loader.busy(),false);
  assert.equal(p.loaded.filter(u=>u.endsWith("/one.webp")).length,1,
    "warm-ahead and scene decode must reuse a single in-flight image");
  assert.equal(p.loaded.filter(u=>u.endsWith("/background.webp")).length,1);
});
test("V1 loader permits retry after a failed warm-ahead decode",async()=>{
  const p=harness({failure:true});
  p.loader.warm("./one.webp");
  await p.settle();
  p.loader.present("later",p.stage("./one.webp"),()=>{});
  await p.settle();
  assert.equal(p.loaded.filter(u=>u.endsWith("/one.webp")).length,2,
    "failed decode must be retryable, not permanently cached");
});
