import express from "express"
import { getAllPlayerStats, getTablePoints, playerTotalStats } from "../controller/statsController.js"

const router = express.Router()

router.route('/player/:playerId').get(playerTotalStats)
router.route('/pointstable/:tournamentId').get(getTablePoints)
router.route('/players').get(getAllPlayerStats)


export default router