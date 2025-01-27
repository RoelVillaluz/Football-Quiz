import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useData } from "../DataProvider";

function EditClub() {
    const { id } = useParams();  
    const { club, fetchClub } = useData();

    useEffect(() => {
        fetchClub(id)
    }, [id, fetchClub])

    return (
        <>
            <section className="edit-section">
                    <div className="edit-form-container">
                        <header>
                            <div className="wrapper">
                                <figure className="player-icon">
                                    <img src={`http://localhost:5000${club.image}`} alt="" />
                                </figure>
                                <div>
                                    <h1>Edit Club</h1>
                                    <span className="name">{club.name}</span>
                                </div>
                            </div>
                        </header>
                        <EditForm model="clubs"/>
                    </div>
            </section>
        </>
    );
}

export default EditClub;
