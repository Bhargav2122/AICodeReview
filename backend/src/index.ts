import express,{Request, Response} from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import userRouter from './routes/userRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
dotenv.config();

const app = express();
const port = process.env.PORT || 2000;

connectDB();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));
app.use('/api/auth', userRouter)
app.use('/api/ai', aiRoutes)
app.use(errorMiddleware);
app.get('/', (req: Request, res: Response) => {
    res.send('Backend running on it takes time');
});

app.listen(port, ()=> {
    console.log(`server is listening on ${port}`);

});