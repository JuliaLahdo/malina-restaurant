import React from 'react'
import Data from '../../Service/Data'

class Admin extends React.Component {

componentDidMount() {
    const getBookings = new Data();
    console.log(getBookings.readData());
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


/* readData() {
    axios.get('http://localhost/react/malina-backend-php/api/booking/read.php')
        .then(response => {
            console.log(response.data);
            return response;
        }).catch(error => {
            console.log(error);
        });
} */