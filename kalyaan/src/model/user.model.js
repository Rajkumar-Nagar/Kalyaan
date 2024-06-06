import mongoose, { Schema, Types } from "mongoose";

const userSchema = new Schema({

    userName: {
        type: String,
        unique: true,
        require: true,
        index: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        trim: true,
    },

    // avatar: {
    //     type: String,
    //     // require:true
    // },
    // coverImage: {
    //     type: String,
    //     // requird:true,
    // },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    searchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "History"
        }
    ],
    refreshToken:{
        type:String
    }

}, {
    timestamps: true
})


export const User = mongoose.models.User ||mongoose.model("User", userSchema)