# Benchmark zadań algorytmicznych 2.1–2.11

## Uruchamianie

Wymagany jest Python 3.10 lub nowszy. Program używa wyłącznie biblioteki standardowej Pythona; niczego nie trzeba instalować.

- Windows: otwórz folder w terminalu i uruchom `py benchmark.py` (albo `python benchmark.py`).
- macOS/Linux: `python3 benchmark.py`.

Wpisz numer zadania, np. `2.3`, `2.1`, `all` albo `q`. Program pyta o argumenty, wykonuje kontrolę wyniku, a potem kilka powtórzeń pomiaru. Raport pokazuje minimum, medianę i maksimum czasu. Mediana jest dobrym podstawowym punktem porównania. Raport można zapisać do plików JSON i CSV w tym samym folderze.

## Co jest przygotowane

W widocznym fragmencie poleceń dostępne były zadania 2.1–2.6:

- **2.1** — dziewięć sekwencji/pętli. Argument `n` upraszcza testy; dla punktu o liczbach rzeczywistych program demonstracyjnie przyjmuje `a=0`, `δ=1`, `b=n`.
- **2.2** — Fibonacci z `F0=F1=1`; porównanie iteracji z rekurencją (dla małego `n`).
- **2.3** — liczba dzielników; naiwny przegląd z porównaniem do sprawdzania do pierwiastka.
- **2.4** — całkowita potęga; mnożenie liniowe kontra szybkie potęgowanie.
- **2.5** — `logint(p,n)`; pętla kontra wyszukiwanie binarne.
- **2.6** — przybliżenie π szeregiem Leibniza.

Treści 2.7–2.11 nie było w udostępnionej rozmowie ani plikach. Program pokazuje dla nich jawne szablony zamiast przypisywać im zmyślone polecenia. Gdy będziesz mieć te treści, uzupełnij funkcje oraz wpisy w `TASKS` w `benchmark.py`.

## Własne wersje algorytmów

1. Otwórz `benchmark.py` w edytorze.
2. Dodaj funkcję o argumentach zgodnych z danym zadaniem. Funkcja powinna **zwracać** wynik, a nie drukować go podczas pomiaru.
3. Dopisz jej nazwę jako kolejny wariant w odpowiednim wpisie `TASKS`.
4. Upewnij się, że kontrola poprawności porównuje wynik z wartością oczekiwaną.
5. Uruchom program i wybierz zadanie.

Benchmark wywołuje tylko funkcje zapisane w tym pliku. Nie ma funkcji `eval` ani wykonywania kodu wklejonego podczas działania. Wybieraj rozsądne argumenty: bardzo duże listy mogą zużyć pamięć, a wersje rekurencyjne są celowo ograniczone do małych danych. Pomiar mierzy czas wykonania samej funkcji, bez wczytywania danych i drukowania wyniku. Czasy mogą różnić się zależnie od komputera i obciążenia; uruchom kilka serii i porównuj te same dane.

## Bezpieczne testy

Program odrzuca ujemne rozmiary, sprawdza poprawność wyniku przed pomiarem, ogranicza całkowity rozmiar argumentu całkowitego i obsługuje przerwanie Ctrl+C. Zacznij od małych wartości, szczególnie podczas dodawania własnych wariantów. Nie importuj nieznanych plików i nie uruchamiaj nieznanego kodu.
