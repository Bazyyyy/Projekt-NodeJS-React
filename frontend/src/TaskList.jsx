import React from "react";
import TaskItem from "./TaskItem";
import AttachmentList from "./AttachmentList";
import AttachmentUpload from "./AttachmentUpload";

const TaskList = ({ tasks, toggleTaskDone, deleteTask }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 && <p>Keine Aufgaben vorhanden.</p>}
      {tasks.map((task) => (
        <div key={task.id} className="task-with-attachments">
          <TaskItem
            task={task}
            toggleTaskDone={toggleTaskDone}
            deleteTask={deleteTask}
          />
          <AttachmentUpload
            taskId={task.id}
            onUploadSuccess={() => {
              console.log("Upload abgeschlossen für Task", task.id);
              // Optional: Taskliste neu laden oder andere Aktion
            }}
          />
          <AttachmentList taskId={task.id} />
        </div>
      ))}
    </div>
  );
};


export default TaskList;
