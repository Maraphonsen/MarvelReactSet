// src/context/FavoritesContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState({
        characters: [],
        comics: [],
        series: []
    });

    useEffect(() => {
        const savedFavorites = localStorage.getItem('marvelFavorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const updateFavorites = (newFavorites) => {
        setFavorites(newFavorites);
        localStorage.setItem('marvelFavorites', JSON.stringify(newFavorites));
    };

    const toggleFavorite = (type, item) => {
        const newFavorites = { ...favorites };
        const index = newFavorites[type].findIndex(fav => fav.id === item.id);
        
        if (index === -1) {
            newFavorites[type].push(item);
        } else {
            newFavorites[type].splice(index, 1);
        }
        
        updateFavorites(newFavorites);
    };

    const isFavorite = (type, id) => {
        return favorites[type].some(item => item.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};