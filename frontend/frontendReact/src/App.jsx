import { useState, useEffect } from "react";
import axios from "axios";
import { FaFolderOpen } from "react-icons/fa";
import "./App.css";

import UploadSection from "./components/UploadSection";
import FileList from "./components/FileList";
import SearchBar from "./components/SearchBar";
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {

    const [files, setFiles] = useState([]);
    const [search, setSearch] = useState("");
    const [loggedIn, setLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    const fetchFiles = async (query = "") => {

        try {

            const token = localStorage.getItem("token");

            const url = query
                ? `http://localhost:3000/files/search?name=${query}`
                : "http://localhost:3000/files";

            const response = await axios.get(
                url,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setFiles(response.data);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (loggedIn) {
            fetchFiles();
        }
    }, [loggedIn]);

    if (!loggedIn) {
        return (
            <Login
                onLogin={() => {
                    setLoggedIn(true);
                }}
            />
        );
    }

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

                        <FaFolderOpen className="logo-icon" />

                        <div>

                            <h1 className="title">
                                Secure File Vault
                            </h1>

                            <p className="subtitle">
                                Store. Secure. Access Anytime.
                            </p>

                        </div>

                    </div>

                    <Logout
                        onLogout={() => {
                            localStorage.removeItem("token");
                            setLoggedIn(false);
                            setFiles([]);
                        }}
                    />

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