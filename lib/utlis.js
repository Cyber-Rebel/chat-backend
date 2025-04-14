import jwt from "jsonwebtoken"
export const generateToke=(userId,res)=>{
    
    const token=jwt.sign ({userId},process.env.jwt,{
        expiresIn:"7d"
    })
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        // httpOnly:true,s
        // sameSite:"strick"
    })
    return  token;
}