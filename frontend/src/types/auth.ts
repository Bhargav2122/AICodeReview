export interface RegisterPayload {
    fullname: string;
    email: string;
    password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
export interface User {
    _id: string;
    fullname: string;
    email: string;
    profilePic: string;
}