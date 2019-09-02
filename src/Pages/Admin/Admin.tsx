import React from 'react'
import Data from '../../Service/Data'

class Admin extends React.Component {

    state = {
        getBook: []
    }

componentDidMount() {
    const getBookings = new Data();
    getBookings.readData()
    .then(response => {
        this.setState({getBook: response.bookings});
        
        //console.log(this.state.getBook);

       console.log(response.bookings)
      console.log(getBookings.readData()); //works

    })
}

    render() {
        const {getBook} = this.state;
        return (
            <h4>
               hello from Admin page 
            </h4>
        )
    }
}

export default Admin;