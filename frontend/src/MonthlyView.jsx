import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MonthlyView.css";

// Datum als lokaler "YYYY-MM-DD"-String
const formatDateYYYYMMDD = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const MonthlyView = ({ tasks, toggleTaskDone, deleteTask }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const goToToday = () => {
    setDate(new Date());
  };

  return (
    <div className="calendar-container">
      <button className="go-to-today-button" onClick={goToToday}>
        Heute
      </button>

      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={({ date: tileDate, view }) => {
          if (view === "month") {
            const tileDateString = formatDateYYYYMMDD(tileDate);
            const hasTask = tasks.some((task) => task.deadline === tileDateString);
            return hasTask ? <div className="calendar-task-indicator" /> : null;
          }
          return null;
        }}
      />
    </div>
  );
};

export default MonthlyView;