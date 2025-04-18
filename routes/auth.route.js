import express from "express";
const router= express.Router();
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { generateToke } from "../lib/utlis.js";

router.post("/signup",async (req,res)=>{
//  res.send("signup create")
try{
    const {email,fullName,password}=req.body;
    console.log(email)
    if(password.length<6){
        return res.status(400).json({message:"Password must have big in size"}        )
    }
    // if(
    const user= await User.findOne({email})
    if(user) return  res.status(400).json({message:"User found in Database Go Login page "})
        const salt= await bcrypt.genSalt(10)
    const hashpassword= await bcrypt.hash(password,salt);
    const newUser= new User({
        fullName:fullName,
        email:email,
        password:hashpassword       
    })
    
    if(newUser){
 // genrate jwt token here 
 generateToke(newUser._id,res);
 await newUser.save()
 res.status(201).json({
    _id:newUser._id,
    fullName:newUser.fullName,
    email:newUser.email,
    profilePic:newUser.profilePic 
 })
    }else{
        res.status(400).json({message:"Plz fill Vaild data "})
    }

}catch(err){
    console.log("Server error"+err)
    res.status(500).json({message:"Server error provide error"})

}
})
// router.get("/logout",(req,res)=>{
//     try{
        
//     }catch(error){
//         message:"Internal server error "+error}
    
//    })
   router.post("/login",async (req,res)=>{
       const {email,password}=req.body;
    try{
        const user= await User.findOne({email})
        if(!user) return res.status(404).json({message:"User not exit create a new user usign same gamil"});
        const ispassword=await bcrypt.compare(password,user.password)
        if(!ispassword){
            return res.status(404).json({message:"Invaild data"});
        }
        generateToke(user._id,res)  
        res.status(200).json({
            id:user._id,
    fullName:user.fullName,
    email:user.email,
    profilePic:user.profilePic 
        })
        
    }catch(err){
        console.log(err)
        res.status(500).send("Server error"+err)
    } 
   })
   router.post("/logout",()=>{
    try{

        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logout is successfully   "})

    }catch(error){
        console.log("logout error "+error)
        res.status(500).json({message:"Server error provide error"})

    }
   })
export default router;