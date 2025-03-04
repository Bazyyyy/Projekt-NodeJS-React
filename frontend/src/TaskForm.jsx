import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title);
            setTitle("");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "10px" }}>
            <input 
                type="text" 
                placeholder="Neue Aufgabe..." 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                
            />
            <button type="submit">Hinzufügen</button>
        </form>
    );
};

export default TaskForm;
