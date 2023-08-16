import express, { Application, json } from 'express'
import { handleError } from './middlewares';
import { courseRouter, userRouter } from './routers';



const app: Application = express();
app.use(json())
app.use("/users", userRouter);
// app.use("/login");
app.use("/courses", courseRouter);

app.use( handleError.error );
export default app;