import express from "express";
import { requestVideos } from "../controllers/request.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router()

router.post("/admin", verifyToken, requestVideos)
export default router