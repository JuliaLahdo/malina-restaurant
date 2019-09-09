import React from 'react';
import Header from '../../Components/Header/Header';
import {Link} from 'react-router-dom';
import relax from '../../Images/indexoutside.jpg';
import table from '../../Images/indextable.png';
import './Home.css';

class Home extends React.Component {
    render() {
        return (
            <div>
            <Header images="headerImages" title="Welcome to Malina">
            </Header>
                <div className="homeContainer">

                    <div className="pageHeaderContainer">
                        <h1 className="pageHeading">Food is art</h1>
                    </div>
                    <p className="pageDescription">We believe that you eat with your eyes. Not with eyes alone of course, but it's a big part of a nice dish. We combine artistic dishes with an indulgence of flavours with every bite. Welcome to Malina.</p>

                    <div className="reservationLinksContainer">
                        <Link to="/Booking"><img src={table} alt="Table with white cloth" className="reservationImage"/></Link><br />
                        <Link to="/Booking" className="reservationsLink">Table reservations</Link>
                    </div>

                    <div className="imageContainer">
                        <img src={relax} alt="Malina restaurant window" className="windowImage" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;