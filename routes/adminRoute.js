import express from 'express'
import { getUsers } from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/auth.js';


const adminRouter=express.Router();

adminRouter.get('/getallusers',authMiddleware,getUsers)


// adminRouter.post('/login',loginAdmin)
// adminRouter.post('/register',registerAdmin)
// adminRouter.post('/logou',logout)

export  default adminRouter