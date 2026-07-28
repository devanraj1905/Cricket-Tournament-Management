import React, { useState, useEffect } from 'react'
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
    const [matchstatsId, setMatchStatsId] = useState('')
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
    const [tournamentError, setTournamentError] = useState('')
    const [addTeamError, setAddTeamError] = useState('')
    const [matchError, setMatchError] = useState('')
    const [resultError, setResultError] = useState('')
    const [statsError, setStatsError] = useState('')
    const [allTeams, setAllTeams] = useState([])
    const [allTournament, setAllTournament] = useState([])
    const [teamASearch, setTeamASearch] = useState('')
    const [teamBSearch, setTeamBSearch] = useState('')
    const [tournamentName, setTournamentName] = useState('')
    const [promoteSearch, setPromoteSearch] = useState('')
    const [foundPromotePlayer, setFoundPromotePlayer] = useState(null)
    const [promoteError, setPromoteError] = useState('')
    const [findMatch, setFindMatch] = useState('')
    const [allMatch, setAllMatch] = useState('')

    useEffect(() => {
        async function fetchAllTeams() {
            try {
                const response = await axiosInstance.get('/team/all')
                setAllTeams(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllTeams()
    }, [])

    useEffect(() => {
        async function fetchAllTournaments() {
            try {
                const response = await axiosInstance.get("/tournament/all")
                setAllTournament(response.data)
            }
            catch (error) {
                console.log(error)
            }

            
        }
        fetchAllTournaments()

    }, [])
    useEffect(() => {
        async function fetchAllMatches() {
            try {
                const response = await axiosInstance.get('/match/all')
                setAllMatch(response.data)
            }
            catch (error) {
                console.log(error)
            }

        }
    }, [])
    const filteredTournamentName = allTournament.filter((t) =>
        t.name.toLowerCase().includes(tournamentName.toLowerCase())
    )

    const filteredTeamA = allTeams.filter((t) =>
        t.name.toLowerCase().includes(teamASearch.toLowerCase())
    )
    const filteredTeamB = allTeams.filter((t) =>
        t.name.toLowerCase().includes(teamBSearch.toLowerCase())
    )
    const filteredMatches=allMatch.filter((m)=>{
        m.name.toLowerCase().includes(findMatch.toLowerCase())
    })
  

        async function handleCreateTournament(e) {
            e.preventDefault()
            if (!name || !startDate || !endDate || !status) {
                setTournamentError('Required field')
                return
            }
            try {
                const response = await axiosInstance.post('/tournament/create', { name, startDate, endDate, status })
                setTournament(response.data)
                setTournamentError('')
                setName("")
                setStartDate("")
                setEndDate("")
                setStatus("Upcoming")
            }
            catch (error) {
                setTournamentError(error.response.data.message)
            }
        }

    async function addTeamToTournament(e) {
        e.preventDefault()
        if (!tournamentId || !teamId) {
            setAddTeamError('Required field')
            return
        }
        try {
            const response = await axiosInstance.put('/tournament/addteam/' + tournamentId, { teamId })
            setAddTeam(response.data)
            setAddTeamError('')
            setTournamentId("")
            setTeamId("")
        } catch (error) {
            setAddTeamError(error.response.data.message)
        }
    }

    async function sheduleMatch(e) {
        e.preventDefault()
        if (!matchTournament || !teamA || !teamB || !venue || !matchDate) {
            setMatchError('Required field')
            return
        }
        try {
            const response = await axiosInstance.post('/match/create', { tournament: matchTournament, teamA, teamB, venue, matchDate })
            setMatch(response.data)
            setMatchError('')
            setMatchTournament("")
            setTournamentName("")
            setTeamA("")
            setTeamB("")
            setTeamASearch("")
            setTeamBSearch("")
            setVenue("")
            setMatchDate("")
        }
        catch (error) {
            setMatchError(error.response.data.message)
        }
    }

    async function updateMatchResult(e) {
        e.preventDefault()
        if (!matchId || !winner || !result) {
            setResultError('Required field')
            return
        }
        try {
            const response = await axiosInstance.post('/match/updatematch/' + matchId, { winner, result })
            setUpdateMatch(response.data)
            setResultError('')
            setMatchId("")
            setWinner("")
            setResult("")
        } catch (error) {
            setResultError(error.response.data.message)
        }
    }

    async function createPlayerStats(e) {
        e.preventDefault()
        if (!matchstatsId || !player || !team) {
            setStatsError('Required field')
            return
        }
        try {
            const response = await axiosInstance.post('/playerstats/createstats/' + matchstatsId, { player, team, runsScored, ballsFaced, wicketsTaken: wicketTacken, oversBowled, runConceded, catches })
            setStatsError('')
            setMatchStatsId("")
            setPlayer("")
            setTeam("")
            setRunsScored("")
            setBallsFaced("")
            setWicketTaken("")
            setOversbowled("")
            setRunConceded("")
            setCatches("")
        } catch (error) {
            setStatsError(error.response.data.message)
        }
    }

    async function handleSearchPromote(e) {
        e.preventDefault()
        try {
            const response = await axiosInstance.get('/player/search?email=' + promoteSearch)
            setFoundPromotePlayer(response.data)
            setPromoteError('')
        } catch (error) {
            setFoundPromotePlayer(null)
            setPromoteError(error.response.data.message)
        }
    }

    async function handlePromote() {
        try {
            const response = await axiosInstance.put('/player/promote/' + foundPromotePlayer._id)
            setFoundPromotePlayer(null)
            setPromoteSearch('')
            setPromoteError('')
        } catch (error) {
            setPromoteError(error.response.data.message)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <form onSubmit={handleSearchPromote} className="border rounded-lg p-4 space-y-3">
                <h2 className="text-xl font-semibold">Promote Player to Admin</h2>
                <input
                    type="text"
                    placeholder="Enter player email"
                    value={promoteSearch}
                    onChange={(e) => setPromoteSearch(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                />
                <button className="bg-blue-600 text-white px-4 py-1 rounded">Search</button>
                {promoteError && <p className="text-red-600 text-sm mt-2">{promoteError}</p>}
                {foundPromotePlayer && (
                    <div className="flex justify-between items-center mt-3">
                        <p>{foundPromotePlayer.name} ({foundPromotePlayer.email})</p>
                        <button onClick={handlePromote} type="button" className="bg-green-600 text-white px-4 py-1 rounded">
                            Promote
                        </button>
                    </div>
                )}
            </form>

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
                {tournamentError && <p className="text-red-600 text-sm mt-2">{tournamentError}</p>}
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
                {addTeamError && <p className="text-red-600 text-sm mt-2">{addTeamError}</p>}
            </form>

            <form onSubmit={sheduleMatch} className="border rounded-lg p-4 space-y-3">
                <h2 className="text-xl font-semibold">Schedule Match</h2>
                <div className="relative">
                    <label className="block text-sm">Tournament</label>
                    <input
                        type="text"
                        placeholder="Search tournament name"
                        value={tournamentName}
                        onChange={(e) => { setTournamentName(e.target.value); setMatchTournament('') }}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {tournamentName && !matchTournament && (
                        <div className="border rounded bg-white shadow mt-1">
                            {filteredTournamentName.map((t) => (
                                <p
                                    key={t._id}
                                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => { setMatchTournament(t._id); setTournamentName(t.name) }}
                                >
                                    {t.name}
                                </p>
                            ))}
                        </div>
                    )}
                </div>


                <div className="relative">
                    <label className="block text-sm">Team A</label>
                    <input
                        type="text"
                        placeholder="Search team name"
                        value={teamASearch}
                        onChange={(e) => { setTeamASearch(e.target.value); setTeamA('') }}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {teamASearch && !teamA && (
                        <div className="border rounded bg-white shadow mt-1">
                            {filteredTeamA.map((t) => (
                                <p
                                    key={t._id}
                                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => { setTeamA(t._id); setTeamASearch(t.name) }}
                                >
                                    {t.name}
                                </p>
                            ))}
                        </div>
                    )}
                </div>

                <div className="relative">
                    <label className="block text-sm">Team B</label>
                    <input
                        type="text"
                        placeholder="Search team name"
                        value={teamBSearch}
                        onChange={(e) => { setTeamBSearch(e.target.value); setTeamB('') }}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {teamBSearch && !teamB && (
                        <div className="border rounded bg-white shadow mt-1">
                            {filteredTeamB.map((t) => (
                                <p
                                    key={t._id}
                                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => { setTeamB(t._id); setTeamBSearch(t.name) }}
                                >
                                    {t.name}
                                </p>
                            ))}
                        </div>
                    )}
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
                {matchError && <p className="text-red-600 text-sm mt-2">{matchError}</p>}
            </form>

            <form onSubmit={updateMatchResult} className="border rounded-lg p-4 space-y-3">
                <h2 className="text-xl font-semibold">Update Match Result</h2>
                <div>
                    <label className="block text-sm">Match Id</label>
                    <input type="text" value={findMatch} onChange={(e) => {setFindMatch(e.target.value);setMatchId('')}} className="border rounded px-2 py-1 w-full" />
                    {findMatch && !matchId&& (
                        <div>
                            {filteredMatches.map((m)=>{
                                <p key={m._id} onClick={()=>{setMatchId(m._id);setFindMatch(m.name)}} >{m.name}</p>
                                })}
                        </div>
                    )

                    }
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
                {resultError && <p className="text-red-600 text-sm mt-2">{resultError}</p>}
            </form>

            <form onSubmit={createPlayerStats} className="border rounded-lg p-4 space-y-3">
                <h2 className="text-xl font-semibold">Add Player Match Stats</h2>
                <div>
                    <label className="block text-sm">Match Id</label>
                    <input type="text" value={matchstatsId} onChange={(e) => setMatchStatsId(e.target.value)} className="border rounded px-2 py-1 w-full" />
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
                {statsError && <p className="text-red-600 text-sm mt-2">{statsError}</p>}
            </form>
        </div>
    )
}