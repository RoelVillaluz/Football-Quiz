import { useEffect, useState } from "react"

function GuessingGame() {
    const [randomPlayer, setRandomPlayer] = useState(); 
    const [previousPlayer, setPreviousPlayer] = useState(null)
    const [guessedCorrectly, setGuessedCorrectly] = useState(false);
    const [guess, setGuess] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const fetchRandomPlayer = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/players/random');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const responseData = await response.json();
            
            if (previousPlayer && responseData.data._id === previousPlayer._id) {
                return fetchRandomPlayer();
            }

            setRandomPlayer(responseData.data)
            setPreviousPlayer(responseData.data._id); // Update the previous player ID
            setGuessedCorrectly(false);
            setGuess('');
            setHasSubmitted(false);
        } catch (error) {
            console.error('Error', error)
        }
    }

    useEffect(() => {
        fetchRandomPlayer()
        document.title = "Who's the Baller";
    }, [])

    function handleChange(e) {
        setGuess(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        const nameParts = randomPlayer.name.toLowerCase().split(' ');

        if (nameParts.some(part => part === guess.toLowerCase()) || guess.toLowerCase() === randomPlayer.name.toLowerCase()) {
            setGuessedCorrectly(true);
        } else {
            setGuessedCorrectly(false);
        }

        setHasSubmitted(true)
        setGuess("")
    }

    function handleNewGame() {
        fetchRandomPlayer()
        setGuess("");
        setHasSubmitted(false)
    }

    return(
        <>
            <div className="container">
                <div className="images">
                    <img src="/images/mbappe.jpg" alt="" />
                    <img src="/images/messi.jpg" alt="" />
                    <img src="/images/cr7.jpg" alt="" />
                    <img src="/images/neymar.jpg" alt="" />
                </div>
                {randomPlayer && (
                    <div className="form-container">
                        <figure className="player-image-container">
                            <span>?</span>
                        </figure>
                        {guessedCorrectly && (
                            <h1 
                                className={`random-player ${!guessedCorrectly ? 'hidden': 'reveal-animation'}`}>
                                {randomPlayer.name}
                            </h1>
                        )}
                        <ul>
                            {randomPlayer.clubs.map((club, index) => (
                                <li key={club._id}>
                                    <span>{club.name}</span>
                                    {index < randomPlayer.clubs.length - 1 && ' - '}
                                </li>
                            ))}
                        </ul>
                        <form action="" onSubmit={handleSubmit}>
                            <input type="text" onChange={handleChange} value={guess}/>
                            <div className="button-list">
                                {!guessedCorrectly ? (
                                    <>
                                        <button className="guess" type="submit">
                                            Submit
                                            <i className="fa-solid fa-angle-right"></i>
                                        </button>
                                        <button className="skip" onClick={handleNewGame}>
                                            Skip
                                        </button>
                                    </>
                                ) : (
                                    <button className="guess" onClick={handleNewGame}>
                                        New Game
                                        <i className="fa-solid fa-angle-right"></i>
                                    </button>
                                )}
                            </div>
                        </form>
                        {hasSubmitted && (
                            <span className={`feedback ${guessedCorrectly ? 'success': 'error'}`}>
                                {guessedCorrectly? 'You guessed correctly': 'Incorrect guess'}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default GuessingGame