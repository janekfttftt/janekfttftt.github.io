// Aplikacja do nawyków: dane zapisują się automatycznie w localStorage
// przeglądarki (każdy odwiedzający ma własne, prywatne nawyki).
// Zawiera też widok pełnoekranowy (12 nawyków na stronę).
(function () {
  "use strict";

  const tr = I18N.t;

  const KEY = "habits_v1";
  const WEEKS = 53;
  const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

  const root = document.getElementById("habits");
  const form = document.getElementById("add-form");
  const input = document.getElementById("habit-name");
  const warn = document.getElementById("storage-warn");
  const exportBtn = document.getElementById("export-btn");
  const importBtn = document.getElementById("import-btn");
  const fileInput = document.getElementById("import-file");

  let storageOk = true;

  // ---------- Pomocnicze ----------
  const pad = (n) => String(n).padStart(2, "0");
  const dayKey = (d) => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const today = () => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); };
  const dayWord = (n) => I18N.plural(n, "day");

  function newId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  // ---------- Zapis / odczyt ----------
  function sanitize(raw) {
    if (!Array.isArray(raw)) return [];
    const seen = new Set();
    return raw
      .filter((h) => h && typeof h.name === "string")
      .map((h) => {
        const done = {};
        if (h.done && typeof h.done === "object") {
          Object.keys(h.done).forEach((k) => {
            if (DATE_RE.test(k) && h.done[k]) done[k] = true;
          });
        }
        let id = typeof h.id === "string" && h.id ? h.id : newId();
        while (seen.has(id)) id = newId();
        seen.add(id);
        return { id, name: h.name.trim().slice(0, 60) || "Nawyk", done };
      });
  }

  function load() {
    try {
      return sanitize(JSON.parse(localStorage.getItem(KEY)));
    } catch (e) {
      storageOk = false;
      return [];
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(habits));
      storageOk = true;
    } catch (e) {
      storageOk = false;
    }
    warn.hidden = storageOk;
  }

  let habits = load();
  warn.hidden = storageOk;

  // ---------- Statystyki ----------
  function stats(h) {
    const total = Object.keys(h.done).length;
    let d = today();
    if (!h.done[dayKey(d)]) d = addDays(d, -1); // seria nie "pęka" przed końcem dnia
    let streak = 0;
    while (h.done[dayKey(d)]) {
      streak++;
      d = addDays(d, -1);
    }
    return { total, streak };
  }

  function statsText(h) {
    const s = stats(h);
    return tr("habits.stats", { s: s.streak, sw: dayWord(s.streak), t: s.total, tw: dayWord(s.total) });
  }

  function refreshCard(h, card, k) {
    if (k) {
      const cell = card.querySelector('.cell[data-key="' + k + '"]');
      if (cell) {
        const on = !!h.done[k];
        cell.classList.toggle("on", on);
        cell.setAttribute("aria-pressed", String(on));
      }
    }
    card.querySelector('[data-role="stats"]').textContent = statsText(h);

    const doneToday = !!h.done[dayKey(today())];
    const tb = card.querySelector('[data-role="today"]');
    tb.classList.toggle("active", doneToday);
    tb.textContent = tr(doneToday ? "habits.today.done" : "habits.today");
  }

  // ---------- Rysowanie ----------
  function buildCard(h) {
    const months = tr("months").split(",");
    const wdays = tr("weekdays").split(",");

    const card = el("article", "card habit-card");
    card.dataset.id = h.id;

    const head = el("div", "habit-head");
    const actions = el("div", "habit-actions");
    [["today", ""], ["rename", tr("habits.rename")], ["delete", tr("habits.delete")]].forEach(([role, label]) => {
      const b = el("button", "btn ghost small-btn", label);
      b.type = "button";
      b.dataset.role = role;
      actions.appendChild(b);
    });
    head.append(el("h3", null, h.name), actions);

    const statsEl = el("p", "muted small habit-stats");
    statsEl.dataset.role = "stats";

    const heat = el("div", "heat");
    const weekdays = el("div", "weekdays");
    wdays.forEach((w) => weekdays.appendChild(el("span", null, w)));

    const scroll = el("div", "scroll");
    const monthsEl = el("div", "months");
    const grid = el("div", "grid");

    const t = today();
    const tKey = dayKey(t);
    const dow = (t.getDay() + 6) % 7; // poniedziałek = 0
    const firstMonday = addDays(t, -dow - (WEEKS - 1) * 7);
    let prevMonth = -1;

    for (let w = 0; w < WEEKS; w++) {
      const monday = addDays(firstMonday, w * 7);
      const month = monday.getMonth();
      const showLabel = w === 0 ? addDays(monday, 7).getMonth() === month : month !== prevMonth;
      if (showLabel) {
        const lab = el("span", null, months[month]);
        lab.style.gridColumn = String(w + 1);
        monthsEl.appendChild(lab);
      }
      prevMonth = month;

      for (let r = 0; r < 7; r++) {
        const date = addDays(monday, r);
        if (date > t) {
          grid.appendChild(el("span", "cell blank"));
          continue;
        }
        const k = dayKey(date);
        const cell = el("button", "cell");
        cell.type = "button";
        cell.tabIndex = -1;
        cell.dataset.key = k;
        cell.title = k;
        cell.setAttribute("aria-label", k);
        cell.setAttribute("aria-pressed", h.done[k] ? "true" : "false");
        if (h.done[k]) cell.classList.add("on");
        if (k === tKey) cell.classList.add("today");
        grid.appendChild(cell);
      }
    }

    scroll.append(monthsEl, grid);
    heat.append(weekdays, scroll);
    card.append(head, statsEl, heat);
    refreshCard(h, card, null);
    return card;
  }

  function render() {
    root.textContent = "";
    if (!habits.length) {
      root.appendChild(el("p", "muted", tr("habits.empty")));
      return;
    }
    habits.forEach((h) => root.appendChild(buildCard(h)));
    // przewiń siatki do prawej strony (najnowsze dni)
    root.querySelectorAll(".scroll").forEach((s) => { s.scrollLeft = s.scrollWidth; });
  }

  // ---------- Akcje ----------
  function toggle(h, k, card) {
    if (h.done[k]) delete h.done[k];
    else h.done[k] = true;
    save();
    refreshCard(h, card, k);
  }

  function rename(h) {
    const n = window.prompt(tr("habits.prompt.rename"), h.name);
    if (n === null) return;
    const name = n.trim().slice(0, 60);
    if (!name) return;
    h.name = name;
    save();
    render();
  }

  function remove(h) {
    if (!window.confirm(tr("habits.confirm.delete", { name: h.name }))) return;
    habits = habits.filter((x) => x !== h);
    save();
    render();
  }

  root.addEventListener("click", (e) => {
    const card = e.target.closest(".habit-card");
    if (!card) return;
    const h = habits.find((x) => x.id === card.dataset.id);
    if (!h) return;

    const cell = e.target.closest(".cell");
    if (cell && cell.dataset.key) {
      toggle(h, cell.dataset.key, card);
      return;
    }
    const btn = e.target.closest("button[data-role]");
    if (!btn) return;
    const role = btn.dataset.role;
    if (role === "today") toggle(h, dayKey(today()), card);
    else if (role === "rename") rename(h);
    else if (role === "delete") remove(h);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = input.value.trim().slice(0, 60);
    if (!name) return;
    habits.push({ id: newId(), name, done: {} });
    input.value = "";
    save();
    render();
  });

  // ---------- Eksport / import ----------
  exportBtn.addEventListener("click", () => {
    const json = JSON.stringify({ version: 1, habits }, null, 2);
    const url = URL.createObjectURL(new Blob([json], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "nawyki-" + dayKey(today()) + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  importBtn.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        const imported = sanitize(Array.isArray(data) ? data : data.habits);
        if (!imported.length) {
          window.alert(tr("habits.alert.none"));
          return;
        }
        if (
          habits.length &&
          !window.confirm(tr("habits.confirm.replace", { a: habits.length, b: imported.length }))
        ) {
          return;
        }
        habits = imported;
        save();
        render();
      } catch (err) {
        window.alert(tr("habits.alert.fail"));
      }
    };
    reader.readAsText(file);
    fileInput.value = "";
  });

  // ---------- Pełny ekran: 12 nawyków na ekran (4×3, a w pionie 3×4) ----------
  const FS_WEEKS = 13;         // ile tygodni pokazuje miniatura w kafelku
  const FS_PER_PAGE = 12;
  const FS_ROTATE_MS = 10000;  // co ile sekund zmienia się strona (gdy nawyków jest więcej niż 12)

  const fsOverlay = document.getElementById("fs-habits");
  const fsGrid = document.getElementById("fs-habits-grid");
  const fsPager = document.getElementById("fs-pager");
  const fsNext = document.getElementById("fs-next");
  const fsEmpty = document.getElementById("fs-empty");
  let fsPage = 0;
  let fsRotate = null;
  let fsRefresh = null;

  const fsPages = () => Math.max(1, Math.ceil(habits.length / FS_PER_PAGE));

  function fsMini(h) {
    const grid = el("div", "fs-mini");
    const t = today();
    const tKey = dayKey(t);
    const first = addDays(t, -((t.getDay() + 6) % 7) - (FS_WEEKS - 1) * 7);
    for (let i = 0; i < FS_WEEKS * 7; i++) {
      const date = addDays(first, i);
      if (date > t) {
        grid.appendChild(el("span", "fs-cell blank"));
        continue;
      }
      const k = dayKey(date);
      grid.appendChild(el("span", "fs-cell" + (h.done[k] ? " on" : "") + (k === tKey ? " today" : "")));
    }
    return grid;
  }

  function fsTile(h) {
    const s = stats(h);
    const tile = el("article", "fs-tile");
    const streak = el("div", "fs-streak");
    streak.append(el("span", "fs-num", String(s.streak)), el("span", "fs-lbl", tr(s.streak === 1 ? "fs.streak.one" : "fs.streak.many")));
    tile.append(el("h3", null, h.name), streak, fsMini(h));
    return tile;
  }

  function renderFs() {
    const pages = fsPages();
    if (fsPage >= pages) fsPage = 0;
    fsOverlay.classList.toggle("is-empty", habits.length === 0);
    fsEmpty.textContent = tr("fs.empty");
    fsGrid.textContent = "";
    habits
      .slice(fsPage * FS_PER_PAGE, (fsPage + 1) * FS_PER_PAGE)
      .forEach((h) => fsGrid.appendChild(fsTile(h)));
    fsPager.textContent = pages > 1 ? tr("fs.page", { a: fsPage + 1, b: pages }) : "";
    fsNext.textContent = tr("fs.next");
    fsNext.hidden = pages <= 1;
  }

  function startRotate() {
    clearInterval(fsRotate);
    fsRotate = setInterval(() => { if (fsPages() > 1) fsGo(1); }, FS_ROTATE_MS);
  }

  function fsGo(delta) {
    const pages = fsPages();
    fsPage = (fsPage + delta + pages) % pages;
    renderFs();
    startRotate();
  }

  document.getElementById("fs-btn").addEventListener("click", () => {
    fsPage = 0;
    renderFs();
    Fullscreen.open(fsOverlay, () => {
      clearInterval(fsRotate);
      clearInterval(fsRefresh);
    });
    startRotate();
    clearInterval(fsRefresh);
    fsRefresh = setInterval(renderFs, 60000); // odświeżanie np. po północy
  });

  fsNext.addEventListener("click", () => fsGo(1));

  document.addEventListener("keydown", (e) => {
    if (!Fullscreen.isOpen()) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") fsGo(1);
    else if (e.key === "ArrowLeft" || e.key === "PageUp") fsGo(-1);
  });

  // ---------- Zmiana języka ----------
  document.addEventListener("langchange", () => {
    render();
    renderFs();
  });

  render();
  renderFs();
})();
