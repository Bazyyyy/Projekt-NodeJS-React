import TaskItem from "./TaskItem";
import Print from "./print.jsx";

const TaskList = ({ tasks, toggleTaskDone, deleteTask }) => {
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
                />
            ))}
        </ul>
    );
};

export default TaskList;
