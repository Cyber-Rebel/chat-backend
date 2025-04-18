import{v2 as cloudinary} from "cloudinary";
// import { config } from "dotenv";
import dotenv from "dotenv"
dotenv.config();
cloudinary.config({
    cloud_name:process.env.Cloudinary_cloud_name,
    api_key:process.env.Cloudinary_API_Key,
    api_secreat:process.env.Cloudinary_API_secretKey
})
export default cloudinary;