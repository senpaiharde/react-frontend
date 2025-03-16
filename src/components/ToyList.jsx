import React from 'react';
import { ToyPreview } from './ToyPreview';
import PropTypes from 'prop-types';
export function ToyList({ toys }) {
    return (
        <div className="toy-grid">
            {toys.map(toy => (
                <ToyPreview key={toy._id} toy={toy} />
            ))}
        </div>
    );
}


ToyList.propTypes = {
    toys:PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imgUrl: PropTypes.string,
        price: PropTypes.number.isRequired,
        Labels: PropTypes.arrayOf(PropTypes.string),
        inStock: PropTypes.bool.isRequired
    })).isRequired
};