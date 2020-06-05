import authHeader from './authHeader'
import axios from 'axios'

function MedicineService() {
    return ({
        addMedicine: (data) => {
            return axios({
                headers: authHeader(),
                url: `${process.env.REACT_APP_BACKEND_URL}/medicines`,
                data,
                method: 'post'
            });
        },
        getAllMedicines: () => {
            return axios({
                headers: authHeader(),
                url: `${process.env.REACT_APP_BACKEND_URL}/medicines`,
                method: 'get'
            });
        }
    })
}

export default new MedicineService()
