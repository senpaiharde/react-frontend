import React from 'react';
import styles from './ToysPreview.css'
export function ToyPreview({toy}) {
    return (
        <div className={styles}>
            <h3>{toy.name}</h3>
            <img src={img.imgUrl} alt={toy.name} />
            <p>Labels: {toy.label.join(', ')}</p>
            <p>{toy.inStock ? "In Stock ✅" : "Out of Stock ❌"}</p>
        </div>
        
    )
}