# Entwickler:innen-Tools & Skripte

Diese Datei enthält Anleitungen zur lokalen Entwicklung, Build-Prozessen und nützlichen Helferskripten.

##  Grundinstallation

```bash
npm install
npm run dev         # Frontend (Vite)
npm run start       # Backend (Express + SQLite)


-DockerSetup-
docker build -t todo-backend .
docker run -p 5000:5000 todo-backend


-Tests-
npm run test         # Unit-Tests
npm run lint         # Linting
npm run format       # Prettier-Formatierung

-LokaleSkripte-

scripts/reset-db.sh	  Setzt die lokale SQLite-Datenbank neu
scripts/dev.sh	      Startet alle Dev-Services gleichzeitig
scripts/logs.sh	      Zeigt die letzten Server-Logs

Bonus: Don't forget:
    Frontend läuft auf http://localhost:5173
    Backend läuft auf http://localhost:5000
    .env-Dateien im Root anlegen (Beispiel in .env.example)
    Logging aktiviert mit morgan ('dev')
    Empfohlene VSCode-Erweiterungen: ESLint, Prettier, SQLite Viewer


##  API-Endpoints (Backend)

### GET /lists
- Gibt alle vorhandenen Listen zurück
- Beispiel-Response:  
  ```json
  [ { "id": 1, "title": "Einkauf", "type": "Checkliste" } ]


POST/lists
    Erstellt eine neue Liste
    Payload:
    { "title": "Semesterplan", "type": "Tabelle" }


GET/lists/:id/tasks
    Alle Tasks einer Liste holen

POST/lists/:id/tasks
    Neue Task zu Liste hinzufügen