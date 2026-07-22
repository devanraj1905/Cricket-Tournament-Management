import React, { useState } from 'react'
import axiosInstance from '../api/axiosInstance'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [battingStyle, setBattingStyle] = useState('left-hander')
    const [bowlingStyle, setBowlingStyle] = useState('left-arm-pace')
    const [playingRole, setPlayingRole] = useState('batsman')

    async function handleRegister(e) {
        e.preventDefault()
        try {
            const response = await axiosInstance.post('/player/register', { name, email, password, battingStyle, bowlingStyle, playingRole })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const inputClass = "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    const labelClass = "block text-sm font-medium mb-1"

    return (
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <div>
                    <label className={labelClass}>Name</label>
                    <input type="text" className={inputClass} onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div>
                    <label className={labelClass}>Email</label>
                    <input type="text" className={inputClass} onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div>
                    <label className={labelClass}>Password</label>
                    <input type="password" className={inputClass} onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <div>
                    <label className={labelClass}>Batting Style</label>
                    <select className={inputClass} value={battingStyle} onChange={(e) => setBattingStyle(e.target.value)}>
                        <option value="left-hander">Left-hander</option>
                        <option value="right-hander">Right-hander</option>
                    </select>
                </div>
                <div>
                    <label className={labelClass}>Bowling Style</label>
                    <select className={inputClass} value={bowlingStyle} onChange={(e) => setBowlingStyle(e.target.value)}>
                        <option value="left-arm-pace">Left-arm-pace</option>
                        <option value="right-arm-pace">Right-arm-pace</option>
                        <option value="right-arm-spin">Right-arm-spin</option>
                        <option value="left-arm-spin">Left-arm-spin</option>
                    </select>
                </div>
                <div>
                    <label className={labelClass}>Playing Role</label>
                    <select className={inputClass} value={playingRole} onChange={(e) => setPlayingRole(e.target.value)}>
                        <option value="batsman">Batsman</option>
                        <option value="wk-batsman">WK-Batsman</option>
                        <option value="bowler">Bowler</option>
                        <option value="all-rounder">All-rounder</option>
                    </select>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium">Register</button>
            </form>
        </div>
    )
}

export default Register