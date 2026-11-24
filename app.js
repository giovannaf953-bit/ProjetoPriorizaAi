const $ = (s, r = document) => r.querySelector(s),
  $$ = (s, r = document) => [...r.querySelectorAll(s)];
const le = (k, p) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? p;
  } catch {
    return p;
  }
};
const grava = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => "&#" + c.charCodeAt(0) + ";");
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const p2 = (n) => String(n).padStart(2, "0");
const iso = (d) =>
  `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
const MES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];
const I = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  calendario:
    '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/>',
  lista: '<path d="m3 17 2 2 4-4M3 7l2 2 4-4M13 6h8M13 12h8M13 18h8"/>',
  casa: '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  config:
    '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  editar: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  lixo: '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
  sino: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  zap: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  grafico: '<path d="M3 3v16a2 2 0 0 0 2 2h16M18 17V9M13 17V5M8 17v-3"/>',
  usuario: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  sair: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  alvo: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
  esq: '<path d="m15 18-6-6 6-6"/>',
  dir: '<path d="m9 18 6-6-6-6"/>',
  olho: '<path d="M2 12a10.8 10.8 0 0 1 20 0 10.8 10.8 0 0 1-20 0"/><circle cx="12" cy="12" r="3"/>',
  email:
    '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  cadeado:
    '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  voltar: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
};
const ic = (n, s = 20) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const PLANOS = {
  free: {
    nome: "Plano Free",
    desc: "Para experimentar o Prioriza AI",
    preco: "0",
    cta: "Começar grátis",
    titulo: "O que está incluso",
    itens: [
      "Até 5 tarefas ao mesmo tempo",
      "Calendário com os dias de entrega",
      "1 lembrete no WhatsApp, no dia do prazo",
    ],
    nota: "Precisa de mais tarefas? Passe para o Essencial.",
  },
  essencial: {
    nome: "Plano Essencial",
    desc: "Para começar a se organizar",
    preco: "15,90",
    cta: "Assinar Essencial",
    titulo: "O que está incluso",
    itens: [
      "Tarefas ilimitadas",
      "Subtarefas dentro de cada tarefa",
      "Acompanhamento do que foi concluído e do que falta",
      "Lembretes periódicos no WhatsApp",
    ],
    nota: "Os avisos chegam no mesmo ritmo para todas as tarefas.",
  },
  foco: {
    nome: "Plano Foco",
    desc: "Para não deixar nada passar",
    preco: "29,90",
    cta: "Assinar Foco",
    dest: 1,
    titulo: "Tudo do plano Essencial, mais:",
    itens: [
      "Lembretes também por e-mail",
      "Mais avisos para as tarefas importantes",
      "Frequência ajustada pela prioridade e pelo prazo",
    ],
    nota: "Alta: todo dia. Média: a cada 2 dias. Baixa: 1 aviso antes do prazo.",
  },
};
const PR = {
  alta: ["Prioridade alta", "solido"],
  media: ["Prioridade média", "leve"],
  baixa: ["Prioridade baixa", "cinza"],
};
const pagina = document.body.dataset.pagina,
  publica = ["index", "entrar", "registrar"].includes(pagina);
let U = le("usuario", null),
  T = le("tarefas", []),
  selId = null,
  filtro = "todas",
  q = new URLSearchParams(location.search).get("q") || "",
  mes = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
const logado = () =>
  !!(localStorage.getItem("sessao") || sessionStorage.getItem("sessao"));
const entra = (m) => {
  (m ? localStorage : sessionStorage).setItem("sessao", "1");
  location.href = "home.html";
};
const sair = () => {
  localStorage.removeItem("sessao");
  sessionStorage.removeItem("sessao");
  location.href = "index.html";
};
if (!publica && !(logado() && U)) location.replace("entrar.html");
if ((pagina === "entrar" || pagina === "registrar") && logado() && U)
  location.replace("home.html");

const rot = (s) => {
  if (!s) return "Sem prazo";
  const h = new Date();
  if (s === iso(h)) return "Hoje";
  if (s === iso(new Date(h.getFullYear(), h.getMonth(), h.getDate() + 1)))
    return "Amanhã";
  return s.slice(8) + "/" + s.slice(5, 7);
};
const pct = (t) =>
  t.subs.length
    ? Math.round((t.subs.filter((s) => s.f).length * 100) / t.subs.length)
    : t.feita
      ? 100
      : 0;
const barra = (p) =>
  `<div class="tarefa-and"><div class="barra" role="progressbar" aria-label="Andamento" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p}"><i style="width:${p}%"></i></div><span class="leg">${p}%</span></div>`;
const tags = (t) =>
  `<span class="tag ${PR[t.prioridade][1]}">${PR[t.prioridade][0]}</span><span class="tag borda">${rot(t.prazo)}</span>`;
const item = (t, s) =>
  `<li class="tarefa${s ? " ativa" : ""}${t.feita ? " feita" : ""}"><input type="checkbox" class="check" data-a="concluir" data-id="${t.id}" ${t.feita ? "checked" : ""} aria-label="Concluir ${esc(t.titulo)}"><div class="corpo"><h3><button class="titulo-btn" data-a="sel" data-id="${t.id}">${esc(t.titulo)}</button></h3><div class="meta">${tags(t)}<span class="leg">${t.subs.length ? `${t.subs.filter((x) => x.f).length} de ${t.subs.length} subtarefas` : "Sem subtarefas"}</span></div>${t.subs.length ? barra(pct(t)) : ""}</div><div class="acoes"><button class="icone-btn" data-a="editar" data-id="${t.id}" aria-label="Editar ${esc(t.titulo)}">${ic("editar", 18)}</button><button class="icone-btn" data-a="excluir" data-id="${t.id}" aria-label="Excluir ${esc(t.titulo)}">${ic("lixo", 18)}</button></div></li>`;
const detalhe = (t) => {
  const li = (s, i) =>
      `<li class="sub${s.f ? " feita" : ""}"><label><input type="checkbox" class="check" data-a="sub" data-id="${t.id}" data-n="${i}" ${s.f ? "checked" : ""}>${esc(s.t)}</label></li>`,
    x = t.subs.map((s, i) => [s, i]),
    fa = x.filter(([s]) => !s.f),
    fe = x.filter(([s]) => s.f);
  return `<h3>${esc(t.titulo)}</h3><div class="meta">${tags(t)}</div><p class="neg">${fe.length} de ${t.subs.length} subtarefas concluídas</p>${barra(pct(t))}<h4>Faltam (${fa.length})</h4><ul class="subs">${fa.map(([s, i]) => li(s, i)).join("")}</ul><h4>Concluídas (${fe.length})</h4><ul class="subs">${fe.map(([s, i]) => li(s, i)).join("")}</ul><form class="add-sub" data-id="${t.id}"><label class="so-leitor" for="ns">Nova subtarefa</label><input id="ns" placeholder="Nova subtarefa" required><button class="btn contorno" type="submit">+ Adicionar subtarefa</button></form><p class="erro" id="aviso" role="status"></p><div class="acoes-det"><button class="btn contorno" data-a="editar" data-id="${t.id}">Editar tarefa</button><button class="btn" data-a="excluir" data-id="${t.id}">Excluir</button></div>`;
};

function calendario() {
  const el = $("#cal");
  if (!el) return;
  const a = mes.getFullYear(),
    m = mes.getMonth(),
    n = new Date(a, m + 1, 0).getDate(),
    h = iso(new Date()),
    pz = new Set(T.filter((t) => !t.feita && t.prazo).map((t) => t.prazo));
  let d = "";
  for (let i = 1; i <= n; i++) {
    const s = `${a}-${p2(m + 1)}-${p2(i)}`,
      p = pz.has(s),
      passado = s < h;
    d += `<li class="dia${s === h ? " hoje" : ""}${passado ? " passado" : ""}${p ? " prazo" : ""}"${i === 1 ? ` style="grid-column-start:${mes.getDay() + 1}"` : ""} aria-label="${i} de ${MES[m]}${s === h ? ", hoje" : ""}${passado ? ", data passada" : ""}${p ? ", há tarefa para entregar" : ""}"><b>${i}</b></li>`;
  }
  el.innerHTML = `<div class="cal-nav"><button data-a="mes" data-d="-1" aria-label="Mês anterior">${ic("esq")}</button><h2>${cap(MES[m])} de ${a}</h2><button data-a="mes" data-d="1" aria-label="Próximo mês">${ic("dir")}</button></div><div class="sem" aria-hidden="true">${[..."DSTQQSS"].map((x) => `<span>${x}</span>`).join("")}</div><ol class="cal-g">${d}</ol>`;
}

const CIRC = 2 * Math.PI * 48;
let pcAntes = 0;
function progresso(P, c, pend) {
  const pc = T.length ? Math.round((c * 100) / T.length) : 0,
    ts = T.reduce((a, t) => a + t.subs.length, 0),
    fs = T.reduce((a, t) => a + t.subs.filter((s) => s.f).length, 0),
    ps = ts ? Math.round((fs * 100) / ts) : 0;
  const ft = (n) => `${n} ${n > 1 ? "tarefas" : "tarefa"}`,
    msg = !T.length
      ? "<b>Crie sua primeira tarefa</b>"
      : c === T.length
        ? '<b>Tudo concluído!</b><p class="peq">Você finalizou todas as tarefas.</p>'
        : !c
          ? '<b>Vamos começar!</b><p class="peq">Conclua sua primeira tarefa.</p>'
          : pc >= 70
            ? `<b>Quase lá!</b><p class="peq">Falta${pend > 1 ? "m" : ""} ${ft(pend)} para concluir.</p>`
            : `<b>Continue assim!</b><p class="peq">Faltam ${ft(pend)} para concluir.</p>`;
  const novo = !$(".arco-prog", P);
  if (novo)
    P.innerHTML = `<div class="prog"><svg class="anel" width="112" height="112" viewBox="0 0 120 120" role="img"><circle class="trilha" cx="60" cy="60" r="48" fill="none" stroke-width="12"/><circle class="arco-prog" cx="60" cy="60" r="48" fill="none" stroke-width="12" stroke-linecap="round" stroke-dasharray="0 ${CIRC}" transform="rotate(-90 60 60)"/><text x="60" y="68" text-anchor="middle">0%</text></svg><div class="prog__barras"><div class="prog__linha"><p><span class="neg">Tarefas</span><span class="leg" id="p-t"></span></p><div class="barra"><i id="p-tb" style="width:0"></i></div></div><div class="prog__linha"><p><span class="neg">Subtarefas</span><span class="leg" id="p-s"></span></p><div class="barra"><i id="p-sb" style="width:0"></i></div></div></div></div><div class="motiva">${ic("grafico", 28)}<div id="p-msg"></div></div>`;
  const atualiza = () => {
    const arco = $(".arco-prog", P),
      tx = $(".anel text", P),
      de = pcAntes;
    arco.setAttribute("stroke-dasharray", `${(CIRC * pc) / 100} ${CIRC}`);
    arco.style.opacity = pc ? 1 : 0;
    $(".anel", P).setAttribute("aria-label", `${pc}% das tarefas concluídas`);
    if (matchMedia("(prefers-reduced-motion:reduce)").matches || de === pc)
      tx.textContent = pc + "%";
    else {
      const t0 = performance.now(),
        passo = (n) => {
          const k = Math.min(1, (n - t0) / 800);
          tx.textContent = Math.round(de + (pc - de) * k) + "%";
          if (k < 1) requestAnimationFrame(passo);
        };
      requestAnimationFrame(passo);
    }
    pcAntes = pc;
    $("#p-t", P).textContent = `${c} de ${T.length}`;
    $("#p-s", P).textContent = `${fs} de ${ts}`;
    $("#p-tb", P).style.width = pc + "%";
    $("#p-sb", P).style.width = ps + "%";
    $("#p-msg", P).innerHTML = msg;
  };
  novo
    ? requestAnimationFrame(() => requestAnimationFrame(atualiza))
    : atualiza();
}
function render() {
  if (!["home", "tarefas", "calendario"].includes(pagina)) return;
  const h = iso(new Date()),
    c = T.filter((t) => t.feita).length,
    pend = T.length - c;
  const vis = T.filter(
    (t) =>
      t.titulo.toLowerCase().includes(q.toLowerCase()) &&
      (filtro === "todas" || (filtro === "concl") === t.feita),
  ).sort((a, b) => ((a.prazo || "9") > (b.prazo || "9") ? 1 : -1));
  const sel = T.find((t) => t.id === selId) || T.find((t) => !t.feita) || T[0];
  selId = sel?.id;
  const G = [
    ["Hoje", (t) => !t.feita && t.prazo === h],
    ["Atrasadas", (t) => !t.feita && t.prazo && t.prazo < h],
    ["Próximos dias", (t) => !t.feita && t.prazo > h],
    ["Sem prazo", (t) => !t.feita && !t.prazo],
    ["Concluídas", (t) => t.feita],
  ];
  const L = $("#lista-tarefas");
  if (L)
    L.innerHTML = vis.length
      ? G.map(([n, f]) => {
          const x = vis.filter(f);
          return x.length
            ? `<section class="grupo" aria-label="${n}"><h4>${n} (${x.length})</h4><ul class="tarefas">${x.map((t) => item(t, t === sel)).join("")}</ul></section>`
            : "";
        }).join("")
      : '<p class="mudo">Nenhuma tarefa por aqui. Use “Nova tarefa” para começar.</p>';
  const D = $("#detalhe");
  if (D)
    D.innerHTML = sel
      ? detalhe(sel)
      : '<p class="mudo">Crie uma tarefa para ver os detalhes.</p>';
  const R = $("#lembretes");
  if (R) {
    const x = T.filter((t) => !t.feita && t.prazo)
      .sort((a, b) => (a.prazo > b.prazo ? 1 : -1))
      .slice(0, 3);
    R.innerHTML = x.length
      ? x
          .map(
            (t) =>
              `<li class="lembrete"><span class="icone-box">${ic("zap")}</span><div><b class="neg">${esc(t.titulo)}</b><span class="leg">Aviso no WhatsApp, ${rot(t.prazo).toLowerCase()}</span></div></li>`,
          )
          .join("")
      : '<li class="mudo">Nenhum lembrete por enquanto.</li>';
  }
  const S = $("#stats");
  if (S)
    S.innerHTML = [
      ["lista", T.length, "Total de tarefas"],
      ["alvo", pend, "Pendentes"],
      ["check", c, "Concluídas"],
      [
        "calendario",
        "Hoje",
        new Date().toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      ],
    ]
      .map(
        ([i, v, t]) =>
          `<li class="stat"><span class="icone-box">${ic(i)}</span><div><b>${v}</b><span class="peq">${t}</span></div></li>`,
      )
      .join("");
  const P = $("#progresso");
  if (P) progresso(P, c, pend);
  const Sb = $("#sub");
  if (Sb)
    Sb.textContent = pend
      ? `Você tem ${pend} ${pend > 1 ? "tarefas pendentes" : "tarefa pendente"}.`
      : "Nenhuma tarefa pendente.";
  calendario();
}
const salvaT = () => {
  grava("tarefas", T);
  const d = document.activeElement.dataset || {},
    s = d.a
      ? `[data-a="${d.a}"][data-id="${d.id}"]` +
        (d.n != null ? `[data-n="${d.n}"]` : "")
      : "";
  render();
  if (s) $(s)?.focus();
};

const DLG = `<dialog id="dlg" aria-labelledby="dlg-t"><form id="f-tarefa"><h2 id="dlg-t">Nova tarefa</h2><div class="campo"><label for="t-nome">Nome da tarefa</label><input id="t-nome" name="titulo" required maxlength="80"></div><div class="campo"><label for="t-prio">Prioridade</label><select id="t-prio" name="prioridade"><option value="baixa">Baixa</option><option value="media" selected>Média</option><option value="alta">Alta</option></select></div><div class="campo campo-data"><label for="t-prazo-btn">Prazo de entrega</label><input id="t-prazo" name="prazo" type="hidden"><button id="t-prazo-btn" class="data-trigger" type="button" aria-expanded="false" aria-controls="seletor-data"><span id="t-prazo-label">Selecione uma data</span>${ic("calendario", 18)}</button><div id="seletor-data" class="seletor-data" hidden><div class="data-nav"><button type="button" data-data-mes="-1" aria-label="Mês anterior">${ic("esq", 18)}</button><strong id="data-mes-titulo"></strong><button type="button" data-data-mes="1" aria-label="Próximo mês">${ic("dir", 18)}</button></div><div class="data-semana" aria-hidden="true">${["D", "S", "T", "Q", "Q", "S", "S"].map((x) => `<span>${x}</span>`).join("")}</div><div id="data-dias" class="data-dias"></div><div class="data-rodape"><button type="button" id="data-sem-prazo">Remover prazo</button><button type="button" id="data-hoje">Hoje</button></div></div></div><p class="erro" id="erro-tarefa" role="alert"></p><div class="cf-acoes"><button class="btn primario" type="submit">Salvar tarefa</button><button class="btn" type="button" id="cancela">Cancelar</button></div></form></dialog><div id="snack" class="snackbar" role="status" aria-live="polite" hidden><span id="snack-txt"></span><button type="button" class="snack-btn" id="snack-undo">Desfazer</button><i class="snack-barra" aria-hidden="true"></i></div>`;
let snack = { t: null, fim: 0, resto: 6000, desf: null };
const inicia = () => {
  snack.fim = Date.now() + snack.resto;
  clearTimeout(snack.t);
  snack.t = setTimeout(fechaAviso, snack.resto);
};
const pausa = () => {
  if ($("#snack").hidden) return;
  clearTimeout(snack.t);
  snack.resto = Math.max(0, snack.fim - Date.now());
  $("#snack").classList.add("pausa");
};
const retoma = () => {
  const s = $("#snack");
  if (s.hidden || !s.classList.contains("pausa")) return;
  s.classList.remove("pausa");
  inicia();
};
function fechaAviso() {
  clearTimeout(snack.t);
  const s = $("#snack");
  if (s) s.hidden = true;
  snack.desf = null;
}
function mostraAviso(txt, fn) {
  const s = $("#snack");
  fechaAviso();
  $("#snack-txt").textContent = txt;
  snack.desf = fn;
  snack.resto = 6000;
  s.classList.remove("pausa");
  s.hidden = false;
  inicia();
}
function excluirTarefa(id) {
  const i = T.findIndex((x) => x.id === id);
  if (i < 0) return;
  const t = T[i],
    eraSel = selId === id;
  T.splice(i, 1);
  if (eraSel) selId = null;
  salvaT();
  mostraAviso(`Tarefa “${t.titulo}” excluída.`, () => {
    T.splice(Math.min(i, T.length), 0, t);
    if (eraSel) selId = t.id;
    salvaT();
    $(`[data-a="sel"][data-id="${t.id}"]`)?.focus();
  });
}
let mesSeletor = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
function atualizaData() {
  const v = $("#t-prazo").value;
  $("#t-prazo-label").textContent = v
    ? new Date(v + "T12:00:00").toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Selecione uma data";
  const b = $("#t-prazo-btn");
  b.setAttribute("aria-expanded", String(!$("#seletor-data").hidden));
  const a = mesSeletor.getFullYear(),
    m = mesSeletor.getMonth(),
    hoje = iso(new Date()),
    n = new Date(a, m + 1, 0).getDate(),
    inicio = new Date(a, m, 1).getDay();
  $("#data-mes-titulo").textContent = `${cap(MES[m])} ${a}`;
  $("#data-dias").innerHTML =
    Array.from(
      { length: inicio },
      () => '<span class="data-vazio"></span>',
    ).join("") +
    Array.from({ length: n }, (_, i) => {
      const d = i + 1,
        s = `${a}-${p2(m + 1)}-${p2(d)}`,
        passou = s < hoje;
      return `<button type="button" class="data-dia${s === hoje ? " hoje" : ""}${s === v ? " selecionado" : ""}" data-data-valor="${s}" ${passou ? "disabled" : ""} aria-pressed="${s === v}">${d}</button>`;
    }).join("");
  const prev = new Date(a, m - 1, 1),
    min = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  $('[data-data-mes="-1"]').disabled = prev < min;
}
function abreSeletor() {
  const pop = $("#seletor-data");
  pop.hidden = !pop.hidden;
  $("#t-prazo-btn").setAttribute("aria-expanded", String(!pop.hidden));
  if (!pop.hidden) {
    const v = $("#t-prazo").value;
    mesSeletor = v
      ? new Date(v + "T12:00:00")
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    atualizaData();
  }
}
function abre(t) {
  const f = $("#f-tarefa");
  f.reset();
  f.dataset.id = t ? t.id : "";
  $("#erro-tarefa").textContent = "";
  $("#dlg-t").textContent = t ? "Editar tarefa" : "Nova tarefa";
  $("#seletor-data").hidden = true;
  if (t) {
    f.titulo.value = t.titulo;
    f.prioridade.value = t.prioridade;
    f.prazo.value = t.prazo;
  }
  atualizaData();
  $("#dlg").showModal();
}

function casca() {
  const L = [
    ["home", "Início", "casa"],
    ["tarefas", "Minhas tarefas", "lista"],
    ["calendario", "Calendário", "calendario"],
    ["configuracoes", "Configurações", "config"],
  ];
  $("#lateral").innerHTML =
    `<a class="logo" href="home.html" aria-label="Prioriza Aí, ir para o Home"><span class="logo-i">${ic("calendario", 22)}</span><span>PRIORIZA <b>AÍ</b></span></a><nav aria-label="Menu principal"><ul class="menu-lat">${L.map(([p, n, i]) => `<li><a class="nav-item" href="${p}.html"${p === pagina ? ' aria-current="page"' : ""}>${ic(i)}${n}</a></li>`).join("")}</ul></nav>${U.plano === "foco" ? "" : `<section class="upgrade" aria-labelledby="up-t"><h2 id="up-t">Quer lembretes mais frequentes?</h2><p class="peq">No plano Foco, os avisos aumentam conforme a importância da tarefa e chegam também por e-mail.</p><a class="btn claro bloco" href="index.html#planos">Conhecer o Foco</a></section>`}<div class="usuario"><span class="avatar" aria-hidden="true">${esc(U.nome[0].toUpperCase())}</span><div class="u-nome"><b class="neg">${esc(U.nome)}</b><span class="leg">${PLANOS[U.plano].nome}</span></div><button class="icone-btn" id="sair" aria-label="Sair da conta">${ic("sair")}</button></div>`;
  $("#topo").innerHTML =
    `<form class="busca" role="search"><label class="so-leitor" for="busca">Buscar tarefas</label>${ic("busca", 18)}<input id="busca" type="search" placeholder="Buscar tarefas..." value="${esc(q)}"></form><div class="topo-acoes"><a class="sino" href="home.html#lembretes" aria-label="Ver lembretes">${ic("sino")}</a><a class="sino" href="configuracoes.html" aria-label="Minha conta">${ic("usuario")}</a></div>`;
  $("#sair").onclick = sair;
  $(".busca").onsubmit = (e) => {
    e.preventDefault();
    if (pagina !== "tarefas")
      location.href = "tarefas.html?q=" + encodeURIComponent($("#busca").value);
  };
  $("#busca").oninput = (e) => {
    if (pagina === "tarefas") {
      q = e.target.value;
      render();
    }
  };
  const o = $("#ola");
  if (o) o.textContent = "Olá, " + U.nome.split(" ")[0] + "!";
}

const planos = () => {
  const lg = logado() && U;
  $("#lista-planos").innerHTML = Object.entries(PLANOS)
    .map(([k, p]) => {
      const at = lg && U.plano === k,
        bt = lg
          ? `<button class="btn ${at ? "primario" : "contorno"} bloco" data-plano="${k}"${at ? ' aria-current="true"' : ""}>${at ? "Plano atual" : "Mudar para " + p.nome.replace("Plano ", "")}</button>`
          : `<a class="btn ${p.dest ? "primario" : "contorno"} bloco" href="registrar.html?plano=${k}">${p.cta}</a>`;
      return `<li class="plano${p.dest ? " destaque" : ""}"><article><div class="plano-topo"><h3>${p.nome}</h3>${p.dest ? '<span class="tag leve">Mais completo</span>' : ""}</div><p class="peq">${p.desc}</p><p class="preco"><span class="neg">R$</span><span class="valor">${p.preco}</span><span class="peq">/mês</span></p>${bt}<hr><p class="neg">${p.titulo}</p><ul class="recursos">${p.itens.map((i) => `<li class="recurso">${ic("check", 14)}${i}</li>`).join("")}</ul><p class="nota leg">${p.nota}</p></article></li>`;
    })
    .join("");
};

document.addEventListener("click", (e) => {
  const pb = e.target.closest("[data-plano]");
  if (pb) {
    const k = pb.dataset.plano;
    if (U.plano !== k) {
      U.plano = k;
      grava("usuario", U);
      planos();
      $(`[data-plano="${k}"]`).focus();
    }
    return;
  }
  if (e.target.closest("#snack-undo")) {
    const f = snack.desf;
    fechaAviso();
    if (f) f();
    return;
  }
  if (e.target.id === "cancela") return $("#dlg").close();
  if (e.target.closest("#t-prazo-btn")) return abreSeletor();
  if (e.target.id === "data-sem-prazo") {
    $("#t-prazo").value = "";
    $("#seletor-data").hidden = true;
    atualizaData();
    return;
  }
  if (e.target.id === "data-hoje") {
    $("#t-prazo").value = iso(new Date());
    $("#seletor-data").hidden = true;
    atualizaData();
    return;
  }
  const dia = e.target.closest("[data-data-valor]");
  if (dia) {
    $("#t-prazo").value = dia.dataset.dataValor;
    $("#seletor-data").hidden = true;
    atualizaData();
    return;
  }
  const navData = e.target.closest("[data-data-mes]");
  if (navData) {
    mesSeletor.setMonth(
      mesSeletor.getMonth() + Number(navData.dataset.dataMes),
    );
    atualizaData();
    return;
  }
  const b = e.target.closest("[data-a]");
  if (!b) return;
  const a = b.dataset.a,
    id = b.dataset.id;
  if (a === "sel") {
    selId = id;
    render();
  } else if (a === "nova") abre();
  else if (a === "editar") abre(T.find((t) => t.id === id));
  else if (a === "excluir") excluirTarefa(id);
  else if (a === "mes") {
    mes.setMonth(mes.getMonth() + +b.dataset.d);
    calendario();
  } else if (a === "filtro") {
    filtro = b.dataset.f;
    $$("[data-f]").forEach((c) => c.setAttribute("aria-pressed", c === b));
    render();
  }
});
document.addEventListener("change", (e) => {
  const c = e.target,
    a = c.dataset.a,
    t = T.find((x) => x.id === c.dataset.id);
  if (!t || !["concluir", "sub"].includes(a)) return;
  if (a === "concluir") {
    t.feita = c.checked;
    if (c.checked) t.subs.forEach((s) => (s.f = true));
  } else {
    t.subs[c.dataset.n].f = c.checked;
    t.feita = t.subs.every((s) => s.f);
  }
  salvaT();
});
document.addEventListener("submit", (e) => {
  const f = e.target;
  if (f.id === "f-tarefa") {
    e.preventDefault();
    const t = T.find((x) => x.id === f.dataset.id);
    if (!t && U.plano === "free" && T.filter((x) => !x.feita).length >= 5) {
      $("#erro-tarefa").textContent =
        "No plano Free você pode ter até 5 tarefas pendentes. Conclua uma ou mude de plano.";
      return;
    }
    const d = {
      titulo: f.titulo.value.trim(),
      prioridade: f.prioridade.value,
      prazo: f.prazo.value,
    };
    if (t) Object.assign(t, d);
    else {
      const n = { id: String(Date.now()), ...d, feita: false, subs: [] };
      T.push(n);
      selId = n.id;
    }
    $("#dlg").close();
    salvaT();
  }
  if (f.classList.contains("add-sub")) {
    e.preventDefault();
    const t = T.find((x) => x.id === f.dataset.id),
      v = f.querySelector("input").value.trim();
    if (U.plano === "free") {
      $("#aviso").textContent =
        "Subtarefas fazem parte do plano Essencial. Veja os planos na página inicial.";
      return;
    }
    if (v) {
      t.subs.push({ t: v, f: false });
      t.feita = false;
      salvaT();
      $("#ns")?.focus();
    }
  }
});

$$("[data-ic]").forEach(
  (e) => (e.innerHTML = ic(e.dataset.ic, +e.dataset.t || 20)),
);
$$("[data-ver]").forEach(
  (b) =>
    (b.onclick = () => {
      const i = $("#" + b.dataset.ver),
        m = i.type === "password";
      i.type = m ? "text" : "password";
      b.setAttribute("aria-pressed", m);
      b.setAttribute("aria-label", m ? "Ocultar senha" : "Mostrar senha");
    }),
);
if (!publica && U) {
  casca();
  if (["home", "tarefas"].includes(pagina))
    document.body.insertAdjacentHTML("beforeend", DLG);
  render();
  const sn = $("#snack");
  if (sn) {
    sn.addEventListener("mouseenter", pausa);
    sn.addEventListener("mouseleave", retoma);
    sn.addEventListener("focusin", pausa);
    sn.addEventListener("focusout", retoma);
  }
}

if (pagina === "index") {
  planos();
  if (logado() && U) {
    $("#acoes-topo").innerHTML =
      '<a class="btn primario" href="home.html">Ir para o Home</a>';
    $$(".vai-registrar").forEach((a) => (a.href = "home.html"));
  }
}
if (pagina === "entrar")
  $("#f-entrar").onsubmit = (e) => {
    e.preventDefault();
    const v = $("#e-mail").value.trim().toLowerCase(),
      er = $("#erro");
    if (
      U &&
      (v === U.email || v === U.nome.toLowerCase()) &&
      $("#e-senha").value === U.senha
    )
      entra($("#manter").checked);
    else
      er.textContent = U
        ? "E-mail ou senha incorretos."
        : "Nenhuma conta salva neste navegador. Clique em Registrar para criar a sua.";
  };
if (pagina === "entrar")
  $("#esqueci").onclick = () =>
    ($("#erro").textContent =
      "Simulação: a senha fica salva só neste navegador. Se não lembrar, crie uma nova conta em Registrar.");
if (pagina === "registrar")
  $("#f-registrar").onsubmit = (e) => {
    e.preventDefault();
    const f = e.target,
      er = $("#erro"),
      pl = new URLSearchParams(location.search).get("plano");
    if (f.senha.value.length < 8)
      return (er.textContent = "A senha precisa ter pelo menos 8 caracteres.");
    if (!f.termos.checked)
      return (er.textContent = "Aceite os termos de uso para continuar.");
    if (
      U &&
      !confirm(
        "Já existe uma conta salva neste navegador. Criar outra substitui a conta e as tarefas atuais. Continuar?",
      )
    )
      return;
    U = {
      nome: f.nome.value.trim(),
      email: f.email.value.trim().toLowerCase(),
      zap: f.zap.value.trim(),
      senha: f.senha.value,
      plano: PLANOS[pl] ? pl : "free",
    };
    grava("usuario", U);
    grava("tarefas", []);
    entra(true);
  };
if (pagina === "configuracoes" && U) {
  const f = $("#conta"),
    ok = $("#ok"),
    p = PLANOS[U.plano],
    enche = () => {
      f.nome.value = U.nome;
      f.email.value = U.email;
      f.zap.value = U.zap;
    };
  enche();
  f.onsubmit = (e) => {
    e.preventDefault();
    Object.assign(U, {
      nome: f.nome.value.trim(),
      email: f.email.value.trim().toLowerCase(),
      zap: f.zap.value.trim(),
    });
    grava("usuario", U);
    casca();
    ok.textContent = "Alterações salvas";
    setTimeout(() => (ok.textContent = ""), 3000);
  };
  f.onreset = (e) => {
    e.preventDefault();
    enche();
    ok.textContent = "";
  };
  $("#plano-card").innerHTML =
    `<div class="cab"><span class="icone-box">${ic("grafico")}</span><div><p class="leg" style="color:#fff">Seu plano</p><h2>${p.nome}</h2></div></div><p class="cab"><span class="valor" style="color:#fff">R$ ${p.preco}</span><span>/mês</span></p><p class="peq">${p.nota}</p><a class="btn claro bloco" href="index.html#planos">Ver planos</a>`;
}
