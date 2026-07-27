import Tournament from "../model/Tournament.js"

export const createTournament = async (req, res) => {
  try {
    const { name, startDate, endDate, status } = req.body

    const tournament = await Tournament.create({
      name,
      createdBy: req.user._id, startDate, endDate, status
    })
    res.status(201).json(tournament)

  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }

}

export const addTeamToTournament = async (req, res) => {
  const { tournamentId } = req.params
  const { teamId } = req.body

  if (!teamId) {
    return res.status(400).json({ message: "Team is not exists" })

  }

  if (!tournamentId) {
   return res.status(400).json({ message: "Tournament is not exists" })

  }
  const tournament = await Tournament.findById(tournamentId);
if (!tournament) {
    return res.status(404).json({ message: "Tournament doesn't exist" });
} 
  const alreadyInTournament = tournament.teams.some((id) => id.equals(teamId));
  if (alreadyInTournament) {
    return res.status(400).json({ message: "Team already exists" })
  }
  tournament.teams.push(teamId)
  await tournament.save()
  res.status(200).json(tournament)

}
export const getAllTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find().populate("teams","name");
        res.status(200).json(tournaments)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};