# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.





markdown
# ✅ Projektname: Aufgabenliste mit React, Vite & Electron

Ein Aufgabenplaner mit Web- und Desktop-Unterstützung. Gebaut mit React 18, Vite, Docker und Electron.

---

## 🚀 Features

- ⚛️ React 18 + Vite Frontend
- 🖥️ Electron für Desktop-Nutzung (Windows/macOS/Linux)
- 🐳 Dockerisiertes Web-Deployment mit Nginx
- 🎯 Lightweight, lokal & Cloud-ready

---

## 📦 Voraussetzungen

- [Node.js (v18)](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (für Build & Deployment)
- [Electron](https://www.electronjs.org/) (optional, lokal)

---

## 🛠️ Lokale Entwicklung (Web)

```bash
cd frontend
npm install
npm run dev
🔗 Läuft auf: http://localhost:5173

🖥️ Desktop (Electron)
▶️ Start im Dev-Modus:
> Wichtig: vite dev muss im Hintergrund laufen

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
🐳 Docker (für Web-Deployment)
🔨 Builden:
bash
docker build -t axinass/frontend:prod .
▶️ Starten:
bash
docker run -it -p 8080:80 axinass/frontend:prod
🔗 App im Browser: http://localhost:8080

🧯 Troubleshooting
Fehler	Lösung
react-dom/client not found	npm install react@18 react-dom@18
axios oder react-datepicker fehlt	npm install axios react-datepicker
Print.css not found in Docker	Groß-/Kleinschreibung! → print.css vs Print.css
Electron "Cannot find module"	electron.mjs fehlt oder "main" in package.json falsch
ERR_CONNECTION_REFUSED (Electron)	npm run dev nicht gestartet → Dev-Server fehlt