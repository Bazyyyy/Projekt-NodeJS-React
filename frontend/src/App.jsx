import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/tasks"; // Verbindung zum Backend

const TaskList = () => {
    const [tasks, setTasks] = useState([]); // To-Do-Liste
    const [newTask, setNewTask] = useState(""); // Eingabefeld für neue Aufgaben

    // 🔄 Lade Aufgaben beim Start der Anwendung
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setTasks(data.map(task => ({
                    ...task,
                    completed: !!task.completed // SQLite gibt 1/0, konvertiere zu true/false
                })));
            } catch (err) {
                console.error("Fehler beim Laden der Aufgaben:", err);
            }
        };
        fetchTasks();
    }, []);

    // ➕ Neue Aufgabe hinzufügen
    const addTask = async () => {
        if (!newTask.trim()) return; // Leere Eingabe ignorieren
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTask }),
            });
            const task = await response.json();
            setTasks([...tasks, task]); // Aufgabe zur Liste hinzufügen
            setNewTask(""); // Eingabefeld leeren
        } catch (err) {
            console.error("Fehler beim Hinzufügen der Aufgabe:", err);
        }
    };

    // ✔️ Aufgabe als erledigt markieren
    const toggleTask = async (id, completed) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: !completed }),
            });
            setTasks(tasks.map(task =>
                task.id === id ? { ...task, completed: !completed } : task
            ));
        } catch (err) {
            console.error("Fehler beim Aktualisieren der Aufgabe:", err);
        }
    };

    // 🗑️ Aufgabe löschen
    const deleteTask = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            setTasks(tasks.filter(task => task.id !== id)); // Aufgabe aus Zustand entfernen
        } catch (err) {
            console.error("Fehler beim Löschen der Aufgabe:", err);
        }
    };

    return (
        <div className="container">
            <h1>Meine To-Do-Liste</h1>
            <div>
                <input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Neue Aufgabe..."
                />
                <button onClick={addTask}>Hinzufügen</button>
            </div>
            <ul>
                {tasks
                    .slice() // Kopie der Liste
                    .sort((a, b) => a.completed - b.completed) // Sortiere erledigte Aufgaben nach unten
                    .map(task => (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id, task.completed)}
                            />
                            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                {task.title}
                            </span>
                            <button onClick={() => deleteTask(task.id)}>Löschen</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default TaskList;
