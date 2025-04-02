import { useState, useEffect } from "react";
import ListSelection from "./ListSelection";
import TaskList from "./TaskList";

const API_URL = "http://localhost:5000";

const App = () => {
    const [lists, setLists] = useState([]);
    const [selectedListId, setSelectedListId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [newListName, setNewListName] = useState("");

    // Fetch all lists
    useEffect(() => {
        fetch(`${API_URL}/lists`)
            .then((res) => res.json())
            .then((data) => setLists(data))
            .catch((err) => console.error("Error fetching lists:", err));
    }, []);

    useEffect(() => {
        if (!selectedListId) return;
    
        fetch(`${API_URL}/lists/${selectedListId}/tasks`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch tasks: ${res.statusText}`);
                }
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setTasks(data); // Set tasks if the response is an array
                } else {
                    console.error("Unexpected response format:", data);
                    setTasks([]); // Fallback to an empty array
                }
            })
            .catch((err) => {
                console.error("Error fetching tasks:", err);
                setTasks([]); // Fallback to an empty array on error
            });
    }, [selectedListId]);

    // Add a new list
    const addList = async () => {
        if (!newListName.trim()) return;

        const response = await fetch(`${API_URL}/lists`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newListName }),
        });

        const list = await response.json();
        setLists([...lists, list]);
        setNewListName("");
        setSelectedListId(list.id); // Automatically select the new list
    };

    // Add a new task to the selected list
    const addTask = async () => {
        if (!newTask.trim() || !selectedListId) return;

        const response = await fetch(`${API_URL}/lists/${selectedListId}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTask }),
        });

        const task = await response.json();
        setTasks([...tasks, task]);
        setNewTask("");
    };

    // Delete a list
    const deleteList = async (listId) => {
        try {
            const response = await fetch(`${API_URL}/lists/${listId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Failed to delete list: ${response.statusText}`);
            }

            // Remove the deleted list from the state
            setLists(lists.filter((list) => list.id !== listId));

            // If the deleted list was selected, clear the selected list
            if (selectedListId === listId) {
                setSelectedListId(null);
                setTasks([]); // Clear tasks for the deleted list
            }
        } catch (err) {
            console.error("Error deleting list:", err);
        }
    };

    return (
        <div>
            <h1>To-Do Lists</h1>
            <div>
                <input
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="New list name"
                />
                <button onClick={addList}>Add List</button>
            </div>
            <div>
                {lists.map((list) => (
                <div key={list.id} style={{ display: "flex", alignItems: "center", marginBottom: "5px"}}>
                        <button
                            onClick={() => setSelectedListId(list.id)}
                            style={{
                                backgroundColor: selectedListId === list.id ? "lightblue" : "white",
                                marginRight: "10px",
                                color: "black"
                            }}
                        >
                            {list.title}
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
                        placeholder="New task"
                    />
                    <button onClick={addTask}>Add Task</button>
                    {Array.isArray(tasks) && tasks.length === 0 ? (
                        <p>No tasks yet. Add a new task above.</p>
                    ) : (
                        <ul>
                            {Array.isArray(tasks) &&
                                tasks.map((task) => (
                                    <li key={task.id}>
                                        {task.title} {task.completed ? "✔️" : ""}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
