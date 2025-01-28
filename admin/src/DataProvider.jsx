import { set } from "mongoose";
import axios from "axios";
import { Children, createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

function DataProvider({ children }) {
    const [player, setPlayer] = useState(null);
    const [players, setPlayers] = useState([]);
    const [club, setClub] = useState(null);
    const [clubs, setClubs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = 'http://localhost:5000/api'

    // fetch clubs and or players
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [playerResponse, clubResponse] = await Promise.all([
                    fetch(`${baseUrl}/players`),
                    fetch(`${baseUrl}/clubs`),
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

    const fetchClub = async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/clubs/${id}`)
            console.log(response.data.data)
            setClub(response.data.data)
        } catch (error) {
            console.error('Error', error)
        } finally {
            setIsLoading(false)
        }
    };

    const fetchPlayer = async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/players/${id}`)
            console.log(response.data.data)
            setPlayer(response.data.data)
        } catch (error) {
            console.error('Error', error)
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <DataContext.Provider value={{
            players, setPlayers,
            clubs, setClubs,
            club, setClub, 
            isLoading, setIsLoading,
            success, setSuccess,
            error, setError,
            fetchClub,
            fetchPlayer,
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider