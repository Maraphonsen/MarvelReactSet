// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Pages/Home/Home';
import Characters from './components/Pages/Characters/Characters';
import Series from './components/Pages/Series/Series';
import Comics from './components/Pages/Comics/Comics';
import CharacterDetails from './components/Pages/Characters/CharacterDetails';
import SeriesDetails from './components/Pages/Series/SeriesDetails';
import ComicsDetails from './components/Pages/Comics/ComicsDetails';
import Favorites from './components/Pages/Favorites/Favorites';
import { FavoritesProvider } from './components/context/FavoritesContext';

function App() {
    return (
        <FavoritesProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/characters" element={<Characters />} />
                    <Route path="/series" element={<Series />} />
                    <Route path="/comics" element={<Comics />} />
                    <Route path="/characters/:id" element={<CharacterDetails />} />
                    <Route path="/series/:id" element={<SeriesDetails />} />
                    <Route path="/comics/:id" element={<ComicsDetails />} />
                    <Route path="/favourites" element={<Favorites />} />
                </Routes>
                <Footer />
            </Router>
        </FavoritesProvider>
    );
}

export default App;