import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ClubDetail() {
    const { id, name } = useParams(); // Extract both `id` and `name` from the route
    const [club, setClub] = useState({ name: "", image: "" });

    useEffect(() => {
        const fetchClub = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/clubs/${id}`);
                console.log(response.data);
                setClub(response.data.data || { name: "", image: "" });
            } catch (error) {
                console.error("Error fetching club data", error);
            }
        };
        fetchClub();
    }, [id]);

    useEffect(() => {
        if (club.name) {
            document.title = club.name;
        }
    }, [club]);

    return (
        <>
            <section className="club-details">
                <header>
                    <div className="wrapper">
                        <h1>
                            {club.name}
                            <i className="fa-solid fa-shield"></i>
                        </h1>
                        <Link className="edit-link" to={`/clubs/${id}/${name}/edit`}>
                            Edit Club
                            <i class="fa-solid fa-up-right-from-square"></i>
                        </Link>
                    </div>
                    <span>Football Club</span>
                </header>
            </section>
        </>
    );
}

export default ClubDetail;
