import React, { useRef } from "react";

function Print({ tasks, listName, listType }) {
  const printRef = useRef();

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    // Temporär den Inhalt der Seite ändern
    document.body.innerHTML = printContent;

    // Druck starten
    window.print();

    // Ursprünglichen Seiteninhalt wiederherstellen
    document.body.innerHTML = originalContent;
  };

  return (
    <div>
      <div ref={printRef} style={{ display: "none" }}>
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ textAlign: "left", color: "#4CAF50", marginBottom: "10px" }}>{listType}</h2>
          <p style={{ textAlign: "left", fontStyle: "italic" }}>({listName})</p>
        </div>
        <ul style={{ listStyleType: "none", padding: "0", marginLeft: "0" }}>
          {tasks.map((task, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                fontSize: "16px",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  width: "15px",
                  height: "15px",
                  border: "2px solid #000",
                  marginRight: "10px",
                  display: "inline-block",
                }}
              ></span>
              {task.title} {task.completed ? "(✔ erledigt)" : ""}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handlePrint}
        className="print-button"
        title="Drucken"
      >
        🖨️
      </button>
    </div>
  );
}

export default Print;
