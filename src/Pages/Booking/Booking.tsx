import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';


// export interface IBookings{
//     data: [];

// }

export interface IBookingsProps{

}

class Booking extends React.Component<IBookingsProps,{}> {

    handleSubmit(e: any) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="container">        
                <div className="bookingFormContainer">
                    <form onSubmit={(e) => this.handleSubmit(e)} noValidate>
                        <div className="selectTime">
                            <input type="radio" value="first" defaultChecked name="time"/>

                            18:00
                            <input type="radio" value="second" name="time"/>21:00

                        </div>
                        <div className="guests">
                            <label htmlFor="guests">guests</label>
                            <input type="number" placeholder="how many guests?"/>
                        </div>
                        <div className="name">
                            <label htmlFor="name">name</label>
                            <input type="text" placeholder="name"/>
                        </div>
                        <div className="email">
                            <label htmlFor="email">email</label>
                            <input type="text" placeholder="email"/>
                        </div>
                        <button type="submit">submit</button>
                    </form>            
                </div>
           </div>
        )
    }
}

export default Booking;