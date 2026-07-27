import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [battingStyle, setBattingStyle] = useState('left-hander')
    const [bowlingStyle, setBowlingStyle] = useState('left-arm-pace')
    const [playingRole, setPlayingRole] = useState('batsman')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleRegister(e) {
        e.preventDefault()
        if (!name || !email || !password) {
            setError('Required field')
            return
        }
        setError('')
        try {
            const response = await axiosInstance.post('/player/register', { name, email, password, battingStyle, bowlingStyle, playingRole })
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

                {error && (
                    <p className="bg-red-100 text-red-600 text-sm rounded px-3 py-2 mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="flex text-sm mb-1">Name <p className='text-red-600'>*</p></label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="flex text-sm mb-1">Email<p className='text-red-600'>*</p></label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="flex text-sm mb-1">Password<p className='text-red-600'>*</p></label>
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Batting Style</label>
                        <select
                            value={battingStyle}
                            onChange={(e) => setBattingStyle(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                            <option value="left-hander">Left-hander</option>
                            <option value="right-hander">Right-hander</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Bowling Style</label>
                        <select
                            value={bowlingStyle}
                            onChange={(e) => setBowlingStyle(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                            <option value="left-arm-pace">Left-arm-pace</option>
                            <option value="right-arm-pace">Right-arm-pace</option>
                            <option value="right-arm-spin">Right-arm-spin</option>
                            <option value="left-arm-spin">Left-arm-spin</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Player Role</label>
                        <select
                            value={playingRole}
                            onChange={(e) => setPlayingRole(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                            <option value="batsman">Batsman</option>
                            <option value="wk-batsman">WK-Batsman</option>
                            <option value="bowler">Bowler</option>
                            <option value="all-rounder">All-rounder</option>
                        </select>
                    </div>

                    <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register