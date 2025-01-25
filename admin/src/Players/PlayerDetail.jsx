import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function PlayerDetail() {
    const { id, name } = useParams();
    const [player, setPlayer] = useState({ name: '', image: '', clubs: [] })
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/players/${id}`)
                console.log(response.data)
                setPlayer({
                    ...response.data.data,
                    image: response.data.data.image || 'http://localhost:5000/player_icons/default.png',
                    clubs: response.data.data.clubs || []
                })
            } catch (error) {
                console.error('Error', error)
            } finally {
                setIsLoading(true)
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
                    {isLoading 
                        ? <img src={`http://localhost:5000${player.image}`} style={{ width: "120px", height: "120px", objectFit: 'cover' }} alt="" />
                        : <div className="skeleton-player-image"></div>
                    }
                    <div className="wrapper" style={{ marginTop: '1rem'}}>
                        {isLoading
                            ? 
                            <>
                                <h1>{player.name}<i className="fa-regular fa-futbol"></i></h1>
                                    <Link to={`/players/${id}/${name}/edit`}>
                                    <i className="fa-regular fa-pen-to-square"></i>
                                </Link>
                            </>
                            : <div className="skeleton-text"></div>
                        }
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
                                {isLoading
                                    ? <span>{club.name}</span>
                                    : <div className="skeleton-text"></div>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}

export default PlayerDetail