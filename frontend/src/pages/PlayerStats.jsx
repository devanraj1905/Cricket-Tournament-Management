import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { Link } from 'react-router-dom'

export function PlayerStats() {
    const [playerId, setPlayerId] = useState('')
    const [stats, setStats] = useState(null)
    const [players, setPlayers] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSearch(e) {
        e.preventDefault()
        try {
            const response = await axiosInstance.get("/totalstats/player/search?email" + playerId)
            setStats(response.data)
        } catch (error) {
            setStats(null)
            console.log(error)
        }
    }
    useEffect(() => {
        getPlayers()
    }, [])

    async function getPlayers() {
        try {
            setLoading(true)
            const response = await axiosInstance.get("/totalstats/players")
            setPlayers(response.data)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }

    }
    const filteredPlayers = players.filter((item) =>
        item.player.name.toLowerCase().includes(search.toLowerCase())
    )
    if (loading) return <div className="p-4 text-gray-500"><div className="fixed inset-0 bg-black/50 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg">
            Loading...

        </div>

    </div></div>
    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-6xl mx-auto px-4">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Player Statistics
                </h1>
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">

                    <h2 className="text-xl font-semibold mb-4">
                        Search Player Statistics
                    </h2>

                    <form onSubmit={handleSearch} className="flex gap-3">

                        <input
                            type="text"
                            placeholder="Enter Player ID"
                            value={playerId}
                            onChange={(e) => setPlayerId(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            className="bg-blue-600 text-white px-6 rounded-md hover:bg-blue-700"
                        >
                            Search
                        </button>

                    </form>

                    {stats && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">

                            <div className="bg-gray-50 p-4 rounded">
                                <p className="text-gray-500">Runs</p>
                                <h3 className="text-2xl font-bold">{stats.totalRunsScored}</h3>
                            </div>
                            <div className="bg-gray-50 p-4 rounded">
                                <p className="text-gray-500">Balls Faced</p>
                                <h3 className="text-2xl font-bold">{stats.totalBallsFaced}</h3>
                            </div>
                            <div className="bg-gray-50 p-4 rounded">
                                <p className="text-gray-500">Matches</p>
                                <h3 className="text-2xl font-bold">{stats.matchesPlayed}</h3>
                            </div>
                            <div className="bg-gray-50 p-4 rounded">
                                <p className="text-gray-500">Wickets</p>
                                <h3 className="text-2xl font-bold">{stats.totalWickets}</h3>
                            </div>
                            <div className="bg-gray-50 p-4 rounded">
                                <p className="text-gray-500">Overs</p>
                                <h3 className="text-2xl font-bold">{stats.totalOvers}</h3>
                            </div>
                            <div className="bg-gray-50 p-4 rounded">
                                <p className="text-gray-500">Catches</p>
                                <h3 className="text-2xl font-bold">{stats.totalCatches}</h3>
                            </div>

                        </div>

                    )}

                </div>

                <div className="bg-white rounded-lg shadow-md overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-blue-600 text-white">

                            <tr>

                                <th className="py-3 px-4 text-left">Player</th>
                                <th className="py-3 px-4 text-left">Team</th>
                                <th className="py-3 px-4 text-center">Runs</th>
                                <th className="py-3 px-4 text-center">Wickets</th>
                                <th className="py-3 px-4 text-center">Catches</th>
                                <th className="py-3 px-4 text-center">Profile</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredPlayers.length > 0 ? (

                                filteredPlayers.map((item) => (

                                    <tr
                                        key={item._id}
                                        className="border-b hover:bg-gray-50"
                                    >

                                        <td className="py-3 px-4">
                                            {item.player.name}
                                        </td>

                                        <td className="py-3 px-4">
                                            {item.team.name}
                                        </td>

                                        <td className="py-3 px-4 text-center">
                                            {item.runsScored}
                                        </td>

                                        <td className="py-3 px-4 text-center">
                                            {item.wicketsTaken}
                                        </td>

                                        <td className="py-3 px-4 text-center">
                                            {item.catches}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <Link to={"/players/" + item.player._id} className='text-blue-600'>View</Link>
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center py-6 text-gray-500"
                                    >
                                        No players found.
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table></div>
            </div>
        </div>
    )
}