import moment from 'moment';

export interface IBooking {
    dateOfBooking: moment.Moment;
    timeOfBooking: string;
    numberOfGuests: number;
    email:string;
    name:string;
    phone:string;
    
  }
  
export interface IBookingsState {    
      bookings: IBooking;
    }

export default IBooking;