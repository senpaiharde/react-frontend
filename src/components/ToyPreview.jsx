import React from 'react';
import '../styles/toy.css';
import { Link } from 'react-router-dom';

export function ToyPreview({ toy }) {
    return (
        <div className="toy-preview">
            <h3>{toy.name}</h3>
            <img src={toy.imgUrl} alt={toy.name} />
            <p>Price: ${toy.price}</p>
            <p>Labels: {toy.labels.join(', ')}</p>
            <p>{toy.inStock ? "In Stock ✅" : "Out of Stock ❌"}</p>

            <Link to={`/toy/${toy._id}`}>
                <button>🔍 View Details</button>
            </Link>
        </div>
    );
}
