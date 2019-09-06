import React from 'react';
import Header from '../../Components/Header/Header';
import {Link} from 'react-router-dom';
import relax from '../../Images/indexoutside.jpg';

class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="homeContainer">
                    <Header title="Welcome to Malina">
                        <Link to="/Booking">Booking</Link>
                    </Header>

                    {/* <div className="container"> */}
                        <img src={relax} alt="Malina restaurant window" className="windowImage" />
                    {/* </div> */}
                </div>
            </div>
        )
    }
}

export default Home;