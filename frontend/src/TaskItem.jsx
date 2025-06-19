import React from "react";
import "./TaskItem.css";

const TaskItem = ({ task, toggleTaskDone, deleteTask }) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskDone(task.id, task.completed)}
        />
        <span>{task.title}</span>
      </label>
      <button onClick={() => deleteTask(task.id)} className="delete-btn">
        🗑
      </button>
    </div>
  );
};

export default TaskItem;
