import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register, login, logout } from "./authService";
import type { RegisterPayload, LoginPayload, User } from "../../types/auth";

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const getStoredUser = (): User | null => {
    const stored = localStorage.getItem('user');
    if(!stored) return null;
    try {
       return JSON.parse(stored) as User;
    } catch (error) {
        localStorage.removeItem('user');
        return null;
    }
};

const initialState: AuthState = {
    user: getStoredUser(),
    loading: false,
    error: null,
}

export const signup = createAsyncThunk<User, RegisterPayload>('auth/register', async(formData, thunkAPI) => {
    try {
        return await register(formData);
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.msg || err.message)        
    }
})

export const signin = createAsyncThunk<User, LoginPayload>('auth/login', async(formData, thunkAPI) => {
    try {
        const user = await login(formData);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.msg || err.message)        
    }
})

export const logoutUser = createAsyncThunk('auth/logout', async() => {
    await logout();
})


const authSlice = createSlice({
     name: 'auth',
    initialState,
    reducers:{},
    extraReducers: (b) => {
        b
         .addCase(signup.pending, (s) => {
            s.loading = true;
            s.error = null;
         })
         .addCase(signup.fulfilled, (s) => {
             s.loading = false;
         })
         .addCase(signup.rejected, (s, a) => {
            s.loading = false;
            s.error = a.payload as string;
         })
         .addCase(signin.pending, (s) => {
            s.loading = true;
            s.error = null;
         })
         .addCase(signin.fulfilled, (s, a) => {
            s.user = a.payload;
            s.loading = false;
         })
         .addCase(signin.rejected, (s, a) => {
            s.loading = false;
            s.error = a.payload as string;
         })
         .addCase(logoutUser.fulfilled, (s) => {
            s.user = null;
         })
    },
});

export default authSlice.reducer;

