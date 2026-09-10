import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

// IMPORTING ROUTES
import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// USING ROUTES
app.use("/api/auth", authRouter);

export default app;
