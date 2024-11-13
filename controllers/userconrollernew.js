import { userModel } from "../models/user.js";
import jwt from "jsonwebtoken"
import bcjs from 'bcryptjs'


const loginUser = async (req, res) => {

    try {
        const {name,password}=req.body
        const user= await userModel.findOne({name})
        if(!user){
            return res.status(303).json({ success: false, message: "user doent exists, please register" });
        }

        const matchPassd=await bcjs.compare(password,user.password)

        if(!matchPassd){
            return res.status(404).json({ success: false, message: "invalid password" });
        }

        const token= jwt.sign({userId:user._id},process.env.JWT_token)
        res.cookie('token',token,{httpOnly:true,secure:false,maxAge:25920000})
        return res.status(200).json({ success: true, message: "user loggin successfully" ,user,token});



    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error" });

    }

}


const registerUser = async (req, res) => {

    try {
        
    const {name,password,email,role}=req.body

    const user=userModel.findOne({email})

    if(user){
        return res.status(303).json({ success: false, message: "user already exists, please login" });
    }

    const hashedPassword = bcjs.hashSync(password,10)

    const newUser= new userModel.create({name,email,password:hashedPassword,role})

    await newUser.save()

    return res.status(200).json({ success: true, message: "user registerd successfully" ,user:newUser});
 


    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error" });

        
    }
}

const logout=async(req,res)=>{

    try {
         res.clearCookie('token')
         res.status(200).json({success:true,message:"logged out successfully"})
    } catch (error) {
        
    }

}


export { registerUser ,loginUser,logout};
