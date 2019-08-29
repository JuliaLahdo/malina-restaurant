import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="address">Address</div>
                <div className="openingHours">Opening Hours</div>
                <div className="followUs">Follow Us</div>
            </footer>
        )
    }
}
