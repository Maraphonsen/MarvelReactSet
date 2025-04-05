import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useTheme } from '../hooks/Theme';

function Header() {
    const { isDarkTheme, toggleTheme } = useTheme();

    return (
        <header>
            <div className="container">
                <Link to="/" className="logo">
                    <img src="/marvelLogo.svg" alt="Marvel logo" />
                </Link>
                <nav className="nav">
                    <Link to="/characters" className="btnHeader">
                        Characters
                    </Link>
                    <Link to="/comics" className="btnHeader">
                        Comics
                    </Link>
                    <Link to="/series" className="btnHeader">
                        Series
                    </Link>
                    <Link to="/favourites" className="btnHeader">
                        Favourites
                    </Link>
                    <label className="theme-switch">
                        <input 
                            type="checkbox" 
                            checked={isDarkTheme} 
                            onChange={toggleTheme} 
                        />
                        <span className="slider round"></span>
                        <span className="theme-icons">
                        </span>
                    </label>
                </nav>
            </div>
        </header>
    );
}

export default Header;