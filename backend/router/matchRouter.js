import express from "express"
import { rolebased, verifyUser } from "../middleware/authMiddleware.js"
import { createMatch, getAllMatches, updateMatchResult } from "../controller/matchController.js"

const router = express.Router()


router.route('/create').post(verifyUser,rolebased('admin'),createMatch)
router.route('/updateMatch/:matchId').post(verifyUser,rolebased('admin'),updateMatchResult)
router.route('/all').get(getAllMatches)

export default router