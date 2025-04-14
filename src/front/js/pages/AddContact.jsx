import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const AddContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmitAdd = async (event) => {
        event.preventDefault();
        const newContact ={name, phone, email, address}
        await actions.addContact(newContact)
        navigate('/contacts'); 
    };

    return (
        <div className="container">
            <h1 className="text-center">Add Contact</h1>
            <form onSubmit={handleSubmitAdd}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name"
                        value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input type="text" className="form-control" id="phone"
                        value={phone} onChange={(event) => setPhone(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email"
                        value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address"
                        value={address} onChange={(event) => setAddress(event.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Add contact</button>
            </form>
        </div>
    );
};