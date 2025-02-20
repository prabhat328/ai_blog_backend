import express from "express";
import { getContent, saveContent } from "../controllers/contentController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth routes
router.get("/content", authenticateToken, getContent);
router.post("/content", authenticateToken, saveContent);

export default router;
