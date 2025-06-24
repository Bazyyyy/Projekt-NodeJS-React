import React from "react";
import "./MonthlyView.css";

const MonthlyView = ({ tasks }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getTasksForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return tasks.filter((task) => task.deadline?.startsWith(dateStr));
  };

  return (
    <div className="monthly-view">
      <h3>
        📅 Monatsübersicht (
        {today.toLocaleString("default", { month: "long" })})
      </h3>
      <div className="calendar">
        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          const dayTasks = getTasksForDay(day);
          return (
            <div key={day} className="calendar-day">
              <strong>{day}</strong>
              {dayTasks.map((task) => (
                <div key={task.id} className="calendar-task">
                  {task.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyView;
