import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3000/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem("token", response.data.token);

            alert("Login Successful");

            if (onLogin) {
                onLogin();
            }
        } catch (err) {
            console.error(err);
            alert("Invalid Email or Password");
        }
    }

    return (
        <div className="login-container">
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;