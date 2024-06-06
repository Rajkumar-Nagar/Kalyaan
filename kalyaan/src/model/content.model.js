import mongoose, {Schema} from "mongoose";

const contentSchema=new Schema({

    prompt:{
        type:String,
    },
    solution:{
        type:String,
    }

},{timestamps:true})

export const Content =mongoose.model("Content",contentSchema)