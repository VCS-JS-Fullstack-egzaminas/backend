import Users from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

// GET visi useriai

export const getUsers = async (req,res) => {
    const users = await Users.find({}).sort({
        createdAt: -1
    })
    res.status(200).json(users)
}


// GET - viena useri
export const getUser = async (req, res) => {
    const {id} = req.params 
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Tokio naudotojo nėra'})
    }
    const user = await Users.findById(id)
    if(!user) {
        return res.status(404).json({error: 'Tokio naudotojo nėra'})
    }
    res.status(200).json(user)
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



// DELETE - ištrinti vieną pratimą
export const deleteUser = async (req, res) => {
    const {id} = req.params 
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Tokio naudotojo nėra'})
    }
    const user = await Users.findOneAndDelete({_id: id})
    if(!user) {
        return res.status(404).json({error: 'Tokio naudotojo nėra'})
    }
    res.status(200).json(user)
}



// PATCH - pataisyti vieną naudotoją
export const updateUser = async (req, res) => {
    const {id} = req.params 
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Tokio naudotojo nėra'})
    }
    const user = await Users.findOneAndUpdate({_id: id}, {...req.body})
    if(!user) {
        return res.status(404).json({error: 'Tokio naudotojo nėra'})
    }
    res.status(200).json(user)
}