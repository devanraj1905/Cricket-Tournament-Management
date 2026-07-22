import React, { useState } from 'react'
import axiosInstance from '../api/axiosInstance'

export function PlayerStats() {
    const [playerId, setPlayerId] = useState('')
    const [stats, setStats] = useState(null)

    async function handleSearch(e) {
        e.preventDefault()
        try {
            const response = await axiosInstance.get("/totalstats/player/" + playerId)
            setStats(response.data)
        } catch (error) {
            setStats(null)
            console.log(error)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Player Stats</h1>
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <input type="text" placeholder="Player Id" className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={playerId} onChange={(e) => setPlayerId(e.target.value)} />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Search</button>
            </form>

            {stats ? (
                <div className="bg-white rounded-lg shadow p-5 grid grid-cols-2 gap-3 text-gray-700">
                    <p>Total Runs: <span className="font-semibold">{stats.totalRunsScored}</span></p>
                    <p>Balls Faced: <span className="font-semibold">{stats.totalBallsFaced}</span></p>
                    <p>Wickets: <span className="font-semibold">{stats.totalWickets}</span></p>
                    <p>Matches Played: <span className="font-semibold">{stats.matchesPlayed}</span></p>
                    <p>Overs Bowled: <span className="font-semibold">{stats.totalOvers}</span></p>
                    <p>Catches: <span className="font-semibold">{stats.totalCatches}</span></p>
                </div>
            ) : (
                <p className="text-gray-500">Search for a player to see stats</p>
            )}
        </div>
    )
}