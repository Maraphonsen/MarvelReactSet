import React from 'react';
import { Link } from 'react-router-dom';
import './relatedItems.css';

const RelatedItems = ({ items, type, title }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className="related-items">
            <h3>{title || `Related ${type}`}:</h3>
            <div className="related-list">
                {items.map(item => (
                    <Link 
                        key={item.id} 
                        to={`/${type}/${item.id}`}
                        className="related-item"
                    >
                        <img
                            src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                            alt={item.title || item.name}
                            className="related-image"
                            onError={(e) => {
                                e.target.src = 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
                            }}
                        />
                        <p className="related-title">{item.title || item.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedItems;