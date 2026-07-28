import mongoose from "mongoose";
import express from "express"
import cors from "cors"
import player from "./router/playerRouter.js"
import team from "./router/teamRouter.js"
import tournament from "./router/tournamentRouter.js"
import match from "./router/matchRouter.js"
import playerStats from "./router/playerStatsRouter.js"
import totalStats from "./router/statsRouter.js"
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import cookieParser from "cookie-parser";

dotenv.config()
connectDB()

const app = express()
app.use(cookieParser())
app.use(cors({
  origin: "https://cricket-tournament-management.vercel.app",
  credentials: true,
}))
app.use(express.json())
app.use('/api/player', player)
app.use('/api/team', team)
app.use('/api/tournament', tournament)
app.use('/api/match', match)
app.use('/api/playerStats', playerStats)
app.use('/api/totalStats', totalStats)

app.get("/", (req, res) => {
  res.send("Cricket Tournament API is running");
});

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)

})
