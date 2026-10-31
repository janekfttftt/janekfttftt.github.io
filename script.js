// ---------- Zegar (czas w Warszawie) ----------
function startClock() {
  const el = document.getElementById("clock");
  if (!el) return;

  const fmt = new Intl.DateTimeFormat("pl-PL", {
    timeZone: "Europe/Warsaw",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const tick = () => { el.textContent = fmt.format(new Date()); };
  tick();
  setInterval(tick, 1000);
}

// ---------- Rok w stopce ----------
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// ---------- Liczba dni od daty (bez problemów ze zmianą czasu) ----------
function daysSince(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const start = Date.UTC(y, m - 1, d);
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.floor((today - start) / 86400000));
}

function plDays(n) {
  return n === 1 ? "dzień" : "dni";
}

// ---------- Nawyki ----------
function renderHabits() {
  const root = document.getElementById("habits");
  if (!root || typeof HABITS === "undefined") return;

  root.innerHTML = "";
  HABITS.forEach((h) => {
    const days = daysSince(h.start);
    const row = document.createElement("div");
    row.className = "habit";
    row.innerHTML = `
      <div>
        <div class="habit-name">${h.name}</div>
        <div class="muted small">od ${h.start}</div>
      </div>
      <div class="habit-count">${days} <span class="small">${plDays(days)}</span></div>
    `;
    root.appendChild(row);
  });
}

// ---------- Projekty ----------
function renderProjects() {
  const root = document.getElementById("projects");
  if (!root || typeof PROJECTS === "undefined") return;

  root.innerHTML = "";
  PROJECTS.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";

    const title = p.link
      ? `<a href="${p.link}" target="_blank" rel="noopener">${p.title}</a>`
      : p.title;

    card.innerHTML = `
      <h3>${title}</h3>
      <p>${p.desc}</p>
      <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
    `;
    root.appendChild(card);
  });
}

startClock();
setYear();
renderHabits();
renderProjects();
