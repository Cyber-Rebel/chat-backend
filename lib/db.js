import mongoose  from "mongoose";
export const connectDB= async()=>{
    try{
        let conn=mongoose.connect(process.env.Mongodb)
      console.log("MongoDB Connectec") 
    }catch(err){
        console.log("mongodb error "+err)
    }
}