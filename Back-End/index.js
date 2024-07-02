import express from "express";
import cookieParser from "cookie-parser";
import userrouter from "./routes/router.js";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const PORT = 8080;

app.use("/api", userrouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connnect to DB server");
    console.log("Server is running " + PORT);
  });
});
