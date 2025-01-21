import { useEffect, useState } from "react"

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
    
    // return(
    //     <>
    //         <ol>
    //             <h2>Club List</h2>
    //             {clubs.map((club) => (
    //                 <li key={club._id}>
    //                     <span>{club.name}</span>
    //                 </li>
    //             ))}
    //         </ol>
    //     </>
    // )
}

export default ClubList