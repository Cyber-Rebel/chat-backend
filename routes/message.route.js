import express from "express";
const router= express.Router();
import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import dotenv from 'dotenv'
import { protechroutes } from "../middleware/ProtechRoute.js";
import cloudinary from "../lib/cloudinary.js";
dotenv.config();

router.get('/users',protechroutes,async (req,res)=>{
    try{
        const logginuser=req.user._id;
        const filteruse= await User.find({_id:{$ne:logginuser}}).select('-password')
    // res.status(501).json({message:"Bad gate way Auth your self"})
    res.status(200).json(filteruse);
    }catch(err){
        console.log(error + "message /user router thow error ")
        res.status(500),json({message:"Internal server error"})
    }

})
router.get('/:id',protechroutes,async(req,res)=>{
    try{
    const {id:usertosend}=req.params;
    const myId = req.user._id;
    const message= await Message.find({
        $or:[
            {senderId:myId,reciverId:usertosend},
            {senderId:usertosend,reciverId:myId}
        ]
    }
)
res.status(200).json(message)
}catch(err){
        console.log(err+ "message /:id router thow error ")
        res.status(500),json({message:"Internal server error"})
    }
})
router.post('/send/:id',protechroutes,async (req,res)=>{
    try{
            const {text,image}=req.body;
            const {id:receiverId}=req.params;
            const senderId = req.user._id;
            let imageurl;
            if(image){
                const  uploadResponce= await cloudinary.uploader(image);
                imageUrl:uploadResponce.secure_url;

            }

            const newMessage= new Message({
                senderId:senderId,
                receiverId:receiverId,
                text,
                image:imageurl
            })
            await newMessage.save();
            res.status(201).json(newMessage)
    }catch(err){
        console.log(err+ "message /send/:id router thow error ")
        res.status(500),json({message:"Internal server error"})
    }
})

export default router;