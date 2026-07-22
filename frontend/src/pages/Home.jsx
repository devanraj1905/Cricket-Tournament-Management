import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="max-w-2xl mx-auto mt-16 text-center">
            <h1 className="text-4xl font-bold mb-4">Cricket Tournament Management</h1>
            <p className="text-gray-600 mb-6">Manage tournaments, teams, and view live stats and standings.</p>
            <div className="flex justify-center gap-4">
                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Register</Link>
                <Link to="/login" className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded">Login</Link>
            </div>
        </div>
    )
}

export default Home