import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

function ClubDetail() {
    const { id, name } = useParams(); 
    const [club, setClub] = useState({ name: '', image: '' })
    useEffect(() => {
        const fetchClub = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/clubs/${id}`)
                console.log(response.data)
                setClub(response.data.data)
            } catch (error) {
                console.error('Error fetching club data', error)
            }
        }
        fetchClub()
    }, [id])

    useEffect(() => {
        if (club.name) {
            document.title = club.name
        }
    }, [club])
    
    return (
        <>
            <section className="list-container">
                <header>
                    <h1>{club.name}<i class="fa-solid fa-shield"></i></h1>
                    <span>Football Club</span>
                </header>
            </section>
        </>
    )
}

export default ClubDetail