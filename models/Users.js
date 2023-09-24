import mongoose, { Schema } from "mongoose";

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        enum: ["male", "female", "others"]
    },
    password: {
        type: String,
        required: true,
    },
    deaf: {
        type: Boolean,
        default: false,
        required: true
    },
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: "Videos"
        }
    ],
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["admin", "user"]
    }

}, { collection: "Users", timestamps: true })

const Users = mongoose.model("Users", UsersSchema);

export default Users