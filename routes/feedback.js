import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createFeedback } from "../controllers/feedback.js";


const router = express.Router()

router.post("/", verifyToken, createFeedback);

export default router