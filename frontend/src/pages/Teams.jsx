import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { Link } from 'react-router-dom'


export function Teams() {
    const [teams, setTeams] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        async function fetchTeams() {
            try {
                const response = await axiosInstance.get('/team/all')
                setTeams(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchTeams()
    }, [])

    const filteredTeams = teams.filter((team) =>
        team.players.some((player) =>
            player.name.toLowerCase().includes(search.toLowerCase())
        )
    )

    return (
        <div className="max-w-3xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold mb-6">All Teams</h1>

            <input
                type="text"
                placeholder="Search player name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded px-3 py-2 w-full mb-6"
            />

           {filteredTeams.map((team) => (
    <div key={team._id} className="bg-white rounded-lg shadow p-5 mb-4">
        <Link to={"/teams/" + team._id} className="flex text-xl font-semibold text-blue-600 hover:underline">
          <p>Team:</p>{team.name}
        </Link>
        <p className="text-gray-600">Captain: {team.captain?.name}</p>
    </div>
))}
        </div>
    )
}