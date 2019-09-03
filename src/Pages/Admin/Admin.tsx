import React from 'react'
import Data from '../../Service/Data'

class Admin extends React.Component {

    state = {
        getReservation: []
    }

componentDidMount() {
    const getBookings = new Data();
    getBookings.readData()
    .then(response => {
        this.setState({getReservation: response.bookings});

        console.log(response.bookings)
        //console.log(getBookings.readData()); //works

    })
    .catch(error => console.log(error));
}

    listBookings = () => {
        return this.state.getReservation.map( (booking: any) => {
            return (
                <li key={"Reservation:" + booking.id}>Reservation made by {booking.name} {booking.email} {booking.phone} on {booking.dateOfBooking} {booking.timeOfBooking} for {booking.numberOfGuests} guests</li>
            )
        });
    };


    render() {
        
        return (
            <div>
                <ul>
                    {this.listBookings()}
                </ul>
            </div>
        )
    }
}

export default Admin;