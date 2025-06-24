import React, { useState } from "react";
import "./MonthlyView.css";

const getCalendarWeek = (date) => {
  const tempDate = new Date(date.getTime());
  tempDate.setHours(0, 0, 0, 0);
  tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
  const yearStart = new Date(tempDate.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((tempDate - yearStart) / 86400000 + 1) / 7);
  return weekNo;
};

const MonthlyView = ({ tasks }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = (startOfMonth.getDay() + 6) % 7; // Montag = 0
  const daysInMonth = endOfMonth.getDate();

  const taskDates = tasks.map((task) => {
    const d = new Date(task.deadline);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  });

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const getMonthName = (month) =>
    new Date(0, month).toLocaleString("de-DE", { month: "long" });

  const weeks = [];
  let day = 1 - startDay;

  while (day <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++, day++) {
      if (day > 0 && day <= daysInMonth) {
        week.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
      } else {
        week.push(null);
      }
    }
    weeks.push(week);
  }

  return (
    <div className="monthly-view">

      <div className="calendar-nav">
        <button onClick={prevMonth}>«</button>

        <select
          value={currentDate.getMonth()}
          onChange={(e) => {
            const updated = new Date(currentDate);
            updated.setMonth(Number(e.target.value));
            setCurrentDate(updated);
          }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {getMonthName(i)}
            </option>
          ))}
        </select>

        <select
          value={currentDate.getFullYear()}
          onChange={(e) => {
            const updated = new Date(currentDate);
            updated.setFullYear(Number(e.target.value));
            setCurrentDate(updated);
          }}
        >
          {Array.from({ length: 11 }, (_, i) => {
            const year = today.getFullYear() - 5 + i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>

        <button onClick={nextMonth}>»</button>
      </div>

      <table className="calendar">
        <thead>
          <tr>
            <th>KW</th>
            {["MO", "DI", "MI", "DO", "FR", "SA", "SO"].map((d) => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              <td className="kw">
                {week[0] ? getCalendarWeek(week[0]) : ""}
              </td>
              {week.map((date, idx) => {
                const isToday =
                  date &&
                  date.toDateString() === today.toDateString();

                const hasTask =
                  date &&
                  taskDates.includes(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);

                return (
                  <td
                    key={idx}
                    className={`${isToday ? "today" : ""} ${
                      hasTask ? "has-task" : ""
                    }`}
                  >
                    {date ? date.getDate() : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyView;
