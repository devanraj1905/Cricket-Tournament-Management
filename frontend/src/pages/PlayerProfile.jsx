import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'

export function PlayerProfile() {
    const { playerId } = useParams()
    const [player, setPlayer] = useState(null)
    const [stats, setStats] = useState(null)
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        async function fetchPlayer() {
            try {
                setLoading(true)
                const response = await axiosInstance.get('/player/' + playerId)
                setPlayer(response.data)
            } catch (error) {
                console.log(error)
            }
            finally{
                setLoading(false)
            }
        }
        async function fetchStats() {
            try {setLoading(true)
                const response = await axiosInstance.get('/totalstats/player/' + playerId)
                setStats(response.data)
            } catch (error) {
                setStats(null)
                console.log(error)
            }
            finally{
                setLoading(false)
            }
        }
        fetchPlayer()
        fetchStats()
    }, [playerId])
if (loading) return <div className="p-4 text-gray-500"><div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                            <div className="bg-white p-5 rounded-lg">
                                Loading...
                            </div>
                        </div></div>
    return (
        <div className="max-w-xl mx-auto mt-10 px-4">
            {player && (
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                        {player.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{player.name}</h1>
                        <p className="text-gray-600 capitalize">{player.playingRole}</p>
                    </div>
                </div>
            )}

            {player && (
                <div className="bg-white rounded-lg shadow p-4 mb-6 grid grid-cols-2 gap-3 text-sm">
                    <p><span className="text-gray-500">Batting Style:</span> {player.battingStyle}</p>
                    <p><span className="text-gray-500">Bowling Style:</span> {player.bowlingStyle}</p>
                </div>
            )}

            {stats ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded">
                        <p className="text-gray-500">Runs</p>
                        <h3 className="text-2xl font-bold">{stats.totalRunsScored}</h3>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                        <p className="text-gray-500">Balls Faced</p>
                        <h3 className="text-2xl font-bold">{stats.totalBallsFaced}</h3>
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
                    <div className="bg-gray-50 p-4 rounded">
                        <p className="text-gray-500">Matches</p>
                        <h3 className="text-2xl font-bold">{stats.matchesPlayed}</h3>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">No stats available for this player yet</p>
            )}
        </div>
    )
}