import { useEffect, useState } from "react"

function GuessingGame() {
    const [randomPlayer, setRandomPlayer] = useState();
    const [guessedCorrectly, setGuessedCorrectly] = useState(false);

    useEffect(() => {
        const fetchRandomPlayer = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/players/random');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                const responseData = await response.json();
                console.log(responseData.data)
                setRandomPlayer(responseData.data)
            } catch (error) {
                console.error('Error', error)
            }
        }
        fetchRandomPlayer()
    }, [])

    return(
        <>
            <div className="container">
                <main className="guess-player">
                    {randomPlayer && (
                        <>
                        <h1 style={guessedCorrectly ? { display: 'block' } : { display: 'none' }}>
                            {randomPlayer.name}
                        </h1>
                        <ul>
                            {randomPlayer.clubs.map((club) => (
                            <li key={club._id}>{club.name}</li>
                            ))}
                        </ul>
                        </>
                    )}
                </main>
            </div>
        </>
    )
}

export default GuessingGame