import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const PlanetDetails = () => {
    const { store } = useContext(Context);

    const handleImgError = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
    };

    if (!store.currentPlanet || !store.currentPlanet.uid) {
        return (
            <div className="container">
                <div className="row align-items-center">
                    <h3>Loading...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row align-items-start">
                <h3>{store.currentPlanet.name}</h3>
                <div className="col-md-4">
                    <img 
                        onError={handleImgError} 
                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/planets/${store.currentPlanet.uid}.jpg`} 
                        alt={store.currentPlanet.name} 
                        className="img-fluid" 
                    />
                </div>
                <div className="col">
                    {store.currentPlanet && Object.entries(store.currentPlanet)
                        .filter(([key, _]) => key !== "name" && key !== "uid") 
                        .map(([key, value], index) => (
                            <p key={index}><strong>{key}:</strong> {value}</p>
                        ))}
                </div>
                <div className="d-flex justify-content-center">
                    <Link to={'/planets'}>
                        <span className="btn btn-secondary">Return</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
