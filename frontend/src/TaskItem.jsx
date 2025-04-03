import React, { useState } from "react";

const API_URL = "https://example.com/api"; // Ersetze dies durch deine echte API-URL

const TaskItem = ({ task, onToggle, onDelete }) => (
  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => onToggle(task.id, !task.completed)}
    />
    <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
      {task.title}
    </span>
    <button onClick={() => onDelete(task.id)}>🗑️</button>
  </div>
);

const TaskList = () => {
  const [selectedListId, setSelectedListId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = async () => {
    // Implementiere die Logik zum Hinzufügen eines neuen Tasks
  };

  const toggleTaskDone = async (taskId, completed) => {
    // Implementiere die Logik zum Umschalten des `completed`-Status
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`${API_URL}/tasks/${taskId}`, { method: "DELETE" });
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error("Fehler beim Löschen des Tasks:", err);
    }
  };

  return (
    <>
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
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTaskDone}
                  onDelete={deleteTask}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default TaskList;
