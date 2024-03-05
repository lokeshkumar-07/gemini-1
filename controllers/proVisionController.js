import { GoogleGenerativeAI } from "@google/generative-ai"
import ProVision from "../models/proVision.js";

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

export const createProVisionQuery = async (req, res, next) => {
    
  const urls = req.body.imagesUrl.split(',')
  console.log(urls)
  function convertImageData(images) {
      const result = [];
      for (let i = 0; i < images.length; i++) {
        result.push({
          inlineData: {
            data: images[i].buffer.toString('base64'),
            mimeType: images[i].mimetype
          }
        });
      }
      return result;
    }
  try {
    const { inputText } = req.body;
    const images = convertImageData(req.files);
    
  
    const genAi = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAi.getGenerativeModel({ model: "gemini-pro-vision" }); 

    const result = await model.generateContent([inputText, ...images]);
    console.log(result)
    const textRes = await toMarkdown(result.response.text())

    const proVisionResult = new ProVision({
      userId: req.userId,
      text: req.body.inputText,
      images: urls,
      result: textRes
    })

    await proVisionResult.save()
    console.log(proVisionResult)
    res.status(200).json(proVisionResult); // Send response back to the frontend
  } catch (err) {
    next(err);
  }
};

export const getAllProQueries = async( req,res,next) => {
  try{
    const queries = await ProVision.find({userId: req.userId})

    res.status(200).send(queries)
  }catch(err){
    next(err)
  }
}