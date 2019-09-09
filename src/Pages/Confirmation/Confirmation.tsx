import React, { Component } from 'react';
import Header from '../../Components/Header/Header';
import './Confirmation.css';
import {Link} from 'react-router-dom';

class Confirmation extends Component {
    render() {
        return (
            <div>
                   <Header images="menuImages" title="Thanks for booking" />
                        <Link to="/"><h3>Return to Home</h3></Link>                    
            </div>
        )
    }
}

export default Confirmation;