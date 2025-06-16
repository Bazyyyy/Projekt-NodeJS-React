import React, { useRef } from "react";
import "./Print.css"; // CSS-Datei importieren

function Print({ tasks, listName, listType }) {
  const printRef = useRef();

  const handlePrint = () => {
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.top = "-10000px";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.body.innerHTML = printRef.current.innerHTML;

    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  };

  return (
    <div>
      <div ref={printRef} className="print-content">
        <div className="print-header">
          <h2 className="print-title">{listType}</h2> {/* "Einkaufsliste" wird hier angezeigt */}
          <p className="print-subtitle">({listName})</p>
        </div>
        <ul className="print-list">
          {tasks.map((task, index) => (
            <li key={index} className="print-list-item">
              <span className="checkbox"></span>
              {task.title} {task.completed ? "(✔ erledigt)" : ""}
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
