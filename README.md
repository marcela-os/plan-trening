# Siła · masa · bieg — plan treningowy (PWA)

Osobista aplikacja treningowa (PWA) do prowadzenia planu siłowo-korekcyjnego równolegle z przygotowaniami biegowymi (półmaraton → maraton). Działa w pełni offline, bez konta i bez serwera — wszystkie dane zostają na telefonie.

🔗 **Aplikacja:** https://marcela-os.github.io/plan-trening/

## Funkcje

- **Dziś** — trening na dany dzień z checkboxami i zapisem ciężarów; przeglądanie dat wstecz (wpisy archiwalne) oraz zamiana treningu (Dzień A/B/C, bieg, odpoczynek)
- **Dni A / B / C** — plan siłowy: Push, Nogi + Core (z pracą jednonóż, łydkami i piszczelami), Pull
- **Korekcja** — codzienne ćwiczenia posturalne: wysunięta głowa, spięte barki, przodopochylenie miednicy
- **Bieganie** — dziennik biegów (interwały / easy / długi dystans) z możliwością wpisu z datą wsteczną; trening biegowy realizowany wg planu Runna
- **Postęp** — seria dni, statystyki, historia wpisów oraz **Eksport tygodnia** (kopiuje podsumowanie tygodnia do schowka — do cotygodniowego przeglądu)
- **Info** — zasady progresji, deload, wskazówki żywieniowe dla bieżącej fazy

## Harmonogram tygodnia

| Dzień | Trening |
|---|---|
| Poniedziałek | Dzień B — Nogi + Core |
| Wtorek | Bieg — interwały / tempo |
| Środa | Dzień A — Push |
| Czwartek | Bieg spokojny (jeśli w planie Runna) |
| Piątek | Dzień C — Pull |
| Sobota | Bieg — długi dystans |
| Niedziela | Odpoczynek |

Codziennie dodatkowo ~10 minut ćwiczeń korekcyjnych.

## Instalacja na iPhonie

1. Otwórz adres aplikacji w **Safari**.
2. Stuknij ikonę **Udostępnij** (kwadrat ze strzałką) → **Dodaj do ekranu początkowego**.
3. Aplikacja pojawi się jako ikona na pulpicie i będzie działać na pełnym ekranie, także offline.

## Dane

Wszystkie wpisy (odhaczenia, ciężary, biegi) zapisywane są lokalnie w pamięci telefonu — nie są nigdzie wysyłane. Dane znikną tylko po usunięciu ikony aplikacji z ekranu początkowego lub wyczyszczeniu danych Safari.

## Aktualizacja

Podmień `index.html` w tym repozytorium — zainstalowana aplikacja pobierze nową wersję przy najbliższym otwarciu z dostępem do internetu. Wpisy użytkownika pozostają nietknięte.

## Pliki

| Plik | Rola |
|---|---|
| `index.html` | cała aplikacja (HTML + CSS + JS) |
| `manifest.json` | manifest PWA (nazwa, ikony, tryb pełnoekranowy) |
| `sw.js` | service worker — obsługa trybu offline |
| `icon-192.png`, `icon-512.png` | ikony aplikacji |
