import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { toyService } from '../services/toyService';
import { setToys, removeToy } from '../store/toySlice'; 
import { ToyList } from '../components/ToyList'; 
import { useNavigate } from 'react-router-dom';






export function ToyIndex() {
    const dispatch = useDispatch();
    const { toys, filterBy} = useSelector(state => state.toy);
    const navigate = useNavigate();

    useEffect(()=>{

        let filteredToys = toyService.getToys();


        if (filterBy.name) {
            filteredToys = filteredToys.filter(toy =>
                toy.name.toLowerCase().includes(filterBy.name.toLowerCase())
            );
        }
        if (filterBy.inStock !== undefined) {
            const inStockValue = filterBy.inStock === 'true' ? true : filterBy.inStock === 'false' ? false : undefined
            filteredToys = filteredToys.filter(toy => toy.inStock === inStockValue);
        }
        if (filterBy.labels?.length) {
            filteredToys = filteredToys.filter(toy => 
                toy.labels.some(label => filterBy.labels.includes(label))
        );
        }
        if (filterBy.sortBy) {
            filteredToys = filteredToys.sort((a,b)=> {
                if(filterBy.sortBy === 'name') return a.name.localeCompare(b.name);
                if(filterBy.sortBy === 'price') return a.price - b.price;
                if(filterBy.sortBy === 'created') return a.createdAt -  b.createdAt;
                return 0;
            })
        }

        dispatch(setToys(filteredToys));

        

    }, [dispatch,filterBy]);

    const onRemoveToy = toyId => {
        toyService.deleteToy(toyId);
        dispatch(removeToy(toyId));
    };


    return(<div>
        <h1>Our Toys</h1>
        <button onClick={() => navigate('/toy/edit')}>➕ Add New Toy</button>
        <ToyFilter />
        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
    </div>
    );
    
}