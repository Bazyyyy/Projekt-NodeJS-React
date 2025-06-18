import React, { useRef } from "react";
import "./print.css";

function Print({ tasks, listName, listType }) {
  const printRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div ref={printRef} className="print-content">
        <div className="print-header">
          <h2 className="print-title">{listName}</h2>
        </div>
        <ul className="print-list">
          {tasks.map((task, idx) => (
            <li
              key={idx}
              className={`print-list-item${task.completed ? " completed" : ""}`}
            >
              <span className="print-checkbox"></span>
              <span className="print-task-title">{task.title}</span>
              {task.deadline && (
                <span className="print-deadline">
                  Deadline: {new Date(task.deadline).toLocaleDateString()}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handlePrint} className="print-button" title="Drucken">
        🖨️
      </button>
    </div>
  );
}

export default Print;
