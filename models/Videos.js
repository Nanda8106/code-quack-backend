import mongoose from "mongoose";

const VideosSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
        trim: true
    },
    shortDescription: {
        type: String,
        required: true,
        trim: true
    },
    longDescription: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
    }

}, { collection: "Videos", timestamps: true })

const Videos = mongoose.model("Videos", VideosSchema);

export default Videos