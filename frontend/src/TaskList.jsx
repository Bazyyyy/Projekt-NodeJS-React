import React, { useEffect, useState } from "react";
import axios from "axios";
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

    // Aufgaben abrufen
    const fetchTasks = async () => {
        try {
            const res = await axios.get(API_URL);
            setTasks(res.data);
        } catch (error) {
            console.error("Fehler beim Laden der Aufgaben:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Neue Aufgabe hinzufügen
    const addTask = async (title) => {
        try {
            const res = await axios.post(API_URL, { title });
            setTasks([...tasks, res.data]);
        } catch (error) {
            console.error("Fehler beim Hinzufügen:", error);
        }
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

    // Aufgabe löschen
    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTasks(tasks.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Fehler beim Löschen:", error);
        }
    };

    return (
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
        </div>
    );
};

export default TaskList;
