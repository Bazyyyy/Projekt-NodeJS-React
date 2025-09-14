import React from "react";
import "./print.css";

const Print = ({ tasks, listName, listType }) => {
  const today = new Date().toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="print-preview">
      <div className="print-header">
        <h2>{listName}</h2>
        {listType && <h4>{listType}</h4>}
        <div className="print-date">{today}</div>
      </div>

      <ul className="print-tasks">
        {tasks.length === 0 ? (
          <li className="empty-task">Keine Aufgaben vorhanden</li>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? "done" : ""}`}
            >
              {task.title}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Print;
