import axios from 'axios';
import { IUpdateBooking } from '../Pages/Edit/Edit';

class Data {

    async readData() {
        return axios.get('http://localhost:8888/api/booking/read.php')
            .then(response => {
                //console.log(response.data);
                return response.data;
            }).catch(error => {
                console.log(error);
            });
    }

    async readSingleBooking(id: number) {
        return axios.get('http://localhost:8888/api/booking/readSingleBooking.php?id='+id)
            .then(response => {
                //console.log(response.data);
                return response.data;
            }).catch(error => {
                console.log(error);
            });
    }

    createData(createData: any) {
        axios.post('http://localhost:8888/api/booking/create.php', createData, {
            headers: { 'Content-Type': 'text/plain' }})
            .then((response: any) => {
                console.log(response);
                return response;
            }).catch((error: any) => {
                console.log(error);
            });
    }

      deleteData(id: any) {
        axios.delete('http://localhost:8888/api/booking/delete.php', {
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

    updateData(updateData: IUpdateBooking) {
        let postData = {
            id: updateData.id,
            dateOfBooking: updateData.dateOfBooking.format('YYYY-MM-DD'),
            timeOfBooking: updateData.timeOfBooking,
            numberOfGuests: updateData.numberOfGuests
        };

        axios.post('http://localhost:8888/api/booking/update.php', postData, {
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