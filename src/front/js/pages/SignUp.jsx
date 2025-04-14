import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            setSuccess("Account created successfully! Redirecting...");
            setTimeout(() => navigate("/login"), 2000);
        } else {
            setError(data.message || "Error signing up. Try again.");
        }
    };

    return (
        <div className="container col-xl-3 d-flex justify-content-center mt-4">
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
                <h2 className="text-center mb-3">Sign Up</h2>
                
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="InputEmail" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="InputPassword" 
                        placeholder="Create a password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}

                <button type="submit" className="btn btn-primary w-100">Sign up</button>
            </form>
        </div>
    );
};
