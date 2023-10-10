import mongoose, { Schema } from "mongoose";

const NotificationsSchema = new mongoose.Schema({
    to: {
        type: String,
        required: true,
        trim: true
    },
    from: {
        type: String,
        required: true,
        trim: true 
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        trim: true
    },

}, { collection: "Notifications", timestamps: true })

const Notifications = mongoose.model("Notifications", NotificationsSchema);

export default Notifications