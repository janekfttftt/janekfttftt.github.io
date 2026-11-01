# Pakiet strony Janka

## Uruchomienie strony

1. Rozpakuj `strona-naprawiona.zip` do wybranego folderu. Zachowaj układ plików, w tym katalog `assets`.
2. Otwórz folder w Visual Studio Code.
3. Zainstaluj rozszerzenie **Live Server** (Ritwick Dey), jeśli jeszcze go nie masz.
4. Kliknij prawym przyciskiem `index.html` → **Open with Live Server**. Przeglądarka otworzy lokalną stronę i odświeży ją po zapisaniu zmian w plikach.
5. W razie braku automatycznego odświeżenia odśwież kartę ręcznie przez Ctrl+R. Wersje w adresach CSS/JS można zwiększyć w znacznikach `<link>` i `<script>` w plikach HTML, jeśli przeglądarka trzyma starą kopię.

Możesz też dwukrotnie kliknąć `index.html`, ale Live Server lepiej odzwierciedla działanie strony hostowanej z serwera.

## Mapa plików i miejsca edycji

| Plik | Rola | Co edytować |
|---|---|---|
| `index.html` | Strona startowa | Podpis pod zdjęciem w `<figcaption>`, adres e-mail w `mailto:`, alternatywny tekst zdjęcia |
| `timer.html` | Układ i kontrolki timera | Treść i kolejność elementów strony; identyfikatory przycisków muszą zgadzać się z `timer.js` |
| `habits.html` | Układ strony nawyków | Nagłówki, formularz, przyciski i widok pełnoekranowy |
| `style.css` | Wygląd wszystkich stron | Zmienne kolorów i rozmiarów na początku pliku; reguły konkretnych elementów niżej |
| `i18n.js` | Słownik polski/angielski | Wszystkie przetłumaczone napisy: obiekt `DICT`, sekcje `pl` i `en` |
| `script.js` | Wspólne zachowania | Zegar, rok w stopce, język i wspólna obsługa strony |
| `fullscreen.js` | Tryb pełnoekranowy | Otwieranie i zamykanie wspólnej nakładki |
| `timer.js` | Działanie timera | Domyślne ustawienia w `DEFAULTS`, limity, dźwięki, kolejka i gotowe zestawy (`addPreset`) |
| `habits.js` | Działanie nawyków | Zapis, serie, import/eksport; `FS_PER_PAGE` określa liczbę kart w widoku pełnoekranowym |
| `assets/kensington.jpg` | Zdjęcie strony startowej | Zastąp obraz o tej samej nazwie albo popraw ścieżkę `src` w `index.html` |

Teksty widoczne w HTML często mają klucz `data-i18n`. Wtedy zmieniaj tłumaczenie w `i18n.js`, żeby przełącznik języka nadal działał. Przy dodaniu nowego klucza dodaj go do obu sekcji `pl` i `en`.

## Dane i publikacja

Nawyki, kolejka timerów, ustawienia dźwięku i język zapisują się w `localStorage` przeglądarki. Każda przeglądarka ma własne dane. Eksport nawyków pozwala zachować kopię.

Do publikacji skopiuj **całą zawartość** rozpakowanego folderu do katalogu publikowanej strony. Nie pomijaj `i18n.js`, `fullscreen.js`, `timer.js`, `habits.js` ani katalogu `assets`.

## Diagnozowanie błędów

Jeśli timer lub nawyki nie działają, sprawdź w narzędziach deweloperskich przeglądarki (F12 → Console), czy pojawił się błąd i czy wszystkie pliki JavaScript zostały wczytane. Błąd `I18N is not defined` zwykle oznacza brak `i18n.js` albo nieprawidłową kolejność skryptów; w tej paczce `i18n.js` jest ładowany przed skryptami korzystającymi z tłumaczeń.

## Benchmark zadań

Drugi plik do pobrania, `benchmark-zadania-python.zip`, zawiera niezależny program konsolowy opisany w `README-BENCHMARK.md`. Nie jest częścią strony i można go uruchamiać osobno.

## Zakładka Benchmark

Menu zawiera teraz zakładkę `benchmark.html`. Wpisz dane wejściowe jako JSON, umieść ciało funkcji JavaScript w polach A i B (zmienna `input` zawiera dane), wybierz liczbę powtórzeń i uruchom pomiar. Wyniki są sprawdzane pod kątem zgodności; raport podaje medianę, minimum i maksimum czasu wykonania kodu. Każda próba działa w osobnej ramce z limitem czasu, a skrypty w ramce nie mogą wykonywać żądań sieciowych według jej polityki CSP. Nie wklejaj kodu, któremu nie ufasz.

Nowe pliki: `benchmark.html` to interfejs zakładki, a `benchmark-page.js` obsługuje pomiar. Menu z linkiem do zakładki jest też na stronach startowej, timera i nawyków.
