import express from "express"
import { findPlayerByEmail, getPlayerById, getProfile, loginPlayer, logoutPlayer, promotePlayer, registerPlayer } from "../controller/playerController.js"
import { rolebased, verifyUser } from "../middleware/authMiddleware.js"

const router = express.Router()


router.route('/register').post(registerPlayer)
router.route('/login').post(loginPlayer)
router.route('/logout').post(logoutPlayer)
router.route('/profile').get(verifyUser,getProfile)
router.route('/search').get(verifyUser, findPlayerByEmail)
router.route('/:playerId').get(getPlayerById)
router.route('/promote/:playerId').put(verifyUser,rolebased('admin'),promotePlayer)



export default router