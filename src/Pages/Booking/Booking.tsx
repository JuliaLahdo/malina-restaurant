import React from 'react';
import DatePicker from 'react-datepicker';
// import Data from '../../Service/Data';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';
import axios from 'axios';
import moment from 'moment';
import Header from '../../Components/Header/Header';
import { Redirect } from 'react-router';
// import dessert from '../../Images/indexcarousel1.png';
// import { FaGalacticSenate } from 'react-icons/fa';


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

interface IError {  
  emailError: string,
  nameError: string,
  phoneError: string
}

interface IBookingsState {    
  bookings: IBooking;
  isCheckedDate: boolean;
  isCheckedGdpr: boolean;
  isAvailableAt18: boolean;
  isAvailableAt21: boolean;
  isAvilableBookingTime: boolean;
  errors:IError;
  showConfirmation: boolean;
  bookingId: string;

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
      errors: {       
        emailError: "",
        nameError: "",
        phoneError: ""
      },
      isCheckedDate: false,
      isCheckedGdpr: false,
      isAvailableAt18: true,
      isAvailableAt21: true,
      isAvilableBookingTime: false,
      showConfirmation: false,
      bookingId: ""
    };  
      
    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkedGdpr = this.checkedGdpr.bind(this);
    this.validate = this.validate.bind(this);
    this.showConfirmation=this.showConfirmation.bind(this);
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

  validate() {
   
    let emailError= "";
    let nameError="";
    let phoneError= "";


    if(!this.state.bookings.email){
      emailError = "E-mail can not be blank";
    }

    if(!this.state.bookings.name){
      nameError = "Name can not be blank";
    }

    if(this.state.bookings.name.length < 3){
      nameError = "Name can not be more than 3 characters";
    }

    if(!this.state.bookings.phone){
      phoneError = "Phone can not be blank";
    }

    if(this.state.bookings.phone.length < 5){
      phoneError = "Phone can not be more than 5 numbers";
    }

    if(emailError||nameError||phoneError){
         this.setState({
           errors: 
           { emailError, 
            nameError, 
            phoneError}
          });
      return false;
    }
    return true;
  }

  handleSubmit(e:any) {
    e.preventDefault();
    const isValid = this.validate();
    if(isValid) {
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
              console.log(response.data.message);
        this.setState({
          showConfirmation: true,
          bookingId: response.data.message
        },()=>console.log(this.state.showConfirmation));

                      return response;
          }).catch((error: any) => {
              console.log(error);
        });

        
      }else{
       e.preventDefault();
      }   
  }

  handleChange(e:any) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    
    
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
    axios.get('http://localhost:8888/api/booking/read.php')
    .then(response => {      

      let numberOfTablesBookedAt18 = [];
      let numberOfTablesBookedAt21 = [];

        for (let i = 0; i < response.data.bookings.length; i++){   
          if(response.data.bookings[i].dateOfBooking === momentDate.format('YYYY-MM-DD')){
           if(response.data.bookings[i].timeOfBooking === "18:00:00") {
              numberOfTablesBookedAt18.push(response.data.bookings[i]);
              console.log(numberOfTablesBookedAt18);
           }
           if(response.data.bookings[i].timeOfBooking === "21:00:00") {
              numberOfTablesBookedAt21.push(response.data.bookings[i]);
              console.log(numberOfTablesBookedAt21);
          }
        }
      }


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
    this.setState((prevState:any)=>{  
      prevState.bookings.dateOfBooking = momentDate; 
        return {
          bookings: prevState.bookings
        };
    });

    
    

  }

  handleTimeChange(e:any) {
    
    if (this.state.isAvailableAt18 === true || this.state.isAvailableAt21 === true){
      let time = e.target.value; 
      this.setState((prevState:any)=>{  
        prevState.bookings.timeOfBooking = time; 
          return {
            bookings: prevState.bookings
          };          
      });
    }
    
    else{
      console.log("can not booking");
   }
  }


  checkedGdpr(){
    if(!this.state.isCheckedGdpr){
      this.setState({
        isCheckedGdpr: true
      });
    }else{
      this.setState({
        isCheckedGdpr: false
      });
    }   
  }

  showConfirmation(){
    this.setState({
      showConfirmation: true
    })
  }

 

  render() {
    if (this.state.showConfirmation) {
      return (
        <Redirect to={`/confirmation?id=${this.state.bookingId}`} />
      );
    }

    return (
      <div className="container">
        <Header images="bookingImages" title="Booking page" />
    
        <div className="pageHeaderContainer">
          <h1 className="pageHeading">Make a reservation</h1>
        </div>
        <div className="pageDescription">
          <p>So you want to book a table? <strong>Awesome!</strong> Easily make your reservation below, where you can book for 1-6 people.</p>
          <p>For larger parties or for those who would rather book by phone, call <a href="tel: +46725113113">072 511 3113</a> or email us at <a href="mailto: reservation@malina.se">reservation@malina.se</a>.</p>
          <p><i>Please note that sitting time is calculated to 2,5hrs.</i></p>
        </div>
                  
        <div className="bookingFormContainer">

          <div className="bookingForm">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              {/* <SelectDate />  */}
              <p>Select date:</p>
              <DatePicker selected={this.state.bookings.dateOfBooking.toDate()} onChange={this.handleDateChange} dateFormat="yyyy-MM-dd" minDate={moment().toDate()} />  
              {/* <SelectTime />  */}     
             
            <div className= {!this.state.isCheckedDate ? "selectTime" : "disabledSelectTime"}>
                {/* defaultChecked on 18:00, if not changed then booking won't be created */}
              <p>Select time:</p>
                <input type="radio" value="18:00:00" name="timeOfBooking" disabled={!this.state.isAvailableAt18} onChange={this.handleTimeChange} className="radioButtonsTime"/>
                <p className="timeToBook firstTime">18:00</p>
                <input type="radio" value="21:00:00" name="timeOfBooking" disabled={!this.state.isAvailableAt21} onChange={this.handleTimeChange} className="radioButtonsTime"/>
                <p className="timeToBook">21:00</p>
              </div>

              {/* <Details />  */}
              <div className="guests">
                <label htmlFor="guests">Number of guests <i>(max: 6)</i> : </label>
                <input type="number" min="1" max="6" value={ this.state.bookings.numberOfGuests } name="numberOfGuests" placeholder="Number of guests?" onChange={ this.handleChange }/>
              </div>

              <div className="name">
                <label htmlFor="name">Name: </label>
                <input type="text" value={ this.state.bookings.name } name="name"  placeholder="Name" onChange={this.handleChange} />

                {this.state.errors.nameError ? (<div style={{color: "red"}}>{this.state.errors.nameError}</div>
                ) : null }
                
              </div>

              {/* <div className="email">
                <label htmlFor="email">Email </label>
                <input type="email" value={ this.state.bookings.email } name="email" placeholder="name@email.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 3}$" onChange={this.handleChange} />
              </div> */}

              <div className="email">
                <label htmlFor="email">Email: </label>
                <input type="email" placeholder="name@email.com"  value={ this.state.bookings.email } name="email"  onChange={this.handleChange} />
                {/* error handling */}
                {this.state.errors.emailError ? (<div style={{color: "red"}}>{this.state.errors.emailError}</div>
                ) : null }              
              </div>
            
  {/* 
              <div className="phone">
                <label htmlFor="phone">Phone </label>
                <input type="text" value={ this.state.bookings.phone } name="phone" placeholder="Phonenumber" pattern="^\d{8,13}$" onChange={this.handleChange} />
              </div> */}

              <div className="phone">
                <label htmlFor="phone">Phone: </label>
                <input type="text" value={ this.state.bookings.phone } name="phone" placeholder="Phonenumber" onChange={this.handleChange} />
                {this.state.errors.phoneError ? (<div style={{color: "red"}}>{this.state.errors.phoneError}</div>
                ) : null }
              </div>

              <div className="gdpr">
                <label htmlFor="gdpr">GDPR</label>
                <input type="checkbox" checked={this.state.isCheckedGdpr} onChange={this.checkedGdpr}/>
    
              </div>

              {/* {if (!this.state.showConfirmation) {
     return (
       <Redirect to = {/confirmation} />
     );
     } */}
      {/* {if (this.state.showConfirmation) {
     return (
       <Redirect to ={/confirmation} />
     );}
   } */}

            <button disabled={ !this.state.bookings.dateOfBooking || !this.state.bookings.timeOfBooking || !this.state.isCheckedGdpr} type="submit"/*  onClick={this.showConfirmation} */>Submit
   
              </button>
              

              {/* <button type="submit">Submit</button> */}
            </form>

          </div>


        </div>

      </div>
    )
  }

}

export default Booking;