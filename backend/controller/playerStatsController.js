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
                        match: matchId,
                        player,
                        team,
                        runsScored: Number(runsScored) || 0,
                        ballsFaced: Number(ballsFaced) || 0,
                        wicketsTaken: Number(wicketsTaken) || 0,
                        oversBowled: Number(oversBowled) || 0,
                        runsConceded: Number(runsConceded) || 0,
                        catches: Number(catches) || 0,
                    });

        res.status(201).json(playerStats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

