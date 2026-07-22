import Match from "../model/Match.js";
import Tournament from "../model/Tournament.js";





export const createMatch = async (req, res) => {
    try {
        const { tournament, teamA, teamB, venue, matchDate } = req.body

        if (teamA === teamB) {
            res.status(500).json({ message: "Cannot be play against itself" });
        }

        const tournamentDoc = await Tournament.findById(tournament)
        if (!tournamentDoc) {
            res.status(500).json({ message: "Tournament does not exists" });
        }
        const teamAInTournament = tournamentDoc.teams.some((id) => id.equals(teamA));
        const teamBInTournament = tournamentDoc.teams.some((id) => id.equals(teamB));

        if (!teamAInTournament || !teamBInTournament) {
            return res.status(400).json({ message: "Both teams must be part of this tournament" });
        }

        const match = await Match.create({
            tournament,
            teamA,
            teamB,
            venue,
            matchDate,
        })

        res.status(201).json(match)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMatchResult=async(req,res)=>{
try{
        const {matchId}=req.params
    const {winner,result}=req.body
    const match = await Match.findById(matchId)

    if(!match){
        return res.status(404).json({message:"Match does not exists."})
    }
    if (!match.teamA.equals(winner) && !match.teamB.equals(winner)) {
    return res.status(400).json({ message: "Winner must be one of the two teams that played" });
}
match.winner = winner;
match.result = result;
match.status = "completed"
await match.save();
res.status(200).json(match);
}
catch(error) { res.status(500).json({ message: error.message }) }
}