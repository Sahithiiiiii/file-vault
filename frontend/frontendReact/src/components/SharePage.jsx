import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function SharePage() {
    const { token } = useParams();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        fetchFile();
    }, []);
    const fetchFile = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/files/share/${token}`
            );
            setFile(response.data);
        }
        catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            }
            else {
                setError("Server Error");
            }
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return <h2>Loading...</h2>;
    }
    if (error) {
        return <h2>{error}</h2>;
    }
    return (
        <div
            style={{
                textAlign: "center",
                marginTop: "100px"
            }}
        >
            <h1>Shared File</h1>
            <h2>{file.originalName}</h2>
            <p>
                Size :
                {" "}
                {(file.size / 1024).toFixed(2)}
                {" "}
                KB
            </p>
            <button>
                Download
            </button>
        </div>
    );
}
export default SharePage;