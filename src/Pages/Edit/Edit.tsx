import React from 'react';
import Header from '../../Components/Header/Header';
import './Edit.css';
import Data from '../../Service/Data';
// import { IBooking } from '../Admin/Admin';
import moment from 'moment';

export interface IListBookingDetails {
    // dateOfBooking: moment.Moment;
    // timeOfBooking: string;
    // numberOfGuests: number;
    dateOfBooking: any;
    timeOfBooking: any;
    numberOfGuests: any;
}

interface IBooking {
    id: number;
    dateOfBooking: moment.Moment;
    timeOfBooking: string;
    numberOfGuests: number;
    email:string;
    name:string;
    phone:string;
  }

interface IEditProps {
    match: any;
}

class Edit extends React.Component<IEditProps, IBooking>{

    constructor(props: any) {
        super(props);

        this.state = {
            id: 0,

                dateOfBooking: moment(),
                timeOfBooking: '',
                numberOfGuests: 0,
                email: '',
                name: '',
                phone: ''
            
        }
        
        this.getReservation = this.getReservation.bind(this);
        this.handleEditDateChange = this.handleEditDateChange.bind(this);
        this.listReservations = this.listReservations.bind(this);
    }

    componentDidMount() {
        console.log(this.props.match.params.id);

        this.getReservation(this.props.match.params.id);
    }

    handleDeleteBooking(id: number) {
        const deleteBookings = new Data();
        deleteBookings.deleteData(id);
    }

    getReservation(id: number) {
        console.log('This reservation with id ' + id);

        const findSingleBooking = new Data();
        findSingleBooking.readSingleBooking(id).then(data => {
            
            console.log(data.bookings);
            this.setState({
                id: data.bookings[0].id,
                dateOfBooking: moment(data.bookings[0].dateOfBooking),
                timeOfBooking: data.bookings[0].timeOfBooking,
                numberOfGuests: data.bookings[0].numberOfGuests,
                email: data.bookings[0].email,
                name: data.bookings[0].name,
                phone: data.bookings[0].phone
            });
        });

        
    }

    listReservations() : JSX.Element {
        
            return (
                <li key={this.state.id}>
                    Reservation made by {this.state.name} {this.state.email}, {this.state.phone} on {this.state.dateOfBooking.format('YYYY-MM-DD')} {this.state.timeOfBooking} for {this.state.numberOfGuests} guests
                </li>
            )
    }

    handleEditDateChange(e: any) {
        const target = e.target;
        const value = target.value;
        const date = target.date;
        
        // reservations[target].dateOfBooking = value;

        // this.setState({
        //     reservationsState: reservations
        // });
    }

    render() {
        //console.log(this.listReservations());
        return (
            <div>
                <Header title="Edit"></Header>
                {/* <input type="text" name="Name" value={this.state.reservationsState.dateOfBooking} onChange={this.handleEditDateChange} /> */}
                <ul>
                    {this.listReservations()};
                </ul>
            </div>
        )
    }
}

export default Edit;