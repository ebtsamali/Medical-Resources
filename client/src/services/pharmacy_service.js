import authHeader from './authHeader'
import axios from 'axios'

function PharmacyService() {
    return ({

        getPharmacyData: (id) => {
            return axios.get(`${process.env.REACT_APP_BACKEND_URL}/pharmacys/${id}`, { headers: authHeader() });
        },
        updatePharmacyData: (id, updatedData) => {
            return axios({
                headers: authHeader(),
                url: `${process.env.REACT_APP_BACKEND_URL}/pharmacys/${id}`,
                method: 'patch',
                data: updatedData,
            });
        },
        addNewPharmacy: (data) => {
            return axios({
                headers: authHeader(),
                url: `${process.env.REACT_APP_BACKEND_URL}/pharmacys`,
                method: 'post',
                data,
            })
        },
        getPharmacy: (id) => {
            return axios({
                headers: authHeader(),
                url: `${process.env.REACT_APP_BACKEND_URL}/pharmacys/profile/${id}`,
                method: 'get'
            })
        },
        signupAsPharmacy: (data) => {
            return axios({
                url: `${process.env.REACT_APP_BACKEND_URL}/auth/users/signup_as_pharmacy`,
                method: 'post',
                data
            })
        },
        updatePharmacyRating: (userId, rating, pharmacyId) => {
            return axios.patch(`${process.env.REACT_APP_BACKEND_URL}/pharmacys/rating/${pharmacyId}`, { userId, rating }, { headers: authHeader() });
        }
    })
}

export default new PharmacyService()
