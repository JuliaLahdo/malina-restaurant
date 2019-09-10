import React from 'react'
import Data from '../../Service/Data'
import { Link } from 'react-router-dom';
import './Admin.css';
// import Edit from '../Edit/Edit';

export interface IBooking {
    id: number;
    customerId: number;
    numberofGuests: number;
    dateOfBooking: string;
    timeOfBooking: string;
    email: string;
    name: string;
    phone: string;
}

interface IAdminState {
    reservations:  IBooking[];
}

class Admin extends React.Component<{}, IAdminState> {

    _isMounted = false;

    constructor(props: any) {
        super(props);

        this.state = {
            reservations: []
        }
    }

  componentDidMount() {
    this._isMounted = true;
    this.getReservations();
    }

    async getReservations() {
        let getBookings = new Data();
        let response = await getBookings.readData()
  
          if (response) {
            this.setState({reservations: response.bookings});
            console.log(response.bookings);
          } else {
            this.setState({ reservations: [] });
            console.log('mo');
          }

      }

    componentWillUnmount() {
        this._isMounted = false;
        this.getReservations();
      }
    

    getReservation = (id: number) => {
        console.log('This reservation with id ' + id)
    }

    deleteReservation = (id: number) => {

        console.log('Delete reservation with id ' + id)
        const deleteBookings = new Data();
        deleteBookings.deleteData(id);
        this.state.reservations.forEach((item, index) => {
            if(item.id === id) {
                this.state.reservations.splice(index,1);
            }
        })
        this.setState({reservations: this.state.reservations});
    }
    


    // editReservation(item: any) {
	// 	const reservations = this.state.reservations;
	// 	this.setState({
	// 		reservations: [...reservations]
	// 	}, () => {

	// 	});
	// }
    
    render() {
        return (
            <div>
                <ul>
                {
                    this.state.reservations.map( (booking: any) => {

            let url = "/Admin/Edit/" + booking.id;
            return (
                <li key={"Reservation: " + booking.id}>
                    {/* <Link to={Admin/Edit/${booking.id}}>{booking.id}</Link> */}
                    {/* <Link to={accordion/${booking.booking_ID}}> */}
                    {/* <Link to={'Admin/Edit/'#{booking.id}}">{booking.id}</Link> */}
                    {/* <Link to="Admin/Edit/"{booking.id}>{booking.id}</Link> */}

                    <Link to={url}>{booking.id}</Link>
                    
                    Reservation made by {booking.name} {booking.email}
                    {booking.phone} on {booking.dateOfBooking} {booking.timeOfBooking} for {booking.numberOfGuests} guests
                    <button onClick={(event) => this.getReservation(booking.id)}>Get</button>
                    <button onClick={(event) => this.deleteReservation(booking.id)}>Delete</button>
                </li>
            )
        })}
                </ul>
            </div>
            )
        }
    }

    export default Admin;