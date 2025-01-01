import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app=express();

app.use(cors());
app.use(express.json({
    limit:"16kb"
}))
app.use(express.urlencoded({
    limit:"16kb"
}))
app.use(cookieParser());
import taskRouter from './routes/task.route.js';
import userRouter from './routes/user.route.js'
app.use("/api/v1",taskRouter);
app.use("/api/v1/user",userRouter);
export {app}