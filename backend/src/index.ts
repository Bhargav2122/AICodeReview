import express,{Request, Response} from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import cors from 'cors';
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import userRouter from './routes/userRoutes.js'
dotenv.config();

const app = express();
const port = process.env.PORT || 2000;

connectDB();
app.use(express.json())
app.use(cors());
app.use('/api/auth', userRouter)

app.use(errorMiddleware);
app.get('/', (req: Request, res: Response) => {
    res.send('hello');
});

app.listen(port, ()=> {
    console.log(`server is listening on ${port}`);

});