<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import axios from "axios";
=======
import React, { useState, useEffect } from "react";
>>>>>>> parent of a4a8113 (tasklist fixed)
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import styles from "./TaskList.module.css";

return (
    <div className={styles.container}>
        <h2>To-Do Liste</h2>
    </div>
);


const API_URL = "http://localhost:5000/tasks";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
<<<<<<< HEAD
=======
    const [newTask, setNewTask] = useState("");

    const API_URL = `http://localhost:5000/lists/${listId}/tasks`;

    // Fetch tasks for the selected list
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
                }
                const data = await response.json();
                setTasks(data);
            } catch (err) {
                console.error("Error fetching tasks:", err);
            }
        };

        fetchTasks();
    }, [listId]);

    // Add a new task
    const addTask = async () => {
        if (!newTask.trim()) return;
>>>>>>> parent of a4a8113 (tasklist fixed)

    // Aufgaben abrufen
    const fetchTasks = async () => {
        try {
<<<<<<< HEAD
            const res = await axios.get(API_URL);
            setTasks(res.data);
        } catch (error) {
            console.error("Fehler beim Laden der Aufgaben:", error);
=======
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTask }),
            });

            if (!response.ok) {
                throw new Error(`Failed to add task: ${response.statusText}`);
            }

            const task = await response.json();
            setTasks([...tasks, task]);
            setNewTask("");
        } catch (err) {
            console.error("Error adding task:", err);
>>>>>>> parent of a4a8113 (tasklist fixed)
        }
    };

    useEffect(() => {
        if (!selectedListId) return;
    
        fetch(`${API_URL}/${selectedListId}`)
            .then((res) => res.json())
            .then((data) => {
                setTasks(data.map(task => ({
                    ...task,
                    completed: task.completed === 1 // SQLite gibt 1/0 zurück
                })));
            })
            .catch((err) => console.error("Fehler beim Laden der Aufgaben:", err));
    }, [selectedListId]); // Lädt Aufgaben neu, wenn eine andere Liste gewählt wird
    

    // Neue Aufgabe hinzufügen
    const addTask = async () => {
        if (!newTask.trim()) return;
    
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTask, list_id: selectedListId }),
        });
    
        const task = await response.json();
        setTasks([...tasks, task]); // Aufgabe zur Liste hinzufügen
        setNewTask("");
    };
    

    // Aufgabe aktualisieren (toggle completed)
    const toggleTask = async (id, completed) => {
        try {
            const task = tasks.find((t) => t.id === id);
            const res = await axios.put(`${API_URL}/${id}`, { ...task, completed });
            setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
        } catch (error) {
            console.error("Fehler beim Aktualisieren:", error);
        }
    };

<<<<<<< HEAD
    // Aufgabe löschen
    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTasks(tasks.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Fehler beim Löschen:", error);
=======
            if (!response.ok) {
                throw new Error(`Failed to delete task: ${response.statusText}`);
            }

            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch (err) {
            console.error("Error deleting task:", err);
>>>>>>> parent of a4a8113 (tasklist fixed)
        }
    };

    return (
<<<<<<< HEAD
        <div>
            <h2>To-Do Liste</h2>
            <TaskForm onAdd={addTask} />
            {tasks.map((task) => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    onToggle={toggleTask} 
                    onDelete={deleteTask} 
                />
            ))}
=======
        <div className={styles.container}>
            <h2>Tasks</h2>
            <input
                className={styles.addTaskInput}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className={styles.taskItem}>
                        {task.title}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
>>>>>>> parent of a4a8113 (tasklist fixed)
        </div>
    );
};

export default TaskList;
