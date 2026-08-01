import mongoose from "mongoose";

const key=process.env.MONGODB_KEY

if(!key){
    throw new Error("Non key found")
}

const connectdb= async():Promise<void>=>{
    if(mongoose.connections[0].readyState){
        return
    }
    try {
        await mongoose.connect(key)
        console.log("Database Connected")
    } catch (error) {
        console.log("Connection error",error)
        throw error
    }
}
export default connectdb