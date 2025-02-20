import express from "express";
import { translate } from "../controllers/translateController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth routes
router.get("/translate", authenticateToken, translate);

export default router;
