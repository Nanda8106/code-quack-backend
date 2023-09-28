/**
 * Main file to initialize the server
 * Creating mongoose connections
 * Using middlewares to check incoming request
 * Cors configuring
 */

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { createServer } from "http";
import { connectDatabase } from "./config/database.js";
import { corsOptions } from "./config/corsConfig.js";

// importing the routes
import authRoutes from "./routes/auth.js"
import videosRoutes from "./routes/videos.js"

dotenv.config()


const app = express()
const httpServer = createServer(app);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS middleware
app.use(cors(corsOptions));
app.use(helmet())

app.use("/api/v1/user", authRoutes)
app.use("/api/v1/auth/videos", videosRoutes)

const PORT = process.env.port ||  3000
httpServer.listen(PORT, () => {
    try{
        connectDatabase()
        console.log(`Server listening at port - ${PORT}`)
    }catch(err){
        console.log("server not connect")
    }
})








