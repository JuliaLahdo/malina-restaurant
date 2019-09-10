import React, { Component } from 'react';
import Header from '../../Components/Header/Header';
import './Confirmation.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
// import { withRouter } from 'react-router-dom';
// import Data from '../../Service/Data'
// import { any } from 'prop-types';
// import IBooking from '../Booking/Booking';
import moment from 'moment';


interface IProps {
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
  

// interface IConfirmState {    
//     bookings: [];  
// }
 

class Confirmation extends Component<IProps, IConfirmState> {
  
 

    constructor(props:any) {
        super(props);
        this.state = {
                dateOfBooking: "",
                timeOfBooking: "",
                numberOfGuests: 1,
                email: "",
                name: "",               
                phone:"",
                
            
      
    }
   
}


    componentDidMount() {
        const queryString = require('query-string');        
        console.log(this.props.location);
        const parsed = queryString.parse(this.props.location.search);
        console.log(parsed.id);

        return axios.get('http://localhost:8888/api/booking/read.php')
        .then(response => {

            for (let i = 0; i < response.data.bookings.length; i++){   
                if(response.data.bookings[i].id === parsed.id){
                    this.setState({
                        name: response.data.bookings[i].name,
                        dateOfBooking: response.data.bookings[i].dateOfBooking,
                        timeOfBooking:response.data.bookings[i].timeOfBooking,
                        numberOfGuests: response.data.bookings[i].numberOfGuests,
                        email:response.data.bookings[i].email,              
                        phone:response.data.bookings[i].phone, 
                      }); 
                      console.log(this.state);                                   
                }
            } 
            
                 
        }).catch(error => {
            console.log(error);
        });

    }


    render() {

  
      
        return (
            <div>
                <Header images="menuImages" title="Thanks for booking" />
                    <p>thanks for your reservation {this.state.name} {this.state.dateOfBooking} {this.state.timeOfBooking}</p>              
             
  
                 
                        <Link to="/"><h3>Return to Home</h3></Link> 
                        
            </div>
        )
    }
}

export default Confirmation;