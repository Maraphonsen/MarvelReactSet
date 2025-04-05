import React, { useEffect, useState, useContext } from 'react';
import { getComics, searchComics } from '../../../API/MarvelApi.jsx';
import '../styles/page.css';
import SearchBar from '../../Search/SearchBar.jsx';
import { Link } from 'react-router-dom';
import Pagination from '../../Pagination/Pagination.jsx';
import { FavoritesContext } from '../../context/FavoritesContext.jsx';

function Comics() {
    const [allComics, setAllComics] = useState([]);
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
        const fetchComics = async () => {
            setIsLoading(true);
            try {
                const offset = (currentPage - 1) * itemsPerPage;
                const { comics: comicsData, total } = await getComics(itemsPerPage, offset);
                setAllComics(comicsData);
                setTotalPages(Math.ceil(total / itemsPerPage));
            } catch (error) {
                setError('Failed to load data. Please try again later.');
                console.error('Error fetching comics:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!searchQuery) {
            fetchComics();
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
            const results = await searchComics(query);
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

    const displayComics = searchQuery ? searchResults : allComics;
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
        <div className="comics-container">
            <SearchBar
                placeholder="Search comics..."
                onSearch={handleSearch}
            />
            
            <div className="comics-list">
                {displayComics.length > 0 ? (
                    displayComics.map((comic) => (
                        <div key={comic.id} className="comics-card">
                            <img
                                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                alt={comic.title}
                                className="comics-image"
                            />
                            <h2 className="comics-title">{comic.title}</h2>
                            <div className="card-actions">
                                <Link to={`/comics/${comic.id}`} className="see-more-btn">
                                    See More
                                </Link>
                                <button 
                                    className={`favorite-btn ${isFavorite('comics', comic.id) ? 'active' : ''}`}
                                    onClick={() => toggleFavorite('comics', comic)}
                                    aria-label={isFavorite('comics', comic.id) ? "Remove from favorites" : "Add to favorites"}
                                >
                                    ♥
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    !isSearching && <div className="no-results">No comics found</div>
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

export default Comics;