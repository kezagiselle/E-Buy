import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './DB/connectDB.js'

const corsOptions = {
    allowedHeaders: ["Authorization", "Content-Type" ],
    methods: ["GET", "POST", "PUT", "UPDATE", "DELETE"],
    origin: "*",
};

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


const start = async () =>{
    try {
        connectDB();
        app.listen(process.env.PORT, console.log(`Server is listening on port ${process.env.PORT}`));
    } catch (error){
        console.log(error)
    }
}
start();