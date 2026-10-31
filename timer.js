// Kolejka timerów: odpalają się jeden po drugim, po każdym krótki sygnał.
(function () {
  "use strict";

  const KEY = "timers_v1";
  const MAX_TOTAL = 359999; // 99:59:59 w sekundach

  const $ = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, "0");

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function newId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function fmt(ms) {
    const s = Math.max(0, Math.ceil(ms / 1000));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return h > 0 ? h + ":" + pad(m) + ":" + pad(sec) : pad(m) + ":" + pad(sec);
  }

  const startBtn = $("start-btn");
  const skipBtn = $("skip-btn");
  const resetBtn = $("reset-btn");
  const clearBtn = $("clear-btn");
  const queue = $("queue");
  const form = $("add-form");

  // ---------- Stan ----------
  let timers = load(); // [{ id, desc, total (sekundy), status: wait | run | done }]
  let currentId = null;
  let running = false;
  let endAt = 0;      // znacznik czasu końca (gdy running)
  let remaining = 0;  // ms do końca (gdy pauza)

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY));
      if (!Array.isArray(raw)) return [];
      return raw
        .filter((t) => t && typeof t.total === "number" && t.total > 0)
        .map((t) => ({
          id: newId(),
          desc: typeof t.desc === "string" ? t.desc.slice(0, 80) : "",
          total: Math.min(MAX_TOTAL, Math.floor(t.total)),
          status: "wait",
        }));
    } catch (e) {
      return [];
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(timers.map((t) => ({ desc: t.desc, total: t.total }))));
    } catch (e) { /* brak zapisu – trudno */ }
  }

  const cur = () => timers.find((t) => t.id === currentId) || null;

  // ---------- Dźwięk ----------
  let audioCtx = null;

  function ensureAudio() {
    try {
      if (!audioCtx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) audioCtx = new AC();
      }
      if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    } catch (e) { /* brak dźwięku */ }
  }

  function beep(count, freq) {
    if (!audioCtx || count <= 0) return;
    try {
      if (audioCtx.state === "suspended") audioCtx.resume();
      const t0 = audioCtx.currentTime + 0.02;
      for (let i = 0; i < count; i++) {
        const s = t0 + i * 0.28;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, s);
        gain.gain.exponentialRampToValueAtTime(0.35, s + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, s + 0.18);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(s);
        osc.stop(s + 0.2);
      }
    } catch (e) { /* brak dźwięku */ }
  }

  // ---------- Odliczanie ----------
  // Tykanie w Web Workerze, bo zwykłe timery bywają mocno spowalniane w karcie w tle.
  let worker = null;
  let fallbackId = null;

  function startTicker() {
    if (!worker && fallbackId === null) {
      try {
        const src =
          "var id=null;onmessage=function(e){clearInterval(id);id=null;" +
          "if(e.data==='start'){id=setInterval(function(){postMessage(1)},250)}};";
        worker = new Worker(URL.createObjectURL(new Blob([src], { type: "text/javascript" })));
        worker.onmessage = () => tick();
      } catch (e) {
        worker = null;
      }
    }
    if (worker) worker.postMessage("start");
    else if (fallbackId === null) fallbackId = setInterval(tick, 250);
  }

  function stopTicker() {
    if (worker) worker.postMessage("stop");
    if (fallbackId !== null) {
      clearInterval(fallbackId);
      fallbackId = null;
    }
  }

  function begin(t) {
    currentId = t.id;
    t.status = "run";
    remaining = t.total * 1000;
    endAt = Date.now() + remaining;
  }

  function advance(withSound) {
    const t = cur();
    if (t) t.status = "done";
    const idx = timers.findIndex((x) => x.id === currentId);
    const next = timers.slice(idx + 1).find((x) => x.status === "wait");
    if (next) {
      if (withSound) beep(2, 880);
      begin(next);
    } else {
      currentId = null;
      running = false;
      remaining = 0;
      stopTicker();
      if (withSound) beep(3, 1175);
    }
    renderQueue();
    update();
  }

  function tick() {
    if (!running) return;
    if (endAt - Date.now() <= 0) {
      advance(true);
      return;
    }
    update();
  }

  // ---------- Przyciski ----------
  function onStartPause() {
    ensureAudio();
    if (running) {
      remaining = Math.max(0, endAt - Date.now());
      running = false;
      stopTicker();
      update();
      return;
    }
    if (currentId !== null) {
      endAt = Date.now() + remaining;
      running = true;
      startTicker();
      update();
      return;
    }
    const next = timers.find((x) => x.status === "wait");
    if (!next) return;
    begin(next);
    running = true;
    startTicker();
    renderQueue();
    update();
  }

  function onReset() {
    stopTicker();
    running = false;
    currentId = null;
    remaining = 0;
    timers.forEach((t) => { t.status = "wait"; });
    renderQueue();
    update();
  }

  startBtn.addEventListener("click", onStartPause);
  skipBtn.addEventListener("click", () => { if (currentId !== null) advance(false); });
  resetBtn.addEventListener("click", onReset);

  clearBtn.addEventListener("click", () => {
    if (!timers.length) return;
    if (!window.confirm("Usunąć wszystkie timery z listy?")) return;
    stopTicker();
    running = false;
    currentId = null;
    remaining = 0;
    timers = [];
    save();
    renderQueue();
    update();
  });

  let msgTimer = null;
  function flash(text) {
    const m = $("form-msg");
    m.textContent = text;
    clearTimeout(msgTimer);
    msgTimer = setTimeout(() => { m.textContent = ""; }, 2500);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const min = Math.floor(Number($("in-min").value) || 0);
    const sec = Math.floor(Number($("in-sec").value) || 0);
    const total = Math.min(MAX_TOTAL, Math.max(0, min) * 60 + Math.max(0, sec));
    if (total <= 0) {
      flash("Ustaw czas dłuższy niż 0.");
      return;
    }
    timers.push({ id: newId(), desc: $("in-desc").value.trim().slice(0, 80), total, status: "wait" });
    $("in-desc").value = "";
    save();
    renderQueue();
    update();
  });

  // Gotowy zestaw: 40 s ćwiczeń + 20 s przerwy (każde kliknięcie dodaje kolejną rundę)
  $("preset-btn").addEventListener("click", () => {
    timers.push({ id: newId(), desc: "ćwiczenia", total: 40, status: "wait" });
    timers.push({ id: newId(), desc: "przerwa", total: 20, status: "wait" });
    save();
    renderQueue();
    update();
  });

  queue.addEventListener("click", (e) => {
    const btn = e.target.closest(".q-remove");
    if (!btn || btn.disabled) return;
    const id = btn.closest(".q-item").dataset.id;
    if (id === currentId) return;
    timers = timers.filter((t) => t.id !== id);
    save();
    renderQueue();
    update();
  });

  // ---------- Rysowanie ----------
  function renderQueue() {
    queue.textContent = "";
    $("queue-empty").hidden = timers.length > 0;

    timers.forEach((t, i) => {
      const li = el("li", "q-item " + t.status);
      li.dataset.id = t.id;

      const top = el("div", "q-top");
      const desc = el("span", "q-desc" + (t.desc ? "" : " muted"), t.desc || "bez opisu");
      const time = el("span", "q-time", t.status === "done" ? "✓" : fmt(t.total * 1000));
      const rm = el("button", "q-remove", "×");
      rm.type = "button";
      rm.setAttribute("aria-label", "Usuń timer");
      rm.disabled = t.id === currentId;
      top.append(el("span", "q-idx", String(i + 1)), desc, time, rm);

      const bar = el("div", "bar");
      const fill = el("div", "bar-fill");
      if (t.status === "done") fill.style.width = "100%";
      bar.appendChild(fill);

      li.append(top, bar);
      queue.appendChild(li);
    });
  }

  function update() {
    const t = cur();
    const nextWait = timers.find((x) => x.status === "wait");

    if (t) {
      const left = running ? Math.max(0, endAt - Date.now()) : remaining;
      $("now-label").textContent = (running ? "" : "pauza · ") + (t.desc || "bez opisu");
      $("now-time").textContent = fmt(left);
      document.title = fmt(left) + " · Timer";

      const li = queue.querySelector('[data-id="' + t.id + '"]');
      if (li) {
        li.querySelector(".q-time").textContent = fmt(left);
        li.querySelector(".bar-fill").style.width =
          Math.min(100, Math.max(0, (1 - left / (t.total * 1000)) * 100)) + "%";
      }
    } else {
      const allDone = timers.length > 0 && !nextWait;
      $("now-label").textContent = allDone ? "wszystko gotowe – kliknij Reset, żeby zacząć od nowa" : "gotowy";
      $("now-time").textContent = nextWait ? fmt(nextWait.total * 1000) : "00:00";
      document.title = "Timer – Janek";
    }

    startBtn.textContent = running ? "Pauza" : t ? "Wznów" : "Start";
    startBtn.disabled = !t && !nextWait;
    skipBtn.disabled = !t;
    resetBtn.disabled = !timers.some((x) => x.status !== "wait");
  }

  renderQueue();
  update();
})();
