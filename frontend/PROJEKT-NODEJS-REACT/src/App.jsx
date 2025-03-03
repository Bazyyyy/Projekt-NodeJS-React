import React from "react";
import "./App.css";
import TaskList from "./components/TaskList";

function App() {
    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
            <h1>📝 Meine To-Do App</h1>
            <TaskList />
        </div>
    );
}

export default App;

