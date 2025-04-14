import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const CharacterDetails = () => {
    const { store } = useContext(Context);

    const handleImgError = (event) => {
        event.target.src = 'https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/big-placeholder.jpg?raw=true';
    };

    useEffect(() => {
    }, [store.currentCharacter]);

    if (!store.currentCharacter || !store.currentCharacter.uid) {
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
                <h3>{store.currentCharacter.name}</h3>
                <div className="col-md-4">
                    <img 
                        onError={handleImgError} 
                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${store.currentCharacter.uid}.jpg`} 
                        alt={store.currentCharacter.name} 
                        className="img-fluid" 
                    />
                </div>
                <div className="col">
                    {store.currentCharacter && Object.entries(store.currentCharacter)
                        .filter(([key, _]) => key !== "name" && key !== "uid") 
                        .map(([key, value], index) => (
                            <p key={index}><strong>{key}:</strong> {value}</p>
                        ))}
                </div>
                <div className="d-flex justify-content-center">
                    <Link to={'/characters'}>
                        <span className="btn btn-secondary">Return</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
