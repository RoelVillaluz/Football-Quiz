import { Link } from 'react-router-dom'

function Navbar({ children, isAdmin }) {
    const iconPath = isAdmin ? "/images/ball_14533575.png" : "/images/football_18338687.png";

    return (
        <>
            <nav className='navbar'>
                <Link className="logo" to={'/'}>
                    <span>Who's the <span className="highlight">Baller?</span></span>
                    <img src={iconPath} alt="ball" className='colored-icon'/>
                </Link>
                {children}
            </nav>
        </>
    )
}

export default Navbar