import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/tasks"; // Verbindung zum Backend

const TaskList = () => {
    const [tasks, setTasks] = useState([]); // To-Do-Liste
    const [newTask, setNewTask] = useState(""); // Eingabefeld

    // 🔄 Lade Aufgaben beim Start
    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((err) => console.error("Fehler beim Laden der Aufgaben:", err));
    }, []);

    // ➕ Neue Aufgabe hinzufügen
    const addTask = async () => {
        if (!newTask.trim()) return;
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTask }),
        });
        const task = await response.json();
        setTasks([...tasks, task]); // Neue Aufgabe zur Liste hinzufügen
        setNewTask(""); // Eingabefeld leeren
    };

    // ✅ Aufgabe als erledigt markieren
    const toggleTask = async (id, completed) => {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: !completed }),
        });
        setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !completed } : task)));
    };

    // ❌ Aufgabe löschen
    const deleteTask = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <div className="container">
            <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Neue Aufgabe..."
            />
            <button onClick={addTask}>Hinzufügen</button>

            <ul>
                {tasks.map((task) => (
                    <ol key={task.id} className={task.completed ? "completed" : ""}>
                        <span onClick={() => toggleTask(task.id, task.completed)}>
                            {task.completed ? "✅ " : "⬜ "} {task.title}
                        </span>
                        <button onClick={() => deleteTask(task.id)}>❌</button>
                    </ol>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
