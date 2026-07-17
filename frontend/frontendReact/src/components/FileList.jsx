import { useState, useEffect } from "react";
import axios from "axios";
function FileList({files,fetchFiles}) {
    const handleDownload=(id) => {
        window.open(`http://localhost:3000/files/download/${id}`);
    }
    const handleDelete = async (id) => {
    const ok = window.confirm(
        "Are you sure you want to delete this file?"
    );
    if (!ok) return;
    try {
        await axios.delete(
            `http://localhost:3000/files/${id}`
        );
        await fetchFiles();
    } catch (err) {
        console.log(err);
    }
    };
    const handleRename = async (id) => {
    const newName = prompt("Enter new file name:");
    if (!newName) return;
    try {
        await axios.put(
            `http://localhost:3000/files/${id}`,
            {
                newName
            }
        );
        await fetchFiles();
    } catch (err) {
        console.log(err);
    }
    };
    return (
    <div className="file-list">
    {files.map((file) => (
        <div className="file-card" key={file.id}>
            <div className="file-info">
                <h3 className="file-name">
                    📄 {file.originalName}
                </h3>
                <p className="file-date">
                    Uploaded:
                    {" "}
                    {new Date(file.uploadedAt).toLocaleDateString()}
                </p>
            </div>
            <div className="file-actions">
                <button
                    className="download-btn"
                    onClick={() => handleDownload(file.id)}
                >
                    Download
                </button>
                <button
                    className="rename-btn"
                    onClick={() => handleRename(file.id)}
                >
                    Rename
                </button>
                <button
                    className="delete-btn"
                    onClick={() => handleDelete(file.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    ))}
    </div>
    );
}
export default FileList;