import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <>
            <nav className='navbar'>
                <Link className="logo" to={'/'}>
                    <span>Who's the <span className="highlight">Baller?</span></span>
                    <img src="/images/football_18338687.png" alt="ball" className='colored-icon'/>
                </Link>
            </nav>
        </>
    )
}

export default Navbar