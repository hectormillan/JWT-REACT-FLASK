import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSend = { email, password }
        actions.login(dataToSend);
        navigate("/");
    };
    
    return (
        <div className="container col-xl-3 d-flex justify-content-center mt-4">
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
                <h2 className="text-center mb-3">Login</h2>
                
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="InputEmail" 
                        placeholder="Your email" 
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
                        placeholder="Your password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="text-danger">{error}</p>}

                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
};
