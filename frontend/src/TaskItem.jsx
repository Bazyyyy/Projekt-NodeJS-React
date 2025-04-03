const TaskItem = ({ task, toggleTaskDone, deleteTask }) => {
  const today = new Date();
  const deadlineDate = task.deadline ? new Date(task.deadline) : null;

  const isOverdue = deadlineDate && deadlineDate < today && !task.completed;
  const isSoon = deadlineDate && deadlineDate >= today && (deadlineDate - today) / (1000 * 60 * 60 * 24) < 3 && !task.completed;

  const getDeadlineStyle = () => {
      if (isOverdue) return { color: "red" };
      if (isSoon) return { color: "orange" };
      return { color: "#666" };
  };

  return (
      <li style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
          </div>
          {task.deadline && (
              <small style={{ marginLeft: '26px', ...getDeadlineStyle() }}>
                  📅 Deadline: {task.deadline}
                  {isOverdue && ' ⏰ Überfällig!'}
                  {isSoon && ' ⚠️ bald fällig'}
              </small>
          )}
      </li>
  );
};

export default TaskItem;