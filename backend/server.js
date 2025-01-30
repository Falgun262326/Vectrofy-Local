import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cookieParser());

import conn from "./db/connectDB.js";
conn();

import auth from "./routes/authRoutes.js";
import list from "./routes/list.js";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allow cookies and credentials
  })
);
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", auth);
app.use("/api/v2", list);

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`server started at port ${PORT}`);
});
