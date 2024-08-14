import Users from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

// GET all users

export const getUsers = async (req,res) => {
    const users = await Users.find({}).sort({
        createdAt: -1
    })
    res.status(200).json(users)
}


// Sukurti tokena
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '2d'})
}


// login user
export const loginUser = async (req, res) => {
    const {email, password} = req.body 
    try {
        const user = await Users.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
export const signupUser = async (req, res) => {
    const {email, password,username} = req.body 
    try {
        const user = await Users.signup(email, password,username)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}