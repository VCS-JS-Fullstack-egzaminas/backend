import express from "express"
import * as controller from "../controller/usersController.js"
import { loginUser,signupUser } from "../controller/usersController.js"

import Users from '../models/userModel.js'//buvo reikalingas testavimui

const router = express.Router()
// visi useriai
router.get("/users", controller.getUsers); 

// laikinas kurimas

// router.post('/', async (req,res) => {
//     const user = new Users({
//         email:req.body.email,
//         password:req.body.password,
//         username: req.body.username,
//         role:"admin"
     
//     })
//     try {
//         const newUser  = await user.save()
//         res.status(201).json(newUser)

//     } catch (err) {
//         res.status(400).json({message: err.message})
//     }
        
//     })

// login route
router.post('/login', loginUser)

// signup route
router.post('/register', signupUser)


export default router