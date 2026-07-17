import { useState } from "react";
import axios from "axios";
function UploadSection({fetchFiles}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file");
            return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);
        try {
            const response = await axios.post(
                "http://localhost:3000/files/upload",
                formData
            );
            console.log(response.data);
            await fetchFiles();
            alert("File uploaded successfully!");
        } catch (err) {
            console.log(err);
            alert("Upload failed");
        }
    };
    return (
    <div className="upload-card">
    <h2 className="upload-title">
        Upload File
    </h2>
    <input
        className="file-input"
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
    />
    <button
        className="upload-btn"
        onClick={handleUpload}
    >
        Upload
    </button>
    </div>
    );
}
export default UploadSection;