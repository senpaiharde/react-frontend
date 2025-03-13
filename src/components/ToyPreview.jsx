import React from 'react';

import { Link } from 'react-router-dom';

export function ToyPreview({ toy }) {
    return (
        <div className="toy-preview">
            <h3>{toy.name}</h3>
            <img src={toy.imgUrl || "https://placehold.co/100x100"} alt={toy.name} 
            onError={(e) => e.target.src = "https://placehold.co/100x100"} />

            <p>Price: ${toy.price}</p>
            <p>Labels: {toy.labels.join(', ')}</p>
            <p>{toy.inStock ? "In Stock ✅" : "Out of Stock ❌"}</p>

            <Link to={`/toy/${toy._id}`}>
                <button>🔍 View Details</button>
            </Link>
        </div>
    );
}
