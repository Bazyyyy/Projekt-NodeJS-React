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
    <li
  className={`task-item ${task.completed ? "completed" : ""}`}
  onClick={() => toggleTaskDone(task.id, task.completed)}
>
  <div className="task-item-content">
    <div className="task-title-deadline">
      <span className="task-item-title">{task.title}</span>
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
    </div>

    <button
      className="task-item-delete-button"
      onClick={(e) => {
        e.stopPropagation(); // Verhindert Toggle bei Klick auf Löschen
        deleteTask(task.id);
      }}
    >
      🗑️
    </button>
  </div>
</li>

  );
};

export default TaskItem;
