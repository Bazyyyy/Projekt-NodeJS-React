import "./ListSelection.css";
import React from 'react';


const ListSelection = ({
    lists,
    selectedListId,
    setSelectedListId,
    newListName,
    setNewListName,
    addList,
    deleteList,
}) => {

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAddList();
        }
    };

    const handleAddList = () => {
        addList();
    };

    return (
        <div className="list-selection-container">
            <input
                className="list-selection-input"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Neue Liste"
            />
     
            <button
                className="list-selection-add-button"
                onClick={handleAddList}
            >
                Liste hinzufügen
            </button>

            {lists.map((list) => (
                <div key={list.id} className="list-selection-item">
                    <button
                        className={`select-button ${
                            selectedListId === list.id ? "selected" : ""
                        }`}
                        onClick={() => setSelectedListId(list.id)}
                    >
                        {list.title || "(Ohne Titel)"}
                    </button>
                    <button
                        className="delete-button"
                        onClick={() => deleteList(list.id)}
                    >-</button>
                </div>
            ))}
        </div>
    );
};

export default ListSelection;
