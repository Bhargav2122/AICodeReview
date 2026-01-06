import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export interface jwtPayload {
    _id: string, 
    email: string,
}

export const generateToken = (user: jwtPayload) => {
    return jwt.sign({_id: user._id.toString(), email: user.email}, process.env.JWT_SECRET_KEY as string, { expiresIn: "1h"})
}