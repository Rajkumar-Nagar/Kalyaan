import mongoose from "mongoose";

const connectToMongoose=async()=>{
    try {
        const Mongouri=await mongoose.connect(
            "mongodb+srv://rajkumarnagar264:rajdhakad@cluster0.62oqjlh.mongodb.net/gemini"
            // `${process.env.MONGO_URI}`
        )
        console.log(`mongoose connected !! DB Host : ${Mongouri.connection.host}` )
    } catch (error) {
        console.log("error in connecting mongoose",error)
    }
}

export default connectToMongoose
// export {connectToMongoose}
