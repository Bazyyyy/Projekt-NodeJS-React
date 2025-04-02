import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import styles from "./TaskList.module.css";

const TaskList = ({ listId }) => {
    const [tasks, setTasks] = useState([]);
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

        try {
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
        }
    };

    // Delete a task
    const deleteTask = async (taskId) => {
        try {
            const response = await fetch(`${API_URL}/${taskId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Failed to delete task: ${response.statusText}`);
            }

            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    return (
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
        </div>
    );
};

export default TaskList;
