import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { Link } from 'react-router-dom'

export function MyTeam() {
    const [team, setTeam] = useState('')
    const [myTeam, setMyTeam] = useState(null)
    const [search, setSearch] = useState("")
    const [foundPlayer, setFoundPlayer] = useState(null)
    const [searchError, setSearchError] = useState('')
    const [removeSearch, setRemoveSearch] = useState('')
    const [foundRemovePlayer, setFoundRemovePlayer] = useState(null)
    const [teamError, setTeamError] = useState('')
    const [transferSearch, setTransferSearch] = useState('')
    const [foundTransferPlayer, setFoundTransferPlayer] = useState(null)
    const [transferError, setTransferError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleTeamCreate(e) {
        e.preventDefault()
        if (!team) {
            setTeamError("Required field")
            return
        }
        try {

            const response = await axiosInstance.post("/team/create", { name: team })
            setMyTeam(response.data)
            setTeamError('')
            setTeam('')
        } catch (error) {
            setTeamError(error.response.data.message)
        }

    }

    useEffect(() => {
        async function fetchMyTeam() {
            try {
                setLoading(true)
                const response = await axiosInstance.get("/team/myteam")
                setMyTeam(response.data)
            } catch (error) { console.log(error) }
            finally {
                setLoading(false)
            }
        }
        fetchMyTeam()
    }, [])

    async function handleSearchPlayer(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axiosInstance.get("/player/search?email=" + search)
            setFoundPlayer(response.data)
            setSearchError('')
        } catch (error) {
            setFoundPlayer(null)
            setSearchError(error.response.data.message)
        }
        finally{
            setLoading(false)
        }
    }

    async function handleAddFoundPlayer() {
        try {
            const response = await axiosInstance.put("/team/player/" + myTeam._id, { playerId: foundPlayer._id })
            setMyTeam(response.data)
            setFoundPlayer(null)
            setSearch('')
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSearchRemovePlayer(e) {
        e.preventDefault()
        try {
            const response = await axiosInstance.get("/player/search?email=" + removeSearch)
            setFoundRemovePlayer(response.data)
        } catch (error) {
            setFoundRemovePlayer(null)
            console.log(error)
        }
    }

    async function handleRemovePlayer() {
        try {
            const response = await axiosInstance.delete('/team/player/' + myTeam._id, { data: { playerId: foundRemovePlayer._id } })
            setMyTeam(response.data.team)
            setFoundRemovePlayer(null)
            setRemoveSearch('')
        } catch (error) {
            console.log(error)
        }
    }


    async function handleSearchTransfer(e) {
        e.preventDefault()
        try {
            const response = await axiosInstance.get('/player/search?email=' + transferSearch)
            setFoundTransferPlayer(response.data)
            setTransferError('')
        } catch (error) {
            setFoundTransferPlayer(null)
            setTransferError(error.response.data.message)
        }
    }

    async function handleTransfer() {
        try {
            const response = await axiosInstance.put('/team/transfercaptain/' + myTeam._id, { newCaptainId: foundTransferPlayer._id })
            setMyTeam(response.data)
            setFoundTransferPlayer(null)
            setTransferSearch('')
            setTransferError('')
        } catch (error) {
            setTransferError(error.response.data.message)
        }
    }

    const cardClass = "bg-white rounded-lg shadow p-5 mb-6"
    const inputClass = "border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
    const btnClass = "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"

    if (loading) return <div className="p-4 text-gray-500"><div className="fixed inset-0 bg-black/50 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg">
            Loading...
        </div>
    </div></div>
    return (
        <div className="max-w-xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold mb-6">My Team</h1>

            <div className={cardClass}>
                <h2 className="text-xl font-semibold mb-3">Create Team</h2>
                <form onSubmit={handleTeamCreate} className="flex gap-2">
                    <input type="text" placeholder="Team Name" className={inputClass} onChange={(e) => setTeam(e.target.value)} value={team} />
                    <button className={btnClass} onClick={handleLoading} >Create</button>
                </form>
                {teamError && <p className="text-red-600 text-sm mt-2">{teamError}</p>}
            </div>

            <div className={cardClass}>
                <h2 className="text-xl font-semibold mb-3">Add Player</h2>
                <form onSubmit={handleSearchPlayer} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter player email"
                        className={inputClass}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className={btnClass}>Search</button>
                </form>
                {searchError && <p className="text-red-600 text-sm mt-2">{searchError}</p>}
                {foundPlayer && (
                    <div className="mt-3 flex justify-between items-center">
                        <p>{foundPlayer.name} ({foundPlayer.email})</p>
                        <button onClick={handleAddFoundPlayer} className={btnClass} >Add to Team</button>
                    </div>
                )}
            </div>

            <div className={cardClass}>
                <h2 className="text-xl font-semibold mb-3">Remove Player</h2>
                <form onSubmit={handleSearchRemovePlayer} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter player email"
                        className={inputClass}
                        value={removeSearch}
                        onChange={(e) => setRemoveSearch(e.target.value)}
                    />
                    <button className={btnClass}>Search</button>
                </form>
                {foundRemovePlayer && (
                    <div className="mt-3 flex justify-between items-center">
                        <p>{foundRemovePlayer.name} ({foundRemovePlayer.email})</p>
                        <button onClick={handleRemovePlayer} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Remove</button>
                    </div>
                )}
            </div>

            <div className={cardClass}>
                <h2 className="text-xl font-semibold mb-3">Team Info</h2>
                <div className={cardClass}>
                    <h2 className="text-xl font-semibold mb-3">Transfer Captain</h2>
                    <form onSubmit={handleSearchTransfer} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter player email"
                            className={inputClass}
                            value={transferSearch}
                            onChange={(e) => setTransferSearch(e.target.value)}
                        />
                        <button className={btnClass}>Search</button>
                    </form>
                    {transferError && <p className="text-red-600 text-sm mt-2">{transferError}</p>}
                    {foundTransferPlayer && (
                        <div className="mt-3 flex justify-between items-center">
                            <p>{foundTransferPlayer.name} ({foundTransferPlayer.email})</p>
                            <button onClick={handleTransfer} type="button" className={btnClass}>Make Captain</button>
                        </div>
                    )}
                </div>
                {myTeam ? (
                    <div className="text-gray-700">
                        <p className="font-medium">{myTeam.name}</p>
                        <p>Players: {myTeam?.players?.length}</p>
                        <p>Captain: {myTeam.captain?.name}</p>
                        {myTeam.players.map((player) => (
                            <Link
                                key={player._id}
                                to={"/players/" + player._id}
                                className="block text-blue-600 hover:underline py-1"
                            >
                                {player.name}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">You have no team yet</p>
                )}
            </div>
        </div>
    )
}