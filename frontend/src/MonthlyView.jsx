import React from "react";
import "./MonthlyView.css";

const MonthlyView = ({ tasks }) => {
  const currentMonth = new Date().getMonth();
  const daysInMonth = new Date(new Date().getFullYear(), currentMonth + 1, 0).getDate();

  const tasksByDay = tasks.reduce((acc, task) => {
    if (task.deadline) {
      const date = new Date(task.deadline);
      if (date.getMonth() === currentMonth) {
        const day = date.getDate();
        acc[day] = (acc[day] || 0) + 1;
      }
    }
    return acc;
  }, {});

  return (
    <div className="monthly-view">
      <h3>📅 Monatsübersicht (Juni)</h3>
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
