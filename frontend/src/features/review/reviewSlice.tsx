import { pastChat, singleChat, submitReview } from "./reviewService";
import type { ReviewHistory, ReviewResponse } from "../../types/reviewTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ReviewState {
  data: ReviewResponse["review"] | null;
  histories: ReviewHistory[];
  selectedChat: ReviewHistory | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  data: null,
  selectedChat: null,
  histories: [],
  loading: false,
  error: null,
};

export const getReview = createAsyncThunk<ReviewResponse, { code: string }>(
  "review/submit",
  async ({ code }, thunkAPI) => {
    try {
      return await submitReview({ code });
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Review Failed"
      );
    }
  }
);

export const getHistories = createAsyncThunk<
  ReviewHistory[],
  void,
  { rejectValue: string }
>("history/getAll", async (_, thunkAPI) => {
  try {
    return await pastChat();
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "History failed"
    );
  }
});
export const getSingleChat = createAsyncThunk<
  ReviewHistory,
  string,
  { rejectValue: string }
>("history/getOne", async (id, thunkAPI) => {
  try {
    return await singleChat(id);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Failed to fetch chat"
    );
  }
});

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(getReview.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
      .addCase(getReview.fulfilled, (s, a) => {
        s.loading = false;
        s.data = a.payload.review;
      })
      .addCase(getReview.rejected, (s, a) => {
        s.loading = false;
        s.error = (a.payload as string) ?? ("Something went wrong" as string);
      })
      .addCase(getHistories.pending, (s) => {
        s.loading = true;
      })
      .addCase(getHistories.fulfilled, (s, a) => {
        s.loading = false;
        s.histories = a.payload;
      })
      .addCase(getHistories.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string ?? "Failed";
      })
      .addCase(getSingleChat.pending, (s) => {
      s.loading = true;
    })
      .addCase(getSingleChat.fulfilled, (s, a) => {
        s.loading = false;
        s.selectedChat = a.payload;
      })
      .addCase(getSingleChat.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload ?? "Failed to load chat";
      });
  },
});
export default reviewSlice.reducer;
