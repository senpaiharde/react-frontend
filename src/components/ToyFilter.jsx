import React, { useState, useEffect } from 'react'; 
import { useDispatch } from 'react-redux'; 
import { setFilter } from '../store/toySlice'; 
import { toyService } from '../services/toyService'; 
import { debounce } from 'lodash'; 
import PropTypes from 'prop-types';

export function ToyFilter({filterBy, }) {
    const dispatch = useDispatch();
   
    const [filter, setLocalFilter] = useState(filterBy);
    const labels = toyService.getLabels()

    const debouncedFilterByName = debounce(value => {
        dispatch(setFilter({ ...filter, name: value }));
    }, 300);

    useEffect(() => {
        setLocalFilter(filterBy);
    }, [filterBy]);

    useEffect(() => {
        return () => debouncedFilterByName.cancel();
    }, [debouncedFilterByName]);

    const handleNameChange = e => {
        setLocalFilter(prevFilter => ({...prevFilter, name:e.target.value}));
        debouncedFilterByName(e.target.value)
    };

    const handleStockChange = e => {
        const stockValue = e.target.value === "all" ? undefined : e.target.value;
        dispatch(setFilter({...filter, inStock:stockValue}))
    };



    const handleLabelsChange = e => {
        const selectedLabels = Array.from(e.target.selectedOptions, option => option.value);
        dispatch(setFilter({...filter, labels: selectedLabels}));
    }


    const handleSortChange = e => {
        dispatch(setFilter({...filter, sortBy: e.target.value}));
    };




    return(
    <div className="toy-filter">
        <input 
        type="text"
        placeholder="Search"
        value={filter.name}
        onChange={handleNameChange}
        />

        <select onChange={handleStockChange} value={filter.inStock ?? 'all'}>
            <option value="all">All</option>
            <option value="true">in Stock</option>
            <option value="false">Out of Stock</option>
        </select>

        <select multiple onChange={handleLabelsChange} value={filter.labels}>
            {labels.map(label => (
                <option key={label} value={label}>{label}</option>
            ))}
            
        </select>

        <select onChange={handleSortChange} value={filter.sortBy}>
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="created">created Date</option>
        </select>
    </div>
    );

}

ToyFilter.propTypes = {
    filterBy: PropTypes.shape({
        name:PropTypes.string.isRequired,
        inStock: PropTypes.oneOfType([PropTypes.string,PropTypes.bool, null]),
        labels: PropTypes.arrayOf(PropTypes.string).isRequired,
        sortBy: PropTypes.string
    }).isRequired,
    setFilter: PropTypes.func.isRequired
}