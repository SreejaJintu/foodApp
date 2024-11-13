import jwt from 'jsonwebtoken'
import { userModel } from '../models/user.js';


const authMiddleware=async(req,res)=>{
  
    try {
        const token = req.cookies.token; 

        if (!token) {
            return res.json("Token not available,Not a authorized user");
        }

        console.log("Token:", token);

        const decoded= jwt.verify(token, process.env.JWT_token) 
        console.log(decoded)

        const user = await userModel.findById(decoded.userId || decoded._id);
        console.log('user is',user)
        if(!user){
            return res.json("Not found user");

        }
        if(user.role!=='admin')
        {
            return res.json("Not an admin");

        }
        next()
    } catch (error) {

          return res.json("internal server error");


    }

   
    
}

export {authMiddleware} 
