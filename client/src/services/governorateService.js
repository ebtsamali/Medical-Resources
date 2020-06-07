import axios from 'axios'

function GovernorateService() {
    return {
        getAllGovernorates:() =>{
            return axios.get(`${process.env.REACT_APP_BACKEND_URL}/governorates`)
        }
    }
}

export default new GovernorateService()
