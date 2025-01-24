import { Link } from "react-router-dom"
import Navbar from "../../frontend/football-project/src/Navbar"

function AdminNavbar() {
    return (
        <>
            <Navbar isAdmin={true}>
                <ul>
                    <li><Link to={'/players'}>Players</Link></li>
                </ul>
            </Navbar>
        </>
    )
}

export default AdminNavbar