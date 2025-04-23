import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
export const protechroutes= async (req,res,next)=>{
    const token= req.cookies.jwt;
    try{
        if(!token){
            return res.status(401).json({message:"Token is not provied"})
        }
        const decode = jwt.verify(token,process.env.jwt)
        console.log(decode)
        if(!decode){
            return res.status(401).json({message:"Token provied is invaild"})
        }
        const user = await User.findById(decode.userId).select("-password");// userId se user ko find karo and password ko mat lo 
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        req.user=user;// send this user all information in /profilechange routes
        next();
    }catch(error){
        console.log("Protechroutes errror"+error)
        return   res.status(500).json({ message: "Authentication failed" });
    }

}