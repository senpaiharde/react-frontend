import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchToys, deleteToyAsync, setFilter } from '../store/toySlice';
import { ToyList } from '../components/ToyList';
import { useNavigate } from 'react-router-dom';
import { ToyFilter } from '../components/toyFilter';
import PropTypes from 'prop-types';
/**
 * ToyIndex Component - Displays the toy list with CRUD functionality.
 */
export function ToyIndex() {
    const dispatch = useDispatch();
    const { toys, loading, error, filterBy } = useSelector(state => state.toy);
    const navigate = useNavigate();

    
    useEffect(() => {
        dispatch(fetchToys());
    }, [dispatch]);

    
    const onRemoveToy = (toyId) => {
        dispatch(deleteToyAsync(toyId));
    };

    const onFilterChange = (newFilter) => {
        dispatch(setFilter(newFilter));
    }

    return (
        <div className='toy-list-container'>
            <div className='toy-controls'>
            <h1 className='toy-controls__title'>Filter & sort</h1>
            <ToyFilter  filterBy={filterBy} onFilterChange={onFilterChange}/>
            <button className="btn add-toy-btn" onClick={() => navigate('/toy/edit')}>➕ Add New Toy</button>

           
            {error && <p className="error-message">❌ {error}</p>}
            </div>
            
            {loading && <p className="loading-message"> Loading...</p>}

            
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
        </div>
    );
}

ToyFilter.propTypes = {
    toys: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string,
    onRemoveToy:PropTypes.func

};