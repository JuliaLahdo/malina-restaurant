import React from 'react';
import Header from '../../Components/Header/Header';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <Header title="welcome to Malina restaurnats">
                 <Link to="/Booking">
                            Booking
                            </Link>
                            </Header>
        )
    }
}

export default Home;