import axios from "axios";
function FileList({ files, fetchFiles }) {
    const handleShare=async(id)=>{

    try{

        const token=localStorage.getItem("token");

        const response=await axios.post(

            `http://localhost:3000/files/share/${id}`,

            {},

            {

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        navigator.clipboard.writeText(response.data.link);

        alert("Share link copied to clipboard.");

    }

    catch(err){

        console.log(err);

    }

};
    const handleDownload = async (file) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `http://localhost:3000/files/download/${file._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    responseType: "blob"
                }
            );
            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );
            const link = document.createElement("a");
            link.href = url;
            link.download = file.originalName;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.log(err);
        }
    };
   const handleDelete = async (id) => {
    const ok = window.confirm(
        "Are you sure you want to delete this file?"
    );
    if (!ok) return;
    try {
        const token = localStorage.getItem("token");
        await axios.delete(
            `http://localhost:3000/files/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        await fetchFiles();
        alert("File Deleted Successfully");
    } catch (err) {
        console.log(err);
        alert("Delete Failed");
    }
};
    const handleRename = async (id) => {
    const newName = prompt("Enter new file name:");
    if (!newName) return;

    try {

        const token = localStorage.getItem("token");

        await axios.put(
            `http://localhost:3000/files/${id}`,
            {
                newName
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        await fetchFiles();

        alert("File Renamed Successfully");
    } catch (err) {
        console.log(err);
        alert("Rename Failed");
    }
};
    return (
        <div className="file-list">
            {files.map((file) => (
                <div className="file-card" key={file._id}>

                    <div className="file-info">
                        <h3 className="file-name">
                            📄 {file.originalName}
                        </h3>

                        <p className="file-date">
                            Uploaded:{" "}
                            {new Date(file.uploadedAt).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="file-actions">

                        <button
                            className="download-btn"
                            onClick={() => handleDownload(file)}
                        >
                            Download
                        </button>

                        <button
                            className="rename-btn"
                            onClick={() => handleRename(file._id)}
                        >
                            Rename
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => handleDelete(file._id)}
                        >
                            Delete
                        </button>
                        <button
                            className="share-btn"
                            onClick={()=>handleShare(file._id)}
                        >
                            Share
                        </button>

                    </div>

                </div>
            ))}
        </div>
    );
}

export default FileList;