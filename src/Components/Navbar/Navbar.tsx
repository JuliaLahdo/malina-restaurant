import React from 'react';
import './Navbar.css';
import logo from '../../Images/BlackLogo.svg';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return(
            <nav className="navbar">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <div>
                    <ul>
                        <li>
                            <Link to="/">
                            Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/Menu">
                            Menu
                            </Link>
                        </li>
                        <li>
                            <Link to="/Booking">
                            Booking
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;