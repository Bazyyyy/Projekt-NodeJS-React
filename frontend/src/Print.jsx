const Print = ({ selectedList, tasks }) => {
    return (
        <div style={{ display: "none" }} id="print-section">
            {selectedList ? (
                <div>
                    <h1>Liste: {selectedList.title}</h1>
                    <h2>Tasks:</h2>
                    <ul>
                        {tasks.map(task => (
                            <li key={task.id}>
                                {task.title} - Deadline: {task.deadline || "Keine"}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Keine Liste ausgewählt</p>
            )}
        </div>
    );
};

export default Print;
