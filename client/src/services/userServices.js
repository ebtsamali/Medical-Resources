import axios from 'axios';
import authHeader from "./authHeader";
const API_URL = `${process.env.REACT_APP_BACKEND_URL}`;

function UserServices() {
    return ({

        register: (email, password, firstname, lastname, role) => {
            let form = {
                email,
                password,
                firstName: firstname,
                lastName: lastname,
                role
            }
            return (
                axios.post(API_URL + "/auth/users/signup", form)
            )
        },
        getUserInfo: (userId) => {
            return (
                axios.get(API_URL + `/users/${userId}`, { headers: authHeader() })
            )
        },
        update: (email, firstName, lastName, birthdate, phoneNumber, address, password, userId) => {
            let form = {
                email,
                firstName,
                lastName,
                birthdate,
                phoneNumber,
                address,
                password
            }
            return (
                axios.patch(API_URL + `/users/${userId}`, form, { headers: authHeader() })
            )
        },
        mailActivation: (emailToken) => {
            return axios.get(`${API_URL}/auth/users/activation/${emailToken}`)
        },
        passwordReset: (email) => {
            return axios.post(`${API_URL}/auth/users/reset/password`, { email });
        },
        updatePassword: (password, resetPasswordToken) => {
            return axios.patch(`${API_URL}/auth/users/reset/password/${resetPasswordToken}`, { password });
        },
        searchMedicines: (query) => {
            return axios.get(`${API_URL}/medicines/search${query}`, { headers: authHeader() })
        },
        getCartDetails: (data) => {
            return axios({
                headers: authHeader(),
                url: `${process.env.REACT_APP_BACKEND_URL}/users/cart`,
                data: {
                    pharmacys: data
                },
                method: 'post'
            });
        },
        reserveMedicine: (userId, pharmacyId, data) => {
            return axios({
                headers: authHeader(),
                url: `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/pharmacys/${pharmacyId}/reserve`,
                data,
                method: 'post'
            });
        },
        orderMedicine: (userId, pharmacyId, data) => {
            return axios({
                headers: authHeader(),
                url: `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/pharmacys/${pharmacyId}/order`,
                data,
                method: 'post'
            });
        },
        getMedicineReservationDetails: (userId, reservationId) => {
            return axios.get(`${API_URL}/users/${userId}/medicines_reservation/${reservationId}`, { headers: authHeader() })
        },
        getMedicineOrderDetails: (userId, orderId) => {
            return axios.get(`${API_URL}/users/${userId}/medicines_order/${orderId}`, { headers: authHeader() })
        },
        getAllOrders: (pageQuery, userId) => {
            return axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}/orders?${pageQuery}`, { headers: authHeader() })
        },
        getAllMedicineReservations: (pageQuery, userId) => {
            return axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}/medicines?${pageQuery}`, { headers: authHeader() })
        },
        getAllBedReservations: (pageQuery, userId) => {
            return axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}/beds?${pageQuery}`, { headers: authHeader() })
        },
        registerWithFacebook: (email,name, password) => {
            let form = {
                email,
                name,
                password
            }
            return (
                axios.post(API_URL + "/auth/users/facebookLogin", form)
            )
        },
        facebookResult: (response) => {
            console.log(API_URL);
            
            return(
                axios({
                    method: "get",
                    url: `https://graph.facebook.com/v6.0/${response.userID}/?fields=id,name,email&access_token=${response.accessToken}`,
                })
            )
        },
        checkEmail: (email) => {
            return (
                axios({
                    method: "get",
                    url: `${process.env.REACT_APP_BACKEND_URL}/auth/users/checkEmail/${email}`,
                })
            )
        }
    })
}

export default new UserServices();
