import PlayerMatchStats from "../model/PlayerMatchStats.js"

export const createPlayerStats = async (req, res) => {
    try {
        const { matchId } = req.params;
        const { player, team, runsScored, ballsFaced, wicketsTaken, oversBowled, runsConceded, catches } = req.body;

        const existingStats = await PlayerMatchStats.findOne({ match: matchId, player });
        if (existingStats) {
            return res.status(400).json({ message: "Stats already recorded for this player in this match" });
        }

        const playerStats = await PlayerMatchStats.create({
            match: matchId,player,team,runsScored,ballsFaced,wicketsTaken,oversBowled,runsConceded,catches,
        });

        res.status(201).json(playerStats);  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

