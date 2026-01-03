import { submitReview } from "./reviewService";
import type { ReviewResponse } from "../../types/reviewTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ReviewState {
    data: ReviewResponse['review'] | null;
    loading: boolean;
    error: string | null;
}


const initialState: ReviewState = {
    data: null,
    loading: false,
    error: null,
}

export const getReview = createAsyncThunk<ReviewResponse, { code: string}>('review/submit', async({ code }, thunkAPI) => {
    try {
        return await submitReview({ code });
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Review Failed");
    }
});

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {},
    extraReducers: (b) => {
        b
        .addCase(getReview.pending, (s) => {
            s.loading = true;
            s.error = null;
        })
        .addCase(getReview.fulfilled, (s, a) => {
            s.loading = false;
            s.data = a.payload.review;
        })
        .addCase(getReview.rejected, (s, a) => {
            s.loading = false;
            s.error = a.payload as string ?? "Something went wrong" as string;
        })
    }
})
export default reviewSlice.reducer;
