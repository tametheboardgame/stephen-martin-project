/* GAME-SP4.1A: small, dependency-free scene asset readiness curtain.
 * Only decode imagery used by the visible scene. A timeout/failure NEVER
 * blocks saved state, text, keyboard, audio controls or narration indefinitely.
 */
(function () {
  "use strict";
  const overlay = document.getElementById("assetLoadingOverlay");
  const status = document.getElementById("assetLoadingStatus");
  const skip = document.getElementById("assetLoadingContinue");
  if (!overlay || !status || !skip || !window.Image) return;

  const MAX_WAIT_MS = 7000;
  const SHOW_CONTINUE_MS = 2200;
  const decoded = new Set();
  // Share simultaneous scene and warm-ahead image decoding per URL.
  const inFlight = new Map();
  let activeKey = null;
  let activeToken = 0;
  let activeReady = null;
  let inProgress = false;
  let revealTimer = null;
  let timeoutTimer = null;
  let currentImageCount = 0;

  function clearTimers() {
    if (revealTimer !== null) clearTimeout(revealTimer);
    if (timeoutTimer !== null) clearTimeout(timeoutTimer);
    revealTimer = timeoutTimer = null;
  }
  function urlFor(src) {
    try {
      const value = new URL(src, document.baseURI);
      return value.protocol === "http:" || value.protocol === "https:" ? value.href : null;
    } catch (_) { return null; }
  }
  function addBackgrounds(cssValue, into) {
    if (!cssValue || cssValue === "none") return;
    const matcher = /url\(\s*(?:"([^"]+)"|'([^']+)'|([^)]*))\s*\)/g;
    let match;
    while ((match = matcher.exec(cssValue))) {
      const url = urlFor((match[1] || match[2] || match[3] || "").trim());
      if (url) into.add(url);
    }
  }
  function sceneImages(root) {
    const urls = new Set();
    if (!root || !root.querySelectorAll) return urls;
    const nodes = [root, ...root.querySelectorAll("*")];
    for (const node of nodes) {
      if (node.hidden || node.closest?.("[hidden]")) continue;
      const computed = typeof window.getComputedStyle === "function"
        ? window.getComputedStyle(node) : null;
      // A scene shell can contain CSS-hidden actors belonging to another
      // route. Check computed visibility BEFORE scheduling their IMG sources.
      if (computed && (computed.display === "none" || computed.visibility === "hidden")) continue;
      if (node.tagName === "IMG") {
        const src = node.currentSrc || node.getAttribute("src");
        const url = src && urlFor(src);
        if (url) urls.add(url);
      }
      if (!computed) continue;
      addBackgrounds(computed.backgroundImage, urls);
      // A few legacy chapter cards put their scenery in pseudo-elements.
      for (const pseudo of ["::before", "::after"]) {
        const style = window.getComputedStyle(node, pseudo);
        if (style && style.content !== "none") addBackgrounds(style.backgroundImage, urls);
      }
    }
    return urls;
  }
  function decode(url) {
    if (decoded.has(url)) return Promise.resolve(true);
    const existing = inFlight.get(url);
    if (existing) return existing;
    const request = new Promise(resolve => {
      const image = new window.Image();
      let settled = false;
      const finish = good => {
        if (settled) return;
        settled = true;
        image.onload = null;
        image.onerror = null;
        if (good) decoded.add(url);
        resolve(good);
      };
      image.decoding = "async";
      image.onload = () => finish(true);
      image.onerror = () => finish(false);
      image.src = url;
      if (typeof image.decode === "function") {
        Promise.resolve().then(() => image.decode()).then(() => finish(true), () => finish(false));
      } else if (image.complete) {
        finish(image.naturalWidth > 0);
      }
    });
    // A failure is not permanent: remove its promise so future scenes retry.
    const shared = request.then(good => { inFlight.delete(url); return good; });
    inFlight.set(url, shared);
    return shared;
  }
  function complete(token, interrupted = false) {
    if (token !== activeToken) return;
    clearTimers();
    inProgress = false;
    overlay.hidden = true;
    skip.hidden = true;
    status.textContent = interrupted ? "Some artwork may still be loading." : "Scene ready.";
    document.getElementById("game")?.removeAttribute("aria-busy");
    const onReady = activeReady;
    activeReady = null;
    if (typeof onReady === "function") onReady();
  }
  function cancel() {
    activeToken++;
    clearTimers();
    inProgress = false;
    activeKey = null;
    activeReady = null;
    overlay.hidden = true;
    skip.hidden = true;
    document.getElementById("game")?.removeAttribute("aria-busy");
  }
  skip.addEventListener("click", () => complete(activeToken, true));

  /* True while current scene waits for its essential images. This is checked
   * before starting timed dialogue, so loading cannot silently skip jokes. */
  function busy() { return inProgress; }

  function present(key, root, onReady) {
    if (!key || !root) { cancel(); return false; }
    if (key === activeKey) {
      if (inProgress) activeReady = onReady;
      return inProgress;
    }
    const token = ++activeToken;
    clearTimers();
    activeKey = key;
    activeReady = onReady;
    const urls = [...sceneImages(root)].filter(url => !decoded.has(url));
    currentImageCount = urls.length;
    if (!urls.length) {
      inProgress = false;
      overlay.hidden = true;
      skip.hidden = true;
      return false;
    }
    inProgress = true;
    overlay.hidden = false;
    skip.hidden = true;
    status.textContent = "Preparing scene artwork…";
    document.getElementById("game")?.setAttribute("aria-busy", "true");
    revealTimer = setTimeout(() => {
      if (token !== activeToken) return;
      skip.hidden = false;
      status.textContent = "Still loading the illustration. You can continue now.";
    }, SHOW_CONTINUE_MS);
    timeoutTimer = setTimeout(() => complete(token, true), MAX_WAIT_MS);
    Promise.all(urls.map(decode)).then(results => {
      if (token !== activeToken) return;
      complete(token, results.some(success => !success));
    }).catch(() => complete(token, true));
    return true;
  }

  /* Light-touch prefetch for exactly one known near-future image only; no
   * multi-ending upfront download. Failed images can still be requested later. */
  function warm(url) {
    const resolved = urlFor(url);
    if (resolved && !decoded.has(resolved)) void decode(resolved);
  }
  window.SMP_ASSET_LOADER = { present, busy, cancel, warm,
    get pendingCount() { return inProgress ? currentImageCount : 0; } };
})();
