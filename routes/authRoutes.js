import express from 'express'
import { Register, SignIn, SignInWithGoogle } from '../controllers/authController.js'

const authRoutes = express.Router()

authRoutes.post('/signin', SignIn)
authRoutes.post('/register', Register)
authRoutes.post('/googleSign', SignInWithGoogle)

export default authRoutes