import { Router } from "express";
import { review, reviewHistory, singleHistory } from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.post('/review', verifyToken, review);
router.get('/history', verifyToken,reviewHistory);
router.get('/history/:id', verifyToken,singleHistory);
export default router;