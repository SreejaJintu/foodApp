import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import { authMiddleware } from './middlewares/auth.js'
import cookieParser from 'cookie-parser'
import adminRouter from './routes/adminRoute.js'



dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

const PORT=process.env.PORT||7000



connectDB()

//api endpoints

app.use('/user',userRouter)
app.use('/admin',adminRouter)
app.use('/food',foodRouter)
app.use('/cart',cartRouter)
app.get('/',(req,res)=>{res.send('backend running')})






app.listen(PORT,()=>{console.log(`server started at${PORT}`)})