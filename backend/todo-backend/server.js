const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// SQLite-Datenbank erstellen/verknüpfen
const db = new sqlite3.Database("./todo.db", (err) => {
    if (err) console.error(err.message);
    console.log("Connected to SQLite database.");
});

// Tabelle erstellen, falls nicht vorhanden
db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT 0
    )
`);

// Alle Aufgaben abrufen
app.get("/tasks", (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        // ✅ SQLite gibt `0/1`, aber wir wollen `true/false` für das Frontend
        const tasks = rows.map(task => ({
            ...task,
            completed: task.completed === 1 // 🔄 Konvertiere `1` → `true`, `0` → `false`
        }));

        res.json(tasks);
    });
});


// Neue Aufgabe hinzufügen
app.post("/tasks", (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    db.run("INSERT INTO tasks (title, completed) VALUES (?, ?)", [title, false], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, title, completed: false });
    });
});

// Aufgabe aktualisieren
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    db.run("UPDATE tasks SET title = ?, completed = ? WHERE id = ?", 
        [title, completed ? 1 : 0, id],  // ✅ Konvertiert `true` zu `1`, `false` zu `0`
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id, title, completed });
        }
    );
    
});

// Aufgabe löschen
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM tasks WHERE id = ?", id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Task deleted" });
    });
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
