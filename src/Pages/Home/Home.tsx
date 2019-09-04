import React from 'react';
import Header from '../../Components/Header/Header';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <Header title="Welcome to Malina">
                 <Link to="/Booking">Booking</Link>
            </Header>
        )
    }
}

export default Home;