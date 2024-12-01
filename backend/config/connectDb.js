import mongoose from "mongoose";
import expressAsyncHandler from 'express-async-handler'

export const connectDB = expressAsyncHandler(async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
    }catch(error){
        console.log(error)
        process.exit(1)
    }
})