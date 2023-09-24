/**
 * Initializing and configuring the database
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

export const connectDatabase = async () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("DATABASE CONNECTED")
    }).catch((err) => {
        console.log("DATABASE NOT CONNECTED", err?.message)
    })

}

