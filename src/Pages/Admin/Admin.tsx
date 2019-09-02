import React from 'react'
import Data from '../../Service/Data'

class Admin extends React.Component {

    state = {
        getBookings: []
    }

componentDidMount() {
    const getBookings = new Data();
    console.log(getBookings.readData()
    .then(response => {
        this.setState({getBookings});
    })
}


    render() {
        return (
            <h4>
               hello from Admin page 
            </h4>
        )
    }
}

export default Admin;


