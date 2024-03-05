import { GoogleGenerativeAI } from "@google/generative-ai";

export const createQuery = async (req,res,next) => {
    try{
        const { query } = req.body
        const genAi = new GoogleGenerativeAI(process.env.API_KEY)

        const model = genAi.getGenerativeModel({model: 'gemini-pro'})
        const result = await model.generateContent(query)

        const response = result.response.text()

        res.status(201).send(response)

    }catch(err){
        next(err)
    }
}