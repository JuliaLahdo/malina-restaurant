import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {IBooking, IBookingsState} from '../../Service/IBooking';
import moment from 'moment';


export interface IBookingsProps{
  bookings(bookings:IBooking):void;
 
}


export default class SelectDate extends Component <IBookingsProps, IBookingsState>{
    constructor(props:IBookingsProps) {
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
        
        this.handleDateChange = this.handleDateChange.bind(this);
     
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



    render() {
        return (
            <div>

            {this.props.bookings}
                <DatePicker selected={this.state.bookings.dateOfBooking.toDate()} onChange={this.handleDateChange} dateFormat="yyyy-MM-dd"/>  
                </div>
        )
    }
}
