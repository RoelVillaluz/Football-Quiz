import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";

function EditClub() {
    const { id } = useParams();  
    const [club, setClub] = useState({ name: "", image: "" });
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        image: ''
    })

    useEffect(() => {
        const fetchClub = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/clubs/${id}`);
                const clubData = response.data.data || { name: "", image: "" };
                setClub(clubData);
    
                // prefill form data with club info
                setFormData({ name: clubData.name, image: clubData.image });
            } catch (error) {
                console.error('Error', error);
            }
        };
        fetchClub();
    }, [id]);
    

    useEffect(() => {
        if (club.name) {
            document.title = `Edit Club: ${club.name}`;
        }
    }, [club]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
    
        // Ensure the image is appended only if it's not null or undefined
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }
    
        console.log("Form data on submit:", formDataToSend);
    
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/clubs/${id}`,
                formDataToSend,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
    
            setSuccess(true);
            setSuccessMessage(`Club: ${formData.name} updated successfully`);
            setError(null);
            setFormData({ name: "", image: null }); // Clear form data after successful submission
        } catch (error) {
            console.error('Error updating club', error);
            setError(error.response?.data?.message || "Something went wrong");
            setSuccess(false);
        }
    };

    function handleChange(e) {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    return (
        <>
            <section className="club-details">
                <header>
                    <div className="wrapper">
                    {club.image && (
                        <img src={club.image} alt="" />
                    )}
                    <h1>Edit {club.name}<i className="fa-solid fa-shield"></i></h1>
                    </div>
                    <span>Football Club</span>
                </header>
                <form className="edit-form" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input 
                            type="text" 
                            value={formData.name} 
                            name="name" 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Image:</label>
                        <input 
                            type="file" 
                            name="image" 
                            onChange={handleChange} 
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form>
                {success && <p>{successMessage}</p>}
                {error && <p>{error}</p>}
            </section>
        </>
    );
}

export default EditClub;
