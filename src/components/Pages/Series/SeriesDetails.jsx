import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
    getSeriesById, 
    getSeriesCharacters,
    getSeriesComics 
} from '../../../API/MarvelApi';
import '../styles/details.css';
import RelatedItems from '../../Related/RelatedItems';

const SeriesDetails = () => {
    const { id } = useParams();
    const [series, setSeries] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [seriesData, charsData, comicsData] = await Promise.all([
                    getSeriesById(id),
                    getSeriesCharacters(id, 10),
                    getSeriesComics(id, 10)
                ]);
                setSeries(seriesData);
                setCharacters(charsData);
                setComics(comicsData);
            } catch (err) {
                setError('Failed to load series data. Please try again later.');
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
                    <Link to="/series" className="back-button">
                        ← Back to Series
                    </Link>
                </div>
            </div>
        );
    }

    if (!series) {
        return (
            <div className="error">
                Series not found
                <div style={{ marginTop: '20px' }}>
                    <Link to="/series" className="back-button">
                        ← Back to Series
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="details-container">
            <Link to="/series" className="back-button">← Back to Series</Link>
            
            <div className="details-content">
                <div className="details-poster">
                    <img
                        src={`${series.thumbnail.path}.${series.thumbnail.extension}`}
                        alt={series.title}
                        className="poster-image"
                        onError={(e) => {
                            e.target.src = '/placeholder-series.jpg';
                        }}
                    />
                </div>
                
                <div className="details-info">
                    <h1>{series.title}</h1>
                    
                    <div className="series-meta">
                        {series.startYear && series.endYear && (
                            <p><strong>Years:</strong> {series.startYear} - {series.endYear}</p>
                        )}
                        {series.rating && (
                            <p><strong>Rating:</strong> {series.rating.replace('Rating', '').trim()}</p>
                        )}
                        {series.type && (
                            <p><strong>Type:</strong> {series.type}</p>
                        )}
                    </div>
                    
                    {series.description && (
                        <div className="details-description">
                            <h3>Description</h3>
                            <p>{series.description}</p>
                        </div>
                    )}
                    
                    <div className="related-sections">
                        {characters.length > 0 && (
                            <RelatedItems 
                                items={characters} 
                                type="characters" 
                                title="Featured Characters"
                                maxItems={10}
                            />
                        )}
                        
                        {comics.length > 0 && (
                            <RelatedItems 
                                items={comics} 
                                type="comics" 
                                title="Comics in This Series"
                                maxItems={10}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeriesDetails;