import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
    getCharacterById, 
    getCharacterComics,
    getCharacterSeries 
} from '../../../API/MarvelApi';
import '../styles/details.css';
import RelatedItems from '../../Related/RelatedItems';

const CharacterDetails = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [comics, setComics] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [charData, comicsData, seriesData] = await Promise.all([
                    getCharacterById(id),
                    getCharacterComics(id, 10),
                    getCharacterSeries(id, 10)
                ]);
                
                setCharacter(charData);
                setComics(comicsData);
                setSeries(seriesData);
            } catch (err) {
                setError('Failed to load character data. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error">
                {error}
                <div style={{ marginTop: '20px' }}>
                    <Link to="/characters" className="back-button">
                        ← Back to Characters
                    </Link>
                </div>
            </div>
        );
    }

    if (!character) {
        return (
            <div className="error">
                Character not found
                <div style={{ marginTop: '20px' }}>
                    <Link to="/characters" className="back-button">
                        ← Back to Characters
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="details-container">
            <Link to="/characters" className="back-button">← Back to Characters</Link>
            
            <div className="details-content">
                <div className="details-poster">
                    <img
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt={character.name}
                        className="poster-image"
                        onError={(e) => {
                            e.target.src = '/placeholder-character.jpg';
                        }}
                    />
                </div>
                
                <div className="details-info">
                    <h1>{character.name}</h1>
                    
                    {character.description && (
                        <div className="details-description">
                            <h3>Description</h3>
                            <p>{character.description}</p>
                        </div>
                    )}
                    
                    <div className="related-sections">
                        {comics.length > 0 && (
                            <RelatedItems 
                                items={comics} 
                                type="comics" 
                                title="Appears in Comics" 
                                maxItems={10}
                            />
                        )}
                        
                        {series.length > 0 && (
                            <RelatedItems 
                                items={series} 
                                type="series" 
                                title="Appears in Series"
                                maxItems={10}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetails;