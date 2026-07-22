import express from "express"
import { getTablePoints, playerTotalStats } from "../controller/statsController.js"

const router = express.Router()

router.route('/player/:playerId').get(playerTotalStats)
router.route('/pointstable/:tournamentId').get(getTablePoints)

export default router