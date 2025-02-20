import express from "express";
import { getContent } from "../controllers/contentController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/content", authenticateToken, getContent);

export default router;
