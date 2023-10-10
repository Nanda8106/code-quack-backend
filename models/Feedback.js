import mongoose, { Schema } from "mongoose";

const FeedbacksSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    videos: {
        type: String,
        required: true,
        trim: true 
    },
    quiz: {
        type: String,
        required: true,
        trim: true
    },
    ui: {
        type: String,
        trim: true,
        required: true
    },
    icons: {
        type: String,
        trim: true,
        required: true
    },
    favoritePage: {
        type: String,
        trim: true,
        required: true
    },

}, { collection: "Feedbacks", timestamps: true })

const Feedbacks = mongoose.model("Feedbacks", FeedbacksSchema);

export default Feedbacks