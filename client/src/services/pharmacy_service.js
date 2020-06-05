import authHeader from './authHeader'
import axios from 'axios'
function PharmacyService() {
    return({

        getPharmacyData: () => {
            return axios.get(`${process.env.REACT_APP_BACKEND_URL}/pharmacys`, { headers: authHeader() });
        },

    })
}

export default new PharmacyService()
