import React from 'react'
import Data from '../../Service/Data'

interface IBooking {
    id: number;
}

interface IAdminState {
    reservations:  IBooking[];
}

class Admin extends React.Component<{}, IAdminState> {

    constructor(props: any) {
        super(props);

        this.state = {
            reservations: []
        }
    }
    

  componentDidMount() {
        const getBookings = new Data();
        getBookings.readData()
        .then(response => {
            this.setState({reservations: response.bookings});

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
        this.state.reservations.map((item, index) => {
            if(item.id === id) {
                this.state.reservations.splice(index,1);
            }
        })
        this.setState({reservations: this.state.reservations});
    }
    
    listReservations = () => {
        return this.state.reservations.map( (booking: any) => {
            return (
            <li key={"Reservation: " + booking.id}>Reservation made by {booking.name} {booking.email}
            {booking.phone} on {booking.dateOfBooking} {booking.timeOfBooking} for {booking.numberOfGuests} guests
            <button onClick={(event) => this.getReservation(booking.id)}>Get</button>
             <button onClick={(event) => this.deleteReservation(booking.id)}>Delete</button>
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