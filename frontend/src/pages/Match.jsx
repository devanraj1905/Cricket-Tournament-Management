import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance'

export function Match() {
    const [match, setMatch] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getMatch() {
            try {
                setLoading(true)

                            const response = await axiosInstance.get('/match/all')
                setMatch(response.data)
            }
            catch (error) {
                console.log(error)
                setError('Failed to load matches')
            }
            finally {
                setLoading(false)
            }
        }
        getMatch()
    }, [])

    if (loading) return <div className="p-4 text-gray-500">Loading matches...</div>
    if (error) return <div className="p-4 text-red-600">{error}</div>
    if (match.length === 0) return <div className="p-4 text-gray-500">No matches scheduled yet.</div>

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Matches</h1>

            <div className="space-y-4">
                {
                    match.map((data) => (
                        <div key={data._id} className="border rounded-lg p-4 shadow-sm bg-white">

                            <h2 className="text-xl font-bold text-center">
                                {data.teamA.name} vs {data.teamB.name}
                            </h2>

                            <p className={`text-center font-medium ${data.status === "completed" ? "text-green-600" : "text-red-600"}`}>
                                {data.status}
                            </p>


                            <p className="text-center text-gray-500 text-sm">
                                {new Date(data.matchDate).toLocaleDateString('en-IN', {
                                    day: 'numeric', month: 'short', year: 'numeric'
                                })}
                            </p>

                            {data.result && (
                                <p className="text-center text-green-600 font-semibold mt-1">
                                    {data.result}
                                </p>
                            )}

                        </div>
                    ))
                }
            </div>
        </div>
    )
}