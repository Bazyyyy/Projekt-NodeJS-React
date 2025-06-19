# 📝 TodoApp: Aufgabenliste mit React, Vite & Electron

Ein Aufgabenplaner mit Web- und Desktop-Unterstützung. Gebaut mit React 18, Vite, Docker, SQLite — und optional Electron.

---

## 🚀 Features

- ✅ React 18 + Vite Frontend
- 🖥️ Electron: Desktop-Support (Windows/macOS/Linux)
- 📦 Dockerisiert mit Nginx-Server für Web-Deployment
- 💾 SQLite als lokale Datenbank
- ⏰ Tägliche Deadline-Prüfung via `node-cron`
- 🧠 Terminalausgabe bei überfälligen Aufgaben

---

## 🔧 Voraussetzungen

- [Node.js (v18)](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (für Build & Deployment)
- [Electron](https://www.electronjs.org/) _(optional)_
- [vitest] for testing
- 📦 Globale Dependencies im Backend:

  ```bash
  npm install express sqlite3 cors node-cron morgan

---

## ⚙️ Lokale Entwicklung

🖥️ Backend

- cd backend/todo-backend
- node server.js

💻 Frontend (React)

- cd frontend
- npm install
- npm run dev

🖥️ Electron (optional)

Entwicklung/Dev-Modus:
- npm run dev         
- npm run start      

Build-Modus:
- npm run build       

> In electron.mjs muss stehen:

win.loadFile('dist/index.html')

Dann:

bash
npm run start

---

## 🐳 Docker-Deployment

docker build -t axinass/frontend:prod .
docker run -it -p 8080:80 axinass/frontend:prod
> App unter: http://localhost:8080

---

## 🧪 Troubleshooting
Fehler	                                            Lösung
react-dom/client not found	                        npm install react@18 react-dom@18
axios oder react-datepicker fehlt	                npm install axios react-datepicker
Print.css not found in Docker	                    Auf Groß-/Kleinschreibung achten: print.css vs Print.css
Electron „Cannot find module“	                    electron.mjs fehlt oder "main" in package.json prüfen
ERR_CONNECTION_REFUSED (Electron)	                npm run dev vergessen (Vite muss laufen)

---

## 🛠️ Dev-Skripte (/scripts)

chmod +x scripts/dev.sh
./scripts/dev.sh


Script	                Beschreibung
dev.sh	                Startet Frontend + Backend im Dev-Modus
run-backend.sh	        Nur Backend starten
run-frontend.sh	        Nur Vite-Frontend starten
setup-db.sh	            SQLite-Setup für Tabellen & Defaults
docker-build.sh	        Prod-Build mit Nginx erzeugen
logs.sh	                Server-Logs überwachen

---

## 📅 Deadline-Prüfung (Automatisch)
Via node-cron: jeden Tag um 00:00

Erkennt deadline < today bei unvollständigen Tasks

Ausgabe im Terminal z. B.:

⏰ 2 überfällige Aufgabe(n):
🔴 [7] Steuer machen (Deadline: 2025-06-17)

---

## ☝️ Hinweise (Ubuntu)
Achte auf Dateiende-Format (LF, nicht CRLF)

Bei bash: ./dev.sh: cannot execute → dos2unix scripts/dev.sh

Im WSL: localhost kann sich auf Windows oder Ubuntu beziehen → IP prüfen mit ip addr