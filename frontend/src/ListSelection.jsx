import React from "react";
import "./ListSelection.css";

const ListSelection = ({
  lists,
  selectedListId,
  setSelectedListId,
  newListName,
  setNewListName,
  newListType,
  setNewListType,
  addList,
  deleteList,
}) => {
  return (
    <div className="list-selection-container">
      <h2>📁 Listen</h2>
      <ul className="list-items">
        {lists.map((list) => (
          <li
            key={list.id}
            className={`list-item ${
              selectedListId === list.id ? "active" : ""
            }`}
            onClick={() => setSelectedListId(list.id)}
          >
            {list.title}
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                deleteList(list.id);
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <div className="add-list-form">
        <input
          type="text"
          placeholder="Neue Liste"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <select
          value={newListType}
          onChange={(e) => setNewListType(e.target.value)}
        >
          <option value="">Typ wählen</option>
          <option value="Einfache To-Do-Liste">Einfache To-Do-Liste</option>
          <option value="Einkaufsliste">🛒 Einkaufsliste</option>
          <option value="Tägliche Aufgaben">📅 Tägliche Aufgaben</option>
        </select>
        <button onClick={addList}>➕ Hinzufügen</button>
      </div>
    </div>
  );
};

export default ListSelection;
