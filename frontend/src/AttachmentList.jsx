import React, { useEffect, useState } from "react";
import "./AttachmentPreview.css"; // Wir erstellen gleich dieses CSS

function AttachmentList({ taskId }) {
  const [attachments, setAttachments] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5050/tasks/${taskId}/attachments`)
      .then((res) => res.json())
      .then(setAttachments)
      .catch((err) => console.error("Fehler beim Laden der Anhänge:", err));
  }, [taskId]);

  if (attachments.length === 0) return null;

  return (
    <>
      <ul style={{ marginTop: "0.5rem" }}>
        {attachments.map((att) => {
          const fileName = att.name || att.file_name || "Unbenannt";
          const isImage = att.type?.startsWith("image/");

          return (
            <li key={att.id}>
              📎 <strong>{fileName}</strong>{" "}
              {isImage ? (
                <button onClick={() => setPreviewUrl(`http://localhost:5050${att.path}`)}>
                  🔍 Vorschau
                </button>
              ) : (
                <a
                  href={`http://localhost:5050${att.path}`}
                  download
                  rel="noopener noreferrer"
                  style={{ marginLeft: "1rem", color: "blue" }}
                >
                  ⬇️ Herunterladen
                </a>
              )}
            </li>
          );
        })}
      </ul>

      {previewUrl && (
        <div className="lightbox" onClick={() => setPreviewUrl(null)}>
          <div className="overlay" />
          <img src={previewUrl} alt="Bildvorschau" className="lightbox-image" />
        </div>
      )}
    </>
  );
}

export default AttachmentList;
