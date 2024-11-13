import express from 'express'
import { registerUser,loginUser,logout } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/auth.js'
import { getUsers } from '../controllers/adminController.js'


const userRouter=express.Router()
userRouter.get('/getallusers',authMiddleware,getUsers)

userRouter.post('/login',loginUser)
userRouter.post('/register',registerUser)
userRouter.post('/logout',logout)

export  default userRouter