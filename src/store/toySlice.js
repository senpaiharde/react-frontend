import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toyService } from '../services/toyService';

//  Async Thunk: Fetch Toys from Storage or Backend
export const fetchToys = createAsyncThunk('/toys/fetchToys', async (_,{rejectWithValue}) => {
    try{
        const toys = await toyService.getToys();
        return toys;
    }catch (error){
        return rejectWithValue(error.message);
    }
});



//delete toy 
export const deleteToyAsync = createAsyncThunk('/toys/deleteToy', async (toyId,{rejectWithValue}) => {
    try{
        await toyService.deleteToy(toyId);
        return toyId;
    }catch (error){
        return rejectWithValue(error.message);
    }
});
// new toy 

export const addToyAsync = createAsyncThunk('/toys/addToy', async (newToy,{rejectWithValue}) => {
    try{
        const savedToy = await toyService.saveToy(newToy);
        return savedToy;
    }catch (error){
        return rejectWithValue(error.message);
    }
});
//update existing toy 

export const updatetoyAsync = createAsyncThunk('/toys/updateToy', async (updatedToy,{rejectWithValue}) => {
    try{
        const savedToy = await toyService.saveToy(updatedToy);
        return savedToy;
    }catch (error){
        return rejectWithValue(error.message);
    }
});

//  Creating Redux Slice
const toySlice = createSlice({
    name: 'toy',
    initialState: {
        toys: [],
        selectedToy: null, 
        filterBy: { name: '', inStock: undefined, labels: [], sortBy: '' },
        loading: false,
        error: null,
    },
    reducers: {
        
        setSelectedToy: (state, action) => {
            state.selectedToy = action.payload;
        },
        setFilter: (state, action) => {
            state.filterBy = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        // fetch toy
            .addCase(fetchToys.pending, (state) => {
                state.loading = true;
                state.error = null;
             })
            .addCase(fetchToys.fulfilled, (state, action) => {
                state.toys = action.payload;
                state.loading = false;
            })
            .addCase(fetchToys.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
             // delete toy
             .addCase(deleteToyAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
             })
            .addCase(deleteToyAsync.fulfilled, (state, action) => {
                state.toys = state.toys.filter(toy => toy._id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteToyAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
             // add toy
             .addCase(addToyAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
             })
            .addCase(addToyAsync.fulfilled, (state, action) => {
                state.toys.push(action.payload)
                state.loading = false;
            })
            .addCase(addToyAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
             // update toy
             .addCase(updatetoyAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
             })
            .addCase(updatetoyAsync.fulfilled, (state, action) => {
                const idx = state.toys.findIndex(toy => toy._id === action.payload._id);
                if(idx !== -1) state.toys[idx] = action.payload;
                state.loading = false;
            })
            .addCase(updatetoyAsync.rejected, (state, action) => {
                state.loading = null;
                state.error = action.error.message;
            });
            
    }
});


export const {setSelectedToy, setFilter} = toySlice.actions;
export default toySlice.reducer;
