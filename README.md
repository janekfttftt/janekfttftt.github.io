# Moja strona

Prosta strona osobista (HTML + CSS + JS, bez żadnych frameworków), hostowana na GitHub Pages.
**Wszystkie pliki leżą w jednym folderze, bez podfolderów.**

## Co robi który plik

| Plik | Do czego służy |
|---|---|
| `index.html` | Strona startowa: nagłówek 「START」, zegar, menu, przełącznik języka, zdjęcie z podpisem, kontakt. |
| `timer.html` | Strona timera: kolejka, gotowe zestawy, ustawienia sygnału, nakładka pełnoekranowa. |
| `habits.html` | Strona nawyków: formularz, karty z siatką kwadratów, eksport/import, nakładka pełnoekranowa. |
| `style.css` | Cały wygląd. **Kolor główny (niebieski)** zmieniasz w `--accent` na samej górze pliku. |
| `script.js` | Wspólny dla wszystkich stron: **tłumaczenia PL/EN** (słownik `DICT` – tu poprawiasz każdy napis), przełącznik języka, pełny ekran, zegar. |
| `timer.js` | Logika timera: odliczanie jeden po drugim, zestawy 25/5, 50/10 i 40/20, sygnał budzika (długość 1–10 s, głośność, wyciszenie), kółko w pełnym ekranie. |
| `habits.js` | Logika nawyków: dodawanie, klikanie dni, serie, zapis w przeglądarce, eksport/import, pełny ekran 4×3. |
| `zdjecie.jpg` | Zdjęcie ze strony startowej. |

## Jak zmienić zdjęcie
Wrzuć swoje zdjęcie do tego samego folderu co `index.html` i nazwij je **`zdjecie.jpg`** (zastąp stary plik).
Podpis pod zdjęciem zmienisz w `index.html` (tag `<figcaption>`).
Jeśli pliku nie ma, na stronie pojawia się podpowiedź zamiast zdjęcia.

## Gdzie co zmienić
- **Teksty / tłumaczenia:** `script.js` (na górze, sekcje `pl` i `en`).
- **Kolory:** `style.css`, zmienne na górze.
- **Domyślną długość i głośność sygnału:** `timer.js`, stała `DEFAULTS` (kto już zapisał własne ustawienia, zachowa swoje).
- **Własny zestaw timerów:** przycisk w `timer.html` + linijka `addPreset(...)` w `timer.js`.
- **Ile nawyków na ekran:** `FS_PER_PAGE` w `habits.js` (i siatka w `style.css`, sekcja „nawyki: 12 kafelków”).

## Po zmianie plików
W plikach HTML przy `style.css?v=3`, `script.js?v=3` itd. zwiększ numer (np. na `?v=4`), jeśli po wysłaniu zmian
przeglądarka dalej pokazuje starą wersję. Pomaga też Ctrl+F5.

## Uruchomienie lokalnie
Otwórz folder w VS Code i uruchom `index.html` przez rozszerzenie **Live Server**
(zwykłe dwukrotne kliknięcie w `index.html` też działa).

## Publikacja na GitHub Pages
1. Repozytorium musi być publiczne i nazywać się `TWOJ-LOGIN.github.io`.
2. **Usuń z folderu repozytorium wszystkie stare pliki strony** (poza ukrytym `.git`) i wrzuć całą zawartość paczki.
3. W GitHub Desktop: Commit to main → Push origin.
4. Settings → Pages → Source: gałąź `main`, folder `/ (root)`.

## Gdy coś nie działa
Jeśli plik się nie wczyta albo skrypt się wysypie, na górze strony pojawi się **czerwony pasek** z opisem
(np. „Nie załadował się plik: timer.js”). Najczęstsza przyczyna: nie wszystkie pliki z paczki trafiły do repozytorium.

## Dane użytkowników
Nawyki, lista timerów, ustawienia sygnału i wybrany język zapisują się w `localStorage`
przeglądarki odwiedzającego. Każdy ma własne dane na swoim urządzeniu; strona nie ma serwera ani kont.
