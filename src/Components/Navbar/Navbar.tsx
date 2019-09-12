import React from 'react';
import './Navbar.css';
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
        this.closeNavbar = this.closeNavbar.bind(this);
    }

    handleToggle(){
        this.setState({
            isOpen:!this.state.isOpen
        })
    }

    closeNavbar() {
        if (this.state.isOpen === true) {
        this.handleToggle();
        }
    }

    render() {
        return(
            <nav className="navbar" role="navigation">
                <div className="navHeader">
                    <button type="button" className="navBtn" onClick={this.handleToggle}>
                        <FaBars className="navIcon" />
                    </button>
                </div>

                <div>
                    <ul className={this.state.isOpen ? "navLinks showNav" : "navLinks"}>
                        <li>
                            <Link to="/" onClick={this.closeNavbar}>Home</Link>
                        </li>
                        <li>
                            <Link to="/Menu" onClick={this.closeNavbar}>Menu</Link>
                        </li>
                        <li>
                            <Link to="/Booking" onClick={this.closeNavbar}>Booking</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;