import React from 'react'
import Data from '../../Service/Data'
import { Link } from 'react-router-dom';
import './Admin.css';
import Header from '../../Components/Header/Header';

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
    
    async componentDidMount() {
        window.scrollTo(0, 0);
        this._isMounted = true;
        await this.getReservations();
    }

    // get all reservations from db async
    async getReservations() {
        let getBookings = new Data();
        let response = await getBookings.readData()

        if(this._isMounted) {
        if (response) {
            this.setState({reservations: response.bookings});
          } else {
            this.setState({ reservations: [] });
          }
        }
      }

    async componentWillUnmount() {
        this._isMounted = false;
        await this.getReservations();
    }
    
    // Deletes reseration from id
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
    
    render() {
        return ( 
            <div>
                <Header images="adminHeaderImage" title="Admin bookings" />
                <h2 className="totalReservations"><b>Reservations: {this.state.reservations.length}</b> </h2>
                <ul className="pageContainer">
                {
                    this.state.reservations.map( (booking: any) => {
                        let url = "/Admin/Edit/" + booking.id;
                        return (
                        <li className="adminDescription" key={"Reservation: " + booking.id}>
                            <h3 className="bodyText"><b>Reservation number: </b><Link to={url} className="singleReservationLink">{booking.id}</Link></h3>
                            <p className="bodyText"><b>Name: </b> {booking.name}</p>
                            <p className="bodyText"><b>E-Mail: </b> {booking.email}</p>
                            <p className="bodyText phoneTag"><b>Phone number: </b> {booking.phone}</p>
                            <p className="bodyText dateTag"><b>Date: </b>{booking.dateOfBooking}</p>
                            <p className="bodyText"><b>Time: </b>{booking.timeOfBooking}</p>
                            <p className="bodyText"><b>{booking.numberOfGuests}</b> guests</p>
                            <div>
                                <button onClick={(event) => this.deleteReservation(booking.id)} className="adminButton">Delete</button>
                                <Link to={url}><button>Edit</button></Link>
                            </div>
                        </li>
                        )
                    })
                }
                </ul>
            </div>
            )
        }
    }

    export default Admin;