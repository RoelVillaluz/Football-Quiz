import { useEffect, useState } from "react"

function GuessingGame() {
    const [randomPlayer, setRandomPlayer] = useState();
    const [guessedCorrectly, setGuessedCorrectly] = useState(false);
    const [guess, setGuess] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);

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
                        <figure>
                            <span>?</span>
                        </figure>
                        <ul>
                            {randomPlayer.clubs.map((club, index) => (
                                <li key={club._id}>
                                    <span>{club.name}</span>
                                    {index < randomPlayer.clubs.length - 1 && ' - '}
                                </li>
                            ))}
                        </ul>
                        <form action="" onSubmit={handleSubmit}>
                            <input type="text" onChange={handleChange}/>
                            <button type="submit">Submit<i class="fa-solid fa-angle-right"></i></button>
                        </form>
                        {/* {hasSubmitted !== false && (
                            <p>{guessedCorrectly === true ? 'You guessed correctly' : 'Incorrect guess, try again'}</p>
                        )} */}
                        <span className={hasSubmitted ? 'active': 'hidden'}>
                            {guessedCorrectly ? 'You guessed correctly' : 'Incorrect Guess'}
                        </span>
                    </div>
                )}
            </div>
        </>
    )
}

export default GuessingGame