import React from 'react';
import Header from '../../Components/Header/Header';
import './Edit.css';
import Data from '../../Service/Data';
import moment from 'moment';
import DatePicker from 'react-datepicker';

interface IError {
    emailError: string,
    nameError: string,
    phoneError: string
  }

export interface IUpdateBooking {
    id: number;
    dateOfBooking: moment.Moment;
    timeOfBooking: string;
    numberOfGuests: number;
    email:string;
    name:string;
    phone:string;
}

interface IBookingsState {    
    bookings: IUpdateBooking;
    isCheckedGdpr: boolean;
    isAvailableAt18: boolean;
    isAvailableAt21: boolean;
    isAvilableBookingTime: boolean;
    errors: IError;
}

interface IEditProps {
    match: any;
}

class Edit extends React.Component<IEditProps, IBookingsState>{

    constructor(props: any) {
        super(props);

        this.state = {
            bookings: {              
                id: 0,
                dateOfBooking: moment(),
                timeOfBooking: '',
                numberOfGuests: 0,
                email: '',
                name: '',
                phone: ''
            },
            errors: {        
              emailError: "",
              nameError: "",
              phoneError: ""
            },
            isCheckedGdpr: false,
            isAvailableAt18: true,
            isAvailableAt21: true,
            isAvilableBookingTime: false
          };  
        
        this.getReservation = this.getReservation.bind(this);
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
                bookings: {
                    id: data.bookings[0].id,
                    dateOfBooking: moment(data.bookings[0].dateOfBooking),
                    timeOfBooking: data.bookings[0].timeOfBooking,
                    numberOfGuests: data.bookings[0].numberOfGuests,
                    email: data.bookings[0].email,
                    name: data.bookings[0].name,
                    phone: data.bookings[0].phone
                }
            });
        });
    }

    changeDate(e: Date) {
        this.setState(prevState => {
            prevState.bookings.dateOfBooking = moment(e);
            // prevState.bookings.dateOfBooking = moment(e).format(YYYY-MM-DD);
            // moment(e).format(yyyy-MM-dd);
            // moment(e).moment.HTML5_FMT.DATE
            return {
                bookings: prevState.bookings
            }
        });
    }

    // Setting value to new input value using state
    changeTime(e: any) {
        // Vad gör denna?
        e.persist();
        this.setState(prevState => {
            prevState.bookings.timeOfBooking = e.target.value;
            return {
                bookings: prevState.bookings
            }
        });
    }

    changeGuests(e: any) {
        e.persist();
        this.setState(prevState => {
            prevState.bookings.numberOfGuests = e.target.value;
            return {
                bookings: prevState.bookings
            }
        });
    }

    handleSubmit(e: any) {
        e.preventDefault();
        const updateBooking = new Data();
        updateBooking.updateData(this.state.bookings);
    }

    listReservations() : JSX.Element {

        let radio18: JSX.Element = (<div></div>);
        let radio21: JSX.Element = (<div></div>);
        if(this.state.bookings.timeOfBooking === "18:00:00") {
            radio18 = (<input type="radio" value="18:00:00" name="timeOfBooking" onChange={this.changeTime.bind(this)} className="radioButtonsTime" disabled={!this.state.isAvailableAt18} defaultChecked/>);
            radio21 = (<input type="radio" value="21:00:00" name="timeOfBooking" onChange={this.changeTime.bind(this)} className="radioButtonsTime" disabled={!this.state.isAvailableAt21} />);
        } else {
            radio18 = (<input type="radio" value="18:00:00" name="timeOfBooking" onChange={this.changeTime.bind(this)} className="radioButtonsTime" disabled={!this.state.isAvailableAt18} />);
            radio21 = (<input type="radio" value="21:00:00" name="timeOfBooking" onChange={this.changeTime.bind(this)} className="radioButtonsTime" disabled={!this.state.isAvailableAt21} defaultChecked/>);
        }
        
            return (
                <div>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <p>Reservation name: {this.state.bookings.name}</p>
                        <p>Reservation email: {this.state.bookings.email}</p>
                        <p>Reservation email: {this.state.bookings.phone}</p>

                        <p>Select date:</p>
                        <DatePicker selected={this.state.bookings.dateOfBooking.toDate()} onChange={this.changeDate.bind(this)} dateFormat="yyyy-MM-dd"/>

                        <div className="selectTime">
                            <p>Select time:</p>
                            {radio18}
                            <p className="timeToBook firstTime">18:00</p>
                            {radio21}
                            <p className="timeToBook">21:00</p>
                        </div>

                        <div className="selectNumberOfGuests">
                            <label htmlFor="selectNumberOfGuests">Number of guests <i>(max: 6)</i> : </label>
                            <input type="number" min="1" max="6" value={this.state.bookings.numberOfGuests} name="numberOfGuests" placeholder="Number of guests?" onChange={this.changeGuests.bind(this)}/>
                        </div>

                        <input type="submit" value="Click to update"/>
                    </form>
                </div>
            )
    }

    render() {
        return (
            <div>
                <Header images="headerImages" title="Edit"></Header>
                <div>
                    {this.listReservations()}
                </div>
            </div>
        )
    }
}

export default Edit;
