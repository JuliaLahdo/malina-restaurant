
import axios from 'axios';

class Data {

    readData() {
        axios.get('http://localhost/react/malina-backend-php/api/booking/read.php')
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });

    }

    createData(createData: any) {
        axios.post('http://localhost/react/malina-backend-php/api/booking/create.php', createData, {
          headers: { 'Content-Type': 'text/plain' 
        }}).then((response: any) => {
          console.log(response);
          return response;
        }).catch((error: any) => {
          console.log(error);
        });
      }

    deleteData() {

    }

    updateData() {

    }

}

export default Data;