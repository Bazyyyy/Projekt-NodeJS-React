import React, {useState} from "react";

function AttachmentUpload({taskId, onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

        const handleUpload= async (e) => {
            e.preventDefault();
            if (!file) return;
        
            const formData = new FormData();
            formData.append("file", file);
            setUploading(true);

        try {
            const res = await fetch(`http://localhost:5050/tasks/${taskId}/attachments`, {
                method: "POST",
                body: formData,
            });

            let data = {};
            try {
                data = await res.json();
            }   catch {
                alert("Der Server hat keine gültige JSON-Antwort geschickt.");
                return;
            }
            if (res.ok) {
                onUploadSuccess?.(data);
                setFile(null);
            }   else {
                alert("Upload fehlgeschlagen: " + data.error);
            }
        }   catch (err) {
            alert("Fehler beim Upload: " + err.message);
        }   finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleUpload}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit" disabled={!file || uploading}>
                {uploading ? "Wird hochgeladen..." : " 📎 Anhängen"}
            </button>
        </form>
    );
}

export default AttachmentUpload;