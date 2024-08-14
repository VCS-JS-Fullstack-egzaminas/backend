import express from "express"
import { loginUser,signupUser,deleteUser,updateUser,getUser,getUsers } from "../controller/usersController.js"



const router = express.Router()
// visi useriai
router.get("/", getUsers); 

// vienas useris

router.get("/:id", getUser); 
// login route
router.post("/login", loginUser)

// signup route
router.post("/register", signupUser)


// delete route

router.delete("/:id", deleteUser)

// patch route
router.patch("/:id", updateUser)

export default router