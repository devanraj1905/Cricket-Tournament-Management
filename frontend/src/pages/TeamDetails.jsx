import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'

export function TeamDetail() {
    const { teamId } = useParams()
    const [team, setTeam] = useState(null)

    useEffect(() => {
        async function fetchTeam() {
            try {
                const response = await axiosInstance.get('/team/' + teamId)
                setTeam(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchTeam()
    }, [teamId])

    if (!team) {
        return <p className="text-center mt-10">Loading...</p>
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