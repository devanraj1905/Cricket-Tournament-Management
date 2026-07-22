    import express from "express"
    import { rolebased, verifyUser } from "../middleware/authMiddleware.js"
    import { addTeamToTournament, createTournament } from "../controller/tournamentController.js"

    const router = express.Router()
    router.route("/create").post(verifyUser,rolebased("admin"),createTournament)
    router.route('/addteam/:tournamentId').put(verifyUser,rolebased("admin"),addTeamToTournament)

    export default router