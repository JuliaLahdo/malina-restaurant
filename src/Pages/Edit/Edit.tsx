import React from 'react';
import './Edit.css';
import Header from '../../Components/Header/Header';
import Data from '../../Service/Data';
import moment from 'moment';
import DatePicker from 'react-datepicker';

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
            isCheckedGdpr: false,
            isAvailableAt18: true,
            isAvailableAt21: true,
            isAvilableBookingTime: false
          };  
        
        this.getReservation = this.getReservation.bind(this);
    }

    componentDidMount() {
        this.getReservation(this.props.match.params.id);
        window.scrollTo(0, 0);
    }

    handleDeleteBooking(id: number) {
        const deleteBookings = new Data();
        deleteBookings.deleteData(id);
    }

    getReservation(id: number) {
        const findSingleBooking = new Data();
        findSingleBooking.readSingleBooking(id).then(data => {
            // Set state of reservation to fetched booking
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
            // Then run function changeDate and pass on dateOfBooking
            }, () => {
                this.changeDate(this.state.bookings.dateOfBooking.toDate());
            });
        });
    }

    changeDate(date: Date) {      
        let momentDate = moment(date);
        let data = new Data();
        data.readData()
            .then(response => {

          let numberOfTablesBookedAt18 = [];
          let numberOfTablesBookedAt21 = [];

            for (let i = 0; i < response.bookings.length; i++){
                // Check that fetched date equals selected date in Datepicker
                if(response.bookings[i].dateOfBooking === momentDate.format('YYYY-MM-DD')){
                    if(response.bookings[i].timeOfBooking === "18:00:00") {
                        numberOfTablesBookedAt18.push(response.bookings[i]);
                        console.log("Trying to book 18: ",numberOfTablesBookedAt18);
                    }
                    if(response.bookings[i].timeOfBooking === "21:00:00") {
                        numberOfTablesBookedAt21.push(response.bookings[i]);
                        console.log("Trying to book 21: ", numberOfTablesBookedAt21);
                    }
                }
            }

          console.log("numberOfTablesBookedAt18 ", numberOfTablesBookedAt18);
          console.log("numberOfTablesBookedAt21 ", numberOfTablesBookedAt21);

          if(numberOfTablesBookedAt18.length > 14) {
            console.log("full booking 18:00:00");
            this.setState({
              isAvailableAt18: false 
            });
          } else {
            console.log("can book 18:00:00");
            this.setState({
              isAvailableAt18: true
            });
          }
    
          if(numberOfTablesBookedAt21.length > 14) {
            console.log("full booking 21:00:00");
            this.setState({
              isAvailableAt21: false 
            });
          } else {
            console.log("can book 21:00:00");
            this.setState({
              isAvailableAt21: true
            });
          }
            return response;
        }).catch(error => {
            console.log(error);
        });

        this.setState((prevState: any)=>{  
          prevState.bookings.dateOfBooking = momentDate; 
            return {
              bookings: prevState.bookings
            };
        });
      }

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

                    <div className="pageHeaderContainer">
                        <h1 className="pageHeading">Edit reservation</h1>
                    </div>

                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="editForm">
                            <div className="customerInformationContainer">
                                <p className="bodyText"><b>Reservation name:</b> {this.state.bookings.name}</p>
                                <p className="bodyText"><b>Reservation email:</b> {this.state.bookings.email}</p>
                                <p className="bodyText"><b>Reservation phonenumber:</b> {this.state.bookings.phone}</p>
                            </div>

                            <div className="bookingInformationContainer">
                                <p className="bodyText">Select date:</p>
                                <DatePicker selected={this.state.bookings.dateOfBooking.toDate()} onChange={this.changeDate.bind(this)} dateFormat="yyyy-MM-dd" minDate={moment().toDate()}/>

                                <div className="selectTime">
                                    <p className="bodyText">Select time:</p>
                                    {radio18}
                                    <p className="bodyText timeToBook firstTime">18:00</p>
                                    {radio21}
                                    <p className="bodyText timeToBook">21:00</p>
                                </div>

                                <div className="selectNumberOfGuests">
                                    <label htmlFor="selectNumberOfGuests" className="bodyText">Number of guests <i>(max: 6)</i> : </label>
                                    <input type="number" min="1" max="6" value={this.state.bookings.numberOfGuests} name="numberOfGuests" placeholder="Number of guests?" onChange={this.changeGuests.bind(this)}/>
                                </div>
                            </div>
                        </div>
                        <div className="submitButtonContainer">
                            <button type="submit" className="editSubmitButton">Update</button>
                        </div>
                    </form>
                </div>
            )
    }

    render() {
        return (
            <div>
                <Header images="editHeaderImage" title="Edit booking"></Header>
                <div>
                    {this.listReservations()}
                </div>
            </div>
        )
    }
}

export default Edit;
