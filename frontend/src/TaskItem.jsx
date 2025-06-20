import React from "react";
import "./TaskItem.css";

const TaskItem = ({ task, toggleTaskDone, deleteTask }) => {
  const deadlineDate = task.deadline ? new Date(task.deadline) : null;
  const today = new Date();
  const isOverdue =
    deadlineDate && !task.completed && deadlineDate < today.setHours(0, 0, 0, 0);
  const isSoon =
    deadlineDate &&
    !task.completed &&
    deadlineDate <= today.setDate(today.getDate() + 2);

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-item-content">
        {/* Deadline-Anzeige */}
        {task.deadline && (
          <small
            className={`task-item-deadline ${
              isOverdue ? "overdue" : isSoon ? "soon" : ""
            }`}
          >
            {task.completed
              ? `Erledigt am: ${task.deadline}`
              : `Zu erledigen bis: ${task.deadline}`}
            {isOverdue && !task.completed && " ⏰ Überfällig!"}
            {isSoon && !task.completed && " ⚠️ bald fällig"}
          </small>
        )}

        {/* Aufgabe mit Checkbox */}
        <label className="task-item-left">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTaskDone(task.id, task.completed)}
          />
          <span className="task-item-title">{task.title}</span>
        </label>

        {/* Delete-Button */}
        <button
          className="task-item-delete-button"
          onClick={() => deleteTask(task.id)}
          title="Aufgabe löschen"
        >
          🗑
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
