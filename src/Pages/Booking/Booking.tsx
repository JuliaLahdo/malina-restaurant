import React from 'react';
import DatePicker from 'react-datepicker';
// import Data from '../../Service/Data';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';
import axios from 'axios';
import moment from 'moment';
import Header from '../../Components/Header/Header';

// import SelectDate from '../../Components/SelectDate/SelectDate';
// import SelectTime from '../../Components/SelectTime/SelectTime';
// import Details from '../../Components/Details/Details';

// export interface IBookings{
//     data: [];

// }

// export interface IBookingsProps{
//   bookingDatas(bookingData:IBooking):void;
 
// }

interface IBooking {
  dateOfBooking: moment.Moment;
  timeOfBooking: string;
  numberOfGuests: number;
  email:string;
  name:string;
  phone:string;
}

interface IBookingsState {    
  bookings: IBooking;

  isAvailableAt18: boolean;
  isAvailableAt21: boolean;
}

class Booking extends React.Component<{}, IBookingsState> {    

  constructor(props:any) {
    super(props);
    this.state = {
      bookings: {              
        dateOfBooking:moment(),
        timeOfBooking: "",
        numberOfGuests: 1,
        email: "",
        name: "",
        phone: ""
      },
      isAvailableAt18: true,
      isAvailableAt21: true
    };  
      
    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost/api/booking/read.php')
    .then(response => {
        console.log(response.data);
        return response;
    }).catch(error => {
        console.log(error);
    });
  }

  handleSubmit(e: any) {
    //e.preventDefault();
    console.log(this.state.bookings);
    let postData = {
      'dateOfBooking': this.state.bookings.dateOfBooking.format('YYYY-MM-DD'),
      'numberOfGuests': this.state.bookings.numberOfGuests,
      'timeOfBooking': this.state.bookings.timeOfBooking,
      'email': this.state.bookings.email,
      'name': this.state.bookings.name,
      'phone': this.state.bookings.phone
    }

    console.log('Did component create?');
    axios.post('http://localhost/api/booking/create.php', postData, {
        headers: { 'Content-Type': 'text/plain' }})
        .then((response: any) => {
            console.log(response);
            return response;
        }).catch((error: any) => {
            console.log(error);
        });
  }

  handleChange(e:any) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    // console.log("Changing values: { name {0}: value: {1} }", name, value);
    
    if(!e.value){          
      this.setState((prevState:any)=>{   
      prevState.bookings[name] = value; 
        return {
          bookings: prevState.bookings
        };          
      },
      () => {
        console.log(this.state.bookings);
      });

    } else {
      console.log("Can not be empty!");
    }         
  }

  handleDateChange(date: Date) {      
    let momentDate = moment(date);        
    console.log(momentDate);
    axios.get('http://localhost/api/booking/read.php')
    .then(response => { 
      let numberOfTablesBookedAt18 = [];
      let numberOfTablesBookedAt21 = [];

      for (let i = 0; i < response.data.bookings.length; i++){   
        if(response.data.bookings[i].dateOfBooking == momentDate.format('YYYY-MM-DD'))
        {
          if(response.data.bookings[i].timeOfBooking == "18:00:00") {
            numberOfTablesBookedAt18.push(response.data.bookings[i]);
            console.log(numberOfTablesBookedAt18);
          }
          if(response.data.bookings[i].timeOfBooking == "21:00:00") {
            numberOfTablesBookedAt21.push(response.data.bookings[i]);
            console.log(numberOfTablesBookedAt21);
          }

        }
      }

      if(numberOfTablesBookedAt18.length > 14) {
        console.log("full booking");
        this.setState({
          isAvailableAt18: false 

        });

      } else {
        this.setState({
          isAvailableAt18: true
        });
      }

        return response;
    }).catch(error => {
        console.log(error);
    });  

    this.setState((prevState:any)=>{  
      prevState.bookings.dateOfBooking = momentDate; 
        return {
          bookings: prevState.bookings
        };
    });
    console.log(momentDate);
  }

  handleTimeChange(e:any) {       
    let time = e.target.value; 
    console.log(time);
    
    this.setState((prevState:any)=>{  
      prevState.bookings.timeOfBooking = time; 
        return {
          bookings: prevState.bookings
        };          
    });
  }

  render() {
    console.log(this.state.bookings.dateOfBooking);
    return (
      <div className="container">
        <Header title="Booking page" />             
        <div className="bookingFormContainer">   

          <form onSubmit={(e) => this.handleSubmit(e)}>
            {/* <SelectDate />  */}
            <DatePicker selected={this.state.bookings.dateOfBooking.toDate()} onChange={this.handleDateChange} dateFormat="yyyy-MM-dd"/>  
            {/* <SelectTime />  */}     

            <div className="selectTime">
              {/* defaultChecked on 18:00, if not changed then booking won't be created */}
              <input type="radio" value="18:00:00" name="timeOfBooking" onChange={this.handleTimeChange} />
              18:00
              <input type="radio" value="21:00:00" name="timeOfBooking" onChange={this.handleTimeChange}/>21:00
            </div>

            {/* <Details />  */}
            <div className="guests">
              <label htmlFor="guests">Number of guests </label>
              <input type="number" min="1" max="6" value={ this.state.bookings.numberOfGuests } name="numberOfGuests" placeholder="Number of guests?" onChange={ this.handleChange }/>
            </div>

            <div className="name">
              <label htmlFor="name">Name </label>
              <input type="text" value={ this.state.bookings.name } name="name"  placeholder="Name" onChange={this.handleChange} />
            </div>

            <div className="email">
              <label htmlFor="email">Email </label>
              <input type="email" value={ this.state.bookings.email } name="email" placeholder="name@email.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 3}$" onChange={this.handleChange} />
            </div>

            <div className="phone">
              <label htmlFor="phone">Phone </label>
              <input type="text" value={ this.state.bookings.phone } name="phone" placeholder="Phonenumber" pattern="^\d{8,13}$" onChange={this.handleChange} />
            </div>

            <button disabled={ !this.state.bookings.numberOfGuests || !this.state.bookings.name || !this.state.bookings.email || !this.state.bookings.phone } type="submit">Submit</button>
          </form>

        </div>
      </div>
    )
  }

}

export default Booking;