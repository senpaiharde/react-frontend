import React from 'react';
import '../styles/toy.css';

export function ToyPreview({ toy }) {
    return (
        <div className="toy-preview">
            <h3>{toy.name}</h3>
            <img src={toy.imgUrl} alt={toy.name} />
            <p>Price: ${toy.price}</p>
            <p>Labels: {toy.labels.join(', ')}</p>
            <p>{toy.inStock ? "In Stock ✅" : "Out of Stock ❌"}</p>
        </div>
    );
}
