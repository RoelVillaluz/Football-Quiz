import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios";
import StatusNotification from "../components/StatusNotification";
import EditForm from "../components/EditForm";
import Select from "react-select";
import { useData } from "../DataProvider";

function EditPlayer() {
    const { id } = useParams();
    const { player, fetchPlayer, clubs, setClubs, isLoading, success } = useData();

    useEffect(() => {
        fetchPlayer(id)
    }, [id])

    return (
        <>
            <section className="edit-section">
                <div className="edit-form-container">
                    <header>
                        <div className="wrapper">
                            <figure className="player-icon">
                                {isLoading || !player ? (
                                    <p>Loading...</p>
                                ) : (
                                    <img src={`http://localhost:5000${player.image}`} alt="" />
                                )}
                            </figure>
                            <div>
                                <h1>Edit Player</h1>
                                {isLoading || !player ? (
                                    <p>Loading...</p>
                                ) : (
                                    <span className="name">{player.name}</span>
                                )}
                            </div>
                        </div>
                    </header>
                    <EditForm model="players" objectToEdit={player}/>
                </div>
            </section>
            {success && (
                <StatusNotification type="Player" object={player} action="updated" visible={true} duration={3000}/>
            )}

        </>
    )
}

export default EditPlayer