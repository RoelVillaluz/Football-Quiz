import { Children, createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

function DataProvider({ children }) {
    const [players, setPlayers] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [playerResponse, clubResponse] = await Promise.all([
                    fetch('http://localhost:5000/api/players'),
                    fetch('http://localhost:5000/api/clubs'),
                ])
                if (!playerResponse.ok || !clubResponse.ok) {
                    throw new Error('Error fetching data')
                    setError(error)
                }

                const playersData = await playerResponse.json();
                const clubsData = await clubResponse.json()

                setPlayers(playersData.data)
                setClubs(clubsData.data)
            } catch (error) {
                console.error('Error', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData();
    }, [])

    return (
        <DataContext.Provider value={{
            players, setPlayers,
            clubs, setClubs,
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider