import { Router } from "express";
import { review } from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = Router();
router.post('/review', verifyToken, review);

export default router;