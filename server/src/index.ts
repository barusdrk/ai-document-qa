import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
import askRoutes from "./routes/ask.js";
import documentRoutes from "./routes/documents.js";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const app =
  express();

const PORT =
  process.env.PORT || 3001;


/*
 * Middleware
 */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-document-qa-lovat.vercel.app/",
    ],
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "10mb",
  })
);


/*
 * Health check
 */

app.get(
  "/",
  (_req, res) => {
    res.json({
      message:
        "AI Document Q&A API running",
    });
  }
);


/*
 * API Routes
 */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api",
  uploadRoutes
);

app.use(
  "/api",
  askRoutes
);

app.use(
  "/api",
  documentRoutes
);

app.use(
  "/api",
  dashboardRoutes
);


/*
 * Error handler
 */

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);

    res.status(500).json({
      error:
        "Internal server error",
    });
  }
);


/*
 * Database connection
 */

async function startServer() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI!
    );

    console.log(
      "MongoDB connected"
    );

    app.listen(
      PORT,
      () => {
        console.log(
          `Server running on port ${PORT}`
        );
      }
    );
  } catch (error) {
    console.error(
      "Database connection failed:",
      error
    );

    process.exit(1);
  }
}


startServer();
