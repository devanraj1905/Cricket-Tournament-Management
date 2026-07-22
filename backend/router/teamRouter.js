import express from "express"
import { verifyUser } from "../middleware/authMiddleware.js"
import { addPlayerTeam, createTeam, deletePlayerInTeam, getMyTeam } from "../controller/teamController.js"

const router=express.Router()

router.route('/create').post(verifyUser,createTeam)
router.route('/myteam').get(verifyUser,getMyTeam)
router.route('/player/:teamId').put(verifyUser, addPlayerTeam).delete(verifyUser,deletePlayerInTeam)

export default router