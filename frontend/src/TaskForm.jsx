import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskForm = ({ newTask, setNewTask, newDeadline, setNewDeadline, addTask }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
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
            <button onClick={addTask}>Add Task</button>
        </div>
    );
};

export default TaskForm;
