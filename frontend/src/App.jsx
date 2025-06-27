import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import ListSelection from "./ListSelection";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import MonthlyView from "./MonthlyView";
import PrintPage from "./PrintPage";
import "./App.css";
import AttachmentUpload from "./AttachmentUpload";
import AttachmentList from "./AttachmentList";

const API_URL = "http://localhost:5050";

const MainApp = () => {
  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newListName, setNewListName] = useState("");
  const [theme, setTheme] = useState("light");
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const navigate = useNavigate();

  const toggleTheme = () => {
    const next =
      theme === "light" ? "dark" : theme === "dark" ? "girly" : "light";
    setTheme(next);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    fetch(`${API_URL}/lists`)
      .then((res) => res.json())
      .then(setLists)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedListId) return;
    fetch(`${API_URL}/lists/${selectedListId}/tasks`)
      .then((res) => res.json())
      .then(setTasks)
      .catch(console.error);
  }, [selectedListId]);

  const addList = async () => {
    if (!newListName.trim()) return;
    const response = await fetch(`${API_URL}/lists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newListName }),
    });
    const data = await response.json();
    setLists([...lists, data]);
    setNewListName("");
  };

  const deleteList = async (id) => {
    await fetch(`${API_URL}/lists/${id}`, { method: "DELETE" });
    setLists(lists.filter((list) => list.id !== id));
    if (selectedListId === id) {
      setSelectedListId(null);
      setTasks([]);
    }
  };

  const addTask = async () => {
    if (!newTask.trim() || !selectedListId) return;
    const res = await fetch(`${API_URL}/lists/${selectedListId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask, deadline: newDeadline }),
    });
    const task = await res.json();
    setTasks([...tasks, task]);
    setNewTask("");
    setNewDeadline("");
  };

  const toggleTaskDone = async (taskId, current) => {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !current }),
    });
    const updated = await res.json();
    setTasks(tasks.map((t) => (t.id === taskId ? updated : t)));
  };

  const deleteTask = async (taskId) => {
    await fetch(`${API_URL}/tasks/${taskId}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  const progress = total > 0 ? (done / total) * 100 : 0;
  const currentList = lists.find((l) => l.id === selectedListId);

  return (
    <div className={`app-container ${theme}`}>
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle-button" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      {sidebarVisible && (
        <div className="sidebar">
          <ListSelection
            lists={lists}
            selectedListId={selectedListId}
            setSelectedListId={setSelectedListId}
            newListName={newListName}
            setNewListName={setNewListName}
            addList={addList}
            deleteList={deleteList}
            theme={theme}
          />
        </div>
      )}

      <div className="main-content">
        <h1>To-Do</h1>
        <button className="theme-toggle-button" onClick={toggleTheme}>
          {theme === "light" ? "🌞" : theme === "dark" ? "🌙" : "💖"}
        </button>

        {selectedListId && (
          <>
            <h2>{currentList?.title}</h2>
            {total > 0 && (
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${progress}%`,
                      background: progress === 100 ? "green" : "orange",
                    }}
                  />
                </div>
                <small className="progress-text">
                  ✔ {done} / {total} erledigt
                </small>
              </div>
            )}

            <TaskForm
              newTask={newTask}
              setNewTask={setNewTask}
              newDeadline={newDeadline}
              setNewDeadline={setNewDeadline}
              addTask={addTask}
            />
            <TaskList
              tasks={tasks}
              toggleTaskDone={toggleTaskDone}
              deleteTask={deleteTask}
            />
            <MonthlyView tasks={tasks} />

            <button
              className="print-button"
              onClick={() =>
                navigate("/print", {
                  state: {
                    tasks,
                    listName: currentList?.title,
                    listType: currentList?.type,
                  },
                })
              }
            >
              Drucken 🖨️
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/print" element={<PrintPage />} />
    </Routes>
  </Router>
);

export default App;
