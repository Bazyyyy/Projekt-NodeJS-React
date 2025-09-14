import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PrintPage.css"; // Optional: Für dein Drucklayout

const PrintPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Sicher extrahieren und validieren
  const state = location?.state;
  const tasks = Array.isArray(state?.tasks) ? state.tasks : null;
  const listName = state?.listName || "Unbenannte Liste";
  const listType = state?.listType || "";

  if (!tasks) {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h2>Ups – keine Druckdaten vorhanden</h2>
        <p>
          Diese Seite wurde direkt geöffnet oder ohne gültige Aufgabenliste
          aufgerufen.
        </p>
        <button onClick={() => navigate("/")}>Zurück zur Übersicht</button>
      </div>
    );
  }

  return (
    <div className="print-container">
      <h1 className="no-print">{listName} – Druckansicht</h1>
      <h1 className="print-only">{listName}</h1>
      {listType && <p>Typ: {listType}</p>}

      <ul className="print-task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "done" : ""}>
            <span>{task.title}</span>
            {task.deadline && (
              <span className="deadline">Fällig: {task.deadline}</span>
            )}
            {task.completed && <span className="checkmark">✔</span>}
          </li>
        ))}
      </ul>

      <button onClick={() => window.print()} className="print-button no-print">
        Seite drucken 🖨️
      </button>
      <button onClick={() => navigate("/")} className="back-button no-print">
        Zurück zur Übersicht
      </button>
    </div>
  );
};

export default PrintPage;
