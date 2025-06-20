import React from "react";
import "./print.css";

const Print = ({ tasks, listName, listType }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-section">
      <button onClick={handlePrint} className="print-button">
        Drucken 🖨️
      </button>
      <div className="print-preview print-hide">
        <h2>{listName}</h2>
        <h4>{listType}</h4>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.completed ? "✔️ " : "❌ "}
              {task.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Print;
