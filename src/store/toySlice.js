import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toyService } from '../services/toyService';

//  Async Thunk: Fetch Toys from Storage or Backend
export const fetchToys = createAsyncThunk('toys/fetchToys', async () => {
    const toys = await toyService.getToys();
    return toys;
});

//  Creating Redux Slice
const toySlice = createSlice({
    name: 'toy',
    initialState: {
        toys: [],
        selectedToy: null, 
        filterBy: { name: '', inStock: undefined, labels: [], sortBy: '' },
    },
    reducers: {
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
            if (idx !== -1) state.toys[idx] = action.payload;
        },
        setSelectedToy: (state, action) => {
            state.selectedToy = action.payload;
        },
        setFilter: (state, action) => {
            state.filterBy = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchToys.fulfilled, (state, action) => {
                state.toys = action.payload;
            })
            .addCase(fetchToys.rejected, (state) => {
                console.error('Failed to fetch toys',state);
            });
    }
});


export const { setToys, addToy, removeToy, updateToy, setSelectedToy, setFilter } = toySlice.actions;
export default toySlice.reducer;
