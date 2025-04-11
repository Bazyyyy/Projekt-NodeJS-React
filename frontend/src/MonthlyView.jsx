import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MonthlyView.css";

const MonthlyView = ({ tasks, toggleTaskDone, deleteTask }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const goToToday = () => {
    setDate(new Date()); // Setzt das Datum auf "Heute"
  };

  const selectedDate = date.toISOString().split("T")[0]; // Format für Vergleich

  return (
    <div className="calendar-container">
      <button className="go-to-today-button" onClick={goToToday}>
        Heute
      </button>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={({ date, view }) => {
          if (view === "month") {
            const hasTask = tasks.some(
              (task) => task.deadline === date.toISOString().split("T")[0]
            );
            if (hasTask) {
              return <div className="calendar-task-indicator"></div>;
            }
          }
          return null;
        }}
      />
    </div>
  );
};

export default MonthlyView;
