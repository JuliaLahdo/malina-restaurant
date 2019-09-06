import React, { Component } from 'react';
import './Footer.css';


import logo from '../../Images/WhiteLogo.svg';

import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="footerContainer">
                    <div className="restaurantInfoContainer">
                        <div className="restaurantInfo">
                            <img src={logo} alt="Malina logo" className="footerLogo"/>
                            <p className="footerInfo aboutRestaurantText">
                                Malina was founded in 2016 by head chef Johan Sjögren. Who wanted to establish a restaurant with a feeling of fine-dining and comfortfood.
                            </p>
                        </div>
                    </div>

                    <div className="openingHoursContainer">
                        <h2 className="footerTopic">OPENING HOURS</h2>
                        <div className="footerInfo">
                            <b><p>Restaurant</p></b>
                            <p>Mon-Thu: 17:00 - 22:00</p>
                            <p>Fri-Sat: 16:00 - 00:00</p>
                            <p>Sun: 16:00 - 22:00</p>

                            <p><b>Bar</b></p>
                            <p>Mon-Tue: 17:00 - 23:00</p>
                            <p>Wed-Sat: 16:00 - 00:00</p>
                            <p>Sun: 16:00 - 22:00</p>
                        </div>
                    </div>

                    <div className="contactContainer">
                        <h2 className="footerTopic">CONTACT</h2>
                        <div className="footerInfo">
                            <p>Tulegatan 41</p>
                            <p>113 53 Stockholm, Sweden</p>
                            <a href="mailto: info@malina.se">info@malina.se</a>
                            <a href="tel: +46725113113">072 511 3113</a>
                        </div>
                    </div>

                    <div className="followUsContainer">
                        <h2 className="footerTopic">FOLLOW US</h2>
                        <a href="http://www.instagram.com/" className="footerInfo">Instagram</a>
                        <a href="http://www.facebook.com/" className="footerInfo">Facebook</a>
                        <a href="http://www.twitter.com/" className="footerInfo">Twitter</a>

                        <div className="footerIconsContainer">
                            <a href="http://www.instagram.com/"><FaInstagram className="footerIcon" /></a>
                            <a href="http://www.facebook.com/"><FaFacebook className="footerIcon" /></a>
                            <a href="http://www.twitter.com/"><FaTwitter className="footerIcon" /></a>
                        </div>
                    </div>

                </div>
                <p className="copyMalina">&copy; Malina 2019</p>
            </footer>
        )
    }
}
