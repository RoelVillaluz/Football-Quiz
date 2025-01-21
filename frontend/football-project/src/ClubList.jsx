import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

function ClubList() {

    const [clubs, setClubs] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/clubs');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const responseData = await response.json();
                setClubs(responseData.data);
            } catch {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchClubs()
        document.title = 'Club List'
    }, [])

    const groupedItems = clubs.reduce((acc, item) => {
        const firstLetter = item.name[0].toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(item);
        return acc;
    }, {});

    const sortedLetters = Object.keys(groupedItems).sort()
    
    return (
        <>
            <section className="list-container">
                <header>
                    <h1>Club List</h1>
                </header>
                <ul>
                    {sortedLetters.map((letter) => (
                        <li key={letter} className="letter-group">
                            <h2 className="letter-item">{letter}</h2>
                            <ul id="club-list">
                                {groupedItems[letter]
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((club) => (
                                        <li key={club._id}>
                                            <Link to={`/clubs/${club._id}/${club.name}`}>{club.name}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default ClubList