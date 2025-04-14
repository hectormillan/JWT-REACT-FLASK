import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate, Link } from "react-router-dom";

export const Contacts = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()


    const handleEdit = (contact) => {
        actions.setCurrentContact({ ...contact });
        navigate('/edit-contacts');
    };
    const handleDelete = (id)=>{
        actions.deleteContact(id)

    }



    return (
        <div className="container">
            <h1 className="text-center">Contact list</h1>
            <span>
                <Link to="/add-contact">
                    <button className="btn btn-success mb-1">Add Contact</button>
                </Link>
            </span>
            <ul className="list-group">
                {store.contacts.map((element) => (
                    <li key={element.id} className="list-group-item d-flex align-items-center position-relative w-100">
                        <div className="position-absolute top-0 end-0 mt-2 me-2">
                            <i className="fa-solid fa-pencil mx-2 text-success" onClick={() => handleEdit(element)}></i>
                            <i className="fa-solid fa-trash mx-2 text-danger" onClick={()=>handleDelete(element.id)}></i>
                        </div>

                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJntjE-wx3gZvAJMG5V2BVbaFW8MWsPOolsw&s"
                            alt="Nahobino"
                            className="img-fluid rounded-circle"
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                        <div className="ms-3 flex-grow-1">
                            <h5 className="mb-1">{element.name}</h5>
                            <p className="mb-1">
                                <i className="fa-solid fa-location-dot me-2"></i>
                                <span style={{ fontFamily: "Arial, sans-serif" }}>{element.address}</span>
                            </p>
                            <p className="mb-1">
                                <i className="fa-solid fa-phone me-2"></i>
                                <span style={{ fontFamily: "Arial, sans-serif" }}>{element.phone}</span>
                            </p>
                            <p className="mb-0">
                                <i className="fa-solid fa-envelope me-2"></i>
                                <span style={{ fontFamily: "Arial, sans-serif" }}>{element.email}</span>
                            </p>
                        </div>
                    </li>))}
            </ul>
        </div>
    );
};
