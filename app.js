/* ---------- STORAGE SHIM (localStorage, works fully offline as standalone PWA) ---------- */
window.storage = {
  async get(key){
    const raw = localStorage.getItem(key);
    if(raw === null) return null;
    return {key, value: raw, shared:false};
  },
  async set(key, value){
    localStorage.setItem(key, value);
    return {key, value, shared:false};
  },
  async delete(key){
    localStorage.removeItem(key);
    return {key, deleted:true, shared:false};
  },
  async list(prefix){
    const keys = Object.keys(localStorage).filter(k => !prefix || k.startsWith(prefix));
    return {keys, prefix, shared:false};
  }
};

/* ---------- DATA ---------- */
const DAYS = {
  a: {
    label: "Dzień A — Push",
    warmup: [
      {id:"a-w1", name:"Chin tuck + rotacja szyi", sets:"3 × 10", badge:"head", note:"Stój przy ścianie (plecy i tyłogłowie dotykają ściany). Wciągaj brodę do środka — jakbyś robił „podwójny podbródek”. Trzymaj 3 sek. Następnie powoli obróć głowę w lewo i prawo."},
      {id:"a-w2", name:"Band pull-apart", sets:"2 × 15", badge:"posture", note:"Elastyczna taśma przed sobą, ręce na szerokość barków. Rozciągaj taśmę poziomo, łopatki ściągaj do siebie. Łokcie proste."}
    ],
    main: [
      {id:"a-m1", name:"Wyciskanie hantli na ławce skośnej (30°)", sets:"4 × 8–10", badge:"mass", note:"Ławka pod kątem 30° zamiast poziomej — mniejsze obciążenie rotatorów, lepsza pozycja dla postawy. Łopatki cofnięte i ściśnięte przez cały ruch."},
      {id:"a-m2", name:"Wyciskanie żołnierskie hantlami (siedząc)", sets:"3 × 10–12", badge:"mass", note:"Siedząc na ławce z oparciem. Neutralny chwyt (kciuki do wewnątrz) łagodniejszy dla barków. Nie wygina mocno lędźwi — napnij brzuch."},
      {id:"a-m3", name:"Rozpiętki hantlami (na ławce poziomej)", sets:"3 × 12", badge:"mass", note:"Szerokie rozpiętki rozciągają klatkę — po ćwiczeniu obowiązkowo stretching klatki. Kontrolowany ruch w dół."},
      {id:"a-m4", name:"Face pulls na wyciągu", sets:"4 × 15", badge:"posture", note:"Lina na wysokości twarzy. Ciągnij do czoła, łokcie wysoko — palce wskazujące skierowane w sufit na końcu ruchu. Kluczowe ćwiczenie korekcyjne dla barków i kyfozy. Nie zaniedbuj!"},
      {id:"a-m5", name:"Prostowanie ramion na wyciągu (triceps)", sets:"3 × 12", badge:"mass", note:"Stój prosto, łokcie blisko ciała. Opcja: uchwyt linowy — kciuki na zewnątrz w końcowej pozycji."}
    ],
    stretch: [
      {id:"a-s1", name:"Rozciąganie klatki piersiowej przy framudze", sets:"3 × 30 sek", badge:"posture", note:"Ręka oparta o framugę pod kątem 90°. Obróć tułów od ręki. Czujesz rozciąganie w klatce i przednim barku."},
      {id:"a-s2", name:"Rozciąganie mięśni szyi (boczne)", sets:"2 × 30 sek", badge:"head", note:"Usiądź, jedną ręką chwyć siedzisko (dla trakcji). Drugą ręką delikatnie pochyl głowę w bok. Czujesz rozciąganie po bocznej stronie szyi."}
    ]
  },
  b: {
    label: "Dzień B — Nogi + Core",
    warmup: [
      {id:"b-w1", name:"Dead bug (aktywacja core)", sets:"3 × 8 strony", badge:"apt", note:"Leżysz na plecach. Kolana zgięte do 90° w górze. Jednocześnie opuszczaj prawą nogę i lewe ramię — NIE odrywaj lędźwi od podłogi. Kluczowe ćwiczenie na APT."},
      {id:"b-w2", name:"Glute bridge (aktywacja pośladków)", sets:"2 × 15", badge:"apt", note:"Leżysz na plecach, stopy płasko. Unieś biodra — ściśnij pośladki mocno na górze. Trzymaj 2 sekundy. Aktywuje pośladki przed przysiadem."}
    ],
    main: [
      {id:"b-m1", name:"Przysiad ze sztangą (lub goblet squat)", sets:"4 × 8–10", badge:"mass", note:"Jeśli APT jest silna — zacznij od goblet squat (hantel przy klatce). Plecy proste, kolana nad palcami, głowa neutralna. Nie wypychaj lędźwi w przodzie."},
      {id:"b-m2", name:"Hip thrust ze sztangą", sets:"4 × 10–12", badge:"apt", note:"Ławka pod łopatkami. Sztanga na biodrach (z gąbką). Unieś biodra do pozycji poziomej — ściskaj pośladki! Najważniejsze ćwiczenie na APT."},
      {id:"b-m3", name:"Martwy ciąg rumuński (RDL)", sets:"3 × 10", badge:"mass", note:"Nogi prawie proste, biodra cofaj do tyłu, plecy idealnie proste. Czujesz rozciąganie ud z tyłu. Wzmacnia pośladki i uda tylne — przeciwdziała APT."},
      {id:"b-m4", name:"Bułgarski split squat (hantle)", sets:"3 × 10 / noga", badge:"run", note:"Tylna stopa na ławce, tułów lekko pochylony. Praca jednonóż — kluczowa dla biegaczki: buduje stabilizację biodra i kolana, wyrównuje dysproporcje między nogami. Zastępuje leg curl (uda tylne pokrywa RDL)."},
      {id:"b-m4b", name:"Wspięcia na palce stojąc + tibialis raise", sets:"4 × 12–15 / 3 × 15", badge:"run", note:"Wspięcia: pełny zakres, 2 sek pauzy na dole (rozciągnięcie) i na górze. Tibialis raise: oprzyj się plecami o ścianę, unoś palce stóp do góry. Profilaktyka shin splints i achillesa — obowiązkowa przy rosnącym kilometrażu."},
      {id:"b-m5", name:"Plank (deska)", sets:"3 × 40–60 sek", badge:"core", note:"Postawa neutralna — NIE uginaj lędźwi (częsty błąd u APT). Zaciśnij brzuch jakbyś spodziewał się ciosu. Miednica równo."},
      {id:"b-m6", name:"Side plank (boczna deska)", sets:"3 × 30 sek / strona", badge:"core", note:"Wzmacnia mięsień poprzeczny brzucha i skośne — kluczowe dla stabilizacji miednicy. Biodra nie opadają."}
    ],
    stretch: [
      {id:"b-s1", name:"Rozciąganie zginaczy biodra (pozycja rycerza)", sets:"3 × 45 sek / noga", badge:"apt", note:"Klęk jednonóż. Pchnij biodra do przodu — nie wyginaj lędźwi! Czujesz rozciąganie z przodu biodra cofniętej nogi. Wykonuj też po każdym biegu."},
      {id:"b-s2", name:"Rozciąganie mięśnia gruszkowatego (pigeon pose)", sets:"2 × 45 sek / strona", badge:"apt", note:"Leżysz na plecach. Przekreśl kostkę nad kolanem drugiej nogi. Delikatnie przyciągnij obie nogi do klatki. Czujesz w pośladku."}
    ]
  },
  c: {
    label: "Dzień C — Pull",
    warmup: [
      {id:"c-w1", name:"Chin tuck przy ścianie", sets:"3 × 10", badge:"head", note:"Tak samo jak w Dniu A. Codzienne powtarzanie buduje nawyk neutralnej pozycji szyi."},
      {id:"c-w2", name:"Cat-cow (mobilizacja kręgosłupa)", sets:"2 × 10", badge:"posture", note:"Na czworaka. Wolno zaokrąglaj i wyginaj plecy. 10 powolnych powtórzeń. Przygotowuje kręgosłup do obciążeń."}
    ],
    main: [
      {id:"c-m1", name:"Podciąganie (lub lat pulldown)", sets:"4 × 6–10", badge:"mass", note:"Chwyt nieco szerszy niż barki. Łopatki cofnij zanim zaczniesz ciągnąć. Jeśli podciągania są trudne — lat pulldown z pełnym zakresem ruchu."},
      {id:"c-m2", name:"Wiosłowanie hantlem jednoręcz", sets:"4 × 10 / strona", badge:"posture", note:"Kolano i ręka oparte na ławce. Hantel ciągnij wzdłuż ciała, łokieć blisko tułowia. Łopatka ściąga się do środka. Kluczowe dla korekcji kyfozy."},
      {id:"c-m3", name:"Wiosłowanie na wyciągu siedzące (seated cable row)", sets:"3 × 12", badge:"mass", note:"Tułów pionowo (nie kołysz!). Ciągnij do brzucha, łopatki cofaj. Na końcu ruchu — klatka do przodu, barki z tyłu."},
      {id:"c-m4", name:"Face pulls na wyciągu", sets:"4 × 15", badge:"posture", note:"Face pulls wykonujesz 2× w tygodniu — tylny bark i środkowy trapez są chronicznie słabe u gapiących się w ekran."},
      {id:"c-m5", name:"Odwrotne rozpiętki na maszynie (rear delt)", sets:"3 × 15", badge:"posture", note:"Maszyna do motyla — odwrotnie. Lub hantlami w opadzie tułowia. Izoluje tylny bark — ważne dla cofnięcia barków z przodu."},
      {id:"c-m6", name:"Uginanie hantli na biceps (hammer curl)", sets:"3 × 12", badge:"mass", note:"Neutralny chwyt (kciuk do góry). Łokcie przy ciele, kontrolowany ruch w dół."}
    ],
    stretch: [
      {id:"c-s1", name:"Rozciąganie klatki + otwieranie klatki nad wałkiem", sets:"2 min", badge:"posture", note:"Wałek poziomo pod łopatkami. Ręce za głową. Rozluźnij i pozwól klatce opaść w tył. Przesuń wałek od środka łopatek do piersiowego."},
      {id:"c-s2", name:"Rozciąganie karku (podpotyliczne)", sets:"2 × 30 sek", badge:"head", note:"Splot rąk za głową. Delikatnie pochyl głowę do przodu (bródka do klatki), ręce tylko asekurują — nie ciągnij siłą."}
    ]
  }
};

const CORRECTIVE = [
  {id:"cor1", name:"Chin tuck", sets:"20 powt.", badge:"head", note:"Przy ścianie lub siedząc. Wciągnij brodę — trzymaj 5 sek. Wzmacnia głębokie zginacze szyi, cofa głowę nad ramiona. Efekty po 4–6 tygodniach regularności."},
  {id:"cor2", name:"Glute bridge", sets:"2 × 15", badge:"apt", note:"Kluczowe zwłaszcza po biegu. Aktywuje pośladki, „wyłącza” nadaktywne zginacze biodra. Ściskaj pośladki 3 sek na górze."},
  {id:"cor3", name:"Stretching zginaczy biodra", sets:"2 × 45 sek", badge:"apt", note:"Pozycja rycerza. Niezbędna po każdym biegu — bieganie mocno skraca zginacze, co pogłębia APT."},
  {id:"cor4", name:"Rozciąganie klatki", sets:"2 × 30 sek / stronę", badge:"posture", note:"Przy framudze lub na foam rollerze. Przykurczona klatka ciągnie barki do przodu — bez jej rozciągania trening grzbietu przyniesie połowę efektu."}
];

const BADGE_LABEL = {posture:"plecy", apt:"miednica", head:"głowa", core:"core", mass:"masa", run:"bieganie"};

// weekday index from getDay(): 0=Nd,1=Pon,2=Wt,3=Śr,4=Czw,5=Pt,6=Sob
const SCHEDULE = {
  1: {type:"gym", key:"b", label:"Dzień B — Nogi + Core"},
  2: {type:"run", key:"interval", label:"Bieg — interwały / tempo"},
  3: {type:"gym", key:"a", label:"Dzień A — Push"},
  4: {type:"run", key:"easy", label:"Bieg — spokojny (jeśli w planie Runna)"},
  5: {type:"gym", key:"c", label:"Dzień C — Pull"},
  6: {type:"run", key:"long", label:"Bieg — długi dystans"},
  0: {type:"rest", label:"Odpoczynek"}
};
const DAY_SHORT = ["Nd","Pon","Wt","Śr","Czw","Pt","Sob"];

/* ---------- STATE ---------- */
let STATE = {sessions:{}};
let STORAGE_OK = true;

function isoDate(d){ return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
function todayISO(){ return isoDate(new Date()); }

async function loadState(){
  try{
    const res = await window.storage.get('training-log', false);
    if(res && res.value){ STATE = JSON.parse(res.value); }
  }catch(e){
    STATE = {sessions:{}};
  }
  if(!STATE.sessions) STATE.sessions = {};
  if(!STATE.overrides) STATE.overrides = {};
}
let saveTimer=null;
function saveState(){
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async ()=>{
    try{
      await window.storage.set('training-log', JSON.stringify(STATE), false);
      STORAGE_OK = true;
    }catch(e){ STORAGE_OK = false; }
  }, 250);
}

function getSession(dateISO){
  if(!STATE.sessions[dateISO]){
    STATE.sessions[dateISO] = {exercises:{}, corrective:{}, runs:[]};
  }
  const s = STATE.sessions[dateISO];
  if(!s.exercises) s.exercises = {};
  if(!s.corrective) s.corrective = {};
  if(!s.runs) s.runs = [];
  return s;
}

/* ---------- ZAMIANA DNI ---------- */
function effectiveSched(dateISO, wd){
  const ov = (STATE.overrides||{})[dateISO];
  if(ov){
    if(DAYS[ov]) return {type:'gym', key:ov, label:DAYS[ov].label, overridden:true};
    if(ov==='run') return {type:'run', key:'any', label:'Bieg', overridden:true};
    if(ov==='rest') return {type:'rest', label:'Odpoczynek', overridden:true};
  }
  return SCHEDULE[wd];
}
function setOverride(val){
  if(!STATE.overrides) STATE.overrides = {};
  const iso = (typeof VIEW_DATE !== 'undefined') ? VIEW_DATE : todayISO();
  if(val === 'plan'){ delete STATE.overrides[iso]; }
  else { STATE.overrides[iso] = val; }
  saveState();
  renderAll();
}

/* ---------- RENDER: exercise cards ---------- */
function exCardHTML(ex, dateISO, kind){
  const s = getSession(dateISO);
  const store = kind === 'corrective' ? s.corrective : s.exercises;
  const entry = store[ex.id] || {done:false, weight:""};
  const doneClass = entry.done ? "done" : "";
  const struckClass = entry.done ? "struck" : "";
  const showLog = entry.done ? "show" : "";
  return `
  <div class="ex-card" data-exid="${ex.id}" data-kind="${kind}" data-date="${dateISO}">
    <div class="ex-top">
      <div class="checkbox ${doneClass}" onclick="toggleEx('${ex.id}','${kind}','${dateISO}')">
        <svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="ex-body">
        <div class="ex-header">
          <span class="ex-name ${struckClass}">${ex.name}</span>
          <span class="ex-sets">${ex.sets}</span>
        </div>
        <span class="badge b-${ex.badge}">${BADGE_LABEL[ex.badge]}</span>
        <div class="ex-note">${ex.note}</div>
        <div class="ex-log ${showLog}">
          <input type="text" placeholder="ciężar / notatka (np. 20kg × 10)" value="${entry.weight ? entry.weight.replace(/"/g,'&quot;') : ''}" oninput="updateWeight('${ex.id}','${kind}','${dateISO}', this.value)">
        </div>
      </div>
    </div>
  </div>`;
}

function toggleEx(id, kind, dateISO){
  const s = getSession(dateISO);
  const store = kind === 'corrective' ? s.corrective : s.exercises;
  const entry = store[id] || {done:false, weight:""};
  entry.done = !entry.done;
  store[id] = entry;
  saveState();
  renderAll();
}
function updateWeight(id, kind, dateISO, val){
  const s = getSession(dateISO);
  const store = kind === 'corrective' ? s.corrective : s.exercises;
  const entry = store[id] || {done:false, weight:""};
  entry.weight = val;
  store[id] = entry;
  saveState();
}

/* ---------- RENDER: day panels ---------- */
function renderDayPanel(key){
  const d = DAYS[key];
  const dateISO = todayISO();
  document.getElementById(`list-${key}-warmup`).innerHTML = d.warmup.map(ex=>exCardHTML(ex,dateISO,'exercise')).join('');
  document.getElementById(`list-${key}-main`).innerHTML = d.main.map(ex=>exCardHTML(ex,dateISO,'exercise')).join('');
  document.getElementById(`list-${key}-stretch`).innerHTML = d.stretch.map(ex=>exCardHTML(ex,dateISO,'exercise')).join('');
  const corrEl = document.getElementById(`list-${key}-corrective`);
  if(corrEl) corrEl.innerHTML = CORRECTIVE.map(ex=>exCardHTML(ex,dateISO,'corrective')).join('');
}

function renderCorrective(){
  const dateISO = todayISO();
  document.getElementById('list-corrective').innerHTML = CORRECTIVE.map(ex=>exCardHTML(ex,dateISO,'corrective')).join('');
}

/* ---------- RENDER: dziś ---------- */
let VIEW_DATE = todayISO();
function shiftViewDate(delta){
  const d = new Date(VIEW_DATE + 'T12:00:00');
  d.setDate(d.getDate() + delta);
  const iso = isoDate(d);
  if(iso > todayISO()) return;
  VIEW_DATE = iso;
  renderAll();
}
function resetViewDate(){ VIEW_DATE = todayISO(); renderAll(); }

function renderDzis(){
  const isToday = VIEW_DATE === todayISO();
  const vd = new Date(VIEW_DATE + 'T12:00:00');
  const wd = vd.getDay();
  const dateISO = VIEW_DATE;
  const sched = effectiveSched(dateISO, wd);
  const ov = (STATE.overrides||{})[dateISO] || 'plan';
  let html = '';

  const navLbl = isToday ? 'Dziś' : vd.toLocaleDateString('pl-PL',{weekday:'long', day:'numeric', month:'short'});
  html += `<div class="date-nav">
    <button class="date-arrow" onclick="shiftViewDate(-1)">‹</button>
    <div class="date-nav-lbl">${navLbl.charAt(0).toUpperCase()+navLbl.slice(1)}${isToday ? '' : ' <button class="date-today-btn" onclick="resetViewDate()">wróć do dziś</button>'}</div>
    <button class="date-arrow" ${isToday ? 'disabled' : ''} onclick="shiftViewDate(1)">›</button>
  </div>`;
  if(!isToday){
    html += `<div class="info-card" style="margin-bottom:10px"><p>Przeglądasz wpis archiwalny — odhaczenia i ciężary zapiszą się pod tą datą.</p></div>`;
  }

  const planSched = SCHEDULE[wd];
  const planShort = planSched.type==='gym' ? ('Dzień '+planSched.key.toUpperCase()) : (planSched.type==='run' ? 'Bieg' : 'Odpoczynek');
  const chip = (val, lbl) => `<button class="swap-chip ${ov===val?'active':''}" onclick="setOverride('${val}')">${lbl}</button>`;
  html += `<div class="swap-row">
    <span class="swap-lbl">${isToday ? 'Dzisiejszy trening' : 'Trening tego dnia'}:</span>
    ${chip('plan','Wg planu ('+planShort+')')}
    ${chip('a','Dzień A')}
    ${chip('b','Dzień B')}
    ${chip('c','Dzień C')}
    ${chip('run','Bieg')}
    ${chip('rest','Odpoczynek')}
  </div>`;
  if(ov !== 'plan'){
    html += `<div class="info-card" style="margin-bottom:10px"><p>Zamiana dotyczy tylko tego dnia — reszta tygodnia zostaje wg planu. Pamiętaj, żeby oddać zamieniony dzień w innym terminie (np. dziś B zamiast A → w środę zrób A).</p></div>`;
  }

  if(sched.type === 'gym'){
    const d = DAYS[sched.key];
    html += `<div class="section-label">${isToday?"Dziś":"Ten dzień"}: ${d.label}</div>`;
    html += `<div class="section-label" style="margin-top:14px">Rozgrzewka</div>` + d.warmup.map(ex=>exCardHTML(ex,dateISO,'exercise')).join('');
    html += `<div class="section-label">Trening właściwy</div>` + d.main.map(ex=>exCardHTML(ex,dateISO,'exercise')).join('');
    html += `<div class="section-label">Stretching końcowy</div>` + d.stretch.map(ex=>exCardHTML(ex,dateISO,'exercise')).join('');
  } else if(sched.type === 'run'){
    html += `<div class="section-label">${isToday?"Dziś":"Ten dzień"}: ${sched.label}</div>`;
    html += `<div class="info-card">Przejdź do zakładki <b>Bieganie</b>, żeby zapisać dzisiejszy trening. Pamiętaj o stretchingu bioder + glute bridge po biegu.</div>`;
  } else {
    html += `<div class="section-label">${isToday?"Dziś":"Ten dzień"}: Odpoczynek</div>`;
    html += `<div class="info-card">Dzień bez treningu siłowego ani biegu. Ćwiczenia korekcyjne poniżej zostają — to jedyny element planu wykonywany codziennie.</div>`;
  }

  html += `<div class="section-label">Codzienne ćwiczenia korekcyjne</div>`;
  html += CORRECTIVE.map(ex=>exCardHTML(ex,dateISO,'corrective')).join('');

  document.getElementById('dzisContent').innerHTML = html;
}

/* ---------- RENDER: today chip ---------- */
function renderTodayChip(){
  const wd = new Date().getDay();
  const sched = effectiveSched(todayISO(), wd);
  const dot = document.getElementById('todayDot');
  const txt = document.getElementById('todayTxt');
  const colorMap = {gym:'var(--posture)', run:'var(--run)', rest:'var(--ink-soft)'};
  dot.style.background = colorMap[sched.type];
  const dateStr = new Date().toLocaleDateString('pl-PL', {weekday:'long', day:'numeric', month:'long'});
  txt.innerHTML = `<b>${sched.label}</b>${sched.overridden ? ' <span style="color:var(--ink-soft)">(zamienione)</span>' : ''} · ${dateStr}`;
}
function goToday(){ switchTab('dzis'); }

/* ---------- RENDER: schedule grid (info tab) ---------- */
function renderScheduleGrid(){
  const wd = new Date().getDay();
  let html = '';
  for(let i=1;i<=6;i++){
    const s = SCHEDULE[i];
    const cls = s.type === 'rest' ? 'rest' : s.type;
    const todayCls = i===wd ? 'today' : '';
    const shortLbl = s.type==='gym' ? ('Dzień '+s.key.toUpperCase()) : (s.type==='run' ? 'Bieg' : 'Odp.');
    html += `<div class="day-box ${cls} ${todayCls}">${DAY_SHORT[i]}<span class="lbl">${shortLbl}</span></div>`;
  }
  const s0 = SCHEDULE[0];
  const todayCls0 = wd===0 ? 'today' : '';
  html += `<div class="day-box rest ${todayCls0}">${DAY_SHORT[0]}<span class="lbl">Odp.</span></div>`;
  document.getElementById('scheduleGrid').innerHTML = html;
}

/* ---------- RUNNING ---------- */
function logRun(){
  const type = document.getElementById('runType').value;
  const distance = document.getElementById('runDistance').value.trim();
  const duration = document.getElementById('runDuration').value.trim();
  const note = document.getElementById('runNote').value.trim();
  if(!distance && !duration){
    alert('Podaj przynajmniej dystans lub czas.');
    return;
  }
  const dateInput = document.getElementById('runDate');
  let dateISO = (dateInput && dateInput.value) ? dateInput.value : todayISO();
  if(dateISO > todayISO()){
    alert('Nie można zapisać biegu z przyszłą datą.');
    return;
  }
  const s = getSession(dateISO);
  s.runs.push({type, distance, duration, note, ts: Date.now()});
  saveState();
  document.getElementById('runDistance').value='';
  document.getElementById('runDuration').value='';
  document.getElementById('runNote').value='';
  renderRunHistory();
  renderProgress();
}

function renderRunHistory(){
  const rows = [];
  const dates = Object.keys(STATE.sessions).sort().reverse();
  for(const date of dates){
    const s = STATE.sessions[date];
    if(s.runs && s.runs.length){
      for(const r of s.runs){
        rows.push({date, ...r});
      }
    }
  }
  const el = document.getElementById('runHistory');
  if(!rows.length){ el.innerHTML = '<div class="empty">Brak zapisanych biegów. Dodaj pierwszy powyżej.</div>'; return; }
  rows.sort((a,b)=> (b.ts||0)-(a.ts||0));
  el.innerHTML = rows.slice(0,20).map(r=>{
    const typeLabel = r.type==='interval' ? 'Interwały/tempo' : (r.type==='easy' ? 'Spokojny (easy)' : 'Długi dystans');
    const detail = [r.distance ? r.distance+' km' : null, r.duration || null].filter(Boolean).join(' · ');
    return `<div class="run-entry">
      <div class="re-dot"></div>
      <div class="re-body">
        <div class="re-date">${fmtDate(r.date)} · ${typeLabel}</div>
        <div class="re-detail">${detail || '—'}</div>
        ${r.note ? `<div class="re-note">${r.note}</div>` : ''}
      </div>
      <button class="re-del" onclick="deleteRun('${r.date}', ${r.ts||0})" aria-label="Usuń bieg">✕</button>
    </div>`;
  }).join('');
}

function deleteRun(date, ts){
  const s = STATE.sessions[date];
  if(!s || !s.runs) return;
  const idx = s.runs.findIndex(r => (r.ts||0) === ts);
  if(idx === -1) return;
  const r = s.runs[idx];
  if(!confirm('Usunąć bieg z ' + fmtDate(date) + (r.distance ? ' (' + r.distance + ' km)' : '') + '?')) return;
  s.runs.splice(idx, 1);
  saveState();
  renderAll();
}

function fmtDate(iso){
  const d = new Date(iso+'T00:00:00');
  return d.toLocaleDateString('pl-PL', {day:'numeric', month:'short'});
}

/* ---------- PROGRESS ---------- */
function dayHasGym(s){
  return s && s.exercises && Object.values(s.exercises).some(e=>e.done);
}
function dayHasCorrective(s){
  return s && s.corrective && Object.values(s.corrective).some(e=>e.done);
}
function dayHasRun(s){
  return s && s.runs && s.runs.length>0;
}
function dayActive(s){
  return dayHasGym(s) || dayHasCorrective(s) || dayHasRun(s);
}

function renderProgress(){
  // streak: consecutive days (from today backwards) with any activity
  let streak = 0;
  let d = new Date();
  while(true){
    const iso = isoDate(d);
    const s = STATE.sessions[iso];
    if(dayActive(s)){ streak++; d.setDate(d.getDate()-1); }
    else break;
  }
  document.getElementById('statStreak').textContent = streak;

  // this week (Mon-Sun) count of active days
  const now = new Date();
  const wd = now.getDay();
  const mondayOffset = wd===0 ? -6 : 1-wd;
  const monday = new Date(now); monday.setDate(now.getDate()+mondayOffset);
  let weekCount = 0;
  for(let i=0;i<7;i++){
    const dd = new Date(monday); dd.setDate(monday.getDate()+i);
    if(dd > now) continue;
    const iso = isoDate(dd);
    if(dayActive(STATE.sessions[iso])) weekCount++;
  }
  document.getElementById('statWeek').textContent = weekCount+'/7';

  // total runs
  let totalRuns = 0;
  Object.values(STATE.sessions).forEach(s=>{ if(s.runs) totalRuns += s.runs.length; });
  document.getElementById('statRuns').textContent = totalRuns;

  // dot grid: bieżący tydzień + 3 pełne wstecz, wyrównane do poniedziałku
  const cells = [];
  const today = new Date();
  const todayWd = today.getDay();
  const daysBack = 21 + ((todayWd+6)%7);
  const start = new Date(today); start.setDate(today.getDate()-daysBack);
  const totalCells = Math.ceil((daysBack+1)/7)*7;
  for(let i=0;i<totalCells;i++){
    const dd = new Date(start); dd.setDate(start.getDate()+i);
    if(dd > today){ cells.push(null); continue; }
    cells.push(isoDate(dd));
  }
  const grid = document.getElementById('dotgrid');
  grid.innerHTML = cells.map(iso=>{
    if(!iso) return '<div class="dotcell" style="opacity:0"></div>';
    const s = STATE.sessions[iso];
    const bands = [];
    if(dayHasGym(s)) bands.push('var(--posture)');
    if(dayHasRun(s)) bands.push('var(--run)');
    const corr = dayHasCorrective(s);
    // dzień odpoczynku = tylko korekcja, bez siłowni i biegu → wypełnij kolorem odpoczynku
    if(!bands.length && corr) bands.push('var(--rest)');
    let inner = '';
    if(bands.length) inner += `<div class="marks">${bands.map(c=>`<span class="mini" style="background:${c}"></span>`).join('')}</div>`;
    if(corr) inner += `<div class="corr-dot"></div>`;
    return `<div class="dotcell">${inner}</div>`;
  }).join('');

  // session log list
  const dates = Object.keys(STATE.sessions).filter(iso=>dayActive(STATE.sessions[iso])).sort().reverse().slice(0,10);
  const logEl = document.getElementById('sessionLog');
  if(!dates.length){ logEl.innerHTML = '<div class="empty">Brak wpisów. Zaznacz ćwiczenia w planie, żeby zaczęły się tu pojawiać.</div>'; return; }
  logEl.innerHTML = dates.map(iso=>{
    const s = STATE.sessions[iso];
    const exDone = Object.values(s.exercises||{}).filter(e=>e.done).length;
    const corDone = Object.values(s.corrective||{}).filter(e=>e.done).length;
    const runCount = (s.runs||[]).length;
    const parts = [];
    const pl = (n, one, few, many) => n===1 ? one : ((n%10>=2 && n%10<=4 && (n%100<12 || n%100>14)) ? few : many);
    if(exDone) parts.push(exDone+' '+pl(exDone,'ćw. siłowe','ćw. siłowe','ćw. siłowych'));
    if(corDone) parts.push(corDone+' '+pl(corDone,'ćw. korekcyjne','ćw. korekcyjne','ćw. korekcyjnych'));
    if(runCount) parts.push(runCount+' '+pl(runCount,'bieg','biegi','biegów'));
    return `<div class="run-entry">
      <div class="re-dot" style="background:var(--posture)"></div>
      <div class="re-body">
        <div class="re-date">${fmtDate(iso)}</div>
        <div class="re-detail">${parts.join(' · ') || '—'}</div>
      </div>
    </div>`;
  }).join('');
}

/* ---------- EKSPORT TYGODNIA ---------- */
function exNameMap(){
  const map = {};
  for(const key of Object.keys(DAYS)){
    const d = DAYS[key];
    [...d.warmup, ...d.main, ...d.stretch].forEach(ex => map[ex.id] = ex.name);
  }
  CORRECTIVE.forEach(ex => map[ex.id] = ex.name);
  return map;
}

function buildWeekExport(){
  const names = exNameMap();
  const now = new Date();
  const wd = now.getDay();
  const mondayOffset = wd===0 ? -6 : 1-wd;
  const monday = new Date(now); monday.setDate(now.getDate()+mondayOffset);
  const runTypeLabel = {interval:'interwały/tempo', easy:'spokojny (easy)', long:'długi dystans'};

  let lines = [];
  lines.push('PRZEGLĄD TYGODNIA — ' + monday.toLocaleDateString('pl-PL',{day:'numeric',month:'short'}) + ' do ' + now.toLocaleDateString('pl-PL',{day:'numeric',month:'short',year:'numeric'}));
  lines.push('');

  let totalKm = 0, runCount = 0, gymCount = 0, corrDays = 0, longest = 0;

  for(let i=0;i<7;i++){
    const dd = new Date(monday); dd.setDate(monday.getDate()+i);
    if(dd > now) break;
    const iso = isoDate(dd);
    const s = STATE.sessions[iso];
    if(!s || !dayActive(s)) continue;
    const dayName = dd.toLocaleDateString('pl-PL',{weekday:'long', day:'numeric', month:'short'});
    lines.push('— ' + dayName.charAt(0).toUpperCase() + dayName.slice(1) + ' —');

    const doneEx = Object.entries(s.exercises||{}).filter(([id,e])=>e.done);
    if(doneEx.length){
      gymCount++;
      const sched = effectiveSched(iso, dd.getDay());
      if(sched && sched.type==='gym') lines.push('Siłownia: ' + sched.label + (sched.overridden ? ' (zamiana)' : ''));
      for(const [id,e] of doneEx){
        const nm = names[id] || id;
        lines.push('  • ' + nm + (e.weight ? ' — ' + e.weight : ''));
      }
    }
    if(s.runs && s.runs.length){
      for(const r of s.runs){
        runCount++;
        const dist = parseFloat((r.distance||'').replace(',','.'));
        if(!isNaN(dist)){ totalKm += dist; if(dist>longest) longest = dist; }
        lines.push('Bieg (' + (runTypeLabel[r.type]||r.type) + '): ' + [r.distance?r.distance+' km':null, r.duration||null].filter(Boolean).join(', ') + (r.note ? ' — ' + r.note : ''));
      }
    }
    const corrDone = Object.values(s.corrective||{}).filter(e=>e.done).length;
    if(corrDone){ corrDays++; lines.push('Korekcja: ' + corrDone + ' ćw.'); }
    lines.push('');
  }

  lines.push('PODSUMOWANIE:');
  lines.push('Sesje siłowe: ' + gymCount + ' | Biegi: ' + runCount + ' | Kilometraż: ' + (Math.round(totalKm*10)/10) + ' km | Najdłuższy: ' + (Math.round(longest*10)/10) + ' km | Dni z korekcją: ' + corrDays + '/7');
  lines.push('');
  lines.push('Dane ze smart-wagi (uzupełnij lub wklej zrzut): waga ___ kg, tłuszcz ___ %, mięśnie ___ kg, trzewny ___');
  lines.push('Samopoczucie 1–5: sen ___, energia ___, bolesność ___, postura ___');
  return lines.join('\n');
}

async function exportWeek(){
  const text = buildWeekExport();
  const btn = document.getElementById('exportBtn');
  const ok = ()=>{ btn.textContent = 'Skopiowano ✓'; setTimeout(()=>{ btn.textContent = 'Eksport tygodnia 📋'; }, 2000); };
  try{
    await navigator.clipboard.writeText(text);
    ok();
    return;
  }catch(e){ /* fallback poniżej */ }
  try{
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.focus(); ta.select();
    const done = document.execCommand('copy');
    document.body.removeChild(ta);
    if(done){ ok(); return; }
  }catch(e){ /* fallback poniżej */ }
  if(navigator.share){
    try{ await navigator.share({text}); return; }catch(e){}
  }
  alert(text);
}

/* ---------- KOPIA ZAPASOWA ---------- */
function downloadBackup(){
  const payload = {
    app: 'plan-trening',
    format: 1,
    exportedAt: new Date().toISOString(),
    data: STATE
  };
  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = todayISO() + '-plan-trening-kopia.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url), 5000);
  const btn = document.getElementById('backupBtn');
  if(btn){ btn.textContent = 'Kopia pobrana ✓'; setTimeout(()=>{ btn.textContent = 'Pobierz kopię danych 💾'; }, 2000); }
}

function importBackup(input){
  const file = input.files && input.files[0];
  input.value = '';
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    let parsed;
    try{ parsed = JSON.parse(reader.result); }
    catch(e){ alert('To nie jest poprawny plik kopii (błąd odczytu JSON).'); return; }
    const data = (parsed && parsed.app === 'plan-trening' && parsed.data) ? parsed.data : parsed;
    if(!data || typeof data !== 'object' || typeof data.sessions !== 'object' || data.sessions === null){
      alert('To nie wygląda na kopię danych tej aplikacji — brak zapisanych sesji.');
      return;
    }
    const days = Object.keys(data.sessions).length;
    const when = (parsed && parsed.exportedAt) ? new Date(parsed.exportedAt).toLocaleDateString('pl-PL') : 'nieznana data';
    if(!confirm('Wczytać kopię z ' + when + ' (' + days + ' dni z wpisami)?\n\nUWAGA: obecne dane w aplikacji zostaną ZASTĄPIONE danymi z kopii.')) return;
    if(!data.overrides) data.overrides = {};
    STATE = data;
    saveState();
    renderAll();
    alert('Kopia wczytana — przywrócono ' + days + ' dni z wpisami.');
  };
  reader.onerror = () => alert('Nie udało się odczytać pliku.');
  reader.readAsText(file);
}

/* ---------- TABS ---------- */
function switchTab(name){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('panel-'+name).classList.add('active');
  document.querySelector(`.tab[data-tab="${name}"]`).classList.add('active');
  window.scrollTo({top:0, behavior:'instant'});
}

function renderAll(){
  renderTodayChip();
  renderDzis();
  renderDayPanel('a');
  renderDayPanel('b');
  renderDayPanel('c');
  renderCorrective();
  renderRunHistory();
  renderProgress();
  renderScheduleGrid();
}

/* ---------- SERVICE WORKER (offline support) ---------- */
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}

/* ---------- INIT ---------- */
(async function init(){
  await loadState();
  document.querySelectorAll('.tab').forEach(t=>{
    t.addEventListener('click', ()=>switchTab(t.dataset.tab));
  });
  const rd = document.getElementById('runDate');
  if(rd){ rd.value = todayISO(); rd.max = todayISO(); }
  renderAll();
  switchTab('dzis');
})();
