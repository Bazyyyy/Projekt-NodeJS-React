# 📎 Aufgaben mit Dateianhängen – React & Node.js To-Do-App

Dieses Projekt erweitert eine klassische To-Do-App um die Möglichkeit, **Dateien pro Aufgabe hochzuladen, anzuzeigen und herunterzuladen**. Unterstützt werden Bilder, PDFs und weitere Formate.

---

## 🚀 Features

### ✅ Upload pro Aufgabe
- Beliebige Dateien per `AttachmentUpload` hochladen
- Direkt an eine spezifische Aufgabe gebunden
- Unterstützt auch mehrere Anhänge pro Task

### 🖼️ Vorschau-Funktion
- Automatische Vorschau für:
  - **Bilder** (`.jpg`, `.png`, `.gif`, `.webp`) via `<img>`
  - **PDFs** via `<iframe>`
- Vorschau-Overlay im Lightbox-Stil
- Schließen durch Klick (Zoom-Out)

### 📄 Dateiliste
- Anzeige aller Anhänge pro Aufgabe
- Vorschau- oder Download-Button je nach Dateityp
- MIME-Typ + Dateiendung geprüft
- PDF & Image: 🔍 Vorschau  
  Andere: ⬇️ Direktdownload

  > Hinweis zu Downloads: > In manchen Browsern (z. B. Safari oder Firefox) können automatische Downloads blockiert werden, wenn die App im lokalen Umfeld (localhost) läuft oder keine HTTPS-Verbindung besteht. 

---

## 🛠️ Technologien

- **Frontend:** React
- **Backend


🧽 Fixes & Verbesserungen

    Backslashes (\) in Dateipfaden via SQL ersetzt → jetzt browserfreundlich
    GIFs optional aus Vorschau ausgeschlossen
    Fallback von att.type auf att.file_type
    Doppelte Dateianzeige behoben
    Vorschau-Schaltflächen für PDFs repariert



🔮 Erweiterungsideen

    🗑️ Anhang löschen mit Bestätigung
    ☁️ Drag & Drop Uploads
    🧭 Sortierung & Suche
    ⬇️ Download-Button direkt in Vorschau
    🔐 Cloud-Speicher-Anbindung (z. B. S3)
    🔁 Bildvorschau mit Navigation (⟵ ⟶)
    ⌨️ ESC zum Schließen

