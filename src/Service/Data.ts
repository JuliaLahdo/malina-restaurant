import axios from 'axios';

class Data {

    async readData() {
        return axios.get('http://localhost/react/malina-backend-php/api/booking/read.php')
            .then(response => {
                //console.log(response.data);
                return response.data;
            }).catch(error => {
                console.log(error);
            });
    }

    createData(createData: any) {
        axios.post('http://localhost/react/malina-backend-php/api/booking/create.php', createData, {
            headers: { 'Content-Type': 'text/plain' }})
            .then((response: any) => {
                console.log(response);
                return response;
            }).catch((error: any) => {
                console.log(error);
            });
    }

      deleteData(deleteData: any) {
        axios.post('http://localhost/react/malina-backend-php/api/booking/delete.php', deleteData, {
            headers: { 'Content-Type': 'text/plain' }})
            .then((response: any) => {
                console.log(response);
                return response;
            }).catch((error: any) => {
                console.log(error);
            });
    }

    updateData(updateData: any) {
        axios.post('http://localhost/react/malina-backend-php/api/booking/update.php', updateData, {
            headers: { 'Content-Type': 'text/plain' }})
            .then((response: any) => {
                console.log(response);
                return response;
            }).catch((error: any) => {
                console.log(error);
            });
        }
    }

export default Data;