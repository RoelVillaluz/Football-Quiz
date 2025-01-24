import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import Select from "react-select";

function EditPlayer() {
    const { id } = useParams();
    const [player, setPlayer] = useState({ name: "", clubs: [], image: "" })
    const [clubs, setClubs] = useState([])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({ name: "", clubs:[], image: "" })
    const [imagePreview, setImagePreview] = useState("")

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/players/${id}`)

                const playerData = response.data.data || { name: "", clubs: [], image: "" }
                setPlayer(playerData)
    
                // prefill form data with player info
                setFormData({ 
                    name: playerData.name, 
                    clubs: playerData.clubs.map((club) => ({
                        value: club._id,
                        label: club.name,
                    })), 
                    image: playerData.image 
                })
            } catch (error) {
                console.error('Error', error)
            }
        }
        fetchPlayer()
    }, [id])

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
    }, []);
    
    useEffect(() => {
        document.title = `Edit: ${player.name}`
    }, [player])

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        
        if (name === "image" && files.length > 0) {
            const file = files[0];
            setFormData((prev) => ({ ...prev, image: file }))
            setImagePreview(URL.createObjectURL(file))
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    };

    // Handle React-Select change for clubs
    const handleClubsChange = (selectedOptions) => {
        setFormData((prev) => ({
            ...prev,
            clubs: selectedOptions, // Update clubs with selected options
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("clubs", JSON.stringify(formData.clubs.map((club) => club.value)));
    
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }
    
        try {
            const response = await axios.patch(`http://localhost:5000/api/players/${id}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            setSuccess(true);
            setSuccessMessage(`Player: ${formData.name} updated successfully`);
            setError(null);
    
            // Refetch player data after update
            const updatedPlayer = response.data.data;
            setPlayer(updatedPlayer);
            setFormData({ name: "", clubs: [], image: null });
        } catch (error) {
            console.error('Error updating player', error);
            setError(error.response?.data?.message || "Something went wrong");
            setSuccess(false);
        }
    };
    

    return (
        <>
            <section className="edit-section">
                <div className="edit-form-container">
                    <header>
                        <h1>Edit {player.name}</h1>
                    </header>
                    <form action="" onSubmit={handleFormSubmit}>

                        <div className="edit-image-container">

                            <div className="image-box" onClick={() => document.getElementById('file-input').click()}>
                                <i className="fa-solid fa-image"></i>
                                <span>Drag file here to upload.</span>
                                <p>Or you can select file by <span className="highlight">clicking here</span></p>
                                <input type="file" name="image" id="file-input" onChange={handleInputChange}/>
                            </div>
                            
                        </div>

                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" 
                                   name="name" 
                                   id="name-input" onChange={handleInputChange} 
                                   placeholder="Name" 
                                   value={formData.name}/>
                        </div>

                        <div className="form-group">
                            <label>Clubs:</label>
                            <Select
                                name="clubs"
                                value={formData.clubs}
                                options={clubs} // Set options for React-Select
                                onChange={handleClubsChange}
                                isMulti // Allow multiple selections
                                placeholder="Select clubs..."
                            />
                        </div>

                        <div className="actions">
                            <button className="reset">Reset</button>
                            <button className="submit">Submit</button>
                        </div>

                    </form>
                </div>
            </section>
        </>
    )
}

export default EditPlayer