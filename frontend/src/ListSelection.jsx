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
    const listTypes = ["Einkaufsliste", "Wochen ToDo´s", "Einfach ToDo´s"];

    // Funktion, die prüft, ob die Enter-Taste gedrückt wurde
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAddList();
        }
    };

    // Funktion zum Hinzufügen der Liste, nur wenn der Typ ausgewählt wurde
    const handleAddList = () => {
        if (!newListType) {
            alert("Listentyp auswählen!"); // Warnung, wenn kein Typ ausgewählt wurde
            return;
        }
        addList();
    };

    return (
        <div>
            <input
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Neue Liste"
            />
            <select
                value={newListType}
                onChange={(e) => setNewListType(e.target.value)}
            >
                <option value="" disabled>Liste auswählen</option>
                {listTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
            <button onClick={handleAddList}>Add List</button>

            {lists.map((list) => (
                <div key={list.id} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                    <button
                        onClick={() => setSelectedListId(list.id)}
                        style={{
                            backgroundColor: selectedListId === list.id ? "lightblue" : "white",
                            marginRight: "10px",
                            color: "black",
                        }}
                    >
                        {list.title || "(Ohne Titel)"} <small style={{ marginLeft: 5, color: "gray" }}>({list.type || "Allgemein"})</small>
                    </button>
                    <button
                        onClick={() => deleteList(list.id)}
                        style={{
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            cursor: "pointer",
                        }}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ListSelection;
