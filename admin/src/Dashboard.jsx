import { useEffect } from "react"

function Dashboard() {
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = 'Admin Dashboard'
    }, [])

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/players')
                if (!response.ok) {
                    throw new Error('Erorr', response.status)
                }
                const responseData = await response.json()

                console.log(responseData.data)
                setPlayers(responseData.data)
            } catch (error) {
                console.error('Error', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPlayers();
    }, [])
    return (
        <>

        </>
    )
}

export default Dashboard