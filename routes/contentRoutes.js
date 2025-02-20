import express from "express";
import { getContent, modifyContent } from "../controllers/contentController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/content", authenticateToken, getContent);
router.post("/refine-content", authenticateToken, modifyContent);

export default router;
