import mongoose, { Types } from "mongoose"
import PlayerMatchStats from "../model/PlayerMatchStats.js"
import Tournament from "../model/Tournament.js"
import Match from "../model/Match.js"

export const playerTotalStats = async (req, res) => {
    try {
        const { playerId } = req.params

        const stats = await PlayerMatchStats.aggregate([{
            $match: { player: new mongoose.Types.ObjectId(playerId) }
        },
        {
            $group: {
                _id: "$player",
                totalRunsScored: { $sum: "$runsScored" },
                totalBallsFaced: { $sum: "$ballsFaced" },
                totalWickets: { $sum: "$wicketsTaken" },
                totalOvers: { $sum: "$oversBowled" },
                totalRunsConceded: { $sum: "$runsConceded" },
                totalCatches: { $sum: "$catches" },
                matchesPlayed: { $sum: 1 },

            }
        }])

        if (stats.length === 0) {
            return res.status(404).json({ message: "Player has no stats" });
        }

        res.status(200).json(stats[0]);
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export const getTablePoints=async(req,res)=>{
    try{
        const {tournamentId}=req.params
    const tournament = await Tournament.findById(tournamentId)

    if(!tournament){
         return res.status(404).json({ message: "Tournament has not stats" });
        
    }
    const matches =await Match.find({
        tournament:tournamentId,status:"completed"
    })
    const pointsTable = tournament.teams.map((teamId) => {
    let played = 0;
    let won = 0;
    let lost = 0;

    matches.forEach((match) => {
        const isTeamA = match.teamA.equals(teamId);
        const isTeamB = match.teamB.equals(teamId);

        if (isTeamA || isTeamB) {
            played++;
            if (match.winner && match.winner.equals(teamId)) {
                won++;
            } else {
                lost++;
            }
        }
    });

    return {
        team: teamId,
        played,
        won,
        lost,
        points: won * 2,
    };
});
    pointsTable.sort((a,b)=> b.points - a.points)

    res.status(200).json({pointsTable})
    }
     catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAllPlayerStats = async (req, res) => {
    try {

        const stats = await PlayerMatchStats
            .find()
            .populate("player", "name")
            .populate("team", "name");

        res.status(200).json(stats);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}