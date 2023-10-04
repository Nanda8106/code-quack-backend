import mongoose, { Schema } from "mongoose";

const RequestsSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    message: {
        type: String,
        trim: true
    },

}, { collection: "Requests", timestamps: true })

const Requests = mongoose.model("Requests", RequestsSchema);

export default Requests