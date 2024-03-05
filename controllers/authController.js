import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const Register = async (req,res,next) => {
    try{
        const existingUser = await User.findOne({email: req.body.email})

        if(existingUser) return next(403, 'User Already Exists!')

        const hashPassword = bcrypt.hashSync(req.body.password, 10)

        const user = new User({
            ...req.body,
            password: hashPassword
        })

        await user.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'})
    }catch(err){
        next(err)
    }
}

export const SignIn = async (req,res,next) => {
    try{
        const existingUser = await User.findOne({email: req.body.email})

        if(!existingUser) return next(403, 'User Not Exists!')

        const passwordMatched = bcrypt.compareSync(req.body.password,existingUser.password)

        if(!passwordMatched) return next(403, 'Invalid Credentials!')

        const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: '30d'})

        res.status(200).send({
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            token: token 
        })
    }catch(err){
        next(err)
    }
}


export const SignInWithGoogle = async (req,res,next) => {
    try{
        const {email,name,avatar} = req.body 

        const existingUser = await User.findOne({email: email})

        if(existingUser){
            const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: "30d"})

            return res.status(200).send({
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                avatar: existingUser.avatar,
                token: token 
            })
        }

        const newUser = new User({
            verified:"true",
            email: email,
            name: name,
            avatar: avatar
        })

        await newUser.save()
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "30d"})
        console.log(token)
        res.status(201).send({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.avatar,
            token: token 
        })
    }catch(err){
        next(err)
    }
}