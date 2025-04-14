import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    const handleLogoutButton = (event) => {
        event.preventDefault()
        actions.setIsLogged(false)
        actions.setIsAdmin(false)
        actions.setUser("Guest")
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/login")
    }
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-flex d-flex col justify-content-between">
                <div className="m-2">
                    <Link to="/">
                        <img height={"40"} src="https://starwars.chocobar.net/star-wars-logo.png" alt="" />
                    </Link>
                </div>
                <div className="">
                    {store.isLogged == true ? <Link to="/profile"><span className="navbar-brand">Profile</span></Link> : ""}
                    
                    <Link to="/sign-up">
                        <span className="navbar-brand">Sign Up</span>
                    </Link>
                    {store.isLogged == true ? <span type="button" onClick={handleLogoutButton} className="navbar-brand">Logout</span> : <Link to="/login"><span className="navbar-brand">Login</span></Link>}
                    <Link to="/contacts">
                        <span className="navbar-brand">Contacts</span>
                    </Link>
                    <Link to="/characters">
                        <span className="navbar-brand">Characters</span>
                    </Link>
                    <Link to="/planets">
                        <span className=" navbar-brand">Planets</span>
                    </Link>
                    <Link to="/species">
                        <span className="navbar-brand">Species</span>
                    </Link>
                    <div className="dropdown navbar-brand d-inline-block">
                        <button className="btn btn-secondary position-relative dropdown-toggle" type="button" data-bs-toggle="dropdown">
                            Favorites
                            {store.favouritesList.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {store.favouritesList.length}
                                </span>
                            )}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            {store.favouritesList.length === 0 ? (
                                <li className="dropdown-item">No favorites added</li>
                            ) : (
                                store.favouritesList.map((fav, index) => (
                                    <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                                        {fav.name}
                                        <i
                                            className="fa-solid fa-trash text-danger"
                                            onClick={() => actions.removeFavorite(fav.name)}
                                            style={{ cursor: "pointer" }}
                                        ></i>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};
