import { useState } from "react";
import axios from "axios";
import Register from "./Register";
function Login({ onLogin }) {
    const [showRegister, setShowRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/auth/login",
                {
                    email,
                    password
                }
            );
            localStorage.setItem(
                "token",
                response.data.token
            );
            onLogin();
        }
        catch(err){
            console.log(err);
            alert(
                err.response?.data?.message ||
                "Login Failed"
            );
        }
    };
    if(showRegister){
        return (
            <Register
                onBack={() => setShowRegister(false)}
            />
        );
    }
    return (
        <div className="login-container">
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <button
                onClick={handleLogin}
            >
                Login
            </button>
            <p>
                Don't have an account?
                <span
                    style={{
                        color:"blue",
                        cursor:"pointer",
                        marginLeft:"5px"
                    }}
                    onClick={() => setShowRegister(true)}
                >
                    Register
                </span>
            </p>
        </div>
    );
}
export default Login;