import React, { useEffect, useState } from 'react';
import { getSeries, searchSeries } from '../../../API/MarvelApi.jsx';
import '../styles/page.css';
import SearchBar from '../../Search/SearchBar.jsx';
import { Link } from 'react-router-dom';
import Pagination from '../../Pagination/Pagination.jsx';

function Series() {
    const [allSeries, setAllSeries] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const itemsPerPage = 20;

    useEffect(() => {
        const fetchSeries = async () => {
            setIsLoading(true);
            try {
                const offset = (currentPage - 1) * itemsPerPage;
                const { series: seriesData, total } = await getSeries(itemsPerPage, offset);
                setAllSeries(seriesData);
                setTotalPages(Math.ceil(total / itemsPerPage));
            } catch (error) {
                setError('Failed to load data. Please try again later.');
                console.error('Error fetching series:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!searchQuery) {
            fetchSeries();
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
            const results = await searchSeries(query);
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

    const displaySeries = searchQuery ? searchResults : allSeries;
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
        <div className="series-container">
            <SearchBar
                placeholder="Search series..."
                onSearch={handleSearch}
            />
            
            <div className="series-list">
                {displaySeries.length > 0 ? (
                    displaySeries.map((item) => (
                        <div key={item.id} className="series-card">
                            <img
                                src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                                alt={item.title}
                                className="series-image"
                            />
                            <h2 className="series-title">{item.title}</h2>
                            <Link to={`/series/${item.id}`} className="see-more-btn">
                                See More
                            </Link>
                        </div>
                    ))
                ) : (
                    !isSearching && <div className="no-results">No series found</div>
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

export default Series;