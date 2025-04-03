const TaskItem = ({ task, toggleTaskDone, deleteTask }) => {
  return (
      <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskDone(task.id, task.completed)}
          />
          <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.title}
          </span>
          <button
              onClick={() => deleteTask(task.id)}
              style={{ backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
          >
              🗑️
          </button>
      </li>
  );
};

export default TaskItem;
