import express from "express"
import { rolebased, verifyUser } from "../middleware/authMiddleware.js"
import { createPlayerStats } from "../controller/playerStatsController.js"

const router= express.Router()

router.route('/createstats/:matchId').post(verifyUser,rolebased("admin"),createPlayerStats)


export default router