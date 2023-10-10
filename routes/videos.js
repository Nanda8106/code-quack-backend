import express from "express";
import { createVideos, fetchFavoriteVideos, fetchQuizData, fetchVideoData, fetchVideos, submitQuiz, updateFavorites } from "../controllers/videos.js";
import { verifyAdminToken } from "../middlewares/verifyAdminToken.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/create", verifyAdminToken, createVideos);
router.get("/all", fetchVideos);
router.get("/:videoID", verifyToken, fetchVideoData);
router.get("/quiz/:videoID", verifyToken, fetchQuizData);
router.post("/quiz/:videoID", verifyToken, submitQuiz);
router.put("/favorite", verifyToken, updateFavorites);
router.get("/favorites/all", verifyToken, fetchFavoriteVideos);

export default router;