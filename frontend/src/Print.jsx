import React, { useRef } from "react";
import "./Print.css"; // CSS-Datei importieren

function Print({ tasks = [], listName, listType }) {
  const printRef = useRef();

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Druckansicht</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .print-header { text-align: center; margin-bottom: 20px; }
            .print-list { list-style: none; padding: 0; }
            .print-list-item { padding: 5px; border-bottom: 1px solid #ccc; }
          </style>
        </head>
        <body>
          ${printRef.current.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      {/* Fixierter Print-Button oben rechts */}
      <button onClick={handlePrint} className="print-button" title="Drucken">
        🖨️
      </button>

      {/* Druckbare Inhalte */}
      <div ref={printRef} className="print-content">
        <div className="print-header">
          <h2 className="print-title">{listType}</h2>
          <p className="print-subtitle">({listName})</p>
        </div>
        <ul className="print-list">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li key={index} className="print-list-item">
                {task.title} {task.completed ? "(✔ erledigt)" : ""}
              </li>
            ))
          ) : (
            <li className="print-list-item">Keine Aufgaben vorhanden</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Print;
