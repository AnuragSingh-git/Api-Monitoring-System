import mongoose from "mongoose";

export default const connectdb= async():Promise<void>=>{
    if(mongoose.connections[0].readyState){
        return
    }
    try {
        await mongoose.connect()
        console.log("Database Connected")
    } catch (error) {
        console.log("Connection error",error)
        throw error
    }
}