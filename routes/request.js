import express from "express";
import { fetchRequests, requestVideos } from "../controllers/request.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdminToken } from "../middlewares/verifyAdminToken.js";

const router = express.Router()

router.post("/admin", verifyToken, requestVideos);
router.get("/admin", verifyAdminToken, fetchRequests);
export default router