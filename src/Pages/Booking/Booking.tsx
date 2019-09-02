import React from 'react';
import DatePicker from 'react-datepicker';
// import Data from '../../Service/Data';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';
import axios from 'axios';
import moment from 'moment';
import Header from '../../Components/Header/Header';




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
  }


class Booking extends React.Component<{}, IBookingsState> {    

    constructor(props:any) {
        super(props);
          this.state = {
          bookings: 
            {              
              dateOfBooking:moment(),
              timeOfBooking:"",
              numberOfGuests: 0,
              email:"",
              name:"",
              phone:"" 
            }        
        };  
        
         // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }




    componentDidMount(){
      axios.get('http://localhost:8888/api/booking/read.php')
      .then(response => {
          console.log(response.data);
          return response;
      }).catch(error => {
          console.log(error);
      });
    }


    handleSubmit(e: any) {
      e.preventDefault();
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
      axios.post('http://localhost:8888/api/booking/create.php', postData, {
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
        this.setState((prevState:any)=>{  
          prevState.bookings[name] = value; 
            return {
             bookings: prevState.bookings
            };          
        },
         () => {
          console.log(this.state.bookings);          
        });
      }


      handleDateChange(date: Date) { 
      
        let momentDate = moment(date);
        console.log(momentDate);

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
                    <form onSubmit={(e) => this.handleSubmit(e)} noValidate>
                      <div>                    
                        <DatePicker selected={this.state.bookings.dateOfBooking.toDate()} onChange={this.handleDateChange} dateFormat="yyyy-MM-dd"/>  
                      </div>
                
                        <div className="selectTime">
                            <input type="radio" value="18:00:00" name="timeOfBooking" onChange={this.handleTimeChange} defaultChecked/>
                            18:00
                            <input type="radio" value="21:00:00" name="timeOfBooking" onChange={this.handleTimeChange}/>21:00
                        </div>

                        <div className="guests">
                            <label htmlFor="guests">guests</label>
                            <input type="number" value={ this.state.bookings.numberOfGuests } name="numberOfGuests" placeholder="how many guests?" onChange={this.handleChange}/>
                        </div>

                        <div className="name">
                            <label htmlFor="name">name</label>
                            <input type="text" value={ this.state.bookings.name } name="name"  placeholder="name" onChange={this.handleChange}/>
                        </div>

                        <div className="email">
                            <label htmlFor="email">email</label>
                            <input type="text" value={ this.state.bookings.email } name="email" placeholder="email" onChange={this.handleChange}/>
                        </div>

                        <div className="phone">
                            <label htmlFor="phone">phone</label>
                            <input type="text" value={ this.state.bookings.phone } name="phone" placeholder="phone" onChange={this.handleChange}/>
                        </div>
                        <button type="submit">submit</button>
                    </form>  
                </div>
            </div>
        )
    }
    
}

export default Booking;