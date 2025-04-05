// src/components/Pages/Favorites/Favorites.jsx
import React, { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext.jsx';
import { Link } from 'react-router-dom';
import '../styles/page.css';

function Favorites() {
    const { favorites } = useContext(FavoritesContext);

    return (
        <div className="favorites-container">
            <h1>Your Favorites</h1>
            
            <div className="favorites-sections">
                <div className="favorites-section">
                    <h2>Characters</h2>
                    <div className="characters-list">
                        {favorites.characters.length > 0 ? (
                            favorites.characters.map(character => (
                                <div key={character.id} className="character-card">
                                    <img
                                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                        alt={character.name}
                                        className="character-image"
                                    />
                                    <h2 className="character-title">{character.name}</h2>
                                    <Link to={`/characters/${character.id}`} className="see-more-btn">
                                        See More
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="no-results">No favorite characters yet</div>
                        )}
                    </div>
                </div>

                <div className="favorites-section">
                    <h2>Comics</h2>
                    <div className="comics-list">
                        {favorites.comics.length > 0 ? (
                            favorites.comics.map(comic => (
                                <div key={comic.id} className="comics-card">
                                    <img
                                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                        alt={comic.title}
                                        className="comics-image"
                                    />
                                    <h2 className="comics-title">{comic.title}</h2>
                                    <Link to={`/comics/${comic.id}`} className="see-more-btn">
                                        See More
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="no-results">No favorite comics yet</div>
                        )}
                    </div>
                </div>

                <div className="favorites-section">
                    <h2>Series</h2>
                    <div className="series-list">
                        {favorites.series.length > 0 ? (
                            favorites.series.map(series => (
                                <div key={series.id} className="series-card">
                                    <img
                                        src={`${series.thumbnail.path}.${series.thumbnail.extension}`}
                                        alt={series.title}
                                        className="series-image"
                                    />
                                    <h2 className="series-title">{series.title}</h2>
                                    <Link to={`/series/${series.id}`} className="see-more-btn">
                                        See More
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="no-results">No favorite series yet</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Favorites;