import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services/authServices";




export const loginUser = createAsyncThunk('auth/login', async (userData, {rejectWithValue}) => {
    try{
        const response = await authService.login(userData);
        return response;

    }catch(err){
        return rejectWithValue(err.response?.data?.message|| "Login failed");
    }
});


export const signUp = createAsyncThunk('auth/signup', async (userData, {rejectWithValue}) => {
    try{
         await authService.signup(userData);
         return 'Signup successful';
    }catch(err){
        return rejectWithValue(err.response?.data?.message|| "Signup failed");
    }
});


export const logoutUser = () => (dispatch) => {
    authService.logout(); 
    dispatch(logout());
};

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:authService.getUserFromLocalStorage(),
        isLoading: false,
        error:null,
    },
    reducers: {
        logout:(state) => {
            authService.logout();
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {state.isLoading = true;})
            .addCase(loginUser.fulfilled, (state,action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state,action)=>{
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(signUp.pending,(state) => {state.isLoading = true})
            .addCase(signUp.fulfilled, (state)=> {
                state.error = null;
                state.isLoading = false;
            })
            .addCase(signUp.rejected, (state,action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
    }
});
export const {logout} = authSlice.actions;

export default authSlice.reducer;