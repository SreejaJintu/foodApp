import mongoose from "mongoose";
import foodModel from "../models/food.js";
import fs from 'fs'

const addFood=async(req,res)=>{

    // let filename=`${req.file.filename}`

    const newFood= new foodModel({
        name:req.body.name,
        description:req.body.description,
        // image:filename,
        price:req.body.price,
        category:req.body.category
 
         })
      
    try {
       
      await  newFood.save()
      res.json({success:true,message:"food added"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error in addind food"})

        
    }

}

const listFood=async(req,res)=>{
try {
    const foods= await foodModel.find({})
    res.json({success:true,data:foods})
    
} catch (error) {
    console.log(error)
res.json({success:false,message:error})
}

}

const removeFood = async (req, res) => {
    try {
        const deletedFood = await foodModel.findByIdAndDelete(req.body.id);

        if (!deletedFood) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        res.json({ success: true, message: "Food item deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error deleting food item" });
    }
};


export {addFood,listFood,removeFood}