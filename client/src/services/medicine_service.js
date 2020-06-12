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
        getAllMedicines: (query) => {
            return axios({
                headers: authHeader(),
                url: `${process.env.REACT_APP_BACKEND_URL}/medicines?${query}`,
                method: 'get'
            });
        },
        updateMedicine: (id, updatedData) => {
            return axios({
                headers: authHeader(),
                url: `${process.env.REACT_APP_BACKEND_URL}/medicines/${id}`,
                method: 'patch',
                data: updatedData,
            });
        },
        deleteMedicine: (id) => {
            return axios({
                headers: authHeader(),
                url: `${process.env.REACT_APP_BACKEND_URL}/medicines/${id}`,
                method: 'delete',
            });
        },
        getMedicineReservations: () => {
            return (
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/medicines/reservations`, { headers: authHeader() })
            )
        },
        getMedicineOrders: () => {
            return (
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/medicines/orders`, { headers: authHeader() })
            )
        },
        updateOrderStatus: (orderId, status) => {
            return (
                axios.patch(`${process.env.REACT_APP_BACKEND_URL}/medicines/orders/${orderId}`, { status }, { headers: authHeader() })
            )
        },
    })
}

export default new MedicineService()
