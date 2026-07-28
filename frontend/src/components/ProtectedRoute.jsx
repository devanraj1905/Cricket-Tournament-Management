import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({ children, requiredRole }) {
    const { user, loading } = useAuth()

    if (loading) return <div className="p-4 text-gray-500"><div className="fixed inset-0 bg-black/50 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg">
            Loading...
            
        </div>
        
    </div></div>

    if (!user) {
        return <Navigate to="/login" />
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" />
    }

    return children
}