import express from "express"
import { loginUser,signupUser,deleteUser,updateUser,getUser,getUsers } from "../controller/usersController.js"
import requireAuth  from "../middleware/requireAuth.js"



const router = express.Router()
router.use(requireAuth) //uzkomentuoti jeigu norit tikrinti kitaip reikalaus tokeno
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