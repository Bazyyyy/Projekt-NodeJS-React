

# TodoApp: Aufgabenliste mit React, Vite & Electron

Ein Aufgabenplaner mit Web- und Desktop-Unterstützung. Gebaut mit React 18, Vite, Docker und bonus Electron.

---

##  Features

- React 18 + Vite Frontend
- Electron für Desktop-Nutzung (Windows/macOS/Linux)
- Dockerisiertes Web-Deployment mit Nginx
- Lightweight, lokal & Cloud-ready

---

## Voraussetzungen

- [Node.js (v18)](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (für Build & Deployment)
- [Electron](https://www.electronjs.org/) (optional, lokal)

---

## Lokale Entwicklung (Web)

```bash
cd frontend
npm install
npm run dev
Läuft auf: http://localhost:5173

bash
cd backend/todo-backend
node server.js
starten der datenbank und des backends

Desktop (Electron)
Start im Dev-Modus:
Wichtig: vite dev muss im Hintergrund laufen


bash
npm run dev          # Dev-Server starten
npm run start        # Electron starten (lädt http://localhost:5173)
🔒 Start im Build-Modus:
App bundlen:

bash
npm run build
In electron.mjs muss stehen:

js
win.loadFile('dist/index.html')
Electron starten:

bash
npm run start
Docker (für Web-Deployment)
Builden:
bash
docker build -t axinass/frontend:prod .
Starten:
bash
docker run -it -p 8080:80 axinass/frontend:prod
App im Browser: http://localhost:8080

Troubleshooting
Fehler	Lösung
react-dom/client not found	npm install react@18 react-dom@18
axios oder react-datepicker fehlt	npm install axios react-datepicker
Print.css not found in Docker	Groß-/Kleinschreibung! → print.css vs Print.css
Electron "Cannot find module"	electron.mjs fehlt oder "main" in package.json falsch
ERR_CONNECTION_REFUSED (Electron)	npm run dev nicht gestartet → Dev-Server fehlt

