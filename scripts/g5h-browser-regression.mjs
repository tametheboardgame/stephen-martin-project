// GAME-SP4.1G5H: bounded Chromium runtime regression and image evidence.
// A fixture enters each route at its freshly UNSOLVED puzzle, then performs
// real browser mouse/keyboard actions. It never invents a solved save.
// Requires Playwright only in the dedicated QA workflow, not the game bundle.
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import path from "node:path";

const origin=process.env.G5H_URL || "http://127.0.0.1:8080";
const evidence=process.env.G5H_EVIDENCE || "g5h-evidence";
await mkdir(evidence,{recursive:true});
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const observations=[];
const screenshot=async(page,name)=>{
  await page.screenshot({path:path.join(evidence,name+".png"),fullPage:true,animations:"disabled"});
};
const phase=async page=>page.evaluate(()=>JSON.parse(localStorage.getItem("stephen-martin-game-sp1-save-v1")||"null")?.holidayPhase);
const progress=async page=>page.evaluate(()=>JSON.parse(localStorage.getItem("stephen-martin-game-sp1-save-v1")||"null")?.rescueProgress);
const visible=async(page,selector)=>await page.locator(selector).isVisible();
async function openRoute(route,viewport){
  const context=await browser.newContext({viewport,deviceScaleFactor:1,reducedMotion:"reduce"});
  const page=await context.newPage();
  const failures=[];
  page.on("pageerror",error=>failures.push("JS: "+error.message));
  page.on("response",response=>{
    if(response.status()===404 && new URL(response.url()).origin===origin)
      failures.push("404: "+response.url());
  });
  await page.goto(origin,{waitUntil:"domcontentloaded"});
  await page.locator("#menuScreen").waitFor({state:"visible"});
  await page.evaluate(route=>{
    const f=window.SMP_RESCUE_FRAMEWORK;
    if(!f||!f.fresh(route))throw Error("Missing route definitions");
    const shots=window.SMP_OFFICE_SHOTS;
    const beatId=shots.at(-1).lines.at(-1).id;
    const saved={version:3,scene:"holiday",beatId,openingSeen:true,holidayFlowVersion:2,
      holidayPhase:"rescue-minigame",route,pendingPlan:route,hubMatched:true,
      wallDecision:route==="cult"?"accept":"decline",
      palaceDecision:route==="detention"?"accept":route==="reassemble"?"decline":null,
      marketDecision:route==="reassemble"?"accept":null,
      rescueProgress:f.fresh(route),assemblyPowered:false};
    localStorage.setItem("stephen-martin-game-sp1-save-v1",JSON.stringify(saved));
  },route);
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator("#resumeButton").waitFor({state:"visible"});
  // Explicit user choice makes the route muted, keeping CI deterministic.
  await page.locator("#menuSoundButton").click();
  await page.locator("#menuSoundButton").click();
  await page.locator("#resumeButton").click();
  assert.equal(await phase(page),"rescue-minigame");
  const branch={cult:"#summitAdmissions",detention:"#detentionPaperwork",reassemble:"#reassembleWorkshop"}[route];
  await page.locator(branch).waitFor({state:"visible"});
  return {context,page,failures};
}
async function verifyBrowser(page,label,exceptions=[]){
  const result=await page.evaluate(()=>{
    const stage=document.querySelector("#rescueEndingSummary:not([hidden]) .rescue-route-intro-stage");
    const toolbar=document.querySelector("#holidayScreen .china-footer.story-top-controls");
    const album=document.querySelector("#rescueEndingSummary .bls-albums");
    const caption=document.querySelector("#rescueEndingSummary .rescue-travel-panel");
    const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom}};
    return {viewport:[innerWidth,innerHeight],scrollWidth:document.documentElement.scrollWidth,
      stage:stage?rect(stage):null,toolbar:rect(toolbar),album:rect(album),caption:rect(caption),
      albumLinks:[...document.querySelectorAll("#rescueEndingSummary .bls-platform-link")].length,
      art:getComputedStyle(stage).backgroundImage};
  });
  assert.ok(result.scrollWidth<=result.viewport[0]+2,label+": page horizontal overflow ("+JSON.stringify(result)+")");
  assert.equal(result.albumLinks,6);
  assert.ok(result.art.includes("ending-c-finale-standee-celebration-v01.png"),label+": missing Ending C finale");
  if(result.viewport[0]>800){
    assert.ok(result.toolbar.w<=280,label+": old toolbar obscures David");
    assert.ok(result.caption.right<=result.album.x+3,label+": caption/album overlap");
  }
  observations.push({case:label,...result});
  return result;
}
try{
  const {context,page,failures}=await openRoute("reassemble",{width:1366,height:768});
  assert.equal((await progress(page)).placedParts.length,0);
  assert.equal(await page.locator("#assemblyPowerButton").isVisible(),false);
  assert.equal(await page.locator(".assembly-piece").count(),13);
  await screenshot(page,"C-laptop-1366x768-0of6");
  // Decoy and incorrect anatomy must leave the cardboard unchanged.
  await page.locator("#assemblyPiece10").click();
  await page.locator("#assemblySlot1").click();
  assert.equal((await progress(page)).placedParts.length,0);
  await page.locator("#assemblyPiece0").click();
  await page.locator("#assemblySlot1").click();
  assert.equal((await progress(page)).placedParts.length,0);
  for(let i=0;i<3;i++){
    await page.locator("#assemblyPiece"+i).click();
    if(i===1){await page.locator("#assemblySlot"+i).focus();await page.keyboard.press("Enter");}
    else await page.locator("#assemblySlot"+i).click();
  }
  assert.equal((await progress(page)).placedParts.length,3);
  await screenshot(page,"C-laptop-1366x768-3of6");
  // Save and Continue must preserve fitted parts and not enable power early.
  await page.locator("#homeButton").click();
  await page.locator("#resumeButton").click();
  assert.equal((await progress(page)).placedParts.length,3);
  assert.equal(await page.locator("#assemblyPowerButton").isVisible(),false);
  for(let i=3;i<6;i++){
    await page.locator("#assemblyPiece"+i).click();
    await page.locator("#assemblySlot"+i).click();
  }
  assert.equal((await progress(page)).placedParts.length,6);
  assert.ok(await visible(page,"#assemblyPowerButton"));
  await screenshot(page,"C-laptop-1366x768-6of6");
  const overflow=await page.evaluate(()=>{
    const pick=q=>{const x=document.querySelector(q);return {scroll:x.scrollHeight,client:x.clientHeight}};
    return {workshop:pick("#reassembleWorkshop"),tray:pick(".assembly-tray"),board:pick(".assembly-board")};
  });
  for(const [name,v] of Object.entries(overflow))
    assert.ok(v.scroll<=v.client+3,"1366x768 "+name+" unexpected scrollbar: "+JSON.stringify(v));
  observations.push({case:"C-puzzle-laptop",overflow});
  await page.locator("#assemblyPowerButton").click();
  assert.equal(await phase(page),"rescue-route-ending");
  for(let i=0;i<16;i++)await page.locator("#assemblyEndingNextButton").click();
  assert.equal(await phase(page),"rescue-ending-summary");
  assert.equal(await page.locator("#rescueSummaryHeading").textContent(),"SOME ASSEMBLY REQUIRED");
  await screenshot(page,"C-laptop-1366x768-final-hub");
  await verifyBrowser(page,"C-1366x768");
  const res=await page.evaluate(()=>{
    const r=document.querySelector("#holidayScreen .china-footer.story-top-controls").getBoundingClientRect();
    return {w:r.width,h:r.height};
  });
  assert.ok(res.w<=280 && res.h<=148,"G5G.1 toolbar expanded again: "+JSON.stringify(res));
  for(const [width,height] of [[1440,900],[1600,900],[768,1024],[390,844]]){
    await page.setViewportSize({width,height});
    await page.waitForTimeout(150);
    await screenshot(page,"C-"+width+"x"+height+"-final-hub");
    await verifyBrowser(page,"C-"+width+"x"+height);
  }
  // Returning to a safe route checkpoint cannot retain a completed assembly.
  await page.locator("#rescueSummaryJumpSelect").selectOption("route");
  await page.locator("#rescueSummaryJumpButton").click();
  assert.equal(await phase(page),"rescue-route-intro");
  assert.equal((await progress(page)).placedParts.length,0);
  await context.close();
  if(failures.length)throw Error("Ending C browser errors: "+failures.join(" | "));

  // Independent route A/B smoke: existing authentic puzzle interactions
  // still lead to their correct summary; the Ending C artwork stays isolated.
  for(const route of ["cult","detention"]){
    const {page:p,context:c,failures:errors}=await openRoute(route,{width:1366,height:768});
    if(route==="cult"){
      for(const correct of [2,1,2]){
        await p.locator("#summitChoice"+correct).click();
        await p.locator("#summitNextButton").click();
      }
      assert.equal(await phase(p),"rescue-route-ending");
      for(let i=0;i<15;i++)await p.locator("#summitEndingNextButton").click();
    }else{
      await p.locator("#detentionChoice1").click();
      await p.locator("#detentionNextButton").click();
      await p.locator("#detentionChoice2").click();
      await p.locator("#detentionNextButton").click();
      await p.locator("#detentionChoice2").click();
      await p.locator("#detentionStampButton").click();
      await p.locator("#detentionPermitButton").click();
      await p.locator("#detentionNextButton").click();
      assert.equal(await phase(p),"rescue-route-ending");
      for(let i=0;i<16;i++)await p.locator("#detentionEndingNextButton").click();
    }
    assert.equal(await phase(p),"rescue-ending-summary",route+": missing final hub");
    const title=await p.locator("#rescueSummaryHeading").textContent();
    assert.notEqual(title,"SOME ASSEMBLY REQUIRED");
    assert.equal(await p.locator("#rescueEndingSummary").getAttribute("data-route"),route);
    await screenshot(p,route+"-1366x768-summary");
    observations.push({case:route+"-summary",title});
    await c.close();
    if(errors.length)throw Error(route+" browser errors: "+errors.join(" | "));
  }
  await writeFile(path.join(evidence,"results.json"),JSON.stringify({ok:true,observations},null,2));
  console.log("G5H Chromium PASS: unsolved-to-finished Ending C, decoy/anatomy, keyboard, save/resume, 5 viewport screenshots, safe checkpoint, A/B endings.");
}catch(err){
  await writeFile(path.join(evidence,"results.json"),JSON.stringify({ok:false,error:String(err?.stack||err),observations},null,2));
  console.error(err);
  process.exitCode=1;
}finally{
  await browser.close();
}
