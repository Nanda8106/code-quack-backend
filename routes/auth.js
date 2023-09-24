/**
 * Initializing api's required for the authentication like signup, login, logout
 */

import express from "express";
import { verifyDetails } from "../middlewares/verifyDetails.js";
import { login, signup } from "../controllers/auth.js";

const router = express.Router()


router.post("/signup", verifyDetails, signup)   // api for signup
router.post("/login", login)   // api for login

export default router