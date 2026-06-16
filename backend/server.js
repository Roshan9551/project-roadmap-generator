import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv";
import authRoute from "./routes/auth.routes.js"
import projectRoute from "./routes/project.route.js"
import progressRoute from "./routes/progress.routes.js"
import streakRoute from "./routes/streak.route.js"
import healthRoute from "./routes/health.routes.js"
import connectDb from "./config/db.js";

dotenv.config();
connectDb()

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/projects", projectRoute);
app.use("/api/progress", progressRoute);
app.use("/api/streak", streakRoute);
app.use("/api/healthScore", healthRoute);

app.get("/", (req, res) => {
    res.json({ message: "Pathshala backend is running" })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
