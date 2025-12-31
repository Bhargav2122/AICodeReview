import api from "../../api/axios";
import type { RegisterPayload, LoginPayload, User } from "../../types/auth";

export const register = async(formData: RegisterPayload): Promise<User> => {
    const res = await api.post('/auth/signup', formData);
    return res.data;
}

export const login = async(formData: LoginPayload): Promise<User> => {
    const res = await api.post('/auth/signin', formData);
     return res.data;
}

export const logout = async() => {
    localStorage.removeItem('user');
}