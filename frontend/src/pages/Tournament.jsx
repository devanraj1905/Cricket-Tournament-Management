import axios from 'axios'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { Link } from 'react-router-dom'

export function Tournament() {
    const [tournament, setTournament] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function showTournament() {
            try {
                setLoading(true)
                const response = await axiosInstance.get("tournament/all")
                setTournament(response.data)

            }

            catch (error) {
                console.log(error);

            }
            finally {
                setLoading(false)
            }
        }
        showTournament()
    }, [])
    if (loading) return <div className="p-4 text-gray-500"><div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                            <div className="bg-white p-5 rounded-lg">
                                Loading...
                            </div>
                        </div></div>

    return (
        <div><h1 className='font-bold  text-3xl text-blue-600'>Tournament</h1>

            <div>
                {tournament.map((t) => (
                    <div
                        key={t._id}
                        className="bg-white rounded-lg  shadow p-5 mb-6"
                    >
                        <h2 className="text-2xl font-bold text-blue-600">
                            {t.name}
                        </h2>
                        <div className="space-y-1 text-gray-600 mb-4" x><h1 className=' font-semibold'>Start : {new Date(t.startDate).toLocaleDateString()}</h1>
                            <h1 className='font-semibold'>End : {new Date(t.endDate).toLocaleDateString()}</h1>
                            <p>
                                <span className="font-semibold">Status : </span>{" "}
                                <span
                                    className={`px-2 py-1 rounded text-white text-sm ${t.status === "Upcoming"
                                        ? "bg-yellow-500" : t.status === "Ongoing" ? "bg-green-500" : "bg-red-500"}`}>
                                    {t.status}
                                </span>

                            </p>
                        </div>
                        <h3 className="mt-4 font-semibold">
                            Teams
                        </h3>

                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                            {t.teams.map((team) => (
                                <span
                                    key={team._id}
                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                                >
                                    <Link to={'/teams/' + team._id}> {team.name}</Link>
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

