import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchToys, deleteToyAsync } from '../store/toySlice';
import { ToyList } from '../components/ToyList';
import { useNavigate } from 'react-router-dom';
import { ToyFilter } from '../components/toyFilter';

/**
 * ToyIndex Component - Displays the toy list with CRUD functionality.
 */
export function ToyIndex() {
    const dispatch = useDispatch();
    const { toys, loading, error } = useSelector(state => state.toy);
    const navigate = useNavigate();

    
    useEffect(() => {
        dispatch(fetchToys());
    }, [dispatch]);

    
    const onRemoveToy = (toyId) => {
        dispatch(deleteToyAsync(toyId));
    };

    return (
        <div className='toy-list-container'>
            <div className='toy-controls'>
            <h1>Filter & sort</h1>
            <ToyFilter />
            <button onClick={() => navigate('/toy/edit')}>➕ Add New Toy</button>

           
            {error && <p className="error">❌ {error}</p>}
            </div>
            
            {loading && <p>Loading...</p>}

            
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
        </div>
    );
}
