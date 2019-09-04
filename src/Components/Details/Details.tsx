import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {IBookingsState} from '../../Service/IBooking';
import moment from 'moment';

export interface IDetailsProps {   

    handleChange(e:any): any;

}




export default class Details extends Component<IDetailsProps,IBookingsState>{
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
        
        this.handleChange = this.handleChange.bind(this);
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


    render() {
        return (
            <div>
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
            </div>
        )
    }
}
