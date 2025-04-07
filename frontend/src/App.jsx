import { useState, useEffect } from "react";
import ListSelection from "./ListSelection";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./App.css"; // Importiere die CSS-Datei

const API_URL = "http://localhost:5000";

const App = () => {
    const [lists, setLists] = useState([]);
    const [selectedListId, setSelectedListId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [newDeadline, setNewDeadline] = useState("");
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
            .then((data) => {
                setTasks(data);
            })
            .catch((err) => {
                console.error("Error fetching tasks:", err);
                setTasks([]);
            });
    }, [selectedListId]);

    const addList = async () => {
        const title = newListName.trim();
        const type = newListType.trim();
        if (!title) return alert("Bitte gib einen Listennamen ein.");

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

    const deleteList = async (listId) => {
        try {
            await fetch(`${API_URL}/lists/${listId}`, { method: "DELETE" });
            setLists(lists.filter((list) => list.id !== listId));
            if (selectedListId === listId) {
                setSelectedListId(null);
                setTasks([]);
            }
        } catch (err) {
            console.error("Fehler beim Löschen der Liste:", err);
        }
    };

    const addTask = async () => {
        const title = newTask.trim();
        if (!title || !selectedListId) return;

        try {
            const response = await fetch(`${API_URL}/lists/${selectedListId}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, deadline: newDeadline }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Fehler beim Erstellen der Aufgabe");
            }

            const task = await response.json();
            setTasks([...tasks, task]);
            setNewTask("");
            setNewDeadline("");
        } catch (err) {
            console.error("Fehler beim Hinzufügen der Aufgabe:", err);
        }
    };

    const toggleTaskDone = async (taskId, currentStatus) => {
        try {
            const response = await fetch(`${API_URL}/tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: !currentStatus }),
            });

            if (!response.ok) throw new Error("Fehler beim Aktualisieren des Status");

            const updated = await response.json();
            setTasks(tasks.map(t => t.id === taskId ? updated : t));
        } catch (err) {
            console.error("Fehler beim Umschalten des Task-Status:", err);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await fetch(`${API_URL}/tasks/${taskId}`, { method: "DELETE" });
            setTasks(tasks.filter(t => t.id !== taskId));
        } catch (err) {
            console.error("Fehler beim Löschen des Tasks:", err);
        }
    };

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <div className="container">
            <h1>To-Do Lists</h1>

            <div className="list-selection">
                <ListSelection
                    lists={lists}
                    selectedListId={selectedListId}
                    setSelectedListId={setSelectedListId}
                    newListName={newListName}
                    setNewListName={setNewListName}
                    newListType={newListType}
                    setNewListType={setNewListType}
                    addList={addList}
                    deleteList={deleteList}
                />
            </div>

            {selectedListId && (
                <div className="task-list-container">
                    <h2>Tasks</h2>
                    {totalTasks > 0 && (
                        <div className="progress-bar-container">
                            <div className="progress-bar">
                                <div
                                    className="progress-bar-fill"
                                    style={{
                                        width: `${progress}%`,
                                        background: progress === 100 ? "green" : "orange",
                                    }}
                                ></div>
                            </div>
                            <small className="progress-text">
                                ✔ {completedTasks} / {totalTasks} erledigt
                            </small>
                        </div>
                    )}

                    <TaskForm
                        newTask={newTask}
                        setNewTask={setNewTask}
                        newDeadline={newDeadline}
                        setNewDeadline={setNewDeadline}
                        addTask={addTask}
                    />
                    <TaskList
                        tasks={tasks}
                        toggleTaskDone={toggleTaskDone}
                        deleteTask={deleteTask}
                    />
                </div>
            )}
        </div>
    );
};

export default App;