import jwt from "jsonwebtoken";
import asynchandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { jwtPayload } from "../utils/generateToken.js";
import ApiError from "../utils/ApiError.js";



export const verifyToken = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
      res.status(401).json({ message: "Token missing" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as jwtPayload;

    req.user = decoded;
    next();
  }
);
