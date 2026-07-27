import express from "express"
import { verifyUser } from "../middleware/authMiddleware.js"
import { addPlayerTeam, createTeam, deletePlayerInTeam, getAllTeams, getMyTeam, getTeamById, transferCaptain } from "../controller/teamController.js"

const router=express.Router()

router.route('/create').post(verifyUser,createTeam)
router.route('/myteam').get(verifyUser,getMyTeam)
router.route('/player/:teamId').put(verifyUser, addPlayerTeam).delete(verifyUser,deletePlayerInTeam)
router.route('/all').get(getAllTeams)
router.route('/:teamId').get(getTeamById)
router.route('/transfercaptain/:teamId').put(verifyUser, transferCaptain)
export default router