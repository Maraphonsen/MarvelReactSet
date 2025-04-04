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
                const seriesData = await getSeriesById(id);
                setSeries(seriesData);
                
                const charsData = await getSeriesCharacters(id);
                setCharacters(charsData);
                
                const comicsData = await getSeriesComics(id);
                setComics(comicsData);
            } catch (err) {
                setError('Failed to load series data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="loading"></div>;
    if (error) return <div className="error">{error}</div>;
    if (!series) return <div className="error">Series not found</div>;

    return (
        <div className="details-container">
            <Link to="/series" className="back-button">← Back to Series</Link>
            
            <div className="details-content">
                <div className="details-poster">
                    <img
                        src={`${series.thumbnail.path}.${series.thumbnail.extension}`}
                        alt={series.title}
                        className="poster-image"
                    />
                </div>
                
                <div className="details-info">
                    <h1>{series.title}</h1>
                    
                    <div className="series-meta">
                        {series.startYear && series.endYear && (
                            <p><strong>Years:</strong> {series.startYear} - {series.endYear}</p>
                        )}
                        {series.rating && (
                            <p><strong>Rating:</strong> {series.rating}</p>
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
                            <RelatedItems items={characters} type="characters" title="Characters" />
                        )}
                        
                        {comics.length > 0 && (
                            <RelatedItems items={comics} type="comics" title="Comics in this Series" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeriesDetails;