import { createSlice } from '@reduxjs/toolkit';
import { toyService } from '../services/toyService';

const toySlice = createSlice({
    name:'toy',
    initialState:{
        toys:[],
        selecedToy: null,
        filterBy: {name:'', inStock:undefined, labels:[],sortBy:''},
    },
    reducers:{
        setToys: (state, action) => {
            state.toys = action.payload;
        },
        addToy: (state, action) => {
            state.toys.push(action.payload);
        },
        removeToy: (state, action) => {
            state.toys = state.toys.filter(toy => toy._id !== action.payload);
        },
        updateToy: (state, action) => {
            const idx = state.toys.findIndex(toy => toy._id === action.payload._id);

            if(idx !== -1) state.toys[idx] = action.payload;
        },
        setSelectedToy: (state, action) => {
            state.selecedToy = action.payload;
        },
        setFilter: (state, action) => {
            state.filterBy = action.payload;
        },
    },
});
export const {setToys, addToy ,removeToy, updateToy, setSelectedToy, setFilter} = toySlice.actions;

export default toySlice.reducer;