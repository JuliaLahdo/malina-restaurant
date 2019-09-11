import React from 'react'
import Data from '../../Service/Data'
import { Link } from 'react-router-dom';
import './Admin.css';
import Header from '../../Components/Header/Header';
// import Edit from '../Edit/Edit';

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

  async componentDidMount() {
    window.scrollTo(0, 0);
    this._isMounted = true;
    await this.getReservations();
    }

    async getReservations() {
        let getBookings = new Data();
        let response = await getBookings.readData()

        if(this._isMounted) {
        if (response) {
            this.setState({reservations: response.bookings});
            console.log(response.bookings);
            console.log('mi');
          } else {
            this.setState({ reservations: [] });
            console.log('mo');
          }
        }
      }

    async componentWillUnmount() {
        this._isMounted = false;
        await this.getReservations();
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
                <Header images="adminHeaderImage" title="Admin bookings" />
                <ul className="pageContainer">
                {
                    this.state.reservations.map( (booking: any) => {
                        let url = "/Admin/Edit/" + booking.id;
                        return (
                        <li className="pageDescription" key={"Reservation: " + booking.id}>
                        {/* <Link to={Admin/Edit/${booking.id}}>{booking.id}</Link> */}
                        {/* <Link to={accordion/${booking.booking_ID}}> */}
                        {/* <Link to={'Admin/Edit/'#{booking.id}}">{booking.id}</Link> */}
                        {/* <Link to="Admin/Edit/"{booking.id}>{booking.id}</Link> */}
                    
                    <h3 className="bodyText"><b>Reservation number: </b><Link to={url}>{booking.id}</Link></h3>
                    <br />
                    <p className="bodyText"><b>Name: </b> {booking.name}</p>
                    <p className="bodyText"><b>E-Mail: </b> {booking.email}</p>
                    <p className="bodyText"><b>Phone number: </b> {booking.phone}</p>
                    <hr></hr>
                    <p><b>Date: </b>{booking.dateOfBooking}</p>
                    <p><b>Time: </b>{booking.timeOfBooking}</p>
                    <p><b>{booking.numberOfGuests}</b> guests</p>
                    <div>
                    <Link to={url}><button>Edit</button></Link>
                    {/* <button onClick={(event) => this.getReservation(booking.id)}>Get</button> */}
                    <button onClick={(event) => this.deleteReservation(booking.id)}>Delete</button>
                    </div>
                </li>
            )
        })}
                </ul>
            </div>
            )
        }
    }

    export default Admin;