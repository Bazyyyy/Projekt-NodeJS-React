import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000";

const App = () => {
    const [lists, setLists] = useState([]);
    const [selectedListId, setSelectedListId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [newListName, setNewListName] = useState("");
    const [newListType, setNewListType] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/lists`)
            .then((res) => res.json())
            .then((data) => setLists(data))
            .catch((err) => console.error("Error fetching lists:", err));
    }, []);

    useEffect(() => {
        if (!selectedListId) return;

        fetch(`${API_URL}/lists/${selectedListId}/tasks`)
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((err) => {
                console.error("Error fetching tasks:", err);
                setTasks([]);
            });
    }, [selectedListId]);

    const addList = async () => {
        const title = newListName.trim();
        const type = newListType.trim();
        if (!title) return alert("Bitte gib einen Listennamen ein.");

        console.log("Sende:", { title, type });

        try {
            const response = await fetch(`${API_URL}/lists`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, type }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Fehler beim Erstellen der Liste");
            }

            const list = await response.json();
            setLists([...lists, list]);
            setNewListName("");
            setNewListType("");
            setSelectedListId(list.id);
        } catch (err) {
            console.error("Fehler beim Hinzufügen der Liste:", err);
        }
    };

    const addTask = async () => {
        const title = newTask.trim();
        if (!title || !selectedListId) return;

        try {
            const response = await fetch(`${API_URL}/lists/${selectedListId}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Fehler beim Erstellen der Aufgabe");
            }

            const task = await response.json();
            setTasks([...tasks, task]);
            setNewTask("");
        } catch (err) {
            console.error("Fehler beim Hinzufügen der Aufgabe:", err);
        }
    };

    const deleteList = async (listId) => {
        try {
            await fetch(`${API_URL}/lists/${listId}`, {
                method: "DELETE",
            });
            setLists(lists.filter((list) => list.id !== listId));
            if (selectedListId === listId) {
                setSelectedListId(null);
                setTasks([]);
            }
        } catch (err) {
            console.error("Fehler beim Löschen der Liste:", err);
        }
    };

    return (
        <div>
            <h1>To-Do Lists</h1>
            <div>
                <input
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="Neue Liste"
                />
                <input
                    value={newListType}
                    onChange={(e) => setNewListType(e.target.value)}
                    placeholder="Typ (z. B. Arbeit, Einkauf)"
                />
                <button onClick={addList}>Add List</button>
            </div>
            <div>
                {lists.map((list) => (
                    <div key={list.id} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                        <button
                            onClick={() => setSelectedListId(list.id)}
                            style={{
                                backgroundColor: selectedListId === list.id ? "lightblue" : "white",
                                marginRight: "10px",
                                color: "black"
                            }}
                        >
                            {list.title || "(Ohne Titel)"} <small style={{ marginLeft: 5, color: "gray" }}>({list.type || "Allgemein"})</small>
                        </button>
                        <button
                            onClick={() => deleteList(list.id)}
                            style={{
                                backgroundColor: "red",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                cursor: "pointer",
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            {selectedListId && (
                <div>
                    <h2>Tasks</h2>
                    <input
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Neue Aufgabe"
                    />
                    <button onClick={addTask}>Add Task</button>
                    {tasks.length === 0 ? (
                        <p>No tasks yet. Add a new task above.</p>
                    ) : (
                        <ul>
                            {tasks.map((task) => (
                                <li key={task.id}>{task.title} {task.completed ? "✔️" : ""}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;