import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useData } from "./DataProvider";

function Dashboard() {
    const { players, setPlayers, clubs, setClubs, isLoading, setIsLoading, error, setError } = useData();

    useEffect(() => {
        document.title = 'Admin Dashboard'
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
                            <i className="fa-solid fa-user stat-icon"></i>
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
                            <span className="count">{clubs.length}</span>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Dashboard