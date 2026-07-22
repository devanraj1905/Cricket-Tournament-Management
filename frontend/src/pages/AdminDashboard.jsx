import React, { useState } from 'react'
import axiosInstance from '../api/axiosInstance'

export function AdminDashboard() {
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [status, setStatus] = useState('Upcoming')
    const [tournament, setTournament] = useState('')
    const [addTeam, setAddTeam] = useState('')
    const [tournamentId, setTournamentId] = useState('')
    const [teamId, setTeamId] = useState('')
    const [teamA, setTeamA] = useState('')
    const [teamB, setTeamB] = useState('')
    const [venue, setVenue] = useState('')
    const [matchDate, setMatchDate] = useState('')
    const [matchTournament, setMatchTournament] = useState('')
    const [matchId, setMatchId] = useState('')
    const [updateMatch, setUpdateMatch] = useState('')
    const [match, setMatch] = useState("")
    const [winner, setWinner] = useState('')
    const [result, setResult] = useState('')
    const [player, setPlayer] = useState("")
    const [team, setTeam] = useState("")
    const [runsScored, setRunsScored] = useState("")
    const [ballsFaced, setBallsFaced] = useState("")
    const [wicketTacken, setWicketTaken] = useState("")
    const [catches, setCatches] = useState("")
    const [oversBowled, setOversbowled] = useState("")
    const [runConceded, setRunConceded] = useState("")
    async function handleCreateTournament(e) {
        e.preventDefault()
        try {
            const response = await axiosInstance.post('/tournament/create', { name, startDate, endDate, status })
            setTournament(response.data)

        }
        catch (error) {
            console.log(error);

        }
    }
    async function addTeamToTournament(e) {
        e.preventDefault()
        try {
            const response = await axiosInstance.put('/tournament/addteam/' + tournamentId, { teamId })
            setAddTeam(response.data)

        } catch (error) {
            console.log(error);

        }
    }
    async function sheduleMatch(e) {
        e.preventDefault()
        try {
            const response = await axiosInstance.post('/match/create', { tournament: matchTournament, teamA, teamB, venue, matchDate })
            setMatch(response.data)
        }
        catch (error) {
            console.log(error);

        }

    }

    async function updateMatchResult(e) {
        e.preventDefault()
        try {
            const response = await axiosInstance.post('/match/updatematch/' + matchId, { winner, result })
            setUpdateMatch(response.data)
        } catch (error) {
            console.log(error);

        }

    }
    async function createPlayerStats(e) {
        e.preventDefault()
        try {
            const response = await axiosInstance.post('/playerstats/createstats/' + matchId, { player, team, runsScored, ballsFaced, wicketsTaken: wicketTacken, oversBowled, runConceded, catches })

        } catch (error) {
            console.log(error);

        }
    }
   return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <form onSubmit={handleCreateTournament} className="border rounded-lg p-4 space-y-3">
            <h2 className="text-xl font-semibold">Create Tournament</h2>
            <div>
                <label className="block text-sm">Tournament Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
                <label className="block text-sm">Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
                <label className="block text-sm">End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <button className="bg-blue-600 text-white px-4 py-1 rounded">Submit</button>
        </form>

        <form onSubmit={addTeamToTournament} className="border rounded-lg p-4 space-y-3">
            <h2 className="text-xl font-semibold">Add Team to Tournament</h2>
            <div>
                <label className="block text-sm">Tournament Id</label>
                <input type="text" value={tournamentId} onChange={(e) => setTournamentId(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
                <label className="block text-sm">Team Id</label>
                <input type="text" value={teamId} onChange={(e) => setTeamId(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <button className="bg-blue-600 text-white px-4 py-1 rounded">Add</button>
        </form>

        <form onSubmit={sheduleMatch} className="border rounded-lg p-4 space-y-3">
            <h2 className="text-xl font-semibold">Schedule Match</h2>
            <div>
                <label className="block text-sm">Tournament</label>
                <input type="text" value={matchTournament} onChange={(e) => setMatchTournament(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
                <label className="block text-sm">Team A</label>
                <input type="text" value={teamA} onChange={(e) => setTeamA(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
                <label className="block text-sm">Team B</label>
                <input type="text" value={teamB} onChange={(e) => setTeamB(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
                <label className="block text-sm">Venue</label>
                <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
                <label className="block text-sm">Match Date</label>
                <input type="date" value={matchDate} onChange={(e) => setMatchDate(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <button className="bg-blue-600 text-white px-4 py-1 rounded">Submit</button>
        </form>

        <form onSubmit={updateMatchResult} className="border rounded-lg p-4 space-y-3">
            <h2 className="text-xl font-semibold">Update Match Result</h2>
            <div>
                <label className="block text-sm">Match Id</label>
                <input type="text" value={matchId} onChange={(e) => setMatchId(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
                <label className="block text-sm">Winner (Team Id)</label>
                <input type="text" value={winner} onChange={(e) => setWinner(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
                <label className="block text-sm">Result</label>
                <input type="text" value={result} onChange={(e) => setResult(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <button className="bg-blue-600 text-white px-4 py-1 rounded">Submit</button>
        </form>

        <form onSubmit={createPlayerStats} className="border rounded-lg p-4 space-y-3">
            <h2 className="text-xl font-semibold">Add Player Match Stats</h2>
            <div>
                <label className="block text-sm">Match Id</label>
                <input type="text" value={matchId} onChange={(e) => setMatchId(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
                <label className="block text-sm">Player Id</label>
                <input type="text" value={player} onChange={(e) => setPlayer(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
                <label className="block text-sm">Team Id</label>
                <input type="text" value={team} onChange={(e) => setTeam(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm">Runs Scored</label>
                    <input type="number" value={runsScored} onChange={(e) => setRunsScored(e.target.value)} className="border rounded px-2 py-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm">Balls Faced</label>
                    <input type="number" value={ballsFaced} onChange={(e) => setBallsFaced(e.target.value)} className="border rounded px-2 py-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm">Wickets Taken</label>
                    <input type="number" value={wicketTacken} onChange={(e) => setWicketTaken(e.target.value)} className="border rounded px-2 py-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm">Overs Bowled</label>
                    <input type="number" value={oversBowled} onChange={(e) => setOversbowled(e.target.value)} className="border rounded px-2 py-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm">Runs Conceded</label>
                    <input type="number" value={runConceded} onChange={(e) => setRunConceded(e.target.value)} className="border rounded px-2 py-1 w-full" />
                </div>
                <div>
                    <label className="block text-sm">Catches</label>
                    <input type="number" value={catches} onChange={(e) => setCatches(e.target.value)} className="border rounded px-2 py-1 w-full" />
                </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-1 rounded">Submit</button>
        </form>
    </div>
)}

