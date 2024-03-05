import { GoogleGenerativeAI } from "@google/generative-ai"
import Query from "../models/Query.js"

import markdownIt from 'markdown-it'

function indentText(text, indentString) {
  const lines = text.split('\n');
  const indentedLines = lines.map(line => indentString + line);
  return indentedLines.join('\n');
}

function toMarkdown(text) {
  // Replace '•' with '*'
  text = text.replace(/•/g, '*');
  // Indent text
  text = indentText(text, '> ');
  
  // Initialize markdown-it
  const md = markdownIt();
  // Render markdown
  return md.render(text);
}

export const postQuery = async (req,res,next) => {
    try{
        const {query} = req.body 

        const genAi = new GoogleGenerativeAI(process.env.API_KEY)

        const model = genAi.getGenerativeModel({model: 'gemini-pro'})
        const result = await model.generateContent(query)

        const response = await toMarkdown(result.response.text())

        const queryPackage = new Query({
            query: query,
            result: response,
            userId: req.userId
        })

        await queryPackage.save()

        res.status(201).send(queryPackage)

    }catch(err){
        next(err)
    }
}

export const allQueries = async(req,res,next) => {
    try{
        const queries = await Query.find({userId: req.userId})

        res.status(200).send(queries)
    }catch(err){
        next(err)
    }
}