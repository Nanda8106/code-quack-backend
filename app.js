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

import { corsOptions } from "./config/corsConfig.js";

// importing the routes
import authRoutes from "./routes/auth.js"
import videosRoutes from "./routes/videos.js"
import requestingRoutes from "./routes/request.js";
import notificationRoutes from "./routes/notifications.js";
import feedbackRoutes from "./routes/feedback.js";
import userRoutes from "./routes/user.js";

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
app.use("/api/v1/auth/request", requestingRoutes)
app.use("/api/v1/auth/notifications", notificationRoutes)
app.use("/api/v1/auth/feedback", feedbackRoutes)
app.use("/api/v1/auth/user", userRoutes)

export {app, httpServer}
