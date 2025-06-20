import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleTaskDone, deleteTask }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 && <p>Keine Aufgaben vorhanden.</p>}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTaskDone={toggleTaskDone}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
