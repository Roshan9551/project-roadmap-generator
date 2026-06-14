import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv";
import authRoute from "./routes/auth.routes.js"
import connectDb from "./config/db.js";

dotenv.config();
connectDb()

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute)

app.get("/", (req, res) => {
    res.json({ message: "Pathshala backend is running" })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
