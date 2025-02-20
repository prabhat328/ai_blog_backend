import express from "express";
import {
  googleLogin,
  logout,
  checkLoginStatus,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/login", googleLogin);
router.post("/logout", logout);
router.get("/status", authenticateToken, checkLoginStatus);

export default router;
