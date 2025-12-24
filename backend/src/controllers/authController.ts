import { User } from "../models/user.js";
import asyncHandler from 'express-async-handler';
import ApiError from "../utils/ApiError.js";
import { signInSchema, signUpSchema } from "../utils/userSchema.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const signUp = asyncHandler(async(req, res, next) => {
    const { fullname, email, password } = req.body;
    const result = signUpSchema.safeParse(req.body);
      if(!result.success) {
        res.status(400).json({ message: "Validation Failed"})
      }
    let existingUser = await User.findOne({email});

    if(existingUser){
        return next(new ApiError(400, 'Email Already Exists'))
    }
     
    const user = await User.create({ fullname, email, password});
    const token = generateToken({_id: user._id.toString(), email: user.email});
    res.cookie('token', token, { httpOnly: true, sameSite:'lax'});

    res.status(200).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email
    });
});


export const signIn = asyncHandler(async(req, res, next) => {
   const { email, password } = req.body;
   const result = signInSchema.safeParse(req.body);
      if(!result.success) {
       res.status(400).json({ message: "Validation Failed"})
       return;
      }
     const user = await User.findOne({email});
     if(!user) {
      return next(new ApiError(400,'User does not exists'));
     }

     const isPassword = await bcrypt.compare(password, user.password);
     if(!isPassword) {
      return next(new ApiError(400,'Invalid Password'));
     }
     const token = generateToken({_id: user._id.toString(), email: user.email});
     res.cookie('token', token, { httpOnly: true, sameSite: 'lax'});
     res.status(200).json({
        _id: user._id.toString(),
        fullname: user.fullname,
        email: user.email
     });
});

export const logout = asyncHandler(async(req, res, next) => {
  res.clearCookie('token');
  res.json({ message: 'Logged Out'});
});