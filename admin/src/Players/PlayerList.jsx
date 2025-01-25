import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/Searchbar";

function PlayerList() {
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/players');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const responseData = await response.json();
                setPlayers(responseData.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPlayers();
        document.title = 'Player List';
    }, []);

    const groupedItems = players.reduce((acc, item) => {
        const firstLetter = item.name[0].toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(item);
        return acc;
    }, {});

    const sortedLetters = Object.keys(groupedItems).sort();

    if (isLoading) {
        return <p>Loading...</p>  
    }

    return (
        <section className="list-container">
            <header>
                <h1>Player List ({players.length})</h1>
            </header>
            <SearchBar
                data={players}
                searchPlaceholder="Search players..."
                pathPrefix="players"
            />
            <ul>
                {sortedLetters.map((letter) => (
                    <li key={letter} className="letter-group">
                        <h2 className="letter-item">{letter}</h2>
                        <ul id="player-list">
                            {groupedItems[letter]
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((player) => (
                                    <li key={player._id}>
                                        <Link to={`/players/${player._id}/${player.name}`}>{player.name}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default PlayerList;
