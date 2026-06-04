/**
 * 打印前：隐藏未手工包裹的「背 N 句」括注与裸露音标 /…/
 */
(function () {
  const PARENS = /（[^）]*背[^）]*）|（每类背[^）]*）/g;
  const DOT_BACK = /·\s*背\s*\d+\s*句/g;
  const IPA_SLASH = /\/[^/\s][^/]{0,60}\//g;

  function inHide(el) {
    return el.closest?.(".handout-print-hide, script, style");
  }

  function wrapMatch(text) {
    const frag = document.createDocumentFragment();
    let last = 0;
    const re = new RegExp(
      `${PARENS.source}|${DOT_BACK.source}|${IPA_SLASH.source}`,
      "g"
    );
    let m;
    while ((m = re.exec(text))) {
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      const span = document.createElement("span");
      span.className = "handout-print-hide";
      span.textContent = m[0];
      frag.appendChild(span);
      last = m.index + m[0].length;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    return frag;
  }

  function walkText(node) {
    if (node.nodeType !== Node.TEXT_NODE || !node.textContent?.trim()) return;
    if (inHide(node.parentElement)) return;
    const p = node.parentElement;
    if (!p || p.closest("main.sheet, .sheet, .grammar-handout-table-wrap")) return;
    if (!PARENS.test(node.textContent) && !DOT_BACK.test(node.textContent) && !IPA_SLASH.test(node.textContent))
      return;
    PARENS.lastIndex = 0;
    DOT_BACK.lastIndex = 0;
    IPA_SLASH.lastIndex = 0;
    p.replaceChild(wrapMatch(node.textContent), node);
  }

  function prepare() {
    document.getElementById("handout-print-logo-band")?.remove();
    document.querySelectorAll(".ipa").forEach((el) => el.classList.add("handout-print-hide"));
    const root = document.querySelector("main.sheet .inner, main.sheet, .sheet .inner, .sheet");
    if (!root) return;
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (tw.nextNode()) nodes.push(tw.currentNode);
    nodes.forEach(walkText);
  }

  let done = false;
  function runOnce() {
    if (done) return;
    done = true;
    prepare();
  }

  window.__handoutPreparePrint = function () {
    done = false;
    runOnce();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runOnce);
  } else {
    runOnce();
  }
  window.addEventListener("beforeprint", () => {
    done = false;
    runOnce();
  });
})();
