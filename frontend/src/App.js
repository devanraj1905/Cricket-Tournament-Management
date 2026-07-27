    import { BrowserRouter, Routes, Route } from "react-router-dom";
    import { AuthProvider } from "./context/AuthContext.jsx";
    import { Login } from "./pages/Login";
    import { Navbar } from "./components/Navbar.jsx";
    import Register from "./pages/Register.jsx";
    import Home from "./pages/Home.jsx";
    import { MyTeam } from "./pages/MyTeam.jsx";
    import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { PointsTable } from "./pages/PointsTable.jsx";
import { AdminDashboard } from "./pages/AdminDashboard.jsx";
import { PlayerStats } from "./pages/PlayerStats.jsx";
import { Teams } from "./pages/Teams.jsx";
import { TeamDetail } from "./pages/TeamDetails.jsx";
import { PlayerProfile } from "./pages/PlayerProfile.jsx";

    function App() {
        return (
            <AuthProvider>
                <BrowserRouter>
                <Navbar/>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/" element={<Home/>} />
                        <Route path="/MyTeam" element={<ProtectedRoute><MyTeam/></ProtectedRoute>} />
                        <Route path="/pointstable" element={<PointsTable/>}  />
                        <Route path="/playerstats" element={<PlayerStats/>} />
                        <Route path="/teams" element={<Teams/>} />
                        <Route path="/teams/:teamId" element={<TeamDetail/>} />
                        <Route path="/players/:playerId" element={<PlayerProfile/>} />
                        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard/></ProtectedRoute>}  />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        );
    }

    export default App;