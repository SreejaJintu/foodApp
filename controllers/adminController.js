import { userModel } from "../models/user.js"


const getUsers=async(req,res)=>{

    try {
        
    const users= await userModel.find()
    res.json({success:true,data:users})
    //can give         return res.status(200).json({ success: true, message: "users found",users });

    if(!users)
    {
        return res.status(404).json({ success: false, message: "No users found" });
 
    }

    } catch (error) {
        
    }
}

export  {getUsers}