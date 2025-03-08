import React from 'react';
import { ToyPreview } from './ToyPreview';

export function ToyList({ toys }) {
    return (
        <div className="toy-list">
            {toys.map(toy => (
                <ToyPreview key={toy._id} toy={toy} />
            ))}
        </div>
    );
}
