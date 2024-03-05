import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    query: {
        type: String,
        required: true
    },
    result: {
        type: String,
    }
},
{timestamps: true})

const Query = mongoose.model('Query', querySchema)

export default Query