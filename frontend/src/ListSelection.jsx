import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/lists";

const ListSelection = ({ setSelectedList }) => {
    const [lists, setLists] = useState([]);
    const [newListTitle, setNewListTitle] = useState("");

    // Fetch all lists
    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`Failed to fetch lists: ${response.statusText}`);
                }

                const data = await response.json();
                setLists(data);
            } catch (err) {
                console.error("Error fetching lists:", err);
            }
        };

        fetchLists();
    }, []);

    // Create a new list
    const createNewList = async () => {
        if (!newListTitle.trim()) return;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newListTitle }),
            });

            if (!response.ok) {
                throw new Error(`Failed to create list: ${response.statusText}`);
            }

            const newList = await response.json();
            setLists([...lists, newList]);
            setNewListTitle("");
        } catch (err) {
            console.error("Error creating new list:", err);
        }
    };

    return (
        <div>
            <h2>Select a List</h2>
            <ul>
                {lists.map((list) => (
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
                placeholder="Create a new list..."
            />
            <button onClick={createNewList}>➕</button>
        </div>
    );
};

export default ListSelection;
