import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskForm = ({ newTask, setNewTask, newDeadline, setNewDeadline, addTask }) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTask();
        }
    };

    return (
        <div className="task-form">
            <input
                className="task-input"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Neue Aufgabe"
            />
            <DatePicker
                selected={newDeadline ? new Date(newDeadline) : null}
                onChange={(date) => {
                    const isoDate = date ? date.toISOString().split("T")[0] : "";
                    setNewDeadline(isoDate);
                }}
                placeholderText="Deadline wählen"
                dateFormat="yyyy-MM-dd"
                className="react-datepicker-input"
            />
            <button className="add-task-button" onClick={addTask}>
                +
            </button>
        </div>
    );
};

export default TaskForm;
