import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { useData } from "../DataProvider";

function EditForm({ model, objectToEdit }) {
    const { id } = useParams();
    const { setSuccess, setError } = useData();
    const [clubs, setClubs] = useState([]); 
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        clubs: [], 
    });

    useEffect(() => {
        if (objectToEdit) {
            console.log("objectToEdit:", objectToEdit); 
            setFormData({
                name: objectToEdit.name || "",
                image: objectToEdit.image || "",
                clubs: model === 'players' ? objectToEdit.clubs || [] : [], 
            });
        }
    }, [objectToEdit]); 

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image' && files.length > 0) {
            const file = files[0];
            const fileUrl = URL.createObjectURL(file);
            setImagePreview(fileUrl);
            setFormData((prev) => ({ ...prev, image: file }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleClubsChange = (selectedOptions) => {
        setFormData((prev) => ({
            ...prev,
            clubs: selectedOptions, 
        }));
    };

    const handleReset = async (e) => {
        setFormData((prev) => ({
            name: objectToEdit.name,
            clubs: model === "players" ? objectToEdit.clubs || [] : [],
            image: null
        }))
        setImagePreview(null)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name)
        formDataToSend.append("clubs", JSON.stringify(formData.clubs.map((club) => club.value)))

        if (formData.image) {
            formDataToSend.append("image", formData.image)
        }

        try {
            const response = await axios.patch(`http://localhost:5000/api/${model}/${id}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data"},          
            });
            setSuccess(true)
            setError(false)

            const updatedObject = response.data.data;
            setFormData({
                name: updatedObject.name,
                image: updatedObject.image,
                clubs: model === 'players' ? updatedObject.clubs || [] : [], 
            })
        } catch (error) {
            console.error(`Error updating ${model === "players" ? "player" : "club"}}`, error);
            setError(error.response?.data?.message || "Something went wrong");
            setSuccess(false);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="edit-image-container">
                <div className="image-box" onClick={() => document.getElementById('file-input').click()}>
                    {imagePreview ? (
                        <>
                            <img src={imagePreview} alt="Preview" className="image-preview" />
                            <span className="image-name">{formData.image?.name}</span>
                        </>
                    ) : (
                        <>
                            <i className="fa-solid fa-image"></i>
                            <span>Drag file here to upload.</span>
                            <p>Or you can select file by <span className="highlight">clicking here</span></p>
                        </>
                    )}
                    <input type="file" name="image" id="file-input" onChange={handleInputChange} />
                </div>
            </div>

            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name-input"
                    onChange={handleInputChange}
                    placeholder="Name"
                    value={formData.name || ""}  
                />
            </div>

            {model === 'players' && (
                <div className="form-group">
                    <label>Clubs:</label>
                    <Select
                        className="select-form"
                        name="clubs"
                        value={formData.clubs || []} 
                        options={clubs}
                        onChange={handleClubsChange}
                        isMulti
                        placeholder="Select clubs..."
                    />
                </div>
            )}

            <div className="actions">
                <button type="button" className="reset" onClick={handleReset}>Reset</button>
                <button type="submit" className="submit">Submit</button>
            </div>
        </form>
    );
}

export default EditForm;
