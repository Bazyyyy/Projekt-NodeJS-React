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
    const listTypes = ["Einkaufsliste", "Wochen To Do Liste", "Einfache To Do Liste"];

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAddList();
        }
    };

    const handleAddList = () => {
        const defaultType = "Einfache To Do Liste";
        const selectedType = newListType || defaultType;
        setNewListType(selectedType);
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
                        {list.title || "(Ohne Titel)"} <small style={{ marginLeft: 5, color: "gray" }}>({list.type || "Einfache To Do´s"})</small>
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
