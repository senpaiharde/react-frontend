import React from 'react';
import { ToyPreview } from './ToyPreview';
import PropTypes from 'prop-types';
import { deleteToyAsync } from '../store/toySlice';
import { useDispatch, useSelector } from 'react-redux';
export function ToyList({ toys }) {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)

    const handleDelete = (toyId) => {
        if(window.confirm("are you sure uoi wantt to delete tthis toy?")){
            dispatch(deleteToyAsync(toyId));
        }
    }
    return (
        <div className="toy-grid">
           {toys.length === 0 ? (<p className='no-toys-message'>❌ No toys available</p>) 
           : (toys.map(toy => (
                <div key={toy._id} className='toy-card'>
                    <ToyPreview  toy={toy} />
                    {user && user?.isAdmin && (
                        <button className='delete-btn' onClick={()=> handleDelete(toy._id)}>
                            🗑 Delete
                        </button>
                    )}
                </div>
            )))}
        </div>
    );
}


ToyList.propTypes = {
    toys:PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imgUrl: PropTypes.string,
        price: PropTypes.number.isRequired,
        labels: PropTypes.arrayOf(PropTypes.string),
        inStock: PropTypes.bool.isRequired
    })).isRequired,
};