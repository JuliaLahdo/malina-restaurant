import React, { Component } from 'react';
import Header from '../../Components/Header/Header';
import './Confirmation.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
// import { withRouter } from 'react-router-dom';
// import Data from '../../Service/Data'
// import { any } from 'prop-types';
// import queryString from 'query-string';


interface IConfirmProps {
    location: any
}

// interface IBooking {
//     id: number;
// }

// interface IState {
//     latestBooking:  IBooking[];
// }

class Confirmation extends Component<IConfirmProps, {}> {
    constructor(props:any) {
        super(props);

        // this.state = {
        //  latestBooking: []
        // };  
    }

    componentDidMount() {
        // let latestBookingInfo = [];
        // console.log(this.props.location.search);
        // const getBookingId = new Data();
        // getBookingId.readData()
        // .then(response => {
        //     console.log(response.data);
            // for(let i = 0; i < response.data.length; i++){
            //     if(response.data.booking[i].getBookingId === this.props.location.serch){
            //         console.log(response.data.booking[i]);
                    // latestBookingInfo.push(response.data.booking[i]);
                   

                // }
            // })
            
        // })

        axios.get('http://localhost:8888/api/booking/read.php')
        .then(response => {
            console.log(response.data.bookings[0]);
            //  for(let i = 0; i < response.data.bookings.length; i++){
            //     if(response.data.bookings[i].id === this.props.location.serch){
            //         console.log(response.data.booking[i]);
            //         latestBookingInfo.push(response.data.booking[i]);
            //     }

            //     }
            // return response;
        }).catch(error => {
            console.log(error);
        });


    }

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