import React, { useEffect, useState } from "react";

function AttachmentList({ taskId }) {
  const [attachments, setAttachments] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5050/tasks/${taskId}/attachments`)
      .then((res) => res.json())
      .then(setAttachments)
      .catch((err) =>
        console.error("Fehler beim Laden der Anhänge:", err)
      );
  }, [taskId]);

  const deleteAttachment = async (attachmentId) => {
    await fetch(`http://localhost:5050/attachments/${attachmentId}`, {
      method: "DELETE",
    });
    setAttachments((prev) =>
      prev.filter((att) => att.id !== attachmentId)
    );
  };

  if (attachments.length === 0) return null;

  return (
    <>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          gap: "0.3rem",
          flexWrap: "wrap",
        }}
      >
        {attachments.map((att) => {
          const fileType = att.type || att.file_type || "";
          const fileName = att.name || att.file_name || "Unbenannt";
          const isImage =
            fileType.startsWith("image/") ||
            fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i);
          const isPDF =
            fileType === "application/pdf" ||
            fileName.toLowerCase().endsWith(".pdf");
          const canPreview = isImage || isPDF;
          const path = att.path || att.file_path;

          return (
            <li
              key={att.id}
              className="attachment-item"
              title={fileName}
            >
              {canPreview ? (
                <button
                  onClick={() => path && setPreviewUrl(`http://localhost:5050${path}`)}
                  style={{ fontSize: "0.7rem", background: "none", border: "none", cursor: "pointer" }}
                >
                  🔍
                </button>
              ) : (
                <a
                  href={`http://localhost:5050${path}`}
                  download
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.7rem", color: "#007bff", textDecoration: "none" }}
                >
                  ⬇️
                </a>
              )}
              <button
                onClick={() => deleteAttachment(att.id)}
                style={{ fontSize: "0.7rem", background: "none", border: "none", color: "crimson", cursor: "pointer" }}
              >
                ❌
              </button>
            </li>
          );
        })}
      </ul>

      {previewUrl && (
        <div
          onClick={() => setPreviewUrl(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            cursor: "zoom-out",
          }}
        >
          {previewUrl.toLowerCase().endsWith(".pdf") ? (
            <iframe
              src={previewUrl}
              title="PDF-Vorschau"
              style={{
                width: "85vw",
                height: "85vh",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "white",
              }}
            />
          ) : (
            <img
              src={previewUrl}
              alt="Bildvorschau"
              style={{
                maxWidth: "85vw",
                maxHeight: "85vh",
                borderRadius: "8px",
              }}
            />
          )}
        </div>
      )}
    </>
  );
}

export default AttachmentList;
