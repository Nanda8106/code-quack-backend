/**
 * Initializing api's required for the authentication like signup, login, logout
 */

import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { fetchProfile, resetPassword } from "../controllers/auth.js";


const router = express.Router()


router.get("/profile", verifyToken, fetchProfile) 
router.put("/reset-password", verifyToken, resetPassword) 

export default router