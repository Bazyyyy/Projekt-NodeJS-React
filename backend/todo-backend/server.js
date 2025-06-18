
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const cron = require("node-cron");
const app = express();
const fs = require("fs");
const morgan = require("morgan");

function checkOverdueTasks() {
  const today = new Date().toISOString().split("T")[0];

  db.all(
    "SELECT * FROM tasks WHERE deadline IS NOT NULL AND completed = 0 AND deadline < ?",
    [today],
    (err, rows) => {
      if (err) {
        return console.error("Fehler bei der Überfälligkeitsprüfung:", err.message);
      }

      if (rows.length > 0) {
        console.log(`🛎️ ${rows.length} überfällige Aufgabe(n)!:`);
        rows.forEach((t) =>
          console.log(`🔸 [${t.id}] ${t.title} (Deadline: ${t.deadline})`)
        );
      } else {
        console.log(" Keine überfälligen Aufgaben.");
      }
    }
  );
}

fs.mkdirSync("logs", { recursive: true });

const accessLogStream = fs.createWriteStream("logs/server.log", {flags: "a"});

app.use(morgan("dev"));
app.use(morgan("combined", {stream: accessLogStream}));
const port = 5050;

app.use(cors());
app.use(express.json());



const db = new sqlite3.Database("./todo.db", (err) => {
    if (err) console.error(err.message);
    console.log("Connected to SQLite database.");
});

console.log("Kleine Roboter starten für dich den Server...");

cron.schedule("0 0 * * *", checkOverdueTasks);
checkOverdueTasks();

console.log("Kleine Roboter haben den Server gestartet!");
setTimeout(() => {
    
},)



// Optional: Versuche Spalte hinzuzufügen (ignoriert Fehler, wenn sie schon existiert)
db.run("ALTER TABLE tasks ADD COLUMN deadline TEXT", (err) => {
    if (err && !err.message.includes("duplicate column")) {
        console.error("Fehler beim Hinzufügen der Spalte deadline:", err.message);
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS lists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        type TEXT DEFAULT 'Allgemein'
    )
`);

db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT 0,
        list_id INTEGER NOT NULL,
        deadline TEXT,
        FOREIGN KEY (list_id) REFERENCES lists (id) ON DELETE CASCADE
    )
`);


app.get("/lists", (req, res) => {
    db.all("SELECT * FROM lists", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post("/lists", (req, res) => {
    const { title, type } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({ error: "Gültiger Title ist erforderlich!" });
    }

    const cleanTitle = title.trim();
    const cleanType = (type || "Allgemein").trim();

    db.run(
        "INSERT INTO lists (title, type) VALUES (?, ?)",
        [cleanTitle, cleanType],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            db.get("SELECT * FROM lists WHERE id = ?", [this.lastID], (err, row) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json(row);
            });
        }
    );
});

app.get("/lists/:listId/tasks", (req, res) => {
    const { listId } = req.params;
    db.all("SELECT * FROM tasks WHERE list_id = ?", [listId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const tasks = rows.map(task => ({
            ...task,
            completed: task.completed === 1
        }));
        res.json(tasks);
    });
});

app.post("/lists/:listId/tasks", (req, res) => {
    const { listId } = req.params;
    const { title, deadline } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({ error: "Gültiger Task-Titel ist erforderlich!" });
    }

    const cleanTitle = title.trim();
    const cleanDeadline = deadline || null;

    db.run(
        "INSERT INTO tasks (title, completed, list_id, deadline) VALUES (?, ?, ?, ?)",
        [cleanTitle, false, listId, cleanDeadline],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, title: cleanTitle, completed: false, list_id: listId, deadline: cleanDeadline });
        }
    );
});

app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    const status = completed ? 1 : 0;

    db.run("UPDATE tasks SET completed = ? WHERE id = ?", [status, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ ...row, completed: row.completed === 1 });
        });
    });
});

app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM tasks WHERE id = ?", id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Task deleted" });
    });
});

app.delete("/lists/:id", (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM lists WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "List not found" });
        res.json({ message: "List and associated tasks deleted" });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
