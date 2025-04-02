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

// Create the `lists` table
db.run(`
    CREATE TABLE IF NOT EXISTS lists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
    )
`);

// Create the `tasks` table with a foreign key referencing `lists`
db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT 0,
        list_id INTEGER NOT NULL,
        FOREIGN KEY (list_id) REFERENCES lists (id) ON DELETE CASCADE
    )
`);

// Get all lists
app.get("/lists", (req, res) => {
    db.all("SELECT * FROM lists", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Create a new list
app.post("/lists", (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    db.run("INSERT INTO lists (title) VALUES (?)", [title], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, title });
    });
});

// Get all tasks for a specific list
app.get("/lists/:listId/tasks", (req, res) => {
    const { listId } = req.params;

    console.log("Fetching tasks for list ID:", listId); // Debugging log

    db.all("SELECT * FROM tasks WHERE list_id = ?", [listId], (err, rows) => {
        if (err) {
            console.error("Error fetching tasks:", err.message); // Log the error
            return res.status(500).json({ error: "Internal Server Error" });
        }

        console.log("Fetched tasks:", rows); // Debugging log

        // If no tasks are found, return an empty array
        const tasks = rows.map(task => ({
            ...task,
            completed: task.completed === 1 // Convert `1` → `true`
        }));

        res.json(tasks); // Always return an array
    });
});

// Add a new task to a specific list
app.post("/lists/:listId/tasks", (req, res) => {
    const { listId } = req.params;
    const { title } = req.body;

    if (!title) return res.status(400).json({ error: "Title is required" });

    db.run(
        "INSERT INTO tasks (title, completed, list_id) VALUES (?, ?, ?)",
        [title, false, listId],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, title, completed: false, list_id: listId });
        }
    );
});

// Update a task
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    if (!title) return res.status(400).json({ error: "Title is required" });

    db.run(
        "UPDATE tasks SET title = ?, completed = ? WHERE id = ?",
        [title, completed ? 1 : 0, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: "Task not found" });
            res.json({ id, title, completed });
        }
    );
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM tasks WHERE id = ?", id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Task deleted" });
    });
});

// Delete a list and its associated tasks
app.delete("/lists/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM lists WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "List not found" });
        res.json({ message: "List and associated tasks deleted" });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});