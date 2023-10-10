import mongoose, { Schema } from "mongoose";

const SubmissionSchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Videos",
        required: true
    },
    answersSubmitted: {
        type: Array,
        required: true
    },
    score: {
        type: Number,
        default: 0,
        required: true
    }

}, { collection: "Submissions", timestamps: true })

const Submissions = mongoose.model("Submissions", SubmissionSchema);

export default Submissions