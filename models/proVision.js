import mongoose from "mongoose";

const ProVisionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    images: [],
    text: {
        type: String,
        required: true
    },
    result: {
        type: String,
    }
},
{timestamps: true})

const ProVision = mongoose.model('ProVision', ProVisionSchema)

export default ProVision