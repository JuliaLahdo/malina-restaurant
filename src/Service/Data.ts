import axios from 'axios';

class Data {

    async readData() {
        return axios.get('http://localhost/api/booking/read.php')
            .then(response => {
                //console.log(response.data);
                return response.data;
            }).catch(error => {
                console.log(error);
            });
    }

    createData(createData: any) {
        axios.post('http://localhost/api/booking/create.php', createData, {
            headers: { 'Content-Type': 'text/plain' }})
            .then((response: any) => {
                console.log(response);
                return response;
            }).catch((error: any) => {
                console.log(error);
            });
    }

      deleteData(id: any) {
        axios.delete('http://localhost/api/booking/delete.php', {
            "data": {
                "id": id
            }
         })
            .then((response: any) => {
                console.log(response);
                return response;
            }).catch((error: any) => {
               
                console.log(error);
            });
    }

    updateData(updateData: any) {
        axios.post('http://localhost/api/booking/update.php', updateData, {
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