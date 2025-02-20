import express from "express";
import { searchTopic, saveTopic } from "../controllers/topicController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth routes
router.get("/topic", authenticateToken, searchTopic);

export default router;
