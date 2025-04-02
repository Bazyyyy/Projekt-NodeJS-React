import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/lists"; // Stelle sicher, dass dies deine API-URL ist

const ListSelection = ({ setSelectedList }) => {
    const [lists, setLists] = useState([]);
    const [newListTitle, setNewListTitle] = useState("");

    // Abrufen aller Listen
    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setLists(data);
            } catch (err) {
                console.error("Fehler beim Laden der Listen:", err);
            }
        };
        fetchLists();
    }, []);

    // Neue Liste erstellen
    const createNewList = async () => {
        if (!newListTitle.trim()) return;

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newListTitle }),
        });

        const newList = await response.json();
        setLists([...lists, newList]);
        setNewListTitle("");
    };

    return (
        <div>
            <h2>Wähle eine Liste</h2>
            <ul>
                {lists.map(list => (
                    <li key={list.id}>
                        <button onClick={() => setSelectedList(list.id)}>
                            {list.title}
                        </button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                placeholder="Neue Liste erstellen..."
            />
            <button onClick={createNewList}>➕</button>
        </div>
    );
};

export default ListSelection;
