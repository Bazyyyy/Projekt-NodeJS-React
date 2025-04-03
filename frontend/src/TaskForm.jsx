const TaskForm = ({ newTask, setNewTask, addTask }) => {
    return (
        <div>
            <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Neue Aufgabe"
            />
            <button onClick={addTask}>Add Task</button>
        </div>
    );
};

export default TaskForm;
