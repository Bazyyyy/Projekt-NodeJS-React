import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./MonthlyView.css";

const MonthlyView = ({ tasks }) => {
  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const dayTasks = tasks.filter(task => {
      if (!task.deadline) return false;
      const taskDate = new Date(task.deadline);
      return (
        taskDate.getFullYear() === date.getFullYear() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getDate() === date.getDate()
      );
    });

    if (dayTasks.length === 0) return null;

    return (
      <ul className="calendar-task-list">
        {dayTasks.map((task, index) => (
          <li key={index} className={task.completed ? "done" : ""}>
            {task.title}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="calendar-container">
      <h2>📅 Monatsübersicht</h2>
      <Calendar tileContent={tileContent} />
    </div>
  );
};

export default MonthlyView;
