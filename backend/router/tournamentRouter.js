    import express from "express"
    import { rolebased, verifyUser } from "../middleware/authMiddleware.js"
    import { addTeamToTournament, createTournament, getAllTournaments } from "../controller/tournamentController.js"

    const router = express.Router()
    router.route("/create").post(verifyUser,rolebased("admin"),createTournament)
    router.route('/addteam/:tournamentId').put(verifyUser,rolebased("admin"),addTeamToTournament)
    router.route("/all").get(getAllTournaments)

    export default router