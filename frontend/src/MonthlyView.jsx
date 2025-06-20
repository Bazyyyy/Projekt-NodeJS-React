import React, { useState } from "react";
import Calendar from "react-calendar";
import "./MonthlyView.css";

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

  const currentMonth = date.getMonth();
  const daysInMonth = new Date(date.getFullYear(), currentMonth + 1, 0).getDate();

  const tasksByDay = tasks.reduce((acc, task) => {
    if (task.deadline) {
      const taskDate = new Date(task.deadline);
      if (
        taskDate.getMonth() === currentMonth &&
        taskDate.getFullYear() === date.getFullYear()
      ) {
        const day = taskDate.getDate();
        acc[day] = (acc[day] || 0) + 1;
      }
    }
    return acc;
  }, {});

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

      <h3>📅 Monatsübersicht ({date.toLocaleString("default", { month: "long" })})</h3>
      <div className="calendar-grid">
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          return (
            <div key={day} className="calendar-day">
              <span>{day}</span>
              {tasksByDay[day] && (
                <span className="task-dot" title={`${tasksByDay[day]} Aufgabe(n)`}></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyView;