import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'
import readline from 'readline'
import express from "express";
import geminiRoutes from "./routes/geminiRoutes.js";
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
import queryRoutes from "./routes/queryRoutes.js";
import proVisionRoutes from "./routes/proVisionRoutes.js";

const app = express()
dotenv.config()

//middleware
app.use(express.json())
app.use(cors())
// const genAi = new GoogleGenerativeAI(process.env.API_KEY)

// const userInterface = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })


// userInterface.prompt()

// userInterface.on("line", async (input) => {
//     const model = genAi.getGenerativeModel({ model: "gemini-pro"})

//     const result = await model.generateContent(input)

//     const response = await result.response
//     const text = response.text()

//     console.log(text)
// })

app.use('/api/gemini', geminiRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/query', queryRoutes)
app.use('/api/pro-vision', proVisionRoutes)

app.use((err,req,res,next) => {
    const errStatus = err.status || 500
    const errMessage = err.message || 'Something went wrong!'
    
    res.status(errStatus).json({
        status: errStatus,
        success: false,
        message: errMessage,
        stack: err.stack
    })
})
const PORT = process.env.PORT || 3001
const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL, {
})
.then(() => {
    app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`))
}).catch((err) => console.log(err))
