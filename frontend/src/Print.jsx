import React, { useRef } from "react";
import "./Print.css"; // CSS-Datei importieren

function Print({ tasks, listName, listType }) {
  const printRef = useRef();

  const handlePrint = () => {
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printRef.current.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Zurücksetzen nach dem Druck
  };

  return (
    <div>
      <div ref={printRef} className="print-content">
        <div className="print-header">
          <h2 className="print-title">{listType}</h2>
          <p className="print-subtitle">({listName})</p>
        </div>
        <ul className="print-list">
          {tasks.map((task, index) => (
            <li key={index} className="print-list-item">
              {task.title} {task.completed ? "(✔ erledigt)" : ""}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handlePrint} className="print-button">
        🖨️ Drucken
      </button>
    </div>
  );
}

export default Print;
