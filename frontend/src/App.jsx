import React from "react";
import TaskList from "./components/TaskList";
import "./App.css";


function App() {
    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
            <h1>📝 Meine To-Do App</h1>
            <TaskList />
        </div>
    );
}

export default App;
