import React from 'react';
import "./TaskItem.css";

const TaskItem = ({ task, toggleTaskDone, deleteTask, isSelected }) => {
  const today = new Date();
  const deadlineDate = task.deadline ? new Date(task.deadline) : null;

  const isOverdue = deadlineDate && deadlineDate < today && !task.completed;
  const isSoon =
    deadlineDate &&
    deadlineDate >= today &&
    (deadlineDate - today) / (1000 * 60 * 60 * 24) < 3 &&
    !task.completed;

  return (
    <li className={`task-item ${isSelected ? "selected-task" : ""}`}>
      <div className="task-item-content">
        {/* Linker Bereich: Deadline */}
        {task.deadline && (
          <small
            className={`task-item-deadline ${
              isOverdue ? "overdue" : isSoon ? "soon" : ""
            }`}
          >
            Zu erledigen bis: {task.deadline}
            {isOverdue && " ⏰ Überfällig!"}
            {isSoon && " ⚠️ bald fällig"}
          </small>
        )}

        {/* Mittlerer Bereich: Checkbox und Titel */}
        <div className="task-item-left">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTaskDone(task.id, task.completed)}
          />
          <span
            className={`task-item-title ${
              task.completed ? "completed" : ""
            }`}
          >
            {task.text}
          </span>
        </div>

        {/* Rechter Bereich: Delete-Button */}
        <button
          className="task-item-delete-button"
          onClick={() => deleteTask(task.id)}
        >
          -
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
