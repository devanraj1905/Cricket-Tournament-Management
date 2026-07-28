import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axiosInstance from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setUser } = useAuth()
    const navigate = useNavigate('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleLogin(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axiosInstance.post('/player/login', { email, password })
            setUser(response.data)
            navigate('/')
        } catch (error) {
            setError(error.response.data.message)
            setTimeout(() => {
                setError("");
            }, 3000);
        }
        finally {
            setLoading(false)
        }
    }
    if (loading) return <div className="p-4 text-gray-500"><div className="fixed inset-0 bg-black/50 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg">
            Loading...
            
        </div>
        
    </div></div>

    return (
        <div className="max-w-sm mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>  {error && (<p className='text-red-500 text-center'>{error}</p>)}</div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="text" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input type="password" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium">Login</button>

            </form>
        </div>
    )
}