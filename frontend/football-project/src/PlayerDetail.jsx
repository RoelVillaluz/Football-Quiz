import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function PlayerDetail() {
    const { id, name } = useParams();
    const [player, setPlayer] = useState({ name: '', image: '', clubs: [] })

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/players/${id}`)
                console.log(response.data)
                setPlayer({
                    ...response.data.data,
                    clubs: response.data.data.clubs || []
                })
            } catch (error) {
                console.error('Error', error)
            }
        }
        fetchPlayer()
    }, [id])

    useEffect(() => {
        if (player.name) {
            document.title = player.name
        }
    }, [player])

    return (
        <>
            <section className="player-profile">
                <header>
                    <div className="wrapper">
                        <h1>{player.name}<i className="fa-regular fa-futbol"></i></h1>
                    </div>
                    <span>Footballer</span>
                </header>
                <div className="player-club-list">
                    <header>
                        <h2>Club History</h2>
                    </header>
                    <ul>
                        {player.clubs.map((club) => (
                            <li key={club._id}>
                                <span>{club.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}

export default PlayerDetail