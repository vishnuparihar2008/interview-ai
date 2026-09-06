import express from "express";

// IMPORTING ROUTES
import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(express.json());

// USING ROUTES
app.use("/api/auth", authRouter);

export default app;
