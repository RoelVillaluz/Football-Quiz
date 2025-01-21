import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <>
            <nav className='navbar'>
                <Link className="logo" to={'/'}>
                    <span>Who's the <span className="highlight">Baller?</span></span>
                    <img src="/images/football_18338687.png" alt="ball" className='colored-icon'/>
                </Link>
                <ul>
                    <li data-index="0"><Link to="/players">Players</Link></li>
                    <li data-index="1"><Link to="/clubs">Clubs</Link></li>
                    <li data-index="2"><Link to="/create-players">Create Players</Link></li>
                    <li data-index="3"><Link to="/create-clubs">Create Clubs</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar