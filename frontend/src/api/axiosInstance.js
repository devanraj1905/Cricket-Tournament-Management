import axios from "axios"


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_UR || 'http://localhost:8000/api',
    withCredentials: true
})

export default axiosInstance
