import { useState, useEffect } from "react";
import axios from "axios";
import { FaFolderOpen } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import "./App.css";
import UploadSection from "./components/UploadSection";
import FileList from "./components/FileList";
import SearchBar from "./components/SearchBar";
function App() {
    const [files, setFiles] = useState([]);
    const [search, setSearch] = useState("");
    const fetchFiles = async (query = "") => {
    try {
        const url = query
            ? `http://localhost:3000/files/search?name=${query}`
            : "http://localhost:3000/files";

        const response = await axios.get(url);
        setFiles(response.data);
    } catch (err) {
        console.log(err);
    }
};
    useEffect(() => {
        fetchFiles();
    }, []);
    return (
        <div className="app">
        <div className="left-panel">
        <UploadSection
            fetchFiles={fetchFiles}
        />
        <FileList
            files={files}
            fetchFiles={fetchFiles}
        />
        </div>
        <div className="right-panel">
        <div className="header">
        <div className="logo">
        <FaFolderOpen className="logo-icon"/>
        <div>
            <h1 className="title">
                Secure File Vault
            </h1>
            <p className="subtitle">
                Store. Secure. Access Anytime.
            </p>
        </div>
        </div>
        </div>
        <SearchBar
            search={search}
            setSearch={setSearch}
            fetchFiles={fetchFiles}
        />
        </div>
        </div>
    );
}
export default App;