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
                const comicData = await getComicsById(id);
                setComic(comicData);
                
                const charsData = await getComicCharacters(id);
                setCharacters(charsData);
            } catch (err) {
                setError('Failed to load comic data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="loading"></div>;
    if (error) return <div className="error">{error}</div>;
    if (!comic) return <div className="error">Comic not found</div>;

    return (
        <div className="details-container">
            <Link to="/comics" className="back-button">← Back to Comics</Link>
            
            <div className="details-content">
                <div className="details-poster">
                    <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt={comic.title}
                        className="poster-image"
                    />
                </div>
                
                <div className="details-info">
                    <h1>{comic.title}</h1>
                    
                    {comic.description && (
                        <div className="details-description">
                            <h3>Description</h3>
                            <p>{comic.description}</p>
                        </div>
                    )}
                    
                    <RelatedItems items={characters} type="characters" />
                </div>
            </div>
        </div>
    );
};

export default ComicsDetails;