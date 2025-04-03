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
        <div>
            <input
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Neue Liste"
            />
            <input
                value={newListType}
                onChange={(e) => setNewListType(e.target.value)}
                placeholder="Typ (z. B. Arbeit, Einkauf)"
            />
            <button onClick={addList}>Add List</button>

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
