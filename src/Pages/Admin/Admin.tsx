import React from 'react'
import Data from '../../Service/Data'

class Admin extends React.Component {

    state = {
        getReservations: []
    }

    componentDidMount() {
        const getBookings = new Data();
        getBookings.readData()
        .then(response => {
            this.setState({getReservations: response.bookings});

            console.log(response.bookings)
            //console.log(getBookings.readData()); //works
        })
        .catch(error => console.log(error));
    }

    getReservation = (id: number) => {
        console.log('This reservation with id ' + id)
    }

    deleteReservation = (id: number) => {
        console.log('Delete reservation with id ' + id)
        const deleteBookings = new Data();
        deleteBookings.deleteData(id);

    }
    
    
    listReservations = () => {
        return this.state.getReservations.map( (booking: any) => {
            return (
            <li key={"Reservation: " + booking.id}>Reservation made by {booking.name} {booking.email}
            {booking.phone} on {booking.dateOfBooking} {booking.timeOfBooking} for {booking.numberOfGuests} guests
            <button onClick={() => this.getReservation(booking.id)}>Get</button>
            <button onClick={() => this.deleteReservation(booking.id)}>Delete</button>
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