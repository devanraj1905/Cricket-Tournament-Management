
import Team from "../model/Team.js"


export const createTeam = async (req, res) => {
        try {
                const { name } = req.body
                const captainId = req.user._id
                const team = await Team.create({
                        name,
                        captain: captainId,
                        players: [captainId]
                })
                res.status(201).json(team)
        }
        catch (error) {
                res.status(500).json({ message: error.message })
        }
}

export const addPlayerTeam = async (req, res) => {
        try {
                const { teamId } = req.params
                const { playerId } = req.body
                const team = await Team.findById(teamId)
                if (!team) {
                        return res.status(404).json({ message: "Team Doesn't Exists" })
                }
                if (!team.captain.equals(req.user._id)) {
                        return res.status(403).json({ message: "Only captain can add players" })
                }
                const alreadyInTeam = team.players.some((id) => id.equals(playerId));
                if (alreadyInTeam) {
                        return res.status(400).json({ message: "Player already exists" })
                }
                team.players.push(playerId)
                await team.save()
                res.status(200).json(team)
        }
        catch (error) {
                return res.status(500).json({ message: error.message })
        }

}
export const deletePlayerInTeam = async (req, res) => {
        try {
                const { teamId } = req.params
                const { playerId } = req.body
                const team = await Team.findById(teamId)
                if (!team) {
                        return res.status(404).json({ message: "Team Doesn't Exists" })
                }
                if (!team.captain.equals(req.user._id)) {
                        return res.status(403).json({ message: "Only captain can delete players" })
                }
                const isInTeam = team.players.some((id) => id.equals(playerId));
                if (!isInTeam) {
                        return res.status(400).json({ message: "Player not in team" })
                }
                if (team.captain.equals(playerId)) {
                        return res.status(400).json({ message: "Captain cannot be removed" })
                }

                team.players.pull(playerId)
                await team.save()
                res.status(200).json({ message: "Player Deleted successfully", team })
        }
        catch (error) {
                return res.status(500).json({ message: error.message })
        }
}

export const getMyTeam = async (req, res) => {
        try {

                const team = await Team.findOne({ captain: req.user._id })
                if (!team) {
                        return res.status(404).json("You have no team yet")
                }
                res.status(200).json(team)
        }
        
        catch (error) {
                return res.status(500).json({ message: error.message })
        }


}