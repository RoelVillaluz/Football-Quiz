import { useEffect, useState } from "react";

function PlayerList() {

    const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/players');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                const responseData = await response.json();
                setPlayers(responseData.data)
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchPlayers()
        document.title = 'Player List'
    }, [])

    return (
        <>
            <ol>
                <h2>Player List</h2>
                {players.map((player) => (
                    <li key={player.id}>
                        <span>{player.name}</span>
                        <ul style={{ display: 'flex', gap: '1rem', listStyleType: 'none' }}>
                            {player.clubs.map((club) => (
                                <li key={club._id}>{club.name}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>
        </>
    )
}

export default PlayerList