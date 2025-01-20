import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <>
            <nav className='navbar'>
                <Link className="logo" to={'/'}>Home</Link>
                <ul>
                    <li><Link to={'/players'}>Players</Link></li>
                    <li><Link to={'/clubs'}>Clubs</Link></li>
                    <li><Link to={'/create-players'}>Create Players</Link></li>
                    <li><Link to={'/create-clubs'}>Create Clubs</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar