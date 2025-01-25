import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

function Dashboard() {
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = 'Admin Dashboard'
    }, [])

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/players')
                if (!response.ok) {
                    throw new Error('Erorr', response.status)
                }
                const responseData = await response.json()

                console.log(responseData.data)
                setPlayers(responseData.data)
            } catch (error) {
                console.error('Error', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPlayers();
    }, [])
    
    return (
        <>
            <main className="dashboard">
                <header>
                    <h1>Dashboard</h1>
                    <p>Welcome back! Monitor key metrics and manage your application efficiently.</p>
                </header>
                <section className="stats">
                    <div className="stat-card" id="player-stat-card">
                        <div className="wrapper">
                            <h3>Players</h3>
                            <Link to={'/players'}>
                                <i class="fa-solid fa-arrow-right" id="arrow-link"></i>
                            </Link>
                        </div>
                        <div className="wrapper" style={{ alignItems: 'start', justifyContent: "start", gap: '0.5rem' }}>
                            <i class="fa-solid fa-user stat-icon"></i>
                            <span className="count">{players.length}</span>
                        </div>
                        <span className="update"></span>
                    </div>
                    
                    
                    <div className="stat-card" id="club-stat-card">
                        <div className="wrapper">
                            <h3>Clubs</h3>
                            <Link to={'/clubs'}>
                                <i class="fa-solid fa-arrow-right" id="arrow-link"></i>
                            </Link>
                        </div>
                        <div className="wrapper" style={{ alignItems: 'start', justifyContent: "start", gap: '0.5rem' }}>
                            <i class="fa-solid fa-shield stat-icon"></i>
                            <span className="count">0</span>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Dashboard