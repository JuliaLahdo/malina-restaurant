import React from 'react';
import DatePicker from 'react-datepicker';
// import Data from '../../Service/Data';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';
import axios from 'axios';

// export interface IBookings{
//     data: [];

// }


export interface IBookingsProps{
  // bookingData(data:Data): void;
 
}

interface IBookingState {
    date : Date,
    bookings: any; 
  }


class Booking extends React.Component<IBookingsProps, IBookingState> {    

   

    constructor(props:any) {
        super(props);

        this.state = {
          date: new Date(),
          bookings: []
          // bookingData: []
        };       
        this.handleChange = this.handleChange.bind(this);
      }

    //   createData() {
    //     axios.get('http://localhost:8889/api/booking/create.php')
    //         .then(response => {

    //           const bookings = response.data;
    //           this.setState({bookings});
    //             console.log(response.data);
    //             return response;
    //         }).catch(error => {
    //             console.log(error);
    //         });
    // }

       handleSubmit(e: any) {
        e.preventDefault();
        

    }

    componentDidMount(){
      console.log('Did component mount ?');
      axios.get('http://localhost:8888/api/booking/read.php')
      .then(response => {
        const bookings:any = response.data;
          console.log(bookings);
          
          return bookings;
      }).catch(error => {
          console.log(error);
      });

    }



       

      handleChange(date:any) {
        this.setState({
          date: date
        },
         () => {
          console.log(this.state.date);
          
        });
      }

    render() {
        return (
            <div className="container">  
              <div>
                <DatePicker selected={this.state.date} onChange={this.handleChange} />  
              </div>
            
             
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

                     {/* <ul>
                     { this.state.bookings.map((booking:any)=> <li>{booking.id}</li>)}
                    </ul>           */}
                </div>

               


           </div>
        )
    }
    
}

export default Booking;