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

getReservation = (id: number) => {
    console.log('Removing booking with id ' + id)

}

    listReservations = () => {
        return this.state.getReservation.map( (booking: any) => {
            return (
                <li key={"Reservation:" + booking.id}>Reservation made by {booking.name} {booking.email}
                {booking.phone} on {booking.dateOfBooking} {booking.timeOfBooking} for {booking.numberOfGuests} guests
                <button onClick={(event) => this.getReservation(booking.id)}>Get</button>
                </li>
            )
        });
    };


    render() {
        
        return (
            <div>
                <ul>
                    {this.listReservations()}
                </ul>
            </div>
        )
    }
}

export default Admin;