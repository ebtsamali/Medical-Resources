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

export const getAdminData = (adminId) => {
    return axios({
        headers: authHeader(),
        url: `${process.env.REACT_APP_BACKEND_URL}/users/${adminId}`, 
        method: 'get'
    })
}

export const editAdminData = (data, adminId) => {
    return axios({
        headers: authHeader(),
        url: `${process.env.REACT_APP_BACKEND_URL}/users/${adminId}`, 
        method: 'patch',
        data
    })
}

export const getAllHospitals = () => {
    return axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/hospitals`, 
        method: 'get'
    })
}

export const getHospitalInfo = (hospitalId) => {
    return axios({
        headers: authHeader(),
        url: `${process.env.REACT_APP_BACKEND_URL}/hospitals/profile/${hospitalId}`, 
        method: 'get'
    })
}
