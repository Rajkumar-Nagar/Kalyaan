import mongoose, { Schema } from "mongoose";

const historySchema = new Schema({

    title: {
        type: String,
        require: true,
    },

    searchPrompt:
        [
            {
                type: Schema.Types.ObjectId,
                ref: "Content"
            }
        ]

}, { timestamps: true })

const History = mongoose.model("History", historySchema)

