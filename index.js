// const express = require("express")
import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
// import cors from "cors"
dotenv.config();
const app = express();
import authRoutes from "./routes/auth.route.js"
import Message from './routes/message.route.js'
import { connectDB } from "./lib/db.js";
const port = process.env.PORT;
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
}))
app.use(express.json())
app.use(cookieParser ())
connectDB();

app.use("/api/auth",authRoutes);
app.use("/api/message",Message)

app.listen(5001,()=>{
    console.log(`Server on listern ${5001}`)
})