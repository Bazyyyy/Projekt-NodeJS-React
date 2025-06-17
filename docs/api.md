markdown
# API-Dokumentation

## Basis-URL

http://localhost:5000


Alle folgenden Endpunkte hängen an dieser Adresse. Responses sind im JSON-Format.

---

## Listen-Endpunkte

###  `GET /lists`

Ruft alle Listen ab.

#### Beispiel-Response

```json
[
  {
    "id": 1,
    "title": "Einkauf",
    "type": "Allgemein"
  }
]

➕ POST /lists
Erstellt eine neue Liste.

Request-Body
json
{
  "title": "Uni",
  "type": "Schule"
}

Beispiel-Response
json
{
  "id": 2,
  "title": "Uni",
  "type": "Schule"
}

 DELETE /lists/:id
Löscht eine Liste inklusive aller zugehörigen Tasks.

Beispiel
http
DELETE /lists/1

Response
json
{
  "message": "List and associated tasks deleted"
}

 Aufgaben-Endpunkte
 GET /lists/:listId/tasks
Alle Tasks einer Liste abrufen.

Beispiel
http
GET /lists/1/tasks

Response
json
[
  {
    "id": 5,
    "title": "Milch kaufen",
    "completed": false,
    "list_id": 1,
    "deadline": "2025-06-25"
  }
]

 POST /lists/:listId/tasks
Task zu einer Liste hinzufügen.

Request-Body
json
{
  "title": "Milch kaufen",
  "deadline": "2025-06-25"
}

Response
json
{
  "id": 6,
  "title": "Milch kaufen",
  "completed": false,
  "list_id": 1,
  "deadline": "2025-06-25"
}

 PUT /tasks/:id
Setzt completed auf true oder false.

Request-Body
json
{
  "completed": true
}

Response
json
{
  "id": 6,
  "title": "Milch kaufen",
  "completed": true,
  "list_id": 1,
  "deadline": "2025-06-25"
}

 DELETE /tasks/:id
Löscht einen Task.

Response
json
{
  "message": "Task deleted"
}


🛠️ Fehlerbehandlung
Bei fehlerhaften Requests wird ein Fehlerobjekt zurückgegeben:

json
{
  "error": "Gültiger Title ist erforderlich!"
}
Letztes Update: {{datum}} API-Version: 1.0 Maintainer: Du, Alex. Das Ding rockt.

