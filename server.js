import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import logger from "morgan";
import cookieParser from "cookie-parser";

// Import route files
import authRoutes from "./routes/authRoutes.js";
import contentRoute from "./routes/contentRoutes.js";
import topicRoute from "./routes/topicSelectionRoutes.js";
import translateRoute from "./routes/translateRoutes.js";
import plagiarism from "./routes/plagiarismRoutes.js";

// Load env configurations
dotenv.config();

// Initialize server
const app = express();
const PORT = process.env.PORT || 8000;

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["*"];

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(logger("dev"));
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      // Disable when deploying
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// To check server status
app.get("/", (req, res) => {
  res.json({ status: "running" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/", topicRoute);
app.use("/", contentRoute);
app.use("/", plagiarism);
app.use("/", translateRoute);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Failed to connect to MongoDB", err));
