import { configureStore } from '@reduxjs/toolkit';
import toyReducer from './toySlice';
import authReducer from "./authSlice";

export const store = configureStore({
    reducer:{
        toy:toyReducer,
        auth:authReducer,
    }
});