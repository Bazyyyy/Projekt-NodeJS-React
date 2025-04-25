import React from 'react';  // <- hinzufügen!
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleTaskDone, deleteTask, selectedDate }) => {
    if (tasks.length === 0) {
        return <p>Noch keine Aufgaben vorhanden.</p>;
    }

    return (
        <ul>
            {tasks.map((task) => (
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
