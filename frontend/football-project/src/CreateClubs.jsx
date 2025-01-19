import { useEffect, useState } from "react";
import axios from "axios";

function CreateClubs() {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: ""
    })
    
    useEffect(() => {
        document.title = 'Create Club'
    }, [])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/api/clubs', formData)
            setSuccess(true)
            setError(null)
            setFormData({ name: "" })
        } catch (error) {
            console.error('Error creating club', error)
            setError(error.response?.data?.message || "Someting went wrong")
            setSuccess(false)
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, name: e.target.value })
    }

    return (
        <div className="container">
            <div className="create-section">
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>Club created successfully</p>}
                <h1>Create Club</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input 
                        type="text"
                        value={formData.name}
                        onChange={handleChange} />
                    </div>
                    <button type="submit">Create club</button>
                </form>
            </div>
        </div>
    )
}

export default CreateClubs