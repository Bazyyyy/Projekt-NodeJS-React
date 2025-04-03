const TaskItem = ({ task, toggleTaskDone, deleteTask }) => {
  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !task.completed;

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
              <small style={{ marginLeft: '26px', color: isOverdue ? 'red' : '#666' }}>
                  📅 Deadline: {task.deadline} {isOverdue ? '⏰ Überfällig!' : ''}
              </small>
          )}
      </li>
  );
};

export default TaskItem;
