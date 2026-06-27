// ═══════════════════════════════════════════════════════════════════════════════
// COPA DO MUNDO 2026 — ÁLBUM DE FIGURINHAS
// app.js — toda a lógica da aplicação
// ═══════════════════════════════════════════════════════════════════════════════

// ── DADOS ────────────────────────────────────────────────────────────────────

const FWC_COUNT = 20;   // FWC-00 + FWC1..FWC19
const CC_COUNT  = 14;   // Coca-Cola: CC1..CC14
const PER_TEAM  = 20;

const GROUPS = [
  { id:"A", color:"#2d8a2d", teams:[
    {code:"MEX",name:"Mexico",          flag:"🇲🇽",page:8},
    {code:"RSA",name:"South Africa",    flag:"🇿🇦",page:10},
    {code:"KOR",name:"Korea Republic",  flag:"🇰🇷",page:12},
    {code:"CZE",name:"Czechia",         flag:"🇨🇿",page:14},
  ]},
  { id:"B", color:"#c02020", teams:[
    {code:"CAN",name:"Canada",             flag:"🇨🇦",page:16},
    {code:"BIH",name:"Bosnia-Herzegovina", flag:"🇧🇦",page:18},
    {code:"QAT",name:"Qatar",              flag:"🇶🇦",page:20},
    {code:"SUI",name:"Switzerland",        flag:"🇨🇭",page:22},
  ]},
  { id:"C", color:"#b89000", teams:[
    {code:"BRA",name:"Brazil",   flag:"🇧🇷",page:24},
    {code:"MAR",name:"Morocco",  flag:"🇲🇦",page:26},
    {code:"HAI",name:"Haiti",    flag:"🇭🇹",page:28},
    {code:"SCO",name:"Scotland", flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",page:30},
  ]},
  { id:"D", color:"#1a5abf", teams:[
    {code:"USA",name:"USA",       flag:"🇺🇸",page:32},
    {code:"PAR",name:"Paraguay",  flag:"🇵🇾",page:34},
    {code:"AUS",name:"Australia", flag:"🇦🇺",page:36},
    {code:"TUR",name:"Türkiye",   flag:"🇹🇷",page:38},
  ]},
  { id:"E", color:"#c85a00", teams:[
    {code:"GER",name:"Germany",       flag:"🇩🇪",page:40},
    {code:"CUW",name:"Curaçao",       flag:"🇨🇼",page:42},
    {code:"CIV",name:"Côte d'Ivoire", flag:"🇨🇮",page:44},
    {code:"ECU",name:"Ecuador",       flag:"🇪🇨",page:46},
  ]},
  { id:"F", color:"#0f7a40", teams:[
    {code:"NED",name:"Netherlands", flag:"🇳🇱",page:48},
    {code:"JPN",name:"Japan",       flag:"🇯🇵",page:50},
    {code:"SWE",name:"Sweden",      flag:"🇸🇪",page:52},
    {code:"TUN",name:"Tunisia",     flag:"🇹🇳",page:54},
  ]},
  { id:"G", color:"#6a30c0", teams:[
    {code:"BEL",name:"Belgium",     flag:"🇧🇪",page:58},
    {code:"EGY",name:"Egypt",       flag:"🇪🇬",page:60},
    {code:"IRN",name:"IR Iran",     flag:"🇮🇷",page:62},
    {code:"NZL",name:"New Zealand", flag:"🇳🇿",page:64},
  ]},
  { id:"H", color:"#0a8a8a", teams:[
    {code:"ESP",name:"Spain",        flag:"🇪🇸",page:66},
    {code:"CPV",name:"Cabo Verde",   flag:"🇨🇻",page:68},
    {code:"KSA",name:"Saudi Arabia", flag:"🇸🇦",page:70},
    {code:"URU",name:"Uruguay",      flag:"🇺🇾",page:72},
  ]},
  { id:"I", color:"#4a2a9a", teams:[
    {code:"FRA",name:"France",  flag:"🇫🇷",page:74},
    {code:"SEN",name:"Senegal", flag:"🇸🇳",page:76},
    {code:"IRQ",name:"Iraq",    flag:"🇮🇶",page:78},
    {code:"NOR",name:"Norway",  flag:"🇳🇴",page:80},
  ]},
  { id:"J", color:"#b06060", teams:[
    {code:"ARG",name:"Argentina", flag:"🇦🇷",page:82},
    {code:"ALG",name:"Algeria",   flag:"🇩🇿",page:84},
    {code:"AUT",name:"Austria",   flag:"🇦🇹",page:86},
    {code:"JOR",name:"Jordan",    flag:"🇯🇴",page:88},
  ]},
  { id:"K", color:"#c0204a", teams:[
    {code:"POR",name:"Portugal",   flag:"🇵🇹",page:90},
    {code:"COD",name:"Congo DR",   flag:"🇨🇩",page:92},
    {code:"UZB",name:"Uzbekistan", flag:"🇺🇿",page:94},
    {code:"COL",name:"Colombia",   flag:"🇨🇴",page:96},
  ]},
  { id:"L", color:"#7a1a1a", teams:[
    {code:"ENG",name:"England", flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",page:98},
    {code:"CRO",name:"Croatia", flag:"🇭🇷",page:100},
    {code:"GHA",name:"Ghana",   flag:"🇬🇭",page:102},
    {code:"PAN",name:"Panama",  flag:"🇵🇦",page:104},
  ]},
];

// Monta lista completa de figurinhas
const ALL = [];

// FWC brilhantes: FWC-00 (especial) + FWC1..FWC19
ALL.push({ id: "FWC-00", label: "FWC 00 — Especial", group: "FWC", isFWC: true, isShiny: true });
for (let i = 1; i <= 19; i++) {
  ALL.push({ id: `FWC${i}`, label: `FWC ${i}`, group: "FWC", isFWC: true, isShiny: true });
}

// Coca-Cola: CC1..CC14
for (let i = 1; i <= CC_COUNT; i++) {
  ALL.push({ id: `CC${i}`, label: `Coca-Cola ${i}`, group: "CC", isCC: true, isShiny: false });
}

// Seleções
GROUPS.forEach(g => g.teams.forEach(t => {
  for (let i = 1; i <= PER_TEAM; i++) {
    ALL.push({
      id:         `${t.code}-${i}`,
      label:      i === 1 ? `${t.name} — Escudo` : `${t.name} — Jogador ${i - 1}`,
      shortLabel: i === 1 ? "Escudo" : `J${i - 1}`,
      group:      g.id,
      teamCode:   t.code,
      teamName:   t.name,
      flag:       t.flag,
      page:       t.page,
      isFWC:      false,
      isCC:       false,
      groupColor: g.color,
    });
  }
}));

const TOTAL = ALL.length; // 20 FWC + 14 CC + 960 seleções = 994

// ── STATE ────────────────────────────────────────────────────────────────────

let owned = {};
try { owned = JSON.parse(localStorage.getItem("copa2026") || "{}"); } catch (e) {}

const save = () => localStorage.setItem("copa2026", JSON.stringify(owned));
const get  = id => owned[id] || 0;

function add(id) { owned[id] = (owned[id] || 0) + 1; save(); refresh(); }
function sub(id) {
  if (!owned[id]) return;
  owned[id]--;
  if (!owned[id]) delete owned[id];
  save(); refresh();
}

// ── STATS ────────────────────────────────────────────────────────────────────

function stats() {
  const collected = ALL.filter(s => get(s.id) >= 1).length;
  const repeats   = ALL.filter(s => get(s.id) > 1);
  const missing   = ALL.filter(s => get(s.id) === 0);
  const fwcC      = ALL.filter(s => s.isFWC && get(s.id) >= 1).length;
  const ccC       = ALL.filter(s => s.isCC  && get(s.id) >= 1).length;
  const teamC     = ALL.filter(s => !s.isFWC && !s.isCC && get(s.id) >= 1).length;
  const p         = pct(collected, TOTAL);
  return { collected, repeats, missing, fwcC, ccC, teamC, p };
}

function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }

function statusTxt(p) {
  if (p === 100) return { t: "Álbum Completo! 🏆", c: "#f0c040" };
  if (p >= 80)   return { t: "Quase lá! 🔥",       c: "#1db954" };
  if (p >= 60)   return { t: "Avançado 📌",         c: "#3b82f6" };
  if (p >= 40)   return { t: "Na metade ⚽",        c: "#8b5cf6" };
  if (p >= 20)   return { t: "Crescendo 🌱",        c: "#f59e0b" };
  return               { t: "Começando...",          c: "#4a6580" };
}

// ── HEADER ───────────────────────────────────────────────────────────────────

function refreshHeader() {
  const { collected, repeats, missing, fwcC, ccC, teamC, p } = stats();
  document.getElementById("hero-pct-num").textContent   = p + "%";
  document.getElementById("hero-pct-sub").textContent   = collected + " / " + TOTAL;
  document.getElementById("progress-bar").style.width   = p + "%";
  document.getElementById("lbl-collected").textContent  = "✅ " + collected + " coletadas";
  document.getElementById("lbl-missing").textContent    = "❌ " + missing.length + " faltando";
  const s = statusTxt(p);
  const el = document.getElementById("hero-status");
  el.textContent = s.t;
  el.style.color = s.c;
  document.getElementById("ms-fwc").textContent         = fwcC + "/" + FWC_COUNT;
  document.getElementById("ms-fwc-bar").style.width     = pct(fwcC, FWC_COUNT) + "%";
  document.getElementById("ms-cc").textContent          = ccC + "/" + CC_COUNT;
  document.getElementById("ms-teams").textContent       = teamC + "/960";
  document.getElementById("ms-teams-bar").style.width   = pct(teamC, 960) + "%";
  document.getElementById("ms-repeats").textContent     = repeats.length;
  document.getElementById("nav-repeats").textContent    =
    "🔄 Repetidas" + (repeats.length ? ` (${repeats.length})` : "");
}

// ── CHIP HTML ─────────────────────────────────────────────────────────────────

function chipHTML(s, isFWC) {
  const n     = get(s.id);
  const isCC  = !!s.isCC;
  const cls   = ["chip"];
  if (isFWC)  cls.push("fwc-chip");
  if (isCC)   cls.push("cc-chip");
  if (n > 1)  cls.push("repeat");
  else if (n === 1) cls.push("has");

  const checkColor = isFWC ? "#f0c040" : isCC ? "#e8000a" : "#1db954";
  const badge = n > 1
    ? `<span class="chip-repeat-badge">×${n}</span>`
    : n === 1
      ? `<span class="chip-repeat-badge" style="color:${checkColor}">✓</span>`
      : "";

  const safeLabel = s.label.replace(/'/g, "&#39;");

  return `<div class="${cls.join(" ")}"
    onclick="add('${s.id}')"
    oncontextmenu="event.preventDefault();sub('${s.id}')"
    onmousedown="startLongPress(event,'${s.id}','${safeLabel}')"
    onmouseup="cancelLongPress()"
    onmouseleave="cancelLongPress()"
    ontouchstart="startLongPress(event,'${s.id}','${safeLabel}')"
    ontouchend="handleTouchEnd(event,'${s.id}')"
    ontouchmove="cancelLongPress()">
    <span class="chip-code">${s.id}</span>${badge}
  </div>`;
}

// ── TAB ───────────────────────────────────────────────────────────────────────

let currentTab = "groups";

function switchTab(t) {
  currentTab = t;
  document.getElementById("tab-groups").classList.toggle("active", t === "groups");
  document.getElementById("tab-fwc").classList.toggle("active", t === "fwc");
  document.getElementById("tab-cc").classList.toggle("active", t === "cc");
  document.getElementById("group-filter").style.display = t === "groups" ? "" : "none";
  renderAlbum();
}

// ── RENDER ÁLBUM ──────────────────────────────────────────────────────────────

function renderAlbum() {
  const q  = document.getElementById("search-input").value.toLowerCase();
  const gf = document.getElementById("group-filter").value;
  const el = document.getElementById("album-content");

  // ── FWC tab
  if (currentTab === "fwc") {
    const fwcStickers = ALL.filter(s => s.isFWC && (!q || s.id.toLowerCase().includes(q)));
    const got = ALL.filter(s => s.isFWC && get(s.id) >= 1).length;
    let html = `<div class="fwc-card">
      <div class="fwc-card-head">
        <span class="fwc-card-title">⭐ FWC — Figurinhas Brilhantes</span>
        <span class="fwc-card-count">${got}/${FWC_COUNT} (${pct(got, FWC_COUNT)}%)</span>
      </div>
      <div class="fwc-grid">`;
    fwcStickers.forEach(s => { html += chipHTML(s, true); });
    html += `</div>
      <div class="team-actions">
        <button class="team-btn team-btn-fill"  onclick="fillFWC()">✅ Preencher todas</button>
        <button class="team-btn team-btn-clear" onclick="clearFWC()">🗑️ Remover todas</button>
      </div>
    </div>`;
    el.innerHTML = html;
    return;
  }

  // ── CC tab (Coca-Cola)
  if (currentTab === "cc") {
    const ccStickers = ALL.filter(s => s.isCC && (!q || s.id.toLowerCase().includes(q)));
    const got = ALL.filter(s => s.isCC && get(s.id) >= 1).length;
    let html = `<div class="cc-card">
      <div class="cc-card-head">
        <span class="cc-card-title">🥤 Coca-Cola — Figurinha Especial</span>
        <span class="cc-card-count">${got}/${CC_COUNT} (${pct(got,CC_COUNT)}%)</span>
      </div>
      <div class="fwc-grid">`;
    ccStickers.forEach(s => { html += chipHTML(s, false); });
    html += `</div>
      <div class="team-actions">
        <button class="team-btn team-btn-fill"  onclick="fillCC()">✅ Marcar coletada</button>
        <button class="team-btn team-btn-clear" onclick="clearCC()">🗑️ Remover</button>
      </div>
    </div>`;
    el.innerHTML = html;
    return;
  }

  // ── Grupos tab
  let html = "";
  GROUPS.filter(g => gf === "ALL" || gf === g.id).forEach(g => {
    const gTeams = g.teams.filter(t => {
      if (!q) return true;
      const match     = t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q);
      const chipMatch = ALL.some(s => s.teamCode === t.code &&
        (s.id.toLowerCase().includes(q) || s.label.toLowerCase().includes(q)));
      return match || chipMatch;
    });
    if (!gTeams.length) return;

    const gAll = ALL.filter(s => s.group === g.id);
    const gGot = gAll.filter(s => get(s.id) >= 1).length;
    const gTot = gAll.length;
    const gP   = pct(gGot, gTot);

    html += `<div style="margin-bottom:20px">
      <div class="group-header" style="background:${g.color}22;border-color:${g.color}55">
        <span class="group-header-label" style="color:${g.color}">GRUPO ${g.id}</span>
        <div class="group-header-bar-wrap">
          <div class="group-header-bar" style="width:${gP}%;background:${g.color}"></div>
        </div>
        <span class="group-header-count">${gGot}/${gTot}</span>
      </div>`;

    gTeams.forEach(t => {
      const tAll = ALL.filter(s => s.teamCode === t.code);
      const tStickers = q
        ? tAll.filter(s => s.id.toLowerCase().includes(q) ||
            s.label.toLowerCase().includes(q) ||
            t.name.toLowerCase().includes(q) ||
            t.code.toLowerCase().includes(q))
        : tAll;
      if (!tStickers.length) return;

      const tGot = tAll.filter(s => get(s.id) >= 1).length;
      const tP   = pct(tGot, PER_TEAM);
      const tCol = tP === 100 ? "#1db954" : g.color;

      html += `<div class="team-card">
        <div class="team-card-head">
          <span class="team-flag">${t.flag}</span>
          <span class="team-name">${t.name}</span>
          <span class="team-page">pág. ${t.page}</span>
          <span class="team-count" style="color:${tCol}">${tGot}/${PER_TEAM}</span>
        </div>
        <div class="team-prog" style="background:#1a3050">
          <div class="team-prog-fill" style="width:${tP}%;background:${tCol}"></div>
        </div>
        <div class="sticker-grid">`;
      tStickers.forEach(s => { html += chipHTML(s, false); });
      html += `</div>
        <div class="team-actions">
          <button class="team-btn team-btn-fill"  onclick="fillTeam('${t.code}')">✅ Preencher tudo</button>
          <button class="team-btn team-btn-clear" onclick="clearTeam('${t.code}')">🗑️ Remover seleção</button>
        </div>
      </div>`;
    });
    html += "</div>";
  });

  el.innerHTML = html || '<p style="color:#4a6580;padding:20px">Nenhuma figurinha encontrada.</p>';
}

// ── RENDER REPETIDAS ──────────────────────────────────────────────────────────

function renderRepeats() {
  const repeats = ALL.filter(s => get(s.id) > 1);
  const el = document.getElementById("repeats-content");

  if (!repeats.length) {
    el.innerHTML = `<div class="repeats-empty">
      <div class="repeats-empty-icon">🎉</div>
      <p>Nenhuma repetida ainda!<br>
      <span style="font-size:13px;color:#4a6580">Continue coletando.</span></p>
    </div>`;
    return;
  }

  let html = `<div class="mono-box">${escHtml(buildRepeatsText(repeats))}</div>
  <p style="font-size:11px;color:#4a6580;margin-top:10px;margin-bottom:6px">
    🖱️ Clique direito no item para remover uma cópia
  </p>
  <div class="repeat-list">`;

  repeats.forEach(s => {
    const extra = get(s.id) - 1;
    html += `<div class="repeat-item" oncontextmenu="event.preventDefault();sub('${s.id}')">
      ${s.flag ? `<span>${s.flag}</span>` : ""}
      <span class="repeat-item-code">${s.id}</span>
      <span class="repeat-item-label">${s.isFWC ? "FWC ⭐" : s.shortLabel}</span>
      <span class="repeat-badge">+${extra}</span>
      <button class="repeat-sub-btn" title="Remover uma" onclick="sub('${s.id}')">−</button>
    </div>`;
  });
  html += "</div>";
  el.innerHTML = html;
}

function buildRepeatsText(repeats) {
  if (!repeats || !repeats.length) return "Nenhuma repetida ainda! 🎉";
  const lines = ["🔄 MINHAS REPETIDAS — COPA DO MUNDO 2026", ""];
  const fwcR  = repeats.filter(s => s.isFWC);
  if (fwcR.length) {
    lines.push("⭐ FWC (Brilhantes):");
    fwcR.forEach(s => lines.push(`  ${s.id} — ${get(s.id) - 1}x sobrando`));
    lines.push("");
  }
  const ccR = repeats.filter(s => s.isCC);
  if (ccR.length) {
    lines.push("🥤 Coca-Cola:");
    ccR.forEach(s => lines.push(`  ${s.id} — ${get(s.id) - 1}x sobrando`));
    lines.push("");
  }
  GROUPS.forEach(g => {
    const gr = repeats.filter(s => !s.isFWC && s.group === g.id);
    if (!gr.length) return;
    lines.push(`Grupo ${g.id}:`);
    gr.forEach(s => lines.push(`  ${s.id} (${s.label}) — ${get(s.id) - 1}x sobrando`));
    lines.push("");
  });
  const totalExtra = repeats.reduce((a, s) => a + get(s.id) - 1, 0);
  lines.push(`Total para troca: ${totalExtra} figurinhas`);
  return lines.join("\n");
}

// ── RENDER RELATÓRIO ──────────────────────────────────────────────────────────

function renderReport() {
  const { collected, repeats, missing, fwcC, ccC, teamC, p } = stats();
  const el = document.getElementById("report-content");

  let html = `<div class="stat-grid">
    ${statCard("📒","Total",TOTAL,"#4a6580")}
    ${statCard("✅","Coletadas",collected,"#1db954")}
    ${statCard("❌","Faltando",missing.length,"#ef4444")}
    ${statCard("⭐","FWC",fwcC+"/"+FWC_COUNT,"#f0c040")}
    ${statCard("🥤","Coca-Cola",ccC+"/"+CC_COUNT,"#e8000a")}
    ${statCard("🌍","Seleções",teamC+"/960","#3b82f6")}
    ${statCard("🔄","Repetidas",repeats.length,"#f59e0b")}
  </div>
  <div style="background:#0d1e33;border-radius:14px;overflow:hidden;border:1px solid #1a3050;margin-bottom:14px">
    <div style="padding:10px 14px;background:#0f1f32;font-weight:800;font-size:13px">🌍 Progresso por Seleção</div>`;

  GROUPS.forEach(g => {
    const gAll = ALL.filter(s => s.group === g.id);
    const gGot = gAll.filter(s => get(s.id) >= 1).length;
    html += `<div class="report-group-sub">Grupo ${g.id} — ${gGot}/${gAll.length} (${pct(gGot,gAll.length)}%)</div>`;
    g.teams.forEach(t => {
      const tGot = ALL.filter(s => s.teamCode === t.code && get(s.id) >= 1).length;
      const tp   = pct(tGot, PER_TEAM);
      const col  = tp === 100 ? "#1db954" : g.color;
      html += `<div class="report-team-row">
        <span class="report-team-flag">${t.flag}</span>
        <span class="report-team-name">${t.name}</span>
        <div class="report-bar-wrap">
          <div class="report-bar-fill" style="width:${tp}%;background:${col}"></div>
        </div>
        <span class="report-team-stat" style="color:${col}">${tGot}/${PER_TEAM} ${tp}%</span>
      </div>`;
    });
  });
  html += `</div>`;

  // Seção de faltando
  if (missing.length === 0) {
    html += `<div style="background:#091a0f;border:1.5px solid #1db954;border-radius:12px;
      padding:16px;text-align:center;margin-bottom:14px;font-weight:700;color:#1db954;font-size:15px">
      🏆 Álbum Completo! Parabéns!</div>`;
  } else {
    html += `<div style="background:#0d1e33;border-radius:14px;overflow:hidden;border:1px solid #1a3050;margin-bottom:14px">
      <div style="padding:10px 14px;background:#1a0a0a;font-weight:800;font-size:13px;color:#ef4444">
        ❌ Faltando (${missing.length})
      </div>`;
    const fwcM = missing.filter(s => s.isFWC);
    if (fwcM.length) {
      html += `<div style="padding:8px 14px;border-bottom:1px solid #1a3050">
        <span style="font-size:11px;font-weight:700;color:#f0c040">⭐ FWC: </span>
        <span style="font-size:11px;color:#7a9ab8">${fwcM.map(s => s.id).join(", ")}</span>
      </div>`;
    }
    const ccM = missing.filter(s => s.isCC);
    if (ccM.length) {
      html += `<div style="padding:8px 14px;border-bottom:1px solid #1a3050">
        <span style="font-size:11px;font-weight:700;color:#e8000a">🥤 Coca-Cola: </span>
        <span style="font-size:11px;color:#7a9ab8">CC-00 (não coletada)</span>
      </div>`;
    }
    GROUPS.forEach(g => {
      const gM = missing.filter(s => !s.isFWC && s.group === g.id);
      if (!gM.length) return;
      html += `<div style="padding:4px 14px 2px;font-size:10px;font-weight:700;color:#4a6580;background:#0d1a2a;letter-spacing:1px">GRUPO ${g.id}</div>`;
      g.teams.forEach(t => {
        const tM = gM.filter(s => s.teamCode === t.code);
        if (!tM.length) return;
        html += `<div style="padding:5px 14px;border-bottom:1px solid #1a3050;display:flex;align-items:flex-start;gap:8px">
          <span>${t.flag}</span>
          <span style="font-size:12px;min-width:110px;color:#7a9ab8">${t.name}</span>
          <span style="font-size:11px;color:#ef444488;flex:1;line-height:1.6">
            ${tM.map(s => s.id.split("-")[1] === "1" ? "Escudo" : "J" + (parseInt(s.id.split("-")[1]) - 1)).join(", ")}
          </span>
        </div>`;
      });
    });
    html += `</div>`;
  }

  html += `<div class="mono-box">${escHtml(buildReportText())}</div>`;
  el.innerHTML = html;
}

function statCard(icon, label, val, color) {
  return `<div class="stat-card" style="border-color:${color}33">
    <div class="stat-card-icon">${icon}</div>
    <div class="stat-card-val" style="color:${color}">${val}</div>
    <div class="stat-card-label">${label}</div>
  </div>`;
}

function buildReportText() {
  const { collected, repeats, missing, fwcC, ccC, teamC, p } = stats();
  const bar = (v, w = 10) => "█".repeat(Math.round(v / 10)).padEnd(w, "░");
  const lines = [];
  lines.push("╔══════════════════════════════════════════╗");
  lines.push("║   📒 ÁLBUM COPA DO MUNDO 2026 FIFA       ║");
  lines.push("╠══════════════════════════════════════════╣");
  lines.push(`║  📊 ${collected}/${TOTAL} figurinhas (${p}%)`.padEnd(45) + "║");
  lines.push(`║  ⭐ FWC brilhantes: ${fwcC}/${FWC_COUNT}`.padEnd(45) + "║");
  lines.push(`║  🌍 Seleções: ${teamC}/960`.padEnd(45) + "║");
  lines.push(`║  🔄 Repetidas: ${repeats.length}`.padEnd(45) + "║");
  lines.push(`║  ❌ Faltando: ${missing.length}`.padEnd(45) + "║");
  lines.push(`║  🏆 ${statusTxt(p).t}`.padEnd(45) + "║");
  lines.push("╚══════════════════════════════════════════╝");
  lines.push("");
  lines.push(`⭐ FWC (Brilhantes): ${fwcC}/${FWC_COUNT} [${bar(pct(fwcC, FWC_COUNT))}] ${pct(fwcC, FWC_COUNT)}%`);
  lines.push(`🥤 Coca-Cola: ${ccC}/${CC_COUNT} [${bar(pct(ccC,CC_COUNT))}] ${pct(ccC,CC_COUNT)}%`);
  lines.push("");
  lines.push("🌍 SELEÇÕES POR GRUPO:");
  lines.push("─".repeat(46));
  GROUPS.forEach(g => {
    const gAll = ALL.filter(s => s.group === g.id);
    const gGot = gAll.filter(s => get(s.id) >= 1).length;
    lines.push(`\n  GRUPO ${g.id} — ${gGot}/${gAll.length} (${pct(gGot, gAll.length)}%)`);
    g.teams.forEach(t => {
      const tGot = ALL.filter(s => s.teamCode === t.code && get(s.id) >= 1).length;
      const tp   = pct(tGot, PER_TEAM);
      lines.push(`  ${t.flag} ${t.name.padEnd(22)} ${tGot}/${PER_TEAM} [${bar(tp)}] ${tp}%`);
    });
  });
  if (repeats.length) {
    lines.push(""); lines.push("🔄 REPETIDAS:");
    lines.push("─".repeat(46));
    repeats.forEach(s => lines.push(`  ${s.id} — ${s.label} (${get(s.id) - 1}x extra)`));
  }
  lines.push(""); lines.push("❌ FALTANDO:");
  lines.push("─".repeat(46));
  if (missing.length === 0) {
    lines.push("  Nenhuma! Álbum completo! 🏆");
  } else {
    const fwcMiss = missing.filter(s => s.isFWC);
    if (fwcMiss.length) {
      lines.push("  ⭐ FWC Brilhantes:");
      lines.push("  " + fwcMiss.map(s => s.id).join(", "));
      lines.push("");
    }
    GROUPS.forEach(g => {
      const gMiss = missing.filter(s => !s.isFWC && s.group === g.id);
      if (!gMiss.length) return;
      lines.push(`  Grupo ${g.id}:`);
      g.teams.forEach(t => {
        const tMiss = gMiss.filter(s => s.teamCode === t.code);
        if (!tMiss.length) return;
        lines.push(`    ${t.flag} ${t.name}: ${tMiss.map(s => s.id).join(", ")}`);
      });
      lines.push("");
    });
  }
  lines.push("");
  lines.push(`📅 ${new Date().toLocaleDateString("pt-BR", { dateStyle: "full" })}`);
  lines.push("⚽ Boa coleção! Copa do Mundo 2026 🏆");
  return lines.join("\n");
}

// ── COPIAR ────────────────────────────────────────────────────────────────────

function showToast(msg) {
  const t = document.getElementById("toast");
  if (msg) t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => { t.classList.remove("show"); t.textContent = "✅ Copiado!"; }, 2200);
}

function copyRepeats() {
  const repeats = ALL.filter(s => get(s.id) > 1);
  navigator.clipboard.writeText(buildRepeatsText(repeats)).then(showToast);
}

function copyReport() {
  navigator.clipboard.writeText(buildReportText()).then(showToast);
}

// ── NAVEGAÇÃO ─────────────────────────────────────────────────────────────────

let currentView = "album";

function showView(v) {
  currentView = v;
  document.querySelectorAll(".view").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(el => el.classList.remove("active"));
  document.getElementById("view-" + v).classList.add("active");
  document.querySelectorAll(".nav-btn")[["album","repeats","report"].indexOf(v)].classList.add("active");
  if (v === "repeats") renderRepeats();
  if (v === "report")  renderReport();
}

// ── REFRESH GERAL ─────────────────────────────────────────────────────────────

function refresh() {
  refreshHeader();
  if (currentView === "album")   renderAlbum();
  if (currentView === "repeats") renderRepeats();
  if (currentView === "report")  renderReport();
}

function escHtml(s) {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

// ── AÇÕES POR SELEÇÃO ─────────────────────────────────────────────────────────

function fillTeam(code) {
  ALL.filter(s => s.teamCode === code).forEach(s => { if (!owned[s.id]) owned[s.id] = 1; });
  save(); refresh();
  showToast("✅ Seleção marcada como completa!");
}

function clearTeam(code) {
  ALL.filter(s => s.teamCode === code).forEach(s => { delete owned[s.id]; });
  save(); refresh();
  showToast("🗑️ Seleção removida!");
}

function fillFWC() {
  ALL.filter(s => s.isFWC).forEach(s => { if (!owned[s.id]) owned[s.id] = 1; });
  save(); refresh();
  showToast("✅ FWC marcadas como completas!");
}

function clearFWC() {
  ALL.filter(s => s.isFWC).forEach(s => { delete owned[s.id]; });
  save(); refresh();
  showToast("🗑️ FWC removidas!");
}

function fillCC() {
  ALL.filter(s => s.isCC).forEach(s => { if (!owned[s.id]) owned[s.id] = 1; });
  save(); refresh();
  showToast("✅ Coca-Cola marcada!");
}

function clearCC() {
  ALL.filter(s => s.isCC).forEach(s => { delete owned[s.id]; });
  save(); refresh();
  showToast("🗑️ Coca-Cola removida!");
}

// ── CONFIRMAR AÇÕES GLOBAIS ───────────────────────────────────────────────────

let pendingAction = null;

function confirmAction(type) {
  pendingAction = type;
  const icon  = document.getElementById("confirm-icon");
  const title = document.getElementById("confirm-title");
  const desc  = document.getElementById("confirm-desc");
  const yes   = document.getElementById("confirm-yes");
  if (type === "complete") {
    icon.textContent  = "🏆";
    title.textContent = "Finalizar Álbum?";
    desc.textContent  = "Isso vai marcar TODAS as 980 figurinhas como coletadas. Suas repetidas serão mantidas.";
    yes.textContent   = "🏆 Sim, finalizar!";
    yes.style.background = "#1db954";
    yes.style.color = "#fff";
  } else {
    icon.textContent  = "⚠️";
    title.textContent = "Zerar o álbum?";
    desc.textContent  = "Isso vai apagar TODO o progresso. Essa ação não pode ser desfeita.";
    yes.textContent   = "🗑️ Sim, zerar tudo";
    yes.style.background = "#ef4444";
    yes.style.color = "#fff";
  }
  document.getElementById("confirm-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeConfirm() {
  document.getElementById("confirm-overlay").classList.remove("open");
  document.body.style.overflow = "";
  pendingAction = null;
}

function runConfirm() {
  if (pendingAction === "complete") {
    ALL.forEach(s => { if (!owned[s.id]) owned[s.id] = 1; });
    save(); refresh(); closeConfirm();
    showToast("🏆 Álbum completo! Parabéns!");
  } else if (pendingAction === "reset") {
    owned = {};
    save(); refresh(); closeConfirm();
    showToast("🗑️ Álbum zerado!");
  }
}

// ── LONG PRESS → POPUP ────────────────────────────────────────────────────────

let longPressTimer  = null;
let longPressActive = false;
let popupStickerID  = null;
let popupValue      = 0;
const LONG_PRESS_MS = 500;

function startLongPress(e, id, label) {
  longPressActive = false;
  clearTimeout(longPressTimer);
  longPressTimer = setTimeout(() => {
    longPressActive = true;
    doOpenPopup(id, label);
  }, LONG_PRESS_MS);
}

function cancelLongPress() { clearTimeout(longPressTimer); }

function handleTouchEnd(e, id) {
  clearTimeout(longPressTimer);
  if (longPressActive) { longPressActive = false; e.preventDefault(); return; }
  add(id);
}

function doOpenPopup(id, label) {
  popupStickerID = id;
  popupValue     = get(id);
  document.getElementById("popup-id").textContent    = id;
  document.getElementById("popup-title").textContent = label;
  updatePopupDisplay();
  document.getElementById("popup-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closePopup() {
  document.getElementById("popup-overlay").classList.remove("open");
  document.body.style.overflow = "";
  popupStickerID = null;
}

function popChange(delta) {
  popupValue = Math.max(0, popupValue + delta);
  updatePopupDisplay();
}

function updatePopupDisplay() {
  document.getElementById("popup-num").textContent = popupValue;
  const statusEl = document.getElementById("popup-status");
  if (popupValue === 0) {
    statusEl.textContent       = "❌ Não coletada";
    statusEl.style.color       = "#ef4444";
    statusEl.style.borderColor = "#ef444430";
    statusEl.style.background  = "#ef444408";
  } else if (popupValue === 1) {
    statusEl.textContent       = "✅ Coletada (1 exemplar)";
    statusEl.style.color       = "#1db954";
    statusEl.style.borderColor = "#1db95430";
    statusEl.style.background  = "#1db95408";
  } else {
    statusEl.textContent       = "🔄 Coletada + " + (popupValue - 1) + " repetida" + (popupValue > 2 ? "s" : "");
    statusEl.style.color       = "#f0c040";
    statusEl.style.borderColor = "#f0c04030";
    statusEl.style.background  = "#f0c04008";
  }
  const numEl = document.getElementById("popup-num");
  numEl.style.transform  = "scale(1.25)";
  numEl.style.transition = "transform .1s";
  setTimeout(() => { numEl.style.transform = "scale(1)"; }, 80);
}

function confirmPopup() {
  if (popupStickerID == null) return;
  if (popupValue === 0) delete owned[popupStickerID];
  else owned[popupStickerID] = popupValue;
  save(); refresh(); closePopup();
  showToast("✅ " + popupStickerID + " atualizada!");
}

function zeroPopup() { popupValue = 0; updatePopupDisplay(); }

// ── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  // Popula filtro de grupos
  const gfEl = document.getElementById("group-filter");
  GROUPS.forEach(g => {
    const o = document.createElement("option");
    o.value = g.id;
    o.textContent = "Grupo " + g.id;
    gfEl.appendChild(o);
  });

  // Confirm overlay fecha ao clicar fora
  document.getElementById("confirm-overlay").addEventListener("click", e => {
    if (e.target === document.getElementById("confirm-overlay")) closeConfirm();
  });

  // Popup overlay fecha ao clicar fora
  document.getElementById("popup-overlay").addEventListener("click", e => {
    if (e.target === document.getElementById("popup-overlay")) closePopup();
  });

  // Hold +/− no popup para mudança rápida
  document.querySelectorAll(".pop-btn").forEach((btn, i) => {
    const delta = i === 0 ? -1 : 1;
    let holdT, holdIv;
    const startH = () => {
      popChange(delta);
      holdT = setTimeout(() => { holdIv = setInterval(() => popChange(delta), 80); }, 380);
    };
    const stopH = () => { clearTimeout(holdT); clearInterval(holdIv); };
    btn.addEventListener("mousedown", startH);
    btn.addEventListener("touchstart", e => { e.preventDefault(); startH(); });
    ["mouseup","mouseleave","touchend","touchcancel"].forEach(ev => btn.addEventListener(ev, stopH));
  });

  refresh();
});
