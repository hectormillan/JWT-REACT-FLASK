import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Characters = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getCharacters();
    }, []);

    const handleFavorite = (element) => {
        actions.toggleFavorite(element);
    };

    const handleImgError = (event) => {
        event.target.src = "https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/big-placeholder.jpg?raw=true";
    };

    

    return (
        <div>
            <h1 className="text-center">Characters</h1>
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                    {store.characters.map((element, index) => {
                        const isFavorite = store.favouritesList.some(fav => fav.name === element.name);

                        return (
                            <div key={index} className="col">
                                <div className="card border-dark rounded text-bg-dark" style={{ width: "100%", height: "100%" }}>
                                    <img
                                        onError={handleImgError}
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${index + 1}.jpg`}
                                        className="card-img-top"
                                        alt={element.name}
                                        style={{ height: "250px", objectFit: "cover" }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{element.name}</h5>
                                        <div className="d-flex justify-content-between align-items-center mt-auto">
                                            <Link to="/character-details/">
                                                <span onClick={() => actions.actualCharacter(index + 1)} className="btn btn-secondary">
                                                    Details
                                                </span>
                                            </Link>
                                            <span
                                                onClick={() => handleFavorite(element)}
                                                className="border border-warning rounded-circle d-flex align-items-center justify-content-center p-2"
                                                style={{ width: "40px", height: "40px", cursor: "pointer" }}
                                            >
                                                <i className={isFavorite ? "fa-solid fa-heart text-warning" : "fa-regular fa-heart text-warning"}></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
