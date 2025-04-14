import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    
    const handleEdit = () => {
        navigate("/edit-profile")
    }

    return (
        <ul className="list-group">
            <li className="list-group-item d-flex align-items-center position-relative w-100">
                <div className="position-absolute top-0 end-0 mt-2 me-2">
                    <i className="fa-solid fa-pencil mx-2 text-success" onClick={() => handleEdit(store.user)}></i>
                </div>
                
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJntjE-wx3gZvAJMG5V2BVbaFW8MWsPOolsw&s"
                    alt="Nahobino"
                    className="img-fluid rounded-circle"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <div className="ms-3 flex-grow-1">
                    <h5 className="mb-1">{store.user.first_name} {store.user.last_name}</h5>
                    
                    <p className="mb-0">
                        <i className="fa-solid fa-envelope me-2"></i>
                        <span style={{ fontFamily: "Arial, sans-serif" }}>{store.user.email}</span>
                    </p>
                </div>
            </li>
        </ul>
    );
};
