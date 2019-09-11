import React, { Component } from 'react';
import Header from '../../Components/Header/Header';
import './Confirmation.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

export interface IProps {
    location: any
}

export interface IConfirmState {
    dateOfBooking: string;
    timeOfBooking: string;
    numberOfGuests: number;
    email:string;
    name:string;
    phone:string;
}

class Confirmation extends Component<IProps, IConfirmState> {
  
    constructor(props:any) {
        super(props);
        this.state = {
                dateOfBooking: "",
                timeOfBooking: "",
                numberOfGuests: 1,
                email: "",
                name: "",               
                phone:""          
        }
   
    }

    async componentDidMount() {
        const queryString = require('query-string');        
        console.log(this.props.location);
        const parsed = queryString.parse(this.props.location.search);
        console.log(parsed.id);

        try {
            const response = await axios.get('http://localhost:8888/api/booking/read.php');
            for (let i = 0; i < response.data.bookings.length; i++) {
                if (response.data.bookings[i].id === parsed.id) {
                    this.setState({
                        name: response.data.bookings[i].name,
                        dateOfBooking: response.data.bookings[i].dateOfBooking,
                        timeOfBooking: response.data.bookings[i].timeOfBooking,
                        numberOfGuests: response.data.bookings[i].numberOfGuests,
                        email: response.data.bookings[i].email,
                        phone: response.data.bookings[i].phone,
                    });
                    console.log(this.state);
                }
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    render() {

        return (
            <div>
                <Header images="confirmHeaderImage" title="Thanks for booking" />
                <div className="confirmFoundContainer">
                    <div className="pageHeaderContainer">
                        <h1 className="pageHeading">Thanks for your reservation {this.state.name}!</h1>
                    </div>
                    {/* <p className="bodyText"></p> */}
                    <h2 className="confirmText">You are welcome on {this.state.dateOfBooking} at {this.state.timeOfBooking}</h2>

                    <Link to="/" className="returnHomeLink"><h4>Return home</h4></Link>

                </div>
            </div>
        )
    }
}

export default Confirmation;