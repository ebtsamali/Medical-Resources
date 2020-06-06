import authHeader from './authHeader'
import axios from 'axios'

function PharmacyService() {
    return ({

        getPharmacyData: () => {
            return axios.get(`${process.env.REACT_APP_BACKEND_URL}/pharmacys`, {headers: authHeader()});
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
        }
    })
}

export default new PharmacyService()
