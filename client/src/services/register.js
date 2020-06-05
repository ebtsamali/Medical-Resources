import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/auth/users/signup`;

function RegisterService () {
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
                axios.post(API_URL, form)
            )
        }
    })
}

export default new RegisterService();