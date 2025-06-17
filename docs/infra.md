#  Infrastruktur & Deployment

Diese Datei beschreibt, wie das Projekt lokal gestartet, gebaut und – optional – deployed werden kann.

---

##  Projektüberblick

- **Frontend:** React (Vite)
- **Backend:** Express + Node.js + SQLite
- **Dev-Skripte:** `./scripts/dev.sh`, `./scripts/stop.sh`
- **DB-Datei:** `backend/todo-backend/todo.db`
- **Deployment:** Noch lokal, Docker optional

---

## 🧪 Lokale Entwicklung

### Voraussetzung

- Node.js (≥ v18)
- Bash-kompatibles Terminal (`dev.sh` ist Shell)
- Optional: SQLite CLI (`sqlite3`)

### Starten (Frontend + Backend gleichzeitig):

```bash
./scripts/dev.sh

Einzelstart:
bash
cd backend/todo-backend
npm install
npm run start

Frontend – Build mit Vite
Entwicklung:
bash
cd frontend
npm install
npm run dev
→ Läuft auf http://localhost:5173

Build:
bash
npm run build
Preview:
bash
npm run preview

Backend – Start
bash
cd backend/todo-backend
node server.js
→ API läuft auf http://localhost:5000

Logs landen in: logs/server.log (via Morgan)

Docker (optional, geplant)
> Noch nicht implementiert – Option für später

Multi-Stage-Dockerfile

Backend + Vite-Frontend + SQLite persistieren

Reverse Proxy: nginx oder caddy

Volumes für Logs & DB

 Deployment-Ideen
Plattform	Bemerkung
Render	Free-Plan + SQLite support via volume
Fly.io	Gute Express/Docker-Unterstützung
Vercel	Nur fürs Frontend geeignet
Railway	Simple + SQLite möglich über plugins


🔑 Umgebungsvariablen (zukünftig)
Variable	Beschreibung	Default
PORT	Backend-Port	5000
NODE_ENV	Umgebung (dev/prod)	dev