import React from 'react';
import './Navbar.css';
import logo from '../../Images/blacklogo.svg'
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

interface IState {    
    isOpen: boolean;
}

class Navbar extends React.Component<{}, IState> {
    constructor(props:any){
        super(props);
            this.state = {
                isOpen: false
            }

        this.handleToggle = this.handleToggle.bind(this);
    }
    

    handleToggle(){
        this.setState({
            isOpen:!this.state.isOpen
        })
    }

    render() {
        return(
            <nav className="navbar">
                <div className="navCenter">
                    <div className="navHeader">
                        <Link to="/">
                            <img src={logo} alt="malina Restaurant" />
                        </Link>
                        <button type="button" className="navBtn" onClick={this.handleToggle}>
                            <FaBars className="navIcon" />
                        </button>
                    </div>
                </div>
               
                <div>
                    <ul className={this.state.isOpen ? "navLinks showNav" : "navLinks"}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/Menu">Menu</Link>
                        </li>
                        <li>
                            <Link to="/Booking">Booking</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;