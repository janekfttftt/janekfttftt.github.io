# Moja strona

Prosta strona osobista (HTML + CSS + JS), hostowana na GitHub Pages.

## Pliki
- `index.html` – strona główna (zegar, kontakt).
- `timer.html` + `timer.js` – kolejka timerów z sygnałem dźwiękowym.
- `habits.html` + `habits.js` – śledzenie nawyków (siatka kwadratów jak na GitHubie).
- `style.css` – wygląd (kolory w zmiennych na górze pliku).
- `script.js` – zegar i rok w stopce (wspólne dla wszystkich stron).

## Uruchomienie lokalnie
Otwórz folder w VS Code i uruchom `index.html` przez rozszerzenie **Live Server**.

## Publikacja na GitHub Pages
1. Repozytorium musi być publiczne i nazywać się `TWOJ-LOGIN.github.io`.
2. W GitHub Desktop: Commit to main → Push origin.
3. Settings → Pages → Source: gałąź `main`, folder `/ (root)`.

## Dane użytkowników
Nawyki i lista timerów zapisują się w `localStorage` przeglądarki odwiedzającego.
Każdy ma własne dane na swoim urządzeniu; strona nie ma serwera ani kont.
