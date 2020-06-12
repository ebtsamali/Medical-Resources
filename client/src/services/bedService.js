import axios from 'axios';
import authHeader from "./authHeader";
const API_URL = `${process.env.REACT_APP_BACKEND_URL}`;

function BedServices() {
    return ({

        getAllBeds: (pageQuery) => {
            return (
                axios.get(`${API_URL}/beds?${pageQuery}`, {headers: authHeader()})
            )
        },
        addBed: (bedObj) => {
            return (
                axios.post(`${API_URL}/beds`, bedObj, {headers: authHeader()})
            )
        },
        updateBed: (bedObj) => {
            return (
                axios.patch(`${API_URL}/beds/${bedObj._id}`, bedObj, {headers: authHeader()})
            )
        },
        deleteBed: (bedId) => {
            return (
                axios.delete(`${API_URL}/beds/${bedId}`, {headers: authHeader()})
            )
        },
        getAllHospitalBeds: (hospitalId) => {
            return (
                axios.get(`${API_URL}/beds/${hospitalId}`, {headers: authHeader()})
            )
        },
        updateReservedBed: (bedObj) => {
            return (
                axios.patch(`${API_URL}/beds/edit/${bedObj._id}`, bedObj, {headers: authHeader()})
            )
        }

    })
}

export default new BedServices();
