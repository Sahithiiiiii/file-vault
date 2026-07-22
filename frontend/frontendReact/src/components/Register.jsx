import { useState } from "react";
import axios from "axios";
function Register({ onBack }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            return alert("Please fill all fields");
        }
        if (password !== confirmPassword) {
            return alert("Passwords do not match");
        }
        try {
            const response = await axios.post(
                "http://localhost:3000/auth/register",
                {
                    name,
                    email,
                    password
                }
            );
            alert(response.data.message);
            onBack();
        } catch (err) {
            console.log(err);
            alert(
                err.response?.data?.message ||
                "Registration Failed"
            );
        }
    };
    return (
        <div className="login-container">
            <h1>Create Account</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
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
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
            />
            <button onClick={handleRegister}>
                Register
            </button>
            <p>
                Already have an account?
                <span
                    style={{
                        color:"blue",
                        cursor:"pointer",
                        marginLeft:"5px"
                    }}
                    onClick={onBack}
                >
                    Login
                </span>
            </p>
        </div>
    );
}
export default Register;