// const express = require("express")
import express from "express";
import dotenv from "dotenv"
dotenv.config();
const app = express();
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";
const port = process.env.PORT;
app.use(express.json())
connectDB();

app.use("/api/auth",authRoutes)

app.listen(5001,()=>{
    console.log(`Server on listern ${5001}`)
})