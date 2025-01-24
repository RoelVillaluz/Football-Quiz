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
            <section className="profile">
                <header>
                    <div className="wrapper">
                        <figure className="club-logo">
                            <img src={`http://localhost:5000${club.image}`} alt="" />
                        </figure>
                        <div>
                            <div className="wrapper" style={{alignItems: 'start', gap: 0}}>
                                <h1>{club.name}</h1>
                                <Link to={`/clubs/${id}/${name}/edit`}>
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </Link>
                            </div>
                            <span>Football Club</span>
                        </div>
                    </div>
                </header>
            </section>
        </>
    );
}

export default ClubDetail;
