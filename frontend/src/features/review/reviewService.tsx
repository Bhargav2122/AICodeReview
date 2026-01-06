import api from "../../api/axios";
import type { ReviewHistory, ReviewHistoryResponse, ReviewRequest, ReviewResponse } from "../../types/reviewTypes";

export const submitReview = async( code: ReviewRequest): Promise<ReviewResponse> => {
    const res = await api.post('/ai/review', code);
    return res.data;
}

export const pastChat = async():Promise<ReviewHistory[]> => {
    const res = await api.get<ReviewHistoryResponse>('/ai/history');
    return res.data.history;
}

export const singleChat = async(id: string): Promise<ReviewHistory> => {
    const res = await api.get(`/ai/history/${id}`);
    return res.data.review;

}