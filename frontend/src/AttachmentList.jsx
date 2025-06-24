import React, { useEffect, useState } from "react";

function AttachmentList({ taskId }) {
  const [attachments, setAttachments] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
  console.log("Vorschau-URL:", previewUrl);
}, [previewUrl]);


  useEffect(() => {
    fetch(`http://localhost:5050/tasks/${taskId}/attachments`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Geladene Anhänge:", data);
        setAttachments(data);
      })
      .catch((err) => console.error("Fehler beim Laden der Anhänge:", err));
  }, [taskId]);

  if (attachments.length === 0) return null;

  return (
    <>
      <ul style={{ marginTop: "0.5rem" }}>
        {attachments.map((att) => {
          const fileType = att.type || att.file_type || "";
          const fileName = att.name || att.file_name || "Unbenannt";
          const isImage = 
            att.type?.startsWith("image/") ||
            att.name?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ||
            att.file_name?.match(/\.(jpg|jpeg|png|gif|gif|webp)$/i);
          const isPDF = fileType === "application/pdf" || fileName.toLowerCase().endsWith(".pdf");
          const canPreview = isImage || isPDF;

          return (
            <li key={att.id}>
              📎 <strong>{fileName}</strong>{" "}
              {canPreview ? (
                <button
                  onClick={() => {
                  const path = att.path || att.file_path;
                  if (path) setPreviewUrl(`http://localhost:5050${path}`);
                  else console.warn("Kein gültiger Pfad vorhanden für:", att);
                    }}
                    >
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
  <div
    onClick={() => setPreviewUrl(null)}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
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
        style={{
          width: "90vw",
          height: "90vh",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 0 20px black",
          backgroundColor: "white",
        }}
        title="PDF-Vorschau"
      />
    ) : (
      <img
        src={previewUrl}
        alt="Bildvorschau"
        style={{
          maxWidth: "90vw",
          maxHeight: "90vh",
          borderRadius: "8px",
          boxShadow: "0 0 20px black",
        }}
      />
    )}
  </div>
)}

    </>
  );
}

export default AttachmentList;
