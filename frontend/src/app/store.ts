import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../features/auth/authSlice';
import reviewSlice from '../features/review/reviewSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        review: reviewSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch