import React, { useState } from 'react';
import './search.css';

const SearchBar = ({ placeholder, onSearch }) => {
    const [localQuery, setLocalQuery] = useState('');

    const handleSearch = () => {
        onSearch(localQuery);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder={placeholder}
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
                Search
            </button>
        </div>
    );
};

export default SearchBar;