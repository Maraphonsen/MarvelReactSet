import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getComicsById, getComicCharacters } from '../../../API/MarvelApi';
import '../styles/details.css';
import RelatedItems from '../../Related/RelatedItems';

const ComicsDetails = () => {
    const { id } = useParams();
    const [comic, setComic] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [comicData, charsData] = await Promise.all([
                    getComicsById(id),
                    getComicCharacters(id, 10)
                ]);
                setComic(comicData);
                setCharacters(charsData);
            } catch (err) {
                setError('Failed to load comic data. Please try again later.');
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
                    <Link to="/comics" className="back-button">
                        ← Back to Comics
                    </Link>
                </div>
            </div>
        );
    }

    if (!comic) {
        return (
            <div className="error">
                Comic not found
                <div style={{ marginTop: '20px' }}>
                    <Link to="/comics" className="back-button">
                        ← Back to Comics
                    </Link>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="details-container">
            <Link to="/comics" className="back-button">← Back to Comics</Link>
            
            <div className="details-content">
                <div className="details-poster">
                    <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt={comic.title}
                        className="poster-image"
                        onError={(e) => {
                            e.target.src = '/placeholder-comic.jpg';
                        }}
                    />
                </div>
                
                <div className="details-info">
                    <h1>{comic.title}</h1>
                    
                    <div className="comic-meta">
                        {comic.dates?.find(d => d.type === 'onsaleDate')?.date && (
                            <p><strong>Release Date:</strong> {formatDate(comic.dates.find(d => d.type === 'onsaleDate').date)}</p>
                        )}
                        {comic.pageCount > 0 && (
                            <p><strong>Pages:</strong> {comic.pageCount}</p>
                        )}
                        {comic.format && (
                            <p><strong>Format:</strong> {comic.format}</p>
                        )}
                    </div>
                    
                    {comic.description && (
                        <div className="details-description">
                            <h3>Description</h3>
                            <p>{comic.description}</p>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComicsDetails;