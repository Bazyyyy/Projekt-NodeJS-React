# Entwickler-Guide

Willkommen im Projekt! Hier findest du bewährte Konventionen, Setup-Hinweise und Tipps für effizientes Arbeiten.

---

## Projektstruktur (Ausschnitt)

.
├── backend
│   └── todo-backend
├── docs
├── frontend
│   ├── dist
│   ├── node_modules
│   ├── public
│   └── src
└── scripts

---

##  Konventionen

###  Namensgebung

| Typ            | Beispiel                   |
|----------------|----------------------------|
| Listen         | `title = "Einkauf"`        |
| Tasks          | `title`, `completed`, `deadline` |
| Booleans       | `completed`, nicht `isDone` |
| Dateien        | `camelCase` (z. B. `taskCard.jsx`) |
| Komponenten    | `PascalCase` (z. B. `TaskCard`) |

---

###  Komponenten (React)

- Pro Komponente: eine `.jsx`-Datei + optional `.css`
- Props statt globalem State, so weit wie möglich
- Keine Inline-Funktion in JSX, wenn’s vermeidbar ist

---

##  Linting / Formatting

Optional aktivieren:

- **Prettier** für Auto-Formatierung (`.prettierrc`)
- **ESLint** für sauberen Code-Style
- Git-Hooks via `husky` möglich

---

##  VS Code Setup

**Empfohlene Extensions:**

- ESLint
- Prettier
- SQLite
- REST Client (für API-Tests)
- GitLens

**Settings-Tipp:**

```json
"editor.formatOnSave": true,
"files.autoSave": "onFocusChange"
Git-Konventionen
main = produktionsbereit

feature/... = neue Features

fix/... = Bugfixes

docs/... = Dokumentation

Commit-Style:

feat(task): erledigt-Status klickbar gemacht
fix(api): Fehlerbehandlung bei leerem title
docs(api): Beschreibung zu DELETE /lists ergänzt


 Best Practices
Keep it simple! Trennung von Logik und Ansicht.

Routen und Logging sauber trennen im Backend.

Nutze scripts/ für wiederverwendbare Tasks.

Dokumentiere beim Coden – nicht erst am Ende.