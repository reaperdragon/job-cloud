import express from "express";
const app = express();
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
import 'express-async-errors'
import morgan from 'morgan'
import authenticateUser from './middleware/auth.js'

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config()

import connectDB from './db/connect.js'

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}
app.use(express.json())
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(express.static(path.resolve(__dirname, "./frontend/build")));

app.use("/api/v1/auth", authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;


const start = async () => {
   
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
          console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error)
    }
}

start();