import authHeader from './authHeader';
import axios from 'axios';

export const saveHospitalData = (data) => {
    return axios({
        headers: authHeader(),
        url: `${process.env.REACT_APP_BACKEND_URL}/hospitals`, 
        method: 'post',
        data
    })
}

export const getHospitalData = (id) => {
    return axios({
        headers: authHeader(),
        url: `${process.env.REACT_APP_BACKEND_URL}/hospitals/${id}`, 
        method: 'get'
    })
}

export const editHospitalData = (data, hospitalId) => {
    return axios({
        headers: authHeader(),
        url: `${process.env.REACT_APP_BACKEND_URL}/hospitals/${hospitalId}`, 
        method: 'patch',
        data
    })
}