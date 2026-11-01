# Moja strona

Prosta strona osobista (HTML + CSS + JS, bez żadnych frameworków), hostowana na GitHub Pages.

## Co robi który plik

| Plik | Do czego służy |
|---|---|
| `index.html` | Strona startowa: nagłówek 「START」, zegar, menu, przełącznik języka, zdjęcie z podpisem, kontakt. |
| `timer.html` | Strona timera: kolejka timerów, gotowe zestawy, ustawienia dźwięku, nakładka pełnoekranowa. |
| `habits.html` | Strona nawyków: formularz, karty z siatką kwadratów, eksport/import, nakładka pełnoekranowa. |
| `style.css` | Cały wygląd. **Kolor główny (niebieski)** zmieniasz w `--accent` na samej górze pliku. |
| `i18n.js` | **Wszystkie teksty po polsku i angielsku** + przełącznik pol // ang. Tu poprawiasz każdy napis. |
| `script.js` | Zegar (czas w Warszawie) i rok w stopce – wspólne dla wszystkich stron. |
| `timer.js` | Logika timera: odliczanie jeden po drugim, zestawy 25/5, 50/10 i 40/20, dźwięki, długość, głośność, wyciszenie, kółko w pełnym ekranie. |
| `habits.js` | Logika nawyków: dodawanie, klikanie dni, serie, zapis w przeglądarce, eksport/import, pełny ekran 4×3. |
| `fullscreen.js` | Wspólne otwieranie i zamykanie trybu pełnoekranowego (timer i nawyki). |
| `assets/kensington.jpg` | Zdjęcie ze strony startowej (podmień plik, żeby zmienić zdjęcie). |

## Gdzie co zmienić
- **Zdjęcie na starcie:** podmień `assets/kensington.jpg` (ta sama nazwa) albo zmień `src` i podpis w `index.html`.
- **Teksty / tłumaczenia:** `i18n.js`.
- **Kolory:** `style.css`, zmienne na górze.
- **Domyślny dźwięk, długość i głośność:** `timer.js`, stała `DEFAULTS` (zmiana działa dla nowych odwiedzających; kto już zapisał własne ustawienia, zachowa swoje).
- **Własny zestaw timerów:** przycisk w `timer.html` + linijka `addPreset(...)` w `timer.js`.
- **Ile nawyków na ekran:** `FS_PER_PAGE` w `habits.js` (i siatka w `style.css`, sekcja „nawyki: 12 kafelków”).

## Uruchomienie lokalnie
Otwórz folder w VS Code i uruchom `index.html` przez rozszerzenie **Live Server**
(zwykłe dwukrotne kliknięcie w `index.html` też działa).

## Publikacja na GitHub Pages
1. Repozytorium musi być publiczne i nazywać się `TWOJ-LOGIN.github.io`.
2. Rozpakuj paczkę do folderu repozytorium (nadpisz stare pliki).
3. W GitHub Desktop: Commit to main → Push origin.
4. Settings → Pages → Source: gałąź `main`, folder `/ (root)`.

## Dane użytkowników
Nawyki, lista timerów, ustawienia dźwięku i wybrany język zapisują się w `localStorage`
przeglądarki odwiedzającego. Każdy ma własne dane na swoim urządzeniu; strona nie ma serwera ani kont.
