import express from "express";
import { checkPlagiarism } from "../controllers/plagiarismController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/plagiarism", authenticateToken, checkPlagiarism);

export default router;
