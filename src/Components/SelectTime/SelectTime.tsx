import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IBookingsState} from '../../Service/IBooking';
import moment from 'moment';





export interface ISelectTimeProps {   

    handleTimeChange(e:any): any;

}

export default class SelectTime extends Component <ISelectTimeProps,IBookingsState>{

    constructor(props: any) {
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
        
        this.handleTimeChange = this.handleTimeChange.bind(this);

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
        return (
            <div className="selectTime">
                            <input type="radio" value="18:00:00" name="timeOfBooking" onChange={this.handleTimeChange} defaultChecked/>
                            18:00
                            <input type="radio" value="21:00:00" name="timeOfBooking" onChange={this.handleTimeChange}/>21:00
                        </div>
        )
    }
}
