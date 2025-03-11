import { configureStore } from '@reduxjs/toolkit';
import toyReducer from './toySlice';

export const store = configureStore({
    reducer:{
        toy:toyReducer,
    }
});