import express from "express";
import { createVideos, fetchVideos } from "../controllers/videos.js";
import { verifyAdminToken } from "../middlewares/verifyAdminToken.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/create", verifyAdminToken, createVideos);
router.get("/all", verifyToken, fetchVideos);

export default router;