import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toyService } from '../services/toyService';

/**
 * Async Thunk: Fetch Toys from Storage/Backend with Filtering & Sorting
 */
 const fetchToys = createAsyncThunk('/toys/fetchToys', async (_, { getState, rejectWithValue }) => {
    try {
        const state = getState().toy;



        if(state.toys.length > 0) {
            console.warn("⚠ Stopping fetch! Toys already loaded.");
            return state.toys;
        }
        console.log("🛠 Fetching Toys from API...");
        let toys = await toyService.getToys();
        console.log("✅ API Response:", toys.length, "toys found.");

        //  Apply filters
        if (state.filterBy.name) {
            toys = toys.filter(toy =>
                toy.name.toLowerCase().includes(state.filterBy.name.toLowerCase()) // 
            );
        }

        if (state.filterBy.inStock !== undefined) {
            toys = toys.filter(toy => toy.inStock === state.filterBy.inStock);
        }

        if (state.filterBy.labels?.length) {
            toys = toys.filter(toy =>
                toy.labels.some(label => state.filterBy.labels.includes(label)) //
            );
        }

        //  Apply sorting
        if (state.filterBy.sortBy) {
            toys = toys.sort((a, b) => { 
                if (state.filterBy.sortBy === 'name') return a.name.localeCompare(b.name);
                if (state.filterBy.sortBy === 'price') return a.price - b.price;
                if (state.filterBy.sortBy === 'created') return a.createdAt - b.createdAt;
                return 0;
            });
        }

        return toys;
    } catch (error) {
        console.error("❌ Error Fetching Toys:", error);
        return rejectWithValue(error.message);
    }
});

/**
 * Async Thunk: Delete Toy
 */
 const deleteToyAsync = createAsyncThunk('/toys/deleteToy', async (toyId, { rejectWithValue }) => {
    try {
        await toyService.deleteToy(toyId);
        return toyId;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

/**
 * Async Thunk: Add New Toy
 */
 const addToyAsync = createAsyncThunk('/toys/addToy', async ({ newToy, token }, { rejectWithValue }) => {
    try {
        const savedToy = await toyService.saveToy(newToy,token);
        return savedToy;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

/**
 * Async Thunk: Update Existing Toy
 */
 const updateToyAsync = createAsyncThunk('/toys/updateToy', async ({ updatedToy, token }, { rejectWithValue }) => {
    try {
        const savedToy = await toyService.saveToy(updatedToy,token);
        return savedToy;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

/**
 * Redux Slice for Toy Management
 */
const toySlice = createSlice({
    name: 'toy',
    initialState: {
        toys: [],
        selectedToy: null,
        filterBy: { name: '', inStock: undefined, labels: [], sortBy: '' },
        loading: false,
        error: null,
        deleteLoading: false,
        deleteError: null,
    },
    reducers: {
        
        setSelectedToy: (state, action) => {
            state.selectedToy = action.payload;
        },
        
        setFilter: (state, action) => {
            state.filterBy = action.payload;
        },
        setToys: (state,action) => {
            state.toys = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            //  Fetch Toys
            .addCase(fetchToys.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchToys.fulfilled, (state, action) => {
                if(!action.payload.length){
                    console.warn("⚠ No toys returned from API. Keeping existing state.");
                    return;
                }


                console.log("🎯 Redux: Setting toys in state:", action.payload);
                state.toys = action.payload;
                state.loading = false;
            })
            .addCase(fetchToys.rejected, (state, action) => {
                console.error("❌ Fetch Error:", action.payload);
                state.loading = false;
                state.error = action.payload;
            })
            //  Delete Toy
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
            //  Add Toy
            .addCase(addToyAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToyAsync.fulfilled, (state, action) => {
                state.toys.push(action.payload);
                state.loading = false;
            })
            .addCase(addToyAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //  Update Toy
            .addCase(updateToyAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateToyAsync.fulfilled, (state, action) => {
                const idx = state.toys.findIndex(toy => toy._id === action.payload._id);
                if (idx !== -1) state.toys[idx] = action.payload;
                state.loading = false;
            })
            .addCase(updateToyAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});


export const { setSelectedToy, setFilter } = toySlice.actions;
export { fetchToys, deleteToyAsync, addToyAsync, updateToyAsync };
export default toySlice.reducer;
