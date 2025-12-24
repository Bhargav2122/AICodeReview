import { Router } from "express";
import { logout, signIn, signUp } from "../controllers/authController.js";



const router = Router();

router
  .post('/signup',signUp)
  .post('/signin', signIn )
  .post('/logout', logout);

export default router;