import express from 'express'
import { getCart,addToCart,removefromCart } from '../controllers/cartController.js'
import cookieParser from 'cookie-parser'
import { authMiddleware } from '../middlewares/auth.js'

const cartRouter=express.Router()
cartRouter.use(cookieParser())

cartRouter.post('/get',getCart)
cartRouter.post('/add',addToCart)
cartRouter.post('/remove',getCart)

export default cartRouter