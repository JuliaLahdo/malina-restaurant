import React from 'react';
import Header from '../../Components/Header/Header';
import './Edit.css';
import Data from '../../Service/Data';
import moment from 'moment';
import DatePicker from 'react-datepicker';

// interface IError {
//     emailError: string,
//     nameError: string,
//     phoneError: string
// }

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
    // errors: IError;
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
            // errors: {        
            //   emailError: "",
            //   nameError: "",
            //   phoneError: ""
            // },
            isCheckedGdpr: false,
            isAvailableAt18: true,
            isAvailableAt21: true,
            isAvilableBookingTime: false
          };  
        
        this.getReservation = this.getReservation.bind(this);
        // this.listReservations = this.listReservations.bind(this);
    }

    componentDidMount() {
        console.log(this.props.match.params.id);

        this.getReservation(this.props.match.params.id);
    }

    // validate() {
    //     let emailError= "";
    //     let nameError="";
    //     let phoneError= "";
    
    //     if(!this.state.bookings.email){
    //       emailError = "E-mail can not be blank";
    //     }
    
    //     if(!this.state.bookings.name){
    //       nameError = "Name can not be blank";
    //     }
    
    //     if(this.state.bookings.name.length < 3){
    //       nameError = "Name can not be more than 3 characters";
    //     }
    
    //     if(!this.state.bookings.phone){
    //       phoneError = "Phone can not be blank";
    //     }
    
    //     if(this.state.bookings.phone.length < 5){
    //       phoneError = "Phone can not be more than 5 numbers";
    //     }
    
    //     if(emailError||nameError||phoneError){
    //          this.setState({
    //            errors: 
    //            {emailError,nameError,phoneError}
    //           });
    //       return false;
    //     }
    //     return true;
    // }

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

    changeDate(date: Date) {      
        let momentDate = moment(date);
        let data = new Data();
        data.readData()
            .then(response => {
                console.log("This is the response ", response);
    
          let numberOfTablesBookedAt18 = [];
          let numberOfTablesBookedAt21 = [];
    
          
        // if(momentDate.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')){
        //     alert("can not book");
        //   }{

            for (let i = 0; i < response.length; i++){
            // for (let i = 0; i < response.data.bookings.length; i++){   
                //Behöver vi denna if-sats?
            //   if(response[i].dateOfBooking === momentDate.format('YYYY-MM-DD')){
               if(response[i].timeOfBooking === "18:00:00") {
                  numberOfTablesBookedAt18.push(response[i]);
                  console.log(numberOfTablesBookedAt18);
               }
               else{
                  numberOfTablesBookedAt21.push(response[i]);
                  console.log("Trying to book 21: ", numberOfTablesBookedAt21);
              }
            // }
          }

          console.log("numberOfTablesBookedAt18 ", numberOfTablesBookedAt18)
        // }
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

        // this.setState(prevState => {
        //     prevState.bookings.dateOfBooking = moment(e);
        //     return {
        //         bookings: prevState.bookings
        //     }
        // });
        this.setState((prevState:any)=>{  
          prevState.bookings.dateOfBooking = momentDate; 
            return {
              bookings: prevState.bookings
            };
        });
      }

    // changeDate(e: Date) {
        // let momentDate = moment(e);

        // let numberOfTablesBookedAt18 = [];
        // let numberOfTablesBookedAt21 = [];

        // if(momentDate.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')){
        //     alert("can not book");
        //   }{
        //     for (let i = 0; i < this.state.bookings.length; i++){   
        //       if(this.state.bookings[i].dateOfBooking === momentDate.format('YYYY-MM-DD')){
        //        if(response.data.bookings[i].timeOfBooking === "18:00:00") {
        //           numberOfTablesBookedAt18.push(response.data.bookings[i]);
        //           console.log(numberOfTablesBookedAt18);
        //        }
        //        if(response.data.bookings[i].timeOfBooking === "21:00:00") {
        //           numberOfTablesBookedAt21.push(response.data.bookings[i]);
        //           console.log(numberOfTablesBookedAt21);
        //       }
        //     }
        //   }    
        // }
        //   if(numberOfTablesBookedAt18.length > 14) {
        //     console.log("full booking 18:00:00");
        //     this.setState({
        //       isAvailableAt18: false 
        //     });
    
        //   } else {
        //     console.log("can book 18:00:00");
        //     this.setState({
        //       isAvailableAt18: true
        //     });
        //   }
    
        //   if(numberOfTablesBookedAt21.length > 14) {
        //     console.log("full booking 21:00:00");
        //     this.setState({
        //       isAvailableAt21: false 
        //     });
        //   } else {
        //     console.log("can book 21:00:00");
        //     this.setState({
        //       isAvailableAt21: true
        //     });
        //   }
        //     return response;
        // }).catch(error => {
        //     console.log(error);
        // });

    //     this.setState(prevState => {
    //         prevState.bookings.dateOfBooking = moment(e);
    //         return {
    //             bookings: prevState.bookings
    //         }
    //     });
    // }

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

    // handleSubmit(e: any) {
        // const isValid = this.validate();
        // if(isValid) {
        //     const updateBooking = new Data();
        //     updateBooking.updateData(this.state.bookings);
        // } else {
        //     e.preventDefault();
        // }
    // }

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
