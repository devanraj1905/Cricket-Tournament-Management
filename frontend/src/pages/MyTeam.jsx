import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance'

export function MyTeam() {
    const [team, setTeam] = useState('')
    const [myTeam, setMyTeam] = useState(null)
    const [addPlayerId, setAddPlayerId] = useState('')
    const [removePlayerId, setRemovePlayerId] = useState('')

    async function handleTeamCreate(e) {
        e.preventDefault()
        try {
            const response = await axiosInstance.post("/team/create", { name: team })
            setMyTeam(response.data)
        } catch (error) { console.log(error) }
    }

    useEffect(() => {
        async function fetchMyTeam() {
            try {
                const response = await axiosInstance.get("/team/myteam")
                setMyTeam(response.data)
            } catch (error) { console.log(error) }
        }
        fetchMyTeam()
    }, [])

    async function handlePlayerTeam(e) {
        e.preventDefault()
        try {
            const response = await axiosInstance.put('/team/player/' + myTeam._id, { playerId: addPlayerId })
            setMyTeam(response.data)
            setAddPlayerId('')
        } catch (error) { console.log(error) }
    }

    async function handleRemovePlayer(e) {
        e.preventDefault()
        try {
            const response = await axiosInstance.delete('/team/player/' + myTeam._id, { data: { playerId: removePlayerId } })
            setMyTeam(response.data)
            setRemovePlayerId('')
        } catch (error) { console.log(error) }
    }

    const cardClass = "bg-white rounded-lg shadow p-5 mb-6"
    const inputClass = "border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
    const btnClass = "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"

    return (
        <div className="max-w-xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold mb-6">My Team</h1>

            <div className={cardClass}>
                <h2 className="text-xl font-semibold mb-3">Create Team</h2>
                <form onSubmit={handleTeamCreate} className="flex gap-2">
                    <input type="text" placeholder="Team Name" className={inputClass} onChange={(e) => setTeam(e.target.value)} value={team} />
                    <button className={btnClass}>Create</button>
                </form>
            </div>

            <div className={cardClass}>
                <h2 className="text-xl font-semibold mb-3">Add Player</h2>
                <form onSubmit={handlePlayerTeam} className="flex gap-2">
                    <input type="text" placeholder="Player Id" className={inputClass} value={addPlayerId} onChange={(e) => setAddPlayerId(e.target.value)} />
                    <button className={btnClass}>Add</button>
                </form>
            </div>

            <div className={cardClass}>
                <h2 className="text-xl font-semibold mb-3">Remove Player</h2>
                <form onSubmit={handleRemovePlayer} className="flex gap-2">
                    <input type="text" placeholder="Player Id" className={inputClass} value={removePlayerId} onChange={(e) => setRemovePlayerId(e.target.value)} />
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                </form>
            </div>

            <div className={cardClass}>
                <h2 className="text-xl font-semibold mb-3">Team Info</h2>
                {myTeam ? (
                    <div className="text-gray-700">
                        <p className="font-medium">{myTeam.name}</p>
                        <p>Players: {myTeam?.players?.length}</p>
                    </div>
                ) : (
                    <p className="text-gray-500">You have no team yet</p>
                )}
            </div>
        </div>
    )
}