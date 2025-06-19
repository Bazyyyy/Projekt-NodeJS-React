import React from "react";

const TaskForm = ({
  newTask,
  setNewTask,
  newDeadline,
  setNewDeadline,
  addTask,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Neue Aufgabe"
        required
      />
      <input
        type="date"
        value={newDeadline}
        onChange={(e) => setNewDeadline(e.target.value)}
      />
      <button type="submit">Hinzufügen</button>
    </form>
  );
};

export default TaskForm;
