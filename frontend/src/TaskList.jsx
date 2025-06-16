import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, toggleTaskDone, deleteTask, selectedDate }) => (
  <ul>
    {(!tasks || tasks.length === 0) ? (
      <li>Noch keine Aufgaben vorhanden.</li>
    ) : (
      tasks.map(task => (
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
