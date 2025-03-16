import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function ToyPreview({ toy }) {
    return (
        <div className="toy-preview">
            <h3>{toy.name}</h3>
            <img src={toy.imgUrl || "https://placehold.co/100x100"} 
            alt={toy.name} 
            onError={(e) => e.target.src = "https://placehold.co/100x100"} 
            />

            <p className='toy-price'>Price: ${toy.price}</p>
            <p className='toy-labels'>Labels: {Array.isArray(toy.labels) 
            && toy.labels.length > 0 ? toy.labels.join(', ') : "No labels available"}</p>
            
            <p className='toy-stock'>{toy.inStock ? "In Stock ✅" : "Out of Stock ❌"}</p>
            <div className='toy-actions'>
            <Link to={`/toy/${toy._id}`}>
                <button className='details-btn'>🔍 View Details</button>
            </Link>
            <button className='add-to-card-btn'>🛒 Add to Cart</button>
            </div>
        </div>
    );
}

ToyPreview.propTypes = {
    toys:PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imgUrl: PropTypes.string,
        price: PropTypes.number.isRequired,
        Labels: PropTypes.arrayOf(PropTypes.string),
        inStock: PropTypes.bool.isRequired
    })).isRequired
};