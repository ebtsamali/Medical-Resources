import authHeader from './authHeader';
import axios from 'axios';


export const saveReservationData = (data) => {
    return axios({
        headers: authHeader(),
        url: `${process.env.REACT_APP_BACKEND_URL}/hospital-reservation`, 
        method: 'post',
        data
    })
}