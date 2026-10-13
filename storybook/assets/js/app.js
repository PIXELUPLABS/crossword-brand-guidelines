/* Crossword brand guidelines: the app. Hash routes (#/logo, #/logo/2.3) render one chapter at a time. */
(function () {
"use strict";

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const hexToRgb = h => { const n = parseInt(h.replace("#", ""), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
function rgbToHsl([r, g, b]) { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b); let h = 0, s = 0; const l = (mx + mn) / 2;
  if (mx !== mn) { const d = mx - mn; s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; }
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)]; }
let fmt = "hex";
const fmtColor = hex => { const rgb = hexToRgb(hex); if (fmt === "rgb") return `rgb(${rgb.join(", ")})`; if (fmt === "hsl") { const [h, s, l] = rgbToHsl(rgb); return `hsl(${h}, ${s}%, ${l}%)`; } return hex.toLowerCase(); };
const lum = hex => hexToRgb(hex).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }).reduce((a, v, i) => a + v * [.2126, .7152, .0722][i], 0);
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + .05) / (y + .05); };
const isLight = hex => lum(hex) > .35;
const AV = "?v=20261013a"; /* bump when screens or textures change, so caches refresh */
const pad2 = n => String(n).padStart(2, "0");
const swash = s => `<span class="sw">${esc(s[0])}</span>${esc(s.slice(1))}`;

const ICON = {
  dl: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M8 2v8M4.5 6.8 8 10.3l3.5-3.5M2.5 13.5h11"/></svg>',
  copy: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="5" y="5" width="8.5" height="8.5"/><path d="M11 5V2.5H2.5V11H5"/></svg>',
  arr: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/></svg>',
  ext: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"/></svg>',
  play: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4.5 3v10l8.5-5z"/></svg>',
  reset: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M3 8a5 5 0 1 0 1.6-3.7M3 2.5v3h3"/></svg>',
  caret: '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="m3 4.5 3 3 3-3"/></svg>',
  x: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="m3.5 3.5 9 9m0-9-9 9"/></svg>',
  prev: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5"/></svg>',
};
const studs = '<span class="studs" aria-hidden="true"><i></i></span>';
const stamp = (label, attrs = "", cls = "") => `<button class="btn stamp ${cls}" ${attrs}>${studs}${esc(label)}</button>`;
const stampA = (label, href, cls = "") => `<a class="btn stamp ${cls}" href="${esc(href)}">${studs}${esc(label)}</a>`;
const btn = (label, attrs = "", icon = "", cls = "") => `<button class="btn ${cls}" ${attrs}>${icon ? ICON[icon] : ""}${esc(label)}</button>`;
const dlBtn = (kind, label, cls = "") => btn(label, `data-dl="${kind}"`, "dl", cls);
/* Eyebrow: a copy of components/ui/eyebrow/eyebrow.tsx. Each corner is the top-left ornament mirrored into place. */
const EB_CORNER = c => `<svg class="ec ${c}" width="9" height="9" viewBox="-5 -5 9 9" aria-hidden="true"><path d="M0 0.25H-3.03A1.7 1.7 0 1 0 -1.83 3.15"/><path d="M0.25 0V-3.03A1.7 1.7 0 1 1 3.15 -1.83"/></svg>`;
const eyebrow = (t, dark) => `<span class="eyebrow${dark ? " dark" : ""}"><span class="et">${esc(t)}</span>${["tl", "tr", "bl", "br"].map(EB_CORNER).join("")}</span>`;
const nf = (o = {}) => { const r = o.r || 28; return `<div class="nf${o.inner ? " inner" : ""}" style="--c:${o.c || "#e0be60"};--o:${o.o ?? 1};--r:${r}px;--in:${o.in ?? 12}px;--w:${o.w || 1}px" aria-hidden="true"><i class="t"></i><i class="b"></i><i class="l"></i><i class="rr"></i><svg class="ctl" viewBox="0 0 10 10"><path d="M10 0A10 10 0 0 1 0 10"/></svg><svg class="ctr" viewBox="0 0 10 10"><path d="M0 0A10 10 0 0 0 10 10"/></svg><svg class="cbl" viewBox="0 0 10 10"><path d="M0 0A10 10 0 0 1 10 10"/></svg><svg class="cbr" viewBox="0 0 10 10"><path d="M10 0A10 10 0 0 0 0 10"/></svg></div>`; };
const svgOf = (key, fill = "currentColor", attrs = "") => LOGO[key].replace("<svg ", `<svg ${attrs} `).replace(/currentColor/g, fill);
const vbox = svg => { const p = svg.match(/viewBox="([^"]+)"/)[1].trim().split(/\s+/).map(Number); return { w: p[2], h: p[3] }; };
const glyphSvg = (k, size = "100%") => `<svg viewBox="0 0 74 74.95" width="${size}" height="${size}" fill="none" aria-hidden="true"><path d="${GLYPHS[k]}" fill="#E0BE60" stroke="#6C2332" stroke-width="${k === "quill" ? .5 : .47}"/></svg>`;
const band = (g = "chat") => `<div class="band" aria-hidden="true"><div class="badge">${glyphSvg(g)}</div></div>`;

let toastT;
function toast(msg, sw) { const t = $("#toast"); t.innerHTML = (sw ? `<i style="background:${sw}"></i>` : "") + esc(msg); t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("on"), 1900); }
async function copyText(text, label, sw) { let ok = false; try { await navigator.clipboard.writeText(text); ok = true; } catch (e) { const ta = document.createElement("textarea"); ta.value = text; ta.style.cssText = "position:fixed;opacity:0;top:0;left:0"; document.body.appendChild(ta); ta.select(); try { ok = document.execCommand("copy"); } catch (_) {} ta.remove(); }
  toast(ok ? `Copied ${label}` : "Copy failed. Select the text and copy it manually.", sw); }
async function copyRich(html, text, label) {
  try { await navigator.clipboard.write([new ClipboardItem({ "text/html": new Blob([html], { type: "text/html" }), "text/plain": new Blob([text], { type: "text/plain" }) })]); toast(`Copied ${label}`); }
  catch (e) { const d = document.createElement("div"); d.contentEditable = "true"; d.style.cssText = "position:fixed;left:-9999px;top:0"; d.innerHTML = html; document.body.appendChild(d); const r = document.createRange(); r.selectNodeContents(d); const s = getSelection(); s.removeAllRanges(); s.addRange(r); let ok = false; try { ok = document.execCommand("copy"); } catch (_) {} s.removeAllRanges(); d.remove(); toast(ok ? `Copied ${label}` : "Copy failed in this browser. Use Copy HTML instead."); } }
const dlNS = (typeof window.claude === "object" && window.claude && typeof window.claude.use === "function") ? window.claude.use("downloads").catch(() => null) : Promise.resolve(null);
async function saveFile(name, data) {
  const ns = await dlNS;
  if (ns) { try { await ns.save({ filename: name, data }); toast(`Downloaded ${name}`); } catch (e) { const c = e && e.code; if (c === "declined") return; if (c === "rate_limited") { toast("A download prompt is already open"); return; } if (c === "rejected_extension" || c === "extension_not_enabled") { toast("This file type can't be saved here. Use Copy, or download the ZIP."); return; } toast(`Couldn't download ${name}`); } return; }
  const blob = data instanceof Blob ? data : new Blob([data]); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 5000);
}
async function fetchBlob(u) { const r = await fetch(u); if (!r.ok) throw new Error(u); return r.blob(); }
function rasterize(svg, width, bg) {
  const vb = vbox(svg), pad = bg ? Math.round(width * .14) : 0, W = width - 2 * pad, H = Math.round(W * vb.h / vb.w);
  const src = svg.replace(/<svg ([^>]*)>/, (m, a) => `<svg ${a.replace(/\s(width|height)="[^"]*"/g, "")} width="${W}" height="${H}">`);
  return new Promise((res, rej) => { const img = new Image(); img.onload = () => { const c = document.createElement("canvas"); c.width = width; c.height = H + 2 * pad; const x = c.getContext("2d"); if (bg) { x.fillStyle = bg; x.fillRect(0, 0, c.width, c.height); } x.drawImage(img, pad, pad, W, H); c.toBlob(b => b ? res(b) : rej(new Error("render")), "image/png"); }; img.onerror = () => rej(new Error("svg")); img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(src); });
}

/* ---------- page numbers ---------- */
let pgN = 0; const PG = {};
for (const ch of CH) { if (ch.id !== "home") PG[ch.n + ".0"] = pad2(++pgN); for (const [k] of ch.pages) PG[k] = pad2(++pgN); }
const metaRow = (num, chapter) => `<div class="metarow"><span>${esc(num)}</span><span class="c">${esc(chapter)}</span><span class="r">Crossword · Brand Guidelines<b>${PG[num] || ""}</b></span></div>`;
const gpOpen = (num, ch) => `<section class="gp" id="p-${num}" data-sub="${num}">${metaRow(num, ch.t)}`;
const divider = (ch, lead, actions = "") => `<section class="divider gp" id="p-${ch.n}.0" data-sub="${ch.n}.0">${metaRow(ch.n + ".0", ch.t)}<div style="padding-top:56px">${eyebrow(`Chapter ${ch.n} · ${ch.pages.length} ${ch.pages.length === 1 ? "page" : "pages"}`)}<h1>${swash(ch.t)}</h1>${lead ? `<p class="lead">${esc(lead)}</p>` : ""}${actions ? `<div class="btnrow">${actions}</div>` : ""}</div>${band(ch.glyph)}</section>`;
const copyCol = (title, paras, extra = "") => `<div class="gp-copy"><h2>${swash(title)}</h2>${paras.map(p => `<p>${p}</p>`).join("")}${extra}</div>`;

/* ======================================================================
   1 HOME
   ====================================================================== */
function renderHome(ch) {
  const toc = CH.filter(c => c.id !== "home").map(c => `<section><h3><span class="no">${pad2(c.n)}</span>${esc(c.t)}</h3>${c.pages.map(([k, t]) => `<a href="#/${c.id}/${k}"><span>${esc(t)}</span><span>${PG[k]}</span></a>`).join("")}</section>`).join("");
  return `<section class="cover" aria-label="Crossword brand guidelines">
    ${nf({ in: 18, r: 44, o: .6 })}${nf({ in: 30, r: 34, o: .28, w: .5 })}
    <div class="lock">${svgOf("signature", "currentColor", 'role="img" aria-label="Crossword"')}</div>
    <img class="stamp-img" src="assets/figma/stamp-forest.webp" alt="" width="600" height="600">
    <img class="seal-img" src="assets/figma/seal-forest.webp" alt="" width="498" height="500">
    <h1>${swash("Brand")}<span class="l2">${swash("Guidelines")}</span></h1>
    <div class="foot"><span>Crossword: Brand Guidelines · ${META.doc} · ${META.version}</span><span>Crossword, Inc. · A CometChat Product</span></div>
  </section>
  ${gpOpen("1.1", ch)}<div class="overview">
    <div class="gp-copy">${eyebrow("Introduction")}<h2 style="margin-top:20px">${swash("Overview")}</h2>
      <p>These guidelines describe how Crossword looks, sounds and moves: the system behind the concierge desk for your brand.</p>
      <p>Crossword is an AI shopper assistant, presented as a hire rather than a technology. A seasoned concierge who remembers, recommends, resolves and reports, all within your guardrails.</p>
      <p>The identity borrows from a grand hotel’s front desk (the service bell, gilt-edged stationery, wax seals, damask-lined panels) and sets it with modern precision.</p></div>
    <div><p class="statement">${swash("Crossword is the concierge")}<span class="l2">desk for your brand.</span></p>
      <div class="pillars">
        <div><h3 class="lbl">Guardrail</h3><p>Never a generic AI chatbot or SaaS dashboard. Never a costume. A modern service brand that uses hospitality craft as proof of care.</p></div>
        <div><h3 class="lbl">Personality</h3><p>Attentive, gracious, discreet, trustworthy, effortless.</p></div>
        <div><h3 class="lbl">Source of truth</h3><p>DESIGN.md holds the tokens and rules; brand.md holds the reasoning. Both are in Resources.</p></div>
      </div>
      <div class="btnrow" style="margin-top:32px">${stampA("Start with the logo", "#/logo")}${dlBtn("kit", "Download all assets")}</div></div>
  </div></section>
  ${gpOpen("1.2", ch)}<div class="gp-grid"><div class="gp-copy">${eyebrow("Index")}<h2 style="margin-top:20px">${swash("Contents")}</h2><p>Ten chapters, numbered as in the Figma guideline. Components, Motion and Voice come from the shipped website.</p></div><div class="toc">${toc}</div></div></section>`;
}

/* ======================================================================
   2 LOGO
   ====================================================================== */
const CWAYS = [
  ["ink", "Ink on cream", "#141414", "#FFF9EA"], ["cream", "Cream on ink", "#FFF9EA", "#141414"], ["gold-maroon", "Gold on maroon", "#E0BE60", "#7D0034"],
  ["gold-forest", "Gold on forest", "#E0BE60", "#00331A"], ["gold-aubergine", "Gold on aubergine", "#E0BE60", "#462160"], ["cream-night", "Cream on night", "#FFF9EA", "#0E0501"],
];
const cwState = { signature: 0, mark: 2 };
function logoStage(key) {
  const [id, name, fg, bg] = CWAYS[cwState[key]];
  return `<div class="stage" data-logo-stage="${key}"><div class="logo-stage" style="background:${bg};--fg:${fg}"><div class="${key === "mark" ? "mk" : "lk"}">${svgOf(key, "currentColor", `role="img" aria-label="Crossword ${key}"`)}</div></div></div>
  <div class="stage-bar"><div class="colourways" role="group" aria-label="Colourway">${CWAYS.map(([cid, cn, f, b], i) => `<button class="cw" data-cw="${key}:${i}" aria-pressed="${i === cwState[key]}"><i style="background:${b};--f:${f}"></i>${esc(cn)}</button>`).join("")}</div></div>
  <div class="stage-bar"><span class="lbl">Master artwork · ${esc(name)}</span><div class="btnrow">${btn("SVG", `data-logo-dl="${key}:svg"`, "dl", "mini")}${btn("PNG, transparent", `data-logo-dl="${key}:png"`, "dl", "mini")}${btn("PNG, on ground", `data-logo-dl="${key}:pngbg"`, "dl", "mini")}${btn("Copy SVG", `data-logo-copy="${key}"`, "copy", "mini")}</div></div>`;
}
function constructionSVG() {
  const m = "#7d0034", X = 113.67, L = { x: 120, y: 120 };
  const s = svgOf("signature", "currentColor").replace(/<svg[^>]*>/, "").replace("</svg>", "");
  const gy = v => L.y + v, gx = v => L.x + v;
  return `<svg viewBox="0 0 1080 380" role="img" aria-label="Logo construction: X is the mark height; gap 0.4X; mark 1.43X wide; lockup 7.35X">
  <g fill="none" stroke="${m}" stroke-opacity=".45" stroke-dasharray="4 4" stroke-width="1">
    <path d="M40 ${gy(1.53)}H1040M40 ${gy(115.2)}H1040"/>
    <path d="M${gx(0)} 60V320M${gx(162.9)} 60V320M${gx(209.3)} 60V320M${gx(836.4)} 60V320"/></g>
  <g style="color:var(--ink)"><g transform="translate(${L.x} ${L.y})" fill="currentColor">${s}</g></g>
  <g stroke="${m}" stroke-width="1.5" fill="none"><path d="M90 ${gy(1.53)}V${gy(115.2)}M84 ${gy(1.53)}h12M84 ${gy(115.2)}h12"/><path d="M${gx(162.9)} 92H${gx(209.3)}M${gx(162.9)} 86v12M${gx(209.3)} 86v12"/><path d="M${gx(0)} 280H${gx(162.9)}M${gx(0)} 274v12M${gx(162.9)} 274v12"/><path d="M${gx(0)} 330H${gx(836.4)}M${gx(0)} 324v12M${gx(836.4)} 324v12"/></g>
  <g fill="${m}"><text x="66" y="${gy(62)}">X</text><text x="${gx(166)}" y="80">0.4X</text><text x="${gx(40)}" y="302">1.43X</text><text x="${gx(380)}" y="352">7.35X</text></g></svg>`;
}
function clearspaceSVG() {
  const m = "#7d0034", h = 116.7, w = 836.4, X = 113.67, c = X / 2, ox = 120, oy = 100;
  const s = svgOf("signature", "currentColor").replace(/<svg[^>]*>/, "").replace("</svg>", "");
  const sq = (x, y) => `<rect x="${x}" y="${y}" width="${c}" height="${c}" fill="${m}" fill-opacity=".14"/><text x="${x + c / 2}" y="${y + c / 2 + 4}" text-anchor="middle">½X</text>`;
  return `<svg viewBox="0 0 1080 320" role="img" aria-label="Clear space: half of X on every side of the lockup">
  <rect x="${ox - c}" y="${oy - c}" width="${w + 2 * c}" height="${h + 2 * c}" fill="${m}" fill-opacity=".05" stroke="${m}" stroke-opacity=".7" stroke-dasharray="6 4"/>
  <g fill="${m}" style="font:600 11px var(--label)">${sq(ox - c, oy - c)}${sq(ox + w, oy - c)}${sq(ox - c, oy + h)}${sq(ox + w, oy + h)}</g>
  <g style="color:var(--ink)"><g transform="translate(${ox} ${oy})" fill="currentColor">${s}</g></g></svg>`;
}
function renderLogo(ch) {
  const misuse = [
    ["Don’t set the logo in gold on cream", `<div class="lk" style="color:#e0be60">${svgOf("signature")}</div>`, "#fff9ea"],
    ["Don’t stretch or distort", `<div class="lk" style="transform:scaleY(1.7) scaleX(.8)">${svgOf("signature")}</div>`],
    ["Don’t rotate the logo", `<div class="lk" style="transform:rotate(-14deg)">${svgOf("signature")}</div>`],
    ["Don’t recolour or apply gradients", `<div class="lk">${svgOf("signature", "url(#bad-grad)").replace(/(<svg[^>]*>)/, '$1<defs><linearGradient id="bad-grad" x1="0" x2="1"><stop offset="0" stop-color="#7c3aed"/><stop offset="1" stop-color="#0ea5e9"/></linearGradient></defs>')}</div>`],
    ["Don’t retype the wordmark in script", `<div style="display:flex;align-items:center;gap:12px;color:var(--ink)"><div style="width:52px">${svgOf("mark")}</div><span style="font:400 34px var(--script)">Crossword</span></div>`],
    ["Don’t add shadows or outlines", `<div class="lk" style="color:#fff9ea;filter:drop-shadow(1px 0 0 #141414) drop-shadow(-1px 0 0 #141414) drop-shadow(0 1px 0 #141414) drop-shadow(4px 5px 3px rgba(0,0,0,.5))">${svgOf("signature")}</div>`],
    ["Don’t place it on busy texture", `<div class="lk" style="color:#141414">${svgOf("signature")}</div>`, "#7d0034 url('assets/tex/damask-maroon-panel.webp') center/cover"],
    ["Don’t split the colours", `<div style="display:flex;align-items:center;gap:14px;width:74%"><div style="width:20%;color:#e0be60">${svgOf("mark")}</div><div style="width:76%;color:var(--ink)">${svgOf("wordmark")}</div></div>`],
    ["Don’t put the mark in a chat bubble", `<div style="display:grid;place-items:center;width:88px;height:70px;border-radius:24px 24px 24px 6px;background:#7c3aed;color:#fff"><div style="width:54px">${svgOf("mark")}</div></div>`],
  ];
  return divider(ch, "The concierge bell and a Crimson Pro wordmark: Crossword’s signature. Master artwork lives here; every file is generated from the outlined Figma master.", stamp("Download logo pack", 'data-dl="logos"') + dlBtn("favicons", "Favicons")) +
  `${gpOpen("2.1", ch)}<div class="gp-grid">${copyCol("Logotype", ["The lockup pairs the concierge bell with a refined serif wordmark. Mark and wordmark share a height and a baseline, so the bell reads like the first letter of a signature.", "Use the full lockup wherever the brand is introduced: the footer, decks, documents and partner placements. Always use the supplied artwork; never retype the wordmark."])}<div>${logoStage("signature")}</div></div></section>
  ${gpOpen("2.2", ch)}<div class="gp-grid">${copyCol("Mark", ["The mark is a hotel service bell: a dome on a flat base, an inner ring and a small handle. Ring for service. The concierge is one tap away.", "It stands alone as the app icon, favicon and avatar, and sits at the centre of every stamp and seal. It is a solid glyph: never outlined, rounded or animated.", "Its proportions are 1.43 : 1, width to height."])}<div>${logoStage("mark")}</div></div></section>
  ${gpOpen("2.3", ch)}<div class="gp-grid">${copyCol("Logo construction", ["The lockup is built on one unit, <b>X</b>: the height of the bell.", "The wordmark matches the bell’s height (≈1.03X) and shares its baseline. The gap is 0.4X; the bell is 1.43X wide; the full lockup is 7.35X.", "These proportions are fixed. Never redraw, respace or rebalance the parts."])}
    <div><div class="stage grid construct">${constructionSVG()}</div>
    <table class="kv"><tr><td>X · mark height</td><td>113.67 units</td></tr><tr><td>Mark width</td><td>162.91 · 1.43X</td></tr><tr><td>Wordmark height</td><td>116.73 · 1.03X</td></tr><tr><td>Gap, mark to wordmark</td><td>46.40 · 0.40X</td></tr><tr><td>Lockup width</td><td>836.45 · 7.35X</td></tr></table></div></div></section>
  ${gpOpen("2.4", ch)}<div class="gp-grid">${copyCol("Clearspace", ["Keep at least half of X clear on every side of the lockup, and a quarter of the glyph’s width around the icon.", "No type, edge, rail or ornament enters this zone. The official export frames already include about 0.75X: place them as supplied."])}
    <div><div class="stage grid construct">${clearspaceSVG()}</div></div></div></section>
  ${gpOpen("2.5", ch)}<div class="gp-grid">${copyCol("Scalability", ["The lockup holds its detail down to <b>96px</b> wide on screen and 25mm in print. Below that, use the bell alone.", "The bell is legible down to 16px for favicons. In interface chrome, use it at 24px or larger; the website header uses 40px."])}
    <div class="stage scale-list">${[600, 400, 240, 160, 96].map(w => `<div class="scale-row"><div class="lk" style="width:${w}px;max-width:100%">${svgOf("signature")}</div><span class="lbl">${w}px${w === 96 ? " · minimum" : ""}</span></div>`).join("")}
      <div class="scale-row"><div style="display:flex;align-items:flex-end;gap:28px;color:var(--ink)">${[64, 40, 24, 16].map(w => `<div style="width:${w}px">${svgOf("mark")}</div>`).join("")}</div><span class="lbl">Bell · 64 · 40 · 24 · 16px</span></div></div></div></section>
  ${gpOpen("2.6", ch)}<div class="gp-grid">${copyCol("Incorrect usage", ["The logo is a fixed piece of artwork. These are the most common ways it goes wrong.", "When in doubt, use the master files on cream, ink, maroon, forest or aubergine, with nothing else around them."])}
    <div class="misuse">${misuse.map(([cap, art, bg]) => `<figure><div class="tile" style="${bg ? `background:${bg}` : ""}">${art}</div><figcaption>${esc(cap)}</figcaption></figure>`).join("")}</div></div></section>`;
}

/* ======================================================================
   3 COLOUR
   ====================================================================== */
const fmtSeg = () => `<div class="stage-bar"><span class="lbl">Click a swatch to copy</span><span class="seg" role="group" aria-label="Colour format">${["hex", "rgb", "hsl"].map(f => `<button data-fmt="${f}" aria-pressed="${f === fmt}">${f.toUpperCase()}</button>`).join("")}</span></div>`;
const bigSwatch = ([name, hex, role, token]) => { const l = isLight(hex); return `<button class="swatch${l ? " light" : ""}" data-copy-colour="${hex}" data-name="${esc(name)}" style="--bg:${hex};--fg:${l ? "#141414" : "#fff9ea"}"><b>${esc(name)}</b><span class="v" data-hex="${hex}">${fmtColor(hex)}</span>${token ? `<span class="v" style="opacity:.6">${esc(token)}</span>` : ""}<span class="r">${esc(role)}</span></button>`; };
const chip = ([name, hex, role]) => `<button class="chip" data-copy-colour="${hex}" data-name="${esc(name)}"><i style="--bg:${hex}"></i><b>${esc(name)}</b><span class="v" data-hex="${hex}">${fmtColor(hex)}</span><span class="r">${esc(role)}</span></button>`;
function paletteCSS() { const all = [...COLOURS.brand, ...COLOURS.supporting, ...COLOURS.surfaces, ...COLOURS.tones]; return ":root {\n" + all.map(([n, h]) => `  --color-${n.toLowerCase().replace(/[^a-z0-9]+/g, "-")}: ${h.toLowerCase()};`).join("\n") + "\n}\n"; }
function renderColour(ch) {
  const pairs = PAIRS.map(([fg, bg, label]) => { const r = ratio(fg, bg), pass = r >= 4.5, large = r >= 3; return `<figure class="cpair"><div class="sample" style="--bg:${bg};--fg:${fg}"><b>Aa</b><span>${r.toFixed(2)}:1</span></div><figcaption><span class="grade ${pass ? "pass" : "fail"}">${pass ? (r >= 7 ? "AAA" : "AA") : (large ? "Large only" : "Fail")}</span>${esc(label)}</figcaption></figure>`; }).join("");
  const use = (bg, fg, cls, inner, cap, style = "") => `<figure style="margin:0;position:relative"><div class="use ${cls}" style="--bg:${bg};--fg:${fg};${style}">${inner}</div><figcaption class="lbl">${cap}</figcaption></figure>`;
  return divider(ch, "Warm paper, jewel-toned livery and gold trim, taken from the front desk. Maroon is the brand colour; gold is always trim, never paint.", stamp("Copy palette as CSS", "data-copy-palette") + dlBtn("tokens", "Download tokens")) +
  `${gpOpen("3.1", ch)}<div class="gp-grid">${copyCol("Brand palette", ["Maroon is the brand colour and the ground of the primary action. Wine is its quieter partner, the outline on every gilded ornament.", "Gold is trim: studs, rails, dashed borders, seals. Forest and aubergine are livery colours for featured panels, one per view."])}
    <div><div class="swatches">${COLOURS.brand.map(bigSwatch).join("")}</div><div class="group-h"><span class="lbl">Supporting & artwork</span></div><div class="chips">${COLOURS.supporting.map(chip).join("")}</div>${fmtSeg()}</div></div></section>
  ${gpOpen("3.2", ch)}<div class="gp-grid">${copyCol("Neutrals & surfaces", ["Crossword starts on paper, never white. Cream is the page; sand marks active and selected states; parchment and linen ground mock-ups and inputs.", "Ink carries all text. Muted text never drops below 60% ink. Rail and engraved lines are decorative and never carry meaning alone."])}
    <div><div class="swatches">${COLOURS.surfaces.map(bigSwatch).join("")}</div><div class="group-h"><span class="lbl">Text tones & lines</span></div><div class="chips">${COLOURS.tones.map(chip).join("")}</div>${fmtSeg()}</div></div></section>
  ${gpOpen("3.3", ch)}<div class="gp-grid">${copyCol("Colour in use", ["Most of any composition is cream paper. A livery panel adds emphasis, one per viewport. Maroon marks the action; gold appears only as fine trim.", "The bar shows the balance of a typical page."])}
    <div>${(() => { const R = [["#FFF9EA", 60, "Cream 60%"], ["#F3E9D4", 15, "Sand 15%"], ["#00331A", 12, "Livery 12%"], ["#7D0034", 8, "Maroon 8%"], ["#E0BE60", 5, "Gold 5%"]]; return `<div class="ratio">${R.map(([c, p]) => `<div style="--bg:${c};width:${p}%"></div>`).join("")}</div><div class="legend">${R.map(([c, , l]) => `<span><i style="--bg:${c}"></i>${l}</span>`).join("")}</div>`; })()}</div>
    <div class="uses full">
      ${use("#FFF9EA", "#141414", "light", `${eyebrow("Customer lifecycle")}<h4>${swash("Every conversation")}<span class="l2">has a job to do</span></h4><p style="color:#66645e;opacity:1">Crossword turns a need into a confident purchase.</p>${stamp("Book a demo")}`, "Cream page · ink · maroon action")}
      ${use("#00331A", "#fff9ea", "", `${nf({ r: 22, o: .7 })}${eyebrow("Trust", true)}<h4>${swash("Your data is")}<span class="l2">safe with us</span></h4><p style="color:#dfe3d2">Guardrails your legal team has cleared.</p>${stamp("Book a demo", "", "wine")}`, "Forest livery · on-dark · wine action")}
      ${use("#462160", "#fff9ea", "", `${nf({ r: 22, o: .7 })}${eyebrow("Human in the loop", true)}<h4>${swash("Handoffs built")}<span class="l2">for real teams</span></h4><p>Whisper, approve, take over.</p>${stamp("Learn more", "", "wine")}`, "Aubergine damask · cream · gold trim", "background-image:url('assets/tex/damask-aubergine-panel-framed.webp')")}
    </div></div></section>
  ${gpOpen("3.4", ch)}<div class="gp-grid">${copyCol("Usage principles", ["Every text pairing reaches WCAG AA (4.5:1) at body sizes. The ratios below are measured live from the tokens.", "Gold works beautifully on maroon, wine, forest and aubergine, and fails as text on cream."])}
    <div><div class="contrast-grid">${pairs}</div>
    <div class="dodont" style="margin-top:48px">
      <div class="dd"><h4>Gold is the trim</h4><div class="pair"><div><span class="tag" style="--c:#9b1c1c">Don’t</span><div class="ex" style="--bg:#fff9ea;--fg:#e0be60"><b>The concierge desk for your brand</b></div></div><div><span class="tag" style="--c:#2f6b3f">Do</span><div class="ex" style="--bg:#7d0034;--fg:#fff9ea;box-shadow:inset 0 0 0 1px #e0be60"><b>The concierge desk for your brand</b></div></div></div></div>
      <div class="dd"><h4>One livery per view</h4><div class="pair"><div><span class="tag" style="--c:#9b1c1c">Don’t</span><div class="ex" style="background:linear-gradient(90deg,#00331a 50%,#462160 50%);color:#fff9ea"><b>Two jewel panels compete</b></div></div><div><span class="tag" style="--c:#2f6b3f">Do</span><div class="ex" style="--bg:#fff9ea;--fg:#141414;background:linear-gradient(#00331a 38%,#fff9ea 38%)"><b style="color:#141414">Paper first, then one panel</b></div></div></div></div>
    </div></div></div></section>`;
}

/* ======================================================================
   4 TYPOGRAPHY
   ====================================================================== */
const ladderCSS = ([key, role, fam, w, size, lh, ls, tc]) => `.${key} {\n  font-family: "${fam}"${fam === "Geist" || fam === "Open Sans" ? ", system-ui, sans-serif" : ", Georgia, serif"};\n  font-weight: ${w};\n  font-size: ${size}px;\n  line-height: ${lh};\n  letter-spacing: ${ls};${tc ? `\n  text-transform: ${tc};` : ""}\n}`;
function renderType(ch) {
  const fam = f => f === "Crimson Pro" ? "var(--serif)" : f === "Geist" ? "var(--sans)" : "var(--label)";
  const ladder = LADDER.map(r => { const [key, role, f, w, size, lh, ls, tc, sample, sw] = r; const disp = Math.min(size, 64);
    return `<div class="row"><span class="lbl">${esc(role)}</span><p class="s" style="font:${w} ${disp}px/${lh} ${fam(f)};letter-spacing:${ls};${tc ? "text-transform:" + tc : ""}">${sw ? swash(sample) : esc(sample)}</p><span class="spec">${esc(f)} ${w} · ${size}/${lh} · ${ls}${tc ? " · caps" : ""}</span>${btn("CSS", `data-copy-ladder="${key}"`, "copy", "mini")}</div>`; }).join("");
  const weights = (f, list) => `<div class="weights">${list.map(([w, n, use]) => `<div class="row"><span class="lbl">${esc(n)}</span><span class="s" style="font-family:${f};font-weight:${w}">The concierge desk</span><span class="u">${esc(use)}</span></div>`).join("")}</div>`;
  return divider(ch, "Crimson Pro is the voice, Geist does the work, and one Parisienne capital signs every headline. All four families are free under the SIL Open Font License.", `<a class="btn" href="https://fonts.google.com/share?selection.family=Crimson+Pro:wght@200;300;400;500%7CGeist:wght@300;400;500;600%7COpen+Sans:wght@600%7CParisienne" target="_blank" rel="noopener">${ICON.ext}Get the fonts</a>`) +
  `${gpOpen("4.1", ch)}<div class="gp-grid">${copyCol("Primary typeface", ["Crimson Pro brings literary warmth and authority to headlines, quotes and navigation.", "Display sizes are ExtraLight with tight tracking: the larger the type, the lighter it gets. Light sets second lines and quotes; Regular and Medium set the 16px interface serif."])}
    <div><div class="stage specimen" style="--f:var(--serif);--w:200"><p class="big">Crimson Pro</p><p class="glyphs">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 &amp;@£$%(.,;:’”—)</p></div>
    ${weights("var(--serif)", [[200, "ExtraLight 200", "Display and section headlines"], [300, "Light 300", "Second headline line, quotes, h4–h6"], [400, "Regular 400", "Nav, tab titles, text links"], [500, "Medium 500", "Button labels at 16px"]])}<p class="note">SIL Open Font License · Google Fonts · self-hosted on the site via next/font.</p></div></div></section>
  ${gpOpen("4.2", ch)}<div class="gp-grid">${copyCol("Secondary typeface", ["Geist carries everything functional: body copy, microcopy, footer links and all product UI.", "Its neutral, precise forms keep the serif voice from turning ornamental. It is the only typeface inside the product."])}
    <div><div class="stage specimen" style="--f:var(--sans);--w:300;--ls:-.02em"><p class="big" style="letter-spacing:-.05em">Geist</p><p class="glyphs">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 &amp;@£$%(.,;:’”—)</p></div>
    ${weights("var(--sans)", [[300, "Light 300", "Large body (24px), lead paragraphs"], [400, "Regular 400", "Body, microcopy, product UI"], [500, "Medium 500", "UI emphasis, labels in mock-ups"], [600, "SemiBold 600", "Product numerals, sparingly"]])}</div></div></section>
  ${gpOpen("4.3", ch)}<div class="gp-grid">${copyCol("Type-setting", ["Hierarchy comes from family and size, not weight. Headlines are two lines in sentence case, each line a complete phrase.", "Tracking has five steps: body −2%, interface serif −3%, h4–h6 −4%, display −5%, labels +12%. Desktop sizes shown; display and headline step down to 44 and 36 on phones."])}
    <div class="ladder">${ladder}</div></div></section>
  ${gpOpen("4.4", ch)}<div class="gp-grid">${copyCol("Swash capital", ["Every headline opens with one Parisienne capital at about 1.33× the line size, like an envelope addressed by hand.", "One swash per headline, one swash headline per section. Never set words, body, buttons or product UI in script.", "The website ships a 3KB subset of ten capitals. Add a letter to the subset before you write a headline that needs it."])}
    <div><div class="stage swash-lab"><p class="out" id="swash-out"></p>
      <div class="fields"><div class="field"><label for="sw-1">Line one</label><input id="sw-1" value="Every conversation" spellcheck="false"></div><div class="field"><label for="sw-2">Line two</label><input id="sw-2" value="has a job to do" spellcheck="false"></div></div>
      <p class="warn" id="swash-warn" role="status"></p>
      <div class="subset" aria-label="Capitals in the shipped subset">${[...SUBSET].map(c => `<span>${c}</span>`).join("")}</div></div>
      <div class="stage-bar"><span class="lbl">Implementation · line-height: 0 on the swash span</span>${btn("Copy HTML", "data-copy-swash", "copy", "mini")}</div></div></div></section>
  ${gpOpen("4.5", ch)}<div class="gp-grid">${copyCol("Supporting & fallback fonts", ["Open Sans SemiBold has one job: the 12px uppercase eyebrow, framed like an engraved plate.", "If a brand font can’t load, these stacks hold the hierarchy. Tangerine, Inter and DM Sans are retired."])}
    <div><div class="stage demo" style="display:flex;flex-wrap:wrap;gap:22px;align-items:center">${eyebrow("Customer lifecycle")}<span class="lbl">Open Sans 600 · 12px · +12% · uppercase · label olive</span></div>
    <div class="fallback" style="margin-top:18px">${[["Crimson Pro", "Crimson Pro, ui-serif, Georgia, serif", "var(--serif)"], ["Parisienne", "Parisienne, cursive · if it fails, drop the swash and set the word in Crimson Pro", "var(--script)"], ["Geist", "Geist, ui-sans-serif, system-ui, sans-serif", "var(--sans)"], ["Open Sans", "Open Sans, ui-sans-serif, system-ui, sans-serif", "var(--label)"]].map(([n, s, f]) => `<div class="row"><b style="font-family:${f}">${n}</b><span class="mono" style="color:var(--muted)">${esc(s)}</span></div>`).join("")}</div>
    <h3 class="lbl" style="margin:32px 0 6px;color:var(--error)">Retired from the system</h3>
    <ul class="retired" style="list-style:none;margin:0;padding:0">${[["Tangerine", "A second script. Use Parisienne for swashes, Crimson Pro Light for numerals."], ["Inter", "Use Geist for every interface label."], ["DM Sans", "Only inside a mock-up of a specific merchant’s site."], ["Libre Franklin, General Sans, Great Vibes…", "Figma exploration leftovers. Remove from production frames."]].map(([a, b]) => `<li><s>${esc(a)}</s><span style="color:var(--soft);font-weight:300">${esc(b)}</span></li>`).join("")}</ul></div></div></section>`;
}

/* ======================================================================
   5 GRAPHIC SYSTEM
   ====================================================================== */
function renderGraphic(ch) {
  const orn = (title, body, inner, style = "") => `<figure class="orn"><div class="tile" style="${style}">${inner}</div><figcaption><span class="lbl">${esc(title)}</span><p>${esc(body)}</p></figcaption></figure>`;
  const gal = (list, tilt, kind) => list.map(([id, label, src]) => `<figure><div class="img${tilt ? " tilt" : ""}"><img src="${src}" alt="${esc(label)}" loading="lazy"></div><figcaption><span>${esc(label)}</span>${btn("Save", `data-save="${src}" data-name="crossword-${id}${src.slice(src.lastIndexOf("."))}"`, "dl", "mini")}</figcaption></figure>`).join("");
  return divider(ch, "Engraved, not illustrated: rails, studs, notched corners, stamps, seals and damask. Ornament lives at the edges and keeps the content clean.", dlBtn("textures", "Textures & patterns") + dlBtn("stamps", "Stamps & seals")) +
  `${gpOpen("5.1", ch)}<div class="gp-grid">${copyCol("Ornaments & frames", ["Crossword’s ornament comes from stationery and banknotes: 0.5px rails, gold studs, notched corners and curled label frames.", "Corners are square or notched inward, never rounded. Gold outlines and seals; it never fills a page."])}
    <div class="orn-grid">
      ${orn("Page rails", "0.5px rails 24px in from each edge; a gold tick marks each section.", `<div class="frame-demo" style="position:absolute;inset:0"><span class="rl" style="left:24px"></span><span class="rl" style="right:24px"></span><span class="acc"></span><div style="position:absolute;left:48px;top:76px;right:48px"><div style="height:10px;width:46%;background:var(--ink)"></div><div style="height:6px;width:70%;margin-top:12px;background:var(--line-strong)"></div><div style="height:6px;width:60%;margin-top:8px;background:var(--line-strong)"></div><div style="height:90px;margin-top:22px;background:#7d0034"></div></div></div>`)}
      ${orn("Studs & gilt border", "Four 3px gold studs, large and small alternating; a 1px dashed gold border.", `<div style="transform:scale(1.7)">${stamp("Book a demo", 'tabindex="-1" aria-hidden="true"')}</div>`)}
      ${orn("Notched corner", "Concave quarter-circle corners. Gilt on livery, rail on paper.", nf({ in: 26, r: 40, o: .9 }) + nf({ in: 40, r: 28, o: .4, w: .5 }), "background:#00331a")}
      ${orn("Engraved label", "A 0.5px frame whose corners curl, like an engraved plate.", `<div style="transform:scale(1.25)">${eyebrow("Customer lifecycle")}</div>`)}
      ${orn("Divider band", "A 24px trellis band between sections, centred on a notched stamp badge.", `<div class="band" style="position:absolute;left:0;right:0;top:50%;margin:0;transform:translateY(-50%)"><div class="badge">${glyphSvg("chat")}</div></div>`)}
      ${orn("Gilded glyph", "Gold fill, 0.5px wine hairline. For features and ornament, 24px and up.", `<div style="width:62%;aspect-ratio:74/75;background:url('assets/patterns/divider-badge-frame.svg') center/100% 100% no-repeat">${glyphSvg("book")}</div>`)}
    </div></div></section>
  ${gpOpen("5.2", ch)}<div class="gp-grid">${copyCol("Stamps & seals", ["Postage stamps and wax seals are Crossword’s signature objects. They mark something as official, approved and sent with care.", "They may tilt up to ±7° and cast soft, warm shadows. Use one container around the bell: a stamp or a seal, never both.", "Two of the website’s stamps still carry placeholder glyphs (a presentation board and a Shopify bag). Replace them with the bell."])}
    <div><span class="lbl">Postage stamps · Figma</span><div class="gallery" style="margin-top:12px">${gal(STAMPS, true)}</div>
    <span class="lbl" style="display:block;margin-top:34px">Wax seals</span><div class="gallery" style="margin-top:12px">${gal(SEALS)}</div>
    <span class="lbl" style="display:block;margin-top:34px">On the website</span><div class="gallery" style="margin-top:12px">${gal(SITE_STAMPS, true)}</div></div></div></section>
  ${gpOpen("5.3", ch)}<div class="gp-grid">${copyCol("Backgrounds & textures", ["Damask-lined livery panels set off product moments the way a hotel lines its walls. Paper grain warms the forest grounds.", "Textures run at full strength only inside a livery panel; elsewhere at 20% or less, and never behind running text. The greyscale tiles take their colour from a blend over livery.", "Photography is front of house: warm tungsten light, deep shadow, one serene person. Never tech offices or AI-generated faces."])}
    <div><div class="texgrid">${TEXTURES.map(([id, label, file, use, style]) => `<figure><div class="t" style="${style}" role="img" aria-label="${esc(label)}"></div><figcaption><span>${esc(label)}<br><span style="color:var(--muted)">${esc(use)}</span></span></figcaption></figure>`).join("")}</div>
    <div class="texgrid" style="grid-template-columns:1.3fr 1fr;margin-top:14px"><figure><div class="t" style="aspect-ratio:1.5;background-image:url('assets/photo/concierge-hero.webp');background-position:center 30%"></div><figcaption><span>Front of house<br><span style="color:var(--muted)">Faded to night for type</span></span></figcaption></figure><figure><div class="t" style="aspect-ratio:1.13;background-image:url('assets/photo/arch-photo.webp')"></div><figcaption><span>Arched halls<br><span style="color:var(--muted)">Behind product moments</span></span></figcaption></figure></div></div></div></section>
  ${gpOpen("5.4", ch)}<div class="gp-grid">${copyCol("Iconography", ["Interface icons are Phosphor, Regular weight, at 12, 16, 20 or 24px, drawn in one colour (currentColor).", "Gilded glyphs (gold fill with a 0.5px wine hairline) are the ornamental set: divider badges, features, quote marks. Never as controls.", "No sparkle, robot or brain glyphs outside mock-up UI."])}
    <div><span class="lbl">Interface · Phosphor Regular</span><div class="icons" style="margin-top:12px">${ICONS.map(n => `<figure><img class="ic" src="assets/icons/${n}.svg" alt=""><figcaption>${esc(n)}</figcaption></figure>`).join("")}</div>
    <span class="lbl" style="display:block;margin-top:34px">Gilded · ornamental</span><div class="icons" style="margin-top:12px;grid-template-columns:repeat(5,minmax(0,1fr))">${Object.keys(GLYPHS).map(k => `<figure class="gilded">${glyphSvg(k, 104)}<figcaption>${esc(k)}</figcaption></figure>`).join("")}</div></div></div></section>`;
}

/* ======================================================================
   6 COMPONENTS (from the website)
   ====================================================================== */
const ITABS = [
  ["No dashboards to dig through. Just ask.", "Ask Crossword anything about your shoppers.", "Which customers abandoned apparel at checkout this week?", "Fourteen shoppers. Nine asked about sizing first: I’d start there."],
  ["See exactly what a conversation was worth.", "Attribution across every touchpoint.", "What did the concierge influence yesterday?", "$4,180 across 62 conversations. The razor comparison led."],
  ["Even anonymous traffic isn’t a mystery anymore.", "Signals from every visit, remembered.", "Who keeps coming back without buying?", "Thirty-one repeat visitors. Most return to the gift guide."],
];
function renderComponents(ch) {
  const nav = overlay => `<div class="hdr${overlay ? " overlay" : ""}"><div class="mk">${svgOf("mark")}</div><nav aria-label="Example navigation">${["Sell", "Support", "Retain", "Managed Launch", "Insights", "Pricing"].map((t, i) => `<a href="#/components/6.3">${t}${[0, 1, 2, 4].includes(i) ? ICON.caret : ""}</a>`).join("")}</nav><div class="right"><a class="signup" href="#/components/6.3">Sign up</a>${stamp("Book a demo", "", overlay ? "wine" : "")}</div></div>`;
  return divider(ch, "The website’s building blocks, live. Each one is drawn from the shipped code with its real states, and flagged where the system still needs a decision.") +
  `${gpOpen("6.1", ch)}<div class="gp-grid">${copyCol("Stamp button", ["The single primary action per view: square, maroon, a dashed gilt border and four studs. Labels are uppercase Crimson Pro, verb first.", "Hover brightens 10% over 200ms; press drops 1px. Focus is a 2px ring, maroon on paper and gold on livery. The site has no pressed or disabled state yet; these are the recommendation."])}
    <div><div class="stage demo"><div class="demo-row">
      <figure>${stamp("Book a demo")}<figcaption>Primary</figcaption></figure>
      <figure><div style="background:#00331a;padding:14px">${stamp("Book a demo", "", "wine")}</div><figcaption>Wine · on livery</figcaption></figure>
      <figure>${stamp("Learn more", "", "outline")}<figcaption>Outline · secondary</figcaption></figure></div>
      <div class="demo-row" style="margin-top:30px">${[["Rest", ""], ["Hover", "is-hover"], ["Pressed", "is-press"], ["Focus", "is-focus"], ["Disabled", "is-disabled"]].map(([l, c]) => `<figure>${stamp("Book a demo", 'tabindex="-1"', c)}<figcaption>${l}</figcaption></figure>`).join("")}</div></div>
    <pre class="code" style="margin-top:14px">${esc(`<Link className="relative inline-flex items-center border border-dashed border-gold
  bg-maroon px-3 py-2 font-serif text-base leading-[22px] font-medium
  tracking-[-0.48px] text-gold-bright uppercase transition-[filter] duration-200
  hover:brightness-110 active:translate-y-px active:brightness-95
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon">
  {studs}Book a demo
</Link>`)}</pre></div></div></section>
  ${gpOpen("6.2", ch)}<div class="gp-grid">${copyCol("Eyebrow & section title", ["Every section opens with an engraved eyebrow and a two-line swash headline: line one ExtraLight, line two Light.", "Set line-height: 0 on the swash span so the big capital never pushes line one down. That one rule replaces the eight per-section title variants in the code."])}
    <div><div class="stage demo">${eyebrow("Customer lifecycle")}<h3 class="section-title">${swash("Every conversation")}<span class="l2">has a job to do</span></h3></div>
    <div class="stage demo" style="margin-top:14px;display:flex;flex-wrap:wrap;gap:24px;align-items:center">${eyebrow("On cream")}<span style="background:var(--sand);padding:16px">${eyebrow("On sand").replace('class="eyebrow"', 'class="eyebrow sand"')}</span><span style="background:#00331a;padding:16px">${eyebrow("On forest", true)}</span></div></div></div></section>
  ${gpOpen("6.3", ch)}<div class="gp-grid">${copyCol("Navigation & links", ["The header is 72px: the bell, Crimson Pro links at 16px, SIGN UP and one stamp button. On photographic heroes it floats as a glass bar.", "Text links are uppercase Crimson Pro with a hairline underline and an arrow that nudges on hover.", "The dropdowns are designed as carets only; their panels still need design (square sand panel, gold rule on the hovered item)."])}
    <div><div class="stage">${nav(false)}</div>
    <div class="photo-stage" style="margin-top:14px">${nav(true)}<h3>${swash("Every shopper gets")}<span class="l2">a reason <em>to buy</em></span></h3></div>
    <div class="stage demo" style="margin-top:14px"><div class="demo-row">${["Learn more", "View all", "Explore platform"].map(t => `<a class="textlink" href="#/components/6.3">${esc(t)}${ICON.arr}</a>`).join("")}</div></div></div></div></section>
  ${gpOpen("6.4", ch)}<div class="gp-grid">${copyCol("Tabs", ["Vertical tabs carry the Insights and Sell sections. The active tab moves to sand and a 2px rule fills its top edge over 6 seconds, then the next tab takes over.", "It pauses on hover, on keyboard focus and when it scrolls out of view. Arrow keys, Home and End move between tabs. Under reduced motion the rule is full and nothing advances."])}
    <div class="tabs-demo" id="itabs"><div role="tablist" aria-label="Insights" aria-orientation="vertical">${ITABS.map(([t, b], i) => `<button class="itab" role="tab" id="itab-${i}" aria-selected="${i === 0}" aria-controls="itab-panel" tabindex="${i === 0 ? 0 : -1}" data-itab="${i}"><span class="ic">${glyphSvg(["chat", "chart", "book"][i], 18).replace(/fill="#E0BE60" stroke="#6C2332"[^/]*/, 'fill="currentColor"')}</span><span class="tx"><b>${esc(t)}</b><span>${esc(b)}</span></span><span class="bar"></span></button>`).join("")}</div>
      <div class="tab-panel" id="itab-panel" role="tabpanel" aria-live="polite">${nf({ r: 24, o: .7 })}<div class="chatwin" id="itab-chat"></div></div></div></div></section>
  ${gpOpen("6.5", ch)}<div class="gp-grid">${copyCol("Cards & livery panels", ["A livery panel is a full-width jewel ground with damask or grain, a notched gilt frame and, usually, a product mock-up on parchment. One per view.", "Cards are square sand or parchment. Only mock-ups of the merchant’s own UI (the chat widget, storefront cards) take rounded corners."])}
    <div><div class="livery on-dark" style="background:#00331a url('assets/tex/grain-tile-greyscale.webp') 0 0/173px;background-blend-mode:soft-light">${nf({ r: 30, o: .55, inner: true })}${eyebrow("Trust", true)}<h4 style="margin-top:18px">${swash("Your data is")}<br>safe with us</h4><p>Guardrails ensure Crossword never offers a discount you didn’t approve, never makes a promise your legal team hasn’t cleared.</p>${stamp("Book a demo", "", "wine")}</div>
    <div class="cardrow">${[["Complex thinking simplified", "One reply carries a dozen decisions."], ["Context changes everything", "Memory turns visits into relationships."], ["Intelligence needs guardrails", "Every answer stays inside your rules."]].map(([h, p], i) => `<div class="bcard">${eyebrow(pad2(i + 1))}<h5>${esc(h)}</h5><p>${esc(p)}</p></div>`).join("")}</div></div></div></section>
  ${gpOpen("6.6", ch)}<div class="gp-grid">${copyCol("Page frame & divider band", ["Two 0.5px rails run the full page height, 24px in from each edge (12px on phones, 8px under 480px). A 1px gold tick on the left rail marks each section.", "Sections open with the 24px divider band: a trellis tile with a notched badge in the centre, carrying a gilded glyph for that section."])}
    <div><div class="frame-demo"><span class="rl" style="left:24px"></span><span class="rl" style="right:24px"></span><span class="acc" style="top:96px"></span><div class="band" style="position:absolute;left:24px;right:24px;top:40px;margin:0"><div class="badge">${glyphSvg("gear")}</div></div><div style="position:absolute;left:56px;top:110px">${eyebrow("Managed launch")}<p style="margin:14px 0 0;font:200 40px/1.05 var(--serif);letter-spacing:-.05em">${swash("We build your")}<br><span style="font-weight:300">concierge for you</span></p></div></div>
    <table class="kv">${[["Side padding", "80 · 48 · 24 · 20px"], ["Rail inset", "24 · 24 · 12 · 8px"], ["Section padding", "120 · 96 · 72 · 64px"], ["Header → content", "80 · 64 · 48 · 48px"], ["Content max width", "1280px (recommended)"], ["Breakpoints", "480 · 768 · 992 (· 1200)"]].map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join("")}</table></div></div></section>`;
}

/* ======================================================================
   7 MOTION
   ====================================================================== */
const MTOK = [
  ["--dur-instant", "100ms", "Press", "ease-out", 100], ["--dur-fast", "150ms", "Colour and opacity hover, exits", "ease-out", 150], ["--dur-base", "200ms", "Button feedback, focus", "ease-out", 200],
  ["--dur-moderate", "300ms", "Tabs, accordion, menus", "ease-out", 300], ["--dur-slow", "500ms", "Carousel, panel enter", "ease-out", 500],
  ["--ease-out", "cubic-bezier(.22,1,.36,1)", "Enters and UI transitions", "ease-out", 600], ["--ease-in-out", "cubic-bezier(.65,0,.35,1)", "Moves between two rests", "ease-in-out", 600], ["--ease-in", "cubic-bezier(.4,0,1,1)", "Exits, faster and plainer", "ease-in", 600],
];
function renderMotion(ch) {
  return divider(ch, "Unhurried and attentive. Things arrive the way a concierge does: promptly, quietly, without fuss. There is one ceremony, the envelope; everything else is service.") +
  `${gpOpen("7.1", ch)}<div class="gp-grid">${copyCol("Principles & tokens", ["Every animation needs a job: feedback, continuity, state or explanation. Motion uses these tokens only, and animates transform and opacity.", "Springs and overshoot belong to the ceremonies (the seal press, the stamp landing), never to interface. Exits are faster and plainer than enters.", "Click a row to see it move."])}
    <div><table class="mtokens"><thead><tr><th>Token</th><th>Value</th><th>Use</th><th><span class="sr">Preview</span></th></tr></thead><tbody>${MTOK.map(([t, v, u, e, d], i) => `<tr data-mtok="${i}" style="cursor:pointer"><td><code>${t}</code></td><td><code>${esc(v)}</code></td><td>${esc(u)}</td><td><div class="track" data-ease="${e === "ease-out" ? "var(--ease-out)" : e === "ease-in" ? "var(--ease-in)" : "var(--ease-in-out)"}" data-dur="${d}"><i></i></div></td></tr>`).join("")}</tbody></table>
    <div class="btnrow" style="margin-top:14px">${btn("Play all", "data-mplay", "play", "mini")}${btn("Copy motion.css", "data-copy-motion", "copy", "mini")}</div></div></div></section>
  ${gpOpen("7.2", ch)}<div class="gp-grid">${copyCol("Interaction defaults", ["<b>Hover</b> 150–200ms, only on devices that hover. <b>Press</b> 1px down, 100ms. <b>Focus</b> a visible 2px ring on every control, instantly.", "<b>Auto-advance</b> pauses for hover, focus, off-screen and hidden tabs. <b>Reduced motion</b> keeps colour and opacity changes and drops movement.", "Nothing animates on a keyboard-initiated action."])}
    <div class="stage demo"><div class="demo-row">
      <figure>${stamp("Hover me")}<figcaption>Hover · brightness 110%, 200ms</figcaption></figure>
      <figure>${stamp("Press me", "", "outline")}<figcaption>Press · 1px, 100ms</figcaption></figure>
      <figure><a class="textlink" href="#/motion/7.2">Learn more${ICON.arr}</a><figcaption>Link · colour 150ms, arrow 3px</figcaption></figure>
      <figure>${btn("Tab to me", "")}<figcaption>Focus · 2px ring, no delay</figcaption></figure></div>
      <p class="note" style="margin-top:26px">This page honours <b>prefers-reduced-motion</b>: the tab progress, scrolling and the envelope all reduce.</p></div></div></section>
  ${gpOpen("7.3", ch)}<div class="gp-grid">${copyCol("The envelope", ["Every page closes with an invitation. As the envelope scrolls in, the gold seal presses, the flap lifts and the letter and photo rise out.", "On the site it is scrubbed by scroll with GSAP ScrollTrigger. Here you can play it or drag through it.", "Seal 0.14s press, 0.42s release with back.out(3) · flap 0.42s power2.in, then 0.61s power2.out · letter 0.95s power3.out · photo 1.05s back.out(1.3)."])}
    <div><div class="envelope-wrap env-wrap" id="env-wrap">${envelopeHTML()}</div>
    <div class="env-controls">${btn("Play", "data-env-play", "play")}${btn("Reset", "data-env-reset", "reset")}<label class="sr" for="env-scrub">Scrub the envelope</label><input type="range" id="env-scrub" min="0" max="1000" value="0"></div></div></div></section>`;
}
function envelopeHTML() {
  const ps = 'stroke="#714d11" stroke-opacity=".25" stroke-width="1.4692"';
  const flap = "M0 0H1389.72L731.365 228.323A40 40 0 0 1 718.263 230.53H671.737A40 40 0 0 1 658.634 228.323Z";
  return `<div class="env" aria-label="The envelope ceremony" role="img">
  <img class="layer" src="assets/envelope/back.webp" alt="" style="top:43.4188%;left:0;height:21.8478%;width:100%;z-index:1">
  <img class="layer" data-cta="open" src="assets/envelope/flap-open.webp" alt="" style="top:4.9406%;left:0;height:38.587%;width:100%;z-index:2;transform-origin:50% 99.7237%">
  <div style="position:absolute;top:28.412%;left:3.8129%;height:40.163%;width:68.8129%;z-index:3"><img class="layer" data-cta="letter" src="assets/envelope/letter.webp" alt="" style="inset:0;width:100%;height:100%"></div>
  <div style="position:absolute;top:34.1304%;left:63.9245%;height:42.2283%;width:28.2374%;z-index:4"><img class="layer" data-cta="photo" src="assets/envelope/photo.webp" alt="" style="inset:0;width:100%;height:100%"></div>
  <svg class="layer" style="top:0;left:-1.7986%;height:115.7609%;width:103.5971%;z-index:6;overflow:visible" viewBox="0 0 1440 1065" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="pk-lg" x="-3%" y="-8%" width="106%" height="116%"><feDropShadow dx="0" dy="-7.3" stdDeviation="14.6" flood-color="#000" flood-opacity=".12"/></filter><filter id="pk-sm" x="-3%" y="-8%" width="106%" height="116%"><feDropShadow dx="0" dy="-7.3" stdDeviation="3.65" flood-color="#000" flood-opacity=".12"/></filter></defs>
    <g filter="url(#pk-lg)"><rect x="26.5" y="594.34" width="1388.49" height="470.53" fill="#f3e9d4"/><path d="M27.24 1064.14V595.08H1414.26V1064.14" fill="none" ${ps}/></g>
    <path d="M24.965 404.6 636.08 595.251 24.965 1064.989Z" fill="#f3e9d4" ${ps} filter="url(#pk-sm)"/><path d="M1414.72 404.6 804.063 595.286 1414.72 1064.978Z" fill="#f3e9d4" ${ps} filter="url(#pk-sm)"/></svg>
  <svg class="layer" data-cta="shadow" style="top:43.4209%;left:0;height:26.6304%;width:100%;z-index:8;overflow:visible" viewBox="0 0 1390 245" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="fl-blur" x="-4%" y="0" width="108%" height="130%"><feGaussianBlur stdDeviation="6"/></filter></defs><path d="${flap}" transform="translate(0 5)" fill="#000" fill-opacity=".16" filter="url(#fl-blur)"/></svg>
  <svg class="layer" data-cta="closed" style="top:43.4209%;left:0;height:26.6304%;width:100%;z-index:9;overflow:visible;transform-origin:50% 0" viewBox="0 0 1390 245" preserveAspectRatio="none" aria-hidden="true"><path d="${flap}" fill="#f3e9d4"/><path d="M1389.72 0 731.365 228.323A40 40 0 0 1 718.263 230.53H671.737A40 40 0 0 1 658.634 228.323L0 0" fill="none" ${ps} stroke-linejoin="round"/></svg>
  <img class="layer" data-cta="seal" src="assets/envelope/seal.webp" alt="" style="top:55.7197%;left:45.0146%;height:16.4302%;width:9.9699%;z-index:10">
  <h4 aria-hidden="true">${swash("Explore a no strings attached pilot with us today")}</h4>
  <svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="cta-deboss" x="-2%" y="-5%" width="104%" height="110%"><feComponentTransfer in="SourceAlpha" result="inv"><feFuncA type="table" tableValues="1 0"/></feComponentTransfer><feOffset in="inv" dy=".824" result="off"/><feGaussianBlur in="off" stdDeviation="1.236" result="bl"/><feFlood flood-color="#000" flood-opacity=".18"/><feComposite in2="bl" operator="in"/><feComposite in2="SourceAlpha" operator="in" result="inner"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="inner"/></feMerge></filter></svg>
</div>`;
}

/* ======================================================================
   8 VOICE
   ====================================================================== */
function renderVoice(ch) {
  return divider(ch, "A seasoned concierge: warm, composed, quietly confident. The copy rules below are read from the shipped site, not invented.") +
  `${gpOpen("8.1", ch)}<div class="gp-grid">${copyCol("How Crossword speaks", ["Crossword is a hire, a desk, a concierge. Its sentences are short and its rhythm does the persuading.", "Calls to action are uppercase and verb first. No exclamation marks, ever."], `<div class="ctas" style="margin-top:22px">${stamp("Book a demo")}<a class="textlink" href="#/voice/8.1">Learn more${ICON.arr}</a><a class="textlink" href="#/voice/8.1">Explore platform${ICON.arr}</a></div>`)}
    <div class="voice-grid">${VOICE.map(([h, p, q]) => `<div class="vcard notch"><h4>${esc(h)}</h4><p>${esc(p)}</p><blockquote>“${esc(q)}”</blockquote></div>`).join("")}</div></div></section>
  ${gpOpen("8.2", ch)}<div class="gp-grid">${copyCol("Words & mechanics", ["Use the hospitality vocabulary consistently; it is what keeps Crossword from sounding like every other AI widget.", "Placeholder figures (300+ brands, 120+ countries, the 28%, 12.3% and 76% stats) and the testimonials are not signed off. Don’t reuse them."])}
    <div><table class="terms"><thead><tr><th>Say</th><th>Not</th></tr></thead><tbody>${TERMS.map(([a, b]) => `<tr><td>${esc(a)}</td><td><s>${esc(b)}</s></td></tr>`).join("")}</tbody></table>
    <ul class="rules" style="margin-top:28px">${MECHANICS.map(([a, b]) => `<li><span><b>${esc(a)}.</b> ${esc(b)}</span></li>`).join("")}</ul></div></div></section>`;
}

/* ======================================================================
   9 IN ACTION
   ====================================================================== */
function renderAction(ch) {
  return divider(ch, "The final Crossword website designs from Figma: every section of the landing page, the human-handoff panel and the three hero directions.", dlBtn("screens", "Download all screens")) +
  `${gpOpen("9.1", ch)}<div class="gp-grid">${copyCol("The website", ["Each screen is a 1440px frame from the final designs (Hero Tests) in the Figma file: page A section by section, the handoff panel, and the hero variants still in play. Click one to see it full size.", "Look for the system at work: cream paper, the page rails, one livery panel per view, swash headlines and the stamp button."], `<div class="btnrow"><a class="btn" href="${FIGMA_FILES[1][2]}" target="_blank" rel="noopener">${ICON.ext}Open in Figma</a></div>`)}
    <div class="screens">${SCREENS.map(([id, t, d], i) => `<button data-lb="${i}" aria-label="View ${esc(t)} full size"><div class="im"><img src="assets/figma/thumb/${id}.webp${AV}" alt="" loading="lazy"></div><div class="cap"><span>${esc(t)}</span><span>${esc(d)}</span></div></button>`).join("")}</div></div></section>`;
}

/* ======================================================================
   10 RESOURCES
   ====================================================================== */
let emTab = 0, emMode = "sample", aiTab = 0, tokTab = 0;
const IMG_BASE = (location.protocol.startsWith("http") ? location.href.replace(/#.*$/, "").replace(/[^/]*$/, "") : "") + "email/";
const fill = (s, vars) => s.replace(/\{\{(\w+)\}\}/g, (m, k) => vars ? (vars[k] ?? m) : m);
function emailDoc(t, mode) {
  const v = mode === "sample" ? EMAIL_VARS.sample : null, f = s => esc(fill(s, v));
  const serif = "'Crimson Pro',Georgia,'Times New Roman',serif", sans = "Geist,Helvetica,Arial,sans-serif";
  const stats = t.stats ? `<tr><td style="padding:8px 40px 4px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${t.stats.map(([n, l]) => `<td style="padding:14px 10px 14px 0;border-top:1px solid #d2cbba;vertical-align:top"><div style="font:200 34px/1 ${serif};color:#141414;letter-spacing:-1px">${f(n)}</div><div style="font:400 12px/1.4 ${sans};color:#66645e;padding-top:6px">${esc(l)}</div></td>`).join("")}</tr></table></td></tr>` : "";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${f(t.subject)}</title></head>
<body style="margin:0;padding:0;background:#efe9db"><div style="display:none;max-height:0;overflow:hidden">${f(t.pre)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#efe9db"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#fff9ea">
<tr><td style="background:#7d0034;padding:28px 40px"><img src="${IMG_BASE}crossword-lockup-gold.png" width="168" alt="Crossword" style="display:block;border:0;width:168px;height:auto"></td></tr>
<tr><td style="height:6px;background:#e0be60;line-height:6px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:40px 40px 8px"><span style="display:inline-block;padding:7px 9px;border:1px solid #b7ae9a;font:600 11px/1 Arial,sans-serif;letter-spacing:1.4px;text-transform:uppercase;color:#766640">${esc(t.eyebrow)}</span>
<h1 style="margin:22px 0 0;font:200 40px/1.1 ${serif};letter-spacing:-1.6px;color:#141414"><span style="font:400 54px/0 Parisienne,'Snell Roundhand',cursive;letter-spacing:0">${esc(t.h[0][0])}</span>${esc(t.h[0].slice(1))}<br><span style="font-weight:300">${esc(t.h[1])}</span></h1></td></tr>
<tr><td style="padding:16px 40px 8px">${t.body.map(p => `<p style="margin:0 0 14px;font:400 16px/1.55 ${sans};color:#33322f">${f(p)}</p>`).join("")}</td></tr>${stats}
<tr><td style="padding:18px 40px 40px"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:#7d0034;border:1px dashed #e0be60"><a href="${esc(fill(t.cta[1], v))}" style="display:inline-block;padding:12px 18px;font:500 15px/1 ${serif};letter-spacing:-.3px;text-transform:uppercase;color:#f7c849;text-decoration:none">${esc(t.cta[0])}</a></td></tr></table></td></tr>
<tr><td style="background:#00331a;padding:26px 40px"><p style="margin:0;font:200 22px/1.2 ${serif};color:#dfe3d2;letter-spacing:-.6px"><span style="font:400 30px/0 Parisienne,cursive">C</span>rossword is the concierge desk for your brand.</p><p style="margin:12px 0 0;font:600 10px/1.6 Arial,sans-serif;letter-spacing:1.2px;text-transform:uppercase;color:#869d88">Crossword, Inc. © 2026 · A CometChat Product</p></td></tr>
</table></td></tr></table></body></html>`;
}
const sig = { name: "Maya Ortiz", role: "Head of Customer Experience", phone: "+1 (415) 555-0136", email: "maya@crossword.example", image: "mark", photoUrl: "" };
function sigHTML() {
  const img = sig.image === "photo" && sig.photoUrl ? `<img src="${esc(sig.photoUrl)}" width="72" height="72" alt="" style="display:block;width:72px;height:72px;object-fit:cover;border:0">` : `<img src="${IMG_BASE}crossword-mark-maroon.png" width="72" height="72" alt="Crossword" style="display:block;width:72px;height:72px;border:0">`;
  const line = [sig.phone, sig.email].filter(Boolean).map(esc).join("&nbsp;&nbsp;·&nbsp;&nbsp;");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Helvetica,Arial,sans-serif"><tr><td style="padding-right:16px;vertical-align:top">${img}</td><td style="vertical-align:top;border-left:1px solid #e0be60;padding-left:16px">
<div style="font:300 20px/1.15 'Crimson Pro',Georgia,serif;color:#141414;letter-spacing:-.5px">${esc(sig.name)}</div><div style="font:400 13px/1.4 Helvetica,Arial,sans-serif;color:#66645e;padding-top:2px">${esc(sig.role)}</div>
<div style="font:400 12.5px/1.4 Helvetica,Arial,sans-serif;color:#33322f;padding-top:8px">${line}</div>
<div style="font:600 10px/1.4 Arial,sans-serif;color:#766640;letter-spacing:1.2px;text-transform:uppercase;padding-top:8px">Crossword · The concierge desk for your brand</div></td></tr></table>`;
}
const sigField = (k, label, o = {}) => `<div class="field${o.full ? " full" : ""}${o.cls ? " " + o.cls : ""}"${o.hidden ? " hidden" : ""}><label for="sig-${k}">${label}</label><input id="sig-${k}" data-sig="${k}" value="${esc(sig[k])}" ${o.ac ? `autocomplete="${o.ac}"` : ""} ${o.ph ? `placeholder="${esc(o.ph)}"` : ""} spellcheck="false"></div>`;
const AI_TABS = [["brief", "Brand brief"], ["design", "DESIGN.md"], ["repo", "Repo setup"]];
function aiBrief() {
  return `# Crossword brand brief

Crossword (Crossword, Inc., a CometChat product) is an AI shopper assistant presented as "the concierge desk for your brand". It remembers, recommends, resolves and reports, all within the merchant's guardrails.

Guardrail: never read as a generic AI chatbot or SaaS dashboard, and never as a costume or Victorian pastiche. A modern service brand that uses hospitality craft as proof of care.

## Voice
- A seasoned concierge: warm, composed, quietly confident. Crossword is a hire, a desk, a concierge.
- Short declaratives; parallel triplets ("remembers, recommends, resolves, and reports").
- Headlines: sentence case, two lines, each a complete phrase. No exclamation marks, no emoji.
- CTAs: uppercase, verb first: BOOK A DEMO, LEARN MORE, EXPLORE PLATFORM.
- Say concierge, guest, conversation, guardrails, handoff. Never: bot, chatbot, magic, seamless, supercharge, revolutionary.
- Oxford comma, em dash (—), curly apostrophes.

## Visuals
- Cream paper (#FFF9EA) first; one jewel-toned livery panel per view: forest #00331A, aubergine #462160 or maroon #7D0034, often damask-lined.
- Maroon #7D0034 is the brand colour and the primary action. Gold #E0BE60 is trim only (studs, rails, seals), never text on cream.
- Type: Crimson Pro (headlines, ExtraLight 200, tight tracking), one Parisienne swash capital per headline, Geist for body and UI, Open Sans SemiBold for 12px uppercase eyebrows.
- Shapes: square corners; frames have concave notched corners; 0.5px hairlines; postage stamps and wax seals as signature objects.
- Photography: hospitality interiors, warm tungsten light, one serene front-of-house person. Never tech offices or AI faces.

## Placeholder content
"300+ d2c brands in 120+ countries", the 28% / 12.3% / 76% stats and all testimonials are unconfirmed. Don't reuse them.
`;
}
const aiText = () => [aiBrief(), DESIGN_MD, REPO_SETUP][aiTab];
const TOK_TABS = [["aliases", "Tailwind · repo names", () => THEME_CSS, "crossword-theme.aliases.css"], ["semantic", "Tailwind · semantic", () => THEME_SEMANTIC_CSS, "crossword-theme.css"], ["motion", "Motion & focus", () => MOTION_CSS, "crossword-motion.css"], ["dtcg", "W3C tokens", () => DTCG, "crossword-tokens.dtcg.json"]];

function renderResources(ch) {
  const tex = TEXTURES.map(([id, label, file, use, style]) => { const src = id === "trellis" ? "assets/patterns/divider-trellis-tile.svg" : `assets/tex/${file}`; return `<figure><div class="t" style="${style}" role="img" aria-label="${esc(label)}"></div><figcaption><span>${esc(label)}</span>${btn("Save", `data-save="${src}" data-name="crossword-${file}"`, "dl", "mini")}</figcaption></figure>`; }).join("");
  const card = (small, h, p, action) => `<div class="card notch"><small>${small}</small><h3>${esc(h)}</h3><p>${esc(p)}</p>${action}</div>`;
  return divider(ch, "Everything needed to build with the Crossword identity: the Figma files, master logos, textures, stamps, design tokens, email templates, the email signature and the files to give AI tools.", stamp("Download all assets", 'data-dl="kit"')) +
  `${gpOpen("10.1", ch)}<div class="gp-grid">${copyCol("Design files", ["The Figma files behind these guidelines, and the website they describe. Start with the brand guidelines."])}
    <div class="cards">${FIGMA_FILES.map(([n, d, u]) => u ? card("Figma", n, d, `<a class="btn" href="${esc(u)}" target="_blank" rel="noopener">${ICON.ext}Open in Figma</a>`) : `<div class="card notch soon"><small>Figma</small><h3>${esc(n)}</h3><p>${esc(d)}</p><span class="soon-tag">Coming soon</span></div>`).join("")}
      ${card("GitHub", "Website repo", "The staging site: Next.js, Tailwind v4 and GSAP. Source of the components and motion here.", `<a class="btn" href="https://github.com/monesh-pixelup/Crossword" target="_blank" rel="noopener">${ICON.ext}Open repo</a>`)}</div></div></section>
  ${gpOpen("10.2", ch)}<div class="gp-grid">${copyCol("Downloads", ["Logo files are generated in your browser from the outlined master. Textures, stamps and screens are the production files."])}
    <div class="cards">
      ${card("ZIP", "Logo pack", "Signature, bell and wordmark in ink, cream, gold, maroon, black and white as SVG, plus PNG at 500, 1000 and 2000px.", dlBtn("logos", "Download"))}
      ${card("ZIP", "Favicons", "icon.svg, favicon.ico, an Apple touch icon and PNG icons: the gold bell on maroon.", dlBtn("favicons", "Download"))}
      ${card("ZIP", "Textures & patterns", "Damask panels and tiles, paper grain, ornaments, and the code-exact SVG patterns.", dlBtn("textures", "Download"))}
      ${card("ZIP", "Stamps & seals", "Postage stamps, wax seals and the website’s guilloché stamps.", dlBtn("stamps", "Download"))}
      ${card("ZIP", "Email templates", "Three starter emails as HTML with merge tags, plus their images.", dlBtn("emails", "Download"))}
      ${card("ZIP", "Design tokens", "Tailwind @theme (two flavours), motion and focus CSS, W3C tokens and DESIGN.md.", dlBtn("tokens", "Download"))}
      ${card("ZIP · 13 MB", "Website screens", "All sixteen final screens as full-resolution PNG.", dlBtn("screens", "Download"))}
      ${card("ZIP", "Files for AI tools", "The brand brief, DESIGN.md, brand.md and the repo setup notes.", dlBtn("ai", "Download"))}
      ${card("Google Fonts", "Fonts", "Crimson Pro, Parisienne, Geist and Open Sans. All SIL Open Font License.", `<a class="btn" href="https://fonts.google.com/share?selection.family=Crimson+Pro:wght@200;300;400;500%7CGeist:wght@300;400;500;600%7COpen+Sans:wght@600%7CParisienne" target="_blank" rel="noopener">${ICON.ext}Get the fonts</a>`)}
    </div></div></section>
  ${gpOpen("10.3", ch)}<div class="gp-grid">${copyCol("Email templates", ["Starter emails in the Crossword voice: a demo confirmation, a pilot going live and the weekly concierge notes. They are proposals, not shipped product emails.", "Copy the HTML into your email platform, or copy the rendered email to paste into a message. Switch to merge tags to see where your platform fills in each recipient’s details."])}
    <div><div class="tabs" role="tablist" aria-label="Email templates" style="--n:${EMAILS.length};--k:${emTab}"><span class="ind" aria-hidden="true"></span>${EMAILS.map((t, i) => `<button role="tab" aria-selected="${i === emTab}" tabindex="${i === emTab ? 0 : -1}" data-em-tab="${i}">${esc(t.label)}</button>`).join("")}</div>
    <div class="mailbar"><div class="row"><span class="lbl">Fill with</span><span class="seg" role="group" aria-label="Fill with">${[["sample", "Sample text"], ["tags", "Merge tags"]].map(([k, l]) => `<button data-em-mode="${k}" aria-pressed="${k === emMode}">${l}</button>`).join("")}</span></div>
      <div class="row">${btn("Copy HTML", 'data-em-copy="html"', "copy", "mini")}${btn("Copy for email", 'data-em-copy="rich"', "copy", "mini")}${btn("Download .html", "data-em-dl", "dl", "mini")}</div></div>
    <div class="mailstage"><iframe class="mail" id="em-frame" title="Email preview" loading="lazy"></iframe></div>
    <p class="note">${location.protocol.startsWith("http") ? `Images load from <b>${esc(IMG_BASE)}</b>. Move <b>email/</b> to the Crossword site and update the address before sending.` : "Images load once this site is deployed; open it from a web address to copy emails with working images."} Headings fall back to Georgia where Crimson Pro isn’t installed.</p></div></div></section>
  ${gpOpen("10.4", ch)}<div class="gp-grid">${copyCol("Email signature", ["Fill in your details and choose the bell or your photo. Copy the signature, then paste it into your email settings.", "Gmail: Settings, See all settings, Signature. Apple Mail: Settings, Signatures. Outlook: Settings, Accounts, Signatures."])}
    <div><div class="mailstage"><div class="mail-host sig" id="sig-host"></div></div>
    <div class="fields sig-form">${sigField("name", "Name", { ac: "name" })}${sigField("role", "Role", { ac: "organization-title" })}${sigField("phone", "Phone", { ac: "tel" })}${sigField("email", "Email", { ac: "email" })}
      <div class="field full"><span class="flabel" id="sig-img-label">Image</span><span class="seg" role="group" aria-labelledby="sig-img-label"><button data-sig-img="mark" aria-pressed="${sig.image === "mark"}">Crossword bell</button><button data-sig-img="photo" aria-pressed="${sig.image === "photo"}">Photo</button></span></div>
      ${sigField("photoUrl", "Photo URL", { full: 1, cls: "photo-only", hidden: sig.image !== "photo", ph: "https://… a square photo, 300px or larger" })}</div>
    <div class="btnrow" style="margin-top:16px">${stamp("Copy signature", 'data-sig-copy="rich"')}${btn("Copy HTML", 'data-sig-copy="html"', "copy")}${btn("Download .html", "data-sig-dl", "dl")}${btn("Reset", "data-sig-reset")}</div></div></div></section>
  ${gpOpen("10.5", ch)}<div class="gp-grid">${copyCol("Textures & patterns", ["The canonical, de-duplicated texture set, and the patterns drawn exactly as the site draws them.", "Greyscale tiles must sit over a livery colour with a blend mode; they are never used as visible grey."])}
    <div><div class="texgrid">${tex}</div><div class="btnrow" style="margin-top:16px">${stamp("Download texture pack", 'data-dl="textures"')}</div></div></div></section>
  ${gpOpen("10.6", ch)}<div class="gp-grid">${copyCol("Design tokens", ["The palette, type, radius and motion as code, exported from DESIGN.md (lint: 0 errors, 0 warnings).", "<b>Repo names</b> keeps the site’s current utilities (maroon, cream, sand) so it drops straight into app/globals.css. <b>Semantic</b> is the DESIGN.md export. <b>W3C tokens</b> import into Figma variables."])}
    <div><div class="tabs" role="tablist" aria-label="Token formats" style="--n:${TOK_TABS.length};--k:${tokTab}"><span class="ind" aria-hidden="true"></span>${TOK_TABS.map(([k, l], i) => `<button role="tab" aria-selected="${i === tokTab}" tabindex="${i === tokTab ? 0 : -1}" data-tok-tab="${i}">${esc(l)}</button>`).join("")}</div>
    <pre class="code" id="tok-pre" style="margin-top:12px">${esc(TOK_TABS[tokTab][2]())}</pre><div class="btnrow" style="margin-top:12px">${btn("Copy", "data-tok-copy", "copy")}${btn("Download", "data-tok-dl", "dl")}</div></div></div></section>
  ${gpOpen("10.7", ch)}<div class="gp-grid">${copyCol("For AI tools", ["Give assistants the same rules your team follows. Paste the brand brief into a chat assistant before asking for copy, slides or layouts.", "Give DESIGN.md to coding agents that build UI. Keep brand.md, the full operating document, for the decisions the contract doesn’t cover."], `<div class="btnrow">${btn("Download brand.md", 'data-dl="brandmd"', "dl")}</div>`)}
    <div><div class="tabs" role="tablist" aria-label="AI files" style="--n:${AI_TABS.length};--k:${aiTab}"><span class="ind" aria-hidden="true"></span>${AI_TABS.map(([k, l], i) => `<button role="tab" aria-selected="${i === aiTab}" tabindex="${i === aiTab ? 0 : -1}" data-ai-tab="${i}">${esc(l)}</button>`).join("")}</div>
    <pre class="code" id="ai-pre" style="margin-top:12px;white-space:pre-wrap">${esc(aiText())}</pre><div class="btnrow" style="margin-top:12px">${btn("Copy", "data-ai-copy", "copy")}${btn("Download", "data-ai-dl", "dl")}</div></div></div></section>
  ${gpOpen("10.8", ch)}<div class="gp-grid">${copyCol("Prompt starters", ["Starting points that put the brief and DESIGN.md to work. Replace the bracketed parts before you send them."])}
    <ol class="prompts">${PROMPTS.map(([t, b], i) => `<li><span class="n">${pad2(i + 1)}</span><div><h3>${esc(t)}</h3><p>${esc(b)}</p></div>${btn("Copy", `data-copy="${esc(b)}" data-label="prompt"`, "copy", "mini")}</li>`).join("")}</ol></div></section>`;
}

/* ======================================================================
   router & shell
   ====================================================================== */
const RENDER = { home: renderHome, logo: renderLogo, colour: renderColour, typography: renderType, "graphic-system": renderGraphic, components: renderComponents, motion: renderMotion, voice: renderVoice, "in-action": renderAction, resources: renderResources };
let current = null, spy = null, tabTimer = null;

function buildNav(chId) {
  $("#nav").innerHTML = CH.map(c => `<li class="${c.id === chId ? "on" : ""}"><a href="#/${c.id === "home" ? "" : c.id}"${c.id === chId ? ' aria-current="page"' : ""}><span class="n">${c.n}</span>${esc(c.t)}</a>${c.id === chId ? `<ul>${c.pages.map(([k, t]) => `<li><a href="#/${c.id}/${k}" data-subnav="${k}"><span class="n">${k}</span>${esc(t)}</a></li>`).join("")}</ul>` : ""}</li>`).join("");
}
function route() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const ch = CH.find(c => c.id === (parts[0] || "home")) || CH[0];
  const sub = parts[1];
  if (current !== ch.id) {
    current = ch.id;
    cleanup();
    $("#page-in").innerHTML = RENDER[ch.id](ch);
    buildNav(ch.id);
    document.title = (ch.id === "home" ? "" : ch.t + " · ") + "Crossword Brand Guidelines";
    afterRender(ch.id);
    if (!sub) window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }
  if (sub) { const el = document.getElementById("p-" + sub); if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" })); }
  closeMenu();
}
function cleanup() { if (spy) spy.disconnect(); clearTimeout(tabTimer); if (window.__env) { window.__env.kill(); window.__env = null; } if (window.__tabsIO) { window.__tabsIO.disconnect(); window.__tabsIO = null; } }
function afterRender(id) {
  spy = new IntersectionObserver(es => { for (const e of es) if (e.isIntersecting) { const k = e.target.dataset.sub; $$("[data-subnav]").forEach(a => a.setAttribute("aria-current", a.dataset.subnav === k)); } }, { rootMargin: "-20% 0px -70% 0px" });
  $$(".gp").forEach(s => spy.observe(s));
  if (id === "typography") updateSwash();
  if (id === "components") initTabs();
  if (id === "motion") initEnvelope();
  if (id === "resources") { renderEmail(); renderSig(); }
}

/* ---------- swash lab ---------- */
function updateSwash() {
  const a = ($("#sw-1") || {}).value || "", b = ($("#sw-2") || {}).value || "";
  const out = $("#swash-out"); if (!out) return;
  out.innerHTML = a ? `${swash(a)}<span class="l2">${esc(b)}</span>` : "";
  const c = a.trim()[0] || "", warn = $("#swash-warn");
  const bad = c && !SUBSET.includes(c.toUpperCase());
  warn.textContent = bad ? `“${c.toUpperCase()}” isn’t in the shipped Parisienne subset. Add it to lib/fonts/parisienne-swash.woff2 before this headline ships.` : (c && c !== c.toUpperCase() ? "Headlines start with a capital." : "");
  warn.classList.toggle("on", !!warn.textContent);
}

/* ---------- live tabs (6.4) ---------- */
let tabIdx = 0;
function setTab(i, focus) {
  tabIdx = (i + ITABS.length) % ITABS.length;
  $$(".itab").forEach((b, k) => { b.setAttribute("aria-selected", k === tabIdx); b.tabIndex = k === tabIdx ? 0 : -1; const bar = $(".bar", b); bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = ""; });
  if (focus) $$(".itab")[tabIdx].focus();
  const [, , q, a] = ITABS[tabIdx];
  $("#itab-chat").innerHTML = `<div class="top"><i></i><span class="pill">VELMORA</span><i></i></div><div class="user">${esc(q)}</div><div class="ai">${esc(a)}</div><div class="input"><span>Ask about your shoppers…</span><span class="send">${ICON.arr}</span></div>`;
}
function initTabs() {
  const root = $("#itabs"); if (!root) return; setTab(0);
  $$(".itab").forEach(b => b.addEventListener("animationend", () => { if (b.getAttribute("aria-selected") === "true") setTab(tabIdx + 1); }));
  const pause = on => root.classList.toggle("paused", on);
  root.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") pause(true); }); root.addEventListener("pointerleave", () => pause(false));
  root.addEventListener("focusin", () => pause(true)); root.addEventListener("focusout", () => pause(false));
  window.__tabsIO = new IntersectionObserver(([e]) => root.classList.toggle("paused", !e.isIntersecting), { threshold: .3 }); window.__tabsIO.observe(root);
  root.addEventListener("keydown", e => { const m = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }; if (m[e.key]) { e.preventDefault(); setTab(tabIdx + m[e.key], true); } if (e.key === "Home") { e.preventDefault(); setTab(0, true); } if (e.key === "End") { e.preventDefault(); setTab(ITABS.length - 1, true); } });
}

/* ---------- envelope (7.3): a port of cta-envelope.tsx ---------- */
function initEnvelope() {
  const wrap = $("#env-wrap"); if (!wrap || typeof gsap === "undefined") { const s = $("#env-scrub"); if (s) s.disabled = true; return; }
  const q = n => $(`[data-cta="${n}"]`, wrap);
  const P = { seal: [.94, .14, .42, 3], closed: [.26, .42], flapRatio: 355 / 245, letter: [.37, .95, 100, -.6], photo: [.12, 1.05, 62, -10] };
  const handover = P.closed[0] + P.closed[1], openDur = P.closed[1] * P.flapRatio, letterAt = handover + P.letter[0], photoAt = letterAt + P.photo[0];
  gsap.set(q("closed"), { transformOrigin: "50% 0%", transformPerspective: 2200 });
  gsap.set(q("open"), { transformOrigin: "50% 99.7237%", transformPerspective: 2200 });
  const tl = gsap.timeline({ paused: true, onUpdate: () => { const s = $("#env-scrub"); if (s && !s.matches(":active")) s.value = Math.round(tl.progress() * 1000); } })
    .to(q("seal"), { scale: P.seal[0], duration: P.seal[1], ease: "power2.out" }, 0)
    .to(q("seal"), { scale: 1, duration: P.seal[2], ease: `back.out(${P.seal[3]})` }, P.seal[1])
    .fromTo(q("shadow"), { opacity: 1 }, { opacity: 0, duration: .3, ease: "power1.out" }, P.closed[0])
    .fromTo(q("closed"), { rotationX: 0 }, { rotationX: 90, duration: P.closed[1], ease: "power2.in" }, P.closed[0])
    .fromTo(q("open"), { rotationX: -90 }, { rotationX: 0, duration: openDur, ease: "power2.out" }, handover)
    .fromTo(q("letter"), { yPercent: P.letter[2], rotation: P.letter[3] }, { yPercent: 0, rotation: 0, duration: P.letter[1], ease: "power3.out" }, letterAt)
    .fromTo(q("photo"), { yPercent: P.photo[2], rotation: P.photo[3] }, { yPercent: 0, rotation: 0, duration: P.photo[1], ease: "back.out(1.3)" }, photoAt);
  tl.progress(0);
  window.__env = tl;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { tl.progress(1); return; }
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && tl.progress() === 0) { tl.play(0); io.disconnect(); } }, { threshold: .55 }); io.observe(wrap);
}

/* ---------- email & signature ---------- */
function renderEmail() { const fr = $("#em-frame"); if (!fr) return; fr.srcdoc = emailDoc(EMAILS[emTab], emMode); fr.onload = () => { try { fr.style.height = fr.contentDocument.documentElement.scrollHeight + "px"; } catch (e) { fr.style.height = "900px"; } }; }
function renderSig() { const h = $("#sig-host"); if (h) h.innerHTML = sigHTML(); }

/* ---------- downloads ---------- */
const LOGO_CW = { ink: "#141414", cream: "#FFF9EA", gold: "#E0BE60", maroon: "#7D0034", black: "#000000", white: "#FFFFFF" };
async function zipLogos(z) {
  for (const key of ["signature", "mark", "wordmark"]) for (const [cw, hex] of Object.entries(LOGO_CW)) { const s = svgOf(key, hex); z.file(`svg/crossword-${key}-${cw}.svg`, s); if (key !== "wordmark" && ["ink", "cream", "gold"].includes(cw)) for (const w of [500, 1000, 2000]) z.file(`png/crossword-${key}-${cw}-${w}.png`, await rasterize(s, w)); }
  z.file("png/crossword-lockup-gold-on-maroon-2000.png", await rasterize(svgOf("signature", "#E0BE60"), 2000, "#7D0034"));
  z.file("png/crossword-bell-gold-on-maroon-1000.png", await rasterize(svgOf("mark", "#E0BE60"), 1000, "#7D0034"));
}
async function addFiles(z, list) { for (const [src, name] of list) z.file(name, await fetchBlob(src)); }
async function zipFavicons(z) { await addFiles(z, ["icon.svg", "favicon.ico", "apple-icon.png", "icon-16.png", "icon-32.png", "icon-48.png", "icon-192.png", "icon-512.png"].map(f => [`assets/logo/${f}`, f])); }
async function zipTextures(z) { await addFiles(z, TEX_FILES.map(([s, n]) => [s, `textures/${n}`])); await addFiles(z, PATTERN_FILES.map(f => [`assets/patterns/${f}`, `patterns/crossword-${f}`])); }
async function zipStamps(z) { await addFiles(z, [...STAMPS, ...SEALS, ...SITE_STAMPS].map(([id, l, src]) => [src, `crossword-${id}${src.slice(src.lastIndexOf("."))}`])); }
async function zipEmails(z) { for (const t of EMAILS) z.file(`crossword-email-${t.id}.html`, emailDoc(t, "tags")); await addFiles(z, EMAIL_FILES.map(f => [`email/${f}`, `email/${f}`])); z.file("README.txt", `Crossword starter emails\n\nMerge tags: ${Object.keys(EMAIL_VARS.sample).map(k => "{{" + k + "}}").join(", ")}\n\nImages load from ${IMG_BASE || "./email/"}\nHost the email/ folder on the Crossword site and update that address before sending.\nHeadings fall back to Georgia where Crimson Pro isn't installed.\n`); }
function zipTokens(z) { z.file("crossword-theme.aliases.css", THEME_CSS); z.file("crossword-theme.css", THEME_SEMANTIC_CSS); z.file("crossword-motion.css", MOTION_CSS); z.file("crossword-tokens.dtcg.json", DTCG); z.file("DESIGN.md", DESIGN_MD); }
function zipAI(z) { z.file("crossword-brand-brief.md", aiBrief()); z.file("DESIGN.md", DESIGN_MD); z.file("brand.md", BRAND_MD); z.file("crossword-repo-setup.md", REPO_SETUP); }
async function zipScreens(z) { await addFiles(z, SCREENS.map(([id]) => [`assets/figma/full/${id}.png${AV}`, `crossword-${id}.png`])); }
async function download(kind, b) {
  if (kind === "brandmd") return saveFile("brand.md", new Blob([BRAND_MD], { type: "text/markdown" }));
  if (typeof JSZip === "undefined") { toast("The zip library didn't load. Check your connection and reload."); return; }
  const old = b ? b.innerHTML : ""; if (b) { b.disabled = true; b.textContent = "Preparing…"; }
  try {
    const z = new JSZip(), k = kind === "kit", f = n => k ? z.folder(n) : z;
    if (kind === "logos" || k) await zipLogos(f("logos"));
    if (kind === "favicons" || k) await zipFavicons(f("favicons"));
    if (kind === "textures" || k) await zipTextures(f("textures"));
    if (kind === "stamps" || k) await zipStamps(f("stamps-and-seals"));
    if (kind === "emails" || k) await zipEmails(f("emails"));
    if (kind === "tokens" || k) zipTokens(f("tokens"));
    if (kind === "ai" || k) zipAI(f("ai"));
    if (kind === "screens") await zipScreens(z);
    await saveFile(k ? "crossword-brand-assets.zip" : `crossword-${kind}.zip`, await z.generateAsync({ type: "blob" }));
  } catch (e) { toast(location.protocol === "file:" ? "Downloads need the site to be served (open it from a web address)." : "Couldn't build the download. Try again."); }
  finally { if (b) { b.disabled = false; b.innerHTML = old; } }
}

/* ---------- lightbox ---------- */
let lbIdx = -1, lbReturn = null;
function lbRender() { const [id, t, d, w, h] = SCREENS[lbIdx]; $("#lb-title").innerHTML = `<b>${esc(t)}</b>&nbsp;&nbsp;${esc(d)} · ${w} × ${h}px`; $("#lb-count").textContent = `${pad2(lbIdx + 1)} / ${pad2(SCREENS.length)}`; const img = $("#lb-img"); img.src = `assets/figma/${id}.webp${AV}`; img.alt = t; $("#lb-full").href = `assets/figma/full/${id}.png${AV}`; $("#lb .lb-stage").scrollTop = 0; }
function lbOpen(i) { lbIdx = i; lbReturn = document.activeElement; $("#lb").classList.add("on"); document.body.style.overflow = "hidden"; lbRender(); $("#lb-close").focus(); }
function lbClose() { $("#lb").classList.remove("on"); document.body.style.overflow = ""; if (lbReturn) lbReturn.focus(); }

/* ---------- menu, theme ---------- */
function closeMenu() { $("#side").classList.remove("open"); $("#scrim").classList.remove("on"); $("#menu-btn").setAttribute("aria-expanded", "false"); }
function setTheme(t) { if (t === "auto") document.documentElement.removeAttribute("data-theme"); else document.documentElement.setAttribute("data-theme", t); $$("[data-theme-set]").forEach(b => b.setAttribute("aria-pressed", b.dataset.themeSet === t)); try { localStorage.setItem("cw-theme", t); } catch (e) {} }

/* ---------- events ---------- */
document.addEventListener("click", async e => {
  const t = e.target.closest("button, a, tr[data-mtok]"); if (!t) return;
  const d = t.dataset;
  if (d.copyColour) { copyText(fmtColor(d.copyColour), `${d.name} ${fmtColor(d.copyColour)}`, d.copyColour); return; }
  if (d.fmt) { fmt = d.fmt; $$("[data-fmt]").forEach(b => b.setAttribute("aria-pressed", b.dataset.fmt === fmt)); $$("[data-hex]").forEach(s => s.textContent = fmtColor(s.dataset.hex)); return; }
  if (d.copyPalette !== undefined) { copyText(paletteCSS(), "palette CSS"); return; }
  if (d.cw) { const [key, i] = d.cw.split(":"); cwState[key] = +i; const st = $(`[data-logo-stage="${key}"]`); const [, , fg, bg] = CWAYS[i]; const ls = $(".logo-stage", st); ls.style.background = bg; ls.style.setProperty("--fg", fg); $$(`[data-cw^="${key}:"]`).forEach(b => b.setAttribute("aria-pressed", b.dataset.cw === d.cw)); st.nextElementSibling.nextElementSibling.querySelector(".lbl").textContent = `Master artwork · ${CWAYS[i][1]}`; return; }
  if (d.logoDl) { const [key, kind] = d.logoDl.split(":"); const [cid, , fg, bg] = CWAYS[cwState[key]]; const s = svgOf(key, fg);
    try { if (kind === "svg") await saveFile(`crossword-${key}-${cid}.svg`, new Blob([s], { type: "image/svg+xml" })); else await saveFile(`crossword-${key}-${cid}${kind === "pngbg" ? "-on-ground" : ""}.png`, await rasterize(s, 2000, kind === "pngbg" ? bg : null)); } catch (er) { toast("Couldn't render the PNG in this browser."); } return; }
  if (d.logoCopy) { const [, , fg] = CWAYS[cwState[d.logoCopy]]; copyText(svgOf(d.logoCopy, fg), `${d.logoCopy} SVG`); return; }
  if (d.dl) { e.preventDefault(); download(d.dl, t); return; }
  if (d.href) { window.open(d.href, "_blank", "noopener"); return; }
  if (d.copyLadder) { copyText(ladderCSS(LADDER.find(r => r[0] === d.copyLadder)), `${d.copyLadder} CSS`); return; }
  if (d.copySwash !== undefined) { const a = $("#sw-1").value, b = $("#sw-2").value; copyText(`<h2 class="section-title"><span class="sw">${esc(a[0] || "")}</span>${esc(a.slice(1))}<span class="l2">${esc(b)}</span></h2>`, "headline HTML"); return; }
  if (d.save) { try { await saveFile(d.name, await fetchBlob(d.save)); } catch (er) { toast("Saving needs the site to be served from a web address."); } return; }
  if (d.mtok !== undefined || d.mplay !== undefined) { const rows = d.mplay !== undefined ? $$(".track") : [$(".track", t)]; rows.forEach((tr, i) => { tr.classList.remove("go"); const dot = $("i", tr); dot.style.transition = "none"; void dot.offsetWidth; setTimeout(() => { dot.style.transition = `transform ${tr.dataset.dur}ms ${tr.dataset.ease}`; tr.classList.add("go"); }, 30 + i * 60); }); return; }
  if (d.copyMotion !== undefined) { copyText(MOTION_CSS, "motion.css"); return; }
  if (d.envPlay !== undefined) { if (window.__env) window.__env.play(0); return; }
  if (d.envReset !== undefined) { if (window.__env) { window.__env.pause(); window.__env.progress(0); $("#env-scrub").value = 0; } return; }
  if (d.itab !== undefined) { setTab(+d.itab); return; }
  if (d.lb !== undefined) { lbOpen(+d.lb); return; }
  if (d.emTab !== undefined) { emTab = +d.emTab; const tabs = t.closest(".tabs"); tabs.style.setProperty("--k", emTab); $$("[data-em-tab]").forEach((b, i) => { b.setAttribute("aria-selected", i === emTab); b.tabIndex = i === emTab ? 0 : -1; }); renderEmail(); return; }
  if (d.emMode) { emMode = d.emMode; $$("[data-em-mode]").forEach(b => b.setAttribute("aria-pressed", b.dataset.emMode === emMode)); renderEmail(); return; }
  if (d.emCopy) { const html = emailDoc(EMAILS[emTab], emMode); if (d.emCopy === "html") copyText(html, "email HTML"); else { const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)[1]; copyRich(body, EMAILS[emTab].body.map(p => fill(p, emMode === "sample" ? EMAIL_VARS.sample : null)).join("\n\n"), "email"); } return; }
  if (d.emDl !== undefined) { saveFile(`crossword-email-${EMAILS[emTab].id}.html`, new Blob([emailDoc(EMAILS[emTab], emMode)], { type: "text/html" })); return; }
  if (d.sigImg) { sig.image = d.sigImg; $$("[data-sig-img]").forEach(b => b.setAttribute("aria-pressed", b.dataset.sigImg === sig.image)); $$(".photo-only").forEach(el => el.hidden = sig.image !== "photo"); renderSig(); return; }
  if (d.sigCopy) { const h = sigHTML(); if (d.sigCopy === "html") copyText(h, "signature HTML"); else copyRich(h, `${sig.name}\n${sig.role}\n${sig.phone}  ${sig.email}`, "signature"); return; }
  if (d.sigDl !== undefined) { saveFile("crossword-signature.html", new Blob([`<!doctype html><meta charset="utf-8"><body>${sigHTML()}</body>`], { type: "text/html" })); return; }
  if (d.sigReset !== undefined) { Object.assign(sig, { name: "Maya Ortiz", role: "Head of Customer Experience", phone: "+1 (415) 555-0136", email: "maya@crossword.example", image: "mark", photoUrl: "" }); $$("[data-sig]").forEach(i => i.value = sig[i.dataset.sig]); $$("[data-sig-img]").forEach(b => b.setAttribute("aria-pressed", b.dataset.sigImg === "mark")); $$(".photo-only").forEach(el => el.hidden = true); renderSig(); return; }
  if (d.tokTab !== undefined) { tokTab = +d.tokTab; t.closest(".tabs").style.setProperty("--k", tokTab); $$("[data-tok-tab]").forEach((b, i) => { b.setAttribute("aria-selected", i === tokTab); b.tabIndex = i === tokTab ? 0 : -1; }); $("#tok-pre").textContent = TOK_TABS[tokTab][2](); return; }
  if (d.tokCopy !== undefined) { copyText(TOK_TABS[tokTab][2](), TOK_TABS[tokTab][1]); return; }
  if (d.tokDl !== undefined) { saveFile(TOK_TABS[tokTab][3], new Blob([TOK_TABS[tokTab][2]()])); return; }
  if (d.aiTab !== undefined) { aiTab = +d.aiTab; t.closest(".tabs").style.setProperty("--k", aiTab); $$("[data-ai-tab]").forEach((b, i) => { b.setAttribute("aria-selected", i === aiTab); b.tabIndex = i === aiTab ? 0 : -1; }); $("#ai-pre").textContent = aiText(); return; }
  if (d.aiCopy !== undefined) { copyText(aiText(), AI_TABS[aiTab][1]); return; }
  if (d.aiDl !== undefined) { saveFile(["crossword-brand-brief.md", "DESIGN.md", "crossword-repo-setup.md"][aiTab], new Blob([aiText()], { type: "text/markdown" })); return; }
  if (d.copy) { copyText(d.copy, d.label || "text"); return; }
  if (d.themeSet) { setTheme(d.themeSet); return; }
  if (t.id === "menu-btn") { const open = !$("#side").classList.contains("open"); $("#side").classList.toggle("open", open); $("#scrim").classList.toggle("on", open); t.setAttribute("aria-expanded", open); if (open) $("#side a").focus(); return; }
  if (t.id === "lb-close") { lbClose(); return; }
  if (t.id === "lb-prev") { lbIdx = (lbIdx - 1 + SCREENS.length) % SCREENS.length; lbRender(); return; }
  if (t.id === "lb-next") { lbIdx = (lbIdx + 1) % SCREENS.length; lbRender(); return; }
});
document.addEventListener("input", e => {
  if (e.target.id === "sw-1" || e.target.id === "sw-2") updateSwash();
  if (e.target.dataset.sig) { sig[e.target.dataset.sig] = e.target.value; renderSig(); }
  if (e.target.id === "env-scrub" && window.__env) { window.__env.pause(); window.__env.progress(e.target.value / 1000); }
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { if ($("#lb").classList.contains("on")) lbClose(); else closeMenu(); }
  if ($("#lb").classList.contains("on")) { if (e.key === "ArrowRight") { lbIdx = (lbIdx + 1) % SCREENS.length; lbRender(); } if (e.key === "ArrowLeft") { lbIdx = (lbIdx - 1 + SCREENS.length) % SCREENS.length; lbRender(); } }
  const tabs = e.target.closest && e.target.closest(".tabs"); if (tabs && ["ArrowLeft", "ArrowRight"].includes(e.key)) { const bs = $$("[role=tab]", tabs), i = bs.indexOf(e.target), n = bs[(i + (e.key === "ArrowRight" ? 1 : -1) + bs.length) % bs.length]; n.focus(); n.click(); }
});
$("#scrim").addEventListener("click", closeMenu);

/* ---------- boot ---------- */
for (const id of ["tb-mark", "side-mark"]) $("#" + id).innerHTML = svgOf("signature", "currentColor", 'aria-hidden="true"');
$("#foot-frame").innerHTML = nf({ in: 14, r: 50, o: .36, c: "#ffb657", w: .5 });
let saved = "auto"; try { saved = localStorage.getItem("cw-theme") || "auto"; } catch (e) {}
setTheme(saved);
window.addEventListener("hashchange", route);
route();
})();
