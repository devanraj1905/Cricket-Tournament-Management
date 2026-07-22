import React, { useState } from 'react'
import axiosInstance from '../api/axiosInstance'

export function PointsTable() {
    const [table, setTable] = useState([])
    const [tournamentId, setTournamentId] = useState('')

    async function fetchPointsTable(e) {
        e.preventDefault()
        try {
            const response = await axiosInstance.get('/totalstats/pointstable/' + tournamentId)
            setTable(response.data.pointsTable)
        } catch (error) {
            setTable([])
            console.log(error)
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Points Table</h1>
            <form onSubmit={fetchPointsTable} className="flex gap-2 mb-6">
                <input type="text" placeholder="Tournament Id" className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={tournamentId} onChange={(e) => setTournamentId(e.target.value)} />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Search</button>
            </form>

            {table.length > 0 && (
                <table className="w-full bg-white rounded-lg shadow overflow-hidden">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="text-left px-4 py-2">Team</th>
                            <th className="px-4 py-2">Played</th>
                            <th className="px-4 py-2">Won</th>
                            <th className="px-4 py-2">Lost</th>
                            <th className="px-4 py-2">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row) => (
                            <tr key={row.team} className="border-t">
                                <td className="px-4 py-2 text-sm">{row.team}</td>
                                <td className="px-4 py-2 text-center">{row.played}</td>
                                <td className="px-4 py-2 text-center">{row.won}</td>
                                <td className="px-4 py-2 text-center">{row.lost}</td>
                                <td className="px-4 py-2 text-center font-semibold">{row.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}