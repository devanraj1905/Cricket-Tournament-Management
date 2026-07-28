import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'

export function TeamDetail() {
    const { teamId } = useParams()
    const [team, setTeam] = useState(null)
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        async function fetchTeam() {
            try {
                setLoading(true)
                const response = await axiosInstance.get('/team/' + teamId)
                setTeam(response.data)
            } catch (error) {
                console.log(error)
            }
            finally{
                setLoading(false)
            }
        }
        fetchTeam()
    }, [teamId])


if (loading) return <div className="p-4 text-gray-500"><div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                            <div className="bg-white p-5 rounded-lg">
                                Loading...
                            </div>
                        </div></div>
                            if (!team) {
        return <p className="text-center mt-10">No team</p>
    }
    return (
        <div className="max-w-2xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold mb-2">{team.name}</h1>
            <p className="text-gray-600 mb-6">Captain: {team.captain?.name}</p>

            <div className="bg-white rounded-lg shadow p-5">
                <h2 className="text-xl font-semibold mb-3">Players</h2>
                {team.players.map((player) => (
                    <Link
                        key={player._id}
                        to={"/players/" + player._id}
                        className="block text-blue-600 hover:underline py-1"
                    >
                        {player.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}