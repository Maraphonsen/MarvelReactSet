import React, { useEffect, useState, useContext } from 'react';
import { getCharacters, searchCharacters } from '../../../API/MarvelApi.jsx';
import '../styles/page.css';
import SearchBar from '../../Search/SearchBar.jsx';
import { Link } from 'react-router-dom';
import Pagination from '../../Pagination/Pagination.jsx';
import { FavoritesContext } from '../../context/FavoritesContext.jsx';

function Characters() {
    const [allCharacters, setAllCharacters] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const itemsPerPage = 20;

    const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

    useEffect(() => {
        const fetchCharacters = async () => {
            setIsLoading(true);
            try {
                const offset = (currentPage - 1) * itemsPerPage;
                const { characters: charsData, total } = await getCharacters(itemsPerPage, offset);
                setAllCharacters(charsData);
                setTotalPages(Math.ceil(total / itemsPerPage));
            } catch (error) {
                setError('Failed to load data. Please try again later.');
                console.error('Error fetching characters:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!searchQuery) {
            fetchCharacters();
        }
    }, [currentPage, searchQuery]);

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (!query) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const results = await searchCharacters(query);
            setSearchResults(results);
            setCurrentPage(1);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const displayCharacters = searchQuery ? searchResults : allCharacters;
    const showPagination = !searchQuery && totalPages > 1;

    if (isLoading && !searchQuery) {
        return (
            <div className="loading-container">
                <div className="loading"></div>
            </div>
        );
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="characters-container">
            <SearchBar
                placeholder="Search characters..."
                onSearch={handleSearch}
            />
            
            <div className="characters-list">
                {displayCharacters.length > 0 ? (
                    displayCharacters.map((character) => (
                        <div key={character.id} className="character-card">
                            <img
                                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                alt={character.name}
                                className="character-image"
                            />
                            <h2 className="character-title">{character.name}</h2>
                            <div className="card-actions">
                                <Link to={`/characters/${character.id}`} className="see-more-btn">
                                    See More
                                </Link>
                                <button 
                                    className={`favorite-btn ${isFavorite('characters', character.id) ? 'active' : ''}`}
                                    onClick={() => toggleFavorite('characters', character)}
                                    aria-label={isFavorite('characters', character.id) ? "Remove from favorites" : "Add to favorites"}
                                >
                                    ♥
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    !isSearching && <div className="no-results">No characters found</div>
                )}
            </div>

            {showPagination && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}

export default Characters;