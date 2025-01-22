import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

function EditCLub() {
    const { id } = useParams();
    const [club, setClub] = useState();

    useEffect(() => {
        const fetchClub = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/clubs/${id}`)
                console.log(response.data)
                setClub(response.data.data)
            } catch (error) {
                console.error('Error', error)
            }            
        }
        fetchClub()
    }, [id])

    return (
        <>
            <div className="club-details">
                
            </div>
        </>
    )
}

export default EditCLub