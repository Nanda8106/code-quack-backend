import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { fetchNotifications } from "../controllers/notifications.js";

const router = express.Router()

router.get("/", verifyToken, fetchNotifications);

export default router
