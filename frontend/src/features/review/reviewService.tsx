import api from "../../api/axios";
import type { ReviewRequest, ReviewResponse } from "../../types/reviewTypes";

export const submitReview = async( code: ReviewRequest): Promise<ReviewResponse> => {
    const res = await api.post('/ai/review', code);
    return res.data;
}