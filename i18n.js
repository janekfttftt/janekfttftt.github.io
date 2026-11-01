// Tłumaczenia PL / EN.
//  - w HTML: data-i18n="klucz" (tekst), data-i18n-placeholder, data-i18n-aria, data-i18n-alt
//  - w JS:   I18N.t("klucz"), I18N.t("klucz", { zmienna: 1 }), I18N.plural(n, "day")
// Żeby dodać / zmienić napis, edytujesz tylko ten plik (sekcje pl i en poniżej).
// Wybór języka zapisuje się w przeglądarce i jest wspólny dla wszystkich podstron.
(function () {
  "use strict";

  const KEY = "lang_v1";

  const DICT = {
    pl: {
      // --- wspólne ---
      "title.index": "Janek",
      "title.timer": "Timer – Janek",
      "title.habits": "Nawyki – Janek",
      "nav.start": "start",
      "nav.timer": "timer",
      "nav.habits": "nawyki",
      "lang.aria": "język",
      "lang.pl": "pol",
      "lang.en": "ang",
      "clock.label": "czas w warszawie",
      "h.start": "START",
      "h.timer": "TIMER",
      "h.habits": "NAWYKI",
      "fs.exit": "Zamknij pełny ekran",
      "btn.add": "Dodaj",
      "day.one": "dzień",
      "day.many": "dni",

      // --- strona startowa ---
      "contact.h": "kontakt",
      "photo.alt": "Jasna kamienna rzeźba w kształcie łuku, na której siedzi ptak, na tle zachodu słońca nad parkiem",

      // --- timer ---
      "timer.ready": "gotowy",
      "timer.nodesc": "bez opisu",
      "timer.paused": "pauza",
      "timer.alldone": "wszystko gotowe – kliknij Reset, żeby zacząć od nowa",
      "btn.start": "Start",
      "btn.pause": "Pauza",
      "btn.resume": "Wznów",
      "btn.skip": "Pomiń",
      "btn.reset": "Reset",
      "btn.fullscreen": "Pełny ekran",
      "timer.add.h": "dodaj timer",
      "timer.min": "min",
      "timer.sec": "sek",
      "timer.desc": "opis (opcjonalnie)",
      "timer.desc.ph": "np. nauka, przerwa",
      "timer.err.zero": "Ustaw czas dłuższy niż 0.",
      "presets.h": "gotowe zestawy",
      "preset.ex": "+ ćwiczenia 40 s i przerwa 20 s",
      "preset.s25": "+ nauka 25 min i przerwa 5 min",
      "preset.s50": "+ nauka 50 min i przerwa 10 min",
      "desc.exercise": "ćwiczenia",
      "desc.study": "nauka",
      "desc.rest": "przerwa",
      "queue.h": "kolejka",
      "queue.empty": "Brak timerów. Dodaj pierwszy powyżej.",
      "queue.clear": "Wyczyść listę",
      "queue.clear.confirm": "Usunąć wszystkie timery z listy?",
      "queue.remove": "Usuń timer",
      "sound.h": "dźwięk sygnału",
      "sound.select": "dźwięk (po wybraniu gra od razu)",
      "sound.length": "długość",
      "sound.volume": "głośność",
      "sound.muted": "wyciszone",
      "sound.mute": "Wycisz",
      "sound.unmute": "Włącz dźwięk",
      "sound.play": "Odtwórz",
      "sound.stop": "Stop",
      "s.pip": "Pip",
      "s.bell": "Dzwonek",
      "s.gong": "Gong",
      "s.alarm": "Budzik",
      "s.sonar": "Sonar",
      "s.chime": "Kurant",
      "timer.note": "Timery uruchamiają się jeden po drugim, a po każdym gra wybrany sygnał. Zostaw kartę ze stroną otwartą (może być w tle) – po zamknięciu karty lub uśpieniu telefonu odliczanie się zatrzyma. Lista i ustawienia dźwięku zapisują się w przeglądarce.",

      // --- nawyki ---
      "habits.intro": "Dodaj nawyk i klikaj kwadraty dni, w których go zrobiłeś. Wszystko zapisuje się automatycznie w Twojej przeglądarce – nikt inny nie widzi Twoich nawyków.",
      "habits.warn": "Ta przeglądarka blokuje zapis danych, więc nawyki znikną po zamknięciu strony. Użyj przycisku „Eksportuj”, żeby zrobić kopię.",
      "habits.new": "nowy nawyk",
      "habits.new.ph": "np. nauka, bieganie, czytanie",
      "habits.today": "Dziś",
      "habits.today.done": "Dziś ✓",
      "habits.rename": "Zmień nazwę",
      "habits.delete": "Usuń",
      "habits.stats": "seria: {s} {sw} · razem: {t} {tw}",
      "habits.empty": "Nie masz jeszcze żadnych nawyków. Dodaj pierwszy powyżej.",
      "habits.export": "Eksportuj (kopia)",
      "habits.import": "Importuj",
      "habits.exportnote": "Eksport zapisuje plik z Twoimi nawykami – możesz go wczytać na innym urządzeniu lub w innej przeglądarce.",
      "habits.prompt.rename": "Nowa nazwa nawyku:",
      "habits.confirm.delete": "Usunąć nawyk „{name}” razem z całą historią?",
      "habits.alert.none": "W pliku nie znaleziono żadnych nawyków.",
      "habits.confirm.replace": "Zastąpić obecne nawyki ({a}) nawykami z pliku ({b})?",
      "habits.alert.fail": "Nie udało się wczytać pliku.",
      "months": "sty,lut,mar,kwi,maj,cze,lip,sie,wrz,paź,lis,gru",
      "weekdays": "Pn,,Śr,,Pt,,",
      "fs.streak.one": "dzień z rzędu",
      "fs.streak.many": "dni z rzędu",
      "fs.page": "strona {a} / {b}",
      "fs.next": "Dalej ›",
      "fs.empty": "Nie masz jeszcze nawyków – dodaj je na stronie.",
    },

    en: {
      // --- common ---
      "title.index": "Janek",
      "title.timer": "Timer – Janek",
      "title.habits": "Habits – Janek",
      "nav.start": "start",
      "nav.timer": "timer",
      "nav.habits": "habits",
      "lang.aria": "language",
      "lang.pl": "pol",
      "lang.en": "eng",
      "clock.label": "time in warsaw",
      "h.start": "START",
      "h.timer": "TIMER",
      "h.habits": "HABITS",
      "fs.exit": "Exit full screen",
      "btn.add": "Add",
      "day.one": "day",
      "day.many": "days",

      // --- start page ---
      "contact.h": "contact",
      "photo.alt": "A pale stone arch sculpture with a bird perched on top, against a sunset over the park",

      // --- timer ---
      "timer.ready": "ready",
      "timer.nodesc": "no description",
      "timer.paused": "paused",
      "timer.alldone": "all done – press Reset to start over",
      "btn.start": "Start",
      "btn.pause": "Pause",
      "btn.resume": "Resume",
      "btn.skip": "Skip",
      "btn.reset": "Reset",
      "btn.fullscreen": "Full screen",
      "timer.add.h": "add a timer",
      "timer.min": "min",
      "timer.sec": "sec",
      "timer.desc": "description (optional)",
      "timer.desc.ph": "e.g. study, break",
      "timer.err.zero": "Set a time longer than 0.",
      "presets.h": "quick sets",
      "preset.ex": "+ exercise 40 s and break 20 s",
      "preset.s25": "+ study 25 min and break 5 min",
      "preset.s50": "+ study 50 min and break 10 min",
      "desc.exercise": "exercise",
      "desc.study": "study",
      "desc.rest": "break",
      "queue.h": "queue",
      "queue.empty": "No timers yet. Add the first one above.",
      "queue.clear": "Clear list",
      "queue.clear.confirm": "Remove all timers from the list?",
      "queue.remove": "Remove timer",
      "sound.h": "signal sound",
      "sound.select": "sound (plays as soon as you pick it)",
      "sound.length": "length",
      "sound.volume": "volume",
      "sound.muted": "muted",
      "sound.mute": "Mute",
      "sound.unmute": "Unmute",
      "sound.play": "Play",
      "sound.stop": "Stop",
      "s.pip": "Pip",
      "s.bell": "Bell",
      "s.gong": "Gong",
      "s.alarm": "Alarm clock",
      "s.sonar": "Sonar",
      "s.chime": "Chime",
      "timer.note": "Timers run one after another, and the chosen sound plays after each one. Keep the tab open (it can be in the background) – closing it or letting your phone sleep stops the countdown. The list and sound settings are saved in your browser.",

      // --- habits ---
      "habits.intro": "Add a habit and click the squares for the days you did it. Everything is saved automatically in your browser – nobody else can see your habits.",
      "habits.warn": "This browser blocks saving data, so your habits will disappear when you close the page. Use the “Export” button to make a backup.",
      "habits.new": "new habit",
      "habits.new.ph": "e.g. study, running, reading",
      "habits.today": "Today",
      "habits.today.done": "Today ✓",
      "habits.rename": "Rename",
      "habits.delete": "Delete",
      "habits.stats": "streak: {s} {sw} · total: {t} {tw}",
      "habits.empty": "You don't have any habits yet. Add your first one above.",
      "habits.export": "Export (backup)",
      "habits.import": "Import",
      "habits.exportnote": "Export saves a file with your habits – you can load it on another device or in another browser.",
      "habits.prompt.rename": "New habit name:",
      "habits.confirm.delete": "Delete the habit “{name}” along with its whole history?",
      "habits.alert.none": "No habits found in the file.",
      "habits.confirm.replace": "Replace your current habits ({a}) with the ones from the file ({b})?",
      "habits.alert.fail": "Could not read the file.",
      "months": "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",
      "weekdays": "Mo,,We,,Fr,,",
      "fs.streak.one": "day streak",
      "fs.streak.many": "day streak",
      "fs.page": "page {a} / {b}",
      "fs.next": "Next ›",
      "fs.empty": "You don't have any habits yet – add them on the page.",
    },
  };

  let lang = "pl";
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "pl" || saved === "en") lang = saved;
  } catch (e) { /* zostaje polski */ }

  function t(key, vars) {
    let s = DICT[lang][key];
    if (s === undefined) s = DICT.pl[key];
    if (s === undefined) return key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
    return s;
  }

  // 1 → "dzień" / "day", reszta → "dni" / "days"
  function plural(n, base) {
    return t(base + (n === 1 ? ".one" : ".many"));
  }

  function apply() {
    document.documentElement.lang = lang;

    const titleKey = document.documentElement.dataset.title;
    if (titleKey) document.title = t(titleKey);

    document.querySelectorAll("[data-i18n]").forEach((e) => { e.textContent = t(e.dataset.i18n); });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((e) => { e.placeholder = t(e.dataset.i18nPlaceholder); });
    document.querySelectorAll("[data-i18n-aria]").forEach((e) => { e.setAttribute("aria-label", t(e.dataset.i18nAria)); });
    document.querySelectorAll("[data-i18n-alt]").forEach((e) => { e.setAttribute("alt", t(e.dataset.i18nAlt)); });
    document.querySelectorAll("button[data-lang]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
  }

  function set(next) {
    if (next !== "pl" && next !== "en") return;
    if (next === lang) return;
    lang = next;
    try { localStorage.setItem(KEY, lang); } catch (e) { /* trudno */ }
    apply();
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-lang]");
    if (b) set(b.dataset.lang);
  });

  apply();

  window.I18N = { t, plural, set, get lang() { return lang; } };
})();
