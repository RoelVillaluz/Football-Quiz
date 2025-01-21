import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

function CreatePlayers() {
    const [clubs, setClubs] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        clubs: []
    })
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchClubs = async() => {
            try {
                const response = await axios.get("http://localhost:5000/api/clubs");
                const options = response.data.data.map((club) => ({
                    value: club._id,
                    label: club.name
                }));
                setClubs(options)
            } catch (error) {
                setError(error)
            }
        }
        fetchClubs();
        document.title = 'Create Player'
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {
            const payload = {
                ...formData,
                clubs: formData.clubs.map((club) => club.value),
            };

            await axios.post('http://localhost:5000/api/players', payload)

            setSuccess(true)
            setSuccessMessage(`Player: ${formData.name} created successfully`)
            setError(null)
            setFormData({ name: "", clubs: [] }) // Reset form
        } catch (error) {
            console.error("Error creating player", error)
            setError(error.response?.data?.message || "Someting went wrong")
            setSuccess(false)
        }
    };

    const handleChange = (selectedOptions) => {
        setFormData({...formData, clubs: selectedOptions })
    }

    // return (
    //     <div className="container">
    //         <div className="create-section">
    //             <h1>Create a Player</h1>

    //             {error && <p style={{ color: 'red ' }}>{error}</p>}
    //             {success && <p style={{ color: 'green'}}>{successMessage}</p>}

    //             <form onSubmit={handleFormSubmit}>
    //                 <div className="form-group">
    //                     <label>Name: </label>
    //                     <input 
    //                         type="text" 
    //                         name="name" 
    //                         value={formData.name} 
    //                         onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
    //                         required/>
    //                 </div>
    //                 <div className="form-group">
    //                     <label>Clubs:</label>
    //                     <Select
    //                         name="clubs"
    //                         value={formData.clubs}
    //                         options={clubs} // Set options for React-Select
    //                         onChange={handleChange}
    //                         isMulti // Allow multiple selections
    //                         placeholder="Select clubs..."
    //                     />
    //                 </div>
    //                 <button type="submit">Create Player</button>
    //             </form>
    //         </div>
    //     </div>
    // )
}

export default CreatePlayers