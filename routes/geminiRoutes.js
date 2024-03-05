import express from 'express'
import { createQuery } from '../controllers/geminiControllers.js'

const geminiRoutes = express.Router()

geminiRoutes.post('/create', createQuery)

export default geminiRoutes