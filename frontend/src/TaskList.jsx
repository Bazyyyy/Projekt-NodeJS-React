import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

const TaskList = ({ toggleTaskDone, deleteTask, selectedDate }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Fehler beim Laden:', error));
  }, []);

  if (tasks.length === 0) {
    return <p>Noch keine Aufgaben vorhanden.</p>;
  }

  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTaskDone={toggleTaskDone}
          deleteTask={deleteTask}
          isSelected={task.deadline === selectedDate}
        />
      ))}
    </ul>
  );
};

export default TaskList;
