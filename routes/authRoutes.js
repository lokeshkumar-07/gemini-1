import express from 'express'
import { SignIn, SignInWithGoogle } from '../controllers/authController.js'

const authRoutes = express.Router()

authRoutes.post('/signin', SignIn)
authRoutes.post('/googleSign', SignInWithGoogle)

export default authRoutes