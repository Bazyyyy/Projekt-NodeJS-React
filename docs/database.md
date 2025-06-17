# 🧱 Datenbankstruktur

Dieses Projekt verwendet **SQLite** als lokale Datenbanklösung.  
Es gibt zwei Haupttabellen: `lists` und `tasks`.

---

## 📁 Tabelle: `lists`

Speichert alle To-Do-Listen mit Titel & Kategorie.

| Spalte | Typ     | Beschreibung                      |
|--------|---------|-----------------------------------|
| `id`   | INTEGER PRIMARY KEY AUTOINCREMENT | Eindeutige ID |
| `title` | TEXT NOT NULL | Name der Liste |
| `type` | TEXT DEFAULT `'Allgemein'` | Kategorie/Label |

### Beispiel-Datensatz

```json
{
  "id": 1,
  "title": "Einkaufen",
  "type": "Allgemein"
}

Tabelle: tasks
Speichert alle Tasks, mit Status, optionalem Datum und Zuordnung zu einer Liste.

Spalte	                            Typ	                                Beschreibung
id	                INTEGER PRIMARY KEY AUTOINCREMENT	                Task-ID
title	                        TEXT NOT NULL	                        Beschreibung des Tasks
completed	               BOOLEAN NOT NULL DEFAULT 0	                Erledigt-Status
list_id	                    INTEGER NOT NULL	                        Fremdschlüssel zu lists(id)
deadline	                   TEXT (ISO-Datum)                     	Optionales Fälligkeitsdatum

Fremdschlüssel

FOREIGN KEY (list_id) REFERENCES lists (id) ON DELETE CASCADE
→ Beim Löschen einer Liste werden alle zugehörigen Tasks automatisch gelöscht.

Beispiel-Datensatz
json
{
  "id": 7,
  "title": "Milch kaufen",
  "completed": false,
  "list_id": 1,
  "deadline": "2025-06-25"
}


Hinweise
deadline ist ein optionales Textfeld im ISO-Format (z. B. "2025-06-25"), kann leer bleiben.

completed wird intern als 0/1 gespeichert, aber im API-Response als true/false zurückgegeben.

ALTER TABLE-Befehl im Code sorgt dafür, dass deadline auch bei älteren Datenbanken ergänzt wird (idempotent).

Datenbankdatei: todo.db (lokal im Backend-Ordner) Setup: Automatisch beim Start von server.js Kein Login, kein Benutzer-Konzept – reines Ein-User-Modell.