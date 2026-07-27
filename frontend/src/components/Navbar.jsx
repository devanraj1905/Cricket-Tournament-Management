import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'

export function Navbar() {
    const { user, setUser } = useAuth()

    async function handleLogOut() {
        try {
            await axiosInstance.post('/player/logout')
            setUser(null)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center">
            <div className="flex gap-4">
                <Link to="/" className="hover:text-blue-300">Home</Link>
                <Link to="/playerstats" className="hover:text-blue-300">Player Stats</Link>
                <Link to="/pointstable" className="hover:text-blue-300">Points Table</Link>
                <Link to="/teams" className="hover:text-blue-300">Teams</Link>
                {user && <Link to="/myteam" className="hover:text-blue-300">My Team</Link>}
                {user?.role === "admin" && <Link to="/admin" className="hover:text-blue-300">Admin Dashboard</Link>}
            </div>
            <div className="flex gap-4 items-center">
                {user ? (
                    <>
                        <Link to={'/players/'+user._id}>{user.name.toUpperCase()}</Link>
                        <button onClick={handleLogOut} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-blue-300">Login</Link>
                        <Link to="/register" className="hover:text-blue-300">Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
}