import React from "react";

const TaskItem = ({ task, onToggle, onDelete }) => {
    return (
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
};

export default TaskItem;
