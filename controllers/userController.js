import { userModel } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // use bcryptjs if bcrypt has compatibility issues
import bcjs from 'bcryptjs'
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_token, { expiresIn: '1h' });
};


const loginUser = async (req, res) => {
    try {
        const { name, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ name });
        if (!user) {
            return res.status(404).json({ success: false, message: "Wrong credentials" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ success: false, message: "Wrong credentials" });
        }

        // Generate token
        const token = createToken(user._id);

        // Set cookie and send response
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 2592000000 }); // 30 days
        res.status(200).json({ success: true, message: "Logged in successfully", user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;

        // Ensure password is provided
        if (!password || typeof password !== 'string') {
            return res.status(400).json({ success: false, message: "Password is required and must be a string" });
        }

        // Check if user already exists
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(303).json({
                success: false,
                message: "User already registered, please log in",
            });
        }

        // Hash password and create user
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);
        const hashedPassword = await bcjs.hashSync(password,10)
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        // Create and send token
        const token = createToken(newUser._id);
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 2592000000 }); // 30 days
        return res.status(201).json({ success: true, token, message: "User registered successfully" });

    } catch (error) {
        console.error("Error in registerUser:", error);
        return res.status(500).json({ success: false, message: "Error in creating token" });
    }
};
const logout=async(req,res)=>{

    try {
         res.clearCookie('token')
         res.status(200).json({success:true,message:"logged out successfully"})
    } catch (error) {
        
    }

}


export { registerUser ,loginUser,logout};
