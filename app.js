import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from 'cors';
import dotenv from "dotenv"

export const app = express();

dotenv.config({ path: "./config/config.env" })

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

console.log("URL: ", process.env.WEB_URL)
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: [process.env.WEB_URL, process.env.LOCAL_URL],
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