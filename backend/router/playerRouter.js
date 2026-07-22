import express from "express"
import { getProfile, loginPlayer, registerPlayer } from "../controller/playerController.js"
import { verifyUser } from "../middleware/authMiddleware.js"

const router = express.Router()


router.route('/register').post(registerPlayer)
router.route('/login').post(loginPlayer)
router.route('/profile').get(verifyUser,getProfile)




export default router