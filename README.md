# Aplikacja Raportująca Sprzedaż

Aplikacja webowa do generowania raportów sprzedaży produktów dla klientów. Umożliwia filtrowanie danych sprzedaży na podstawie różnych kryteriów, zarządzanie listą produktów, klientów oraz zamówień.

## Technologie

- **Frontend:** Vue.js 2, Vuex, Vuetify, Axios
- **Backend:** Node.js, Express, Mongoose, MongoDB
- **Inne:** Vue CLI, Body-Parser, Jest, Cypress

## Wymagania Wstępne

Upewnij się, że masz zainstalowane następujące oprogramowanie:

- Node.js https://nodejs.org/en
- MongoDB https://www.mongodb.com/try/download/community
- npm https://www.npmjs.com/

## Instalacja

1. Sklonuj repozytorium projektu:
   ```bash
   git clone https://github.com/Dudziej/Brokul.git

### Konfiguracja Backendu

1. Przejdź do katalogu backendu:
   ```bash
   cd Brokul/server

2. Zainstaluj zależności:
   ```bash
   npm install

3. Uruchom serwer backendowy:
   ```bash
   node server.js

### Konfiguracja Frontendu

1. Przejdź do katalogu frontendu:
   ```bash
   cd Brokul/frontend

2. Zainstaluj zależności:
   ```bash
   npm install

3. Uruchom aplikację:
   ```bash
   npm run serve

Aplikacja powinna być teraz dostępna pod adresem http://localhost:8080.

## Testowanie Aplikacji

1. Przejdź do katalogu frontendu:
   ```bash
   cd Brokul/frontend

### Testy jednostkowe

1. Uruchom testy jednostkowe:
   ```bash
   npm run test:unit

### Testy end to end

1. Uruchom testy e2e:
   ```bash
   npm run test:e2e

## Funkcjonalności

- Generowanie raportów sprzedaży dla wybranego okresu i/lub klienta w formie tabeli oraz wykresu kołowego.
- Eksportowanie raportu do pliku CSV.
- Zarządzanie listą produktów i klientów.
- Składanie zamówień.

## Autor

Maciej Dudzik / dudzik32@gmail.com / https://github.com/Dudziej
