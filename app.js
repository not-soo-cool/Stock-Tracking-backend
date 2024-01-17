import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from 'cors';
export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use(
  cors({
    // origin: process.env.WEB_URL,
    origin: "https://stock-lyart.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

import { userRouter } from "./routes/User.js";
app.use("/api/v1", userRouter);

// app.use(express.static(path.resolve("./frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./frontend/build/index.html"));
});